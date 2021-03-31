<?php

if (!class_exists('Updater', false)) :
  require __DIR__ . '/vendor/autoload.php';
  abstract class Updater
  {
    protected static $type;
    protected $slug;
    protected $pluginData;
    protected $repo;
    protected $branch;
    protected $pluginFile;
    protected $headerFile;
    protected $bitbucketAPIResult;

    function __construct($pluginFile, $repo, $branch)
    {
      $this->pluginFile = $pluginFile;
      $this->repo = $repo;
      $this->branch = $branch;
    }

    abstract protected function getHeaderNames();

    // Get information regarding our plugin from WordPress
    abstract protected function initData();

    // Gets the appropriate transient value
    abstract protected function getTransientValue($package);

    // Parses remote file header
    public function getFileHeader($content)
    {
      $content = (string)$content;

      //WordPress only looks at the first 8 KiB of the file, so we do the same.
      $content = substr($content, 0, 8192);
      //Normalize line endings.
      $content = str_replace("\r", "\n", $content);

      $headers = $this->getHeaderNames();
      $results = array();
      foreach ($headers as $field => $name) {
        $success = preg_match('/^[ \t\/*#@]*' . preg_quote($name, '/') . ':(.*)$/mi', $content, $matches);

        if (($success === 1) && $matches[1]) {
          $value = $matches[1];
          if (function_exists('_cleanup_header_comment')) {
            $value = _cleanup_header_comment($value);
          }
          $results[$field] = $value;
        } else {
          $results[$field] = '';
        }
      }

      return $results;
    }

    // Get information regarding our plugin from GitHub
    private function getRepoReleaseInfo()
    {

      // Only do this once
      if (!empty($this->bitbucketAPIResult)) {
        return;
      }

      $url = sprintf('https://api.bitbucket.org/2.0/repositories/%s/src/%s/%s', $this->repo, $this->branch, $this->headerFile);

      $response = wp_remote_get($url);

      if ($response) {
        $data = wp_remote_retrieve_body($response);
        $parsed = $this->getFileHeader($data, "theme");
        // For debugging uncomment the line below to force update
        $parsed['Version'] = '2020.2';
        if (!empty($parsed)) {
          $this->bitbucketAPIResult = $parsed;
        }
      }
    }

    // Smarter implementation of wp filesystem move
    protected function move($source, $destination)
    {
      if ($this->filesystem_move($source, $destination)) {
        return true;
      }
      if (is_dir($destination) && rename($source, $destination)) {
        return true;
      }
      // phpcs:ignore WordPress.CodeAnalysis.AssignmentInCondition.Found, Squiz.PHP.DisallowMultipleAssignments.FoundInControlStructure
      if ($dir = opendir($source)) {
        if (!file_exists($destination)) {
          mkdir($destination);
        }
        $source = untrailingslashit($source);
        // phpcs:ignore WordPress.CodeAnalysis.AssignmentInCondition.FoundInWhileCondition
        while (false !== ($file = readdir($dir))) {
          if (('.' !== $file) && ('..' !== $file) && "{$source}/{$file}" !== $destination) {
            if (is_dir("{$source}/{$file}")) {
              $this->move("{$source}/{$file}", "{$destination}/{$file}");
            } else {
              copy("{$source}/{$file}", "{$destination}/{$file}");
              unlink("{$source}/{$file}");
            }
          }
        }
        $iterator = new \FilesystemIterator($source);
        if (!$iterator->valid()) { // True if directory is empty.
          rmdir($source);
        }
        closedir($dir);

        return true;
      }

      return false;
    }

    // FS helper function
    private function filesystem_move($source, $destination)
    {
      global $wp_filesystem;
      if ('direct' !== $wp_filesystem->method) {
        return $wp_filesystem->move($source, $destination);
      }

      return false;
    }

    public function getReadmeFile()
    {

      $url = sprintf('https://api.bitbucket.org/2.0/repositories/%s/src/%s/README.md', $this->repo,  $this->branch);
      $response = wp_remote_get($url);
      $data = wp_remote_retrieve_body($response);
      error_log($data);
      return $data;
      $decode = json_decode($data);
      error_log($decode);

      // No file found or other error.
      if ($decode) {
        return false;
      }
      return $decode;
    }

    public function modifyRequestArgs($args, $url)
    {
      if (preg_match('/bitbucket.org(.+)' . str_replace('/', '\/', $this->repo) . '/', $url)) {
        if (empty($args['headers'])) {
          $args['headers'] = array();
        }
        $args['headers']['Authorization'] = 'Basic ' . base64_encode($this->bitbucketUsername . ':' . $this->bitbucketPassword);
      }
      return $args;
    }

    /* All the filter hook functions */

    // Push in plugin version information to get the update notification
    public function setTransient($transient)
    {
      // needed to fix PHP 7.4 warning.
      if (!\is_object($transient)) {
        $transient = new \stdClass();
      }

      // If we have checked the plugin data before, don't re-check
      if (empty($transient->checked)) {
        return $transient;
      }

      // Get plugin & GitHub release information
      $this->initData();
      $this->getRepoReleaseInfo();

      if (empty($this->bitbucketAPIResult)) {
        // Nothing found.
        return $transient;
      }

      $bb_version = str_replace('v', '', $this->bitbucketAPIResult['Version']);
      // Check the versions if we need to do an update
      $doUpdate = version_compare($bb_version, array_key_exists($this->slug, $transient->checked) ? $transient->checked[$this->slug] : $this->pluginData['Version']);

      // Update the transient to include our updated plugin data
      if ($doUpdate == 1) {
        error_log('gotta update');
        $package = sprintf(
          'https://bitbucket.org/%s/get/%s.zip',
          $this->repo,
          $this->branch
        );

        $transient->response[$this->slug] = $this->getTransientValue($package);
      }

      return $transient;
    }
  }
endif;

if (!class_exists('ThemeUpdater', false)) :
  class ThemeUpdater extends Updater
  {
    protected static $type = 'theme';

    function __construct($pluginFile, $repo, $branch)
    {
      parent::__construct($pluginFile, $repo, $branch);
      $this->headerFile = "style.css";
      add_filter("upgrader_source_selection", array($this, "upgrader_source_selection"), 10, 4);
      add_filter("site_transient_update_themes", array($this, "setTransient"));
    }

    protected function getHeaderNames()
    {
      return array(
        'Name'        => 'Theme Name',
        'ThemeURI'    => 'Theme URI',
        'Description' => 'Description',
        'Author'      => 'Author',
        'AuthorURI'   => 'Author URI',
        'Version'     => 'Version',
        'Template'    => 'Template',
        'Status'      => 'Status',
        'Tags'        => 'Tags',
        'TextDomain'  => 'Text Domain',
        'DomainPath'  => 'Domain Path',
      );
    }

    protected function initData()
    {
      $this->slug = get_template(); //plugin_basename( $this->pluginFile );
      $this->pluginData = get_plugin_data($this->pluginFile);
    }

    protected function getTransientValue($package)
    {
      return [
        'theme'            => $this->slug,
        'new_version'      => str_replace('v', '', $this->bitbucketAPIResult['Version']),
        'url'              => sprintf("https://bitbucket.org/%s/", $this->repo),
        'package'          => $package,
        'update-supported' => true,
        // ToDo: Add support for the below fields
        /* 'requires'         => $theme->requires,
      'requires_php'     => $theme->requires_php,
      'tested'           => $theme->tested,
      'branch'           => $theme->branch,
      'branches'         => array_keys( $theme->branches ),
      'type'             => "{$theme->git}-{$theme->type}", */
      ];
    }

    public function upgrader_source_selection($source, $remote_source, $upgrader, $hook_extra = null)
    {
      $this->initData();

      $destFolder = trailingslashit(WP_CONTENT_DIR . DIRECTORY_SEPARATOR . self::$type . 's' . DIRECTORY_SEPARATOR .  $this->slug);
      $hook_extra['destination'] = $destFolder;
      $hook_extra['remote_destination'] = $destFolder;
      $hook_extra['destination_name'] = $this->slug;

      $this->move($source, trailingslashit($remote_source) . $this->slug, true);

      return trailingslashit(trailingslashit($remote_source) . $this->slug);
    }
  }
endif;

if (!class_exists('PluginUpdater', false)) :
  class PluginUpdater extends Updater
  {
    protected static $type = 'plugin';

    function __construct($pluginFile, $repo, $branch)
    {
      parent::__construct($pluginFile, $repo, $branch);
      $this->headerFile = basename($pluginFile);
      add_filter("site_transient_update_plugins", array($this, "setTransient"));
      add_filter("plugins_api", array($this, "setPluginInfo"), 10, 3);
      add_filter("upgrader_post_install", array($this, "postInstall"), 10, 3);
      //add_filter('http_request_args', array($this, 'modifyRequestArgs'), 10, 2);
    }


    protected function getHeaderNames()
    {
      return array(
        'Name'              => 'Plugin Name',
        'PluginURI'         => 'Plugin URI',
        'Version'           => 'Version',
        'Description'       => 'Description',
        'Author'            => 'Author',
        'AuthorURI'         => 'Author URI',
        'TextDomain'        => 'Text Domain',
        'DomainPath'        => 'Domain Path',
        'Network'           => 'Network',

        //The newest WordPress version that this plugin requires or has been tested with.
        //We support several different formats for compatibility with other libraries.
        'Tested WP'         => 'Tested WP',
        'Requires WP'       => 'Requires WP',
        'Tested up to'      => 'Tested up to',
        'Requires at least' => 'Requires at least',
      );
    }

    protected function initData()
    {
      $this->slug = plugin_basename($this->pluginFile);
      error_log(plugin_basename($this->pluginFile));
      $this->pluginData = get_plugin_data($this->pluginFile);
    }

    protected function getTransientValue($package)
    {
      error_log(json_encode($this->bitbucketAPIResult));
      return (object) [
        'url'              => sprintf("https://bitbucket.org/%s/", $this->repo),
        'package'          => $package,
        'update-supported' => true,
        'slug'             => $this->slug,
        'plugin'           => $this->pluginFile,
        'new_version'      => str_replace('v', '', $this->bitbucketAPIResult['Version']),
        // ToDo: Add support for the below fields
        /* 'icons'            => $this->bitbucketAPIResult['icons'],
      'tested'            => $this->bitbucketAPIResult['tested'],
      'requires'            => $this->bitbucketAPIResult['requires'],
      'requires_php'            => $this->bitbucketAPIResult['requires_php'],
      'banners'            => $this->bitbucketAPIResult['banners'],
      'branch'            => $this->bitbucketAPIResult['branch'],
      'branches'         => array_keys( $this->bitbucketAPIResult['branch'] ),
      'type'             => "{$this->bitbucketAPIResult['git']}-{$this->bitbucketAPIResult['type']}", */
      ];
    }

    // Push in plugin version information to display in the details lightbox
    public function setPluginInfo($res, $action, $args)
    {
      $this->initData();

      if ($action == 'plugin_information' && $args->slug == $this->slug) {
        $res = new \stdClass();
        $res->name = $this->pluginData['Name'];
        $res->slug = $this->slug;

        $changelog = 'No readme file present in repo.';
        error_log('preadme');

        $readme = $this->getReadmeFile();
        if ($readme) {
          error_log('readme');
          $Parsedown = new \Parsedown();
          $changelog = $Parsedown->setBreaksEnabled(true)->text($readme);
          error_log($changelog);
        }

        $res->sections = [
          'changelog' => $changelog,
        ];
      }

      return $res;
    }

    // Perform additional actions to successfully install our plugin
    public function postInstall($true, $hook_extra, $result)
    {
      // Get plugin information
      $this->initData();

      error_log(json_encode($hook_extra));
      if (array_key_exists('plugin', $hook_extra) and ($hook_extra['plugin'] === $this->slug)) {
        // Remember if our plugin was previously activated
        $wasActivated = is_plugin_active($this->slug);

        // Since we are hosted in GitHub, our plugin folder would have a dirname of
        // reponame-tagname change it to our original one:
        $pluginFolder = WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . dirname( $this->slug );
        $this->move( $result['destination'], $pluginFolder );
        $result['destination'] = $pluginFolder;


        // Re-activate plugin if needed
        if ($wasActivated) {
          $activate = activate_plugin($this->slug);
        }
      }

      return $result;
    }
  }
endif;

<?php
/**
 * Plugin Name:     UCLA-WP Plugin
 * Description:     UCLA branded and ADA complaint components. Currently in beta, not reccomended for production use.
 * Version:         0.1.1
 * Author:          Computing and Disabilities Program and Strategic Communications
 * Text Domain:     ucla-wp-plugin
 *
 * @package         uwai
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

/* require 'libs/ucla-updater/updater.php';
new PluginUpdater(__FILE__, 'avelikanov/testpg', 'master'); */



function ucla_dcp_ucla_dcp_block_init() {

  wp_enqueue_script('jquery');
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "uwai/uwai" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'uwai-uwai-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_localize_script(
		'uwai-uwai-block-editor',
		'js_data',
		array(
			'path' => plugins_url( '', __FILE__ )
		)
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'uwai-uwai-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'uwai-uwai-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'uwai/uwai', array(
		'editor_script' => 'uwai-uwai-block-editor',
		'editor_style'  => 'uwai-uwai-block-editor',
		'style'         => 'uwai-uwai-block',
	) );

}
add_action( 'init', 'ucla_dcp_ucla_dcp_block_init' );

function cpt_publication() {
	$labels = array(
		'name'                  => 'Publications',
		'singular_name'         => 'Publication',
		'menu_name'             => 'Publication',
		'name_admin_bar'        => 'Publication',
		'archives'              => 'Publication Archive',
		'all_items'             => 'All Publications',
		'add_new_item'          => 'Add New Publication',
		'add_new'               => 'Add Publication',
		'new_item'              => 'New Publication',
		'edit_item'             => 'Edit Publication',
		'update_item'           => 'Update Publication',
		'search_items'          => 'Search Publications',
		'not_found'             => 'Publication not found',
		'not_found_in_trash'    => 'Publication not found in Trash',
		'featured_image'        => 'Publication Image',
		'set_featured_image'    => 'Set publication image',
		'remove_featured_image' => 'Remove publication image',
		'use_featured_image'    => 'Use as publication image',
	);
	$args = array(
		'label'                 => 'Publication',
		'description'           => 'Publication Post Type',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_rest'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
	);
	register_post_type( 'publication', $args );
}

add_action( 'init', 'cpt_publication' );

add_filter('template_include', 'publication_template');
function publication_template($template) {
	if ( is_post_type_archive('publication') ) {
		$theme_files = array('archive-publication.php', 'ucla-wp-plugin/archive-publication.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return plugin_dir_path(__FILE__) . 'archive-publication.php';
		}
	}
	if ( is_singular('publication') ) {
		$theme_files = array('single-publication.php', 'ucla-wp-plugin/single-publication.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return plugin_dir_path(__FILE__) . 'single-publication.php';
		}
	}
	return $template;
}
<?php
/**
 * Plugin Name:     UCLA-WP Plugin
 * Description:     UCLA branded and ADA complaint components. CUrrently in beta, not reccomended for production use.
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
		'render_callback' => 'uwai_recentpost_render'
	) );
}
add_action( 'init', 'ucla_dcp_ucla_dcp_block_init' );

function uwai_recentposts_render($attr, $content) {

}
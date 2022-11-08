<?php
/**
 * Plugin Name:     UCLA-WP Plugin
 * Description:     UCLA branded and ADA complaint components. Currently in beta, not reccomended for production use.
 * Version:         0.1.1
 * Author:          Computing and Disabilities Program and Strategic Communications
 * Text Domain:     ucla-dcp-plugin
 * Domain Path:		/languages
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

include __DIR__ . '/src/event-card/index.php';
include __DIR__ . '/src/recent-posts/index.php';
include __DIR__ . '/src/gallery-block/index.php';
include __DIR__ . '/src/publications/index.php';

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
		'style'         => 'uwai-uwai-block'
	) );

}
add_action( 'init', 'ucla_dcp_ucla_dcp_block_init' );



// Add to API
function register_rest_fields() {
	$publication_exists = post_type_exists('publication');
	$events_exists = post_type_exists('events');
	if ($publication_exists) {
		register_rest_field('publication', 'publication_author',
			array(
				'get_callback' => 'get_post_meta_callback',
				'update_callback' => 'update_post_meta_callback',
				'schema'          => array(
					'type'        => 'string',
					'arg_options' => array(
						'sanitize_callback' => function ( $value ) {
							// Make the value safe for storage.
							return sanitize_text_field( $value );
						}
					),
				),
			)
		);
	}
	if ($events_exists) {
		register_rest_field('events', 'event_start_date',
			array(
				'get_callback' => 'get_post_meta_callback',
				'update_callback' => 'update_post_meta_callback',
				'schema'          => array(
					'type'        => 'string',
					'arg_options' => array(
						'sanitize_callback' => function ( $value ) {
							// Make the value safe for storage.
							return sanitize_text_field( $value );
						}
					),
				),
			)
		);
		register_rest_field('events', 'event_end_date',
			array(
				'get_callback' => 'get_post_meta_callback',
				'update_callback' => 'update_post_meta_callback',
				'schema'          => array(
					'type'        => 'string',
					'arg_options' => array(
						'sanitize_callback' => function ( $value ) {
							// Make the value safe for storage.
							return sanitize_text_field( $value );
						}
					),
				),
			)
		);
		register_rest_field('events', 'event_time',
			array(
				'get_callback' => 'get_post_meta_callback',
				'update_callback' => 'update_post_meta_callback',
				'schema'          => array(
					'type'        => 'string',
					'arg_options' => array(
						'sanitize_callback' => function ( $value ) {
							// Make the value safe for storage.
							return sanitize_text_field( $value );
						}
					),
				),
			)
		);
		register_rest_field('events', 'event_location',
			array(
				'get_callback' => 'get_post_meta_callback',
				'update_callback' => 'update_post_meta_callback',
				'schema'          => array(
					'type'        => 'string',
					'arg_options' => array(
						'sanitize_callback' => function ( $value ) {
							// Make the value safe for storage.
							return sanitize_text_field( $value );
						}
					),
				),
			)
		);
	}
}
function get_post_meta_callback($object, $field_name, $request) {
	$post_meta = get_post_meta($object['id'], $field_name, true);
	$output['rendered'] = $post_meta;
	return $output;
}

function update_post_meta_callback($value, $object, $field_name) {
	if ( ! $value || ! is_string( $value ) ) {
        return;
    }
    return update_post_meta( $object->ID, $field_name, $value );
}
add_action('rest_api_init', 'register_rest_fields');

<?php

function cpt_publication() {
	$labels = array(
		'name'                  => 'Publications',
		'singular_name'         => 'Publication',
		'menu_name'             => 'Publications',
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
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'menu_icon'              => 'dashicons-book',
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
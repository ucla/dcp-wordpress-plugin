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
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/archive-publication.php';
		}
	}
	if ( is_singular('publication') ) {
		$theme_files = array('single-publication.php', 'ucla-wp-plugin/single-publication.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/single-publication.php';
		}
	}
	return $template;
}

class PublicationMetaBox {
	private $screen = array(
		'publication',        
	);

	private $meta_fields = array(
		array(
			'label' => 'Author',
			'id' => 'publication-author',
			'type' => 'text',
		),
	);

	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_fields' ) );
	}

	public function add_meta_boxes() {
		foreach ( $this->screen as $single_screen ) {
			add_meta_box(
				'Publication Information',
				__( 'Publication Information', '' ),
				array( $this, 'meta_box_callback' ),
				$single_screen,
				'normal',
				'high'
			);
		}
	}

	public function meta_box_callback( $post ) {
		wp_nonce_field( 'PublicationInformation_data', 'PublicationInformation_nonce' );
		$this->field_generator( $post );
	}

	public function field_generator( $post ) {
		$output = '';
		foreach ( $this->meta_fields as $meta_field ) {
			$label = '<label for="' . $meta_field['id'] . '">' . $meta_field['label'] . '</label>';
			$meta_value = get_post_meta( $post->ID, $meta_field['id'], true );
			if ( empty( $meta_value ) ) {
				if ( isset( $meta_field['default'] ) ) {
					$meta_value = $meta_field['default'];
				}
			}
			// switch ( $meta_field['type'] ) {
			// 	case 'select':
			// 		$input = sprintf(
			// 			'<select id="%s" name="%s">',
			// 			$meta_field['id'],
			// 			$meta_field['id']
			// 		);
			// 		foreach ( $meta_field['options'] as $key => $value ) {
			// 			$meta_field_value = !is_numeric( $key ) ? $key : $value;
			// 			$input .= sprintf(
			// 				'<option %s value="%s">%s</option>',
			// 				$meta_value === $meta_field_value ? 'selected' : '',
			// 				$meta_field_value,
			// 				$value
			// 			);
			// 		}
			// 		$input .= '</select>';
			// 		break;

			// 	default:
			// 		$input = sprintf(
			// 			'<input %s id="%s" name="%s" type="%s" value="%s">',
			// 			$meta_field['type'] !== 'color' ? 'style="width: 100%"' : '',
			// 			$meta_field['id'],
			// 			$meta_field['id'],
			// 			$meta_field['type'],
			// 			$meta_value
			// 		);
			// }
			$input = sprintf(
				'<input %s id="%s" name="%s" type="%s" value="%s">',
				$meta_field['type'] !== 'color' ? 'style="width: 100%"' : '',
				$meta_field['id'],
				$meta_field['id'],
				$meta_field['type'],
				$meta_value
			);
			$output .= $this->format_rows( $label, $input );
		}
		echo '<table class="form-table"><tbody>' . $output . '</tbody></table>';
	}

	public function format_rows( $label, $input ) {
		return '<tr><th>'.$label.'</th><td>'.$input.'</td></tr>';
	}

	public function save_fields( $post_id ) {
		if ( ! isset( $_POST['PublicationInformation_nonce'] ) )
			return $post_id;
		$nonce = $_POST['PublicationInformation_nonce'];
		if ( !wp_verify_nonce( $nonce, 'PublicationInformation_data' ) )
			return $post_id;
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			return $post_id;
		foreach ( $this->meta_fields as $meta_field ) {
			if ( isset( $_POST[ $meta_field['id'] ] ) ) {
				switch ( $meta_field['type'] ) {
					case 'email':
						$_POST[ $meta_field['id'] ] = sanitize_email( $_POST[ $meta_field['id'] ] );
						break;
					case 'text':
						$_POST[ $meta_field['id'] ] = sanitize_text_field( $_POST[ $meta_field['id'] ] );
						break;
				}
				update_post_meta( $post_id, $meta_field['id'], $_POST[ $meta_field['id'] ] );
			} else if ( $meta_field['type'] === 'checkbox' ) {
				update_post_meta( $post_id, $meta_field['id'], '0' );
			}
		}
	}
}

if (class_exists('PublicationMetaBox')) {
	new PublicationMetaBox;
};
<?php

function cpt_publication() {
	$labels = array(
		'name'                  => 'Publications',
		'singular_name'         => __('Publication', 'ucla-dcp-plugin'),
		'menu_name'             => __('Publications', 'ucla-dcp-plugin'),
		'name_admin_bar'        => __('Publication', 'ucla-dcp-plugin'),
		'archives'              => __('Publication Archive', 'ucla-dcp-plugin'),
		'all_items'             => __('All Publications', 'ucla-dcp-plugin'),
		'add_new_item'          => __('Add New Publication', 'ucla-dcp-plugin'),
		'add_new'               => __('Add Publication', 'ucla-dcp-plugin'),
		'new_item'              => __('New Publication', 'ucla-dcp-plugin'),
		'edit_item'             => __('Edit Publication', 'ucla-dcp-plugin'),
		'update_item'           => __('Update Publication', 'ucla-dcp-plugin'),
		'search_items'          => __('Search Publications', 'ucla-dcp-plugin'),
		'not_found'             => __('Publication not found', 'ucla-dcp-plugin'),
		'not_found_in_trash'    => __('Publication not found in Trash', 'ucla-dcp-plugin'),
		'featured_image'        => __('Publication Image', 'ucla-dcp-plugin'),
		'set_featured_image'    => __('Set publication image', 'ucla-dcp-plugin'),
		'remove_featured_image' => __('Remove publication image', 'ucla-dcp-plugin'),
		'use_featured_image'    => __('Use as publication image', 'ucla-dcp-plugin'),
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
		$theme_files = array('archive-publication.php', 'ucla-wp-plugin/src/publications/archive-publication.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/src/publications/archive-publication.php';
		}
	}
	if ( is_singular('publication') ) {
		$theme_files = array('single-publication.php', 'ucla-wp-plugin/src/publications/single-publication.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/src/publications/single-publication.php';
		}
	}
	return $template;
}

class PublicationMetaBox {
	private $screen = array(
		'publication',        
	);

	private $meta_fields;

	public function __construct() {
		$this->meta_fields = array(
			array(
				'label' => __('Author (if multiple, separate by comma)', 'ucla-dcp-plugin'),
				'id' => 'publication_author',
				'type' => 'text',
			),
			array(
				'label' => __('Publisher', 'ucla-dcp-plugin'),
				'id' => 'publication_publisher',
				'type' => 'text'
			),
			array(
				'label' => __('Publication Year', 'ucla-dcp-plugin'),
				'id' => 'publication_year',
				'type' => 'text'
			),
			array(
				'label' => __('Page Number', 'ucla-dcp-plugin'),
				'id' => 'publication_page',
				'type' => 'text'
			),
			array(
				'label' => __('ISBN', 'ucla-dcp-plugin'),
				'id' => 'publication_isbn',
				'type' => 'text'
			),
			array(
				'label' => __('ISBN (Paperback)', 'ucla-dcp-plugin'),
				'id' => 'publication_isbn_paper',
				'type' => 'text'
			),
			array(
				'label' => __('ISBN (Hardcover)', 'ucla-dcp-plugin'),
				'id' => 'publication_isbn_hardcover',
				'type' => 'text'
			),
			array(
				'label' => __('ISBN (E-book)', 'ucla-dcp-plugin'),
				'id' => 'publication_isbn_ebook',
				'type' => 'text'
			)
		);
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_fields' ) );
	}

	public function add_meta_boxes() {
		foreach ( $this->screen as $single_screen ) {
			add_meta_box(
				'Publication Information',
				__( 'Publication Information', 'ucla-dcp-plugin' ),
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

// Add to API
// function register_rest_fields() {
// 	register_rest_field('publication', 'publication_author',
// 		array(
// 			'get_callback' => 'get_post_meta_callback',
// 			'update_callback' => 'update_post_meta_callback',
// 			'schema' => null
// 		)
// 		);
// }
// function get_post_meta_callback($object, $field_name, $request) {
// 	$publication_author = get_post_meta($object['id'], $field_name, true);
// 	$output['rendered'] = $publication_author;
// 	return $output;
// }

// function update_post_meta_callback($value, $object, $field_name) {
// 	if ( ! $value || ! is_string( $value ) ) {
//         return;
//     }
//     return update_post_meta( $object->ID, $field_name, $value );
// }
// add_action('rest_api_init', 'register_rest_fields');

/**
 * Renders the `publication` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_core_publication( $attributes ) {
	global $post;
	$args = array(
		'post_type'			=> 'publication',
		'posts_per_page'		=> strval($attributes['numberOfPosts']),
		'post_status'		=> 'publish',
		'order'               => 'DESC',
		'orderby'             => 'date',
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);

	$query        = new WP_Query;
	$recent_posts = $query->query($args);
	update_post_thumbnail_cache( $query );
	$publication_markup = '<div class="publication-container">';

	foreach ( $recent_posts as $post ) {
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );
		$featured_image = get_the_post_thumbnail($post,'large',array('class'=>'basic-card__image'));
		$publication_author = get_post_meta($post->ID,'publication_author', true);
		$publication_markup .= '<article class="basic-card">';
		$publication_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( $post_link ),
			$featured_image
		);
		$publication_markup .= '<div class="basic-card__info-wrapper"><h3 class="basic-card__title mb-0"><span>';
		$publication_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( $post_link ),
			$title
		);
		$publication_markup .= '</span></h3>';
		if ($attributes['displayAuthor'] == true) {
			$publication_markup .= sprintf(
				'<p class="basic-card__description">%1s</p>',
				$publication_author
			);
		}
		$publication_markup .= '</div></article>';
	}
	$publication_markup .= "</div>";
	return $publication_markup;
}

function register_block_core_publication() {
	register_block_type_from_metadata(
		__DIR__,
		array(
			'render_callback' => 'render_block_core_publication'
		)
		);
}
add_action('init', 'register_block_core_publication');
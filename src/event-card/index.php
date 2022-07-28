<?php

function cpt_events() {
    $labels = array(
        'name'          =>  'Events',
        'singular_name' =>  'Event',
        'menu_name'     =>  'Events',
        'archives'      =>  'Past Events',
        'all_items'     =>  'All Events',
        'add_new_item'  =>  'Add New Event',
        'add_new'       =>  'Add Event',
        'new_item'      =>  'New Event',
        'edit_item'     =>  'Edit Event',
        'update_item'   =>  'Update Event',
        'search_items'  =>  'Search Events',
        'not_found'     =>  'Event not found',
        'not_found_in_trash'    =>  'Event not found in Trash'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Events Post Type',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'heirarchical'  => false,
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
        'menu_icon'             => 'dashicons-calendar-alt',
        'compability_type'      => 'post'
    );
    register_post_type('events', $args);
}

add_action('init', 'cpt_events');

class EventsMetaBox {
    private $screen = array(
        'events'
    );

    private $meta_fields = array(
        array(
            'label' => 'Event Start Date',
            'id'    => 'event_start_date',
            'type'  => 'date'
        ),
        array(
            'label' => 'Event End Date',
            'id'    => 'event_end_date',
            'type'  => 'date'
        ),
		array(
            'label' => 'Event Time',
            'id'    => 'event_time',
            'type'  => 'time'
        ),
		array(
			'label' => 'Location',
			'id'	=> 'event_location',
			'type'	=> 'text'
		),
		array(
			'label'	=> 'RSVP Link',
			'id'	=> 'event_rsvp',
			'type'	=> 'text'
		)
    );

    public function __construct()
    {
        add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_fields' ) );
    }
    
    public function add_meta_boxes() {
		foreach ( $this->screen as $single_screen ) {
			add_meta_box(
				'Event Information',
				__( 'Event Information', '' ),
				array( $this, 'meta_box_callback' ),
				$single_screen,
				'normal',
				'high'
			);
		}
	}

    public function meta_box_callback( $post ) {
		wp_nonce_field( 'EventInformation_data', 'EventInformation_nonce' );
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
		if ( ! isset( $_POST['EventInformation_nonce'] ) )
			return $post_id;
		    $nonce = $_POST['EventInformation_nonce'];
		if ( !wp_verify_nonce( $nonce, 'EventInformation_data' ) )
			return $post_id;
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			return $post_id;
		foreach ( $this->meta_fields as $meta_field ) {
            var_dump($meta_field);
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

if (class_exists('EventsMetaBox')) {
	new EventsMetaBox;
};

add_filter('template_include', 'events_template');
function events_template($template) {
	if ( is_post_type_archive('events') ) {
		$theme_files = array('archive-events.php', 'ucla-wp-plugin/src/event-card/archive-events.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/src/event-card/archive-events.php';
		}
	}
	if ( is_singular('events') ) {
		$theme_files = array('single-events.php', 'ucla-wp-plugin/src/event-card/single-events.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/ucla-wp-plugin/src/event-card/single-events.php';
		}
	}
	return $template;
}

// function register_event_rest_fields() {
// 	register_rest_field('events', 'event_start_date',
// 		array(
// 			'get_callback' => 'get_post_meta_callback',
// 			'update_callback' => 'update_post_meta_callback',
// 			'schema'          => array(
// 				'type'        => 'string',
// 				'arg_options' => array(
// 					'sanitize_callback' => function ( $value ) {
// 						// Make the value safe for storage.
// 						return sanitize_text_field( $value );
// 					}
// 				),
// 			),
// 		)
// 	);
// 	register_rest_field('events', 'event_end_date',
// 		array(
// 			'get_callback' => 'get_post_meta_callback',
// 			'update_callback' => 'update_post_meta_callback',
// 			'schema'          => array(
// 				'type'        => 'string',
// 				'arg_options' => array(
// 					'sanitize_callback' => function ( $value ) {
// 						// Make the value safe for storage.
// 						return sanitize_text_field( $value );
// 					}
// 				),
// 			),
// 		)
// 	);
// }
// function update_post_meta_callback($value, $object, $field_name) {
// 	if ( ! $value || ! is_string( $value ) ) {
//         return;
//     }
//     return update_post_meta( $object->ID, $field_name, $value );
// }
// function get_post_meta_callback($object, $field_name, $request) {
// 	$event_info = get_post_meta($object['id'], $field_name, true);
// 	$output['rendered'] = $event_info;
// 	return $output;
// }

// add_action('rest_api_init', 'register_event_rest_fields');

function render_block_core_events( $attributes ) {
	global $post;
	$today = date('Y-m-d');
	switch ($attributes['eventSelection']) {
		case 'upcoming':
			$args = array(
				'post_type'			=> 'events',
				// 'posts_per_page'		=> strval($attributes['numberOfPosts']),
				'post_status'		=> 'publish',
				'order'               => 'DESC',
				'orderby'             => 'date',
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
				'meta_query'		=> array(
					array(
						'key' => 'event_start_date',
						'value' => $today,
						'compare' => '>=',
						'type' => 'DATE'
					)
				)	
			);
			break;
		case 'past':
			$args = array(
				'post_type'			=> 'events',
				// 'posts_per_page'		=> strval($attributes['numberOfPosts']),
				'post_status'		=> 'publish',
				'order'               => 'DESC',
				'orderby'             => 'date',
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
				'meta_query' => array(
					array(
						'key' => 'event_start_date',
						'value' => $today,
						'compare' => '<',
						'type' => 'DATE'
					)
				)
				
			);
			break;
		case 'both':
			$args = array(
				'post_type'			=> 'events',
				// 'posts_per_page'		=> strval($attributes['numberOfPosts']),
				'post_status'		=> 'publish',
				'order'               => 'DESC',
				'orderby'             => 'meta_value',
				'meta_key'		      => 'event_start_date',
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
				'meta_query' => array(
					array(
						'key' => 'event_start_date',
						'type' => 'DATE'
					)
				)
			);
			break;
		default:
			$args = array(
				'post_type'			=> 'events',
				// 'posts_per_page'		=> strval($attributes['numberOfPosts']),
				'post_status'		=> 'publish',
				'order'               => 'DESC',
				'orderby'             => 'meta_value',
				'meta_key'		      => 'event_start_date',
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
				'meta_query' => array(
					array(
						'key' => 'event_start_date',
						'type' => 'DATE'
					)
				)
			);
			break;
	}

	$query        = new WP_Query;
	$recent_posts = $query->query($args);
	update_post_thumbnail_cache( $query );
	$events_markup = '<div class="events-container ' . $attributes['eventSelection'] . '">';

	foreach ( $recent_posts as $post ) {
		// Get date
		$start_date = new DateTime(get_post_meta($post->ID,'event_start_date', true));
		$start_time = new DateTime(get_post_meta($post->ID,'event_time', true));
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );
		$featured_image = get_the_post_thumbnail($post,'large',array('class'=>'event-card__image'));
		// $publication_author = get_post_meta($post->ID,'publication_author', true);
		$events_markup .= '<article class="event-card">';
		$events_markup .= sprintf(
			'<a class="event-card__link" href="%1$s">%2$s<h3 class="event-card__title">%3$s</h3></a>',
			esc_url( $post_link ),
			$featured_image,
			$title
		);
		$events_markup .= '
			<div class="event-card-info">
				<div class="event-card-info__date">
					<span class="small-block">
		';
		$events_markup .= sprintf(
			'<span class="event-card-info__day">%1$s</span><span class="event-card-info__month">%2$s</span>',
			$start_date -> format('D'),
			$start_date -> format('M')
		);
		$events_markup .= sprintf(
			'</span><span class="event-card-info__number">%1$s</span>',
			$start_date -> format('d')
		);
		$events_markup .= '
			</div>
		';
		$events_markup .= sprintf('
			<div class="event-card-info__time">
				<object class="event-card-icon__time" tabindex="-1" type="image/svg">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="enable-background: new 0 0 24 24">
							<title>time</title>
							<g>
									<path fill="#666666" className="time--grey" d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10C6.5,22,2,17.5,2,12S6.5,2,12,2z M12,4
											c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M12.5,7v5.2l4.5,2.7l-0.8,1.2L11,13V7H12.5z" />
							</g>
						</svg>
				</object>%1$s
			</div>
		', $start_time -> format('g:i A'));
		$events_markup .= sprintf('
			<div class="event-card-info__location">
				<object class="event-card-icon__location" tabindex="-1" type="image/svg">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
				style="enable-background: new 0 0 24 24"><title>Location</title><path class="location--grey" style="fill: #666" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>
				</object>%1$s
			</div>
		', get_post_meta($post->ID,'event_location', true));
		$events_markup .= sprintf('
			<div class="event-card-info__description">%1$s</div>
		', get_the_excerpt($post));
		$events_markup .= '</div></article>';
	}
	$events_markup .= "</div>";
	return $events_markup;
}

function register_block_core_events() {
	register_block_type_from_metadata(
		__DIR__,
		array(
			'render_callback' => 'render_block_core_events'
		)
		);
}
add_action('init', 'register_block_core_events');
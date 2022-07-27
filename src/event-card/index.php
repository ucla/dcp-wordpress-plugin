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
<?php

function cpt_events() {
    $labels = array(
        'name'          	=>  'Events',
        'singular_name' 	=>  __('Event', 'ucla-dcp-plugin'),
        'menu_name'     	=>  __('Events', 'ucla-dcp-plugin'),
        'archives'      	=>  __('Past Events', 'ucla-dcp-plugin'),
        'all_items'     	=>  __('All Events', 'ucla-dcp-plugin'),
		'featured_image'	=>	__('Event Image', 'ucla-dcp-plugin'),
		'set_featured_image'    => __('Set event image', 'ucla-dcp-plugin'),
		'remove_featured_image' => __('Remove event image', 'ucla-dcp-plugin'),
		'use_featured_image'    => __('Use as event image', 'ucla-dcp-plugin'),
        'add_new_item'  	=>  __('Add New Event', 'ucla-dcp-plugin'),
        'add_new'       =>  __('Add Event', 'ucla-dcp-plugin'),
        'new_item'      =>  __('New Event', 'ucla-dcp-plugin'),
        'edit_item'     =>  __('Edit Event', 'ucla-dcp-plugin'),
        'update_item'   =>  __('Update Event', 'ucla-dcp-plugin'),
        'search_items'  =>  __('Search Events', 'ucla-dcp-plugin'),
        'not_found'     =>  __('Event not found', 'ucla-dcp-plugin'),
        'not_found_in_trash'    =>  __('Event not found in Trash', 'ucla-dcp-plugin')
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
            'label' => 'Event Start Time',
            'id'    => 'event_time',
            'type'  => 'time'
        ),
		array(
			'label' => 'Event End Time',
			'id'	=> 'event_end_time',
			'type'	=> 'time'
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
				__( 'Event Information', 'ucla-dcp-plugin' ),
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
		$theme_files = array('archive-events.php', 'dcp-wordpress-plugin/src/event-card/archive-events.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/dcp-wordpress-plugin/src/event-card/archive-events.php';
		}
	}
	if ( is_singular('events') ) {
		$theme_files = array('single-events.php', 'dcp-wordpress-plugin/src/event-card/single-events.php');
		$exists_in_theme = locate_template($theme_files, false);
		if ($exists_in_theme != '') {
			return $exists_in_theme;
		} else {
			return WP_PLUGIN_DIR . '/dcp-wordpress-plugin/src/event-card/single-events.php';
		}
	}
	return $template;
}

function render_block_core_events( $attributes ) {
	global $post;
	$today = date('Y-m-d');
	switch ($attributes['eventSelection']) {
		case 'upcoming':
			$args = array(
				'post_type'			=> 'events',
				'posts_per_page'		=> strval($attributes['numberOfEvents']),
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
				'posts_per_page'		=> strval($attributes['numberOfEvents']),
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
				'posts_per_page'		=> strval($attributes['numberOfEvents']),
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
				'posts_per_page'		=> strval($attributes['numberOfEvents']),
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
	$events_markup = '<div class="splide" id="' . $attributes['blockId'] . '"><div class="splide__track">';
	$events_markup .= '<ul class="splide__list events-container ' . $attributes['eventSelection'] . '">';

	foreach ( $recent_posts as $post ) {
		$events_markup .= '<li class="splide__slide">';
		// Get date
		$start_date = new DateTime(get_post_meta($post->ID,'event_start_date', true));
		$start_time = new DateTime(get_post_meta($post->ID,'event_time', true));
		if (get_post_meta($post->ID,'event_end_time', true)) {
			$end_time = new DateTime(get_post_meta($post->ID, 'event_end_time', true));
		}
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );
		$featured_image = get_the_post_thumbnail($post,'large',array('class'=>'event-card__image'));
		//$events_markup .= '<div class="splide__slide__container">';
		$events_markup .= sprintf(
			'<article class="event-card %1$s">',
			$start_date -> format('Y-m-d') > $today ? 'upcoming-events' : 'past-events'
		);
		$events_markup .= sprintf(
			'<div class="event-card__date">
				<div class="event-card__date-info">
					<time datetime="%2$s">%1$s</time>
				</div>
			</div>',
			$start_date -> format('l, F j, o'),
			$start_date -> format('o-m-d'),
		);
		$events_markup .= sprintf(
			'<a class="event-card__link" href="%1$s" title="%2$s">
				%3$s
				<h3 class="event-card__title"><span>%2$s</span></h3>
			</a>',
			esc_url( $post_link ),
			$title,
			$featured_image
		);
		$events_markup .= sprintf(
			'<div class="event-card-info">
				<div class="event-card-info__time">
					<object class="event-card-icon__time" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/time--grey60.svg" type="image/svg+xml"></object>%1$s
			',
			$start_time -> format('g:i A')
		);
		if (get_post_meta($post->ID,'event_end_time', true)) {
			$events_markup .= sprintf(' to %1$s', $end_time -> format('g:i A'));
		}
		$events_markup .= sprintf('
			</div>
				<div class="event-card-info__location">
					<object class="event-card-icon__location" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/location--grey60.svg" type="image/svg+xml"></object>
					%1$s
				</div>
				<div class="event-card-info__description">%2$s</div>
			</div>',
			get_post_meta($post->ID,'event_location', true),
			get_the_excerpt($post->ID)
		);
		$events_markup .= '</article>';
		$events_markup .= '</li>';
	}
	$events_markup .= "</ul>";
	$events_markup .= "</div></div>";
	add_action('wp_footer', function() use ($attributes) {
		slider_init($attributes['blockId']);
	}, 21);
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

function slider_init($id) {
	echo '
		<script type="text/javascript">
		jQuery(document).ready(function(){
			new Splide("#'.$id.'", {
				arrows: false,
				easing: "ease",
				fixedWidth: false,
				gap: 24,
				pagination: false,
				perPage: 4,
				rewind: true,
				breakpoints: {
					414: {
					fixedWidth: 276,
					pagination: false,
					perPage: 1,
					},
					991: {
					fixedWidth: 276,
					pagination: false,
					perPage: 1,
					},
					1023: {
					fixedWidth: false,
					pagination: false,
					perPage: 4,
					}
				}
			}).mount();
		});
		</script>
	';
}
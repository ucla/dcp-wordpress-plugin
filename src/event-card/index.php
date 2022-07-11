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
        'supports'      => array( 'title', 'editor', 'thumbnail' ),
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
            'label' => 'Event Date',
            'id'    => 'event-date',
            'type'  => 'datetime-local'
        ),
    );
}
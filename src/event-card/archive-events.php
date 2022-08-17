<?php
/*
Template Name: Archives - Events
*/

date_default_timezone_set('America/Los_Angeles');
$today = date('Ymd');
$time = date("G:i:s", strtotime("-30 minutes"));
date_default_timezone_set('UTC');
get_header(); ?>
<main id="main" class="events-archive">
    <header class="header">
        <div class="ucla campus masthead">
            <div class="col span_12_of_12">
                <h1 class="entry-title"><?php echo get_the_archive_title() ?></h1>
                
            </div>
        </div>
    </header>
    <div class="ucla campus">

        <div class="col span_12_of_12">
            <h2>Upcoming</h2>
            <?php
                $posts = get_posts(
                    array(
                        'post_type' => 'events',
                        'posts_per_page'    =>  6,
                        'meta_query'    => array(
                            'relation'  =>  'OR',
                            array(
                                'key'   =>  'event_start_date',
                                'compare' => '>',
                                'value' => $today,
                                'type' => 'DATE',
                            ),
                            array(
                                'key' => 'event_end_date',
                                'compare' => '>',
                                'value' => $today,
                                'type' => 'DATE',
                            ),
                            array(
                                'relation'             => 'AND',
                                array(
                                    'key' => 'event_start_date',
                                    'compare' => '=',
                                    'value' => $today,
                                    'type' => 'DATE',
                                ),
                                array(
                                    'key' => 'event_time',
                                    'compare' => '>',
                                    'value' => $time,
                                    'type' => 'NUMERICAL'
                                )
                            )
                        ),
                        'meta_key' => 'event_start_date',
                        'orderby' => 'meta_value',
                        'order' => 'ASC',
                    )
                );
                if ($posts) {
                    foreach ($posts as $post) { ?>
                <div class="event">
                    <div class="event-img-wrapper">
                        <?php
                        // Get thumbnail URL only to avoid inline image sizing
                        $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium', false ); 
                        if (has_post_thumbnail()) {
                        ?>
                            <figure>
                                <img src="<?php echo $thumbnail[0]; ?>" class="event-featured-img" alt="<?= the_title() ?>">
                            </figure>
                        <?php } else { 
                            $plugin_url = plugin_dir_url(__FILE__);
                        ?>
                            <figure class="event-placeholder-wrapper">
                                <img class="event-placeholder" src="<?=$plugin_url ?>ucla-image-placeholder.jpg" alt="<?php the_title(); ?>" />
                            </figure>
                        <?php } ?>
                    </div>
                    <div class="event-content">
                        <h3 class="event-title"><a href="<?php echo get_permalink( $post->ID ); ?>"><?=the_title(); ?></a></h3>
                        <div class="event-info">
                            <div class="event-start-date">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10 11" style="enable-background:new 0 0 10 11;" xml:space="preserve">
                                    <g>
                                        <g transform="translate(-27.000000, -1767.000000)">
                                            <g id="Updates" transform="translate(0.000000, 586.000000)">
                                            <g id="Upcoming-Townhalls" transform="translate(24.000000, 1053.000000)">
                                                <g id="Minifeed" transform="translate(0.000000, 45.000000)">
                                                <g id="Date-Time-Location" transform="translate(0.000000, 82.000000)">
                                                    <g id="Time-Icon-_x28_required_x29_" transform="translate(3.000000, 1.000000)">
                                                    <path id="Shape" fill="#666666" d="M7.5,6.3H5v2.5h2.5V6.3z M7,0.8v1H3v-1H2v1H1.5c-0.6,0-1,0.4-1,1l0,7c0,0.6,0.4,1,1,1h7
                                                                    c0.6,0,1-0.4,1-1v-7c0-0.5-0.4-1-1-1H8v-1H7z M8.5,9.8h-7V4.3h7V9.8z"/>
                                                    </g>
                                                </g>
                                                </g>
                                            </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg> 
                                <?= get_post_meta($post->ID,'event_start_date', true) ? date('F j, Y', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD' ?>
                            </div>
                            <div class="event-time">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                    <title>time</title>
                                    <g>
                                            <path fill="#666666" class="time--grey" d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10C6.5,22,2,17.5,2,12S6.5,2,12,2z M12,4
                                                    c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M12.5,7v5.2l4.5,2.7l-0.8,1.2L11,13V7H12.5z" />
                                    </g>
                                </svg>  
                                <?= get_post_meta($post->ID,'event_time', true) ? date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : 'TBD' ?>
                            </div>
                            <div class="event-location">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 13" style="enable-background:new 0 0 8 13;" xml:space="preserve">
                                    <g id="Homepage">
                                        <g id="covid-homepage-mobile-1" transform="translate(-28.000000, -1806.000000)">
                                            <g id="Updates" transform="translate(0.000000, 586.000000)">
                                                <g id="Upcoming-Townhalls" transform="translate(24.000000, 1053.000000)">
                                                    <g id="Minifeed" transform="translate(0.000000, 45.000000)">
                                                        <g id="Date-Time-Location" transform="translate(0.000000, 82.000000)">
                                                            <g id="Location-_x28_optional_x29_" transform="translate(0.000000, 36.000000)">
                                                                <g id="Location-Icon-_x28_required_x29_" transform="translate(4.000000, 4.000000)">
                                                                    <path id="Shape" fill="#666666" d="M4,0.7c-2.2,0-4,1.8-4,4c0,3,4,7.4,4,7.4s4-4.4,4-7.4C8,2.5,6.2,0.7,4,0.7z M4,6.1
                                                                        c-0.8,0-1.4-0.6-1.4-1.4S3.2,3.2,4,3.2s1.4,0.6,1.4,1.4S4.8,6.1,4,6.1z"/>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <?= get_post_meta($post->ID,'event_location', true) ? get_post_meta($post->ID,'event_location', true) : 'TBD' ?>
                            </div>
                        </div>
                        <div class="event-excerpt"><?= the_excerpt() ?></div>
                    </div>
                </div>
                <?php }
                } else if(empty($posts)) {
                    _e( 'Information on upcoming events will be posted here as it becomes available.', 'textdomain' );
                }
                wp_reset_postdata();
            ?>
            <h2>Past</h2>
            <?php
                $pastposts = get_posts(
                    array(
                        'post_type' => 'events',
                        'posts_per_page'    =>  6,
                        'meta_query'    => array(
                            'relation' => 'OR',
                            array(
                                'key' => 'event_start_date',
                                'compare' => '<',
                                'value' => $today,
                                'type' => 'DATE',
                            ),
                            array(
                                'key' => 'event_end_date',
                                'compare' => '<',
                                'value' => $today,
                                'type' => 'DATE',
                            ),
                            array(
                                'relation' => 'AND',
                                array(
                                    'key' => 'event_start_date',
                                    'compare' => '=',
                                    'value' => $today,
                                    'type' => 'DATE',
                                ),
                                array(
                                    'key' => 'event_time',
                                    'compare' => '<',
                                    'value' => $time,
                                    'type' => 'NUMERICAL'
                                )
                            )
                                ),
                        'meta_key' => 'event_start_date',
                        'orderby' => 'meta_value',
                        'order' => 'DESC',
                    )
                );
                if ($pastposts) {
                    foreach ($pastposts as $post) { ?>
                        <div class="event">
                    <div class="event-img-wrapper">
                        <?php
                        // Get thumbnail URL only to avoid inline image sizing
                        $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium', false ); if (has_post_thumbnail()) {
                            ?>
                                <figure>
                                    <img src="<?php echo $thumbnail[0]; ?>" class="event-featured-img" alt="<?= the_title() ?>">
                                </figure>
                            <?php } else { 
                                $plugin_url = plugin_dir_url(__FILE__);
                            ?>
                                <figure class="event-placeholder-wrapper">
                                    <img class="event-placeholder" src="<?=$plugin_url ?>ucla-image-placeholder.jpg" alt="<?php the_title(); ?>" />
                                </figure>
                            <?php } ?>
                    </div>
                    <div class="event-content">
                        <h3 class="event-title"><a href="<?php echo get_permalink( $post->ID ); ?>"><?=the_title(); ?></a></h3>
                        <div class="event-info">
                            <div class="event-start-date">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10 11" style="enable-background:new 0 0 10 11;" xml:space="preserve">
                                    <g>
                                        <g transform="translate(-27.000000, -1767.000000)">
                                            <g id="Updates" transform="translate(0.000000, 586.000000)">
                                            <g id="Upcoming-Townhalls" transform="translate(24.000000, 1053.000000)">
                                                <g id="Minifeed" transform="translate(0.000000, 45.000000)">
                                                <g id="Date-Time-Location" transform="translate(0.000000, 82.000000)">
                                                    <g id="Time-Icon-_x28_required_x29_" transform="translate(3.000000, 1.000000)">
                                                    <path id="Shape" fill="#666666" d="M7.5,6.3H5v2.5h2.5V6.3z M7,0.8v1H3v-1H2v1H1.5c-0.6,0-1,0.4-1,1l0,7c0,0.6,0.4,1,1,1h7
                                                                    c0.6,0,1-0.4,1-1v-7c0-0.5-0.4-1-1-1H8v-1H7z M8.5,9.8h-7V4.3h7V9.8z"/>
                                                    </g>
                                                </g>
                                                </g>
                                            </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg> 
                                <?= get_post_meta($post->ID,'event_start_date', true) ? date('F j, Y', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD' ?>
                            </div>
                            <div class="event-time">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                    <title>time</title>
                                    <g>
                                            <path fill="#666666" class="time--grey" d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10C6.5,22,2,17.5,2,12S6.5,2,12,2z M12,4
                                                    c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M12.5,7v5.2l4.5,2.7l-0.8,1.2L11,13V7H12.5z" />
                                    </g>
                                </svg>  
                                <?= get_post_meta($post->ID,'event_time', true) ? date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : 'TBD' ?>
                            </div>
                            <div class="event-location">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 13" style="enable-background:new 0 0 8 13;" xml:space="preserve">
                                    <g id="Homepage">
                                        <g id="covid-homepage-mobile-1" transform="translate(-28.000000, -1806.000000)">
                                            <g id="Updates" transform="translate(0.000000, 586.000000)">
                                                <g id="Upcoming-Townhalls" transform="translate(24.000000, 1053.000000)">
                                                    <g id="Minifeed" transform="translate(0.000000, 45.000000)">
                                                        <g id="Date-Time-Location" transform="translate(0.000000, 82.000000)">
                                                            <g id="Location-_x28_optional_x29_" transform="translate(0.000000, 36.000000)">
                                                                <g id="Location-Icon-_x28_required_x29_" transform="translate(4.000000, 4.000000)">
                                                                    <path id="Shape" fill="#666666" d="M4,0.7c-2.2,0-4,1.8-4,4c0,3,4,7.4,4,7.4s4-4.4,4-7.4C8,2.5,6.2,0.7,4,0.7z M4,6.1
                                                                        c-0.8,0-1.4-0.6-1.4-1.4S3.2,3.2,4,3.2s1.4,0.6,1.4,1.4S4.8,6.1,4,6.1z"/>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <?= get_post_meta($post->ID,'event_location', true) ? get_post_meta($post->ID,'event_location', true) : 'TBD' ?>
                            </div>
                        </div>
                        <div class="event-excerpt"><?= the_excerpt() ?></div>
                    </div>
                </div>

                <?php    }
                } else if(empty($pastposts)) {
                    _e( 'Information on past events will be posted here as it becomes available.', 'textdomain' );
                }
                wp_reset_postdata();
            ?>
        </div>

    </div>

    <?php get_template_part('nav', 'below'); ?>
</main>
<?php get_footer(); ?>


<?php
date_default_timezone_set('America/Los_Angeles');
$today = date('Ymd');
$time = date("G:i:s", strtotime("-30 minutes"));
date_default_timezone_set('UTC');
get_header(); ?>
<main id="main" class="events-archive">
    <header class="header">
        <div class="ucla campus masthead">
            <div class="col span_12_of_12">
                <?php 
                    get_breadcrumb(); ?>
                <h1 class="entry-title"><?php echo get_the_archive_title() ?></h1>
                
            </div>
        </div>
    </header>

    <div class="upcoming-events">
        <div class="ucla campus">

            <div class="col span_12_of_12">
                <?php
                    $posts = get_posts(
                        array(
                            'post_type' => 'events',
                            'posts_per_page'    =>  6,
                            'meta_query'    => array(
                                array(
                                    'key'   =>  'event_start_date',
                                    'compare' => '>=',
                                    'value' => $today,
                                    'type' => 'DATE',
                                )
                            ),
                            'meta_key' => 'event_start_date',
                            'orderby' => 'meta_value',
                            'order' => 'ASC',
                        )
                    );
                    if ($posts) {
                ?>
                <div class="event-cards">
                    <?php foreach ($posts as $post) { ?>
                        <article class="event-card">
                            <div class="event-card__date">
                                <div class="event-card__date-info">
                                    <?php
                                        $event_date = get_post_meta($post->ID,'event_start_date', true) ? date('l, F j, Y', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                                        $event_date_attr = get_post_meta($post->ID,'event_start_date', true) ? date('Y-m-d', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                                    ?>
                                    <time datetime="<?=$event_date_attr ?>"><?=$event_date ?></time>
                                </div>
                            </div>
                            <a class="event-card__link" href="<?php echo get_permalink( $post->ID ); ?>" title="<?= the_title() ?>">
                                <?php
                                    // Get thumbnail URL only to avoid inline image sizing
                                    $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium', false ); 
                                    if (has_post_thumbnail()) {
                                ?>
                                        <img class="event-card__image" src="<?php echo $thumbnail[0]; ?>" alt="<?= the_title() ?>">
                                <?php
                                    } else { 
                                    $plugin_url = plugin_dir_url(__FILE__);
                                ?>
                                    <img class="event-card__image" src="<?=$plugin_url ?>ucla-image-placeholder.jpg" alt="<?php the_title(); ?>" />
                                <?php } ?>
                                <h3 class="event-card__title"><span><?php the_title(); ?></span></h3>
                            </a>
                            <div class="event-card-info">
                                <div class="event-card-info__time">
                                    <object class="event-card-icon__time" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/time--grey60.svg" type="image/svg+xml"></object>
                                    <?= get_post_meta($post->ID,'event_time', true) ? date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : 'TBD' ?><?= get_post_meta($post->ID,'event_end_time', true) ? ' to ' . date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : '' ?>
                                </div>
                                <div class="event-card-info__location">
                                    <object class="event-card-icon__location" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/location--grey60.svg" type="image/svg+xml">
                                    </object>
                                    <?= get_post_meta($post->ID,'event_location', true) ? get_post_meta($post->ID,'event_location', true) : 'TBD' ?>
                                </div>
                                <div class="event-card-info__description">
                                    <?= the_excerpt() ?>
                                </div>
                            </div>
                        </article>
                    <?php } ?>
                </div>
                    <?php } else if(empty($posts)) {
                        _e( 'Information on upcoming events will be posted here as it becomes available.', 'textdomain' );
                    }
                    wp_reset_postdata();
                ?>
            </div>
        </div>
    </div>
    <div class="past-events">
        <div class="ucla campus">
            <div class="col span_12_of_12">
            <h2>Past Events</h2>
            <p>To view past recordings and access resources related to previous events, please click on an event below.</p>
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
                if ($pastposts) { ?>
                    <div class="event-cards">
                   <?php foreach ($pastposts as $post) { ?>
                        <article class="event-card">
                            <div class="event-card__date">
                                <div class="event-card__date-info">
                                    <?php
                                        $event_date = get_post_meta($post->ID,'event_start_date', true) ? date('l, F j, Y', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                                        $event_date_attr = get_post_meta($post->ID,'event_start_date', true) ? date('Y-m-d', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                                    ?>
                                    <time datetime="<?=$event_date_attr ?>"><?=$event_date ?></time>
                                </div>
                            </div>
                            <a class="event-card__link" href="<?php echo get_permalink( $post->ID ); ?>" title="<?= the_title() ?>">
                                <?php
                                    // Get thumbnail URL only to avoid inline image sizing
                                    $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium', false ); 
                                    if (has_post_thumbnail()) {
                                ?>
                                        <img class="event-card__image" src="<?php echo $thumbnail[0]; ?>" alt="<?= the_title() ?>">
                                <?php
                                    } else { 
                                    $plugin_url = plugin_dir_url(__FILE__);
                                ?>
                                    <img class="event-card__image" src="<?=$plugin_url ?>ucla-image-placeholder.jpg" alt="<?php the_title(); ?>" />
                                <?php } ?>
                                <h3 class="event-card__title"><span><?php the_title(); ?></span></h3>
                            </a>
                            <div class="event-card-info">
                                <div class="event-card-info__time">
                                    <object class="event-card-icon__time" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/time--grey60.svg" type="image/svg+xml"></object>
                                    <?= get_post_meta($post->ID,'event_time', true) ? date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : 'TBD' ?><?= get_post_meta($post->ID,'event_end_time', true) ? ' to ' . date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : '' ?>
                                </div>
                                <div class="event-card-info__location">
                                    <object class="event-card-icon__location" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/location--grey60.svg" type="image/svg+xml">
                                    </object>
                                    <?= get_post_meta($post->ID,'event_location', true) ? get_post_meta($post->ID,'event_location', true) : 'TBD' ?>
                                </div>
                                <div class="event-card-info__description">
                                    <?= the_excerpt() ?>
                                </div>
                            </div>
                        </article>

                <?php    } ?>
                                    </div>
                <?php } else if(empty($pastposts)) {
                    _e( 'Information on past events will be posted here as it becomes available.', 'textdomain' );
                }
                wp_reset_postdata();
            ?>
        </div>

    </div>
    </div>
</main>
<?php get_footer(); ?>


<?php
/*
Template Name: Archives - Events
*/

date_default_timezone_set('America/Los_Angeles');
$today = date('Ymd');
$time = date("G:i:s", strtotime("-30 minutes"));
date_default_timezone_set('UTC');
get_header(); ?>
<main id="main" class="publications-archive">
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
                    foreach ($posts as $post) {
                        the_title();

                    }
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
                    foreach ($pastposts as $post) {
                        the_title();

                    }
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


<?php

    global $id;

    $thumb_id = get_post_thumbnail_id( $id );
    
    if ( '' != $thumb_id ) {
        $thumb_url  = wp_get_attachment_image_src( $thumb_id, 'full', true );
        $image      = $thumb_url[0];
        $image_alt_text =  get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
    }
    get_header();
?>
<main id="main" class="main event-page">
    <div class="ucla campus masthead">
        <div class="col span_7_of_12">
            <?php get_breadcrumb(); ?>
            <h1><?php the_title(); ?></h1>
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
            
            <?php
                if (get_post_meta($post->ID,'event_rsvp', true)) {
            ?>
            <a class="btn btn--sm btn--lightbg icon--link" href="<?=get_post_meta($post->ID,'event_rsvp', true)?>" target="_blank">RSVP</a>
            <?php
                }
            ?>
        </div>
        <div class="col span_1_of_12" style="min-height:1px;"></div>

        <div class="col span_4_of_12">
            <?php
                if (has_post_thumbnail()) {
            ?>
                <figure>
                    <img class="event-featured-img" src="<?= $image ?>" alt="<?= $image_alt_text ?>" />
                </figure>
            <?php
                } else {
                    $plugin_url = plugin_dir_url(__FILE__);
            ?>
                <figure class="event-placeholder-wrapper">
                    <img class="event-placeholder" src="<?=$plugin_url ?>ucla-image-placeholder.jpg" alt="<?php the_title(); ?>" />
                </figure>
            <?php } ?>
        </div>
    </div>
    <hr />
    <div class="ucla campus">
        <div class="col span_12_of_12">
            <?php the_content(); ?>
        </div>
    </div>
</main>
<?php get_footer(); ?>
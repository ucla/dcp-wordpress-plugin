<?php

    global $id;

    $thumb_id = get_post_thumbnail_id( $id );
    
    if ( '' != $thumb_id ) {
        $thumb_url  = wp_get_attachment_image_src( $thumb_id, 'full', true );
        $image      = $thumb_url[0];
        $image_alt_text =  get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
    }
    $today = date('Y-m-d');
    get_header();
?>
<main id="main" class="main event-page">
    <header class="ucla campus masthead <?= $today <= date('Y-m-d', strtotime(get_post_meta($post->ID,'event_start_date', true))) ? 'upcoming-events' : 'past-events' ?>">
        <div class="col span_12_of_12">
            <?php get_breadcrumb(); ?>
            <h1 class="entry-title"><?php the_title(); ?></h1>
            <div class="event-card__date-info">
                <?php
                    $event_date = get_post_meta($post->ID,'event_start_date', true) ? date('l, F j, Y', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                    $event_date_attr = get_post_meta($post->ID,'event_start_date', true) ? date('Y-m-d', strtotime(get_post_meta($post->ID,'event_start_date', true))) : 'TBD';
                ?>
                <time datetime="<?=$event_date_attr ?>"><?=$event_date ?></time>
            </div>
        </div>
    </header>
    <div class="ucla campus">
        <div class="col span_3_of_12">
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
            <div class="event-card-info__time">
                <object class="event-card-icon__time" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/time--grey60.svg" type="image/svg+xml"></object>
                <?= get_post_meta($post->ID,'event_time', true) ? date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : 'TBD' ?><?= get_post_meta($post->ID,'event_end_time', true) ? ' to ' . date('g:i a', strtotime(get_post_meta($post->ID,'event_time', true))) : '' ?>
            </div>
            <div class="event-card-info__location">
                <object class="event-card-icon__location" tabindex="-1" data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/location--grey60.svg" type="image/svg+xml">
                </object>
                <?= get_post_meta($post->ID,'event_location', true) ? get_post_meta($post->ID,'event_location', true) : 'TBD' ?>
            </div>
            <?php
                if (get_post_meta($post->ID,'event_rsvp', true)) {
            ?>
            <a class="btn btn--secondary--lightbg" href="<?=get_post_meta($post->ID,'event_rsvp', true)?>" target="_blank">RSVP</a>
            <?php
                }
            ?>
        </div>
        <div class="col span_9_of_12"><?php the_content(); ?></div>
    </div>
</main>
<?php get_footer(); ?>
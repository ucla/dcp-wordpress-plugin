<?php

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
            <?php
                if (have_posts()) :
                    // Start the Loop
                    while (have_posts()) : the_post();
                        // Loop Content
                        $thumb_id = get_post_thumbnail_id( $post->ID );
                        if ( '' != $thumb_id ) {
                            $thumb_url  = wp_get_attachment_image_src( $thumb_id, 'full', true );
                            $image      = $thumb_url[0];
                        }
                        ?>
                        <article class="basic-card">
                            <figure>
                                <a href="<?php echo get_permalink( $post->ID ); ?>">
                                    <img class="publication-img" src="<?php echo (has_post_thumbnail() ? $image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=400'); ?>" alt="">
                                </a>
                            </figure>
                            <div class="basic-card__info-wrapper">
                                <h2 class="basic-card__title"><a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a></h2>
                                <p class="basic-card__description"><?php echo get_the_excerpt() ?></p>
                                <div class="basic-card__buttons">
                                    <a class="btn btn--tertiary" href="<?php echo get_permalink( $post->ID ); ?>"><?=__('Read more about', 'ucla-dcp-plugin')?> <?php the_title(); ?></a>
                                </div>
                            </div>
                        </article>
                    <?php
                    // End the Loop
                    endwhile;
                else :
                    // If no posts match this query, output this text.
                    _e('Sorry, no results match your criteria.', 'ucla-dcp-plugin');
                endif;
                wp_reset_postdata();
            ?>
        </div>

    </div>

    <?php get_template_part('nav', 'below'); ?>
</main>
<?php get_footer(); ?>


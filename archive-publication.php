<?php
/*
Template Name: Archives - Publication
*/
get_header(); ?>
<main id="main" class="profile-archive">
    <header class="header">
        <div class="ucla campus masthead">
            <div class="col span_12_of_12">
                <h1 class="entry-title"><?php echo get_the_archive_title() ?></h1>
                
            </div>
        </div>
    </header>
    <div class="ucla campus entry-content">

        <div class="col span_<?php echo (is_active_sidebar('right-widget-area') ? '9' : '12') ?>_of_12">
            <hr />
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
                        <div class="profile-header">
                            <h2 class="profile-name"><a href="<?php echo get_permalink( $post->ID ); ?>"><?php the_title(); ?></a></h2>
                            
                        </div>
                        <div class="profile-card">
                            <figure class="profile-img">
                                <a href="<?php echo get_permalink( $post->ID ); ?>">
                                    <img src="<?php echo (has_post_thumbnail() ? $image : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=400'); ?>" alt="">
                                </a>
                            </figure>
                            <div><?php echo get_the_excerpt() ?></div>
                            
                        </div>
                        <hr />
                    <?php
                    // End the Loop
                    endwhile;
                else :
                    // If no posts match this query, output this text.
                    _e('Sorry, no results match your criteria.', 'textdomain');
                endif;
                wp_reset_postdata();
            ?>
        </div>

    </div>

    <?php get_template_part('nav', 'below'); ?>
</main>
<?php get_footer(); ?>

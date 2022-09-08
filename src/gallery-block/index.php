<?php
/**
 * Renders the `gallery` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_core_gallery( $attributes ) {
	global $post;
	$args = array(
		'post_type'			=> 'gallery',
		'posts_per_page'		=> strval($attributes['numberOfPosts']),
		'post_status'		=> 'publish',
		'order'               => 'DESC',
		'orderby'             => 'date',
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	);

	$query        = new WP_Query;
	$recent_posts = $query->query($args);
	update_post_thumbnail_cache( $query );
	$gallery_markup = '<div class="gallery-container">';

	foreach ( $recent_posts as $post ) {
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );
		$featured_image = get_the_post_thumbnail($post,'large',array('class'=>'basic-card__image'));
    	$gallery_excerpt = get_the_excerpt($post);
		$gallery_markup .= '<article class="basic-card">';
		$gallery_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( $post_link ),
			$featured_image
		);
		$gallery_markup .= '<div class="basic-card__info-wrapper"><h3 class="basic-card__title mb-0"><span>';
		$gallery_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( $post_link ),
			$title
		);
		$gallery_markup .= '</span></h3>';
		if ($attributes['displayExcerpt'] == true) {
			$gallery_markup .= sprintf(
				'<p class="basic-card__description">%1s</p>',
        $gallery_excerpt
			);
		}
		$gallery_markup .= '</div></article>';
	}
	$gallery_markup .= "</div>";
	return $gallery_markup;
}

namespace UCLAWPPLUGIN\Src\GalleryBlock;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  // Only load if Gutenberg is available.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Hook server side rendering into render callback
  // Make sure name matches registerBlockType in ./index.js
  register_block_type('uwai/gallery', array(
    'render_callback' => __NAMESPACE__ . '\render_block_core_gallery',
    'attributes' => [
        'numberOfPosts' => [
          'type' => 'number',
          'default' => 2
        ],
        'displayExcerpt' => [
          'type' => 'boolean',
          'default' => false
        ]
    ]
  ));
}
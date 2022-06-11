<?php

namespace UCLAWPPLUGIN\Src\RecentPosts;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  // Only load if Gutenberg is available.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Hook server side rendering into render callback
  // Make sure name matches registerBlockType in ./index.js
  register_block_type('uwai/recent-posts', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block',
    'attributes' => [
        'categories'=> [
          'type' => 'array',
          'default' => []
        ],
        'selectedCategory' => [
          'type' => 'string'
        ],
        'numberOfPosts' => [
          'type' => 'number',
          'default' => 2
        ],
        'greyStyle' => [
          'type' => 'boolean'
        ],
        'displayFeaturedImage' => [
          'type' => 'boolean',
          'default' => false
        ]
    ]
  ));
}

function render_dynamic_block($attr) {
  $output = '';
  $recent_posts = wp_get_recent_posts( array(
    'numberposts' => $attr['numberOfPosts'],
    'post_status' => 'publish'
  ) );
  $grey = $attr['greyStyle'] ? '-grey' : null;
	if ( count( $recent_posts ) === 0 ) {
    return 'No posts';
  }
  foreach($recent_posts as $post) {
    $output .= sprintf(
      '<article class="basic-card%4$s">
        <div class="basic-card__info-wrapper">
          <h3 class="basic-card__title">
            <span>%2$s</span>
          </h3>
          <p>%3$s</p>
          <div class="basic-card__buttons">
            <a class="btn btn--tertiary" href="%1$s">Read more about %2$s</a>
          </div>
        </div>
      </article>',
      esc_url( get_permalink( $post['ID'] ) ),
      esc_html( get_the_title( $post['ID'] ) ),
      esc_html( get_the_excerpt( $post['ID'] ) ),
      $grey
    );
  }
  return $output;
}
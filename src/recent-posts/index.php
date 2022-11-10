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
          'type' => 'boolean',
          'default' => false
        ],
        'displayFeaturedImage' => [
          'type' => 'boolean',
          'default' => false
        ],
        'align' => [
          'type' => 'string',
          'default' => 'none'
        ]
    ]
  ));
}

function render_dynamic_block($attr) {
  // var_dump($attr);
  $alignment = $attr['align'];
  $hasImage = false;
  $output = sprintf(
    '<div class="uwai-recent-post %1$s">',
    $alignment
  );
  $recent_posts = wp_get_recent_posts( array(
    'numberposts' => $attr['numberOfPosts'],
    'post_status' => 'publish',
    'category' => $attr['selectedCategory']
  ) );
  $grey = $attr['greyStyle'] ? '-grey' : null;
	if ( count( $recent_posts ) === 0 ) {
    return 'No posts';
  }
  foreach($recent_posts as $post) {
    $output .= sprintf(
      '<article class="basic-card%1$s">',
      $grey
    );
    
    if (strlen(get_the_post_thumbnail_url($post['ID'])) > 0 ) {
      $hasImage = true;
    }
    else {$hasImage = false;}
    
    if ($attr['displayFeaturedImage'] === true && $hasImage === true) {
      $output .= sprintf(
        '<img class="basic-card__image" src="%2$s" alt="%1$s"/>',
        esc_html( get_the_title( $post['ID'] ) ),
        esc_url(get_the_post_thumbnail_url($post['ID']))
      );
    }
    else {
      $output .= '';
    }
    $output .= sprintf(
      '<div class="basic-card__info-wrapper">
        <h3 class="basic-card__title">
          <span>%2$s</span>
        </h3>
        <p>%3$s</p>
        <div class="basic-card__buttons">
          <a class="btn btn--tertiary" href="%1$s">%4$s %2$s</a>
        </div>
      </div>
      </article>',
    esc_url( get_permalink( $post['ID'] ) ),
    esc_html( get_the_title( $post['ID'] ) ),
    esc_html( get_the_excerpt( $post['ID'] ) ),
    __('Read more about', 'ucla-dcp-plugin')
  );
  }
  $output .= '</div>';
  return $output;
}
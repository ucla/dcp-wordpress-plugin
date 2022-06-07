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
        'postsArray' => [
            'type' => 'array',
            'default' => []
        ],
    ]
  ));
}

function render_dynamic_block($attr) {
	$str = '<div class="span_12_of_12">';
	if ($attr['postsArray'] > 0 ) {
		$post = get_post($attr['postsArray']);
		if (!$post) {
			return $str;
		}
		$string .= '<article class="basic-card-grey"><div class="basic-card__info-wrapper">';
		$string .= '<h1 class="basic-card__title"><span>' . get_the_title($post) . '</span></h1>';
		$string .= '<p class="basic-card__description">' . get_the_excerpt($post) . '</p>';
		$string .= '<div class="basic-card__buttons"><button class="btn btn--tertiary" href="' . get_the_permalink($post) . '" >Read More</button></div>'; 
		$string .= '</div></article>';
        console.log($posts);
	}
	$string .= '</div>';
  	return $string;
}
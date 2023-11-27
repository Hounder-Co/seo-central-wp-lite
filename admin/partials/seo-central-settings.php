<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/admin/partials
 */

// <!-- This file should primarily consist of HTML with a little bit of PHP. -->
//Load up this function to access media library in settings file
wp_enqueue_media();

//Retrieve all the post types to edit on the settings pages
// function menuPostTypes() {
//   $args = array(
//     'public'   => true,
//     // '_builtin' => false, //false (grabs only custom types) true (grabs only default types)
//   );
  
//   $output = 'names'; // names or objects, note names is the default
//   $operator = 'and'; // 'and' or 'or'
  
//   $post_types = get_post_types( $args, $output, $operator ); 
//   $posts_string = '<li class="seo-central-settings-nav-dropdown-item active-item">' . 'Site Basics' . '</li>';
  
//   foreach ( $post_types  as $post_type ) {
  
//     if($post_type != 'attachment') {

//       if(str_contains($post_type, '_')) {
//         $post_type = str_replace('_', ' ', $post_type);
//       }
//       $posts_string .= '<li class="seo-central-settings-nav-dropdown-item">' . ucwords($post_type) . '</li>';
//     }
//   } 

//   return $posts_string;
// }


// Create a custom do_settings function with the Settings page format for seo central
function seo_central_do_settings_sections( $page ) {
	global $wp_settings_sections, $wp_settings_fields;

	if ( ! isset( $wp_settings_sections[ $page ] ) ) {
		return;
	}

	foreach ( (array) $wp_settings_sections[ $page ] as $section ) {
		if ( isset($section['before_section']) && '' !== $section['before_section'] ) {
			if ( isset($section['section_class']) && '' !== $section['section_class'] ) {
				echo wp_kses_post( sprintf( $section['before_section'], esc_attr( $section['section_class'] ) ) );
			} else {
				echo wp_kses_post( $section['before_section'] );
			}
		}

		if ( $section['callback'] ) {
      call_user_func( $section['callback'], $section );
		}
    
		if ( ! isset( $wp_settings_fields ) || ! isset( $wp_settings_fields[ $page ] ) || ! isset( $wp_settings_fields[ $page ][ $section['id'] ] ) ) {
      continue;
		}
    
    $table_class = $section['title'] ? 'large-body' : 'small-body';

    //Need to display post type for the section modals below site basics
    $modal_title = $section['title'] ? $section['title'] : __('Site Basics', 'seo-central-lite');
    $modal_post = $section['title'];
    $modal_post = str_replace(' settings','', $modal_post); //(Stripping the titles of the word settings and setting string to plural)
    $modal_post = strtolower($modal_post);
    
    if (!str_ends_with($modal_post, 's')) {
      // $modal_post = str_replace(' ', '', $modal_post);
      $modal_post = $modal_post . 's';
    }

    $modal_description = $section['title'] ? 'Make sure your '. esc_html($modal_post) .' don\'t show up empty! Here\'s where you can set their default inputs.' : 'The basics - this section will affect your site as a whole.';

		echo "<table class='form-table " . esc_attr($table_class) . "' role='presentation'>";
    echo '<thead class="form-table-top-head">';

    if ( $section['title'] ) {
      echo "<tr><th><h2 class='form-table-top-head-title'>" . esc_html($section['title']) . "</h2></th> <th class='form-table-top-head-end'><span class='form-table-pop-up-block'>Info</span><div class='form-table-collapse-arrow'></div></th></tr>";
    }
    else {
      echo "<tr><th><h2 class='form-table-top-head-title'>". esc_html__('Site Basics', 'seo-central-lite') ."</h2></th> <th class='form-table-top-head-end'><span class='form-table-pop-up-block'>Info</span><div class='form-table-collapse-arrow'></div></th></tr>";
    }
    echo '</thead>';
		seo_central_do_settings_fields( $page, $section['id'] );
		echo '</table>';


    // The dialog block for each of the modals
    echo '<dialog class="seo-central-dialog">';
    echo '<div class="seo-central-dialog-popup">';
    echo '<div class="seo-central-dialog-popup-close-row"><button class="seo-central-dialog-popup-close-button"></button></div>';
    echo '<div class="seo-central-dialog-popup-body">';
    // echo '<img class="seo-central-dialog-popup-body-image" src="https://picsum.photos/600">';
    echo "<div class='seo-central-dialog-popup-body-content'><h3 class='seo-central-dialog-popup-body-title'>What are " . esc_html($modal_title) . "?</h3><p class='seo-central-dialog-popup-body-description'>" . esc_html__($modal_description, 'seo-central-lite') . "</p><button class='seo-central-button-small seo-central-button-secondary'>Learn more</button></div></div>";
    echo '</div>';
    echo '</dialog>';

		if ( isset($section['after_section']) && '' !== $section['after_section'] ) {
			echo wp_kses_post( $section['after_section'] );
		}
	}
}


// Create custom do settings field function to set custom classes and tooltips for the labels
function seo_central_do_settings_fields( $page, $section ) {
	global $wp_settings_fields;

	if ( ! isset( $wp_settings_fields[ $page ][ $section ] ) ) {
		return;
	}

	foreach ( (array) $wp_settings_fields[ $page ][ $section ] as $field ) {
		$class = '';

		if ( ! empty( $field['args']['class'] ) ) {
			$class = ' class="' . esc_attr( $field['args']['class'] ) . '"';
		}

    if($field['id'] == 'seo_central_setting_breadcrumb'){
      $class = ' class="' . esc_attr('seo-central-breadcrumb-layout') . '"';
    }
    else if($field['id'] == 'seo_central_setting_crumbseparator'){
      $class = ' class="' . esc_attr('seo-central-seperator-layout') . '"';
    }

		echo "<tr{$class}>";

		if ( ! empty( $field['args']['label_for'] ) ) {
			echo '<th scope="row"><label class="seo-central-label" for="' . esc_attr( $field['args']['label_for'] ) . '">' . esc_html($field['title']) . '<span class="seo-central-tooltip"><span class="seo-central-tooltip-text tooltip-right">' . esc_html( $field['args']['description'] ) . '</span></span></label></th>';
		} else {
			echo '<th scope="row">' . esc_html($field['title']) . '</th>';
		}

		echo '<td>';
		call_user_func( $field['callback'], $field['args'] );
		echo '</td>';
		echo '</tr>';
	}
}
?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>

<article class="seo-central-admin-wrapper seo-central-settings-wrapper">

  <div class="seo-central-settings-form-wrap seo-central-site-">
    <!-- <h2><?php echo esc_html( get_admin_page_title() ); ?></h2> -->
    <form class="seo-central-settings-form" action="options.php" method="post">

      <div class='seo-central-settings-form-submit-wrapper'>

        <h2 class='seo-central-settings-form-submit-title'><?php echo esc_html__('Dashboard', 'seo-central-lite'); ?></h2>
        <div class='seo-central-settings-form-top-save-wrapper'>
          <p class='seo-central-settings-update-alert'><span class='seo-central-warning-icon icon-red'></span><?php echo esc_html__('You have unsaved changes', 'seo-central-lite'); ?> </p>
          <?php submit_button(); ?>
        </div>
        
      </div>

      <!-- Notifications bar -->
      <?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-notification.php' ); ?>

      <?php
          //submit_button(); 
          settings_errors();
          settings_fields( $this->plugin_name );
          //do_settings_sections( $this->plugin_name );
          seo_central_do_settings_sections( $this->plugin_name );
        ?>

      <div class='seo-central-settings-form-bottom-save-wrapper'>
        <p class='seo-central-settings-update-alert'><span class='seo-central-warning-icon icon-red'></span> <?php echo esc_html__('You have unsaved changes', 'seo-central-lite'); ?></p>
        <?php submit_button(); ?>
      </div>

    </form>
  </div> 
</article>

<style>
  #wpcontent {
    padding-left: 0px !important;
  }

  #wpbody {
    overflow: hidden;

    .update-nag.notice {
      display: none;
    }
  }
</style>
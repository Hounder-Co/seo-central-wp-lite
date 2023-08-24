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

// Retrieve home path and verifiy that is a working path
$home_path = get_home_path();
if ( ! is_writable( $home_path ) && ! empty( $_SERVER['DOCUMENT_ROOT'] ) ) {
	$home_path = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR;
}

//Get the file paths for the humans and robots.txt after setting the home path.
$robots_file    = $home_path . 'robots.txt';
$humans_file    = $home_path . 'humans.txt';

//Get the robots txt content and write it to the text area and then update and save that content on submit
$site_url = get_home_url();
$file_editor = '/wp-admin/admin.php?page=seo-central-file-editor';
$current_robot = file_get_contents($robots_file);
$current_human = file_get_contents($humans_file);

//Robots form submit
if ( isset( $_POST['updateRobots'] ) ) {

  //If the current user is able to edit the file update, otherwise display that the user does not have the necessary permissions. 
  //Check if the robots.txt file is generated, if not generate the file and update it with the new content.
	if ( current_user_can( 'edit_files' ) ) {
    if ( isset( $_POST['seo-central-robots-editor'] ) && file_exists( $robots_file ) ) {
      $updatedRobots = sanitize_textarea_field( wp_unslash( $_POST['seo-central-robots-editor'] ) );
  
      if ( is_writable( $robots_file ) ) {
        $f = fopen( $robots_file, 'w+' );
        fwrite( $f, $updatedRobots );
        fclose( $f );
      }
    }
    else if(isset( $_POST['seo-central-robots-editor'] ) && !file_exists($robots_file)) {
      //File does not exist so generate it and update the contents
      $updatedRobots = sanitize_textarea_field( wp_unslash( $_POST['seo-central-robots-editor'] ) );
      file_put_contents($robots_file, $updatedRobots);
    }
	}
  //update contents to display
  $current_robot = file_get_contents($robots_file); 
}

//Humans form submit
if ( isset( $_POST['updateHumans'] ) ) {

  //If the current user is able to edit the file update, otherwise display that the user does not have the necessary permissions. 
  //Check if the humans.txt file is generated, if not generate the file and update it with the new content.
	if ( current_user_can( 'edit_files' ) ) {
    if ( isset( $_POST['seo-central-humans-editor'] ) && file_exists( $humans_file ) ) {
      $updatedHumans = sanitize_textarea_field( wp_unslash( $_POST['seo-central-humans-editor'] ) );
  
      if ( is_writable( $humans_file ) ) {
        $f = fopen( $humans_file, 'w+' );
        fwrite( $f, $updatedHumans );
        fclose( $f );
      }
    }
    else if(isset( $_POST['seo-central-humans-editor'] ) && !file_exists($humans_file)) {
      //File does not exist so generate it and update the contents
      $updatedHumans = sanitize_textarea_field( wp_unslash( $_POST['seo-central-humans-editor'] ) );
      file_put_contents($humans_file, $updatedHumans);
    }
	}
  //update contents to display
  $current_human = file_get_contents($humans_file);
}
?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>
<div class='seo-central-partials-headline-wrapper'>

  <h2 class='seo-central-partials-headline-title'><?php echo __('File Editor', 'seo-central-lite'); ?></h2>

</div>

<article class="seo-central-file-editors-wrapper">

  <div class='seo-central-notification-wrapper'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'></span></p>
  </div>

  <form method="post" action="<?php echo $file_editor; ?>" id='seo-central-robot-form' class='seo-central-file-editors'>
    <label class='seo-central-file-label' for='seo-central-robots-editor' value='Robots.txt'><?php echo __('Robots.txt', 'seo-central-lite'); ?></label>
    <textarea id="seo-central-robots-editor" name="seo-central-robots-editor" rows="12" cols="80"><?php echo $current_robot; ?></textarea>
    <input class='seo-central-file-button seo-central-button-small seo-central-button-secondary' type='submit' name='updateRobots' value='Update File'>
  </form>

  <form method="post" action="<?php echo $file_editor; ?>" id='seo-central-human-form' class='seo-central-file-editors'>
  <label class='seo-central-file-label' for='seo-central-humans-editor' value='Humans.txt'><?php echo __('Humans.txt', 'seo-central-lite'); ?></label>
    <textarea id="seo-central-humans-editor" name="seo-central-humans-editor" rows="12" cols="80"><?php echo $current_human; ?></textarea>
    <input class='seo-central-file-button seo-central-button-small seo-central-button-secondary' type='submit' name='updateHumans' value='Update File'>
  </form>
</article>

<style>
  #wpcontent {
    padding-left: 0px !important;
  }

  #wpbody {
    overflow: hidden;

    .update-nag.notice {
      //display: none;
    }
  }
</style>
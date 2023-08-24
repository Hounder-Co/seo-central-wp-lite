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
?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>

<article class="seo-central-admin-wrapper">

    <h1><?php _e( 'Welcome to SEO Central!' ); ?></h1>

		<div class='seo-central-dashboard'>
			<h3>Seo Central Dashboard</h3>
		</div>
		
    <div class="seo-central-column-wrapper">
      
			<div class="panel-column">
				<?php if ( current_user_can( 'customize' ) ): ?>
					<h4><?php _e( 'Get Started' ); ?></h4>
					<a class="button button-primary button-hero load-customize hide-if-no-customize" href="<?php echo wp_customize_url(); ?>"><?php _e( 'Customize Your Site' ); ?></a>
				<?php endif; ?>
			</div>

			<div class="panel-column">
				<h4><?php _e( 'Next Steps' ); ?></h4>
				<ul>
            <li><?php printf( '<a href="%s" class="welcome-icon welcome-edit-page">' . __( 'Edit your front page' ) . '</a>', get_edit_post_link( get_option( 'page_on_front' ) ) ); ?></li>
						<li><?php printf( '<a href="%s" class="welcome-icon welcome-add-page">' . __( 'Add additional pages' ) . '</a>', admin_url( 'post-new.php?post_type=page' ) ); ?></li>
					  <li><?php printf( '<a href="%s" class="welcome-icon welcome-view-site">' . __( 'View your site' ) . '</a>', home_url( '/' ) ); ?></li>
				</ul>
			</div>

		</div>

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
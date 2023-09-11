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

  //Seo Central Lite preview of the generated table for SEO Central Pro
  function seo_central_table_preview_lite() {

    ?>
      <h2 class="wrap seo-central-redirection-wrapper-title"> <?php echo __('All Redirects', 'seo-central-lite') ?> </h2>
      <div class="wrap seo-central-redirection-wrapper">
        <table class="wp-list-table widefat fixed striped table-view-list seo-central_page_seo-central-redirects">
          <thead>
            <tr>
              <th scope="col" id="id" class="manage-column column-id hidden column-primary"><?php echo __('ID', 'seo-central-lite') ?></th>
              <th scope="col" id="redirect_type" class="manage-column column-redirect_type"><?php echo __('Redirect Type', 'seo-central-lite') ?></th>
              <th scope="col" id="old_url" class="manage-column column-old_url"><?php echo __('Old URL', 'seo-central-lite') ?></th><th scope="col" id="new_url" class="manage-column column-new_url"><?php echo __('New URL', 'seo-central-lite') ?></th>
              <th scope="col" id="actions" class="manage-column column-actions"><?php echo __('Edit/Delete', 'seo-central-lite') ?></th>	
            </tr>
          </thead>

          <tbody id="the-list">
            <tr class="seo-central-redirect-table-rows" id="redirect-row-1">
              <td class="id column-id has-row-actions column-primary hidden" data-colname="ID">1<button type="button" class="toggle-row"><span class="screen-reader-text">Show more details</span></button>
              </td>
              <td class="redirect_type column-redirect_type" data-colname="Redirect Type">307</td>
              <td class="old_url column-old_url" data-colname="Old URL">https://example.com/old-url/</td>
              <td class="new_url column-new_url" data-colname="New URL">https://example.com/new-url/</td>
              <td class="actions column-actions" data-colname="Edit/Delete">
                <div class="row-actions">
                  <span class="quickedit"><a href="" class="seo-central-quickedit-redirect" data-id="1"></a> | </span><span class="delete"><a href="" class="seo-central-delete-redirect" data-id="1"></a></span>
                </div>
                <button type="button" class="toggle-row"><span class="screen-reader-text">Show more details</span></button>
              </td>
            </tr>	
          </tbody>

          <tfoot>
            <tr>
              <th scope="col" class="manage-column column-id hidden column-primary"><?php echo __('ID', 'seo-central-lite') ?></th><th scope="col" class="manage-column column-redirect_type"><?php echo __('Redirect Type', 'seo-central-lite') ?></th><th scope="col" class="manage-column column-old_url"><?php echo __('Old URL', 'seo-central-lite') ?></th><th scope="col" class="manage-column column-new_url"><?php echo __('New URL', 'seo-central-lite') ?></th><th scope="col" class="manage-column column-actions"><?php echo __('Edit/Delete', 'seo-central-lite') ?></th>
            </tr>
          </tfoot>
        </table>
      </div>
    <?php
  }

  function seo_central_lite_display() {

    //Display the the form and the table wrapped in an overlay
    ?>

    <div class="seo-central-lite-redirect-wrapper">
      <div class="seo-central-lite-redirect-overlay"> </div>

      <article class="seo-central-redirect-wrapper">

        <div class='seo-central-notification-wrapper'>
          <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'></span></p>
        </div>
        
        <form method="post" class='seo-central-redirect-form-add'>
          <div class="seo-central-redirect-top-select">
            <label class='seo-central-redirect-form-label' for="redirect_type"><?php echo __('Choose Redirect Type:', 'seo-central-lite'); ?></label>
            <select class="seo-central-redirect-form-select seo-central-select" name="redirect_type" id="redirect_type">
              <option value="301"><?php echo __('301 moved permanently', 'seo-central-lite'); ?></option>
              <option value="302"><?php echo __('302 Found', 'seo-central-lite'); ?></option>
              <option value="307"><?php echo __('307 Temporary Redirect', 'seo-central-lite'); ?></option>
              <option value="410"><?php echo __('410 Content Deleted', 'seo-central-lite'); ?></option>
              <option value="451"><?php echo __('451 Unavailable for legal reasons', 'seo-central-lite'); ?></option>
            </select>
          </div>

          <div>
            <label class='seo-central-redirect-form-label' for="oldUrl"><?php echo __('Old URL:', 'seo-central-lite'); ?></label>
            <input class='seo-central-redirect-form-input seo-central-text-input' type="text" name="oldUrl" class="seo-central-redirect-urls" value="" />
          </div>

          <div>
            <label class='seo-central-redirect-form-label' for="newUrl"><?php echo __('New URL:', 'seo-central-lite'); ?></label>
            <input class='seo-central-redirect-form-input seo-central-text-input' type="text" name="newUrl" class="seo-central-redirect-urls" value="" />
          </div>

          <input class='seo-central-redirect-form-submit seo-central-button-small seo-central-button-secondary' type="submit" name="addRedirect" class="seo-central-redirect-add" value="Add redirect" />
        </form>

      </article>

      <?php //seo_central_custom_table_page(); ?>
      <?php seo_central_table_preview_lite(); ?>
    </div>

    <?php
  }

  // Make sure to include the WordPress plugin utility functions if they are not already included.
  if ( ! function_exists( 'is_plugin_active' ) ) {
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
  }
  
  //Utilizing a constant for checking the pro version
  $seo_central_pro = defined('SEO_CENTRAL_PRO') && SEO_CENTRAL_PRO;

?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>

<div class='seo-central-partials-headline-wrapper'>
  <h2 class='seo-central-partials-headline-title'><?php echo __('Redirects', 'seo-central-lite'); ?></h2>  
</div>

<!-- Notifications bar -->
<div class="seo-central-redirect-notifications">
  <?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-notification.php' ); ?>
</div>


<!-- Display Redirection Page Preview If the SEO Central Pro plugin is not installed and activated -->
<?php if ( $seo_central_pro ): ?>
  <?php if (is_plugin_active('seo-central-wp-pro/seo-central-pro.php')) : ?>

    <?php include(WP_PLUGIN_DIR . '/seo-central-wp-pro/admin/partials/seo-central-pro-redirects.php'); ?>
    
  <?php endif; ?>
<?php else: ?>
  <?php seo_central_lite_display(); ?>
<?php endif; ?>

<style>
  #wpcontent {
    padding-left: 0px !important;
  }

  #wpbody {
    overflow: hidden;

    .update-nag.notice {
      /*display: none;*/
    }
  }

  .seo-central-redirect-notifications {
    padding-left: 22px;
    .seo-central-partials-notification-wrapper {
      max-width: 95%;
      margin-left: 0px;
      margin-right: 0px;
    }
  }
</style>
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
  function seo_central_primary_notifications($option_name, $option_value) {
    $notification_type = $option_value;
    // $notification_type = 'no_key';
    $notification_class ='central-blue icon-alert';
    $notification_text = 'How did you like [CentralCloud]? Now imagine that, but for each page of your site. Purchase an annual subscription within the next [X] and we\'ll give you the Early Bird special. Subscribe today!';
    $button_text = '';

    if($option_name == 'seo_central_notification') {

      if ($notification_type === 'free') {
          $notification_text = __("How did you like [CentralCloud]? Now imagine that, but for each page of your site. Purchase an annual subscription within the next [X] and we'll give you the Early Bird special. Subscribe today!", 'seo-central-lite');
          $button_text = __('Upgrade to Pro', 'seo-central-lite');
      } elseif ($notification_type === 'invalid_domain') {
          $notification_text = __("Invalid domain! Please check your input or try another domain.", 'seo-central-lite');
          $notification_class ='central-red icon-error';
      } elseif ($notification_type === 'invalid_key') {
          $notification_text = __("This is not the API key we are looking for! Please go back to the dashboard and resubmit.", 'seo-central-lite');
          $notification_class ='central-red icon-error';
      } elseif ($notification_type === 'expired_key') {
          $notification_text = __("Uh oh! Your Pro Subscription has expired. Resubscribe to keep SEOing.", 'seo-central-lite');
          $button_text = __('Renew Pro', 'seo-central-lite');
          $notification_class ='central-red icon-error';
      } elseif ($notification_type === 'no_key') {
          $notification_text = __("To Access all SEO Central page optimization features a valid API Key must be saved to the dashboard.", 'seo-central-lite');
          $notification_class ='central-red icon-warning';
      }

    } elseif ($option_name == 'seo_central_conflicting_plugins') {
        $notification_text = __("You currently have a conflicting SEO plugin installed. To use SEO Central, you will need to disable it.", 'seo-central-lite');
        $notification_class ='central-red icon-error';
    } elseif ($option_name == 'seo_central_pro_conflicting_plugins' ) {
        $notification_text = __("You currently have a conflicting redirect plugin installed. To use SEO Central, you will need to disable it.", 'seo-central-lite');
        $notification_class ='central-red icon-error';
    }


    if (!empty($notification_text)) {
      ?>
        <div class='seo-central-partials-notification-wrapper enabled <?php echo $notification_class; ?>'>
            <p class='seo-central-partials-notification'><span class='seo-central-partials-notification-icon'></span>
                <span class='seo-central-partials-notification-text'><?php echo esc_html($notification_text); ?></span>
            </p>
            <?php if (!empty($button_text)): ?>
              <a href="" class='seo-central-button-upgrade alternate-colors'><?php echo esc_html($button_text); ?></a>
            <?php endif; ?>
        </div>
      <?php
    }
  }
?>

<!-- Load up the notifications on each of the SEO Central pages -->
<div id="seo-central-auto-notifier" class='seo-central-partials-notification-wrapper central-blue icon-alert'>
  <p class='seo-central-partials-notification'><span class='seo-central-partials-notification-icon'></span> <span class='seo-central-partials-notification-text'></span></p>
</div>

<!-- Detect and display the correct notification based on the plugin activations -->
<?php if (!empty(get_option('seo_central_conflicting_plugins', array()))): ?>
  <?php seo_central_primary_notifications('seo_central_conflicting_plugins', get_option('seo_central_conflicting_plugins')); ?>
<?php endif; ?>

<?php if (!empty(get_option('seo_central_pro_conflicting_plugins', array()))): ?>
  <?php seo_central_primary_notifications('seo_central_pro_conflicting_plugins', get_option('seo_central_pro_conflicting_plugins')); ?>
<?php endif; ?>

<?php if (!empty(get_option('seo_central_notification'))): ?>
  <?php seo_central_primary_notifications('seo_central_notification', get_option('seo_central_notification')); ?>
<?php endif; ?>

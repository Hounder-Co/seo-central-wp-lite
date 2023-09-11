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

<!-- Load up the nav on each of the partial pages -->
<div id="seo-central-auto-notifier" class='seo-central-partials-notification-wrapper'>
  <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'></span></p>
</div>

<?php if(get_option('seo_central_notification') === 'free'): ?>

  <div class='seo-central-partials-notification-wrapper enabled'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'>You are still using the free version of SEO Central, upgrade now to get all the perks!</span>
    </p>
    <a href="" class='seo-central-button-upgrade alternate-colors'><?php echo __('Upgrade to Pro', 'seo-central-lite'); ?></a>
  </div>

<?php elseif(get_option('seo_central_notification') === 'invalid_domain'): ?>

  <div class='seo-central-partials-notification-wrapper enabled'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'>Your domain has not been verified</span>
    </p>
    <a href="" class='seo-central-button-upgrade alternate-colors'><?php echo __('Upgrade to Pro', 'seo-central-lite'); ?></a>
  </div>

<?php elseif(get_option('seo_central_notification') === 'invalid_key'): ?>

  <div class='seo-central-partials-notification-wrapper enabled'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'>Your API key is invalid, please verify at app.seocentral.ai</span>
    </p>
    <a href="" class='seo-central-button-upgrade alternate-colors'><?php echo __('Upgrade to Pro', 'seo-central-lite'); ?></a>
  </div>

<?php elseif(get_option('seo_central_notification') === 'no_key'): ?>

  <div class='seo-central-partials-notification-wrapper enabled'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'>To Access all SEO Central page optimization features a valid API Key must be saved.</span>
    </p>
    <a href="" class='seo-central-button-upgrade alternate-colors'><?php echo __('Upgrade to Pro', 'seo-central-lite'); ?></a>
  </div>

<?php endif; ?>
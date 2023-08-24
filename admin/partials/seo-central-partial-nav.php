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
<nav class="seo-central-partials-nav-wrapper">
  <div class="seo-central-partials-nav-logo"></div>
  <ul class="seo-central-partials-nav-links-wrapper">
    <!-- <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-dashboard' class="seo-central-partials-nav-link">Dashboard</a></li> -->
    <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-dashboard' class="seo-central-partials-nav-link"><?php echo __('Dashboard', 'seo-central-lite'); ?></a></li>
    <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-file-editor' class="seo-central-partials-nav-link"><?php echo __('File Editor', 'seo-central-lite'); ?></a></li>
    <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-redirects' class="seo-central-partials-nav-link"><?php echo __('Redirects', 'seo-central-lite'); ?></a></li>
    <!-- <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-about' class="seo-central-partials-nav-link">About SEO Central</a></li>
    <li class="seo-central-partials-nav-link-item"><a href='admin.php?page=seo-central-report' class="seo-central-partials-nav-link">Reports</a></li> -->
  <ul>
</nav>

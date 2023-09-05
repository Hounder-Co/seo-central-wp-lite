<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://hounder.co
 * @since             1.0.0
 * @package           Seo_Central
 *
 * @wordpress-plugin
 * Plugin Name:       SEO Central
 * Plugin URI:        https://seocentral.ai
 * Description:       Your AI-Powered SEO Expert. Harness the power of AI and outrank your competitors. You write it, we make it rank. SEO Central is your new in-house AI SEO expert, equipped with the power to take on the brunt of all those SEO-related tasks you hate. Spend more time focusing on writing content and run your site with fully automated page optimization.
 * Version:           1.0.0
 * Author:            Hounder
 * Author URI:        https://hounder.co
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       seo-central-lite
 * Domain Path:       /lang
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'SEO_CENTRAL_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-seo-central-activator.php
 */
function activate_seo_central() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-seo-central-activator.php';
	Seo_Central_Activator::activate();
}

/**
 * The code that runs during plugin deactivation. (Also deactivates the pro plugin if installed and active)
 * This action is documented in includes/class-seo-central-deactivator.php
 */
function deactivate_seo_central() {

	// Check if the Pro version is active and deactivate when lite is deactivated
	if (is_plugin_active('seo-central-wp-pro/seo-central-pro.php')) {
		add_action('update_option_active_plugins', 'deactivate_seo_central_dependents');
	}

	require_once plugin_dir_path( __FILE__ ) . 'includes/class-seo-central-deactivator.php';
	Seo_Central_Deactivator::deactivate();
}


/**
 * Run the deactivation of the pro plugin when enabled
 */
function deactivate_seo_central_dependents() {
	// Include WordPress plugin administration functions
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

	deactivate_plugins('seo-central-wp-pro/seo-central-pro.php');
}

register_activation_hook( __FILE__, 'activate_seo_central' );
register_deactivation_hook( __FILE__, 'deactivate_seo_central' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-seo-central.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_seo_central() {

	$plugin = new Seo_Central();
	$plugin->run();

}
run_seo_central();

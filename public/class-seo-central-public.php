<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/public
 * @author     Hounder <info@hounder.co>
 */
class Seo_Central_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function seo_central_enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Central_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/seo-central-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function seo_central_enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Central_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/seo-central-public.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Set a cookie with the current time of day
	 * php.net/manual/en/function.setcookie.php
	 *
	 * @since    1.0.0
	 */
	public function seo_central_add_cookie() {
		setcookie("seo_central_last_visit_time", date("r"), time()+60*60*24*30, "/");
	}


	/**
	 * Define the function that echoes simple text
	 *
	 * @since    1.0.0
	 */
	function seo_central_add_header_meta()
	{
		
		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-public-display.php' );

	}

}

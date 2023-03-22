<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central_Wordpress
 * @subpackage Seo_Central_Wordpress/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Seo_Central_Wordpress
 * @subpackage Seo_Central_Wordpress/admin
 * @author     Hounder <info@hounder.co>
 */
class Seo_Central_Wordpress_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Central_Wordpress_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Wordpress_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/seo-central-wordpress-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Seo_Central_Wordpress_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Wordpress_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/seo-central-wordpress-admin.js', array( 'jquery' ), $this->version, false );

	}


	public function seo_central_plugin_menu() {

		/**
		 * Filters the required capability to manage SEO Central settings.
		 *
		 * @param string $value Capability required.
		 * 
		 * https://developer.wordpress.org/reference/functions/add_menu_page/
		 * https://developer.wordpress.org/reference/functions/add_submenu_page/
		 * 
		 */

		$capability  = 'manage_options'; // Use for more options: apply_filters( '1', '2' );
		$parent_slug = 'seocentral-menu';
	
		$menu_icon = "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4OCA4OCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyODYwNGM7fS5jbHMtMntmaWxsOiMyM2FmN2M7fTwvc3R5bGU+PC9kZWZzPjxlbGxpcHNlIGNsYXNzPSJjbHMtMSIgY3g9IjUwLjAzMjQiIGN5PSI0My45OTk5MyIgcng9IjExLjc1NzEzIiByeT0iMTAuNDYyMzQiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02Ny41NDYxNCw1My4xMTY3YTIwLjg1NDg5LDIwLjg1NDg5LDAsMCwxLTE3LjUxMzY3LDguOTU2Yy0xMS4yMTY2NywwLTIwLjMwOTU3LTguMDkxNTUtMjAuMzA5NTctMTguMDcyODdzOS4wOTI5LTE4LjA3Mjc1LDIwLjMwOTU3LTE4LjA3Mjc1YTIwLjg1NSwyMC44NTUsMCwwLDEsMTcuNTEzNjcsOC45NTYwNUw4NS4wNjgzNiwxNi44MzI1MkM3Ni43OTg4Myw5Ljk3NTEsNjQuNjgwNjYsNi4zMzkxMSw0OS45ODIxOCw2LjMzOTExLDIxLjcxMDcsNi4zMzkxMSwyLjkzMTQsMTkuODY4OSwyLjkzMTQsNDQuMDAwNzNjMCwyNC4xMzA4NiwxOC43NzkzLDM3LjY2MDE2LDQ3LjA1MDc4LDM3LjY2MDE2LDE0LjY5ODczLDAsMjYuODE2ODktMy42MzYsMzUuMDg2NDItMTAuNDkzNDFaIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0yIiBjeD0iNTAuMDMyNCIgY3k9IjQzLjk5OTkzIiByeD0iMTEuNzU3MTMiIHJ5PSIxMC40NjIzNCIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTY3LjU0NjE0LDUzLjExNjdhMjAuODU0ODksMjAuODU0ODksMCwwLDEtMTcuNTEzNjcsOC45NTZjLTExLjIxNjY3LDAtMjAuMzA5NTctOC4wOTE1NS0yMC4zMDk1Ny0xOC4wNzI4N3M5LjA5MjktMTguMDcyNzUsMjAuMzA5NTctMTguMDcyNzVhMjAuODU1LDIwLjg1NSwwLDAsMSwxNy41MTM2Nyw4Ljk1NjA1TDg1LjA2ODM2LDE2LjgzMjUyQzc2Ljc5ODgzLDkuOTc1MSw2NC42ODA2Niw2LjMzOTExLDQ5Ljk4MjE4LDYuMzM5MTEsMjEuNzEwNyw2LjMzOTExLDIuOTMxNCwxOS44Njg5LDIuOTMxNCw0NC4wMDA3M2MwLDI0LjEzMDg2LDE4Ljc3OTMsMzcuNjYwMTYsNDcuMDUwNzgsMzcuNjYwMTYsMTQuNjk4NzMsMCwyNi44MTY4OS0zLjYzNiwzNS4wODY0Mi0xMC40OTM0MVoiLz48L3N2Zz4=";

		add_menu_page( __( 'SEO Central Dashboard', 'seo-central-wordpress' ), __( 'SEO Central', 'seo-central-wordpress' ), $capability, $parent_slug, 'seocentral-menu', $menu_icon );


		add_submenu_page( $parent_slug, __( 'SEO Central Dashboard', 'seo-central-wordpress' ), __( 'Dashboard', 'seo-central-wordpress' ), $capability, $this->plugin_name . '-dashboard', array( $this, 'page_dashboard' ) );
		
		add_submenu_page( $parent_slug, __( 'Test Link 1', 'seo-central-wordpress' ), __( 'Test Link 1', 'seo-central-wordpress' ), $capability, $this->plugin_name . '-test-1', array( $this, 'page_test_1' ) );

		add_submenu_page( $parent_slug, __( 'Test Link 2', 'seo-central-wordpress' ), __( 'Test Link 2', 'seo-central-wordpress' ), $capability, $this->plugin_name . '-test-2', array( $this, 'page_test_2' ) );

		add_submenu_page( $parent_slug, __( 'About SEO Central', 'seo-central-wordpress' ), __( 'About SEO Central', 'seo-central-wordpress' ), $capability, $this->plugin_name . '-about', array( $this, 'page_about' ) );


		// Removes default first page, we replace it with dashboard
		remove_submenu_page( $parent_slug, 'seocentral-menu' );
	}

	/**
	 * Creates the dashboard page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function page_dashboard() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-wordpress-dashboard.php' );

	} // page_dashboard()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function page_test_1() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-wordpress-test-link-1.php' );

	} // page_test_1()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function page_test_2() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-wordpress-test-link-2.php' );

	} // page_test_2()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function page_about() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-wordpress-about.php' );

	} // page_about()

}

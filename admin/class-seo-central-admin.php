<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/admin
 * @author     Hounder <info@hounder.co>
 */
class Seo_Central_Admin {

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
	 * The options name to be used in this plugin
	 *
	 * @since  	1.0.0
	 * @access 	private
	 * @var  	string 		$option_name 	Option name of this plugin
	*/
	private $option_name = 'seo_central_setting'; 

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

		//Initialize seo central notifications
		add_action('admin_init', [$this, 'seo_central_initialize_notifications']);

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
		 * defined in Seo_Central_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'dist/dist.seocentral-plugin-admin.css', array(), $this->version, 'all' );

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
		 * defined in Seo_Central_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Seo_Central_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		//Enqueue the distribution script. Pass in jquery and wp-i18n for translations.
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'dist/dist.seocentral-plugin-admin.js', array( 'jquery', 'wp-i18n' ), $this->version, false );
		
		wp_localize_script($this->plugin_name, 'my_script_vars', array(
			'ajaxurl' => admin_url('admin-ajax.php'),
			'nonce' => wp_create_nonce('quickedit_nonce'),
		));


		wp_set_script_translations( $this->plugin_name, 'seo-central-lite', plugin_dir_path(__FILE__) . 'lang' );


		//Conditionaly render the script with the parameters 
		$sanitizedPhpSelf = esc_url_raw($_SERVER['PHP_SELF']);
		$isPostEditPage = 'post.php' == basename($sanitizedPhpSelf); //all edit pages
		$isSpecialAdminPage = 'admin.php' == basename($sanitizedPhpSelf) && isset($_GET['page']); //admin.php
		$specialPages = ['seo-central-dashboard', 'seo-central-redirects', 'seo-central-file-editor']; //seocentral pages
		
		if ($isPostEditPage || ($isSpecialAdminPage && in_array($_GET['page'], $specialPages))) {
			//Pass data over to Admin script files so we can properly load functions with settings 
			$myThemeParams = array(
				'slug' => get_post_field( 'post_name', get_post() ),		 //Utilize slug for storing into field if empty
				'siteUrl' => get_site_url(),														 //siteUrl used for checks
				'body' => $this->seo_central_body_content(),						 //Body_check array passed with all the necessary contents from page
				'links' => $this->seo_central_link_content(),						 //Internal and External link arrays used for scoring
				'site_domain' => wp_parse_url(get_site_url(), PHP_URL_HOST),
				'pro_analysis' => $this->seo_central_pro_plugin_check()
			);

			wp_add_inline_script($this->plugin_name, 'var myThemeParams = ' . wp_json_encode( $myThemeParams ), 'before' );
		}
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

		add_menu_page( esc_html__( 'SEO Central Dashboard', 'seo-central-lite' ), esc_html__( 'SEO Central', 'seo-central-lite' ), $capability, $parent_slug, 'seocentral-menu', $menu_icon );

		add_submenu_page( $parent_slug, esc_html__( 'Dashboard', 'seo-central-lite' ), esc_html__( 'Dashboard', 'seo-central-lite' ), $capability, $this->plugin_name . '-dashboard', array( $this, 'seo_central_page_settings' ) );
		
		add_submenu_page( $parent_slug, esc_html__( 'File Editor', 'seo-central-lite' ), esc_html__( 'File Editor', 'seo-central-lite' ), $capability, $this->plugin_name . '-file-editor', array( $this, 'seo_central_page_file_editor' ) );

		add_submenu_page( $parent_slug, esc_html__( 'Redirects', 'seo-central-lite' ), esc_html__( 'Redirects', 'seo-central-lite' ), $capability, $this->plugin_name . '-redirects', array( $this, 'seo_central_page_redirects' ) );

		// Removes default first page, we replace it with dashboard
		remove_submenu_page( $parent_slug, 'seocentral-menu' );
	}

	/**
	 * Creates the dashboard page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_dashboard() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-dashboard.php' );

	} // seo_central_page_dashboard()

	/**
	 * Creates the SEO Central Settings page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_settings() {

		add_action( 'admin_init', 'seo_central_register_settings' );
		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-settings.php' );

	} // seo_central_page_settings()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_file_editor() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-file-editor.php' );

	} // page_test_1()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_redirects() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-redirects.php' );

	} // seo_central_page_redirects()

	/**
	 * Creates the About SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_about() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-about.php' );

	} // seo_central_page_about()

	/**
	 * Creates the Reporting SEO Central page
	 *
	 * @since 		1.0.0
	 * @return 		void
	 */
	public function seo_central_page_report() {

		include( plugin_dir_path( __FILE__ ) . 'partials/seo-central-report.php' );

	} // seo_central_page_report()

	/**
	 * Register the setting fields
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_register_plugin_settings() {
    // Add a General section
		add_settings_section(
			$this->option_name. '_general',
			esc_html__( '', 'seo-central-lite' ),
			array( $this, $this->option_name . '_general_cb' ),
			$this->plugin_name
		);

		// Api key field is only available when the pro plugin is enabled
		if (defined('SEO_CENTRAL_PRO') && SEO_CENTRAL_PRO === true) {

			// Add a text field for api key
			add_settings_field(
				$this->option_name . '_api_key',
				esc_html__( 'Seo Central Api Key', 'seo-central-lite' ),
				array( $this, $this->option_name . '_api_key_cb' ),
				$this->plugin_name,
				$this->option_name . '_general',
				array( 'label_for' => $this->option_name . '_api_key', 'description' => esc_html__( 'VERY IMPORTANT: The that allows you access to the meta-data generation tool.', 'seo-central-lite' ) )
			);
		}

		// Add a text field for google verification
		add_settings_field(
			$this->option_name . '_google_key',
			esc_html__( 'Google Verification', 'seo-central-lite' ),
			array( $this, $this->option_name . '_google_key_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_google_key', 'description' => esc_html__( 'Used for Google Search Console verification, follow the official steps here.', 'seo-central-lite' ) )
		);

		// Add a text field for bing verification
		add_settings_field(
			$this->option_name . '_bing_key',
			esc_html__( 'Bing Verification', 'seo-central-lite' ),
			array( $this, $this->option_name . '_bing_key_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_bing_key', 'description' => esc_html__( 'Used for Bing Webmaster Tools verification, sign up for an account here.', 'seo-central-lite' ) )
		);

		// Add image field
		add_settings_field(
			$this->option_name . '_image',
			esc_html__( 'Site Image', 'seo-central-lite' ),
			array( $this, $this->option_name . '_image_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_image', 'description' => esc_html__( 'A default image used for all pages on your site that don\'t have one set.', 'seo-central-lite' ) )
		);

		// Add Breadcrumb Toggle field
		add_settings_field(
			$this->option_name . '_breadcrumb',
			esc_html__( 'Site Breadcrumbs', 'seo-central-lite' ),
			array( $this, $this->option_name . '_breadcrumb_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_breadcrumb', 'description' => esc_html__( 'Navigation aids showing users their path from the home page.', 'seo-central-lite' ) )
		);

		// Add Breadcrumb Separator field
		add_settings_field(
			$this->option_name . '_crumbseparator',
			esc_html__( 'Title Separator', 'seo-central-lite' ),
			array( $this, $this->option_name . '_crumb_separator_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_crumbseparator', 'description' => esc_html__( 'Symbol used to divide levels in breadcrumb navigation.', 'seo-central-lite' ) )
		);

		// Add username field
		add_settings_field(
			$this->option_name . '_username',
			esc_html__( 'Site Username', 'seo-central-lite' ),
			array( $this, $this->option_name . '_username_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_username', 'description' => esc_html__( 'The username for your account login.', 'seo-central-lite' ) )
		);

		// Add password field
		add_settings_field(
			$this->option_name . '_password',
			esc_html__( 'Site Password', 'seo-central-lite' ),
			array( $this, $this->option_name . '_password_cb' ),
			$this->plugin_name,
			$this->option_name . '_general',
			array( 'label_for' => $this->option_name . '_password', 'description' => esc_html__( 'The password for your account login.', 'seo-central-lite' ) )
		);

		// Api key field is only available when the pro plugin is enabled
		if (defined('SEO_CENTRAL_PRO') && SEO_CENTRAL_PRO === true) { 
			// Register the api key field
			register_setting( $this->plugin_name, $this->option_name . '_api_key', 'text' );
		}

		// Register the google verifcation code field
		register_setting( $this->plugin_name, $this->option_name . '_google_key', 'text' );
		// Register the bing verifcation code field
		register_setting( $this->plugin_name, $this->option_name . '_bing_key', 'text' );
		// Register the site username
		register_setting( $this->plugin_name, $this->option_name . '_username', 'text' );
		// Register the site password
		register_setting( $this->plugin_name, $this->option_name . '_password', 'text' );
		// Register the site meta image
		register_setting( $this->plugin_name, $this->option_name . '_image', 'text' );
		// Register the site breadcrumbs toggle
		register_setting( $this->plugin_name, $this->option_name . '_breadcrumb', 'text' );
		// Register the site crumbs separator toggle
		register_setting( $this->plugin_name, $this->option_name . '_crumbseparator', 'text' );

		//Repeating fields for post types
		//Retrieve all public post types, exclude things like attachments
		$args = array(
			'public'   => true,
		);
		$output = 'names'; // names or objects, note names is the default
		$operator = 'and'; // 'and' or 'or'
		
		$post_types = get_post_types( $args, $output, $operator ); 

    // Register post type specific settings
    $this->seo_central_register_post_type_settings_fields($post_types);
	} 

	/**
	 * Render the text for the general section
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_setting_general_cb() {
		//echo '<p>' . __( 'Register your personalized api key and settings for Seo Central.', 'seo-central-lite' ) . '</p>';
	} 

	/**
	 * Render the text for the Api Key field
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_setting_api_key_cb() {
		$val = get_option( $this->option_name . '_api_key' );
		echo '<input class="seo-central-text-input" type="text" name="' . esc_attr($this->option_name . '_api_key') . '" id="' . esc_attr($this->option_name . '_api_key') . '" value="' . esc_attr($val) . '"> <span class="seo-central-api-copy"><span class="seo-central-api-copy-tooltip"></span></span>' . esc_html__( '', 'seo-central-lite' );
	} 

	/**
	 * Render the input for the google verification
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_setting_google_key_cb() {
		$val = get_option( $this->option_name . '_google_key' );
		echo '<input class="seo-central-text-input" type="text" name="' . esc_attr($this->option_name . '_google_key') . '" id="' . esc_attr($this->option_name . '_google_key') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
	} 

	/**
	 * Render the input for the bing verification
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_setting_bing_key_cb() {
		$val = get_option( $this->option_name . '_bing_key' );
		echo '<input class="seo-central-text-input" type="text" name="' . esc_attr($this->option_name . '_bing_key') . '" id="' . esc_attr($this->option_name . '_bing_key') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
	} 

  /**
   * Render the input for the for the username if site is protected
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_username_cb() {
    $val = get_option( $this->option_name . '_username' );
    echo '<input class="seo-central-text-input" type="text" name="' . esc_attr($this->option_name . '_username') . '" id="' . esc_attr($this->option_name . '_username') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
  } 

  /**
   * Render the input for the for the password if site is protected
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_password_cb() {
    $val = get_option( $this->option_name . '_password' );
    echo '<input class="seo-central-text-input" type="text" name="' . esc_attr($this->option_name . '_password') . '" id="' . esc_attr($this->option_name . '_password') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
  } 

  /**
   * Render the input with button to access media library and store selection
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_image_cb() {
    $val = get_option( $this->option_name . '_image' );
    echo '<button id="select-seo-image-select" class="seo-central-settings-image-select seo-central-button-small seo-central-button-secondary" type="button">'.esc_html__("Choose File", "seo-central-lite").'</button> <button id="deselect-seo-image" class="seo-central-settings-image-deselect disabled" type="button"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button><input class="seo-central-settings-image-input" type="text" name="' . esc_attr($this->option_name . '_image') . '" id="' . esc_attr($this->option_name . '_image') . '" value="' . esc_attr($val) . '"> <p id="' . esc_attr($this->option_name . '_image_instructions') . '" class="seo-central-settings-social-image-instruction">'.esc_html__("5 MB limit. Allowed types: jpg, jpeg, png", "seo-central-lite").'</p>' . esc_html__( '', 'seo-central-lite' );
  } 

  /**
   * Render the toggle input for the for the breadcrumbs
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_breadcrumb_cb() {
    $val = get_option( $this->option_name . '_breadcrumb' );
		$enabled = '';
		if($val == '') {
			$val = 'false';
		}
		else if($val == 'true') {
			$enabled = ' enabled ';
		}
    echo '<div id="seo_central_setting_breadcrumbs_toggle" class="seo-central-checkbox-toggle seo-central-settings-toggle' . $enabled .'" type="checkbox" name="breadcrumb_toggle" value="" ></div><input class="seo-central-settings-toggle-value" type="text" name="' . esc_attr($this->option_name . '_breadcrumb') . '" id="' . esc_attr($this->option_name . '_breadcrumb') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
  } 

  /**
   * Render the input for the breadcrumbs separator
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_crumb_separator_cb() {
    $val = get_option( $this->option_name . '_crumbseparator' );
		$opt_array = array("-","–","—","|","•","»",">");

		?> 
		<fieldset class=''>
			<div class='seo-central-settings-crumbs-selection-wrapper' name="seo-central-crumbs-separator" id="seo-central-crumbs-separator">

				<?php 
						//Check if the field value is empty, if so set default
						if($val == '' || $val == null) {
							$val = "";
						}

						//Loop through the options array to display and set the selected item. 
						foreach($opt_array as $index=>$value) {
							if($val == $value) {
								echo '<div data-value="' . esc_attr($value) . '" class="seo-central-settings-crumbs-selection-item selected">' . esc_html($value) . '</div>';
							}
							else {
								echo '<div data-value="' . esc_attr($value) . '" class="seo-central-settings-crumbs-selection-item">' . esc_html($value) . '</div>';
							}
						}
				?>
			</div>
			<?php 

				echo '<input class="seo-central-text-input hidden" type="text" name="' . esc_attr($this->option_name . '_crumbseparator') . '" id="' . esc_attr($this->option_name . '_crumbseparator') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '', 'seo-central-lite' );
			?>
		</fieldset>
		<?php

  } 

	/**
	 * Render the number input for this plugin
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function seo_central_setting_number_cb() {
		$val = get_option( $this->option_name . '_number' );
		echo '<input type="text" name="' . esc_attr($this->option_name . '_number') . '" id="' . esc_attr($this->option_name . '_number') . '" value="' . esc_attr($val) . '"> ' . esc_html__( '(unity of measure)', 'seo-central-lite' );
	} 

	/**
	 * Render the radio input field for boolean option
	 *
	 * @since  1.0.0
	 * @access public
	*/
	public function seo_central_setting_bool_cb() {
		$val = get_option( $this->option_name . '_bool' );
		?>
			<fieldset>
				<label>
					<input type="radio" name="<?php echo esc_attr($this->option_name . '_bool') ?>" id="<?php echo esc_attr($this->option_name . '_bool') ?>" value="true" <?php checked( $val, 'true' ); ?>>
					<?php esc_html_e( 'True', 'seo-central-lite' ); ?>
				</label>
				<br>
				<label>
					<input type="radio" name="<?php echo esc_attr($this->option_name . '_bool') ?>" value="false" <?php checked( $val, 'false' ); ?>>
					<?php esc_html_e( 'False', 'seo-central-lite' ); ?>
				</label>
			</fieldset>
		<?php
	}

  /**
   * Set the default schema for pages
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_page_schema_cb() {
		//These Arrays set the schema list and update the values.
    $val = get_option( $this->option_name . '_pageschema' );
		$opt_array = array("Webpage","ItemPage","AboutPage","FAQPage","QAPage","ProfilePage","ContactPage","MedicalWebPage","CollectionPage","CheckoutPage","RealEstateListing","SearchResultsPage");
		$list_text = array("Default Web Page","Item Page","About Page","FAQ Page","QA Page","Profile Page","Contact Page","Medical Web Page","Collection Page","Checkout Page","Real Estate Listing","Search Results Page");
		?> 

		<fieldset>
			<select class="seo-central-dropdown-list seo-central-select" id="<?php echo esc_attr($this->option_name . '_pageschema') ?>" name="<?php echo esc_attr($this->option_name . '_pageschema') ?>" type="select" value="<?php echo esc_attr($val); ?>">

				<?php 
					//Check if the field value is empty, if so set default
					if($val == '' || $val == null) {
						$val = "WebPage";
					}

					//Loop through the options array to display and set the selected item. 
					foreach($opt_array as $index=>$value) {
						if($val == $value) {
							echo '<option value="' . esc_attr($value) . '" selected="selected">' . esc_html($list_text[$index]) . '</option>';
						}
						else {
							echo '<option value="' . esc_attr($value) . '">' . esc_html($list_text[$index]) . '</option>';
						}
					}
				?>

			</select>
		</fieldset>
		
		<?php
  } 

  /**
   * Set the default schema for posts
   *
   * @since   1.0.0
   * @access  public
  */
  public function seo_central_setting_post_schema_cb() {
		//These Arrays set the schema list and update the values. 
    $val = get_option( $this->option_name . '_postschema' );
		$opt_array = array("None","Article","BlogPosting","SocialMediaPosting","NewsArticle","AdvertiserContentArticle","SatiricalArticle","ScholarlyArticle","TechArticle","Report");
		$list_text = array("Article","Blog Post","Social Media Post","News Article","Advertiser Content Article","Satirical Article","Scholarly Article","Tech Article","Report");
		?> 

		<fieldset>
			<select class="seo-central-dropdown-list seo-central-select" id="<?php echo esc_attr($this->option_name . '_postschema') ?>" name="<?php echo esc_attr($this->option_name . '_postschema') ?>" type="select" value="<?php echo esc_attr($val); ?>">

				<?php 
					if($val == '' || $val == null) {
						$val = "None";
					}

					foreach($opt_array as $index=>$value) {
						if($val == $value) {
							echo '<option value="' . esc_attr($value) . '" selected="selected">' . esc_html($list_text[$index]) . '</option>';
						}
						else {
							echo '<option value="' . esc_attr($value) . '">' . esc_html($list_text[$index]) . '</option>';
						}
					}
				?>

			</select>
		</fieldset>
		
		<?php
  } 

	// Register the post type fields. Each Post type should contain fields for Title, Description, Social: (Image, Title, Description), Page/Post Schemas
	public function seo_central_register_post_type_settings_fields($post_types) {
    foreach ($post_types as $post_type) {

			//Remove Underscores for the display of the post types
			$display_post_type = ucfirst(str_replace('_', ' ', $post_type));

			if($post_type != 'attachment') { //do NOT add the media post type
        // Add a settings section for the post type
        add_settings_section(
            $this->option_name . "_{$post_type}_section",
            __( $display_post_type . ' settings', 'seo-central-lite' ),
            array( $this, $this->option_name . "_{$post_type}_section_cb" ),
            $this->plugin_name
        );
        // Add Post Type Title Field
				add_settings_field(
					$this->option_name . "_{$post_type}_title_field",
					__( $display_post_type . ' title field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_title_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_title_field",
						'description' => __( 'The default title tag for [posts] that don\'t have one set.', 'seo-central-lite' )
					)
				);

				// Add Post Type Description Field
				add_settings_field(
					$this->option_name . "_{$post_type}_description_field",
					__( $display_post_type . ' description field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_description_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_description_field",
						'description' => __( 'The default meta description for [posts] that don\'t have one set.', 'seo-central-lite' )
					)
				);

				// Add Post Type Social Title Field
				add_settings_field(
					$this->option_name . "_{$post_type}_social_title_field",
					__( ucfirst($post_type) . ' Social Title field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_social_title_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_social_title_field",
						'description' => __( 'The default title shown for all [posts], when shared on social, in case one isn\'t set.', 'seo-central-lite' )
					)
				);

				// Add Post Type Social Description Field
				add_settings_field(
					$this->option_name . "_{$post_type}_social_description_field",
					__( $display_post_type . ' Social Description field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_social_description_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_social_description_field",
						'description' => __( 'The default description shown for all [posts], when shared on social, in case one isn\'t set.', 'seo-central-lite' )
					)
				);

				// Add Post Type Social Image Field
				add_settings_field(
					$this->option_name . "_{$post_type}_social_image_field",
					__( $display_post_type . ' Social Image field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_social_image_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_social_image_field",
						'description' => __( 'The default image shown for all [posts], when shared on social, in case one isn\'t set.', 'seo-central-lite' )
					)
				);

				// Add Post Type Page Schema Field
				add_settings_field(
					$this->option_name . "_{$post_type}_page_schema_field",
					__( $display_post_type . ' Page Schema field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_page_schema_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_page_schema_field",
						'description' => __( 'Default structured data to aid search engines in understanding content within Pages.', 'seo-central-lite' )
					)
				);

				// Add Post Type Post Schema Field
				add_settings_field(
					$this->option_name . "_{$post_type}_post_schema_field",
					__( $display_post_type . ' Post Schema field', 'seo-central-lite' ),
					array( $this, $this->option_name . "_{$post_type}_post_schema_field_cb" ),
					$this->plugin_name,
					$this->option_name . "_{$post_type}_section",
					array(
						'label_for' => $this->option_name . "_{$post_type}_post_schema_field",
						'description' => __( 'Default structured data to aid search engines in understanding content within Posts.', 'seo-central-lite' )
					)
				);

        // Set register settings for all fields to properly save
				//Register Post type Title
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_title_field", 'text');
				//Register Post type Meta Description
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_description_field", 'text');
				//Register Post type Social Image
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_social_image_field", 'text');
				//Register Post type Social Title
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_social_title_field", 'text');
				//Register Post type Social Description
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_social_description_field", 'text');
				//Register Post type Page Schema
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_page_schema_field", 'text');
				//Register Post type Post Schema
        register_setting($this->plugin_name, $this->option_name . "_{$post_type}_post_schema_field", 'text');
			}
    }
	}

	
	/**
	 * Callback function utilized to render custom inputs for each fieldtype
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function __call($method, $args) {
		//Based on the method of the added field set the custom input. 
    if (preg_match('/_section_cb$/', $method)) {//Seperate each table by sections
        //echo '<p>' . __( 'Section settings for ' . str_replace('_section_cb', '', $method), 'seo-central-lite' ) . '</p>';

    } elseif (preg_match('/_title_field_cb$/', $method)) { //title field
        // Get the post type from the method name
        $post_type = str_replace('_title_field_cb', '', $method);

        // Get the value of the setting, if it exists
				$options = get_option($post_type . '_title_field');
				$items = explode(',', $options);

				$savedVariables = "";

				foreach($items as $index => $item) {
					$item = trim($item); // Remove any white space at the beginning and the end of the string
					// If item is not empty, add it to savedVariables
					if($item != "") {
							$savedVariables .= "<span class='seo-central-title-order-span-list-item' data-id='{$index}'>" . esc_html($item) . "</span>";
					}
				}

				$val = $options;

				//Listing the items that can be set in any order for the page title.
				$title_list_items = [
					esc_html__('Site Title', 'seo-central-lite'),
					esc_html__('Page Title', 'seo-central-lite'),
					esc_html__('Separator', 'seo-central-lite'),
					esc_html__('Primary Keyword', 'seo-central-lite')
				];

				?> 
					<fieldset>
						<div data-type="<?php echo esc_attr($post_type); ?>" class="seo-central-title-order-wrapper">
							<div class="seo-central-title-order-applies"> 
								<div class="seo-central-title-order-button js-variable-insert"><?php echo esc_html__('Variable', 'seo-central-lite'); ?></div>
								<div data-type="<?php echo esc_attr($post_type); ?>" class="seo-central-title-order-button js-emoji-insert"><?php echo esc_html__('Emoji', 'seo-central-lite'); ?></div>
							</div>
							<div class="seo-central-title-order-span-list" contentEditable="true"><?php echo $savedVariables; ?></div>
							<ul class="seo-central-title-order-list hidden">
								<?php 
									foreach ( $title_list_items as $item ) {
										?>
											<li class="seo-central-title-order-list-item"><?php echo $item; ?></li>
										<?php
									}
								?>
							</ul>
						</div>
					</fieldset>
				<?php
        // Render the input field
				echo '<input class="seo-central-text-input hidden" type="text" id="' . esc_attr($post_type . "_title_field") . '" name="' . esc_attr($post_type . "_title_field") . '" value="' . esc_attr($val) . '">';

		} elseif (preg_match('/_description_field_cb$/', $method)) { //description field
        // Get the post type from the method name
        $post_type = str_replace('_description_field_cb', '', $method);

        // Get the value of the setting, if it exists
				$options = get_option($post_type . '_description_field');
				$val = $options;

        // Render the input field
				echo '<textarea class="seo-central-text-area" id="' . esc_attr($post_type . "_description_field") . '" name="' . esc_attr($post_type . "_description_field") . '">' . esc_textarea($val) . '</textarea>';

		} elseif (preg_match('/_social_image_field_cb$/', $method)) { //social image field
        // Get the post type from the method name
        $post_type = str_replace('_social_image_field_cb', '', $method);

        // Get the value of the setting, if it exists
				$options = get_option($post_type . '_social_image_field');

				$val = $options;

        // Render the input field
				echo '<button data-type="' . esc_attr($post_type) . '" id="' . esc_attr($post_type . "_social_image_select") . '" class="seo-central-settings-social-image-select seo-central-button-small seo-central-button-secondary" type="button">' . esc_html__('Choose File', 'seo-central-lite') . '</button> <button data-type="' . esc_attr($post_type) . '" id="' . esc_attr($post_type . "_social_image_deselect") . '" class="seo-central-settings-social-image-deselect disabled" type="button"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button><input class="seo-central-settings-image-input" type="text" name="' . esc_attr($post_type . "_social_image_field") . '" id="' . esc_attr($post_type . "_social_image_field") . '" value="' . esc_attr($val) . '"> <p id="' . esc_attr($post_type . "_social_image_instructions") . '" class="seo-central-settings-social-image-instruction">' . esc_html__('5 MB limit. Allowed types: jpg, jpeg, png', 'seo-central-lite') . '</p>';
				
		} elseif (preg_match('/_social_title_field_cb$/', $method)) { //social title field
			// Get the post type from the method name
			$post_type = str_replace('_social_title_field_cb', '', $method);

			// Get the value of the setting, if it exists
			$options = get_option($post_type . '_social_title_field');

			$val = $options;

			// Render the input field
			echo '<input class="seo-central-text-input" type="text" id="' . esc_attr($post_type . "_social_title_field") . '" name="' . esc_attr($post_type . "_social_title_field") . '" value="' . esc_attr($val) . '">';
			
		} elseif (preg_match('/_social_description_field_cb$/', $method)) { //social description field
			// Get the post type from the method name
			$post_type = str_replace('_social_description_field_cb', '', $method);

			// Get the value of the setting, if it exists
			$options = get_option($post_type . '_social_description_field');

			$val = $options;

			// Render the input field
			echo '<input class="seo-central-text-input" type="text" id="' . esc_attr($post_type . "_social_description_field") . '" name="' . esc_attr($post_type . "_social_description_field") . '" value="' . esc_attr($val) . '">';
			
		} elseif (preg_match('/_page_schema_field_cb$/', $method)) { //page schema field
			// Get the post type from the method name
			$post_type = str_replace('_page_schema_field_cb', '', $method);

			// Get the value of the setting, if it exists
			$options = get_option($post_type . '_page_schema_field');
			$val = $options;
			$opt_array = array("Webpage","ItemPage","AboutPage","FAQPage","QAPage","ProfilePage","ContactPage","MedicalWebPage","CollectionPage","CheckoutPage","RealEstateListing","SearchResultsPage");
			$list_text = array("Default Web Page","Item Page","About Page","FAQ Page","QA Page","Profile Page","Contact Page","Medical Web Page","Collection Page","Checkout Page","Real Estate Listing","Search Results Page");

			?> 
				<fieldset>
					<select class="seo-central-dropdown-list seo-central-select" id="<?php echo esc_attr($post_type . '_page_schema_field'); ?>" name="<?php echo esc_attr($post_type . '_page_schema_field'); ?>" type="select" value="<?php echo esc_attr($val); ?>">
		
						<?php 
							//Check if the field value is empty, if so set default
							if($val == '' || $val == null) {
								$val = "WebPage";
							}
		
							//Loop through the options array to display and set the selected item. 
							foreach($opt_array as $index=>$value) {
								if($val == $value) {
									echo '<option value="' . esc_attr($value) . '" selected="selected">' . esc_html($list_text[$index]) . '</option>';
								}
								else {
									echo '<option value="' . esc_attr($value) . '">' . esc_html($list_text[$index]) . '</option>';
								}
							}
						?>
		
					</select>
				</fieldset>
			<?php

		} elseif (preg_match('/_post_schema_field_cb$/', $method)) { //post schema field
			// Get the post type from the method name
			$post_type = str_replace('_post_schema_field_cb', '', $method);

			// Get the value of the setting, if it exists
			$options = get_option($post_type . '_post_schema_field');
			$val = $options;
			$opt_array = array("None","Article","BlogPosting","SocialMediaPosting","NewsArticle","AdvertiserContentArticle","SatiricalArticle","ScholarlyArticle","TechArticle","Report");
			$list_text = array("None","Article","Blog Post","Social Media Post","News Article","Advertiser Content Article","Satirical Article","Scholarly Article","Tech Article","Report");

			?> 
				<fieldset>
					<select class="seo-central-dropdown-list seo-central-select" id="<?php echo esc_attr($post_type . '_post_schema_field') ?>" name="<?php echo esc_attr($post_type . '_post_schema_field') ?>" type="select" value="<?php echo esc_attr($val); ?>">
		
						<?php 
							//Check if the field value is empty, if so set default
							if($val == '' || $val == null) {
								$val = "WebPage";
							}
		
							//Loop through the options array to display and set the selected item. 
							foreach($opt_array as $index=>$value) {
								if($val == $value) {
									echo '<option value="' . esc_attr($value) . '" selected="selected">' . esc_html($list_text[$index]) . '</option>';
								}
								else {
									echo '<option value="' . esc_attr($value) . '">' . esc_html($list_text[$index]) . '</option>';
								}
							}
						?>
		
					</select>
				</fieldset>
			<?php

		} elseif (preg_match('/_field_cb$/', $method)) { //generic text field
			// Get the post type from the method name
			$post_type = str_replace('_field_cb', '', $method);

			// Get the value of the setting, if it exists
			$options = get_option($post_type . '_field');
			// $val = isset($options["_{$post_type}_field"]) ? $options["_{$post_type}_field"] : '';
			$val = $options;

			// Render the input field
			echo '<input class="seo-central-text-input" type="text" id="' . esc_attr($post_type . "_field") . '" name="' . esc_attr($post_type . "_field") . '" value="' . esc_attr($val) . '">';

		} 

	}

	/**
	 * Set the notification option to trigger notification bars on pages and on metabox
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_initialize_notifications() {
		//Enable notification flags for seo central plugin
    if (get_option('seo_central_notification') === false) {
			add_option('seo_central_notification', 'free');
		}
		else {
			if (!defined('SEO_CENTRAL_PRO') || !SEO_CENTRAL_PRO) {
					if (get_option('seo_central_notification') !== false) {
							update_option('seo_central_notification', 'free');
					}
			}
		}
	}

	/**
	 * Check for the seo-central-wp-pro files and if not available return false
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_pro_plugin_check() {
		if (defined('SEO_CENTRAL_PRO') && constant('SEO_CENTRAL_PRO') === true) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Function to curl request body content of the page using the permalink
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_body_content() {
		$page_permalink = get_permalink();

		//Utilize the site username and password to curl request on protected sites
		$site_username = get_option( 'seo_central_setting_username');
		$site_password = get_option( 'seo_central_setting_password');

		//This body checks arrays is passed over to the jquery files as mythemeparams (set within the enqueue scripts function) to update the page analysis and fields.
		$body_checks = array(
			"stringbody" => '', 		//Store all body text in a string to review content
			"flesch" => array(),		//Flesch reading scores stored in this array
			'hierarchy' => array(), //The content hierarchy from (title, h1 -> h6)
			'images' => array(),		//All images on page with their src and alt text for scoring
			'header' => array(),		//Header array stores all the meta, link, and title tags data used in the scoring process.
			'http_status' => '',
		);

		if($page_permalink) {
			//Use curl and the permalink to get the page's content
			$ch = curl_init($page_permalink);
			curl_setopt($ch,CURLOPT_HTTPAUTH,CURLAUTH_DIGEST); //possible authorization fix?
			//curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
			// set headers

			//If the username and password are updated in settings. 
			if($site_username != '' && $site_password != ''){
				curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					'Content-Type: application/json',
					'Authorization: Basic '. base64_encode($site_username . ":" . $site_password)
				));
			}
			else {
				curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					'Content-Type: application/json'
				));
			}
			// curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			// 	'Content-Type: application/json',
			// 	'Authorization: Basic '. base64_encode("devseocentral:devseocentral")
			// ));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			// curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);

			//execute request and store response
			$content = curl_exec($ch);

			//check for errors
			if(curl_errno($ch)){

			   echo 'Error: ' . curl_error($ch);
			}
			else {
				//var_dump($content);
			}

			//Get the HTTP access code (Utlized for seo scoring)
			$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

			// var_dump($content);
			curl_close($ch);

			//The http access code must be successful (This counts towards the page seo score)
			if($http_status >= 200 && $http_status < 300){
				$body_checks['http_status'] = "Success ". $http_status;
				//echo "Success: HTTP status code is $http_status";
			}
			else if($http_status >= 300 && $http_status < 400){
				$body_checks['http_status'] = "Error Redirect ". $http_status;
					//echo "Redirection: HTTP status code is $http_status";
			}
			else if($http_status >= 400 && $http_status < 500){
				$body_checks['http_status'] = "Error Client ". $http_status;
					//echo "Client Error: HTTP status code is $http_status";
			}
			else if($http_status >= 500){
				$body_checks['http_status'] = "Error Server ". $http_status;
					//echo "Server Error: HTTP status code is $http_status";
			}
			else {
				$body_checks['http_status'] = "Error Unknown ". $http_status;
					//echo "Unknown HTTP status code: $http_status";
			}
		
			//Specifically target the body of the content.
			preg_match("/<body[^>]*>(.*?)<\/body>/is", $content, $matches);
	
			//Specifically target the head of the content
			preg_match("/<head[^>]*>(.*?)<\/head>/is", $content, $head_matches);

			//Access the header and check for title, meta, and link values to use in seo scoring
			if($head_matches) {
				// Access the html using domdocument to parse and remove unnecessary content
				$dom = new DOMDocument;
				libxml_use_internal_errors(true);
				$dom->loadHTML($head_matches[1]);
				libxml_clear_errors();

				// Get the head element
				$head = $dom->getElementsByTagName('head')->item(0);

				$headerTags = array('title', 'meta', 'link'); //array of items to pull from header

				// Iterate through each child of the head element
				foreach ($head->childNodes as $child) {
					// Check if the child's tag name is in the $headerTags array
					if (in_array($child->nodeName, $headerTags)) {
						// If it's a 'meta' tag, get its 'name' and 'content' attributes
						if ($child->nodeName == 'meta') {

							if($child->getAttribute('name') === "viewport") {
								$name = $child->getAttribute('name');
								$content = $child->getAttribute('content');
								$content_row = array("tag" => $child->nodeName, "name" => $name, "content" => $content);
							}

						} elseif ($child->nodeName == 'link') { //access the link with rel=canonical for scoring

							if($child->getAttribute('rel') === "canonical") {
								$href = $child->getAttribute('href');
								$rel = $child->getAttribute('rel');
								$content_row = array("tag" => $child->nodeName,"rel" => $rel ,"href" => $href);
							}

						} elseif ($child->nodeName == 'title') {

								// Add the tag and its content to the array
								$content_row = array("tag" => $child->nodeName, "content" => $child->textContent);

								//Set the title as the first item of the content hierarchy
								$hierarchy_row[] = array("tag" => $child->nodeName, "content" => $child->textContent);
								array_push($body_checks['hierarchy'], $hierarchy_row);
								unset($hierarchy_row);

						}

						// Only push to the array if $content_row is set
						if(isset($content_row)) {
							array_push($body_checks['header'], $content_row);
						}
						unset($content_row);//always unset after push
					}
				}
			}
	
			//Access the body and strip all of its content for scoring.
			if($matches) {
				//Access the html using domdocument to parse and remove unnecessary content
				$dom = new DOMDocument;
				libxml_use_internal_errors(true);
				$dom->loadHTML($matches[1]);
				libxml_clear_errors();
		
				//Access the body element and remove tags/content
				$bodies = $dom->getElementsByTagName('body');
				$hierarchy = $dom->getElementsByTagName('*'); //Retrieve all the tags on page to display content hierarchy
				assert($bodies->length === 1);
				$body = $bodies->item(0);
				$bodyImages = $body->getElementsByTagName('img'); //Access all img tags in the body

				//Loop through each img element
				foreach($bodyImages as $img) {
					
					$img_row[] = array("src" => "{$img->getAttribute('src')}", "alt" => "{$img->getAttribute('alt')}");
					array_push($body_checks['images'], $img_row);
					unset($img_row);
				}
		
				//Remove unnecessary elements (should be alterable)
				//This also empties most of the body array
				$arr = array('nav','footer', 'meta', 'style', 'script', 'svg', 'img','link','button','title');
				foreach ($arr as &$value) {
						$elements = $body->getElementsByTagName($value);
						for ($i = $elements->length; --$i >= 0; ) {
							$href = $elements->item($i);
							$href->parentNode->removeChild($href);
						}
				}

				//Create an array to store the title,h1,2,3,4,5,6 tags from the body content
				$headTags = array('h1','h2','h3','h4','h5','h6');
				for($i = 0; $i < $hierarchy->length; $i++){

					//Check for all the title/headings and insert them into an array
					if(in_array($hierarchy[$i]->tagName, $headTags, true)) {
						
						$content_row[] = array("tag" => "{$hierarchy[$i]->tagName}", "content" => "{$hierarchy[$i]->textContent}");
						array_push($body_checks['hierarchy'], $content_row);
						unset($content_row);
					}

				}
		
				//Save the html to string and return to the fieltype
				$stringbody = $dom->saveHTML($body);
				$stringbody = preg_replace('/<!--[\s\S]*?-->/', '', $stringbody); //Remove Comments
				$stringbody = strip_tags($stringbody); //Strip all tags from content
				$stringbody = trim(preg_replace('/\s\s+/', ' ', str_replace("\n", " ", $stringbody)));

				//pass the entire body to the array
				$body_checks['stringbody'] = $stringbody;
				$body_checks['flesch'] = $this->seo_central_get_scores($stringbody);

				return $body_checks; 

			} else {
				return $body_checks;
			}

		} else {
			return false;
		}
	}

	/**
	 * Access Body content and extract the internal and external links from the page
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_link_content() {
		$page_permalink = get_permalink();
		$base_url = site_url();

		$site_username = get_option( 'seo_central_setting_username');
		$site_password = get_option( 'seo_central_setting_password');

		if($page_permalink) {
			//Use curl and the permalink to get the page's content
			$ch = curl_init($page_permalink);
			curl_setopt($ch,CURLOPT_HTTPAUTH,CURLAUTH_DIGEST); //possible authorization fix?

			//If the username and password are updated in settings. 
			if($site_username != '' && $site_password != ''){
				curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					'Content-Type: application/json',
					'Authorization: Basic '. base64_encode($site_username . ":" . $site_password)
				));
			}
			else {
				curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					'Content-Type: application/json'
				));
			}

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

			//execute request and store response
			$content = curl_exec($ch);

			//check for errors
			if(curl_errno($ch)){

			   echo 'Error: ' . curl_error($ch);
			}
			else {
				//var_dump($content);
			}

			curl_close($ch);
	
			//Specifically target the body of the content.
			preg_match("/<body[^>]*>(.*?)<\/body>/is", $content, $matches);
	
	
			if($matches) {
				//Access the html using domdocument to parse and remove unnecessary content
				$dom = new DOMDocument;
				libxml_use_internal_errors(true);
				$dom->loadHTML($matches[1]);
				libxml_clear_errors();
		
				//Access the body element and remove tags/content
				$bodies = $dom->getElementsByTagName('body');
				assert($bodies->length === 1);
				$body = $bodies->item(0);

				//Need to remove nav footer and other elements to properly strip the internal and external links from the page
				//Excluding img tag from this array for the a tag crawl checks.
				$arr = array('nav','footer', 'meta', 'style', 'script', 'svg','link','button','title');
				foreach ($arr as &$value) {
						$elements = $body->getElementsByTagName($value);
						for ($i = $elements->length; --$i >= 0; ) {
							$href = $elements->item($i);
							$href->parentNode->removeChild($href);
						}
				}

				//Get the a tags, set the counts and urls for both internal and external links
				$links = $body->getElementsByTagName('a');
				$externals = array(
					"count" => 0,
					"links" => array()
				);
				$internals = array(
					"count" => 0,
					"links" => array()
				);
				$crawlables = array(
					"count" => 0,
					"descriptive" => array(),
					"links" => array(),
					"check" => array()
				);
				$stringlinks = '';

				foreach ($links as $link) {
					$url = $link->getAttribute('href');

					//Check for external or external links, store them into these arrays and pass the values
					if((str_contains($url, 'http') || str_contains($url, 'https')) && !str_contains($url, $base_url)) {
						$externals['count'] += 1;
						array_push($externals['links'], $url);
					}
					else if((str_contains($url, 'http') || str_contains($url, 'https')) && str_contains($url, $base_url)) {
						$internals['count'] += 1;
						array_push($internals['links'], $url);
					}
					else if(str_contains($url, '/')) {
						$internals['count'] += 1;
						array_push($internals['links'], $url);
					}
					else if(str_contains($url, '#')) {
						//something here
					}

					//Check for all crawlable links, store in array to display success or warning for crawlability 
					//Link text is the inner text of the a tag, each a tag should have either link text or a title attribute
					$linkText = trim($link->nodeValue);

					//If the url from href attribute is not empty or #
					if ($url !== '' && $url !== '#') {
						if (preg_match('~^(https?:)?//~', $url) || $url[0] == '/') {
							// Check for title attribute
							$title = trim($link->getAttribute('title'));

							// If there is an image within the a tag
							$imgTag = $link->getElementsByTagName('img');

							//Emulating the lighthouse check for generic a tag text, should be unique
							$genericPhrases = array('click here', 'click this', ' go ', 'here', 'this', 'start', 'right here', 'more', 'learn more');
					
							// Checking for good practice, the link shouldn't have empty text
							// unless it has a non-empty title attribute
							if ($linkText == '' && $title == '') {
								array_push($crawlables['links'], $url);
								// array_push($crawlables['check'], 'Warning: Enter link text or title attribute for the a link.');
								if($imgTag->length > 0 && $imgTag->item(0)->hasAttribute('alt') && $imgTag->item(0)->getAttribute('alt') != '') {
									array_push($crawlables['check'], 'Success: Link is crawlable.');

									if(!in_array(strtolower($imgTag->item(0)->getAttribute('alt')), $genericPhrases)) {
										array_push($crawlables['descriptive'], 'Success: Alt link text is optimal.');
									}
									else {
										array_push($crawlables['descriptive'], 'Warning: Alt Text may be too generic for link.');
									}
								}
								else {
									array_push($crawlables['descriptive'], 'Warning: Missing alt text.');
									array_push($crawlables['check'], 'Warning: Enter link text or title attribute for the a link.');
								}

							} else {
								array_push($crawlables['links'], $url);
								array_push($crawlables['check'], 'Success: Link is crawlable.');
								$crawlables['count'] += 1;

								if($linkText != '' && in_array(strtolower($linkText), $genericPhrases)) {
									array_push($crawlables['descriptive'], 'Warning: Text may be too generic for link.');
								}
								else if($title != '' && in_array(strtolower($title), $genericPhrases)) {
									array_push($crawlables['descriptive'], 'Warning: Title may be too generic for link.');
								}
								else if($linkText != '' || $title != '') {
									array_push($crawlables['descriptive'], 'Success: Link text is optimal.');
								}
							}
						}

						// Not recommended links check
						if (preg_match('~^javascript:~', $url)) {
							array_push($crawlables['links'], $url);
							array_push($crawlables['check'], 'Warning: Javascript linking not recommended by Google.');
							array_push($crawlables['descriptive'], 'Warning: Missing descriptive text.');
						}
					}

					// Checking for Not recommended cases where href is missing, but other attributes are used
					$routerLink = $link->getAttribute('routerlink');
					if ($routerLink != '') {
						array_push($crawlables['links'], $routerLink);
						array_push($crawlables['check'], 'Warning: Router Links not recommended by Google.');
						array_push($crawlables['descriptive'], 'Warning: Missing descriptive text.');
					}
					
					$onClick = $link->getAttribute('onclick');
					if ($onClick != '') {
						array_push($crawlables['links'], $url);
						array_push($crawlables['check'], 'Warning: Onclick linking not recommended by Google.');
						array_push($crawlables['descriptive'], 'Warning: Missing descriptive text.');
					}
				}
				
				//Store both arrays and pass through to update the hidden fields on page analysis for internal and external linkings
				$all_urls = array(
					"internals" => $internals,
					"externals" => $externals,
					"crawlables" => $crawlables
				);

				return $all_urls;
			}
			else {
				//No internal or external links provided to page
				$stringlinks = 'No Internal or External Links';
				return $stringlinks;
			}

		}
		else {
			return false;
		}
	}

	/**
	 * Flesch reading and accessablity 
	 *
	 * @since  	1.0.0
	 * @access 	public
	*/
	public function seo_central_get_scores($text) {
		$sampleLimit = 1000;
		$sentenceRegex = '/[.?!]\s[^a-z]/g';
		$syllableRegex = '/[aiouy]+e*|e(?!d$|ly).|[td]ed|le$/g';
		$freBase = array(
			"base" => 206.835,
			"sentenceLength" => 1.015,
			"syllablesPerWord" => 84.6,
			"syllableThreshold" => 3
		);
		$cache = array();
		$punctuation = array("!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~");
		$obj = [];

		function legacyRound($number, $precision) {
			$k = pow(10, ($precision ?: 0));
			return floor(($number * $k) + 0.5 * ($number <=> 0)) / $k;
		}

		function charCount($text){
				global $cache;
				if(isset($cache['charCount'])) return $cache['charCount'];
				$text = str_replace(" ", "", $text);
				$cache['charCount'] = strlen($text);
				return $cache['charCount'];
		}

		function removePunctuation($text){
			global $punctuation;
				$punctuation = array("!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~");
				$text = str_split($text);
				$text = array_filter($text, function($c) use ($punctuation) {
						return !in_array($c, $punctuation);
				});
				return implode("", $text);
		}

		function letterCount($text, $sampleLimit) {
			if ($sampleLimit > 0) {
					$textArray = explode(' ', $text);
					$text = implode(' ', array_slice($textArray, 0, $sampleLimit));
			}
			
			$text = preg_replace('/\s+/', '', $text);
			return strlen(removePunctuation($text));
		}

		function lexiconCount($text, $useCache, $ignoreSample=false){
				global $cache;
				if($useCache && isset($cache['lexiconCount'])) return $cache['lexiconCount'];
				if(!$ignoreSample) $text = implode(" ", array_slice(explode(" ", $text), 0, 1000));
				$text = removePunctuation($text);
				$lexicon = count(explode(" ", $text));
				if($useCache) $cache['lexiconCount'] = $lexicon;
				return $lexicon;
		}

		function getWords($text, $useCache) {
			global $cache, $sampleLimit;
			$sampleLimit = 1000;
			if ($useCache && isset($cache['getWords'])) return $cache['getWords'];
			if ($sampleLimit > 0) $text = implode(" ", array_slice(explode(" ", $text), 0, $sampleLimit));
			$text = strtolower($text);
			$text = removePunctuation($text);
			$words = explode(" ", $text);
			if ($useCache) {
					$cache['getWords'] = $words;
			}
			return $words;
		}
		
		function syllableCount($text, $useCache) {
				global $cache, $syllableRegex;
				$syllableRegex = '/[aiouy]+e*|e(?!d$|ly).|[td]ed|le$/';
				if ($useCache && isset($cache['syllableCount'])) return $cache['syllableCount'];
				$count = 0;
				$words = getWords($text, $useCache);
				foreach ($words as $word) {
						preg_match_all($syllableRegex, $word, $matches);
						$count += isset($matches[0]) ? count($matches[0]) : 1;
				}
				if ($useCache) {
						$cache['syllableCount'] = $count;
				}
				return $count;
		}
		
		function polySyllableCount($text, $useCache) {
				$count = 0;
				$words = getWords($text, $useCache);
				foreach ($words as $word) {
						$syllables = syllableCount($word, false);
						if ($syllables >= 3) {
								$count += 1;
						}
				}
				return $count;
		}

		function sentenceCount($text, $useCache) {
			global $cache, $sampleLimit, $sentenceRegex;
			$sentenceRegex = '/[.?!]\s[^a-z]/';
			$sampleLimit = 1000;
			if ($useCache && isset($cache['sentenceCount'])) return $cache['sentenceCount'];
			if ($sampleLimit > 0) $text = implode(" ", array_slice(explode(" ", $text), 0, $sampleLimit));
			$ignoreCount = 0;
			$sentences = preg_split($sentenceRegex, $text);
			foreach ($sentences as $s) {
					if (lexiconCount($s, true, false) <= 2) $ignoreCount += 1;
			}
			$count = max(1, count($sentences) - $ignoreCount);
			if ($useCache) $cache['sentenceCount'] = $count;
			return $count;
		}

		function avgSentenceLength($text) {
				$avg = lexiconCount($text, true) / sentenceCount($text, true);
				return legacyRound($avg, 2);
		}

		function avgSyllablesPerWord($text) {
				$avg = syllableCount($text, true) / lexiconCount($text, true);
				return legacyRound($avg, 2);
		}

		function avgCharactersPerWord($text) {
				$avg = charCount($text) / lexiconCount($text, true);
				return legacyRound($avg, 2);
		}

		function avgLettersPerWord($text) {
			$sampleLimit = 1000;
				$avg = letterCount($text, $sampleLimit) / lexiconCount($text, true);
				return legacyRound($avg, 2);
		}

		function avgSentencesPerWord($text) {
				$avg = sentenceCount($text, true) / lexiconCount($text, true);
				return legacyRound($avg, 2);
		}

		function fleschReadingEase($text) {
				global $freBase;
				$freBase = array(
					"base" => 206.835,
					"sentenceLength" => 1.015,
					"syllablesPerWord" => 84.6,
					"syllableThreshold" => 3
				);
				$sentenceLength = avgSentenceLength($text);
				$syllablesPerWord = avgSyllablesPerWord($text);
				return legacyRound(
					$freBase['base'] - 
					$freBase['sentenceLength'] * $sentenceLength - 
					$freBase['syllablesPerWord'] * $syllablesPerWord,
					2
				);
		}

		function fleschKincaidGrade($text) {
				$sentenceLength = avgSentenceLength($text);
				$syllablesPerWord = avgSyllablesPerWord($text);
				return legacyRound(
					0.39 * $sentenceLength +
					11.8 * $syllablesPerWord -
					15.59,
					2
				);
		}

		function smogIndex($text) {
			$sentences = sentenceCount($text, true);
			if ($sentences >= 3) {
					$polySyllables = polySyllableCount($text, true);
					$smog = 1.043 * (sqrt($polySyllables * (30 / $sentences))) + 3.1291;
					return legacyRound($smog, 2);
			}
			return 0.0;
		}
		
		function colemanLiauIndex($text) {
				$letters = legacyRound(avgLettersPerWord($text) * 100, 2);
				$sentences = legacyRound(avgSentencesPerWord($text) * 100, 2);
				$coleman = 0.0588 * $letters - 0.296 * $sentences - 15.8;
				return legacyRound($coleman, 2);
		}
		
		function automatedReadabilityIndex($text) {
				$chars = charCount($text);
				$words = lexiconCount($text, true);
				$sentences = sentenceCount($text, true);
				$a = $chars / $words;
				$b = $words / $sentences;
				$readability = (
					4.71 * legacyRound($a, 2) +
					0.5 * legacyRound($b, 2) -
					21.43
				);
				return legacyRound($readability, 2);
		}
		
		function linsearWriteFormula($text) {
				$easyWord = 0;
				$difficultWord = 0;
				$roughTextFirst100 = implode(" ", array_slice(explode(" ", $text), 0, 100));
				$plainTextListFirst100 = array_slice(getWords($text, true), 0, 100);
				foreach ($plainTextListFirst100 as $word) {
						if (syllableCount($word, false) < 3) {
								$easyWord += 1;
						} else {
								$difficultWord += 1;
						}
				}
				$number = ($easyWord + $difficultWord * 3) / sentenceCount($roughTextFirst100, true);
				if ($number <= 20) {
						$number -= 2;
				}
				return legacyRound($number / 2, 2);
		}
		
		function rix($text) {
				$words = getWords($text, true);
				$longCount = 0;
				foreach ($words as $word) {
						if (strlen($word) > 6) {
								$longCount++;
						}
				}
				$sentencesCount = sentenceCount($text, true);
				return legacyRound($longCount / $sentencesCount, 2);
		}
		
		function readingTime($text) {
				$wordsPerSecond = 4.17;
				return legacyRound(lexiconCount($text, false, true) / $wordsPerSecond, 2);
		}

		function buildTextStandard($text, $obj) {
			$grade = [];
			// $obj = [];
	
			// FRE
			$fre = $obj["fleschReadingEase"] = fleschReadingEase($text);
			if ($fre < 100 && $fre >= 90) {
					array_push($grade, 5);
			} else if ($fre < 90 && $fre >= 80) {
					array_push($grade, 6);
			} else if ($fre < 80 && $fre >= 70) {
					array_push($grade, 7);
			} else if ($fre < 70 && $fre >= 60) {
					array_push($grade, 8);
					array_push($grade, 9);
			} else if ($fre < 60 && $fre >= 50) {
					array_push($grade, 10);
			} else if ($fre < 50 && $fre >= 40) {
					array_push($grade, 11);
			} else if ($fre < 40 && $fre >= 30) {
					array_push($grade, 12);
			} else {
					array_push($grade, 13);
			}
	
			// FK
			$fk = $obj["fleschKincaidGrade"] = fleschKincaidGrade($text);
			array_push($grade, floor($fk));
			array_push($grade, ceil($fk));
	
			// SMOG
			$smog = $obj["smogIndex"] = smogIndex($text);
			array_push($grade, floor($smog));
			array_push($grade, ceil($smog));
	
			// CL
			$cl = $obj["colemanLiauIndex"] = colemanLiauIndex($text);
			array_push($grade, floor($cl));
			array_push($grade, ceil($cl));
	
			// ARI
			$ari = $obj["automatedReadabilityIndex"] = automatedReadabilityIndex($text);
			array_push($grade, floor($ari));
			array_push($grade, ceil($ari));
	
			// LWF
			$lwf = $obj["linsearWriteFormula"] = linsearWriteFormula($text);
			array_push($grade, floor($lwf));
			array_push($grade, ceil($lwf));
	
			// RIX
			$rixScore = $obj["rix"] = rix($text);
			if ($rixScore >= 7.2) {
					array_push($grade, 13);
			} else if ($rixScore < 7.2 && $rixScore >= 6.2) {
					array_push($grade, 12);
			} else if ($rixScore < 6.2 && $rixScore >= 5.3) {
					array_push($grade, 11);
			} else if ($rixScore < 5.3 && $rixScore >= 4.5) {
					array_push($grade, 10);
			} else if ($rixScore < 4.5 && $rixScore >= 3.7) {
					array_push($grade, 9);
			} else if ($rixScore < 3.7 && $rixScore >= 3.0) {
					array_push($grade, 8);
			} else if ($rixScore < 3.0 && $rixScore >= 2.4) {
					array_push($grade, 7);
			} else if ($rixScore < 2.4 && $rixScore >= 1.8) {
					array_push($grade, 6);
			} else if ($rixScore < 1.8 && $rixScore >= 1.3) {
				array_push($grade, 5);
			} else if ($rixScore < 1.3 && $rixScore >= 0.8) {
				array_push($grade, 4);
			} else if ($rixScore < 0.8 && $rixScore >= 0.5) {
				array_push($grade, 3);
			} else if ($rixScore < 0.5 && $rixScore >= 0.2) {
				array_push($grade, 2);
			} else {
				array_push($grade, 1);
			}

			// Find median grade
			sort($grade);
			$midPoint = floor(count($grade) / 2);
			$medianGrade = legacyRound(
				count($grade) % 2 ?
				$grade[$midPoint] :
				($grade[$midPoint - 1] + $grade[$midPoint]) / 2.0, 0
			);
			$obj["medianGrade"] = $medianGrade;

			//Get wordcount: 
			$all_words = getWords($text, true);
			$obj['wordcount'] = count($all_words);

			return $obj;
		}

		$obj = buildTextStandard($text, $obj);
		$obj["readingTime"] = readingTime($text);

		return $obj;
	}
}

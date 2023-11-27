<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Seo_Central
 * @subpackage Seo_Central/includes
 * @author     Hounder <info@hounder.co>
 */
class Seo_Central {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Seo_Central_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'SEO_CENTRAL_VERSION' ) ) {
			$this->version = SEO_CENTRAL_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'seo-central';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

		//Sitemaps are generated on the base SEO Central Plugin
		$this->seo_central_sitemap();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Seo_Central_Loader. Orchestrates the hooks of the plugin.
	 * - Seo_Central_i18n. Defines internationalization functionality.
	 * - Seo_Central_Admin. Defines all hooks for the admin area.
	 * - Seo_Central_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-seo-central-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-seo-central-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-seo-central-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-seo-central-public.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-seo-central-metabox.php';

		$this->loader = new Seo_Central_Loader();

		$this->metabox = new Seo_Central_Metabox();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Seo_Central_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Seo_Central_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Seo_Central_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$this->loader->add_action( 'admin_menu', $plugin_admin, 'seo_central_plugin_menu' );

		$this->loader->add_action( 'admin_init', $plugin_admin, 'register_seo_central_plugin_settings' );

		//Disable the default wordpress robots
		add_filter( 'wp_robots', [$this,'remove_default_wp_robots'] );
		
		//Trigger all the filters and column setup for ALL post types
		add_action('init', [$this, 'define_post_type_hooks']);
		
		// Additional hooks that apply to all post types
		add_action('save_post', [$this, 'seo_central_update_internals_count'], 10, 3);
		add_action('pre_get_posts', [$this, 'wp_seo_central_pre_sort_outgoing_internal']);
		add_action('pre_get_posts', [$this, 'wp_seo_central_pre_sort_incoming_internal']);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Seo_Central_Public( $this->get_plugin_name(), $this->get_version() );

		// Add custom CSS and JS to the header
		// $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		// $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		// Set a custom cookie for the user
		// https://developer.wordpress.org/reference/hooks/init/
		$this->loader->add_action( 'init', $plugin_public, 'seo_central_add_cookie' );

		// Set SEO meta info to the header
		// Last number sets position in the header
		// https://developer.wordpress.org/reference/hooks/wp_head/
		$this->loader->add_action( 'wp_head', $plugin_public, 'seo_central_add_header_meta', 1 );

		//Shortcode for breadcrumbs
		// add_shortcode('seo_central_breadcrumbs', [$this,'seo_central_get_breadcrumb']);
		add_shortcode( 'seo_central_breadcrumbs', array( $this, 'seo_central_get_breadcrumb' ));

	}

	/**
	 * Register all of the hooks related to the posts functionality
	 * of the plugin After all post types have been fully loaded.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	public function define_post_type_hooks() {
		// Utilize all public post types and set filters and columns to each page/post_type available from Wordpress site
		$post_types = get_post_types( array('public' => true), 'names' );
		
		// Loop through each public post type
		foreach ( $post_types as $post_type ) {
			if ( 'attachment' == $post_type ) continue; // Skip 'attachment' post type
			
			// Additional Columns for page listing (Seo Score, Internal, External links)
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_central_score_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_central_score_custom_column'], 10, 2);
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_central_outgoing_internal_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_central_outgoing_internal_custom_column'], 10, 2);
			add_filter("manage_edit-{$post_type}_sortable_columns", [$this,'wp_seo_central_outgoing_internal_custom_sort']);
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_central_incoming_internal_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_central_incoming_internal_custom_column'], 10, 2);
			add_filter("manage_edit-{$post_type}_sortable_columns", [$this,'wp_seo_central_incoming_internal_custom_sort']);
		}
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Seo_Central_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

  /**
   * Register the new sitemaps 
   * of the plugin.
   *
   * @since    1.0.0
   * @access   private
   */
  private function seo_central_sitemap() {
    require_once(__DIR__.'/sitemaps/class-seo-central-sitemaps.php');
    global $seo_central_sitemaps;

    // If there isn't a global instance, set the sitemaps system.
		if ( empty( $seo_central_sitemaps ) ) {
			$seo_central_sitemaps = new Seo_Central_Sitemaps();
	
			// Hook into 'after_setup_theme'
			add_action( 'after_setup_theme', array( $seo_central_sitemaps, 'init' ) );
		}
  
    return $seo_central_sitemaps;
  }

  /**
   * Remove default robots (replaced with seocentral's custom robots meta tag)
   *
   * @since    1.0.0
   * @access   private
   */
	public function remove_default_wp_robots( $robots ) {
    return array();
	}

	//Add custom columns to track for pages 
	public function wp_seo_central_score_column($columns) {
		return array_merge($columns, ['seo-score' => __('Central Score', 'seo-central-lite')]);
	}

	//Create the custom column, utilize the hidden page analysis field to display the proper score
	public function wp_seo_central_score_custom_column($column_key, $post_id) {

		if ($column_key == 'seo-score') {
			$scoreCount = get_post_meta($post_id, 'seo_central_page_score', 'true');
			$starting_url = "/wp-content/plugins/seo-central-wp-lite/admin/icons";

			if($scoreCount) {
				// Checks for the score and sets the image 
				$scoreBracket = ($scoreCount == 100) ? 11 : ceil($scoreCount / 10);

				// Retrieve the edit url for the page and apply it to the score to edit page
				$edit_link = get_edit_post_link($post_id);
				$edit_anchor = $edit_link . '#seo-central'; // Add the anchor

				//All possible score images 0 - 100 (broken up by 10s 1-9, 10-19...)
				$images = [
					"0" => $starting_url . "/seo-central-list-score-0.svg",
					"1" => $starting_url . "/seo-central-list-score-1.svg",
					"2" => $starting_url . "/seo-central-list-score-2.svg",
					"3" => $starting_url . "/seo-central-list-score-3.svg",
					"4" => $starting_url . "/seo-central-list-score-4.svg",
					"5" => $starting_url . "/seo-central-list-score-5.svg",
					"6" => $starting_url . "/seo-central-list-score-6.svg",
					"7" => $starting_url . "/seo-central-list-score-7.svg",
					"8" => $starting_url . "/seo-central-list-score-8.svg",
					"9" => $starting_url . "/seo-central-list-score-9.svg",
					"10" => $starting_url . "/seo-central-list-score-10.svg",
					"11" => $starting_url . "/seo-central-list-score-11.svg"
				];

				$image = $images[$scoreBracket] ?? $starting_url . "/seo-central-list-score-0.svg";

				?>
					<a class="seo-central-page-score svg-wrapper" href="<?php echo esc_url($edit_anchor); ?>">
						<p class="percentage"><?php echo $scoreCount; ?></p>
						<img class="seo-central-page-score-image" src="<?php echo esc_url($image); ?>" alt="Seo Page Column Score">
					</a>
				<?php
			} else {
				$image = $starting_url .  "/seo-central-list-score-0.svg";
				$edit_link = get_edit_post_link($post_id);
				$edit_anchor = $edit_link . '#seo-central'; // Add the anchor
				
				?>
					<a class="seo-central-page-score svg-wrapper" href="<?php echo esc_url($edit_anchor); ?>">
						<p class="percentage">N/A</p>
						<img class="seo-central-page-score-image" src="<?php echo esc_url($image); ?>" alt="Seo Page Column Score">
					</a>
				<?php
			}

		}
	}

	//Add custom columns to track for pages 
	public function wp_read_central_score_column($columns) {
		return array_merge($columns, ['readability-score' => __('Readability score', 'seo-central-lite')]);
	}

	//Create the custom column, utilize the hidden page analysis field to display the proper score
	public function wp_read_central_score_custom_column($column_key, $post_id) {

		if ($column_key == 'readability-score') {
			$scoreflag = get_post_meta($post_id, 'seo_central_flesch_score', 'true');
			if ($scoreflag) {
				echo '<span style="color:green;">'; esc_html_e('Yes', 'seo-central-lite'); echo '</span>';
			} else {
				echo '<span style="color:red;">'; esc_html_e('No', 'seo-central-lite'); echo '</span>';
			}
		}
	}

	//Outgoing Internal URLs tracker
	public function wp_seo_central_outgoing_internal_column($columns) {
		$tooltip_content = esc_html__("External link column: Shows the number of links in this page towards another page", "seo-central-lite");
		$column_title = '<div class="seo-central-tooltip-column">' . esc_html__('Outgoing Internal Links', 'seo-central-lite') . '<div class="seo-central-tooltip-text tooltip-left"><p>' . $tooltip_content . '</p></div></div>';
		return array_merge($columns, ['outgoing-internal-links' => $column_title]);
	}


	//Create the custom column, utilize the hidden page analysis field to display the outgoing internal links
	public function wp_seo_central_outgoing_internal_custom_column($column_key, $post_id) {

		if ($column_key == 'outgoing-internal-links') {
			$internals = get_post_meta($post_id, 'seo_central_outgoing_internals', true);
			if ($internals) {
				echo '<span>'; esc_html__($internals, 'seo-central-lite'); echo '</span>';
			} else {
				echo '<span>'; esc_html__(0, 'seo-central-lite'); echo '</span>';
			}
		}
	}

	//Sort Outgoing Internal Linking 
	public function wp_seo_central_outgoing_internal_custom_sort($columns) {
		$columns['outgoing-internal-links'] = 'outgoing-internal-links';
		return $columns;
	}

	public function wp_seo_central_pre_sort_outgoing_internal($query) {
    if (!is_admin()) {
			return;
		}

		$orderby = $query->get('orderby');
		if ($orderby == 'outgoing-internal-links') {
				$query->set('meta_key', 'seo_central_outgoing_internals');
				$query->set('orderby', 'meta_value_num');
		}
	}

	//Incoming Internal URLs tracker (Premium Feature)
	public function wp_seo_central_incoming_internal_column($columns) {
		$tooltip_content = esc_html__("Internal link column: Shows the number of links pointing to this page", "seo-central-lite");
		$column_title = '<div class="seo-central-tooltip-column">' . esc_html__('Incoming Internal Links', 'seo-central-lite') . '<div class="seo-central-tooltip-text tooltip-left"><p>' . $tooltip_content . '</p></div></div>';
		return array_merge($columns, ['incoming-internal-links' => $column_title]);
	}

	//Create the custom column, display the amount of incoming internal links to the page
	public function wp_seo_central_incoming_internal_custom_column($column_key, $post_id) {

		
		if ($column_key == 'incoming-internal-links') {
			$incoming_internals = $this->seo_central_all_incoming_internals($post_id);
			// $internals = get_post_meta($post_id, 'seo_central_outgoing_internals', true);
			// if ($internals) {
			// 	echo '<span>'; _e($internals, 'textdomain'); echo '</span>';
			// } else {
			// 	echo '<span>'; _e(0, 'textdomain'); echo '</span>';
			// }
			print_r($incoming_internals);
			// echo '<span>'; _e(0, 'textdomain'); echo '</span>';
		}
	}

	//Sort Incoming Internal Linking 
	public function wp_seo_central_incoming_internal_custom_sort($columns) {
		$columns['incoming-internal-links'] = 'incoming-internal-links';
		return $columns;
	}

	public function wp_seo_central_pre_sort_incoming_internal($query) {
    if (!is_admin()) {
			return;
		}

		$orderby = $query->get('orderby');
		if ($orderby == 'incoming-internal-links') {
				$query->set('meta_key', 'seo_central_incoming_internals');
				$query->set('orderby', 'meta_value_num');
		}
	}

	//Set the breadcrumbs on page if toggled on. 
	public function seo_central_get_breadcrumb() {
       
    // Settings
		$breadcrumbs_toggle = get_option('seo_central_setting_breadcrumb');
		$crumbs_separator = get_option('seo_central_setting_crumbseparator');

		//If the value is empty display this as the default
		if($crumbs_separator == '') {
			$crumbs_separator = '»';
		}

		if($breadcrumbs_toggle == 'true') {

			$separator          = esc_html($crumbs_separator);
			$breadcrumbs_id      = 'seo-central-breadcrumbs';
			$breadcrumbs_class   = 'seo-central-breadcrumbs';
			$home_title         = esc_html__('Home', 'seo-central-lite');
				
			// If you have any custom post types with custom taxonomies, put the taxonomy name below (e.g. product_cat)
			$custom_taxonomy    = '';
				 
			// Get the query & post information
			global $post,$wp_query;
				 
			// Do not display on the homepage
			if ( !is_front_page() ) {
				 
				//Set Style 
				echo '<style> #seo-central-breadcrumbs{
					list-style:none;
					margin:10px 0;
					overflow:hidden;
				}
				
				#seo-central-breadcrumbs li{
					display:inline-block;
					vertical-align:middle;
					margin-right:15px;
				}
				
				#seo-central-breadcrumbs .separator{
					font-size:18px;
					font-weight:100;
					color:#ccc;
				}
				
				#seo-central-breadcrumbs .bread-current {
					font-size: 18px !important;
					line-height: 24px !important;
					font-weight: 400;
				}

				#seo-central-breadcrumbs .item-current strong {
					font-size: 18px !important;
					line-height: 24px !important;
					font-weight: 400;
				}
				</style>';
					// Build the breadcrumbs
					echo '<ul id="' . esc_attr($breadcrumbs_id) . '" class="' . esc_attr($breadcrumbs_class) . '">';
						 
					// Home page
					echo '<li class="item-home"><a class="bread-link bread-home" href="' . esc_url(get_home_url()) . '" title="' . esc_attr($home_title) . '">' . $home_title . '</a></li>';
					echo '<li class="separator separator-home"> ' . esc_html($separator) . ' </li>';
						 
					if ( is_archive() && !is_tax() && !is_category() && !is_tag() ) {
								
							echo '<li class="item-current item-archive"><strong class="bread-current bread-archive">' . post_type_archive_title($prefix, false) . '</strong></li>';
								
					} else if ( is_archive() && is_tax() && !is_category() && !is_tag() ) {
								
							// If post is a custom post type
							$post_type = get_post_type();
								
							// If it is a custom post type display name and link
							if($post_type != 'post') {
										
									$post_type_object = get_post_type_object($post_type);
									$post_type_archive = get_post_type_archive_link($post_type);
								
									echo '<li class="item-cat item-custom-post-type-' . esc_attr($post_type) . '"><a class="bread-cat bread-custom-post-type-' . esc_attr($post_type) . '" href="' . esc_url($post_type_archive) . '" title="' . esc_html($post_type_object->labels->name) . '">' . esc_html($post_type_object->labels->name) . '</a></li>';
									echo '<li class="separator"> ' . esc_html($separator) . ' </li>';
								
							}
								
							$custom_tax_name = get_queried_object()->name;
							echo '<li class="item-current item-archive"><strong class="bread-current bread-archive">' . esc_html($custom_tax_name) . '</strong></li>';
								
					} else if ( is_single() ) {
								
							// If post is a custom post type
							$post_type = get_post_type();
								
							// If it is a custom post type display name and link
							if($post_type != 'post') {
										
									$post_type_object = get_post_type_object($post_type);
									$post_type_archive = get_post_type_archive_link($post_type);
								
									echo '<li class="item-cat item-custom-post-type-' . esc_attr($post_type) . '"><a class="bread-cat bread-custom-post-type-' . esc_attr($post_type) . '" href="' . esc_url($post_type_archive) . '" title="' . esc_html($post_type_object->labels->name) . '">' . esc_html($post_type_object->labels->name) . '</a></li>';
									echo '<li class="separator"> ' . esc_html($separator) . ' </li>';
								
							}
								
							// Get post category info
							$category = get_the_category();
							 
							if(!empty($category)) {
								
									// Get last category post is in
									$last_category = end(array_values($category));
										
									// Get parent any categories and create array
									$get_cat_parents = rtrim(get_category_parents($last_category->term_id, true, ','),',');
									$cat_parents = explode(',',$get_cat_parents);
										
									// Loop through parent categories and store in variable $cat_display
									$cat_display = '';
									foreach($cat_parents as $parents) {
											$cat_display .= '<li class="item-cat">'.esc_html($parents).'</li>';
											$cat_display .= '<li class="separator"> ' . esc_html($separator) . ' </li>';
									}
							 
							}
								
							// If it's a custom post type within a custom taxonomy
							$taxonomy_exists = taxonomy_exists($custom_taxonomy);
							if(empty($last_category) && !empty($custom_taxonomy) && $taxonomy_exists) {
										 
									$taxonomy_terms = get_the_terms( $post->ID, $custom_taxonomy );
									$cat_id         = $taxonomy_terms[0]->term_id;
									$cat_nicename   = $taxonomy_terms[0]->slug;
									$cat_link       = get_term_link($taxonomy_terms[0]->term_id, $custom_taxonomy);
									$cat_name       = $taxonomy_terms[0]->name;
								 
							}
								
							// Check if the post is in a category
							if(!empty($last_category)) {
									echo $cat_display;
									echo '<li class="item-current item-' . esc_attr($post->ID) . '"><strong class="bread-current bread-' . esc_attr($post->ID) . '" title="' . esc_html(get_the_title()) . '">' . esc_html(get_the_title()) . '</strong></li>';
										
							// Else if post is in a custom taxonomy
							} else if(!empty($cat_id)) {
										
									echo '<li class="item-cat item-cat-' . esc_attr($cat_id) . ' item-cat-' . esc_attr($cat_nicename) . '"><a class="bread-cat bread-cat-' . esc_attr($cat_id) . ' bread-cat-' . esc_attr($cat_nicename) . '" href="' . esc_url($cat_link) . '" title="' . esc_html($cat_name) . '">' . esc_html($cat_name) . '</a></li>';
									echo '<li class="separator"> ' . esc_html($separator) . ' </li>';
									echo '<li class="item-current item-' . esc_attr($post->ID) . '"><strong class="bread-current bread-' . esc_attr($post->ID) . '" title="' . esc_html(get_the_title()) . '">' . esc_html(get_the_title()) . '</strong></li>';
								
							} else {
										
									echo '<li class="item-current item-' . esc_attr($post->ID) . '"><strong class="bread-current bread-' . esc_attr($post->ID) . '" title="' . esc_html(get_the_title()) . '">' . esc_html(get_the_title()) . '</strong></li>';
										
							}
								
					} else if ( is_category() ) {
								 
							// Category page
							echo '<li class="item-current item-cat"><strong class="bread-current bread-cat">' . esc_html(single_cat_title('', false)) . '</strong></li>';
								 
					} else if ( is_page() ) {
								 
							// Standard page
							if( $post->post_parent ){
										 
									// If child page, get parents 
									$anc = get_post_ancestors( $post->ID );
										 
									// Get parents in the right order
									$anc = array_reverse($anc);
										 
									// Parent page loop
									if ( !isset( $parents ) ) $parents = null;
									foreach ( $anc as $ancestor ) {
											$parents .= '<li class="item-parent item-parent-' . esc_attr($ancestor) . '"><a class="bread-parent bread-parent-' . esc_attr($ancestor) . '" href="' . esc_url(get_permalink($ancestor)) . '" title="' . esc_html(get_the_title($ancestor)) . '">' . esc_html(get_the_title($ancestor)) . '</a></li>';
											$parents .= '<li class="separator separator-' . esc_attr($ancestor) . '"> ' . esc_html($separator) . ' </li>';
									}
										 
									// Display parent pages
									echo $parents;
										 
									// Current page
									echo '<li class="item-current item-' . esc_attr($post->ID) . '"><strong title="' . esc_html(get_the_title()) . '"> ' . esc_html(get_the_title()) . '</strong></li>';
										 
							} else {
										 
									// Just display current page if not parents
									echo '<li class="item-current item-' . esc_attr($post->ID) . '"><strong class="bread-current bread-' . esc_attr($post->ID) . '"> ' . esc_html(get_the_title()) . '</strong></li>';
										 
							}
								 
					} else if ( is_tag() ) {
								 
							// Tag page
								 
							// Get tag information
							$term_id        = get_query_var('tag_id'); //Set tags to pass through
							$taxonomy       = 'post_tag';
							$args           = 'include=' . $term_id;
							$terms          = get_terms( $taxonomy, $args );
							$get_term_id    = $terms[0]->term_id;
							$get_term_slug  = $terms[0]->slug;
							$get_term_name  = $terms[0]->name;
								 
							// Display the tag name
							echo '<li class="item-current item-tag-' . esc_attr($get_term_id) . ' item-tag-' . esc_attr($get_term_slug) . '"><strong class="bread-current bread-tag-' . esc_attr($get_term_id) . ' bread-tag-' . esc_attr($get_term_slug) . '">' . esc_html($get_term_name) . '</strong></li>';
						 
					} elseif ( is_day() ) {
								 
							// Day archive
								 
							// Year link
							echo '<li class="item-year item-year-' . esc_attr(get_the_time('Y')) . '"><a class="bread-year bread-year-' . esc_attr(get_the_time('Y')) . '" href="' . esc_url(get_year_link(get_the_time('Y'))) . '" title="' . esc_attr(get_the_time('Y')) . '">' . esc_html(get_the_time('Y')) . ' Archives</a></li>';
							echo '<li class="separator separator-' . esc_attr(get_the_time('Y')) . '"> ' . esc_html($separator) . ' </li>';
								 
							// Month link
							echo '<li class="item-month item-month-' . esc_attr(get_the_time('m')) . '"><a class="bread-month bread-month-' . esc_attr(get_the_time('m')) . '" href="' . esc_url(get_month_link(get_the_time('Y'), get_the_time('m'))) . '" title="' . esc_attr(get_the_time('M')) . '">' . esc_html(get_the_time('M')) . ' Archives</a></li>';
							echo '<li class="separator separator-' . esc_attr(get_the_time('m')) . '"> ' . esc_html($separator) . ' </li>';
								 
							// Day display
							echo '<li class="item-current item-' . esc_attr(get_the_time('j')) . '"><strong class="bread-current bread-' . esc_attr(get_the_time('j')) . '"> ' . esc_html(get_the_time('jS')) . ' ' . esc_html(get_the_time('M')) . ' Archives</strong></li>';
								 
					} else if ( is_month() ) {
								 
							// Month Archive
								 
							// Year link
							echo '<li class="item-year item-year-' . esc_attr(get_the_time('Y')) . '"><a class="bread-year bread-year-' . esc_attr(get_the_time('Y')) . '" href="' . esc_url(get_year_link(get_the_time('Y'))) . '" title="' . esc_attr(get_the_time('Y')) . '">' . esc_html(get_the_time('Y')) . ' Archives</a></li>';
							echo '<li class="separator separator-' . esc_attr(get_the_time('Y')) . '"> ' . esc_html($separator) . ' </li>';
								 
							// Month display
							echo '<li class="item-month item-month-' . esc_attr(get_the_time('m')) . '"><strong class="bread-month bread-month-' . esc_attr(get_the_time('m')) . '" title="' . esc_html(get_the_time('M')) . '">' . esc_html(get_the_time('M')) . ' Archives</strong></li>';
								 
					} else if ( is_year() ) {
								 
							// Display year archive
							echo '<li class="item-current item-current-' . esc_attr(get_the_time('Y')) . '"><strong class="bread-current bread-current-' . esc_attr(get_the_time('Y')) . '" title="' . esc_html(get_the_time('Y')) . '">' . esc_html(get_the_time('Y')) . ' Archives</strong></li>';
								 
					} else if ( is_author() ) {
								 
							// Auhor archive
								 
							// Get the author information
							global $author;
							$userdata = get_userdata( $author );
								 
							// Display author name
							echo '<li class="item-current item-current-' . esc_attr($userdata->user_nicename) . '"><strong class="bread-current bread-current-' . esc_attr($userdata->user_nicename) . '" title="' . esc_html($userdata->display_name) . '">' . esc_html('Author: ' . $userdata->display_name) . '</strong></li>';
						 
					} else if ( get_query_var('paged') ) {
								 
							// Paginated archives
							echo '<li class="item-current item-current-' . esc_attr(get_query_var('paged')) . '"><strong class="bread-current bread-current-' . esc_attr(get_query_var('paged')) . '" title="' . __('Page') . ' ' . esc_html(get_query_var('paged')) . '">' . __('Page') . ' ' . esc_html(get_query_var('paged')) . '</strong></li>';
								 
					} else if ( is_search() ) {
						 
							// Search results page
							echo '<li class="item-current item-current-search"><strong class="bread-current bread-current-search" title="' . esc_attr__('Search results for: ', 'your-theme-textdomain') . esc_html(get_search_query()) . '">' . esc_html__('Search results for: ', 'your-theme-textdomain') . esc_html(get_search_query()) . '</strong></li>';
						 
					} elseif ( is_404() ) {
								 
							// 404 page
							echo '<li>' . esc_html('Error 404') . '</li>';
					}
				 
					echo '</ul>';
						 
			}
		}
     
		//return 'Breadcrumbs!';
	}

	/**
	 * Custom database crawl for internal linking
	 * Get all internal links that lead to a specific page.
	 *
	 * @param int $page_id The ID of the target page.
	 * @return array An array of internal link URLs.
	*/
	public function seo_central_all_incoming_internals($page_id) {
		global $wpdb;

		$post_ID = $page_id;
		$target_page_url = get_permalink($page_id);
		$front_page_id = get_option('page_on_front');

		if($page_id == $front_page_id) {
			$page_slug = get_post_field( 'post_name', $post_ID );

			//This query gets all the pages pointing to this page
			$query = "
				SELECT
					p.*,
					pm.meta_key,
					pm.meta_value
				FROM
					{$wpdb->posts} p
					LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
					-- WHERE p.post_type IN ('post', 'page')
				WHERE
					p.ID != $post_ID
					AND p.post_status = 'publish'
					AND (meta_value LIKE '%\"$target_page_url\"%' OR meta_value LIKE '%\"/\"%')
				ORDER BY
					p.ID,
					pm.meta_key
			";
		}
		else {
			$page_slug = get_post_field( 'post_name', $post_ID );
			//This query gets all the pages pointing to this page
			if($page_slug) {
				$query = "
					SELECT
						p.*,
						pm.meta_key,
						pm.meta_value
					FROM
						{$wpdb->posts} p
						LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
						-- WHERE p.post_type IN ('post', 'page')
					WHERE
						p.ID != $post_ID
						AND p.post_status = 'publish'
						AND (meta_value LIKE '%\"$target_page_url\"%' OR meta_value LIKE '%$page_slug%')
					ORDER BY
						p.ID,
						pm.meta_key
				";
			}
			else {
				$query = "
				SELECT
					p.*,
					pm.meta_key,
					pm.meta_value
				FROM
					{$wpdb->posts} p
					LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
					-- WHERE p.post_type IN ('post', 'page')
				WHERE
					p.ID != $post_ID
					AND p.post_status = 'publish'
					AND (meta_value LIKE '%\"$target_page_url\"%')
				ORDER BY
					p.ID,
					pm.meta_key
				";
			}
		}
		
		$results = $wpdb->get_results($query);

		if($results) {
			//count($results)
			$count = $results ? count($results) : 0;

			// Save the count into post meta
			update_post_meta($page_id, 'seo_central_incoming_internals', $count);
			return count($results);
		}
		else {
			update_post_meta($page_id, 'seo_central_incoming_internals', 0);
			return 0;
		}
	}

	public function seo_central_update_internals_count($post_ID, $post, $update) {
    // Check if we're in the middle of a save process, or if this is an autosave or a revision.
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE || wp_is_post_revision($post_ID) || wp_is_post_autosave($post_ID)) {
        return;
    }

    // Call your function to update the count
    $this->seo_central_all_incoming_internals($post_ID);
	}
}
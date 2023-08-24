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

		$this->seo_central_sitemap();

		//Register the redirects database table
		// register_activation_hook(plugin_dir_path( dirname( __FILE__ ) ), [$this,'create_redirect_table']);

		// register_activation_hook(plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-seo-central.php', [$this,'create_redirect_table']);
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

		
		//Set the action to actually redirect the old urls with the new
		add_action('template_redirect', [$this,'seo_central_custom_redirect']);
		
		//Disable the default wordpress robots
		add_filter( 'wp_robots', [$this,'remove_default_wp_robots'] );

		//Trigger all the filters and column setup for ALL post types
		add_action('init', [$this, 'define_post_type_hooks']);

		// Additional hooks that apply to all post types (These triggers should be set outside of the loop of posts)
		add_action('init', [$this,'wp_register_cornerstone']);
		add_action('parse_query', [$this,'wp_map_cornerstone']);
		add_action('init', [$this,'wp_register_orphaned']);
		add_action('parse_query', [$this,'wp_map_orphaned']);
		add_action('save_post', [$this, 'update_internals_count'], 10, 3);
		add_action('pre_get_posts', [$this, 'wp_seo_pre_sort_outgoing_internal']);
		add_action('pre_get_posts', [$this, 'wp_seo_pre_sort_incoming_internal']);
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
		// add_shortcode('seo_central_breadcrumbs', [$this,'get_breadcrumb']);
		add_shortcode( 'seo_central_breadcrumbs', array( $this, 'get_breadcrumb' ));

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
			
			// Register the Cornerstone Page filter Add, Register, and Map the filter
			add_filter("views_edit-$post_type", [$this,'wp_add_cornerstone_filter']);
			add_filter("views_edit-$post_type", [$this,'wp_add_orphaned_filter']); 

			// Additional Columns for page listing (Seo Score, Internal, External links)
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_score_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_score_custom_column'], 10, 2);
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_outgoing_internal_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_outgoing_internal_custom_column'], 10, 2);
			add_filter("manage_edit-{$post_type}_sortable_columns", [$this,'wp_seo_outgoing_internal_custom_sort']);
			add_filter("manage_{$post_type}_posts_columns", [$this,'wp_seo_incoming_internal_column']);
			add_action("manage_{$post_type}_posts_custom_column", [$this,'wp_seo_incoming_internal_custom_column'], 10, 2);
			add_filter("manage_edit-{$post_type}_sortable_columns", [$this,'wp_seo_incoming_internal_custom_sort']);
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
			$seo_central_sitemaps->init();
  
      /**
       * Fires when initializing the Sitemaps object.
       *
       * Additional sitemaps should be registered on this hook.
       *
       * @since 5.5.0
       *
       * @param Seo_Central_Sitemaps $seo_central_sitemaps Sitemaps object.
       */
      do_action( 'after_setup_theme', $seo_central_sitemaps->init() );
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

	//Add the cornerstone Filter for the pages list
	public function wp_add_cornerstone_filter($views) {
		
		//If within the admin set the filter
		if( ( is_admin() ) ) {
			global $wpdb, $typenow;

			//Set the post type using typenow. These are checks to make sure it comes back correctly
			if ( empty( $typenow ) && !empty( $_GET['post_type'] ) ) {
				$typenow = sanitize_text_field( $_GET['post_type'] );
			}
			elseif ( empty( $typenow ) && !empty( $wp_query->query_vars['post_type'] ) ) {
					$typenow = sanitize_text_field( $wp_query->query_vars['post_type'] );
			}
			$post_type = $typenow;

			// Handle the class applied to the link filter.
			$link_class = '';
			if ( isset( $_GET['seo_central_filter'] ) && 'cornerstone' === $_GET['seo_central_filter'] ) {
					$link_class = 'current'; //if on the current filter
			}

			//Possible filter by user
			// $current_user = wp_get_current_user();

			$query = array(
				'post_type'   => $post_type,
				'orderby'     => 'date',
				'order'       => 'DESC',
				'meta_query' => array(
						array(
								'key' => 'seo_central_meta_cornerstone',
								'value' => 'cornerstone',
								'compare' => '=',
						),
				)
		);

			//Query the results for the cornerstone pages and count. 
			$result = new WP_Query($query);
			$class = ' class="seo-central-pillars' . ' ' . $link_class . '" ';

			//Set the quick link with the proper page list filter for cornerstone content. 
			$views['cornerstone'] = sprintf(__('<a href="%s"'. $class .'>'. 'cornerstone' .' <span class="count">(%d)</span></a>', 'cornerstone'), admin_url('edit.php?seo_central_filter=cornerstone&post_type=' . $post_type), $result->found_posts);

			// Restore original Post Data.
			wp_reset_postdata();
			wp_reset_query();

			return $views;
    }
	}

	//Register the cornerstone filter
	public function wp_register_cornerstone() {
    global $wp;
    $wp->add_query_var( 'seo_central_filter' );
	}
	
	//After registering filter, map the list using the seo_central_filter if it is equal to cornerstone
	public function wp_map_cornerstone( $wp_query ) {

		//Do not re-query is another filter is set (this keeps the query and count correct)
		if ( ! is_admin() || ! $wp_query->is_main_query() ) {
			return;
		}

    $meta_value = $wp_query->get( 'seo_central_filter' );

    if ( 'cornerstone' == $meta_value ) {
			$wp_query->set( 'meta_key', 'seo_central_meta_cornerstone' );
			$wp_query->set( 'meta_value', $meta_value );
    }
	}


	//Add custom columns to track for pages 
	public function wp_seo_score_column($columns) {
		return array_merge($columns, ['seo-score' => __('Central Score', 'textdomain')]);
	}

	//Create the custom column, utilize the hidden page analysis field to display the proper score
	public function wp_seo_score_custom_column($column_key, $post_id) {

		if ($column_key == 'seo-score') {
			$scoreCount = get_post_meta($post_id, 'seo_central_page_score', 'true');
			$starting_url = "/wp-content/plugins/seo-central/admin/icons";

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
	public function wp_read_score_column($columns) {
		return array_merge($columns, ['readability-score' => __('Readability score', 'textdomain')]);
	}

	//Create the custom column, utilize the hidden page analysis field to display the proper score
	public function wp_read_score_custom_column($column_key, $post_id) {

		if ($column_key == 'readability-score') {
			$scoreflag = get_post_meta($post_id, 'seo_central_flesch_score', 'true');
			if ($scoreflag) {
				echo '<span style="color:green;">'; _e('Yes', 'textdomain'); echo '</span>';
			} else {
				echo '<span style="color:red;">'; _e('No', 'textdomain'); echo '</span>';
			}
		}
	}

	//Outgoing Internal URLs tracker
	public function wp_seo_outgoing_internal_column($columns) {
		$tooltip_content = __("External link column: Shows the number of links in this page towards another page", "textdomain");
		$column_title = '<div class="seo-central-tooltip-column">' . __('Outgoing Internal Links', 'textdomain') . '<div class="seo-central-tooltip-text tooltip-left"><p>' . $tooltip_content . '</p></div></div>';
		return array_merge($columns, ['outgoing-internal-links' => $column_title]);
	}


	//Create the custom column, utilize the hidden page analysis field to display the outgoing internal links
	public function wp_seo_outgoing_internal_custom_column($column_key, $post_id) {

		if ($column_key == 'outgoing-internal-links') {
			$internals = get_post_meta($post_id, 'seo_central_outgoing_internals', true);
			if ($internals) {
				echo '<span>'; _e($internals, 'textdomain'); echo '</span>';
			} else {
				echo '<span>'; _e(0, 'textdomain'); echo '</span>';
			}
		}
	}

	//Sort Outgoing Internal Linking 
	public function wp_seo_outgoing_internal_custom_sort($columns) {
		$columns['outgoing-internal-links'] = 'outgoing-internal-links';
		return $columns;
	}

	public function wp_seo_pre_sort_outgoing_internal($query) {
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
	public function wp_seo_incoming_internal_column($columns) {
		$tooltip_content = __("Internal link column: Shows the number of links pointing to this page", "textdomain");
		$column_title = '<div class="seo-central-tooltip-column">' . __('Incoming Internal Links', 'textdomain') . '<div class="seo-central-tooltip-text tooltip-left"><p>' . $tooltip_content . '</p></div></div>';
		return array_merge($columns, ['incoming-internal-links' => $column_title]);
	}

	//Create the custom column, display the amount of incoming internal links to the page
	public function wp_seo_incoming_internal_custom_column($column_key, $post_id) {

		
		if ($column_key == 'incoming-internal-links') {
			$incoming_internals = $this->all_incoming_internals($post_id);
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
	public function wp_seo_incoming_internal_custom_sort($columns) {
		$columns['incoming-internal-links'] = 'incoming-internal-links';
		return $columns;
	}

	public function wp_seo_pre_sort_incoming_internal($query) {
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
	public function get_breadcrumb() {
       
    // Settings
		$breadcrumbs_toggle = get_option('seo_central_setting_breadcrumb');
		$crumbs_separator = get_option('seo_central_setting_crumbseparator');

		//If the value is empty display this as the default
		if($crumbs_separator == '') {
			$crumbs_separator = '»';
		}

		if($breadcrumbs_toggle == 'true') {

			$separator          = $crumbs_separator;
			$breadcrumbs_id      = 'seo-central-breadcrumbs';
			$breadcrumbs_class   = 'seo-central-breadcrumbs';
			$home_title         = 'Home';
				
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
					echo '<ul id="' . $breadcrumbs_id . '" class="' . $breadcrumbs_class . '">';
						 
					// Home page
					echo '<li class="item-home"><a class="bread-link bread-home" href="' . get_home_url() . '" title="' . $home_title . '">' . $home_title . '</a></li>';
					echo '<li class="separator separator-home"> ' . $separator . ' </li>';
						 
					if ( is_archive() && !is_tax() && !is_category() && !is_tag() ) {
								
							echo '<li class="item-current item-archive"><strong class="bread-current bread-archive">' . post_type_archive_title($prefix, false) . '</strong></li>';
								
					} else if ( is_archive() && is_tax() && !is_category() && !is_tag() ) {
								
							// If post is a custom post type
							$post_type = get_post_type();
								
							// If it is a custom post type display name and link
							if($post_type != 'post') {
										
									$post_type_object = get_post_type_object($post_type);
									$post_type_archive = get_post_type_archive_link($post_type);
								
									echo '<li class="item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="' . $post_type_archive . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';
									echo '<li class="separator"> ' . $separator . ' </li>';
								
							}
								
							$custom_tax_name = get_queried_object()->name;
							echo '<li class="item-current item-archive"><strong class="bread-current bread-archive">' . $custom_tax_name . '</strong></li>';
								
					} else if ( is_single() ) {
								
							// If post is a custom post type
							$post_type = get_post_type();
								
							// If it is a custom post type display name and link
							if($post_type != 'post') {
										
									$post_type_object = get_post_type_object($post_type);
									$post_type_archive = get_post_type_archive_link($post_type);
								
									echo '<li class="item-cat item-custom-post-type-' . $post_type . '"><a class="bread-cat bread-custom-post-type-' . $post_type . '" href="' . $post_type_archive . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';
									echo '<li class="separator"> ' . $separator . ' </li>';
								
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
											$cat_display .= '<li class="item-cat">'.$parents.'</li>';
											$cat_display .= '<li class="separator"> ' . $separator . ' </li>';
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
									echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
										
							// Else if post is in a custom taxonomy
							} else if(!empty($cat_id)) {
										
									echo '<li class="item-cat item-cat-' . $cat_id . ' item-cat-' . $cat_nicename . '"><a class="bread-cat bread-cat-' . $cat_id . ' bread-cat-' . $cat_nicename . '" href="' . $cat_link . '" title="' . $cat_name . '">' . $cat_name . '</a></li>';
									echo '<li class="separator"> ' . $separator . ' </li>';
									echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
								
							} else {
										
									echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '" title="' . get_the_title() . '">' . get_the_title() . '</strong></li>';
										
							}
								
					} else if ( is_category() ) {
								 
							// Category page
							echo '<li class="item-current item-cat"><strong class="bread-current bread-cat">' . single_cat_title('', false) . '</strong></li>';
								 
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
											$parents .= '<li class="item-parent item-parent-' . $ancestor . '"><a class="bread-parent bread-parent-' . $ancestor . '" href="' . get_permalink($ancestor) . '" title="' . get_the_title($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
											$parents .= '<li class="separator separator-' . $ancestor . '"> ' . $separator . ' </li>';
									}
										 
									// Display parent pages
									echo $parents;
										 
									// Current page
									echo '<li class="item-current item-' . $post->ID . '"><strong title="' . get_the_title() . '"> ' . get_the_title() . '</strong></li>';
										 
							} else {
										 
									// Just display current page if not parents
									echo '<li class="item-current item-' . $post->ID . '"><strong class="bread-current bread-' . $post->ID . '"> ' . get_the_title() . '</strong></li>';
										 
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
							echo '<li class="item-current item-tag-' . $get_term_id . ' item-tag-' . $get_term_slug . '"><strong class="bread-current bread-tag-' . $get_term_id . ' bread-tag-' . $get_term_slug . '">' . $get_term_name . '</strong></li>';
						 
					} elseif ( is_day() ) {
								 
							// Day archive
								 
							// Year link
							echo '<li class="item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></li>';
							echo '<li class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </li>';
								 
							// Month link
							echo '<li class="item-month item-month-' . get_the_time('m') . '"><a class="bread-month bread-month-' . get_the_time('m') . '" href="' . get_month_link( get_the_time('Y'), get_the_time('m') ) . '" title="' . get_the_time('M') . '">' . get_the_time('M') . ' Archives</a></li>';
							echo '<li class="separator separator-' . get_the_time('m') . '"> ' . $separator . ' </li>';
								 
							// Day display
							echo '<li class="item-current item-' . get_the_time('j') . '"><strong class="bread-current bread-' . get_the_time('j') . '"> ' . get_the_time('jS') . ' ' . get_the_time('M') . ' Archives</strong></li>';
								 
					} else if ( is_month() ) {
								 
							// Month Archive
								 
							// Year link
							echo '<li class="item-year item-year-' . get_the_time('Y') . '"><a class="bread-year bread-year-' . get_the_time('Y') . '" href="' . get_year_link( get_the_time('Y') ) . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</a></li>';
							echo '<li class="separator separator-' . get_the_time('Y') . '"> ' . $separator . ' </li>';
								 
							// Month display
							echo '<li class="item-month item-month-' . get_the_time('m') . '"><strong class="bread-month bread-month-' . get_the_time('m') . '" title="' . get_the_time('M') . '">' . get_the_time('M') . ' Archives</strong></li>';
								 
					} else if ( is_year() ) {
								 
							// Display year archive
							echo '<li class="item-current item-current-' . get_the_time('Y') . '"><strong class="bread-current bread-current-' . get_the_time('Y') . '" title="' . get_the_time('Y') . '">' . get_the_time('Y') . ' Archives</strong></li>';
								 
					} else if ( is_author() ) {
								 
							// Auhor archive
								 
							// Get the author information
							global $author;
							$userdata = get_userdata( $author );
								 
							// Display author name
							echo '<li class="item-current item-current-' . $userdata->user_nicename . '"><strong class="bread-current bread-current-' . $userdata->user_nicename . '" title="' . $userdata->display_name . '">' . 'Author: ' . $userdata->display_name . '</strong></li>';
						 
					} else if ( get_query_var('paged') ) {
								 
							// Paginated archives
							echo '<li class="item-current item-current-' . get_query_var('paged') . '"><strong class="bread-current bread-current-' . get_query_var('paged') . '" title="Page ' . get_query_var('paged') . '">'.__('Page') . ' ' . get_query_var('paged') . '</strong></li>';
								 
					} else if ( is_search() ) {
						 
							// Search results page
							echo '<li class="item-current item-current-' . get_search_query() . '"><strong class="bread-current bread-current-' . get_search_query() . '" title="Search results for: ' . get_search_query() . '">Search results for: ' . get_search_query() . '</strong></li>';
						 
					} elseif ( is_404() ) {
								 
							// 404 page
							echo '<li>' . 'Error 404' . '</li>';
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
	public function all_incoming_internals($page_id) {
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

	public function update_internals_count($post_ID, $post, $update) {
    // Check if we're in the middle of a save process, or if this is an autosave or a revision.
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE || wp_is_post_revision($post_ID) || wp_is_post_autosave($post_ID)) {
        return;
    }

    // Call your function to update the count
    $this->all_incoming_internals($post_ID);
	}

	//Add the cornerstone Filter for the pages list
	public function wp_add_orphaned_filter($views) {
    if (is_admin()) {
        global $wpdb, $typenow;

        // Set the post type using typenow. These are checks to make sure it comes back correctly
        if (empty($typenow) && !empty($_GET['post_type'])) {
					$typenow = sanitize_text_field($_GET['post_type']);
				} elseif (empty($typenow) && !empty($wp_query->query_vars['post_type'])) {
						$typenow = sanitize_text_field($wp_query->query_vars['post_type']);
				}
				$post_type = $typenow;

        $link_class = '';
        if (isset($_GET['seo_central_filter']) && 'orphaned' === $_GET['seo_central_filter']) {
            $link_class = 'current'; //if on the current filter
        }

        // Query to get pages with 0 internals_count (orphaned pages)
				$args = array(
					'post_type'   => $post_type,
					'fields'      => 'ids',
					'meta_query'  => array(
							'relation' => 'OR',
							array(
									'key'     => 'seo_central_incoming_internals',
									'value'   => 0,
									'compare' => '=',
							),
							array(
									'key'     => 'seo_central_incoming_internals',
									'compare' => 'NOT EXISTS', // Works with WP 3.9+
							),
					),
				);
				$orphan_query = new WP_Query($args);
				$orphaned_ids = $orphan_query->posts; // Array of post IDs

        $class = ' class="seo-central-pillars' . ' ' . $link_class . '" ';
				$views['orphaned'] = sprintf(__('<a href="%s"'. $class .'>'. 'Orphaned' .' <span class="count">(%d)</span></a>', 'orphaned'), admin_url('edit.php?seo_central_filter=orphaned&post_type=' . $post_type), count($orphaned_ids));

				// Restore original Post Data.
				wp_reset_postdata();
				wp_reset_query();

        return $views;
    }
	}

	public function wp_register_orphaned() {
    global $wp;
    $wp->add_query_var('seo_central_filter');
	}

	public function wp_map_orphaned($query) {

		//Do not re-query is another filter is set (this keeps the query and count correct)
    if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}

		$meta_value = $query->get( 'seo_central_filter' );

			if (is_admin() && isset($_GET['seo_central_filter'])) {
					if ($_GET['seo_central_filter'] === 'orphaned') {
							$query->query_vars['meta_key'] = 'seo_central_incoming_internals';
							$query->query_vars['meta_value'] = '0';
							$query->query_vars['meta_compare'] = '=';
					}
			}
	}

	/*
	* My Custom Redirect will load prior to template page loading and will apply the redirect from the table
	*/
	public function seo_central_custom_redirect() {
    global $wp;
    global $wpdb;
    $table_name = $wpdb->prefix . "_custom_redirects"; 

    // Here we get the current URL the user is visiting
    // $current_url = home_url(add_query_arg(array(), $wp->request)) . '/';
		$current_url = trailingslashit(home_url(add_query_arg(array(), $wp->request)));

    // Extract the path which is usually the page slug
    $current_path = parse_url($current_url, PHP_URL_PATH);
		$current_path = trailingslashit($current_path);

    // Get all redirects from the seoc__custom_redirects
    $redirects = $wpdb->get_results("SELECT * FROM $table_name");

    // Loop through each redirect
    foreach($redirects as $redirect) {
        // If the current URL matches the old URL of this redirect...
				$old_url = trailingslashit($redirect->old_url);

        // Extract the path from old_url
        $old_path = parse_url($redirect->old_url, PHP_URL_PATH);
				$old_path = trailingslashit($old_path);

        if ($current_url == $old_url) {
            // ...perform the redirect
            wp_redirect($redirect->new_url, $redirect->redirect_type);
            exit;
        }
				else if ($current_path == $old_path) {
					// ...perform the redirect
					wp_redirect($redirect->new_url, $redirect->redirect_type);
					exit;
				}
    }
	}
}
<?php
require_once(__DIR__.'/class-seo-central-sitemaps-registry.php');
require_once(__DIR__.'/class-seo-central-sitemaps-renderer.php');
require_once(__DIR__.'/class-seo-central-sitemaps-index.php');
require_once(__DIR__.'/class-seo-central-sitemaps-stylesheet.php');

require_once(__DIR__.'/providers/class-seo-central-sitemaps-posts.php');
require_once(__DIR__.'/providers/class-seo-central-sitemaps-taxonomies.php');
require_once(__DIR__.'/providers/class-seo-central-sitemaps-users.php');
/**
 * Sitemaps: Seo_Central_Sitemaps class
 *
 * This is the main class integrating all other classes.
 *
 */

class Seo_Central_Sitemaps {

	/**
	 * The main index of supported sitemaps.
	 *
	 * @since 1.0.0
	 *
	 * @var Seo_Central_Sitemaps_Index
	 */
	public $index;

	/**
	 * The main registry of supported sitemaps.
	 *
	 * @since 1.0.0
	 *
	 * @var Seo_Central_Sitemaps_Registry
	 */
	public $registry;

	/**
	 * An instance of the renderer class.
	 *
	 * @since 5.5.0
	 *
	 * @var Seo_Central_Sitemaps_Renderer
	 */
	public $renderer;

	/**
	 * Retrieve the options from settings. Check if sitemap is enabled
	 *
	 */
	private $options;

	/**
	 * Set Redirect Url to new sitemap route. 
	 *
	 */
	private $redirect;

	/**
	 * Seo_Central_Sitemaps constructor.
	 *
	 * @since 5.5.0
	 */
	public function __construct() {
		$this->registry = new Seo_Central_Sitemaps_Registry();
		$this->renderer = new Seo_Central_Sitemaps_Renderer();
		$this->index    = new Seo_Central_Sitemaps_Index( $this->registry );

		//Set up the redirects for the new sitemap
		add_action( 'init', array( $this, 're_register_rewrites' ) );
		add_filter( 'home_url', array( $this, 'fix_wp_sitemap_url' ), 11, 2 );
	}

	/**
	 * Initiates all sitemap functionality.
	 *
	 * If sitemaps are disabled, only the rewrite rules will be registered
	 * by this method, in order to properly send 404s.
	 *
	 * @since 5.5.0
	 */
	public function init() {
		// Disable the wp-sitem@ps.xml and redirect to the new sitemap (seo-sitemap.xml)
    add_filter( 'wp_sitemaps_enabled', '__return_false' );
		//add_filter( 'seo_central_sitemaps_enabled', '__return_true' );
		
		add_action( 'template_redirect', array( $this, 'render_new_sitemaps' ) );

		// add_action( 'init', array( $this, 're_register_rewrites' ) );
		// add_filter( 'home_url', array( $this, 'fix_wp_sitemap_url' ), 11, 2 );
    // $this->register_rewrites();

		$this->register_sitemaps();

		// Add additional action callbacks.
		// add_filter( 'pre_handle_404', array( $this, 'redirect_sitemapxml' ), 10, 2 );
		// add_filter( 'robots_txt', array( $this, 'add_robots' ), 0, 2 );
	}

	/**
	 * Registers and sets up the functionality for all supported sitemaps.
	 *
	 * @since 5.5.0
	 */
	public function register_sitemaps() {
		$providers = array(
			'posts'      => new Seo_Central_Sitemaps_Posts(),
			'taxonomies' => new Seo_Central_Sitemaps_Taxonomies(),
			'users'      => new Seo_Central_Sitemaps_Users(),
		);

		/* @var WP_Sitemaps_Provider $provider */
		foreach ( $providers as $name => $provider ) {
			$this->registry->add_provider( $name, $provider );
		}
	}

	/**
	 * Base Function for Rendering.
	 * Renders sitemap templates based on rewrite rules.
	 *
	 * @since 5.5.0
	 *
	 * @global WP_Query $wp_query WordPress Query object.
	 */
	public function render_new_sitemaps() {
		global $wp_query, $wp;

		//$this->re_register_rewrites();
		
		$sitemap         = sanitize_text_field( get_query_var( 'sitemap' ) );
		$object_subtype  = sanitize_text_field( get_query_var( 'sitemap-subtype' ) );
		$stylesheet_type = sanitize_text_field( get_query_var( 'sitemap-stylesheet' ) );
		$paged           = absint( get_query_var( 'paged' ) );
		
		// Bail early if this isn't a sitemap or stylesheet route.
		if ( ! ( $sitemap || $stylesheet_type ) ) {
			return;
		}
		
		// if ( ! $this->sitemaps_enabled() ) {
			// 	$wp_query->set_404();
			// 	status_header( 404 );
			// 	return;
			// }
			
			// Render stylesheet if this is stylesheet route.
			if ( $stylesheet_type ) {
				$stylesheet = new Seo_Central_Sitemaps_Stylesheet();
				
				$stylesheet->render_stylesheet( $stylesheet_type );
				exit;
			}
			
			// Render the index.
			if ( 'index' === $sitemap ) {
				$sitemap_list = $this->index->get_sitemap_list();
				
				//$this->new_sitemap_template();
				$this->renderer->render_index( $sitemap_list );
				exit;
			}

		$provider = $this->registry->get_provider( $sitemap );

		if ( ! $provider ) {
			return;
		}

		if ( empty( $paged ) ) {
			$paged = 1;
		}

		$url_list = $provider->get_url_list( $paged, $object_subtype );

		// Force a 404 and bail early if no URLs are present.
		if ( empty( $url_list ) ) {
			$wp_query->set_404();
			status_header( 404 );
			return;
		}

		$this->renderer->render_sitemap( $url_list );
		exit;
	}

	public function re_register_rewrites() {

		global $wp_query, $wp;

		$wp->add_query_var( 'sitemap' );
		$wp->add_query_var( 'sitemap-subtype' );
		$wp->add_query_var( 'sitemap-stylesheet' );

		// Add rewrite tags.
		add_rewrite_tag( '%sitemap%', '([^?]+)' );
		add_rewrite_tag( '%sitemap-subtype%', '([^?]+)' );

		// Register index route.
		add_rewrite_rule( '^central-sitemap\.xml$', 'index.php?sitemap=index', 'top' );

		// Register rewrites for the XSL stylesheet.
		add_rewrite_tag( '%sitemap-stylesheet%', '([^?]+)' );
		add_rewrite_rule( '^central-sitemap\.xsl$', 'index.php?sitemap-stylesheet=sitemap', 'top' );
		add_rewrite_rule( '^central-sitemap-index\.xsl$', 'index.php?sitemap-stylesheet=index', 'top' );

		// Register routes for providers.
		add_rewrite_rule(
			'^central-sitemap-([a-z]+?)-([a-z\d_-]+?)-(\d+?)\.xml$',
			'index.php?sitemap=$matches[1]&sitemap-subtype=$matches[2]&paged=$matches[3]',
			'top'
		);
		add_rewrite_rule(
			'^central-sitemap-([a-z]+?)-(\d+?)\.xml$',
			'index.php?sitemap=$matches[1]&paged=$matches[2]',
			'top'
		);
	}

	/**
	 * Redirects a URL to the seo-sitemap.xml
	 *
	 * @since 5.5.0
	 *
	 * @param bool     $bypass Pass-through of the pre_handle_404 filter value.
	 * @param WP_Query $query  The WP_Query object.
	 * @return bool Bypass value.
	 */
	public function redirect_sitemapxml( $bypass, $query ) {
		// If a plugin has already utilized the pre_handle_404 function, return without action to avoid conflicts.
		if ( $bypass ) {
			return $bypass;
		}

		// 'pagename' is for most permalink types, name is for when the %postname% is used as a top-level field.
		if ( 'sitemap-xml' === $query->get( 'pagename' )
			|| 'sitemap-xml' === $query->get( 'name' )
		) {
			wp_safe_redirect( $this->index->get_index_url() );
			exit();
		}

		return $bypass;
	}

  //If the sitemap option is toggled on then Disable the wp-sitemaps.xml and replace it with seo-central-sitemap. 
  public function route_sitemaps() {
    if(get_option('seo_central_setting_bool') == true){
      \apply_filters( 'wp_sitemaps_enabled', '__return_false' ); //disable the base wordpress sitemap /wp-sitemap.xml

      \add_action( 'new_sitemap_template', [ $this, 'new_sitemap_template' ], 0 ); //Set new sitemap template
    }
  }
  
  /**
   * Wraps wp_safe_redirect to allow testing for safe redirects.
   *
   * @codeCoverageIgnore It only wraps a WordPress function.
   *
   * @param string $location The path to redirect to.
   * @param int    $status   The status code to use.
   * @param string $reason   The reason for the redirect.
   */
  public function do_safe_redirect( $location, $status = 302, $reason = 'Yoast SEO' ) {
    \wp_safe_redirect( $location, $status, $reason );
    exit;
  }

	public function fix_wp_sitemap_url( $url, $path ) {

		global $wp_query;

    if( empty( $_SERVER['REQUEST_URI'] )) {
      return;
    }

    $path = esc_url_raw(wp_unslash( $_SERVER['REQUEST_URI'] ));
		
		if ( '/wp-sitemap.xml' === $path ) {
			return str_replace( '/wp-sitemap.xml', '/central-sitemap.xml', $url );
		}
		else if ( '/central-sitemap.xml' === $path ) {
			return str_replace( '/wp-sitemap.xml', '/central-sitemap.xml', $url );
		}
		else {
			return $url;
		}
	
	}

  public function new_sitemap_template() {

    if( empty( $_SERVER['REQUEST_URI'] )) {
      return;
    }

    $path = esc_url_raw(wp_unslash( $_SERVER['REQUEST_URI'] ));

    if(\substr( $path, 0, 11 ) !== '/wp-sitemap') {
      return;
    }

    $new_route = $this->get_new_route($path);

		if ( ! $new_route ) {
			return;
		}

		$this->do_safe_redirect( \home_url( $new_route ), 301 );
  }


  public function get_new_route($path) {
		// Start with the simple string comparison so we avoid doing unnecessary regexes.
		if ( $path === '/wp-sitemap.xml' ) {
			return '/central-sitemap.xml';
		}

    // //If the sitemap has been extended into posts or taxonomies
		// if ( \preg_match( '/^\/wp-sitemap-(posts|taxonomies)-(\w+)-(\d+)\.xml$/', $path, $matches ) ) {
		// 	$index = ( (int) $matches[3] - 1 );
		// 	$index = ( $index === 0 ) ? '' : (string) $index;

		// 	return '/' . $matches[2] . '-sitemap' . $index . '.xml';
		// }

    // //If the sitemap has been extended to users. 
		// if ( \preg_match( '/^\/wp-sitemap-users-(\d+)\.xml$/', $path, $matches ) ) {
		// 	$index = ( (int) $matches[1] - 1 );
		// 	$index = ( $index === 0 ) ? '' : (string) $index;

		// 	return '/user-sitemap' . $index . '.xml';
		// }

		return false;
  }

}
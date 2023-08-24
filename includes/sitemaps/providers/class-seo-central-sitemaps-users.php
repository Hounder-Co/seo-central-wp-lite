<?php
/**
 * Sitemaps: Seo_Central_Sitemaps_Users class
 *
 * Builds the sitemaps for the 'user' object type.
 *
 * @package WordPress
 * @subpackage Sitemaps
 * @since 5.5.0
 */

/**
 * Users XML sitemap provider.
 *
 * @since 5.5.0
 */
class Seo_Central_Sitemaps_Users extends Seo_Central_Sitemaps_Provider {
	/**
	 * Seo_Central_Sitemaps_Users constructor.
	 *
	 * @since 5.5.0
	 */
	public function __construct() {
		$this->name        = 'users';
		$this->object_type = 'user';
	}

	/**
	 * Gets a URL list for a user sitemap.
	 *
	 * @since 5.5.0
	 *
	 * @param int    $page_num       Page of results.
	 * @param string $object_subtype Optional. Not applicable for Users but
	 *                               required for compatibility with the parent
	 *                               provider class. Default empty.
	 * @return array[] Array of URL information for a sitemap.
	 */
	public function get_url_list( $page_num, $object_subtype = '' ) {
		/**
		 * Filters the users URL list before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @since 5.5.0
		 *
		 * @param array[]|null $url_list The URL list. Default null.
		 * @param int        $page_num Page of results.
		 */
		$url_list = apply_filters(
			'Seo_Central_Sitemaps_users_pre_url_list',
			null,
			$page_num
		);

		if ( null !== $url_list ) {
			return $url_list;
		}

		$args          = $this->get_users_query_args();
		$args['paged'] = $page_num;

		$query    = new WP_User_Query( $args );
		$users    = $query->get_results();
		$url_list = array();

		foreach ( $users as $user ) {
			$sitemap_entry = array(
				'loc' => $this->seo_central_get_author_posts_url( $user->ID ),
			);

			/**
			 * Filters the sitemap entry for an individual user.
			 *
			 * @since 5.5.0
			 *
			 * @param array   $sitemap_entry Sitemap entry for the user.
			 * @param WP_User $user          User object.
			 */
			$sitemap_entry = apply_filters( 'Seo_Central_Sitemaps_users_entry', $sitemap_entry, $user );
			$url_list[]    = $sitemap_entry;
		}

		return $url_list;
	}

	/**
	 * Gets the max number of pages available for the object type.
	 *
	 * @since 5.5.0
	 *
	 * @see Seo_Central_Sitemaps_Provider::max_num_pages
	 *
	 * @param string $object_subtype Optional. Not applicable for Users but
	 *                               required for compatibility with the parent
	 *                               provider class. Default empty.
	 * @return int Total page count.
	 */
	public function get_max_num_pages( $object_subtype = '' ) {
		/**
		 * Filters the max number of pages for a user sitemap before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @since 5.5.0
		 *
		 * @param int|null $max_num_pages The maximum number of pages. Default null.
		 */
		$max_num_pages = apply_filters( 'Seo_Central_Sitemaps_users_pre_max_num_pages', null );

		if ( null !== $max_num_pages ) {
			return $max_num_pages;
		}

		$args  = $this->get_users_query_args();
		$query = new WP_User_Query( $args );

		$total_users = $query->get_total();

		return (int) ceil( $total_users / $this->seo_central_get_max_urls( $this->object_type ) );
	}

	/**
	 * Returns the query args for retrieving users to list in the sitemap.
	 *
	 * @since 5.5.0
	 *
	 * @return array Array of WP_User_Query arguments.
	 */
	protected function get_users_query_args() {
		$public_post_types = get_post_types(
			array(
				'public' => true,
			)
		);

		// We're not supporting sitemaps for author pages for attachments.
		unset( $public_post_types['attachment'] );

		/**
		 * Filters the query arguments for authors with public posts.
		 *
		 * Allows modification of the authors query arguments before querying.
		 *
		 * @see WP_User_Query for a full list of arguments
		 *
		 * @since 5.5.0
		 *
		 * @param array $args Array of WP_User_Query arguments.
		 */
		$args = apply_filters(
			'Seo_Central_Sitemaps_users_query_args',
			array(
				'has_published_posts' => array_keys( $public_post_types ),
				'number'              => $this->seo_central_get_max_urls( $this->object_type ),
			)
		);

		return $args;
	}

	/**
	 * Gets the maximum number of URLs for a sitemap.
	 *
	 * @since 5.5.0
	 *
	 * @param string $object_type Object type for sitemap to be filtered (e.g. 'post', 'term', 'user').
	 * @return int The maximum number of URLs.
	 */
	public function seo_central_get_max_urls( $object_type ) {
		/**
		 * Filters the maximum number of URLs displayed on a sitemap.
		 *
		 * @since 5.5.0
		 *
		 * @param int    $max_urls    The maximum number of URLs included in a sitemap. Default 2000.
		 * @param string $object_type Object type for sitemap to be filtered (e.g. 'post', 'term', 'user').
		 */
		return apply_filters( 'seo_central_get_max_urls', 2000, $object_type );
	}


	/**
	 * Retrieves the URL to the author page for the user with the ID provided.
	 *
	 * @since 2.1.0
	 *
	 * @global WP_Rewrite $wp_rewrite WordPress rewrite component.
	 *
	 * @param int    $author_id       Author ID.
	 * @param string $author_nicename Optional. The author's nicename (slug). Default empty.
	 * @return string The URL to the author's page.
	 */
	public function seo_central_get_author_posts_url( $author_id, $author_nicename = '' ) {
		global $wp_rewrite;

		// var_dump($wp_rewrite);
		// var_dump('<br><br><br>');

		$author_id = (int) $author_id;
		$link      = $wp_rewrite->get_author_permastruct();

		if ( empty( $link ) ) {
			$file = home_url( '/' );
			$link = $file . '?author=' . $author_id;
		} else {
			if ( '' === $author_nicename ) {
				$user = get_userdata( $author_id );
				if ( ! empty( $user->user_nicename ) ) {
					$author_nicename = $user->user_nicename;
				}
			}
			$link = str_replace( '%author%', $author_nicename, $link );
			// $link = home_url( user_trailingslashit( $link ) );
			$home = get_option( 'home' );
			$home .= '/' . ltrim( $link, '/' );

			$link = $home;

			// var_dump($link);
			// var_dump($home);
		}

		/**
		 * Filters the URL to the author's page.
		 *
		 * @since 2.1.0
		 *
		 * @param string $link            The URL to the author's page.
		 * @param int    $author_id       The author's ID.
		 * @param string $author_nicename The author's nice name.
		 */
		$link = apply_filters( 'author_link', $link, $author_id, $author_nicename );

		return $link;
	}
}

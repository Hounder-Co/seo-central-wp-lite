<?php
/**
 * Sitemaps: Seo_Central_Sitemaps_Taxonomies class
 *
 * Builds the sitemaps for the 'taxonomy' object type.
 *
 * @package WordPress
 * @subpackage Sitemaps
 * @since 5.5.0
 */

/**
 * Taxonomies XML sitemap provider.
 *
 * @since 5.5.0
 */
class Seo_Central_Sitemaps_Taxonomies extends Seo_Central_Sitemaps_Provider {
	/**
	 * Seo_Central_Sitemaps_Taxonomies constructor.
	 *
	 * @since 5.5.0
	 */
	public function __construct() {
		$this->name        = 'taxonomies';
		$this->object_type = 'term';
	}

	/**
	 * Returns all public, registered taxonomies.
	 *
	 * @since 5.5.0
	 *
	 * @return WP_Taxonomy[] Array of registered taxonomy objects keyed by their name.
	 */
	public function get_object_subtypes() {
		$taxonomies = get_taxonomies( array( 'public' => true ), 'objects' );

		$taxonomies = array_filter( $taxonomies, 'is_taxonomy_viewable' );

		/**
		 * Filters the list of taxonomy object subtypes available within the sitemap.
		 *
		 * @since 5.5.0
		 *
		 * @param WP_Taxonomy[] $taxonomies Array of registered taxonomy objects keyed by their name.
		 */
		return apply_filters( 'Seo_Central_Sitemaps_taxonomies', $taxonomies );
	}

	/**
	 * Gets a URL list for a taxonomy sitemap.
	 *
	 * @since 5.5.0
	 * @since 5.9.0 Renamed `$taxonomy` to `$object_subtype` to match parent class
	 *              for PHP 8 named parameter support.
	 *
	 * @param int    $page_num       Page of results.
	 * @param string $object_subtype Optional. Taxonomy name. Default empty.
	 * @return array[] Array of URL information for a sitemap.
	 */
	public function get_url_list( $page_num, $object_subtype = '' ) {
		// Restores the more descriptive, specific name for use within this method.
		$taxonomy        = $object_subtype;
		$supported_types = $this->get_object_subtypes();

		// Bail early if the queried taxonomy is not supported.
		if ( ! isset( $supported_types[ $taxonomy ] ) ) {
			return array();
		}

		/**
		 * Filters the taxonomies URL list before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @since 5.5.0
		 *
		 * @param array[]|null $url_list The URL list. Default null.
		 * @param string       $taxonomy Taxonomy name.
		 * @param int          $page_num Page of results.
		 */
		$url_list = apply_filters(
			'Seo_Central_Sitemaps_taxonomies_pre_url_list',
			null,
			$taxonomy,
			$page_num
		);

		if ( null !== $url_list ) {
			return $url_list;
		}

		$url_list = array();

		// Offset by how many terms should be included in previous pages.
		$offset = ( $page_num - 1 ) * $this->seo_central_get_max_urls( $this->object_type );

		$args           = $this->get_taxonomies_query_args( $taxonomy );
		$args['fields'] = 'all';
		$args['offset'] = $offset;

		$taxonomy_terms = new WP_Term_Query( $args );

		if ( ! empty( $taxonomy_terms->terms ) ) {
			foreach ( $taxonomy_terms->terms as $term ) {
				$term_link = $this->seo_central_get_term_link( $term, $taxonomy );

				if ( is_wp_error( $term_link ) ) {
					continue;
				}

				$sitemap_entry = array(
					'loc' => $term_link,
				);

				/**
				 * Filters the sitemap entry for an individual term.
				 *
				 * @since 5.5.0
				 * @since 6.0.0 Added `$term` argument containing the term object.
				 *
				 * @param array   $sitemap_entry Sitemap entry for the term.
				 * @param int     $term_id       Term ID.
				 * @param string  $taxonomy      Taxonomy name.
				 * @param WP_Term $term          Term object.
				 */
				$sitemap_entry = apply_filters( 'Seo_Central_Sitemaps_taxonomies_entry', $sitemap_entry, $term->term_id, $taxonomy, $term );
				$url_list[]    = $sitemap_entry;
			}
		}

		return $url_list;
	}

	/**
	 * Gets the max number of pages available for the object type.
	 *
	 * @since 5.5.0
	 * @since 5.9.0 Renamed `$taxonomy` to `$object_subtype` to match parent class
	 *              for PHP 8 named parameter support.
	 *
	 * @param string $object_subtype Optional. Taxonomy name. Default empty.
	 * @return int Total number of pages.
	 */
	public function get_max_num_pages( $object_subtype = '' ) {
		if ( empty( $object_subtype ) ) {
			return 0;
		}

		// Restores the more descriptive, specific name for use within this method.
		$taxonomy = $object_subtype;

		/**
		 * Filters the max number of pages for a taxonomy sitemap before it is generated.
		 *
		 * Passing a non-null value will short-circuit the generation,
		 * returning that value instead.
		 *
		 * @since 5.5.0
		 *
		 * @param int|null $max_num_pages The maximum number of pages. Default null.
		 * @param string   $taxonomy      Taxonomy name.
		 */
		$max_num_pages = apply_filters( 'Seo_Central_Sitemaps_taxonomies_pre_max_num_pages', null, $taxonomy );

		if ( null !== $max_num_pages ) {
			return $max_num_pages;
		}

		$term_count = wp_count_terms( $this->get_taxonomies_query_args( $taxonomy ) );

		return (int) ceil( $term_count / $this->seo_central_get_max_urls( $this->object_type ) );
	}

	/**
	 * Returns the query args for retrieving taxonomy terms to list in the sitemap.
	 *
	 * @since 5.5.0
	 *
	 * @param string $taxonomy Taxonomy name.
	 * @return array Array of WP_Term_Query arguments.
	 */
	protected function get_taxonomies_query_args( $taxonomy ) {
		/**
		 * Filters the taxonomy terms query arguments.
		 *
		 * Allows modification of the taxonomy query arguments before querying.
		 *
		 * @see WP_Term_Query for a full list of arguments
		 *
		 * @since 5.5.0
		 *
		 * @param array  $args     Array of WP_Term_Query arguments.
		 * @param string $taxonomy Taxonomy name.
		 */
		$args = apply_filters(
			'Seo_Central_Sitemaps_taxonomies_query_args',
			array(
				'taxonomy'               => $taxonomy,
				'orderby'                => 'term_order',
				'number'                 => $this->seo_central_get_max_urls( $this->object_type ),
				'hide_empty'             => true,
				'hierarchical'           => false,
				'update_term_meta_cache' => false,
			),
			$taxonomy
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
		return apply_filters( 'seo_central_max_urls', 2000, $object_type );
	}

	/**
	 * Generates a permalink for a taxonomy term archive.
	 *
	 * @since 2.5.0
	 *
	 * @global WP_Rewrite $wp_rewrite WordPress rewrite component.
	 *
	 * @param WP_Term|int|string $term     The term object, ID, or slug whose link will be retrieved.
	 * @param string             $taxonomy Optional. Taxonomy. Default empty.
	 * @return string|WP_Error URL of the taxonomy term archive on success, WP_Error if term does not exist.
	 */
	function seo_central_get_term_link( $term, $taxonomy = '' ) {
		global $wp_rewrite;

		if ( ! is_object( $term ) ) {
			if ( is_int( $term ) ) {
				$term = get_term( $term, $taxonomy );
			} else {
				$term = get_term_by( 'slug', $term, $taxonomy );
			}
		}

		if ( ! is_object( $term ) ) {
			$term = new WP_Error( 'invalid_term', __( 'Empty Term.' ) );
		}

		if ( is_wp_error( $term ) ) {
			return $term;
		}

		$taxonomy = $term->taxonomy;

		$termlink = $wp_rewrite->get_extra_permastruct( $taxonomy );

		/**
		 * Filters the permalink structure for a term before token replacement occurs.
		 *
		 * @since 4.9.0
		 *
		 * @param string  $termlink The permalink structure for the term's taxonomy.
		 * @param WP_Term $term     The term object.
		 */
		$termlink = apply_filters( 'pre_term_link', $termlink, $term );

		$slug = $term->slug;
		$t    = get_taxonomy( $taxonomy );
		
		if ( empty( $termlink ) ) {
			if ( 'category' === $taxonomy ) {
				$termlink = '?cat=' . $term->term_id;
			} elseif ( $t->query_var ) {
				$termlink = "?$t->query_var=$slug";
			} else {
				$termlink = "?taxonomy=$taxonomy&term=$slug";
			}
			$termlink = home_url( $termlink );
		} else {
			if ( ! empty( $t->rewrite['hierarchical'] ) ) {
				$hierarchical_slugs = array();
				$ancestors          = get_ancestors( $term->term_id, $taxonomy, 'taxonomy' );

				foreach ( (array) $ancestors as $ancestor ) {
					$ancestor_term        = get_term( $ancestor, $taxonomy );
					$hierarchical_slugs[] = $ancestor_term->slug;
				}
				$hierarchical_slugs   = array_reverse( $hierarchical_slugs );
				$hierarchical_slugs[] = $slug;
				$termlink             = str_replace( "%$taxonomy%", implode( '/', $hierarchical_slugs ), $termlink );
			} else {
				$termlink = str_replace( "%$taxonomy%", $slug, $termlink );
			}
			// $termlink = home_url( user_trailingslashit( $termlink, 'category' ) );
			$termlink = get_option( 'home' ) . user_trailingslashit( $termlink, 'category' );
		}

		// Back compat filters.
		if ( 'post_tag' === $taxonomy ) {

			/**
			 * Filters the tag link.
			 *
			 * @since 2.3.0
			 * @since 2.5.0 Deprecated in favor of {@see 'term_link'} filter.
			 * @since 5.4.1 Restored (un-deprecated).
			 *
			 * @param string $termlink Tag link URL.
			 * @param int    $term_id  Term ID.
			 */
			$termlink = apply_filters( 'tag_link', $termlink, $term->term_id );
		} elseif ( 'category' === $taxonomy ) {

			/**
			 * Filters the category link.
			 *
			 * @since 1.5.0
			 * @since 2.5.0 Deprecated in favor of {@see 'term_link'} filter.
			 * @since 5.4.1 Restored (un-deprecated).
			 *
			 * @param string $termlink Category link URL.
			 * @param int    $term_id  Term ID.
			 */
			$termlink = apply_filters( 'category_link', $termlink, $term->term_id );
		}

		/**
		 * Filters the term link.
		 *
		 * @since 2.5.0
		 *
		 * @param string  $termlink Term link URL.
		 * @param WP_Term $term     Term object.
		 * @param string  $taxonomy Taxonomy slug.
		 */
		return apply_filters( 'term_link', $termlink, $term, $taxonomy );
	}
}
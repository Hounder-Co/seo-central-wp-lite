<?php

/**
 * Register all actions and filters for the plugin
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/includes
 */

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/includes
 * @author     Hounder <info@hounder.co>
 */
class Seo_Central_Metabox {

	public $types_string;

  private $config = '{
    "title": "SEO Central",
    "prefix": "seo_central_",
    "domain": "seo-central",
    "class_name": "seo_central",
    "post-type": ["__POST_TYPES__"],
    "context": "advanced",
    "priority": "default",
    "fields": [
			{ "type":"textarea", "label":"Meta Title", "id":"seo_central_meta_title", "description": "The main title tag for a webpage used in SERPs." },
			{ "type":"textarea", "label":"Meta Description", "id":"seo_central_meta_description", "description": "A brief summary of a webpage displayed in SERPs." },
      { "type":"textarea", "label":"Primary Keyword", "id":"seo_central_prime_keyphrase", "description": "Main keyword focused on for a webpage\'s SEO." },
			{ "type":"keyphrases", "label":"Secondary Keywords", "id":"seo_central_add_keyphrases", "description": "Additional related keywords used to support primary keyphrase." },
			{ "type":"slug", "label":"Slug", "id":"seo_central_slug", "description": "The part of a URL which identifies a page using human-readable keywords." },
			{ "type":"checkbox", "label":"Cornerstone Content", "id":"seo_central_meta_cornerstone", "description": "Comprehensive content piece that covers a topic broadly and links to related posts." }
    ]
  }';

  private $config2 = '{
    "fields": [
      { "type":"select", "label":"Page Type", "id":"seo_central_page_type", "choices": {"WebPage":"Default Web Page","ItemPage":"Item Page","AboutPage":"About Page","FAQPage":"FAQ Page","QAPage":"QA Page","ProfilePage": "Profile Page","ContactPage": "Contact Page","MedicalWebPage": "Medical Web Page","CollectionPage": "Collection Page","CheckoutPage":"Check Out Page", "RealEstateListing": "Real Estate Listing","SearchResultsPage": "Search Results Page"}, "description": "Structured data type that helps search engines understand the page." },
      { "type":"select", "label":"Article Type", "id":"seo_central_article_type", "choices": {"None":"Page Default","Article":"Article","BlogPosting":"Blog Post","SocialMediaPosting":"Social Media Post","NewsArticle":"News Article","AdvertiserContentArticle":"Advertiser Content Article","SatiricalArticle":"Satirical Article","ScholarlyArticle":"Scholarly Article","TechArticle":"Tech Article","Report":"Report"}, "description": "Structured data type for articles aiding in SERP visibility." }
    ]
  }';

  private $config3 = '{
    "fields": [
      { "type":"image", "label":"Social Image", "id":"seo_central_social_image", "description": "The image displayed when a page is shared on social media." },
      { "type":"text", "label":"Social Title", "id":"seo_central_social_title", "description": "The title used when a page is shared on social media." },
      { "type":"textarea", "label":"Social Description", "id":"seo_central_social_description", "description": "Brief summary of a page shown when shared on social media." }
    ]
  }';

  private $config4 = '{
    "fields": [
      { "type":"text", "label":"Page Analysis", "id":"seo_central_page_analysis", "description": "" },
			{ "type":"text", "label":"Outgoing Internal Links", "id":"seo_central_outgoing_internals", "description": "" },
			{ "type":"text", "label":"Incoming Internal Links", "id":"seo_central_incoming_internals", "description": "" },
			{ "type":"text", "label":"External Links", "id":"seo_central_outgoing_externals", "description": "" },
			{ "type":"text", "label":"Word Count", "id":"seo_central_wordcount", "description": "" },
			{ "type":"text", "label":"Flesch Readablity", "id":"seo_central_flesch_score", "description": "" },
			{ "type":"text", "label":"HTTP Status", "id":"seo_central_http_status", "description": "" },
			{ "type":"text", "label":"Seo Score", "id":"seo_central_page_score", "description": "" }
    ]
  }';

	private $config5 = '{
    "fields": [
      { "type":"radio", "label":"Allow search engines to show this page?", "id":"seo_central_robot_index", "description": "A directive for search engines to index a webpage." },
			{ "type":"radio", "label":"Allow search engines follow links on this page?", "id":"seo_central_robot_follow", "description": "A directive for search engines to follow or nofollow links." }
    ]
  }';

	public function __construct() {
    // Hook into the 'init' action with a priority of 100
    // This will ensure that all post types have been registered before the function runs
    add_action('init', [$this, 'setupConfig'], 100);
    add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
    add_action('save_post', [$this, 'slug_save_callback']);
    add_action('save_post', [$this, 'save_post']);
	}

	public function setupConfig() {
    // Prep the Primary Config with the all post types so it properly appears for each
    $this->types_string = $this->postTypeResults();
    $this->config = str_replace('"__POST_TYPES__"', $this->types_string, $this->config);
    // Set up the configs for the metabox
    $this->config = json_decode($this->config, true);
    $this->config2 = json_decode($this->config2, true);
    $this->config3 = json_decode($this->config3, true);
    $this->config4 = json_decode($this->config4, true);
    $this->config5 = json_decode($this->config5, true);
	}

	public function add_meta_boxes() {


		foreach ( $this->config['post-type'] as $screen ) {
			add_meta_box(
				sanitize_title( $this->config['title'] ),
				$this->config['title'],
				[ $this, 'add_meta_box_callback' ],
				$screen,
				$this->config['context'],
				$this->config['priority']
			);
		}
	}

	public function save_post( $post_id ) {
    foreach ( $this->config['fields'] as $field ) {
			switch ( $field['type'] ) {
				case 'editor':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				case 'checkbox':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				default:
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = sanitize_text_field( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
			}
		}

		//Also save the second config section
    foreach ( $this->config2['fields'] as $field ) {
			switch ( $field['type'] ) {
				case 'editor':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				default:
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = sanitize_text_field( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
			}
		}

		//Also save the second config section
    foreach ( $this->config3['fields'] as $field ) {
			switch ( $field['type'] ) {
				case 'editor':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				default:
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = sanitize_text_field( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
			}
		}

		//Also save the second config section
    foreach ( $this->config4['fields'] as $field ) {
			switch ( $field['type'] ) {
				case 'editor':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				default:
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = sanitize_text_field( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
			}
		}

		//Robots Radio Fields
    foreach ( $this->config5['fields'] as $field ) {
			switch ( $field['type'] ) {
				case 'editor':
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = wp_filter_post_kses( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
					break;
				default:
					if ( isset( $_POST[ $field['id'] ] ) ) {
						$sanitized = sanitize_text_field( $_POST[ $field['id'] ] );
						update_post_meta( $post_id, $field['id'], $sanitized );
					}
			}
		}
	}

	public function slug_save_callback( $post_id ) {

    // verify post is not a revision
    if ( ! wp_is_post_revision( $post_id ) ) {

        // unhook this function to prevent infinite looping
        remove_action( 'save_post', [ $this, 'slug_save_callback'] );

				foreach ( $this->config['fields'] as $field ) {

					if( $field['type'] == 'slug') {
						// update the post slug
						wp_update_post( array(
								'ID' => $post_id,
								'post_name' => $this->value($field)
						));
					}
				}

        // re-hook this function
        add_action( 'save_post', [ $this, 'slug_save_callback'] );

    }
	}

	public function add_meta_box_callback() {

		//Display Lite or Pro version of the metabox form depending on if SEO Central Pro File plugin has been installed and activated
		if (!defined('SEO_CENTRAL_PRO') || !SEO_CENTRAL_PRO) {
			$this->seo_central_fields_table_lite();
		}
		else if(defined('SEO_CENTRAL_PRO') || SEO_CENTRAL_PRO) {

			//Check to see if the pro user flag has been set
			if (get_option('seo_central_pro_user') === 'pro') {
					$this->seo_central_fields_table_pro();
			} else {
					$this->seo_central_fields_table_lite();
			}

		}
	}

	// SEO Central metabox Lite Version
	private function seo_central_fields_table_lite() {
		?>
		<?php $this->seo_central_metabox_notifications(); ?>
		<div id="seo-central-metabox" class="seo-central-metabox-wrapper">

			<div id="seo-central-metabox-ai" class="seo-central-metabox-top-content">
				
				<div class="form-table seo-central-metabox-ai-fields seo-central-metabox-lite-ai-fields">
					<div id='seo-central-lite-tips' class="seo-central-metabox-ai-fields-tip-wrapper">
						<span class="seo-central-metabox-ai-fields-tip-text"><?php esc_html_e('Tips', 'seo-central-lite'); ?></span>
						<span class="seo-central-metabox-ai-fields-tip-symbol"></span>
					</div>
					<div class="seo-central-metabox-lite-preview">
						<h2 class="seo-central-metabox-lite-preview-title"><?php esc_html_e('Generate expert meta data with a single click', 'seo-central-lite'); ?></h2>
						<p class="seo-central-metabox-lite-preview-description"><?php esc_html_e('With SEO Central Pro, you can generate meta titles, descriptions, and keywords instantly. Save yourself from the busywork.', 'seo-central-lite'); ?></p>
						<a href="<?php echo esc_url('https://app.seocentral.ai/?redirect=/dashboard/add-site'); ?>" class='seo-central-button-upgrade'><?php esc_html_e('Upgrade to Pro', 'seo-central-lite'); ?></a>
						<a id="seo-central-preview-video" class="seo-central-metabox-lite-preview-video-link" href="<?php echo esc_url('https://seocentral.ai/'); ?>">
								<img class="seo-central-metabox-lite-preview-video-poster" src="<?php echo esc_url('/wp-content/plugins/seo-central-wp-lite/admin/icons/seo-central-preview-video.svg'); ?>" alt="<?php esc_attr_e('SEO Central Pro Preview Image', 'seo-central-lite'); ?>">
						</a>
					</div>

					<div class="form-table-row seo-central-metabox-lite-ai-fields-column">
						<?php
							foreach ( $this->config['fields'] as $field ) {
								$button_id = esc_attr(str_replace('seo_central_', '', $field['id']));
								?>
								<?php if (($field['id'] !== 'seo_central_slug') && ($field['id'] !== 'seo_central_robots') && ($field['id'] !== 'seo_central_meta_cornerstone')) : ?>

									<?php if (($field['id'] == 'seo_central_add_keyphrases')) : ?>
										<div class="form-table-row seo-central-metabox-ai-fields-row">
											<div class="seo-central-metabox-ai-fields-row-item lite-feature-field">	
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										</div>

									<?php else : ?>
										<div class="form-table-row seo-central-metabox-ai-fields-row">
											<div class="seo-central-metabox-ai-fields-row-item <?php echo ($field['id'] == 'seo_central_meta_description') ? 'js-tips-description' : ''; ?>">	
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>

												<div id="overlay_keyphrases_lite" class="seo-central-metabox-ai-disabled-field"></div>
											</div>
										</div>
									<?php endif; ?>
								<?php endif; ?>
								<?php
							}
						?>
					</div>
				</div>

				<div class="seo-central-metabox-columns-wrapper">
					<div class="form-table meta-table seo-central-metabox-column column-1" id="seo-central-metabox-ai-table" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Details', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body'>
							<?php
								foreach ( $this->config['fields'] as $field ) {
									?>
										<?php if (($field['id'] == 'seo_central_slug')) : ?>
											<div class="form-table-row">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php endif; ?>
									<?php
								}

								foreach ( $this->config3['fields'] as $field ) {
									?>
										<div class="form-table-row">
											<?php $this->label( $field ); ?>
											<div>
												<?php if ($field['type'] == 'image'): ?>
													<div class="seo-central-metabox-media-triggers">
														<button id='seo-central-media-trigger' class="seo-central-button-small seo-central-button-secondary"><?php esc_html_e('Choose File', 'seo-central-lite'); ?></button>
			
														<?php if ($this->value( $field )): ?>
															<button id='seo-central-media-remove' class="seo-central-remove-image"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button>
															<span class="seo-central-social-image-instruction"><?php esc_html_e('5 MB limit. Allowed types: jpg, jpeg, png', 'seo-central-lite'); ?></span>
														<?php else: ?>
															<button id='seo-central-media-remove' class="seo-central-remove-image disabled"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button>
															<span class="seo-central-social-image-instruction"><?php esc_html_e('5 MB limit. Allowed types: jpg, jpeg, png', 'seo-central-lite'); ?></span>
														<?php endif; ?>
			
													</div>
												<?php endif; ?>
												<?php $this->field( $field ); ?>
												<?php //$this->description( $field ); ?>
											</div>
										</div>
									<?php
								}

								foreach ( $this->config['fields'] as $field ) {
									?>
										<?php if (($field['id'] == 'seo_central_meta_cornerstone')) : ?>
											<div class="form-table-row cornerstone-format">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php endif; ?>
									<?php
								}
							?>
						</div>
					</div>

					<div class="form-table meta-table seo-central-metabox-column seo-central-search-preview column-2" id="seo-central-search-preview" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Social & Search Preview', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body search-preview-spacing'>
							<div class='table-live-previews'>
								<div class="form-table-row seo-central-google-wrapper">
									
									<div class='google-preview-type search-preview-spacing-item'>
										<input type="radio" name="google-social-card" id="google-social-card" value="true" checked="checked">		
										<label for="google-social-card"><?php esc_html_e('Social Card', 'seo-central-lite'); ?></label>

										<br>

										<input type="radio" name="google-preview-desktop" id="google-preview-desktop" value="false">		
										<label for="google-preview-desktop"><?php esc_html_e('Desktop', 'seo-central-lite'); ?></label>

										<br>

										<input type="radio" name="google-preview-mobile" id="google-preview-mobile" value="false">
										<label for="google-preview-mobile"><?php esc_html_e('Mobile', 'seo-central-lite'); ?></label>
										
									</div>

									<div class="social-card-wrapper active search-preview-spacing-item">
										<div class='social-card'>

											<?php if($this->value( $this->config3['fields'][0])): ?>
												<?php $img_url = esc_url($this->value( $this->config3['fields'][0])); ?>
											<?php else: ?>
												<?php $img_url = esc_url('/wp-content/plugins/seo-central-wp-lite/admin/src/images/seo-placeholder-image.png'); ?>
											<?php endif; ?>

											<?php if($this->value( $this->config3['fields'][1])): ?>
												<?php $social_title = esc_html($this->value( $this->config3['fields'][1])); ?>
											<?php elseif($this->value($this->config['fields'][0])): ?>
												<?php $social_title = esc_html($this->value($this->config['fields'][0])); ?>
											<?php else: ?>
												<?php $social_title = ''; ?>
											<?php endif; ?>

											<?php if($this->value( $this->config3['fields'][2])): ?>
												<?php $social_desc = esc_html($this->value( $this->config3['fields'][2])); ?>
											<?php elseif($this->value($this->config['fields'][1])): ?>
												<?php $social_desc = esc_html($this->value($this->config['fields'][1])); ?>
											<?php else: ?>
												<?php $social_desc = ''; ?>
											<?php endif; ?>

											<img src='<?php echo $img_url; ?>' alt='Meta Image' class='social-card-asset' width='530' height='310'/>
											<h3 class="social-card-title"><?php echo $social_title; ?></h3>
											<p class="social-card-description"><?php echo $social_desc; ?></p>
											<p class="social-card-origin"><span><?php echo esc_url(get_bloginfo('url')); ?></span><?php echo $this->google_breadcrumbs(); ?></p>

											</div>
									</div>

									<div class="google-preview-desktop-wrapper search-preview-spacing-item">

										<div class="google-preview-header">
											<img src='<?php echo esc_url(get_site_icon_url()); ?>' alt='<?php esc_attr_e('favicon-asset', 'seo-central-lite'); ?>' class='google-preview-image'>
											<div class='google-preview-header-content'>
												<p class='google-preview-header-content-site'> <?php echo esc_html(get_bloginfo('name')); ?></p>
												<p class='google-preview-header-content-crumbs'><span><?php echo esc_url(get_bloginfo('url')); ?></span><?php echo $this->google_breadcrumbs(); ?></p>
											</div>
										</div>

										<div class="google-preview-body">
											<div class='google-preview-link' href='<?php echo esc_url(get_bloginfo('url')); ?>'> <?php echo esc_html($this->value( $this->config['fields'][0])); ?></div>
											<p> <?php echo esc_html($this->value( $this->config['fields'][1])); ?></p>
										</div>

									</div>

									<div class="google-preview-mobile-wrapper search-preview-spacing-item">
										<div class="google-preview-header">
											<img src='<?php echo esc_url(get_site_icon_url()); ?>' alt='<?php esc_attr_e('favicon-asset', 'seo-central-lite'); ?>' class='google-preview-image'>
											<div class='google-preview-header-content'>
												<p class='google-preview-header-content-site'> <?php echo esc_html(get_bloginfo('name')); ?></p>
												<p class='google-preview-header-content-crumbs'><span><?php echo esc_url(get_bloginfo('url')); ?></span> <?php echo $this->google_breadcrumbs(); ?></p>
											</div>
										</div>

										<div class="google-preview-body">
											<div class='google-preview-link' href='<?php echo esc_url(get_bloginfo('url')); ?>'> <?php echo esc_html($this->value( $this->config['fields'][0])); ?></div>
											<p class='google-preview-mobile-bottom'> <?php echo esc_html($this->value( $this->config['fields'][1])); ?></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="form-table meta-table seo-central-metabox-column column-4" id="seo-central-metabox-ai-table" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Analysis', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body'>

							<div class="seo-central-page-score svg-wrapper">
								<svg class="overlay-svg" viewBox="0 0 180 160">
									<path
										data-last-score="0"
										data-initial-load="true"
										class="overlay-circle"
										d="M90 2.00006C138.829 2.00005 178 37.1368 178 80.0001C178 122.863 138.829 158 90 158C41.171 158 2 122.863 2 80.0001C1.99999 37.1368 41.171 2.00006 90 2.00006Z"
										fill="none"
										stroke="#23af7c"
										stroke-width="4"
										stroke-dasharray="0"
									/>
									<text x="50%" y="55" class="percent-title" text-anchor="middle"><?php esc_html_e('Central Score', 'seo-central-lite'); ?></text>
									<text x="50%" y="90" class="percentage" text-anchor="middle">0</text>
									<text x="50%" y="115" class="percent-result" text-anchor="middle"><?php esc_html_e('Excellent!', 'seo-central-lite'); ?></text>
								</svg>

								<svg class="underlay" viewBox="0 0 180 160">
									<path
										class="underlay-circle"
										d="M90 2.00006C138.829 2.00005 178 37.1368 178 80.0001C178 122.863 138.829 158 90 158C41.171 158 2 122.863 2 80.0001C1.99999 37.1368 41.171 2.00006 90 2.00006Z"
										fill="none"
										stroke="#DAE0DC"
										stroke-width="4"
										stroke-dasharray="525"
									/>
								</svg>
							</div>

							<div class="seo-central-metabox-lite-preview mx-auto seo-central-preview-toggle">
								<h2 class="seo-central-metabox-lite-preview-title"><?php esc_html_e('We show you how to get your score higher here.', 'seo-central-lite'); ?></h2>
								<p class="seo-central-metabox-lite-preview-description"><?php esc_html_e('With SEO Central Pro, we tell you what is wrong, and show you how to fix SEO problems to boost your ranking.', 'seo-central-lite'); ?></p>
								<a href="<?php echo esc_url('https://app.seocentral.ai/?redirect=/dashboard/add-site'); ?>" class='seo-central-button-upgrade'><?php esc_html_e('Upgrade to Pro', 'seo-central-lite'); ?></a>
							</div>
							<div class='seo-central-analysis-wrapper warnings-errors hidden'>

							</div>	

							<div class="seo-central-analysis-scores-dropdown success hidden">
								<div class="seo-central-analysis-scores-dropdown-header">
									<p class='seo-central-analysis-scores-dropdown-header-description'><?php esc_html_e('Show good results', 'seo-central-lite'); ?></p>
									<div class='seo-central-analysis-scores-dropdown-header-collapse-arrow'></div>
								</div>
								<div class="seo-central-analysis-scores-dropdown-body close"></div>
							</div>

							<?php
								foreach ( $this->config4['fields'] as $field ) {
									?>
										<div class="form-table-row seo-central-analysis-hidden">

											<?php $this->label( $field ); ?>

											<?php $this->field( $field ); ?>

											<?php //$this->description( $field ); ?>

										</div>
									<?php
								}
							?>

						</div>
					</div>
				</div>

				<div class="seo-central-boring-stuff">

					<div class="seo-central-boring-stuff-header">
						<div class="seo-central-boring-stuff-header-content">
							<h3 class='seo-central-boring-stuff-header-title'><?php esc_html_e('The Boring Stuff', 'seo-central-lite'); ?></h3>
							<p class='seo-central-boring-stuff-header-description'><?php esc_html_e('Page Hierarchy, Robots, Schema', 'seo-central-lite'); ?></p>
						</div>
						<div class='form-table-collapse-arrow'></div>
					</div>

					<div class="seo-central-boring-stuff-body">


						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-content-hierarchy" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Hierarchy', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								<div class='seo-central-hierarchy'>
									<div class='seo-central-hierarchy-wrapper js-content-hierarchy'>
										<!-- <h3 class='seo-central-hierarchy-title'>Page Content Hierarchy</h3> -->
									</div>
								</div>
							</div>
						</div>

						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-robots" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Robots', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								
								<?php

									foreach ( $this->config5['fields'] as $field ) {
										?>
											<div class="seo-central-metabox-robot-row">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php
									}

								?>							

							</div>
						</div>

						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-schemas" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Schema', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								
								<?php
									foreach ( $this->config2['fields'] as $field ) {
										?>
											<div class="form-table-row seo-central-metabox-schemas">
												<div class="seo-central-metabox-schema-item">
													<?php $this->label( $field ); ?>
													<?php //$this->description( $field ); ?>
													<?php $this->field( $field ); ?>
												</div>
											</div>
										<?php
									}
								?>							

							</div>
						</div>

					</div>
				</div>

			</div>

			<svg preserveAspectRatio="none" class="driver-overlay driver-overlay-animated seo-central-custom-driver" viewBox="0 0 1370 2032.375" xmlspace="preserve" xmlnsxlink="http://www.w3.org/1999/xlink" version="1.1" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; z-index: 10000; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%;"><path d="M1370,0L0,0L0,2032.375L1370,2032.375L1370,0Z
                            M84,28 h248 a5,5 0 0 1 5,5 v58 a5,5 0 0 1 -5,5 h-248 a5,5 0 0 1 -5,-5 v-58 a5,5 0 0 1 5,-5 z" style="fill: white; opacity: 0.7; pointer-events: auto; cursor: auto;"></path></svg>
		</div>
		<?php
	}

	// SEO Central metabox Pro Version (All functionality enabled for meta generation and page analysis)
	private function seo_central_fields_table_pro() {
		?>
		<?php $this->seo_central_metabox_notifications(); ?>
		<div id="seo-central-metabox" class="seo-central-metabox-wrapper">

			<div id="seo-central-metabox-ai" class="seo-central-metabox-top-content">
				
				<div class="form-table seo-central-metabox-ai-fields">
					<div id='seo-central-pro-tips' class="seo-central-metabox-ai-fields-tip-wrapper">
						<span class="seo-central-metabox-ai-fields-tip-text"><?php esc_html_e('Tips', 'seo-central-lite'); ?></span>
						<span class="seo-central-metabox-ai-fields-tip-symbol"></span>
					</div>
					<div class="seo-central-metabox-top-content-first">
						<div class="seo-central-generate-wrapper">
							<div class="seo-central-generate-wrapper-buttons">
								<button id='seo-central-api' class='update-meta-fields seo-central-button-generate'>
									<?php esc_html_e('Generate Meta', 'seo-central-lite'); ?>
									<svg id="exBt3J7Ycwb1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
										<g id="exBt3J7Ycwb5_to" transform="translate(9.5873,15.459)"><g id="exBt3J7Ycwb5_ts" transform="scale(1,1)"><path d="M7.9378,15.459h3.298999l-1.649-3.959L7.9378,15.459Z" transform="translate(-9.587246,-15.459)" fill="#11211b"/></g></g><g id="exBt3J7Ycwb6_to" transform="translate(10.762696,8.459)"><g id="exBt3J7Ycwb6_ts" transform="scale(1,1)"><path d="M7.46319,8.459h6.599011l-3.299-7.918L7.46319,8.459Z" transform="translate(-10.762641,-8.459)" fill="#11211b"/></g></g><g id="exBt3J7Ycwb7_to" transform="translate(3.5873,11.459)"><g id="exBt3J7Ycwb7_ts" transform="scale(1,1)"><path d="M1.9378,11.459h3.299L3.5878,7.49998L1.9378,11.459Z" transform="translate(-3.5873,-11.459)" fill="#11211b"/></g></g>
									</svg>
								</button>
								<button id='seo-central-api-regenerate' class='seo-central-button-regenerate' data-current="0" data-last="">
									<?php esc_html_e('Generate Again', 'seo-central-lite'); ?>
									<svg id="exBt3J7Ycwb1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
										<g id="exBt3J7Ycwb5_to" transform="translate(9.5873,15.459)"><g id="exBt3J7Ycwb5_ts" transform="scale(1,1)"><path d="M7.9378,15.459h3.298999l-1.649-3.959L7.9378,15.459Z" transform="translate(-9.587246,-15.459)" fill="#11211b"/></g></g><g id="exBt3J7Ycwb6_to" transform="translate(10.762696,8.459)"><g id="exBt3J7Ycwb6_ts" transform="scale(1,1)"><path d="M7.46319,8.459h6.599011l-3.299-7.918L7.46319,8.459Z" transform="translate(-10.762641,-8.459)" fill="#11211b"/></g></g><g id="exBt3J7Ycwb7_to" transform="translate(3.5873,11.459)"><g id="exBt3J7Ycwb7_ts" transform="scale(1,1)"><path d="M1.9378,11.459h3.299L3.5878,7.49998L1.9378,11.459Z" transform="translate(-3.5873,-11.459)" fill="#11211b"/></g></g>
									</svg>
								</button>
							</div>
							<p class='seo-central-generate-description'><?php esc_html_e('Generate expert meta data with a single click', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-button-apply-all-wrapper'>
							<button id='seo-central-apply-all-meta' class='seo-central-button-apply-all'><span class='seo-central-button-apply-all-text'><?php esc_html_e('Apply All', 'seo-central-lite'); ?></span><span class='seo-central-button-apply-all-symbol'></span></button>
						</div>
					</div>

					<?php
						foreach ( $this->config['fields'] as $field ) {
							$button_id = str_replace('seo_central_', '', $field['id']);
							?>
							<?php if (($field['id'] !== 'seo_central_slug') && ($field['id'] !== 'seo_central_robots') && ($field['id'] !== 'seo_central_meta_cornerstone')) : ?>
								<div class="form-table-row seo-central-metabox-ai-fields-row">
									<div class="seo-central-metabox-ai-fields-row-item <?php echo esc_attr(($field['id'] == 'seo_central_meta_description') ? 'js-tips-ai-description' : ''); ?>">

										<?php if (($field['id'] == 'seo_central_meta_title') ) : ?>

											<label class="seo-central-label text-animate generated-label" for="generated_meta_title"><?php esc_html_e('Generated Meta Title', 'seo-central-lite'); ?></label>
											<div class="seo-central-metabox-ai-results-wrapper">
												<textArea class="seo-central-text-area generated-input" id="generated_meta_title" name="generated_meta_title" type="text" value="" data-previous="" readonly tabindex="-1"></textArea>
												<div id="overlay_meta_title" class="seo-central-metabox-ai-results-overlay text-area-overlay"></div>
											</div>

										<?php elseif (($field['id'] == 'seo_central_meta_description') ) : ?>

											<label class="seo-central-label text-animate generated-label" for="generated_meta_description"><?php esc_html_e('Generated Meta Description', 'seo-central-lite'); ?></label>
											<div class="seo-central-metabox-ai-results-wrapper">
												<textarea class="seo-central-text-area seo-text-area generated-input %s" id="generated_meta_description" name="generated_meta_description" rows="4" cols="50" data-previous="" readonly tabindex="-1"></textarea>
												<div id="overlay_meta_description" class="seo-central-metabox-ai-results-overlay text-area-overlay"></div>
											</div>

										<?php elseif (($field['id'] == 'seo_central_prime_keyphrase') ) : ?>

											<label class="seo-central-label text-animate generated-label" for="generated_meta_prime"><?php esc_html_e('Generated Primary Keyword', 'seo-central-lite'); ?></label>
											<div class="seo-central-metabox-ai-results-wrapper">
												<textArea class="seo-central-text-area generated-input" id="generated_meta_prime" name="generated_meta_prime" type="text" value="" data-previous="" readonly tabindex="-1"></textArea>
												<div id="overlay_meta_prime" class="seo-central-metabox-ai-results-overlay text-area-overlay"></div>
											</div>

										<?php elseif (($field['id'] == 'seo_central_add_keyphrases') ) : ?>


											<div class="seo-central-metabox-lite-preview secondary-overlay hidden">
												<p class="seo-central-metabox-lite-preview-description"><?php esc_html_e('Upgrade to get the edge with Secondary Keywords', 'seo-central-lite'); ?></p>
												<a href="https://app.seocentral.ai/?redirect=/dashboard/add-site" class='seo-central-button-upgrade alternate-colors'><?php esc_html_e('Upgrade to Pro', 'seo-central-lite'); ?></a>
											</div>

											<label class="seo-central-label text-animate generated-label" for="generated_meta_second"><?php esc_html_e('Generated Secondary Keywords', 'seo-central-lite'); ?></label>
											<div class="seo-central-metabox-ai-results-wrapper">
												<div class="seo-central-secondary-keyphrases seo-keyphrases-wrapper seo-central-keyphrases-wrapper generated-secondary-wrapper generated-input"><input class="regular-text regular-keyphrases generated-input %s" id="generated_meta_second" name="generated_meta_second" %s type="text" value="" data-previous="" tabindex="-1"></div>
												<div id="overlay_meta_second" class="seo-central-metabox-ai-results-overlay"></div>
											</div>

										<?php endif ; ?>

									</div>

									<div class="seo-central-metabox-apply-flow">
										<button id="apply_<?php echo esc_attr($button_id); ?>" class='seo-central-button-apply-single'><span class='seo-central-button-apply-single-text'><?php esc_html_e('Apply', 'seo-central-lite'); ?></span><span class='seo-central-button-apply-single-symbol'></span></button>
									</div>

									<div class="seo-central-metabox-ai-fields-row-item <?php echo esc_attr(($field['id'] == 'seo_central_meta_description') ? 'js-tips-description' : ''); ?><?php echo esc_attr(($field['id'] == 'seo_central_add_keyphrases') ? 'item-secondary' : ''); ?>">
										<?php $this->label( $field ); ?>
										<?php //$this->description( $field ); ?>
										<?php $this->field( $field ); ?>
									</div>
								</div>
							<?php endif; ?>
							<?php
						}
					?>
				</div>

				<div class="seo-central-metabox-columns-wrapper">
					<div class="form-table meta-table seo-central-metabox-column column-1" id="seo-central-metabox-ai-table" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Details', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body'>
							<?php
								foreach ( $this->config['fields'] as $field ) {
									?>
										<?php if (($field['id'] == 'seo_central_slug')) : ?>
											<div class="form-table-row">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php endif; ?>
									<?php
								}

								foreach ( $this->config3['fields'] as $field ) {
									?>
										<div class="form-table-row">
											<?php $this->label( $field ); ?>
											<div>
												<?php if ($field['type'] == 'image'): ?>
													<div class="seo-central-metabox-media-triggers">
														<button id='seo-central-media-trigger' class="seo-central-button-small seo-central-button-secondary"><?php esc_html_e('Choose File', 'seo-central-lite'); ?></button>
			
														<?php if ($this->value( $field )): ?>
															<button id='seo-central-media-remove' class="seo-central-remove-image"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button>
															<span class="seo-central-social-image-instruction"><?php esc_html_e('5 MB limit. Allowed types: jpg, jpeg, png', 'seo-central-lite'); ?></span>
														<?php else: ?>
															<button id='seo-central-media-remove' class="seo-central-remove-image disabled"><span class="seo-central-remove-image-close"></span><span class="seo-central-remove-image-file"></span></button>
															<span class="seo-central-social-image-instruction"><?php esc_html_e('5 MB limit. Allowed types: jpg, jpeg, png', 'seo-central-lite'); ?></span>
														<?php endif; ?>
			
													</div>
												<?php endif; ?>
												<?php $this->field( $field ); ?>
												<?php //$this->description( $field ); ?>
											</div>
										</div>
									<?php
								}

								foreach ( $this->config['fields'] as $field ) {
									?>
										<?php if (($field['id'] == 'seo_central_meta_cornerstone')) : ?>
											<div class="form-table-row cornerstone-format">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php endif; ?>
									<?php
								}
							?>
						</div>
					</div>

					<div class="form-table meta-table seo-central-metabox-column seo-central-search-preview column-2" id="seo-central-search-preview" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Social & Search Preview', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body search-preview-spacing'>
							<div class='table-live-previews'>
								<div class="form-table-row seo-central-google-wrapper">
									
									<div class='google-preview-type search-preview-spacing-item'>
										<input type="radio" name="google-social-card" id="google-social-card" value="true" checked="checked">		
										<label for="google-social-card"><?php esc_html_e('Social Card', 'seo-central-lite'); ?></label>

										<br>

										<input type="radio" name="google-preview-desktop" id="google-preview-desktop" value="false">		
										<label for="google-preview-desktop"><?php esc_html_e('Desktop', 'seo-central-lite'); ?></label>

										<br>

										<input type="radio" name="google-preview-mobile" id="google-preview-mobile" value="false">
										<label for="google-preview-mobile"><?php esc_html_e('Mobile', 'seo-central-lite'); ?></label>
										
									</div>

									<div class="social-card-wrapper active search-preview-spacing-item">
										<div class='social-card'>

											<?php if($this->value( $this->config3['fields'][0])): ?>
												<?php $img_url = esc_url($this->value( $this->config3['fields'][0])); ?>
											<?php else: ?>
												<?php $img_url = esc_url('/wp-content/plugins/seo-central-wp-lite/admin/src/images/seo-placeholder-image.png'); ?>
											<?php endif; ?>

											<?php if($this->value( $this->config3['fields'][1])): ?>
												<?php $social_title = esc_html($this->value( $this->config3['fields'][1])); ?>
											<?php elseif($this->value($this->config['fields'][0])): ?>
												<?php $social_title = esc_html($this->value($this->config['fields'][0])); ?>
											<?php else: ?>
												<?php $social_title = ''; ?>
											<?php endif; ?>

											<?php if($this->value( $this->config3['fields'][2])): ?>
												<?php $social_desc = esc_html($this->value( $this->config3['fields'][2])); ?>
											<?php elseif($this->value($this->config['fields'][1])): ?>
												<?php $social_desc = esc_html($this->value($this->config['fields'][1])); ?>
											<?php else: ?>
												<?php $social_desc = ''; ?>
											<?php endif; ?>

											<img src='<?php echo $img_url; ?>' alt='Meta Image' class='social-card-asset' width='530' height='310'/>
											<h3 class="social-card-title"><?php echo $social_title; ?></h3>
											<p class="social-card-description"><?php echo $social_desc; ?></p>
											<p class="social-card-origin"><span><?php echo esc_url(get_bloginfo('url')); ?></span><?php echo $this->google_breadcrumbs(); ?></p>

											</div>
									</div>

									<div class="google-preview-desktop-wrapper search-preview-spacing-item">

										<div class="google-preview-header">
											<img src='<?php echo esc_url(get_site_icon_url()); ?>' alt='favicon-asset' class='google-preview-image'>
											<div class='google-preview-header-content'>
												<p class='google-preview-header-content-site'> <?php echo esc_html(get_bloginfo('name')); ?></p>
												<p class='google-preview-header-content-crumbs'><span><?php echo esc_url(get_bloginfo('url')); ?></span><?php echo $this->google_breadcrumbs(); ?></p>
											</div>
										</div>

										<div class="google-preview-body">
											<div class='google-preview-link' href='<?php echo esc_url(get_bloginfo('url')); ?>'> <?php echo esc_html($this->value( $this->config['fields'][0])); ?></div>
											<p> <?php echo esc_html($this->value( $this->config['fields'][1])); ?></p>
										</div>

									</div>

									<div class="google-preview-mobile-wrapper search-preview-spacing-item">
										<div class="google-preview-header">
											<img src='<?php echo esc_url(get_site_icon_url()); ?>' alt='favicon-asset' class='google-preview-image'>
											<div class='google-preview-header-content'>
												<p class='google-preview-header-content-site'> <?php echo esc_html(get_bloginfo('name')); ?></p>
												<p class='google-preview-header-content-crumbs'><span><?php echo esc_url(get_bloginfo('url')); ?></span> <?php echo $this->google_breadcrumbs(); ?></p>
											</div>
										</div>

										<div class="google-preview-body">
											<div class='google-preview-link' href='<?php echo esc_url(get_bloginfo('url')); ?>'> <?php echo esc_html($this->value( $this->config['fields'][0])); ?></div>
											<p class='google-preview-mobile-bottom'> <?php echo esc_html($this->value( $this->config['fields'][1])); ?></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="form-table meta-table seo-central-metabox-column column-3" id="seo-central-social-display" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Internal Linking Suggestions', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body'>
							<p><?php esc_html_e('You need to do this because lorem ipusm and dolor geographica ignis orbis alum.', 'seo-central-lite'); ?></p>
							<div class="form-table-row">
								<label class="seo-central-label" for="seo_central_home_suggestion"><?php esc_html_e('Home', 'seo-central-lite'); ?></label>	

								<p id="seo_central_home_suggestion" class="seo-central-copy-input" data-link="/home"><?php esc_html_e('Home', 'seo-central-lite'); ?> <span class="seo-central-copy-button"></span></p>

								<label class="seo-central-label" for="seo_central_rand_suggestion"><?php esc_html_e('Some Page', 'seo-central-lite'); ?></label>			

								<p id="seo_central_rand_suggestion" class="seo-central-copy-input" data-link="/some-page"><?php esc_html_e('Some Page', 'seo-central-lite'); ?> <span class="seo-central-copy-button"></span></p>
							</div>
						</div>
					</div>

					<div class="form-table meta-table seo-central-metabox-column column-4" id="seo-central-metabox-ai-table" role="presentation">
						<div class='seo-central-metabox-column-header'>
							<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Analysis', 'seo-central-lite'); ?></p>
						</div>
						<div class='seo-central-metabox-column-body'>

							<div class="seo-central-page-score svg-wrapper">
								<svg class="overlay-svg" viewBox="0 0 180 160">
									<path
										data-last-score="0"
										data-initial-load="true"
										class="overlay-circle"
										d="M90 2.00006C138.829 2.00005 178 37.1368 178 80.0001C178 122.863 138.829 158 90 158C41.171 158 2 122.863 2 80.0001C1.99999 37.1368 41.171 2.00006 90 2.00006Z"
										fill="none"
										stroke="#23af7c"
										stroke-width="4"
										stroke-dasharray="0"
									/>
									<text x="50%" y="55" class="percent-title" text-anchor="middle"><?php esc_html_e('Central Score', 'seo-central-lite'); ?></text>
									<text x="50%" y="90" class="percentage" text-anchor="middle">0</text>
									<text x="50%" y="115" class="percent-result" text-anchor="middle"><?php esc_html_e('Excellent!', 'seo-central-lite'); ?></text>
								</svg>

								<svg class="underlay" viewBox="0 0 180 160">
									<path
										class="underlay-circle"
										d="M90 2.00006C138.829 2.00005 178 37.1368 178 80.0001C178 122.863 138.829 158 90 158C41.171 158 2 122.863 2 80.0001C1.99999 37.1368 41.171 2.00006 90 2.00006Z"
										fill="none"
										stroke="#DAE0DC"
										stroke-width="4"
										stroke-dasharray="525"
									/>
								</svg>
							</div>

							<div class='seo-central-analysis-wrapper warnings-errors hidden'>

							</div>	

							<div class="seo-central-analysis-scores-dropdown success hidden">
								<div class="seo-central-analysis-scores-dropdown-header">
									<p class='seo-central-analysis-scores-dropdown-header-description'><?php esc_html_e('Show good results', 'seo-central-lite'); ?></p>
									<div class='seo-central-analysis-scores-dropdown-header-collapse-arrow'></div>
								</div>
								<div class="seo-central-analysis-scores-dropdown-body close"></div>
							</div>

							<?php
								foreach ( $this->config4['fields'] as $field ) {
									?>
										<div class="form-table-row seo-central-analysis-hidden">

											<?php $this->label( $field ); ?>

											<?php $this->field( $field ); ?>

											<?php //$this->description( $field ); ?>

										</div>
									<?php
								}
							?>

						</div>
					</div>
				</div>

				<div class="seo-central-boring-stuff">

					<div class="seo-central-boring-stuff-header">
						<div class="seo-central-boring-stuff-header-content">
							<h3 class='seo-central-boring-stuff-header-title'><?php esc_html_e('The Boring Stuff', 'seo-central-lite'); ?></h3>
							<p class='seo-central-boring-stuff-header-description'><?php esc_html_e('Page Hierarchy, Robots, Schema', 'seo-central-lite'); ?></p>
						</div>
						<div class='form-table-collapse-arrow'></div>
					</div>

					<div class="seo-central-boring-stuff-body">


						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-content-hierarchy" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Page Hierarchy', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								<div class='seo-central-hierarchy'>
									<div class='seo-central-hierarchy-wrapper js-content-hierarchy'>
										<!-- <h3 class='seo-central-hierarchy-title'>Page Content Hierarchy</h3> -->
									</div>
								</div>
							</div>
						</div>

						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-robots" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Robots', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								
								<?php

									foreach ( $this->config5['fields'] as $field ) {
										?>
											<div class="seo-central-metabox-robot-row">
												<?php $this->label( $field ); ?>
												<?php //$this->description( $field ); ?>
												<?php $this->field( $field ); ?>
											</div>
										<?php
									}

								?>							

							</div>
						</div>

						<div class="form-table meta-table seo-central-metabox-column" id="seo-central-schemas" role="presentation">
							<div class='seo-central-metabox-column-header'>
								<p class='seo-central-metabox-column-header-row-title'><?php esc_html_e('Schema', 'seo-central-lite'); ?></p>
							</div>
							<div class='seo-central-metabox-column-body'>
								
								<?php
									foreach ( $this->config2['fields'] as $field ) {
										?>
											<div class="form-table-row seo-central-metabox-schemas">
												<div class="seo-central-metabox-schema-item">
													<?php $this->label( $field ); ?>
													<?php //$this->description( $field ); ?>
													<?php $this->field( $field ); ?>
												</div>
											</div>
										<?php
									}
								?>							

							</div>
						</div>

					</div>
				</div>

			</div>

			<svg preserveAspectRatio="none" class="driver-overlay driver-overlay-animated seo-central-custom-driver" viewBox="0 0 1370 2032.375" xmlspace="preserve" xmlnsxlink="http://www.w3.org/1999/xlink" version="1.1" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; z-index: 10000; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%;"><path d="M1370,0L0,0L0,2032.375L1370,2032.375L1370,0Z
                            M84,28 h248 a5,5 0 0 1 5,5 v58 a5,5 0 0 1 -5,5 h-248 a5,5 0 0 1 -5,-5 v-58 a5,5 0 0 1 5,-5 z" style="fill: white; opacity: 0.7; pointer-events: auto; cursor: auto;"></path></svg>
		</div>
		<?php
	}

	public function seo_central_metabox_notifications() {
    $notification_type = get_option('seo_central_notification');
		$notification_class ='central-blue icon-alert';
    $notification_text = '';
    $button_text = '';

    if ($notification_type === 'free') {
        $notification_text = __("Enjoying Central Cloud? The Pro version offers page optimization across your entire site! Imagine SEO Central power times ten. Purchase the annual plan and you'll qualify for our discounted Early Bird rate. Subscribe today!", 'seo-central-lite');
        $button_text = __('Upgrade to Pro', 'seo-central-lite');
    } elseif ($notification_type === 'invalid_domain') {
        $notification_text = __("Invalid domain! Please check your input or try another domain.", 'seo-central-lite');
				$notification_class ='central-red icon-error';
    } elseif ($notification_type === 'invalid_key') {
        $notification_text = __("This is not the API key we are looking for! Please go back to the dashboard and resubmit.", 'seo-central-lite');
				$notification_class ='central-red icon-error';
    } elseif ($notification_type === 'expired_key') {
        $notification_text = __("Uh oh! Your Pro Subscription has expired. Resubscribe to keep SEOing.", 'seo-central-lite');
        $button_text = __('Renew Pro', 'seo-central-lite');
				$notification_class ='central-red icon-error';
    } elseif ($notification_type === 'no_key') {
        $notification_text = __("To Access all SEO Central page optimization features a valid API Key must be saved.", 'seo-central-lite');
				$notification_class ='central-red icon-warning';
    }

    if (!empty($notification_text)) {
        ?>
        <div class='seo-central-notification-wrapper metabox-notification enabled <?php echo esc_attr($notification_class); ?>'>
            <p class='seo-central-notification'><span class='seo-central-notification-icon'></span>
                <span class='seo-central-notification-text'><?php echo esc_html($notification_text); ?></span>
            </p>
						<?php if (!empty($button_text)): ?>
            	<a href="https://app.seocentral.ai/?redirect=/dashboard/add-site" class='seo-central-button-upgrade alternate-colors'><?php echo esc_html($button_text); ?></a>
						<?php endif; ?>
        </div>
        <?php
    }
	}

	private function label( $field ) {
		//Get the description and setup translation
		$description = esc_html__( $field['description'], 'seo-central-lite' );
		switch ( $field['type'] ) {
			case 'editor':
				echo '<div class="seo-central-label">' . esc_html__($field['label'], 'seo-central-lite') . '<span class="seo-central-tooltip"><span class="seo-central-tooltip-text tooltip-right tooltip-mobile">' . $description . '</span></span></div>';
				break;
			default:
				printf(
					'<label class="seo-central-label" for="%s">%s <span class="seo-central-tooltip"><span class="seo-central-tooltip-text tooltip-right tooltip-mobile">' . $description . '</span></span></label>',
					esc_attr($field['id']), esc_html($field['label'])
				);
		}
	}

	private function field( $field ) {
		switch ( $field['type'] ) {
			case 'editor':
				$this->editor( $field );
				break;
			case 'select':
				$this->selector( $field );
				break;
			case 'keyphrases':
				$this->keyPhrases( $field );
				break;
			case 'textarea':
				$this->textArea( $field );
				break;
			case 'slug':
				$this->slug( $field );
				break;
			case 'image':
				$this->image( $field );
				break;
			case 'radio':
				$this->radio( $field );
				break;
			default:
				$this->input( $field );
		}
	}

	/**
	 * Set up the 'wysiwyg' field for seo central plugin
	 * EX: { "type": "editor", "label": "Editor", "default": "", "rows": "3", "teeny": "1", "id": "seo_central_editor", "description": "" }
	 * 
	*/
	private function editor( $field ) {
		wp_editor( $this->value( $field ), $field['id'], [
			'wpautop' => isset( $field['wpautop'] ) ? true : false,
			'media_buttons' => isset( $field['media-buttons'] ) ? true : false,
			'textarea_name' => $field['id'],
			'textarea_rows' => isset( $field['rows'] ) ? isset( $field['rows'] ) : 20,
			'teeny' => isset( $field['teeny'] ) ? true : false
		] );
	}

	/**
	 * Set up the dropdown selector field for seo central plugin
	 * EX: { "type":"select", "label":"Select", "id":"seo_central_select", "choices": {"enabled":"Enabled","disabled":"Disabled"}, "description": "" }
	 * 
	*/
	private function selector( $field ) {
		$options = '';
		$post_type = $this->getCurrentPostType(); //Retrieve the post type of the current page to get the post type settings field

		$default_page_schema = get_option("seo_central_setting_{$post_type}_page_schema_field");
		$default_post_schema = get_option("seo_central_setting_{$post_type}_post_schema_field");

		if($field['id'] == 'seo_central_page_type') {

			// If the Page/Article Schema is empty then we need to populate with site basics or Post type selection
			if($this->value($field) == '' || $this->value($field) == null || $this->value($field) == 'undefined'){
				foreach ( $field['choices'] as $key => $choice ) {
					if($default_page_schema == $key){
						$options = $options . '<option value="'. esc_attr( $key ) . '" selected="selected" data-i="0">'. esc_html( $choice ) . '</option>';
					}
					else {
						$options = $options . '<option value="'. esc_attr( $key ) . '">'. esc_html( $choice ) . '</option>';
					}
				}	
			}
			else { //Else only update with the selected values for this page
				foreach ( $field['choices'] as $key => $choice ) {
					if($this->value($field) == $key){
						$options = $options . '<option value="'. esc_attr( $key ) . '" selected="selected" data-i="0">'. esc_html( $choice ) . '</option>';
					}
					else {
						$options = $options . '<option value="'. esc_attr( $key ) . '">'. esc_html( $choice ) . '</option>';
					}
				}		
			}

		}
		else if($field['id'] == 'seo_central_article_type') {

			// If the Page/Article Schema is empty then we need to populate with site basics or Post type selection
			if($this->value($field) == '' || $this->value($field) == null || $this->value($field) == 'undefined'){
				foreach ( $field['choices'] as $key => $choice ) {
					if($default_post_schema == $key){
						$options = $options . '<option value="'. esc_attr( $key ) . '" selected="selected" data-i="0">'. esc_html( $choice ) . '</option>';
					}
					else {
						$options = $options . '<option value="'. esc_attr( $key ) . '">'. esc_html( $choice ) . '</option>';
					}
				}	
			}
			else { //Else only update with the selected values for this page
				foreach ( $field['choices'] as $key => $choice ) {
					if($this->value($field) == $key){
						$options = $options . '<option value="'. esc_attr( $key ) . '" selected="selected" data-i="0">'. esc_html( $choice ) . '</option>';
					}
					else {
						$options = $options . '<option value="'. esc_attr( $key ) . '">'. esc_html( $choice ) . '</option>';
					}
				}		
			}

		}
		else { //Any other select field type that gets added
			foreach ( $field['choices'] as $key => $choice ) {
				if($this->value($field) == $key){
					$options = $options . '<option value="'. esc_attr( $key ) . '" selected="selected" data-i="0">'. esc_html( $choice ) . '</option>';
				}
				else {
					$options = $options . '<option value="'. esc_attr( $key ) . '">'. esc_html( $choice ) . '</option>';
				}
			}	
		}



		printf(
			'<select class="seo-central-select seo-dropdown-list %s" id="%s" name="%s" %s type="%s" value="%s">' . $options . '</select>',
			esc_attr(isset($field['class']) ? $field['class'] : ''),
			esc_attr($field['id']), esc_attr($field['id']),
			isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
			esc_attr($field['type']),
			esc_attr($this->value($field))
		);
	}

	/**
	 * Set up the dropdown selector field for seo central plugin
	 * EX: { "type":"radio", "label":"Radio", "id":"seo_central_radio", "description": "" }
	 * 
	*/
	private function radio( $field ) {
		$value = $this->value( $field );
		$isYesChecked = (empty($value) || is_null($value) || $value === 'yes') ? 'checked' : '';
		$isNoChecked = ($value === 'no') ? 'checked' : '';
		$yesLabel = esc_html__('Yes', 'seo-central-lite');
    $noLabel = esc_html__('No', 'seo-central-lite');
		
		printf(
			'<div class="seo-central-radio-item"><label for="%s_yes">' . $yesLabel . '</label>
			<input class="seo-central-radio-input %s" id="%s_yes" name="%s" type="radio" value="yes" %s %s></div>
			<div class="seo-central-radio-item"><label for="%s_no">' . $noLabel . '</label>
			<input class="seo-central-radio-input %s" id="%s_no" name="%s" type="radio" value="no" %s %s></div>',
			esc_attr($field['id']),
			esc_attr(isset($field['class']) ? $field['class'] : ''),
			esc_attr($field['id']), esc_attr($field['id']),
			$isYesChecked,
			isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
			esc_attr($field['id']),
			esc_attr(isset($field['class']) ? $field['class'] : ''),
			esc_attr($field['id']), esc_attr($field['id']),
			$isNoChecked,
			isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : ''
		);
	}

  //<textarea id="w3review" name="w3review" rows="4" cols="50">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.</textarea>

	/**
	 * Set up the dropdown selector field for seo central plugin
	 * EX: { "type":"textarea", "label":"Meta Description", "id":"seo_central_meta_descritpion", "description": "Meta description of the page." }
	 * 
	*/
	private function textArea( $field ) {

		if($field['id'] == 'seo_central_meta_title') {
			$post_type = $this->getCurrentPostType(); //Retrieve the post type of the current page to get the post type settings field
			$default_title = get_option("seo_central_setting_{$post_type}_title_field");
			$dashboard_variables = preg_split ("/\,/", $default_title);
			$variable_results = '';

			// Loop through the dashboard variables
			foreach ($dashboard_variables as $variable) {
				$dashboard_field = '';

				// Check for the set variables that can be applied. Utilize the site or field value tied to each variable
				switch (true) {
					case strpos($variable, 'Site Title') !== false:
							$dashboard_field = get_bloginfo('name');
							break;
					case strpos($variable, 'Page Title') !== false:
							$dashboard_field = get_the_title();
							break;
					case strpos($variable, 'Separator') !== false:
							$dashboard_field = get_option("seo_central_setting_crumbseparator");
							break;
					case strpos($variable, 'Primary Keyword') !== false:

							//Check if the primary keyword field has a value else keep this empty
							if($this->value($this->config['fields'][2])) {
								$dashboard_field = $this->value($this->config['fields'][2]);
							}
							else {
								$dashboard_field = '';
							}
							break;
					default:
							$dashboard_field = $variable; //If set as emoji or random text just include it to the field value
				}

				$variable_results .= ' ' . $dashboard_field;
			}

			$value = ($this->value($field) == '' || $this->value($field) == null || $this->value($field) == 'undefined') ? $variable_results : $this->value($field);
			printf(
				'<textarea class="seo-central-text-area seo-text-area %s" id="%s" name="%s" %s type="%s" rows="4" cols="50">%s</textarea>',
				esc_attr( isset($field['class']) ? $field['class'] : '' ),
				esc_attr( $field['id'] ), $esc_attr( $field['id'] ),
				isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
				esc_attr( $field['type'] ),
				esc_textarea( $value )
			);
		}
		else if ($field['id'] == 'seo_central_meta_description' || $field['id'] == 'seo_central_social_description') {
			//Check for both the meta description and social description fields (Apply default text from dashboard if populated)
			$post_type = $this->getCurrentPostType(); //Retrieve the post type of the current page to get the post type settings field
			$suffix = ($field['id'] == 'seo_central_meta_description') ? 'description_field' : 'social_description_field';
			$default_social_description = get_option("seo_central_setting_{$post_type}_{$suffix}");
	
			$value = $this->value($field);
			if ($value == '' || $value == null || $value == 'undefined') {
					$value = $default_social_description;
			}
	
			printf(
					'<textarea class="seo-central-text-area seo-text-area %s" id="%s" name="%s" %s type="%s" rows="4" cols="50">%s</textarea>',
					esc_attr( isset($field['class']) ? $field['class'] : '' ),
					esc_attr( $field['id'] ), $esc_attr( $field['id'] ),
					isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
					esc_attr( $field['type'] ),
					esc_textarea( $value )
			);
		}
		else {

			printf(
				'<textarea class="seo-central-text-area seo-text-area %s" id="%s" name="%s" %s type="%s" rows="4" cols="50">'. $this->value( $field ) . '</textarea>',
				esc_attr( isset($field['class']) ? $field['class'] : '' ),
				esc_attr( $field['id'] ), esc_attr( $field['id'] ),
				isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
				esc_attr( $field['type'] ),
				esc_textarea( $this->value( $field ) )
			);
		}

	}

	/**
	 * Set up the dropdown selector field for seo central plugin
	 * EX: { "type":"keyphrases", "label":"Addtional Phrases", "id":"seo_central", "description": "" }
	 * 
	*/
	private function keyPhrases( $field ) {

		$phrases = $this->value( $field );
		$phrase_array = explode(",",$phrases);
		$items = '';

		foreach ( $phrase_array as $phrase ) {
			if($phrase != ''){
				$items = $items . '<span class="seo-central-keyphrase-item seo-keyphrase-item" contenteditable="true" value="'. esc_attr( $phrase ) . '">'. esc_html( $phrase ) . '</span>';
			}
		}

		//Free version secondary keyword field is disabled and un-editable
		if (!defined('SEO_CENTRAL_PRO') || !SEO_CENTRAL_PRO) {
			printf(
				'<div contenteditable="false" tabindex="-1" class="seo-central-secondary-keyphrases seo-keyphrases-wrapper seo-central-keyphrases-wrapper main-secondary-phrases"><input class="regular-text regular-keyphrases %s" id="%s" name="%s" %s type="%s" value="%s">'. $items .'</div>',
				isset( $field['class'] ) ? $field['class'] : '',
				esc_attr( $field['id'] ), esc_attr( $field['id'] ),
				isset( $field['pattern'] ) ? "pattern='" . esc_attr( $field['pattern'] ) . "'" : '',
				esc_attr( $field['type'] ),
				esc_attr( $this->value( $field ) )
			);
		}
		else if(defined('SEO_CENTRAL_PRO') || SEO_CENTRAL_PRO) {
			printf(
				'<div contenteditable="true" class="seo-central-secondary-keyphrases seo-keyphrases-wrapper seo-central-keyphrases-wrapper main-secondary-phrases"><input class="regular-text regular-keyphrases %s" id="%s" name="%s" %s type="%s" value="%s">'. $items .'</div>',
				isset( $field['class'] ) ? $field['class'] : '',
				esc_attr( $field['id'] ), esc_attr( $field['id'] ),
				isset( $field['pattern'] ) ? "pattern='" . esc_attr( $field['pattern'] ) . "'" : '',
				esc_attr( $field['type'] ),
				esc_attr( $this->value( $field ) )
			);
		}

	}

	private function slug( $field ) {

		//Store post slug on the initial load
		global $post;
		$slug = '';

		if($this->value( $field ) === '') {
			$slug = $post->post_name;
		}

		printf(
			'<input class="seo-central-text-input regular-text %s" id="%s" name="%s" %s type="%s" value="' . esc_attr($slug) .' %s">',
			isset( $field['class'] ) ? esc_attr( $field['class'] ) : '',
			esc_attr( $field['id'] ), esc_attr( $field['id'] ),
			isset( $field['pattern'] ) ? "pattern='" . esc_attr( $field['pattern']) . "'" : '',
			esc_attr( $field['type'] ),
			esc_attr( $this->value( $field ) )
		);
	}

	private function image( $field ) {

		printf(
			'<input class="seo-central-social-image-input %s" id="%s" name="%s" %s type="text" value="%s">',
			esc_attr(isset($field['class']) ? $field['class'] : ''),
			esc_attr($field['id']), esc_attr($field['id']),
			isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
			esc_attr($this->value($field))
		);
	}


	private function input( $field ) {

		if($field['type'] == 'checkbox') {
			// var_dump($this->value( $field ));
			$checkbox_value = '';
			$toggle_class = '';
			if(!$this->value( $field )) {
				$checkbox_value = 'none';
			}
			else if($this->value( $field ) == 'cornerstone') {
				$toggle_class = 'cornerstone';
			}

			printf(
				'<div class="seo-central-checkbox-toggle regular-checkbox ' . esc_attr($toggle_class) . '"></div><input class="seo-central-checkbox-toggle-value regular-checkbox-value %s" id="%s" name="%s" %s type="text" value="%s' . esc_attr($checkbox_value) . '">',
				isset($field['class']) ? esc_attr($field['class']) : '',
				esc_attr($field['id']), esc_attr($field['id']),
				isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
				// $field['type'],
				esc_attr($this->value($field))
			);
		}
		else {

			if($field['id'] == 'seo_central_social_title') {
				$post_type = $this->getCurrentPostType(); //Retrieve the post type of the current page to get the post type settings field
				$default_social_title = get_option("seo_central_setting_{$post_type}_social_title_field");
				$dashboard_variables = preg_split ("/\,/", $default_social_title);
				$variable_results = '';

				// Loop through the dashboard variables
				foreach ($dashboard_variables as $variable) {
					$dashboard_field = '';

					// Check for the set variables that can be applied. Utilize the site or field value tied to each variable
					switch (true) {
						case strpos($variable, 'Site Title') !== false:
								$dashboard_field = get_bloginfo('name');
								break;
						case strpos($variable, 'Page Title') !== false:
								$dashboard_field = get_the_title();
								break;
						case strpos($variable, 'Separator') !== false:
								$dashboard_field = get_option("seo_central_setting_crumbseparator");
								break;
						case strpos($variable, 'Primary Keyword') !== false:

								//Check for primary keyword within fields
								if($this->value($this->config['fields'][2])) {
									$dashboard_field = $this->value($this->config['fields'][2]);
								}
								else {
									$dashboard_field = '';
								}
								break;
						default:
								$dashboard_field = $variable; //If set as emoji or random text just include it to the field value
					}

					$variable_results .= ' ' . $dashboard_field;
				}

				$value = ($this->value($field) == '' || $this->value($field) == null || $this->value($field) == 'undefined') ? $variable_results : $this->value($field);
				printf(
						'<input class="seo-central-text-input regular-text %s" id="%s" name="%s" %s type="%s" value="%s">',
						isset($field['class']) ? esc_attr($field['class']) : '',
						esc_attr($field['id']), esc_attr($field['id']),
						isset($field['pattern']) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
						esc_attr($field['type']),
						esc_attr($value)
				);

			}
			else {

				printf(
					'<input class="seo-central-text-input regular-text %s" id="%s" name="%s" %s type="%s" value="%s">',
					isset( $field['class'] ) ? esc_attr($field['class']) : '',
					esc_attr($field['id']), esc_attr($field['id']),
					isset( $field['pattern'] ) ? "pattern='" . esc_attr($field['pattern']) . "'" : '',
					esc_attr($field['type']),
					esc_attr($this->value( $field ))
				);
			}
		}
	}

  private function description( $field ) {
		// printf(
		// 	'<span class="seo-central-label-description regular-description-text %s" id="description-%s" name="%s" type="">%s',
		// 	isset( $field['class'] ) ? $field['class'] : '',
		// 	$field['id'], $field['id'],
		// 	$field['description']
		// );
	}

	private function value( $field ) {
		global $post;
		if($post != null)  {

			if ( metadata_exists( 'post', $post->ID, $field['id'] ) ) {
				$value = get_post_meta( $post->ID, $field['id'], true );
			} else if ( isset( $field['default'] ) ) {
				$value = $field['default'];
			} else {
				return '';
			}
			return str_replace( '\u0027', "'", $value );
		}
	}

	//Google Preview Breadcrumbs 
	public function google_breadcrumbs() {
		//Get the canonical url and strip apart the tags and return
		$page_url = wp_get_canonical_url();

		$url_split = parse_url($page_url);

		//Return Breadcrumbs
		if($url_split['path'] != '/'){
			$url_array = explode("/", $url_split['path']);
			$path_array = array_filter($url_array);
			$len = count($path_array);
			$splitter = ' › ';
			$crumbs_final = ' › ';
			$crumbs = '';
			
			foreach($path_array as $key=>$value) {
				
				if ($key >= $len) {
					$crumbs .= $value;
				}
				else {
					$crumbs .= $value . $splitter;
				}

			}

			$crumbs_final .= $crumbs;
			return $crumbs_final; 
		}
		else {
			return '';
		}

	}

	public function postTypeResults() {
		$args = array(
			'public'   => true
		);
		
		$output = 'names'; // names or objects, note names is the default
		$operator = 'and'; // 'and' or 'or'
		
		$post_types = get_post_types( $args, $output, $operator ); 
		$post_items = "";

		foreach( $post_types  as $key => $post_type ) {

			if($post_type != "attachment") {
				$post_items .= '"' . $post_type . '",';
			}
		}

    // remove the last comma
    $post_items = rtrim($post_items, ',');

		return $post_items;
	}

	public function getCurrentPostType() {
    global $post;

    if (isset($post)) {
        return get_post_type($post);
    }
    return null;
	}

}

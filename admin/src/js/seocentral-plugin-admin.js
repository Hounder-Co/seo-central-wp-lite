import '../css/seocentral-plugin-admin.css';
import 'jquery-sortablejs';
import "driver.js/dist/driver.css";
import {googlePreviews} from '../js/seocentral-google-preview.js'; 
import {contentHierarchy} from '../js/seocentral-page-analysis.js';
import {updateScoreOnInput} from '../js/seocentral-page-analysis.js';
import {seocentralSettings} from '../js/seocentral-settings.js';
import {moveNotifications} from '../js/seocentral-settings.js';
import {metaboxDropdown} from '../js/seocentral-metabox.js';
import {isMetaboxInViewport} from '../js/seocentral-metabox.js';
import {pageAnalysis} from '../js/seocentral-page-analysis.js';

(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practicing this, we should strive to set a better example in our own work.
	 */
	$( window ).load(function() {
		//If the seo central score column is clicked check for the metabox id and scroll into the element
    if (window.location.hash === "#seo-central") {
			// Wait a bit to ensure the metabox has loaded
			setTimeout(function() {
					const mainMetabox = document.getElementById('seo-central');
					if (mainMetabox) {
							mainMetabox.scrollIntoView({ behavior: 'smooth' });
							// Check if the metabox is in the viewport after scrolling
							setTimeout(function() {
									if (!isMetaboxInViewport($, mainMetabox)) {
											mainMetabox.scrollIntoView({ behavior: 'smooth' });
									}
							}, 1000); // 1-second delay to allow for the scroll to finish
					}
			}, 500);
		}

		//On load update the meta title value if its empty
		if($('#seo_central_meta_title').val() === "") {
			$('#seo_central_meta_title').val($('#title').val());
		}

		// On load udpate the meta Description if value is empty and stringbody returns with content
		if ($('#seo_central_meta_description').val() === "") {
			var stringbody = myThemeParams.body['stringbody'];

			if (stringbody.length > 1) {
					var sentences = stringbody.match(/[^\.!\?©]+[\.!\?©]+/g);
					var metaDescription = "";
					console.log(sentences);

					if(sentences != null) {
						for(var i = 0; i < sentences.length; i++){
								if (sentences[i].length <= 160) {
										metaDescription = sentences[i];
										break;
								} else if (sentences[i].length > 160) {
										metaDescription = sentences[i].substring(0, 160);
										metaDescription = metaDescription.trim();
										if (metaDescription[metaDescription.length - 1] !== '.') {
												metaDescription += '.';
										}
										break;
								}
						}

						// Remove the copyright symbol from metaDescription
						metaDescription = metaDescription.replace(/©/g, '');

						$('#seo_central_meta_description').val(metaDescription);
					}
					else {
						$('#seo_central_meta_description').val(stringbody);
					}
			}
		}

		//Google Preview and Social Card Setup
		googlePreviews( $ );
		
		//Page Analysis functionality and hidden fields (lite version does not check for secondary keywords a disabled field)
		if(!myThemeParams['pro_analysis']) {
			pageAnalysis( $ );
		}
		
		//Settings page functionality
		seocentralSettings( $ );
		
		//Content Hierarchy 
		contentHierarchy( $ );
		
		//Update the seo score on completion of input fields
		//Pro install will have its onw updating function
		if(!myThemeParams['pro_analysis']) {
			updateScoreOnInput( $ );
		}
		
		// Collapse and open function for all dropdowns within the metabox. Pass Table Header, Header Arrow, and Table Body. 
		metaboxDropdown( $, $('.seo-central-boring-stuff-header')[0], $('.form-table-collapse-arrow')[0], $('.seo-central-boring-stuff-body')[0]);
		metaboxDropdown( $, $('.seo-central-analysis-scores-dropdown-header')[0], $('.seo-central-analysis-scores-dropdown-header-collapse-arrow')[0], $('.seo-central-analysis-scores-dropdown-body')[0]);
		
		//On load move the notifications to the proper partial for out pages
		moveNotifications( $ );
		
		//Cornerstone Checkbox value save (Store the value into the checkbox input based on toggle)
		if($('#seo_central_meta_cornerstone')) {

			$('.seo-central-checkbox-toggle.regular-checkbox').click(function(){
				// $('#seo_central_meta_cornerstone').val();
				if($('#seo_central_meta_cornerstone').val() === 'cornerstone'){
					$('#seo_central_meta_cornerstone').val('none');

					if($('.seo-central-checkbox-toggle.regular-checkbox').hasClass('cornerstone')) {
						$('.seo-central-checkbox-toggle.regular-checkbox').removeClass('cornerstone');
					} 
				}
				else if($('#seo_central_meta_cornerstone').val() === 'none') {
					$('#seo_central_meta_cornerstone').val('cornerstone');

					if(!$('.seo-central-checkbox-toggle.regular-checkbox').hasClass('cornerstone')) {
						$('.seo-central-checkbox-toggle.regular-checkbox').addClass('cornerstone');
					} 
				}

				return false;
			});
		}
	});
	
})( jQuery );

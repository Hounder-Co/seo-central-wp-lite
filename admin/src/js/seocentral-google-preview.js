//Google Preview and Social Card Setup
export function googlePreviews( $ ) {
  'use strict';

	//Set this variable up for translation of strings
	const { __ } = wp.i18n;

		if($('#google-social-card') && $('#google-preview-desktop') && $('#google-preview-mobile')) {
			$('#google-social-card').change(function(){

				//Disable desktop and mobile previews
				$('#google-preview-mobile')[0].checked = false;
				$('#google-preview-desktop')[0].checked = false;

				//Update the desktop and mobile wrappers based off of selected radio button
				if($('.google-preview-mobile-wrapper')[0].classList.contains('active')) {
					$('.google-preview-mobile-wrapper')[0].classList.remove('active');
					$('.social-card-wrapper')[0].classList.add('active');
				}

				//Disable the google desktop and mobile previews 
				if($('.google-preview-desktop-wrapper')[0].classList.contains('active')) {
					$('.google-preview-desktop-wrapper')[0].classList.remove('active');
					$('.social-card-wrapper')[0].classList.add('active');
				}

				return false;
			});

			$('#google-preview-desktop').change(function(){

				//If true then set mobile and social card to false
				$('#google-preview-mobile')[0].checked = false;
				$('#google-social-card')[0].checked = false;

				//Update the desktop and mobile wrappers based off of selected radio button
				if($('.google-preview-mobile-wrapper')[0].classList.contains('active')) {
					$('.google-preview-mobile-wrapper')[0].classList.remove('active');
					$('.google-preview-desktop-wrapper')[0].classList.add('active');
				}

				//disable social card for the google previews
				if($('.social-card-wrapper')[0].classList.contains('active')) {
					$('.social-card-wrapper')[0].classList.remove('active');
					$('.google-preview-desktop-wrapper')[0].classList.add('active');
				}

				return false;
			});

			$('#google-preview-mobile').change(function(){

				//If this is set to true then set desktop to false;
				$('#google-preview-desktop')[0].checked = false;
				$('#google-social-card')[0].checked = false;

				//Update the desktop and mobile wrappers based off of selected radio button
				if($('.google-preview-desktop-wrapper')[0].classList.contains('active')) {
					$('.google-preview-desktop-wrapper')[0].classList.remove('active');
					$('.google-preview-mobile-wrapper')[0].classList.add('active');
				}

				//disable social card for the google previews
				if($('.social-card-wrapper')[0].classList.contains('active')) {
					$('.social-card-wrapper')[0].classList.remove('active');
					$('.google-preview-mobile-wrapper')[0].classList.add('active');
				}

				return false;
			});

			if($('#seo_central_social_image')) {
				$('#seo-central-media-trigger').click(function(){

					var upload = wp.media({
						title:'Choose Image', //Title for Media Box
						multiple:false, //For limiting multiple image
						library: {
							type: ['image'] // this will only allow image types
						}
						})
						.on('select', function(){
								var select = upload.state().get('selection');
								var attach = select.first().toJSON();
								var fileType = attach.subtype; // Get the file type of the selected attachment
								//console.log(attach.id); //the attachment id of image
								//console.log(attach.url); //url of image
								// jQuery('img#img-upload').attr('src',attach.url);
								// $('#seo_central_social_image').val(attach.url);

								// Check if the selected file is an image
								if (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
									$('#seo-central-metabox-ai-table input[name=seo_central_social_image]').val(attach.url);
	
									if($('#seo-central-media-remove').hasClass('disabled')) {
										$('#seo-central-media-remove').removeClass('disabled');
	
										$('.seo-central-remove-image-file').html(attach.filename);
										
										if(!$('.seo-central-social-image-instruction').hasClass('hidden')) {
											$('.seo-central-social-image-instruction').addClass('hidden')
										}
									}
									else {
										$('.seo-central-remove-image-file').html(attach.filename);
	
										if(!$('.seo-central-social-image-instruction').hasClass('hidden')) {
											$('.seo-central-social-image-instruction').addClass('hidden')
										}
									}
									
									//Apply the new value to the social card asset 
									if($('#seo_central_social_image').val()) {
										//console.log($('#seo_central_social_image').val())
										$('.social-card-asset').attr("src",$('#seo_central_social_image').val());
										$('#seo-central-media-trigger').html(__( 'Choose another file', 'seo-central-lite' ));
									}
								} 
								else {
									// alert('Please select an image file (.jpeg, .png, .gif). Videos and other file types are not allowed.');
									return false; // Prevent other file types from being processed
								}

						})
						.open();

					return false;
				});

				if($('#seo-central-media-remove')[0]) {
					
					$('#seo-central-media-remove').click(function(){
						//Disable the button from reloading the page
						return false;
					});

					//Social Image selection update
					$('.seo-central-remove-image-close').click(function(){
						$('#seo-central-tabs input[name=seo_central_social_image]').val('');
						$('.social-card-asset').attr("src",'/wp-content/plugins/seo-central/admin/src/images/seo-placeholder-image.png');

						// Remove the value from the social image field
						$('#seo_central_social_image').val('');
	
						if(!$('#seo-central-media-remove').hasClass('disabled')) {
							$('#seo-central-media-remove').addClass('disabled');
						}

						$('#seo-central-media-trigger').html(__( 'Choose file', 'seo-central-lite' ));

						if($('.seo-central-social-image-instruction').hasClass('hidden')) {
							$('.seo-central-social-image-instruction').removeClass('hidden')
						}
	
						return false;
					});
	
					//On Load display the current file name from social card if one is saved already
					if(!$('#seo-central-media-remove').hasClass('disabled')) {
						var socialImage = $('.social-card-asset').attr('src');
						var filename = socialImage.split('/').pop();
						$('.seo-central-remove-image-file').html(filename);
						$('#seo-central-media-trigger').html(__( 'Choose another file', 'seo-central-lite' ) );
					}
				}
			}

			if($('#seo_central_social_title')[0] && $('#seo_central_social_description')[0]) {
				//Live update social card's description and title on change
				$('.social-card-title')[0].innerHTML = $('#seo_central_social_title').val();
				$('#seo_central_social_title').on('input',function(e){
					$('.social-card-title')[0].innerHTML = $('#seo_central_social_title').val();
				});
	
				//Live update social card's description and title on change
				$('.social-card-description')[0].innerHTML = $('#seo_central_social_description').val();
				$('#seo_central_social_description').on('input',function(e){
					$('.social-card-description')[0].innerHTML = $('#seo_central_social_description').val();
				});
			}
		}
}
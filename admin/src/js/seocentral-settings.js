import 'jquery-sortablejs';
import { NativeRenderer } from 'picmo';
import { createPopup } from '@picmo/popup-picker';

export function seocentralSettings( $ ) {
	//Set this variable up for translation of strings
	const { __ } = wp.i18n;

	//Access the fields and elements within the setting structure to update and display. 
	var modalTriggers = document.querySelectorAll('.form-table-pop-up-block'),
			dialogBoxes = document.querySelectorAll('.seo-central-dialog'),
			dialogClose = document.querySelectorAll('.seo-central-dialog-popup-close-button'),
			tableDropdowns = document.querySelectorAll('.seo-central-settings-form .form-table tbody'),
			theads = document.querySelectorAll('.seo-central-settings-form .form-table .form-table-top-head'),
			theadArrows = document.querySelectorAll('.seo-central-settings-form .form-table .form-table-top-head .form-table-collapse-arrow'),
			settingForm = document.querySelector('.seo-central-settings-form'),
			textInputs = document.querySelectorAll('input[type="text"], textarea'),
			dropdowns = document.querySelectorAll('select'),
			wpAlert = document.querySelector('#wpbody-content .update-nag.notice'),
			centralAlert = document.querySelector('.seo-central-notification-wrapper');
			
	var titleOrderWrapper = $('.seo-central-title-order-wrapper');

		//Settings Page Image uploader
		if($('#seo_central_setting_image')[0]) {
			$('#select-seo-image-select').click(function(){
				//Access Media library for upload or selection from library, save into input field
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

							// Check if the selected file is an image
							if (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
								$('input[name=seo_central_setting_image]').val(attach.url);
								// $('.seo-central-settings-image').attr("src",$('input[name=seo_central_setting_image]').val());
	
								//Re-enable deselect button for image
								if($('#deselect-seo-image').hasClass('disabled')) {
									$('#deselect-seo-image').removeClass('disabled');
	
									if(!$('#seo_central_setting_image_instructions').hasClass('hidden')) {
										$('#seo_central_setting_image_instructions').addClass('hidden');
									}
								}
	
								// Update the display of the file
								if(!$('#deselect-seo-image').hasClass('disabled')) {
									var siteImage = $('#seo_central_setting_image').val();
									var filename = siteImage.split('/').pop();
									$('#deselect-seo-image .seo-central-remove-image-file').html(filename);
									$('#select-seo-image-select').html(__( 'Choose another file', 'seo-central-lite' ) );
								}
	
								enableSave();
							
								// Disabled for now
								// if(!$('.seo-central-settings-image-wrapper').hasClass('active')) {
								// 	$('.seo-central-settings-image-wrapper').addClass('active');
								// }
							} 
							else {
								// alert('Please select an image file. Videos and other file types are not allowed.');
								return false; // Prevent other file types from being processed
							}

					})
					.open();


				return false;
			});

			//Remove the selected image and disable the deselect button
			$('#deselect-seo-image .seo-central-remove-image-close').click(function(){
				$('input[name=seo_central_setting_image]').val('');

				if(!$('#deselect-seo-image').hasClass('disabled')) {
					$('#deselect-seo-image').addClass('disabled');

					if($('#seo_central_setting_image_instructions').hasClass('hidden')) {
						$('#seo_central_setting_image_instructions').removeClass('hidden');
					}
				}
				$('#select-seo-image-select').html(__( 'Choose file', 'seo-central-lite' ));

				// if($('.seo-central-settings-image-wrapper').hasClass('active')) {
				// 	$('.seo-central-settings-image-wrapper').removeClass('active');
				// }

				enableSave();

				return false;
			});

			if($('#seo_central_setting_image').val().length > 1) {
				// if(!$('.seo-central-settings-image-wrapper').hasClass('active')) {
				// 	$('.seo-central-settings-image-wrapper').addClass('active');
				// }

				if($('#deselect-seo-image').hasClass('disabled')) {
					$('#deselect-seo-image').removeClass('disabled');

					if(!$('#seo_central_setting_image_instructions').hasClass('hidden')) {
						$('#seo_central_setting_image_instructions').addClass('hidden');
					}

					if(!$('#deselect-seo-image').hasClass('disabled')) {
						var siteImage = $('#seo_central_setting_image').val();
						var filename = siteImage.split('/').pop();
						$('#deselect-seo-image .seo-central-remove-image-file').html(filename);

						$('#select-seo-image-select').html(__( 'Choose another file', 'seo-central-lite' ));
					}
				}

				// $('.seo-central-settings-image').attr("src",$('#seo_central_setting_image').val());
				

			}

		}

		$('.seo-central-settings-social-image-select').each(function(index){

			var currentPost = $(this).data('type'); //Utilize the "$post_type" variable from the function in admin to uniquely target the repeated settings fields

			//Update the Image fields and the deselect button should be enabled to remove the selected image from the post type field.
			var deselect = $('#'+currentPost+'_social_image_deselect'),
					textSelect = $('#'+currentPost+'_social_image_select'),
					deselectFile = $('#'+currentPost+'_social_image_deselect .seo-central-remove-image-file');
			var imageInput = $('input[name='+ currentPost +'_social_image_field]'),
					imageTips = $('#'+ currentPost +'_social_image_instructions'),
					imgTag = $('.seo-central-settings-'+ currentPost +'-social-image'),
					imgWrapper = $('.seo-central-settings-'+ currentPost +'-image-wrapper');
			
			// Set Click event to each of the image field buttons
			$(this).click(function(){

				//Access Media library for upload or selection from library, save into input field
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

							// Check if the selected file is an image
							if (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
								//Set the value to the input to save, and attach the url to the image src to display selection
								imageInput.val(attach.url);
								// imgTag.attr("src",imageInput.val());
	
								//Re-enable deselect button for image
								if(deselect.hasClass('disabled')) {
									deselect.removeClass('disabled');
	
									if(!imageTips.hasClass('hidden')) {
										imageTips.addClass('hidden');
									}
	
									textSelect.html(__( 'Choose another file', 'seo-central-lite' ));
								}
	
								if(!deselect.hasClass('disabled')) {
									var siteImage = imageInput.val();
									var filename = siteImage.split('/').pop();
									deselectFile.html(filename);
								}
	
								enableSave();
							
								//Enable the image wrapper for display
								// if(!imgWrapper.hasClass('active')) {
								// 	imgWrapper.addClass('active');
								// }
							} else {
								// alert('Please select an image file. Videos and other file types are not allowed.');
								return false; // Prevent other file types from being processed
							}

					})
					.open();


				return false;
			});

			//On load event check if the input has a file/value and update the display
			if(imageInput.val().length > 1) {

				//Enable the deselect button
				if(deselect.hasClass('disabled')) {
					deselect.removeClass('disabled');

					if(!imageTips.hasClass('hidden')) {
						imageTips.addClass('hidden');
					}

					if(!deselect.hasClass('disabled')) {
						var siteImage = imageInput.val();
						var filename = siteImage.split('/').pop();
						deselectFile.html(filename);
						$(this).html(__( 'Choose another file', 'seo-central-lite' ));
					}
				}

				//Update the empty src on the image tag for display
				// imgTag.attr("src",imageInput.val());
			}

		});

		//Set the deselect button functionality when active
		$('.seo-central-settings-social-image-deselect').each(function(index){
			//Remove the url from the image input field and disable the the image wrapper and deselect button
			var parent = $(this);
			parent.find('.seo-central-remove-image-close').click(function(){
				var currentPost = parent.data('type');
				var deselect = $('#'+currentPost+'_social_image_deselect'),
						select = $('#'+currentPost+'_social_image_select');
				var imageInput = $('input[name='+ currentPost +'_social_image_field]'),
						imgWrapper = $('.seo-central-settings-'+currentPost+'-image-wrapper'),
						imageTips = $('#'+ currentPost +'_social_image_instructions');

				imageInput.val('');

				if(!deselect.hasClass('disabled')) {
					deselect.addClass('disabled');

					if(imageTips.hasClass('hidden')) {
						imageTips.removeClass('hidden');
					}

					select.html(__( 'Choose file', 'seo-central-lite' ))
				}

				if(imgWrapper.hasClass('active')) {
					imgWrapper.removeClass('active');
				}

				enableSave();
				
				return false;
			});
		});

		//Settings page breadcrumb toggle
		if($('#seo_central_setting_breadcrumb')[0]) {

			$('#seo_central_setting_breadcrumbs_toggle').click(function(){

				if($('#seo_central_setting_breadcrumb').val() === 'true'){
					$('#seo_central_setting_breadcrumb').val('false');

					if($('#seo_central_setting_breadcrumbs_toggle').hasClass('enabled')) {
						$('#seo_central_setting_breadcrumbs_toggle').removeClass('enabled');
					} 
				}
				else if($('#seo_central_setting_breadcrumb').val() === 'false') {
					$('#seo_central_setting_breadcrumb').val('true');

					if(!$('#seo_central_setting_breadcrumbs_toggle').hasClass('enabled')) {
						$('#seo_central_setting_breadcrumbs_toggle').addClass('enabled');
					} 
				}

				enableSave();

				return false;
			});
		}

		//Assign the seo crumb type, apply the selected or inputted crumb value. 
		if($('#seo_central_setting_crumbseparator')[0]) {

			$('#seo-central-crumbs-separator .seo-central-settings-crumbs-selection-item').each(function(index, element) {
				// Set a click event for each item
				$(this).click(function() {

						// Remove any selected class from the items
						$('#seo-central-crumbs-separator .seo-central-settings-crumbs-selection-item').each(function() {
							// Check if the current element has the 'selected' class
							if($(this).hasClass('selected')) {
									// If it does, remove the 'selected' class
									$(this).removeClass('selected');
							}
						});
	
					// Add 'selected' class to the clicked element and update the value to the hidden text field
					$(this).addClass('selected');
					$('#seo_central_setting_crumbseparator').val($(this).data('value'));

					enableSave();
				});
			});
		}

		// Check for the modal items on settings (This is all the dropdown functionality of the settings page)
		if(modalTriggers) {

			//Modal Triggers and dialog close display and close the modals for the settings page.
			modalTriggers.forEach(function (modal, index) {
				modal.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
        
					dialogBoxes[index].showModal();

					// Clicking off modal or on backdrop closes modal
					dialogBoxes[index].addEventListener('click', function(event) {
						var rect = dialogBoxes[index].getBoundingClientRect();
						var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
							rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
						if (!isInDialog) {
							dialogBoxes[index].close();
						}
					});
				});
			});

			dialogClose.forEach(function (close, index) {
				close.addEventListener('click', (e) => {
					e.preventDefault();
        
					dialogBoxes[index].close();
				});
			});

			// Header Dropdown click events
			theads.forEach(function (thead, index) {
				thead.addEventListener('click', (e) => {
					e.preventDefault();
					// e.stopPropagation(); 

					var currentTable = tableDropdowns[index];

					var arrow = theadArrows[index];
					

					if(!currentTable.classList.contains('open') && !currentTable.classList.contains('close')) {
						tableDropdowns[index].classList.add('close');
						arrow.classList.add('rotate-arrow');
					}
					else if(currentTable.classList.contains('open')) {
						currentTable.classList.remove('open');
						currentTable.classList.add('close');
						arrow.classList.add('rotate-arrow');
					}
					else if(currentTable.classList.contains('close')) {
						currentTable.classList.remove('close');
						currentTable.classList.add('open');
						arrow.classList.remove('rotate-arrow');
					}
					
				});
			});

			theadArrows.forEach(function (arrow, index) {
				arrow.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();

					var currentTable = tableDropdowns[index];
					

					if(!currentTable.classList.contains('open') && !currentTable.classList.contains('close')) {
						tableDropdowns[index].classList.add('close');
						arrow.classList.add('rotate-arrow');
					}
					else if(currentTable.classList.contains('open')) {
						currentTable.classList.remove('open');
						currentTable.classList.add('close');
						arrow.classList.add('rotate-arrow');
					}
					else if(currentTable.classList.contains('close')) {
						currentTable.classList.remove('close');
						currentTable.classList.add('open');
						arrow.classList.remove('rotate-arrow');
					}
					
				});
			});
		}

		// Check for the setting form and set all the events on the settings page. 
		if(settingForm) {
			//Check for the setting for element and then loop through all the inputs to detect a change on the input
			textInputs.forEach(function (input, index) {
				input.addEventListener('change', (e) => {
					e.preventDefault();

					enableSave();
					
				});
			});

			dropdowns.forEach(function (dropdown, index) {
				dropdown.addEventListener('change', (e) => {
					e.preventDefault();

					enableSave();
					
				});
			});
		}

		// Set up functionality for the variable selections for the title fields
		titleOrderInsert( $, titleOrderWrapper);
}

function enableSave( $ ) {
	var updateText = document.querySelectorAll('.seo-central-settings-update-alert'),
	submitButtons = document.querySelectorAll('.submit #submit');

	updateText.forEach(function (alert, index) {

		if(!alert.classList.contains('active')) {
			alert.classList.add('active');
		}

		if(!submitButtons[index].classList.contains('enabled')) {
			submitButtons[index].classList.add('enabled');
		}
	});
}

// This will initialize the draggable library. 
function titleOrderInsert($, titleOrderWrapper) {
	// Loop through each of the divs that set the title order field to apply variables
	$(titleOrderWrapper).each(function( index ) {
		// For each title wrap set up the click events
		var titleApply = $(this).find('.js-variable-insert'),
				titleList = $(this).find('.seo-central-title-order-list'),
				titleListItems = $(this).find('.seo-central-title-order-list-item'),
				titleDisplay = $(this).find('.seo-central-title-order-span-list'),
				postType = $(this).data('type');

		var currentInput = $(`#${postType}_title_field`);

		titleApply.click(function(event) {
				//Dont allow this event to propagate to the document event listener for these items
				event.stopPropagation();
				titleList.toggleClass('hidden');
		});

		$(document).click(function(event) {
			// If the clicked element is not within titleList and not the titleApply itself, hide titleList
			if (!$(event.target).closest(titleList).length && !$(event.target).closest(titleApply).length) {
					titleList.addClass('hidden');
			}
		});

		titleListItems.click(function(event) {

				//Dont allow this event to propagate to the document event listener for these items
				event.stopPropagation();

				// Get the variable name from the item and update the div with a span
				var itemTitle = $(this).html();
				var currentValue = currentInput.val();

				// Check if the last character is not a comma and add one if needed (This is mainly for initial load)
				if (currentValue.length > 0 && currentValue.trim().slice(-1) !== ",") {
					currentValue += ", ";
				}

				var html = $(`<span class="seo-central-title-order-span-list-item" data-id="${index}">${itemTitle}</span>`);

				//Set double click triggers for the new spans 
				setVariableDoubleClick($, html);

				//Append the span to the div variable display
				titleDisplay.append(html);

				//Add the new value to the existing hidden text input value
				currentValue += itemTitle + ", ";

				currentInput.val(currentValue);

				titleList.addClass('hidden'); //Hide the listing after applying

				//enable save on each item add
				enableSave();
		});

		// For title display set the focus and blur events for the fields
		keyphraseTriggers( $, titleDisplay, currentInput);

		//For each wrapper set the draggable for each element
		titleDisplay.sortable({
			group: 'list',
			sort: true,  // sorting inside list
			dataIdAttr: 'data-id', // HTML attribute that is used by the `toArray()` method
			animation: 200,
			ghostClass: 'sortable-ghost',
			swapThreshold: 1, // Threshold of the swap zone
			direction: 'horizontal', // Direction of Sortable 
			update: function() {
					updateVariableFields($, titleDisplay, currentInput);
			},
		});
		
	});

	//Set up the picmo emoji Library for element insertion on each of the variable selectors
	emojiInsertSetup($);
}

// This function resets the input value for all the variable fields when sortable is used
function updateVariableFields($, titleDisplay, currentInput) {
	//Change the value of the sort
	titleDisplay.each(function(){
		var titleItems = $(this).find('.seo-central-title-order-span-list-item'),
				newOrder = "";

		titleItems.each(function(index, item){
			// 'item' is the current item in the loop
			// 'index' is the current item's index
			var textValue = $(item).text().trim(); // Getting only the text content
			var imgAltValue = $(item).find('img').attr('alt') || ""; // Getting alt attribute from an image

			// Add a comma for every item except the last one
			var separator = ", ";

			// Combine the text value and alt value (if any)
			newOrder += textValue + (imgAltValue ? imgAltValue : "") + separator;
		});
		
		// Update the text input field with the new order
		if(newOrder != "") {
			currentInput.val(newOrder);
		}

	});

	//On update of the drag enable save
	enableSave();
}

// Initialize the Picmo Emoji Library
function emojiInsertSetup($) {
	// Get all elements with class .js-emoji-insert
	const emojis = document.querySelectorAll('.js-emoji-insert');

	// For each element, create a picker and add event listener
	emojis.forEach(function(emoji, index) {
		// Create the picker for each button
		const picker = createPopup({}, {
			referenceElement: emoji,
			triggerElement: emoji,
			renderer: new NativeRenderer(),
			position: "right",
			showCloseButton: true
		});
		
		// Add click event listener to the emoji button
		emoji.addEventListener("click", () => {
			picker.toggle();
		});
		
		// Listen for the emoji:select event
		picker.addEventListener("emoji:select", (selection) => {
			var postType = emoji.dataset.type;
			var currentInput = $(`#${postType}_title_field`);
			var currentValue = currentInput.val();

			// Check if the last character is not a comma and add one if needed (This is mainly for initial load)
			if (currentValue.length > 0 && currentValue.trim().slice(-1) !== ",") {
				currentValue += ", ";
			}
			
			var html = $(`<span class="seo-central-title-order-span-list-item" data-id="${index}">${selection.emoji}</span>`);

			//Set double click event to the newly generated span
			setVariableDoubleClick($, html);

			var titleDisplay = $('.seo-central-title-order-span-list').eq(index);

			titleDisplay.append(html);

			currentValue += selection.emoji + ", ";

			currentInput.val(currentValue);


			enableSave();
		});
	});
}

//Set the events for focusing and updating the keyphrases 
function keyphraseTriggers( $, variableWrapper, currentInput) {

	var allSpans = variableWrapper.find('.seo-central-title-order-span-list-item');

  // Focus set up for main-secondary-phrases 
  variableWrapper.focus(function() {
		var $this = $(this);
		$this.data("initialText", $this.html());
	
		// Remove existing 'keydown' event handlers before attaching a new one
		$this.off('keydown').on('keydown', function(e) {
      if (e.keyCode == 13 || e.keyCode == 9) { // Check if 'Enter' was pressed or 'Tab' was pressed
        e.preventDefault();

       // Create a new span
       var newSpan = $('<span class="seo-central-title-order-span-list-item" contenteditable="true" ></span>');

			 //Set double click event to the newly generated span
			 setVariableDoubleClick($, newSpan);
			
       // Add new span to the main div
       $(this).append(newSpan);
 
        // Set focus to the new span (wrapped in a timeout so it fires properly)
        setTimeout(function() {
          var range = document.createRange();
          var sel = window.getSelection();
          range.setStart(newSpan[0], 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          newSpan[0].focus();
        }, 0);

				allSpans = variableWrapper.find('.seo-central-title-order-span-list-item');

      } else if (e.keyCode == 188) { // Check if 'Comma' was pressed  
        // Prevent the comma from appearing
        e.preventDefault();
  
        // Create a new span
        var newSpan = $('<span class="seo-central-title-order-span-list-item" contenteditable="true" ></span>');

				//Set double click event to the newly generated span
				setVariableDoubleClick($, newSpan);
  
        // Add new span to the main div
        $(this).append(newSpan);
  
        // Set focus to the new span
        setTimeout(function() {
          var range = document.createRange();
          var sel = window.getSelection();
          range.setStart(newSpan[0], 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          newSpan[0].focus();
        }, 0);

				allSpans = variableWrapper.find('.seo-central-title-order-span-list-item');
      }


			// Check if 'Backspace' was pressed and then detect if a span element was removed
			if (e.keyCode == 8) {
				var sel = window.getSelection(); //Using the current selected span
				var focusedSpan = $(sel.anchorNode.parentNode); //default 

				// Check the type of the anchorNode (When the item has an emoji the anchorNode is different) reset the focuseSpan for emoji elements
				if (sel.anchorNode.nodeType === Node.ELEMENT_NODE && $(sel.anchorNode).hasClass('seo-central-title-order-span-list-item')) {
					// Emoji span
					focusedSpan = $(sel.anchorNode);
				}

				// Check if it's a targeted span and if the cursor is at the start position
				if (focusedSpan.hasClass('seo-central-title-order-span-list-item')) {
					// Timeout is needed to allow the DOM to update before recalculating value
					setTimeout(function() {
						if (focusedSpan.is(':empty') || focusedSpan.contents().length === 1 && focusedSpan.contents().eq(0).is('br')) {
							var newValue = '';
							variableWrapper.find('.seo-central-title-order-span-list-item').each(function() {
								var spanContent = $(this).text();
								// Check for emoji images and retrieve their alt attribute
								var emojiImg = $(this).find('img.emoji');
								if (emojiImg.length > 0) {
									spanContent += emojiImg.attr('alt');
								}
								newValue += spanContent + ", ";
							});
							// Remove trailing comma and space, if any
							newValue = newValue.replace(/, $/, '');
							currentInput.val(newValue);
				
							enableSave();
						}
					}, 0);
				}
			}

    });
  });

  //Use Double click event for the span to edit inside the item
  allSpans.dblclick(function() {
    var len = $(this).text().length;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this.firstChild, len); // Sets the start position to the end of the content
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  });
  
  
  // When you leave an item
  variableWrapper.blur(function() {
    // if content is different
    if ($(this).data("initialText") !== $(this).html()) {

      //Update the input value and remove empty spans
      var allSpans = variableWrapper.find('.seo-central-title-order-span-list-item'),
      storedText = '';

      
      allSpans.each(function(index, span) {
				
				if(span.innerHTML != '<br>' && span.innerHTML != '') {
					storedText += span.innerHTML + ',';
        }
        else {
					//Hide Empty Spans
          $(span).addClass('empty-keyphrase');
        }
				
      });
			

      // Remove all elements with the class 'empty-keyphrase'
      $('.empty-keyphrase').remove();
    }
  });

	//Disable pasting of images into the fields
	variableWrapper.on('paste', function (e) {
    var clipboardData = e.originalEvent.clipboardData;
    var items = clipboardData.items || clipboardData.files || [];
    for (var i = 0; i < items.length; i++) {
        // Check if the clipboard item is of type image
        if (items[i].type.indexOf("image") !== -1) {
            // Prevent pasting of image
            e.preventDefault();
            return;
        }
    }
	});

}

function setVariableDoubleClick($, element) {
  $(element).dblclick(function() {
    var len = $(this).text().length;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this.firstChild, len); // Sets the start position to the end of the content
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  });
}

// In the event there are default notifications move them to the proper spot
export function moveNotifications( $ ) {

	var wpAlert = document.querySelector('#wpbody-content .update-nag.notice'),
			centralAlert = document.querySelector('#seo-central-auto-notifier');

	// Take contents from wordpress default notification and place it into our custom element for proper display 
	if(wpAlert) {
		var notificationSpan = centralAlert.querySelector(".seo-central-notification-text");
		
		// Make sure both elements are found in the DOM
		if(wpAlert && notificationSpan) {
			// Extract the HTML content of the updateDiv
			var updateContent = wpAlert.innerHTML;

			// Place the update content inside the notification span
			notificationSpan.innerHTML = updateContent;

			centralAlert.classList.add('enabled');
			wpAlert.classList.add('hidden');
		}
	}

  // if(wpAlert.length) {
  //   var defaultNotices = wpAlert;
  //   var seoNotifications = $('.seo-central-partials-notification-wrapper');

  //   defaultNotices.each(function() {
  //       var cloneNotice = $(this).clone();
  //       seoNotifications.append(cloneNotice);
  //       $(this).hide();
  //   });
  // }
}
import 'jquery-sortablejs';

//Set the events for focusing and updating the keyphrases
export function keyphraseEvents( $ ) {

  // Focus set up for main-secondary-phrases 
  $('.main-secondary-phrases').focus(function() {
    var $this = $(this);
    var phrase_input = $('#seo_central_add_keyphrases');

    $this.data("initialText", $this.html());
  
    // Remove existing 'keydown' event handlers before attaching a new one
    $this.off('keydown').on('keydown', function(e) {
      if (e.keyCode == 13 || e.keyCode == 9) { // Check if 'Enter' was pressed or 'Tab' was pressed
        e.preventDefault();

       // Create a new span
       var newSpan = $('<span class="seo-central-keyphrase-item seo-keyphrase-item" contenteditable="true" ></span>');
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

      } else if (e.keyCode == 188) { // Check if 'Comma' was pressed  
        // Prevent the comma from appearing
        e.preventDefault();
  
        // Create a new span
        var newSpan = $('<span class="seo-central-keyphrase-item seo-keyphrase-item" contenteditable="true" ></span>');
  
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
      }

      //Backspace needs to remove and update the values for secondary keyphrases
			// Check if 'Backspace' was pressed and then detect if a span element was removed
			if (e.keyCode == 8) {
				var sel = window.getSelection(); //Using the current selected span
				var focusedSpan = $(sel.anchorNode.parentNode); //default 

				// Check the type of the anchorNode (When the item has an emoji the anchorNode is different) reset the focuseSpan for emoji elements
				if (sel.anchorNode.nodeType === Node.ELEMENT_NODE && $(sel.anchorNode).hasClass('seo-central-keyphrase-item')) {
					// Emoji span
					focusedSpan = $(sel.anchorNode);
				}

				// Check if it's a targeted span and if the cursor is at the start position
				if (focusedSpan.hasClass('seo-central-keyphrase-item')) {
					// Timeout is needed to allow the DOM to update before recalculating value
					setTimeout(function() {
						if (focusedSpan.is(':empty') || focusedSpan.contents().length === 1 && focusedSpan.contents().eq(0).is('br')) {
							var newValue = '';
							$this.find('.seo-central-keyphrase-item').each(function() {
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
							phrase_input.val(newValue);
						}
					}, 0);
				}
			}
    });
  });

  //Use Double click event for the span to edit inside the item
  $('.main-secondary-phrases .seo-keyphrase-item').dblclick(function() {
    var len = $(this).text().length;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this.firstChild, len); // Sets the start position to the end of the content
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  });
  
  
  // When you leave an item
  $('.main-secondary-phrases').blur(function() {
    // if content is different
    if ($(this).data("initialText") !== $(this).html()) {

      //Update the input value and remove empty spans
      var allSpans = $('.main-secondary-phrases span'),
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

      $('#seo_central_add_keyphrases').attr('value', storedText);

      // Remove all elements with the class 'empty-keyphrase'
      $('.empty-keyphrase').remove();
    }
  });

	//Disable pasting of images into the fields
	$('.main-secondary-phrases').on('paste', function (e) {
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

// Set up drag state of the secondary keyphrase wrapper
export function secondaryDragStates( $ ) {

  var secondaryWrapper = $('.main-secondary-phrases');
  var currentInput = $('#seo_central_add_keyphrases');

  if(secondaryWrapper[0]) {
    //For each wrapper set the draggable for each element
    secondaryWrapper.sortable({
      group: 'list',
      sort: true,  // sorting inside list
      dataIdAttr: 'data-id', // HTML attribute that is used by the `toArray()` method
      animation: 200,
      ghostClass: 'sortable-ghost',
      swapThreshold: 1, // Threshold of the swap zone
      direction: 'horizontal', // Direction of Sortable 
      update: function() {
          updateSecondaryField($, secondaryWrapper, currentInput);
      },
    });
  }
}

//On swap update the input to save the order
function updateSecondaryField($, secondaryWrapper, currentInput) {
	//Change the value of the sort
	secondaryWrapper.each(function(){
		var secondaryItems = $(this).find('.seo-keyphrase-item'),
				newOrder = "";

		secondaryItems.each(function(index, item){
			// 'item' is the current item in the loop
      newOrder += item.innerHTML + ", ";

		});
		
		// Update the text input field with the new order
		if(newOrder != "") {
			currentInput.val(newOrder);
		}

	});
}
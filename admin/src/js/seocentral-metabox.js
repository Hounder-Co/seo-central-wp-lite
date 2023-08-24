import 'jquery-sortablejs';

// This collapses uses a larger max height Requires the header, header arrow, and the body of the table
export function metaboxDropdown($, header, arrow, body) {

  // Header element required for display
  if(header) {
    //Set the event triggers for opening and closing the boring stuff section
    header.addEventListener('click', (e) => {
      e.preventDefault();

      var headerText = header.querySelector('.seo-central-analysis-scores-dropdown-header-description');

      //Check for the open and close classes on the dropdown, starts with neither, will close on the first click. 
      if(!body.classList.contains('open') && !body.classList.contains('close')) {
        body.classList.add('close');
        arrow.classList.add('rotate-arrow');

        headerText.innerHTML = 'Hide all results';
      }
      else if(body.classList.contains('open')) {
        body.classList.remove('open');
        body.classList.add('close');

        headerText.innerHTML = 'Show good results';
        
        if(!arrow.classList.contains('rotate-arrow')) {
          arrow.classList.add('rotate-arrow');
        }
        else {
          arrow.classList.remove('rotate-arrow');
        }
      }
      else if(body.classList.contains('close')) {
        body.classList.remove('close');
        body.classList.add('open');

        headerText.innerHTML = 'Hide all results';

        if(arrow.classList.contains('rotate-arrow')) {
          arrow.classList.remove('rotate-arrow');
        }
        else {
          arrow.classList.add('rotate-arrow');
        }
      }
      
    });
  }

}

//Set the copy functionality up for the internal linking suggestions
export function internalLinkCopy( $ ) {

  //Retrieve all copy items from internal linking suggestions 
  var allCopy = $('.seo-central-copy-input'),
      copyButtons = $('.seo-central-copy-button');

  //For each copy button set click event to save the dataset link of the element to the user's clipboard
  if(copyButtons) {
    copyButtons.each(function(index) {
      $(this).on('click', function() {

        //Set the item's dataset link with the url of the page suggestion and copy to clipboard
        navigator.clipboard.writeText(allCopy[index].dataset.link);
        
        //Store this item in variable self to pass into set timeout for display update
        var self = this;

        // Set the copied class to the items to update the visual
        $(this)[0].classList.add('copied');
        allCopy[index].classList.add('copied');

        //Disable all non clicked on elements
        for(let i=0; i < allCopy.length; i++) {

          if(allCopy[index] != allCopy[i] && allCopy[i].classList.contains('copied')) {
            allCopy[i].classList.remove('copied');
          }

          if($(this)[0] != copyButtons[i] && copyButtons[i].classList.contains('copied')) {
            copyButtons[i].classList.remove('copied');
          }
        }
  
        //Set time out and reset the copied state of the elements
        setTimeout(function() { 
          
          if($(self)[0].classList.contains('copied') && allCopy[index].classList.contains('copied')) {
            $(self)[0].classList.remove('copied');
            allCopy[index].classList.remove('copied');
          }
        }, 5000);

      });
    });

  }
}

// Function to check if an element is in the viewport
export function isMetaboxInViewport($, element) {
  var rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
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


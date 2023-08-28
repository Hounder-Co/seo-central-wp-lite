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
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

        headerText ? headerText.innerHTML = "Hide all results" : null;
      }
      else if(body.classList.contains('open')) {
        body.classList.remove('open');
        body.classList.add('close');

        headerText ? headerText.innerHTML = "Show good results" : null;
        
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

        headerText ? headerText.innerHTML = "Hide all results" : null;

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


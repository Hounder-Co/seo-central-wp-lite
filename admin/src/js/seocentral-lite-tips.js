import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function metaboxLiteTips( $ ) {

  const { __ } = wp.i18n;

  //Custom Steps array to set the tips of the lite metabox based on the state of the plugin
  let steps = [];

  // Set the steps items and order
  if(!myThemeParams['pro_analysis']) {
    steps.push(
      { element: '.js-tips-description', popover: { title: '', description: __("This is your page meta. You can manually edit or generate anytime.", "seo-central-lite"), side: "left",  align: 'center' } },
      { element: '.column-1', popover: { title: '', description: __("Customize your page details to further boost your ranking.", "seo-central-lite"), side: "right",  align: 'center' } },
      { element: '.column-2', popover: { title: '', description: __("Preview how your page shows up in search engines on social sites, desktop screens, and mobile devices.", "seo-central-lite"), side: "bottom",  align: 'center' } },
      { element: '.seo-central-page-score', popover: { title: '', description: __("Central Score is the thermometer for your page SEO health.", "seo-central-lite"), side: "left",  align: 'center' } },
      { element: '.seo-central-boring-stuff', popover: { title: '', description: __("Advanced settings and details can be found under The Boring Stuff.", "seo-central-lite"), side: "top",  align: 'center' } }
    );
  }
  else {
    steps.push(
      { element: '.js-tips-description', popover: { title: '', description: __("This is your page meta. You can manually edit or generate anytime.", "seo-central-lite"), side: "left",  align: 'center' } },
      { element: '.column-1', popover: { title: '', description: __("Customize your page details to further boost your ranking.", "seo-central-lite"), side: "right",  align: 'center' } },
      { element: '.column-2', popover: { title: '', description: __("Preview how your page shows up in search engines on social sites, desktop screens, and mobile devices.", "seo-central-lite"), side: "bottom",  align: 'center' } },
      { element: '.seo-central-page-score', popover: { title: '', description: __("Central Score is the thermometer for your page SEO health.", "seo-central-lite"), side: "left",  align: 'center' } },
      { element: '.seo-central-analysis-wrapper', popover: { title: '', description: __("Prescriptions to fix or improve your page SEO appear here.", "seo-central-lite"), side: "left",  align: 'center' } },
      { element: '.seo-central-boring-stuff', popover: { title: '', description: __("Advanced settings and details can be found under The Boring Stuff.", "seo-central-lite"), side: "top",  align: 'center' } }
    );
  }



  if($('#seo-central-lite-tips')[0]) {

    // let topOffset = $('#seo-central-api').offset().top;
    // $('html, body').animate({ scrollTop: topOffset }, 500);

    const driverObj = driver({
      showProgress: true,
      popoverClass: 'seocentral-js-theme',
      popoverOffset: 30,
      allowClose: true,
      showButtons: ["close"],
      progressText: `Tip {{current}} <span>of</span> {{total}}`,
      overlayColor: 'white',
      onPopoverRender: (popover, { config, state }) => {
        const closeButton = document.createElement("button");
        const nextButton = document.createElement("button");
        const buttonWrapper = document.createElement("div");  // create the div element
        buttonWrapper.classList.add('popover-flexed-buttons');
        closeButton.classList.add('popover-flexed-buttons-close');
        nextButton.classList.add('popover-flexed-buttons-next');
        nextButton.innerText = "Next";
        closeButton.innerText = "Close";

        // add the buttons to the div
        buttonWrapper.appendChild(closeButton);
        buttonWrapper.appendChild(nextButton);
        popover.description.appendChild(buttonWrapper);


        // Check if this is the last step
        if (state.activeIndex === 8) { //could not get total, using our set amount for now
          nextButton.disabled = true; // Disable the next button
          nextButton.classList.add('hidden');
        }
    
        // Next Button Event
        nextButton.addEventListener("click", () => {
          driverObj.moveNext();
        });

        //Close Button Event
        closeButton.addEventListener("click", () => {
          if($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
            $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated'); 
          }

          if($('.seo-central-custom-driver').hasClass('active')) {
            $('.seo-central-custom-driver').removeClass('active');
          }

          driverObj.destroy();

        });

      },
      onHighlighted: (element) => {

        //Remove focus from the close button if it gets set when triggering tips
        if ($('.popover-flexed-buttons-close').is(':focus')) {
          $('.popover-flexed-buttons-close').blur();
        }

        //If the notification bars are available within the metabox use them to provide a proper offset to
        var metaNotifications = $('.seo-central-notification-wrapper.metabox-notification');
        var totalNotificationHeight = 0,
            totalNotificationInnerHeight = 0;

        //Retrieve the heights of notifications to fix any offsets on the tips system
        metaNotifications.each(function() {
            //If the notification is enabled
            if(!metaNotifications.hasClass('hidden')) {
              totalNotificationHeight += $(this).outerHeight(); // Include padding and border
              totalNotificationInnerHeight += $(this).height(); // Excludes padding, borders, and margins
            }
        });
    
        const container = document.getElementById('seo-central-metabox');
        const containerRect = container.getBoundingClientRect();
        
        // Set the viewBox to match the container's dimensions
        const viewBoxWidth = containerRect.width;
        const viewBoxHeight = containerRect.height;
        document.querySelector('.seo-central-custom-driver').setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

        // Get the bounding client rectangle
        const rect = element.getBoundingClientRect();

        // Padding
        var padding = 4; 

        //Increase padding for the instance of boring stuff
        if(element.classList.contains('seo-central-boring-stuff')) {
          padding = 8;
        }
        else if(element.classList.contains('seo-central-page-score')) {
          padding = 2;
        }

        // Calculate the center
        const centerX = Math.round(rect.left + (rect.width / 2) - containerRect.left);
        const centerY = Math.round(rect.top + (rect.height / 2) - containerRect.top);

        // js-tips-ai-description, seo-central-apply-all, js-dips-description, column-1, column-2, seo-central-page-score, seo-central-analysis-wrapper, seo-central-boring-stuff
        // const shiftX = element.classList.contains('seo-central-button-generate') ? 8 : 0;
        const classShiftMapping = {
          'js-tips-description': -8,
          'column-1': 0,
          'column-2': 0,
          'seo-central-page-score': 0,
          'seo-central-boring-stuff': 0,
        };
        
        // Initialize the shift value
        let shiftX = 0;
        let shiftY = 3;

        // Check each class in the element's class list
        for (const className of element.classList) {
          if (classShiftMapping[className] !== undefined) {
            shiftX = classShiftMapping[className];

            if(className == 'js-tips-description') {
              shiftY = 18;
            }

            if(className == 'seo-central-page-score') {
              shiftY = 18;
            }

            if(className == 'seo-central-boring-stuff') {
              shiftY = 16;
            }

            break; // Exit the loop once a match is found
          }
        }

        // Calculate the shape's attributes
        var x = Math.round(centerX - (rect.width / 2 + padding) + shiftX);
        var y = Math.round(centerY - (rect.height / 2 + padding) - shiftY);
        y += totalNotificationInnerHeight;
        var width = Math.round(rect.width + padding * 2);
        var height = Math.round(rect.height + padding * 2);

        //On the generation fields the reveal needs to show all the fields. 
        if(element.classList.contains('js-tips-ai-description') || element.classList.contains('js-tips-description')) {
          const firstElement = $('.seo-central-metabox-ai-fields-row').first();
          const lastElement = $('.seo-central-metabox-ai-fields-row').last();
          const heightOffset = myThemeParams['pro_analysis'] ? 280 : 230;
        
          const firstElementRect = firstElement[0].getBoundingClientRect(); // Get bounding rect of the first element
        
          const firstElementHeight = firstElement.outerHeight();
          const lastElementHeight = lastElement.outerHeight();
        
          const firstElementTop = firstElement.offset().top;
          const lastElementTop = lastElement.offset().top;
        
          const distanceBetween = lastElementTop - firstElementTop - firstElementHeight;
        
          const totalHeight = (firstElementHeight + lastElementHeight + distanceBetween) - heightOffset; //There is and increased height the 280 accounts for it, works responsive
        
          y = Math.round(firstElementRect.top - containerRect.top - padding + totalNotificationHeight);// Use first element's top
          height = firstElementRect.height + padding * 2 + totalHeight * 2; // Use first element's height
        }

        // Construct the path string
        const pathString = `M${viewBoxWidth},0L0,0L0,${viewBoxHeight}L${viewBoxWidth},${viewBoxHeight}L${viewBoxWidth},0Z
                            M${x},${y} h${width} a5,5 0 0 1 5,5 v${height} a5,5 0 0 1 -5,5 h-${width} a5,5 0 0 1 -5,-5 v-${height} a5,5 0 0 1 5,-5 z`;
    
        // Update the path element
        document.querySelector('.seo-central-custom-driver path').setAttribute('d', pathString);
      },
      onDestroyed: (element) => {
        if($('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').removeClass('active');
        }

        if($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
          $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated');
        }

      },
      onCloseClick: (element, step, { config, state }) => {
        if($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
          $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated'); 
        }

        if($('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').removeClass('active');
        }
      },
      steps: steps
    });
  
    // driverObj.drive(); 

    // Set the click event to start the tips functionality 
    // This can still be enabled for pro if not all permissions have been set
    if($('#seo-central-lite-tips')[0]) {
      $('#seo-central-lite-tips').click(function() {
        if(!$('#seo-central-lite-tips').hasClass('activated')) {
          $('#seo-central-lite-tips').addClass('activated');
        }

        if(!$('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').addClass('active');
        }
        // Put your logic here. What should happen when the element is clicked?
        driverObj.drive();

      });
    }
  }

}

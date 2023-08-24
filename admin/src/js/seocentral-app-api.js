import {pageAnalysis} from '../js/seocentral-page-analysis.js';

//
export function seocentralAPI( $ ) {
  if($('#seo-central-api')[0]) {
    $('#seo-central-api').click(function(){

      // Trigger the initial loading animation and prep for the reveal of the other generate button
      var loadButton = $('#seo-central-api'),
          loadTriangles = $('#seo-central-api #exBt3J7Ycwb1');

      if(!loadButton.hasClass('loading')){
        loadButton.addClass('loading');
        loadButton.prop('disabled', true); // Disable the button
      }

      if(!loadTriangles.hasClass('active')){
        loadTriangles.addClass('active');
      }

      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': myThemeParams.apiKey,
          'Domain': myThemeParams.site_domain
        },
        body: JSON.stringify({"role":"user","content":`${myThemeParams.body['stringbody']}`})
      };
      fetch('https://app.seocentral.ai/api/v1/seocentral', requestOptions)
        .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.postId = data.id;

          if(response.ok) {

            const newResponses = data.response.map((res) => {
              const metaDescription = res.metaDescription.replace(/["']/g, "");
              const primaryKeyword = res.primaryKeyword.replace(/["']/g, "");
              const secondaryKeywords = res.secondaryKeywords.split(', ').map(keyword => keyword.replace(/['"\d.]/g, ""));
              const title = res.title.replace(/["']/g, "");
              return { metaDescription, primaryKeyword, secondaryKeywords, title };
            });
            
            // Store everything in an object
            var aiData = {
              title: [],
              description: [],
              primeKeywords: [],
              subKeywords: [],
            }
            
            // Single pass through the newResponses
            newResponses.forEach(res => {
              aiData.title.push(res.title);
              aiData.description.push(res.metaDescription);
              aiData.primeKeywords.push(res.primaryKeyword);
              aiData.subKeywords.push(res.secondaryKeywords);
            });

            displayAIGeneration($, aiData, 0); //Initial display on generation click

            cycleAiGeneration($, aiData, aiData.title.length)
            .then(() => {
              // Execution here happens after cycleAiGeneration completes
              return false;
            })
            .catch(error => {
              // Handle any errors that occurred during execution
              console.error('There was an error in cycle generation!', error);
              return false;
            });

            //cycleAiGeneration($, aiData, aiData.title.length); //Cycle Array of aiData response
            applyGeneration($, aiData); //Apply events for the generation

          }
        })
        .catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
          return false;
        });
        return false;
    });
  }
}

// Set the display of the generation coming from the api call, the aiData contains the array of values retrieved
function displayAIGeneration($, aiData, index) {
  //Generation fields by id
  var genTitle = $('#generated_meta_title'),
  genDesc = $('#generated_meta_description'),
  genPrime = $('#generated_meta_prime'),
  genSub = $('#generated_meta_second'),
  genSubWrapper = $('.generated-secondary-wrapper');
  
  //Update the values to display and enable the apply
  genTitle.val(aiData.title[index]);
  genDesc.val(aiData.description[index]);
  genPrime.val(aiData.primeKeywords[index]);
  
  // Secondary Keywords span item set up and apply
  genSubWrapper.find('span').remove();
  
  //Loop through the last key phrases and update the visuals for the field 
  for(let i=0; i < aiData.subKeywords[index].length; i++) {
    genSubWrapper.append('<span class="seo-keyphrase-item generated-keyphrase" >'+aiData.subKeywords[index][i]+'</span>');
  }
  // Store the array into a string joined by commas
  genSub.val(aiData.subKeywords[index].join(', '));

  // Set Click events for all the new spans to apply to the main seo keyphrases
  var subSpans = genSubWrapper.find('.generated-keyphrase'),
      metaSub = $('#seo_central_add_keyphrases'),
      metaSubWrapper = $('.main-secondary-phrases');

  // Set click events for each item to append to the existing secondary keyphrases, only add to the field in this method
  subSpans.each(function(index) {
    $(this).on('click', function() {

      var appendValue = metaSub.val() + ", " + $(this).text();
      var flowWrapper = $('.seo-central-metabox-apply-flow')[3];
      var clickedSpan = $('<span class="seo-keyphrase-item seo-central-keyphrase-item" >'+$(this).text()+'</span>');

      //Set double click event to the span and apply to the Secondary keywords
      setVariableDoubleClick($, clickedSpan);
      metaSubWrapper.append(clickedSpan);

      metaSub.val(appendValue);

      // Disable the button when its clicked
      $(this).addClass('hidden');

      // Update the copy state
      $('#apply_add_keyphrases').addClass('copied');
      $('#apply_add_keyphrases .seo-central-button-apply-single-text').text("Undo");

      // Update the flow state
      if(!flowWrapper.classList.contains('active')) {
        flowWrapper.classList.add('active');
      }

    });
  });
}

// Functionality of the regenerate button to cycle through the array of responses
async function cycleAiGeneration($, aiData, limit) {
  var genButton = $('#seo-central-api'),
      regenButton = $('#seo-central-api-regenerate'),
      regenIcon = $('#seo-central-api-regenerate #exBt3J7Ycwb1'); 

  // Set the animation reveals for the labels/input boxes of generation
  var labelReveal = $('.seo-central-label.text-animate'),
      inputReveal = $('.seo-central-metabox-ai-results-wrapper .seo-central-metabox-ai-results-overlay'),
      applyAll = $('#seo-central-apply-all-meta');

  // Enable and Disable the 2 buttons used for generation and regeneration
  !genButton.hasClass('hidden') ? genButton.addClass('disabled') : null;
  regenButton.hasClass('hidden') ? regenButton.removeClass('hidden') : null;

  setTimeout(function() {
    !genButton.hasClass('hidden') ? genButton.addClass('hidden') : null;
  }, 300);

  labelReveal.addClass('active');
  inputReveal.addClass('active');

  // Set overlay to display none then remove active class to reset animation for reveal (left to right swipes each generation), re-trigger on each regenerate
  setTimeout(function() {
    inputReveal.css('opacity', '0');
    if(inputReveal.hasClass('active')) {
      inputReveal.removeClass('active');
    }
  }, 800);

  regenButton.data('last', limit - 1); // Set the limit (don't exceed the array)

  // Cycle through the array from the response (this technically always starts at spot 1 since the results are generated once on the first click)
  regenButton.click(async function(event){ // Make this function asynchronous

    event.preventDefault();

    // Increment the current index to retrieve different results using the index
    regenButton.data('current', regenButton.data('current') + 1);

    if(!regenButton.hasClass('animate-fields')) {
      regenButton.addClass('animate-fields');
      regenButton.prop('disabled', true); // Disable the button
    }

    // Rerun the API call for a new array set
    if(regenButton.data('current') > regenButton.data('last')) {

      if(!regenIcon.hasClass('active')) {
        regenIcon.addClass('active');
      }

      if(!regenButton.hasClass('loading')){
        regenButton.addClass('loading');
      }

      //Using an async request to make sure the data is properly loaded
      resetApiResults($).then(newAiData => {

        // reset the dataset last in case 
        regenButton.data('last', newAiData.title.length - 1);

        // reset the current dataset to reset the count
        regenButton.data('current', 0);
      
        // Reassign the aiData parameter to have the new data returned
        aiData = newAiData;

        if(regenIcon.hasClass('active')) {
          regenIcon.removeClass('active');
        }

        if(regenButton.hasClass('loading')){
          regenButton.removeClass('loading');
        }

        if(regenButton.hasClass('animate-fields')) {
          regenButton.removeClass('animate-fields');

          setTimeout(function() {
            regenButton.prop('disabled', false); // Enable the button
          }, 1500);
        }

        // Reset Label and Input Colors and Overlays
        labelReveal.css('animation', '');
        inputReveal.css('opacity', '1');

        // Flip Class of apply all at the end
        if(applyAll.hasClass('remove-copy')){
          var applyAllText = applyAll.find('.seo-central-button-apply-all-text');
          applyAll.removeClass('remove-copy');        
          applyAll.addClass('apply-copy');

          applyAllText.text('Apply All');
        }

        resetPreviousData($, aiData);
        displayAIGeneration($, aiData, 0); //Restart Display generation
        revealTriggers($, inputReveal);

      }).catch(err => console.error(err)).finally(() => {
        if(regenIcon.hasClass('active')) {
            regenIcon.removeClass('active');
        }
      });

    } else if(regenButton.data('current') <= regenButton.data('last')) { // Reset and Redisplay the new data
      
      // Reset Label and Input Colors and Overlays
      labelReveal.css('animation', '');
      inputReveal.css('opacity', '1');

      // Flip Class of apply all at the end
      if(applyAll.hasClass('remove-copy')){
        var applyAllText = applyAll.find('.seo-central-button-apply-all-text');
        applyAll.removeClass('remove-copy');        
        applyAll.addClass('apply-copy');

        applyAllText.text('Apply All');
      }

      resetPreviousData($, aiData);
      displayAIGeneration($, aiData, regenButton.data('current'));
      revealTriggers($, inputReveal);

      setTimeout(function() {
        if(regenButton.hasClass('animate-fields')) {
          regenButton.removeClass('animate-fields');
          regenButton.prop('disabled', false); // Enable the button
        }
      }, 1500);
    }

    return false;
  });
}

// This function resets the reveals on regenerate click
function revealTriggers($, inputReveal) {

  inputReveal.css('opacity', '1');

  setTimeout(function() {
    if(!inputReveal.hasClass('active')) {
      inputReveal.addClass('active');
    }

  }, 100);

  //Set overlay to display none then remove active class to reset animation for reveal (left to right swipes each generation), re-trigger on each regenerate
  setTimeout(function() {
    inputReveal.css('opacity', '0');

    if(inputReveal.hasClass('active')) {
      inputReveal.removeClass('active');
    }
  }, 900);
}

// Set Single row items to reveal based on single apply clicks
function revealSingleTrigger($, inputReveal, labelReveal, applySingle) {

  applySingle.prop('disabled', true); // Disable the button

  if(!applySingle.hasClass('disabled')) {
    applySingle.addClass('disabled');
  }

  if(inputReveal.css('opacity') == '0') {
    inputReveal.css('opacity', '1');

    setTimeout(function() {
      applySingle.prop('disabled', false); // Enable the button

      if(applySingle.hasClass('disabled')) {
        applySingle.removeClass('disabled');
      }

    }, 800);
  }
  else if(inputReveal.css('opacity') == '1' && !inputReveal.hasClass('active')) {
    inputReveal.addClass('active');

    setTimeout(function() {
      inputReveal.css('opacity', '0');
      if(inputReveal.hasClass('active')) {
        inputReveal.removeClass('active');
      }

      applySingle.prop('disabled', false); // Enable the button

      if(applySingle.hasClass('disabled')) {
        applySingle.removeClass('disabled');
      }

    }, 800);
  }

  if(!labelReveal.attr('style')) {
    labelReveal.css('animation', 'none');
  }
  else if(labelReveal.attr('style') && labelReveal.css('animation') == '0s ease 0s 1 normal none running none') {
    labelReveal.css('animation', '');
  }
}

// Secondary has a few more conditions when a single item has been applied to not cover the items or reset until this is finished
function revealSingleSecondary($, inputReveal, labelReveal, applySingle) {

  var genSubWrapper = $('.generated-secondary-wrapper');
  var subSpans = genSubWrapper.find('.generated-keyphrase');
  var mainSpans = $('.main-secondary-phrases .seo-keyphrase-item');
  var singleApplied = false;

  applySingle.prop('disabled', true); // Disable the button

  if(!applySingle.hasClass('disabled')) {
    applySingle.addClass('disabled');
  }

  // Check for items that have been applied through clicking single item
  subSpans.each(function(index) {
    var subItem = $(this);

    if(subItem.hasClass('hidden')) { // Check if there are any hidden children
        singleApplied = true;
        
        // Do something when a hidden child is found...
        subItem.removeClass('hidden');
    }
  });

  //Make sure to clear empty spans in the main items each time
  mainSpans.each(function(index) {
    var mainItem = $(this);

    if(mainItem.text() == '') { // Check if there are any hidden children
        mainItem.remove();
    } 
    else if(mainItem.text().includes(',')) { // Check if the text contains a comma
      mainItem.text(mainItem.text().replace(',', '')); // Remove the comma
    }

  });

  if(singleApplied == true) {

    if(inputReveal.css('opacity') == '1' && !inputReveal.hasClass('active')) {
      inputReveal.addClass('active');
  
      setTimeout(function() {
        inputReveal.css('opacity', '0');
        applySingle.prop('disabled', false); // Enable the button

        if(inputReveal.hasClass('active')) {
          inputReveal.removeClass('active');
        }

        if(applySingle.hasClass('disabled')) {
          applySingle.removeClass('disabled');
        }

      }, 1500);
    }
    else {

      setTimeout(function() {
        applySingle.prop('disabled', false); // Enable the button

        if(applySingle.hasClass('disabled')) {
          applySingle.removeClass('disabled');
        }

      }, 1500);
    }
  }
  else {

    if(inputReveal.css('opacity') == '0') {
      inputReveal.css('opacity', '1');

      setTimeout(function() {
        applySingle.prop('disabled', false); // Enable the button
  
        if(applySingle.hasClass('disabled')) {
          applySingle.removeClass('disabled');
        }

      }, 1500);
    }
    else if(inputReveal.css('opacity') == '1' && !inputReveal.hasClass('active')) {
      inputReveal.addClass('active');
  
      setTimeout(function() {
        inputReveal.css('opacity', '0');
        applySingle.prop('disabled', false); // Enable the button

        if(inputReveal.hasClass('active')) {
          inputReveal.removeClass('active');
        }

        if(applySingle.hasClass('disabled')) {
          applySingle.removeClass('disabled');
        }

      }, 1500);
    }
  
    if(!labelReveal.attr('style')) {
      labelReveal.css('animation', 'none');
    }
    else if(labelReveal.attr('style') && labelReveal.css('animation') == '0s ease 0s 1 normal none running none') {
      labelReveal.css('animation', '');
    }
  }
}

// Apply singles and Apply all functionality
function applyGeneration($) {
  //Meta fields by id
  var metaTitle = $('#seo_central_meta_title'),
  metaDesc = $('#seo_central_meta_description'),
  metaPrime = $('#seo_central_prime_keyphrase'),
  metaSub = $('#seo_central_add_keyphrases'),
  metaSubWrapper = $('.main-secondary-phrases');

  //Generation fields by id
  var genTitle = $('#generated_meta_title'),
  genDesc = $('#generated_meta_description'),
  genPrime = $('#generated_meta_prime'),
  genSub = $('#generated_meta_second'),
  genSubWrapper = $('.generated-secondary-wrapper');

  // Apply buttons and flow backgrounds
  var singleApplies = $('.seo-central-button-apply-single'),
      applyAll = $('#seo-central-apply-all-meta'),
      flowWrapper = $('.seo-central-metabox-apply-flow');

  // Set click events for each single apply based on id
  if(singleApplies) {
    singleApplies.each(function(index) {

      // Set to active state on initial call of this function
      if(!$(this).hasClass('active')) {
        $(this).addClass('active')
      }

      // Set click event to apply single item
      $(this).on('click', function(index) {
        return function() { 

          // Update the innerText/Symbol and update the values from the fields
          var innerText = $(this).find('.seo-central-button-apply-single-text');
          var currentWrap = flowWrapper[index];
          
          //Apply Content from Generated to meta field
          if(!$(this).hasClass('copied')) {
            // Apply copied class to set the undo's
            $(this).addClass('copied');
            innerText.text("Undo");
            
            if(!currentWrap.classList.contains('active')) {
              currentWrap.classList.add('active');
            }
  
            //Storing the original values into the previous dataset to be able to undo one step prior
            if($(this).attr('id') == 'apply_meta_title') {
              genTitle.data('previous', metaTitle.val())
              metaTitle.val(genTitle.val());
              
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_title'),$('label[for="generated_meta_title"]'), $(this));
  
            }
            else if($(this).attr('id') == 'apply_meta_description') {
              genDesc.data('previous', metaDesc.val());
              metaDesc.val(genDesc.val());

              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_description'),$('label[for="generated_meta_description"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_prime_keyphrase') {
              genPrime.data('previous', metaPrime.val());
              metaPrime.val(genPrime.val());

              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_prime'),$('label[for="generated_meta_prime"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_add_keyphrases') {
              genSub.data('previous', metaSub.val());
              metaSub.val(genSub.val());

              
              //After updated subkeywords value then update the visual of the span items
              var subPhrases = genSub.val().split(", ");
              
              metaSubWrapper.find('span').remove();
              
              //Update the visuals as well
              for(let i=0; i < subPhrases.length; i++) {
                var newSpan = $('<span class="seo-keyphrase-item" >'+subPhrases[i]+'</span>');

                //Each New Span requires the double click event to click into and edit
                setVariableDoubleClick($, newSpan);

                metaSubWrapper.append(newSpan);
              }
              // Update the visuals of the input overlay and label animation
              revealSingleSecondary($,$('#overlay_meta_second'),$('label[for="generated_meta_second"]'), $(this));
            }
  
          }
          else if($(this).hasClass('copied')) {//Un-apply Content from Generated to meta field
            
            //Using the previous dataset return the fields to the original value
            if($(this).attr('id') == 'apply_meta_title') {
              metaTitle.val(genTitle.data('previous'));          
              
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_title'),$('label[for="generated_meta_title"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_meta_description') {
              metaDesc.val(genDesc.data('previous'));

              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_description'),$('label[for="generated_meta_description"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_prime_keyphrase') {
              metaPrime.val(genPrime.data('previous'));

              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_prime'),$('label[for="generated_meta_prime"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_add_keyphrases') {
              metaSub.val(genSub.data('previous'));

              
              var subPhrases = genSub.data('previous').split(", ");
              
              metaSubWrapper.find('span').remove();
              
              //Update the visuals as well
              for(let i=0; i < subPhrases.length; i++) {
                var newSpan = $('<span class="seo-keyphrase-item" >'+subPhrases[i]+'</span>');

                //Each New Span requires the double click event to click into and edit
                setVariableDoubleClick($, newSpan);

                metaSubWrapper.append(newSpan);
              }
              // Update the visuals of the input overlay and label animation
              revealSingleSecondary($,$('#overlay_meta_second'),$('label[for="generated_meta_second"]'), $(this));
            }
            
            //Remove the copied class and update text
            $(this).removeClass('copied');
            innerText.text("Apply");
  
            if(currentWrap.classList.contains('active')) {
              currentWrap.classList.remove('active');
            }
          }
  
          //At the end of application re-run the page analysis
          pageAnalysis( $ );

          return false;
        };
      }(index));
    });
  }

  // Apply all button should copy over everything
  if(applyAll) {

    var applyAllText = applyAll.find('.seo-central-button-apply-all-text');

    if(!applyAll.hasClass('active')){
      applyAll.addClass('active');
      applyAll.addClass('apply-copy');
    }
    
    applyAll.on('click', function() {

      applyAll.prop('disabled', true); // Disable the button

      if(!applyAll.hasClass('disabled')) {
        applyAll.addClass('disabled');
      }

      // Set all the values to the meta fields and update all singles to have the copied class
      singleApplies.each(function(index) {
        var innerText = $(this).find('.seo-central-button-apply-single-text');
        var currentWrap = flowWrapper[index];

        // The apply copy class will only allow copy to be placed into meta fields, and vice versa for the remove copy (Only do one at a time)
        if(applyAll.hasClass('apply-copy')){

          if(!$(this).hasClass('copied')) {
            // Apply copied class to set the undo's
            $(this).addClass('copied');
            innerText.text("Undo");
  
            if(!currentWrap.classList.contains('active')) {
              currentWrap.classList.add('active');
            }
  
            if($(this).attr('id') == 'apply_meta_title') {
              genTitle.data('previous', metaTitle.val())
              metaTitle.val(genTitle.val());
  
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_title'),$('label[for="generated_meta_title"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_meta_description') {
              genDesc.data('previous', metaDesc.val());
              metaDesc.val(genDesc.val());
            
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_description'),$('label[for="generated_meta_description"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_prime_keyphrase') {
              genPrime.data('previous', metaPrime.val());
              metaPrime.val(genPrime.val());
  
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_prime'),$('label[for="generated_meta_prime"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_add_keyphrases') {
              genSub.data('previous', metaSub.val());
              metaSub.val(genSub.val());
  
              
              //After updated subkeywords value then update the visual of the span items
              var subPhrases = genSub.val().split(", ");
              
              metaSubWrapper.find('span').remove();
              
              //Update the visuals as well
              for(let i=0; i < subPhrases.length; i++) {
                var newSpan = $('<span class="seo-keyphrase-item" >'+subPhrases[i]+'</span>');

                //Each New Span requires the double click event to click into and edit
                setVariableDoubleClick($, newSpan);

                metaSubWrapper.append(newSpan);
              }
              // Update the visuals of the input overlay and label animation
              revealSingleSecondary($,$('#overlay_meta_second'),$('label[for="generated_meta_second"]'), $(this));
            }
  
          }
        }
        else if(applyAll.hasClass('remove-copy')) {

          if($(this).hasClass('copied')) {//Un-apply Content from Generated to meta field
              
            //Using the previous dataset return the fields to the original value
            if($(this).attr('id') == 'apply_meta_title') {
              metaTitle.val(genTitle.data('previous'));          
              
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_title'),$('label[for="generated_meta_title"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_meta_description') {
              metaDesc.val(genDesc.data('previous'));
  
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_description'),$('label[for="generated_meta_description"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_prime_keyphrase') {
              metaPrime.val(genPrime.data('previous'));
  
              // Update the visuals of the input overlay and label animation
              revealSingleTrigger($,$('#overlay_meta_prime'),$('label[for="generated_meta_prime"]'), $(this));
            }
            else if($(this).attr('id') == 'apply_add_keyphrases') {
              metaSub.val(genSub.data('previous'));
  
              
              var subPhrases = genSub.data('previous').split(", ");
              
              metaSubWrapper.find('span').remove();
              
              //Update the visuals as well
              for(let i=0; i < subPhrases.length; i++) {
                var newSpan = $('<span class="seo-keyphrase-item" >'+subPhrases[i]+'</span>');

                //Each New Span requires the double click event to click into and edit
                setVariableDoubleClick($, newSpan);

                metaSubWrapper.append(newSpan);
              }
              // Update the visuals of the input overlay and label animation
              revealSingleSecondary($,$('#overlay_meta_second'),$('label[for="generated_meta_second"]'), $(this));
            }
            
            //Remove the copied class and update text
            $(this).removeClass('copied');
            innerText.text("Apply");
  
            if(currentWrap.classList.contains('active')) {
              currentWrap.classList.remove('active');
            }
          }
        }
      });

      //Flip Class of apply all at the end
      if(applyAll.hasClass('apply-copy')){
        applyAll.removeClass('apply-copy');
        applyAll.addClass('remove-copy');

        applyAllText.text('Undo All');
      }
      else if(applyAll.hasClass('remove-copy')){
        applyAll.removeClass('remove-copy');        
        applyAll.addClass('apply-copy');

        applyAllText.text('Apply All');
      }

      //Set delay in between clicks to let the animations complete
      setTimeout(function() {
        applyAll.prop('disabled', false); // Enable the button

        if(applyAll.hasClass('disabled')) {
          applyAll.removeClass('disabled');
        }
      }, 1500);

      //At the end of application re-run the page analysis
      pageAnalysis( $ );

      return false;
    });
  }
}

// When the generate again button is clicked make sure to refresh the values of previous in the event they are updated before click
function resetPreviousData($, aiData) {
  //Meta fields by id
  var metaTitle = $('#seo_central_meta_title'),
  metaDesc = $('#seo_central_meta_description'),
  metaPrime = $('#seo_central_prime_keyphrase'),
  metaSub = $('#seo_central_add_keyphrases'),
  metaSubWrapper = $('.main-secondary-phrases');

  //Generation fields by id
  var genTitle = $('#generated_meta_title'),
  genDesc = $('#generated_meta_description'),
  genPrime = $('#generated_meta_prime'),
  genSub = $('#generated_meta_second'),
  genSubWrapper = $('.generated-secondary-wrapper');

  var singleApplies = $('.seo-central-button-apply-single'),
      flowWrapper = $('.seo-central-metabox-apply-flow'); 

  singleApplies.each(function(index) {
    var innerText = $(this).find('.seo-central-button-apply-single-text');
    var currentWrap = flowWrapper[index];

    if($(this).hasClass('copied')) {
      $(this).removeClass('copied');

      innerText.text('Apply');

      if(currentWrap.classList.contains('active')) {
        currentWrap.classList.remove('active');
      }
    }
  });

  //Every regenerate save the current text value from the fields to the previous dataset to properly undo to the previous value on undo
  genTitle.data('previous', metaTitle.val())
  genDesc.data('previous', metaDesc.val());
  genPrime.data('previous', metaPrime.val());
  genSub.data('previous', metaSub.val());
}


// function used Really regenerate results from api after the limit is hit
function resetApiResults( $ ) {

  let errorMessage; // New variable here
  let postId; // New variable here
  
  const reRequestResults = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': myThemeParams.apiKey,
      'Domain': myThemeParams.site_domain
    },
    body: JSON.stringify({"role":"user","content":`${myThemeParams.body['stringbody']}`})
  };
  return fetch('https://app.seocentral.ai/api/v1/seocentral', reRequestResults)
    .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      postId = data.id; // Adjusted this line

      if(response.ok) {

        const newResponses = data.response.map((res) => {
          const metaDescription = res.metaDescription.replace(/["']/g, "");
          const primaryKeyword = res.primaryKeyword.replace(/["']/g, "");
          const secondaryKeywords = res.secondaryKeywords.split(', ').map(keyword => keyword.replace(/['"\d.]/g, ""));
          const title = res.title.replace(/["']/g, "");
          return { metaDescription, primaryKeyword, secondaryKeywords, title };
        });
        
        // Store everything in an object
        var aiData = {
          title: [],
          description: [],
          primeKeywords: [],
          subKeywords: [],
        }
        
        // Single pass through the newResponses
        newResponses.forEach(res => {
          aiData.title.push(res.title);
          aiData.description.push(res.metaDescription);
          aiData.primeKeywords.push(res.primaryKeyword);
          aiData.subKeywords.push(res.secondaryKeywords);
        });

        return aiData;

      }
    })
    .catch(error => {
      errorMessage = error;
      console.error('There was an error!', error);
      return false;
    });
}

// Used for secondary keyword spans that are generated
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
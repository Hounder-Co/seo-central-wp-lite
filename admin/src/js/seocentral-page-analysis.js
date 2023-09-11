export function pageAnalysis( $ ) {
  //Page analysis updates the score
  if($('.seo-central-page-score.svg-wrapper')[0]) {
    //Check to see if all the page fields requirements are met return true, else display what fields to need be fixed
    //Each meta field has a tracker on page analysis that must be updated on load and update of the fields.
    var allTrackers = $('.seo-central-analysis-item'),
        csToggle = $('#seo_central_meta_cornerstone'),
        metaTitle = $('#seo_central_meta_title'),
        titleTracker = $('#seo-central-title-tracker .seo-central-analysis-tracker-text'),
        metaDesc = $('#seo_central_meta_description'),
        descTracker = $('#seo-central-description-tracker .seo-central-analysis-tracker-text'),
        metaPrime = $('#seo_central_prime_keyphrase'),
        primeTracker = $('#seo-central-prime-keyword-tracker .seo-central-analysis-tracker-text'),
        metaSub = $('#seo_central_add_keyphrases'),
        subTracker = $('#seo-central-sub-keywords-tracker .seo-central-analysis-tracker-text'),
        wordCount = $('#seo_central_wordcount'),
        wordTracker = $('#seo-central-wordcount-tracker .seo-central-analysis-tracker-text'),
        exUrls = $('#seo_central_outgoing_externals'),
        exUrlTracker = $('#seo-central-external-link-tracker .seo-central-analysis-tracker-text'),
        enUrls = $('#seo_central_outgoing_internals'), 
        enUrlTracker = $('#seo-central-internal-link-tracker .seo-central-analysis-tracker-text'),
        http_status = $('#seo_central_http_status'),
        flesch_score = $('#seo_central_flesch_score'),
        robots = $('.seo-central-metabox-robot-row'),
        slug = $('#seo_central_slug'),
        finalScore = $('#seo_central_page_score');

    //Use this seo score array to pass into functions to update the score and flag
    var seoData = {
      seoScore: 0, //Start the score at 0, for every successful check add the point value tied with that seo field/check
      seoFlag: true //Set the flag for determining whether all page analysis checks have been made sucessfully 
    };
    
    //Every Field has a point weight towards the score, as well as other checks (Important Items hold more weight)
    var seoPointsArray = [ //Adjustable score system following the excel sheet/score system above
      ["<title>", 9, ""], //✓ <Title> 9 points
      ["meta_description", 8, ""], //✓ Meta Description 8 points
      ["meta_title", 7, ""], //✓ Meta Title 7 points
      ["http_success", 7, ""], //✓ Page has successful HTTP status code - 7 points
      ["image_alts", 7, ""], //✓ All images have alt attributes and text - 7 points
      ["rel=canonical", 6, ""], //✓ Document has a valid "rel=canonical" - 6 points
      ["legible_fonts", 7, ""], //js request adjustment (defaulted)
      ["tap_targets", 7, ""],   //curl request adjustment (defaulted)
      ["prime_key_use_accuracy", 8, ""], //✓ Primary Keyphrase use and accuracy - 8 points
      ["word_count", 6, ""], //✓ Document has a minimum word count of 600 words or 900 if set as a cornerstone page - 6 points
      ["prime_key_slug", 8, ""], //✓ Use of primary keyword in URL slug - 8 points
      ["second_key_use_accuracy", 4, ""], //✓ Secondary Keyphrase use and accuracy - 4 points
      ["meta_viewport", 3, ""], //✓ Has a <meta name="viewport"> tag with width or initial-scale - 3 points
      ["links_descriptive", 2, ""], //✓ Links have descriptive text (text within link is accurate) - 2 points
      ["links_crawlable", 3, ""],   //✓ Links are crawlable (all hrefs have proper links) - optional - 3 points
      ["no_block_index", 3, ""], //✓ Page isn't blocked from indexing (robots.txt) - 3 points
      ["internal_external_count", 3, ""], //✓ Internal and External Links count (cornerstone content should have a minimum of 2 external links) - 3 points
      ["robots_enabled", 2, ""] //✓ Are robots enabled for the page? - 2 points
    ];

    //Defaulting score for fonts and tap targets until we reach a solution for these 2 values
    seoData.seoScore += setSeoScore("legible_fonts", seoPointsArray, "Success"); 
    seoData.seoScore += setSeoScore("tap_targets", seoPointsArray, "Success");

    //The Header items for <title>, <meta viewport>, <link rel="canonical"> are returned through myThemeParams and used for scoring
    headerAnalysis(seoData, seoPointsArray);

    //Set up the internal and external links using the myThemeParams links array
    linksAnalysis($, seoData, seoPointsArray, enUrls, enUrlTracker, exUrls, exUrlTracker, csToggle);

    // Check the http status code, wordcount, flesch score, and robots for scoring
    itemAnalysis(seoData, seoPointsArray, http_status, wordCount, flesch_score, robots, csToggle);

    // Set Points for Meta Title and Meta Description
    titleDescriptionAnalysis(seoData, seoPointsArray, metaTitle, metaDesc, csToggle);

    // Set Points for Primary Keyword 
    primeKeywordAnalaysis(seoData, seoPointsArray, csToggle, metaPrime, slug);

    
    //If all checks are satisifed display the green light for page analysis
    if(seoData.seoFlag === true) {
      $('#seo-central-analysis-tracker').addClass('seo-central-flag-complete');
      
      $('#seo_central_page_analysis').val('true');
    }
    else { //If checks are not satisfied display red light and show what fields need adjusments. 
      $('#seo-central-analysis-tracker').addClass('seo-central-flag-incomplete');
      
      $('#seo_central_page_analysis').val('false');
    }
    
    //Set the value of the final score to this field, used for reporting and displaying SEO score
    if(finalScore[0]) {
      //Save score to the hidden score field that is utilzed to display seo scoring of page
      finalScore.val(seoData.seoScore);
    }
    
    //Pro Functionality
    // Set Points for Secondary Keywords
    // subKeywordAnalysis(seoData, seoPointsArray, metaSub); 
    
    // Update visual for score circle
    updateScoreDisplay( $ );
    
    

    // Store all the success items in one array, and the Warnings and Errors together in another for the display
    var successArray = [];
    var warningsAndErrorsArray = [];

    // Save the seoPointsArray into the 2 arrays to display messaging
    for (var i = 0; i < seoPointsArray.length; i++) {
      if (seoPointsArray[i][2] === "Success") {
        successArray.push(seoPointsArray[i]);
      } else if (seoPointsArray[i][2] === "Warning" || seoPointsArray[i][2] === "Error") {
        warningsAndErrorsArray.push(seoPointsArray[i]);
      }
    }

    // Display Warning & Error messages
    // displayWarningErrors(warningsAndErrorsArray);

    // Display Success messages
    // displaySuccess(successArray);

  }
}

//Set up the content hiearchy display on the page analysis
export function contentHierarchy( $ ) {
    if($('.js-content-hierarchy')) {
      if(myThemeParams.body['hierarchy'] != undefined) {
        for(let i=0; i < myThemeParams.body['hierarchy'].length; i++) {
          if(myThemeParams.body['hierarchy'][i][0]['content'] != ""){
            $('.js-content-hierarchy').append(`<p><strong>${myThemeParams.body['hierarchy'][i][0]['tag']}:</strong> ${myThemeParams.body['hierarchy'][i][0]['content']}</p>`);
          }
        }
      }
    }
}

//Utilize this function to update the seoscore based off the item 
function getScoreByTitle(title, seoScores) {
  for (var i = 0; i < seoScores.length; i++) {
    if (seoScores[i][0] === title) {
      // console.log(seoScores[i][1] + title);
      return seoScores[i][1];
    }
  }
  return null; // Return null if title not found in the array
}

// Utilize this function to update the score based of the item provided
// Pass the flag for success, warning, or error to set the points to the score, this also updates the states in the score array
function setSeoScore(title, seoScores, status) {
  for (var i = 0; i < seoScores.length; i++) {
    if (seoScores[i][0] === title) { //&& seoScores[i][2] === ""
      seoScores[i][2] = status; // Update the status in the third spot

      if (status === "Success") {
        // console.log(seoScores[i][1] + title);
        return seoScores[i][1];
      } else if (status === "Warning") {
        return Math.ceil(seoScores[i][1] / 2); // Round up to the nearest whole number
      } else if (status === "Error") {
        return 0;
      }
    }
  }
  return null;
}

// Page Analysis Breakdown (Seperated checks based on type)
// Page Header Analysis
function headerAnalysis(seoData, seoPointsArray) {

  // assume these items are missing, set to true if they exist
  var titleFlag = false,
      viewFlag = false,
      canonFlag = false;

  // The Curl Request has the header returned from the body checks for <title>, meta viewport, link canonical.
  if(myThemeParams.body['header']) {

    for(let i=0; i < myThemeParams.body['header'].length; i++) {

      //Score for <title> tag
      if(myThemeParams.body['header'][i]['tag'] == 'title') {

        if(myThemeParams.body['header'][i]['content'] != '') {
          seoData.seoScore += setSeoScore("<title>", seoPointsArray, "Success");
          titleFlag = true;
        }
        else {
          seoData.seoScore += setSeoScore("<title>", seoPointsArray, "Error");
          titleFlag = true;
        }

      }

      //Score for <meta name="viewport" content="width=device-width, initial-scale=1">  (this should have at least a width or initial scale)
      if(myThemeParams.body['header'][i]['tag'] == 'meta') {

        if(myThemeParams.body['header'][i]['name'] == 'viewport') {
          if(myThemeParams.body['header'][i]['content'].indexOf('width') !== -1 || myThemeParams.body['header'][i]['content'].indexOf('initial-scale') !== -1) {
            seoData.seoScore += setSeoScore("meta_viewport", seoPointsArray, "Success");
            viewFlag = true;
          }
          else {
            seoData.seoScore += setSeoScore("meta_viewport", seoPointsArray, "Error");
            viewFlag = true;
          }
        }

      }

      //Score for <link rel="canonical" href="https://example.com/">
      if(myThemeParams.body['header'][i]['tag'] == 'link') {

        if(myThemeParams.body['header'][i]['rel'] == 'canonical') {
          if(myThemeParams.body['header'][i]['href'] != '') {
            seoData.seoScore += setSeoScore("rel=canonical", seoPointsArray, "Success");
            canonFlag = true;
          }
          else {
            seoData.seoScore += setSeoScore("rel=canonical", seoPointsArray, "Error");
            canonFlag = true;
          }
        }

      }
    }

    // If title, viewport, or canonical flag have not been set true then the item was missing from myThemeParams.body['header'] so assign errors to those checks
    titleFlag == false ? seoData.seoScore += setSeoScore("<title>", seoPointsArray, "Error") : '';
    viewFlag == false ? seoData.seoScore += setSeoScore("meta_viewport", seoPointsArray, "Error") : '';
    canonFlag == false ? seoData.seoScore += setSeoScore("rel=canonical", seoPointsArray, "Error") : '';
  }
}

// Page Links Analysis 
function linksAnalysis($, seoData, seoPointsArray, enUrls, enUrlTracker, exUrls, exUrlTracker, csToggle) {

  // Flag variables for the link checks
  //Set score crawlable links and descriptive link text
  var linksFlag = true,
      crawlFlag = true,
      linkTextFlag = true;

  //Set up the internal and external links using the myThemeParams links array
  if(enUrls[0]) {
    enUrls.val(myThemeParams.links['internals']['count']);

    if(csToggle.val() == 'cornerstone') {
      var minInternals = 5;
    }
    else {
      var minInternals = 3;
    }

    if((enUrls.val() >= minInternals)) {
      $('#seo-central-internal-link-tracker').addClass( "perfect-seo-score" );
      enUrlTracker.text('Inbound Link minimum met!');
    }
    else {
      enUrlTracker.text(`Need minimum of ${minInternals} Inbound Links`);
      linksFlag = false;
    } 
  }

  //External Url check, utilize the externals count to see how many external links exist on the page
  if(exUrls[0]){
    exUrls.val(myThemeParams.links['externals']['count']);

    if(csToggle.val() == 'cornerstone') {
      if((exUrls.val() >= 2)) {
        $('#seo-central-external-link-tracker').addClass( "perfect-seo-score" );
        exUrlTracker.text('Outbound Link minimum met!');
      }
      else {
        exUrlTracker.text('Need minimum of 2-3 Outbound Links');
        linksFlag = false;
      }
    }
    else {
      exUrlTracker.text('Outbound Link minimum met!');
    }
  }

  //After checking both internals and externals urls if they both pass add to the score
  if(linksFlag == true) {
    seoData.seoScore += setSeoScore("internal_external_count", seoPointsArray, 'Success');
  }
  else {
    seoData.seoScore += setSeoScore("internal_external_count", seoPointsArray, 'Error');
  }

  for(let i=0; i < myThemeParams.links['crawlables']['check'].length; i++) {
    
    if(myThemeParams.links['crawlables']['check'][i].indexOf('Warning:') !== -1) {
      crawlFlag = false;
    }

    if(myThemeParams.links['crawlables']['descriptive'][i].indexOf('Warning:') !== -1) {
      linkTextFlag = false;
    }
  }
  
  //Update score if all links are crawalable
  if(crawlFlag == true) {
    seoData.seoScore += setSeoScore("links_crawlable", seoPointsArray, "Success");
  }
  else {
    seoData.seoScore += setSeoScore("links_crawlable", seoPointsArray, "Error");
  }

  //Update score if all links have non-generic descriptive text
  if(linkTextFlag == true) {
    seoData.seoScore += setSeoScore("links_descriptive", seoPointsArray, "Success");
  }
  else {
    seoData.seoScore += setSeoScore("links_descriptive", seoPointsArray, "Error");
  }
}


// Page Item Analysis for http status, wordcount, flesh score, robots
function itemAnalysis(seoData, seoPointsArray, http_status, wordCount, flesch_score, robots, csToggle) {
  //Set the http_status code from the curl request to field for proper scoring. 
  if(http_status[0]) {
    http_status.val(myThemeParams.body['http_status']);

    //Check for the curl request Success message
    if(http_status.val().indexOf('Success') !== -1) {
      seoData.seoScore += setSeoScore("http_success", seoPointsArray, "Success");
    }
    else {
      seoData.seoScore += setSeoScore("http_success", seoPointsArray, "Error");
    }
  }

  //Set the wordcount to the page analysis fields
  if(wordCount[0]) {
    wordCount.val(myThemeParams.body['flesch']['wordcount']);

    if(csToggle.val() == 'cornerstone') {
      var countMinimum = 900;
    }
    else {
      var countMinimum = 600;
    }

    // console.log(wordCount.val());

    if((wordCount.val() >= countMinimum)) {
      seoData.seoScore += setSeoScore("word_count", seoPointsArray, "Success");
    }
    else if(wordCount.val() < countMinimum) {
      seoData.seoScore += setSeoScore("word_count", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
  }

  //Set the readablity scores to the page analysis fields (Not tied with the seo scoring)
  if(flesch_score[0]) {
    flesch_score.val(myThemeParams.body['flesch']['medianGrade']);
  }

  // Check to see if robots have been enabled for scoring
  if(robots) {
    // Retrieve the index and follow values
    var robots_index = robots[0].querySelector('.seo-central-radio-input:checked'),
    robots_follow = robots[1].querySelector('.seo-central-radio-input:checked');

    if(robots_index.value == 'yes' && robots_follow.value == 'yes') {
      seoData.seoScore += setSeoScore("robots_enabled", seoPointsArray, "Success");
    }
    else {
      seoData.seoScore += setSeoScore("robots_enabled", seoPointsArray, "Error");
    }

    if(robots_index.value == 'yes') {
      seoData.seoScore += setSeoScore("no_block_index", seoPointsArray, "Success");
    }
    else {
      seoData.seoScore += setSeoScore("no_block_index", seoPointsArray, "Error");
    }
  }
}

function titleDescriptionAnalysis(seoData, seoPointsArray, metaTitle, metaDesc, csToggle) {
  if((metaTitle.val().length >= 20) && (metaTitle.val().length <= 70)) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Success");
  }
  else if(metaTitle.val().length > 70) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Warning");
    seoData.seoFlag = false;
  }
  else if(metaTitle.val().length < 20) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Error");
    seoData.seoFlag = false;
  }

  //Specify more conditions when page is marked as cornerstone
  if(csToggle.val() == 'cornerstone') {
    var minCount = 120,
        maxCount = 156;
  }
  else {
    var minCount = 150,
        maxCount = 160;
  }

  if(metaDesc.val().length >= minCount && metaDesc.val().length <= maxCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Success');
  }
  else if(metaDesc.val().length < minCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Error');
    seoData.seoFlag = false;
  }
  else if(metaDesc.val().length > maxCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Warning');
    seoData.seoFlag = false;
  }
}

//Checks for the primary keyword usage, accuracy, and use in slug.
//And check for empty alt tags
function primeKeywordAnalaysis(seoData, seoPointsArray, csToggle, metaPrime, slug) {
  if(metaPrime.val()) {

    //3 minimum primary keywords in title/h1 and first paragraph should have primary keywords
    //Every instance of the primary keyword within the heading tags (with exception to h1/title only counting for 1 point together, They both require the primary)
    //Base page minimum count is 3 instances, cornerstone page requires 5 instances 
    var primeCount = 0,
        minPrime = 3,
        firstParagaphs = myThemeParams.body['stringbody'].slice(0, 350); //First 350 characters of the page

    //Individual check if the prime keyword is in the Title and H1 of the page.
    var primeFlags = {
      title: 'no-title',
      heading: 'no-heading',
    }

    //Set the minimum count for primary keywords based on cornerstone toggle
    if(csToggle.val() == 'cornerstone') {
      var minPrime = 5;
    }

    //Check for primary keyphrase within the content hierarchy and image alt texts, every instance of the keyphrase should increment the count
    for(let i=0; i < myThemeParams.body['hierarchy'].length; i++){
      //Access the body hierarchy array and check for primary keyhprase
      if(myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {

        //Only increment primeCount for usage outside of the title and h1 since those are counted as 1 point together
        if(myThemeParams.body['hierarchy'][i][0]['tag'] !== 'title' && myThemeParams.body['hierarchy'][i][0]['tag'] !== 'h1'){
          primeCount++;
        }

        //Strip out the rest of the headings from the first paragraph to properly get count of remaining primary keywphrase not located in headings
        firstParagaphs = firstParagaphs.replace(myThemeParams.body['hierarchy'][i][0]['content'],'');
      }

      if(primeFlags.title == 'no-title' || primeFlags.heading == 'no-heading') {
        //Set the unique flag for the Title tag
        if(myThemeParams.body['hierarchy'][i][0]['tag'] == 'title'){
          if(myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
            primeFlags.title = "title-contains-keyphrase";
          }
          else {
            primeFlags.title = "title-lacks-keyphrase";
          }
        }
        
        //Set the unique flag for the "Main Title", if  the page has an h1 as its main title show if the keyphrase is used within the main title
        if(myThemeParams.body['hierarchy'][i][0]['tag'] == 'h1'){
          if(myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
            primeFlags.heading = "heading-contains-keyphrase";
          }
          else {
            primeFlags.heading = "heading-lacks-keyphrase";
          }
        }
      }
    }

    //Add to the primeCount if both title and h1 contain the primary keyword
    if(primeFlags.title == 'title-contains-keyphrase' && primeFlags.heading == 'heading-contains-keyphrase') {
      primeCount++;
    }
    
    //Check all the alt text from the images on page, add to the count primary count if primary keyphrase is being referenced
    var emptyAlts = false;
    for(let i=0; i < myThemeParams.body['images'].length; i++){

      //Increment primary count when used in image alts
      if(myThemeParams.body['images'][i][0]['alt'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
        primeCount++;
      }

      if(myThemeParams.body['images'][i][0]['alt'] == '') {
        emptyAlts = true;
      }
    }

    //if there are any images are missing any text set warning, else if all text is good set success message
    if(emptyAlts == false) {
      seoData.seoScore += setSeoScore("image_alts", seoPointsArray, "Success");
    }
    else {
      seoData.seoScore += setSeoScore("image_alts", seoPointsArray, "Warning");
    }

    //Lastly Get the count of each instance of the primary key within the first 350 characters of the page.
    //The main title and all headings should be excluded from this check since they have already been counted
    var regex = new RegExp(metaPrime.val(), "gi");
    var paragraphCount = (firstParagaphs.match(regex) || []).length;
    primeCount += paragraphCount;

    //primeCount and primeFlags must all pass to get success
    if(primeCount >= minPrime && primeFlags.title == "title-contains-keyphrase" && primeFlags.heading == "heading-contains-keyphrase") { //all checks passed
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Success");
    }
    else if(primeCount >= minPrime && primeFlags.title == "title-contains-keyphrase" && primeFlags.heading == "heading-lacks-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Warning");
      seoData.seoFlag = false;
    }
    else if(primeCount >= minPrime && primeFlags.title == "title-lacks-keyphrase" && primeFlags.heading == "heading-contains-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Warning");
      seoData.seoFlag = false;
    }
    else if(primeCount >= minPrime && primeFlags.title == "title-lacks-keyphrase" && primeFlags.heading == "heading-lacks-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
    else if(primeCount >= minPrime && primeFlags.title == "no-title" && primeFlags.heading == "no-heading") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
    else if(primeCount < minPrime && primeFlags.title == "no-title" || primeFlags.heading == "no-heading") { 
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
    else { 
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
  }
  else {
    seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error"); //Missing the field for primary keyword
    seoData.seoFlag = false;
  }

  //Slug check for the primary key, seperate from the count
  if(slug[0]) {
    if(slug.val().indexOf(metaPrime.val()) !== -1){
      seoData.seoScore += setSeoScore("prime_key_slug", seoPointsArray, "Success");
    }
    else {
      seoData.seoScore += setSeoScore("prime_key_slug", seoPointsArray, "Error");
    }
  }
}

//Sub keywor
// function subKeywordAnalysis(seoData, seoPointsArray, metaSub) {
//   if(metaSub.val()) {

//     //Split all the secondary phrases from the field and compare each phrase against the body content. 
//     var clean_phrases = metaSub.val().split(",");
//     var subFlag = true;
//     clean_phrases = clean_phrases.filter(item => item);

//     for(let i=0; i < clean_phrases.length; i++) {
//       if(myThemeParams.body['stringbody'].toLowerCase().indexOf(clean_phrases[i].toLowerCase()) != -1) {

//       }
//       else {
//         seoData.seoFlag = false;
//         subFlag = false;
//       }								
//     }

//     //If all secondary keyphrases are accurate add to the score
//     if(subFlag == true) {
//       seoData.seoScore += setSeoScore("second_key_use_accuracy", seoPointsArray, "Success");
//     }
//     else {
//       seoData.seoScore += setSeoScore("second_key_use_accuracy", seoPointsArray, "Error");
//     }
//   }
//   else {
//     seoData.seoScore += setSeoScore("second_key_use_accuracy", seoPointsArray, "Error");
//     seoData.seoFlag = false;
//   }
// }

// Input Page Analysis functionality 
function updateScoreDisplay( $ ) {
  const { __ } = wp.i18n;
  
  if($('.seo-central-page-score.svg-wrapper')[0]) {
    var finalScore = $('#seo_central_page_score'),
        scoreWrapper = $('.seo-central-page-score.svg-wrapper')[0];
    var overlayCircle = scoreWrapper.querySelector('.overlay-circle'),
        overlayText = scoreWrapper.querySelector('.percentage'),
        resultText = scoreWrapper.querySelector('.percent-result'),
        tempText = '',
        circleColor = '#23af7c'; //default green color

    var strokeArray = 525;

    //Retrieve the last score from the dataset, default to 0 if not present
    var lastScore = parseFloat(overlayCircle.dataset.lastScore) || 0;

    //Check if it's the initial load, default to "true" if not present
    var initialLoad = overlayCircle.dataset.initialLoad !== 'false';

    //Calculate the proportion of the score
    var proportionalScore = (finalScore.val() * strokeArray) / 100;

    //Update the visuals of the score
    circleColor = finalScore.val() <= 49 ? '#D5423C' : finalScore.val() <= 79 ? '#DFB314' : '#23af7c';

    //Update the visuals of the score bottom text
    if (finalScore.val() <= 49) {
        tempText = __("Yikes, needs work", "your-text-domain");
    } else if (finalScore.val() <= 59) {
        tempText = __("You can do better", "your-text-domain");
    } else if (finalScore.val() <= 79) {
        tempText = __("Not bad!", "your-text-domain");
    } else {
        tempText = __("Excellent!", "your-text-domain");
    }

    // If it's the initial load, create a keyframe animation
    if(initialLoad) {
      var animationName = 'progress';
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule(`@keyframes ${animationName} { 0% { stroke-dasharray: ${lastScore} ${strokeArray}; } 100% { stroke-dasharray: ${proportionalScore} ${strokeArray}; } }`, 0);
    }

    //Update the score within the stroke-dasharray and the text field
    overlayCircle.style.stroke = circleColor;
    overlayText.innerHTML = finalScore.val();
    resultText.innerHTML = tempText;

    //If it's the initial load, apply the animation
    if(initialLoad) {
      overlayCircle.style.animation = `${animationName} 1s ease forwards`;
      setTimeout(() => {
        overlayCircle.style.strokeDasharray = `${proportionalScore} ${strokeArray}`;
        overlayCircle.style.animation = '';
      }, 1000);
    }
    else {
      //If it's not the initial load, remove the animation and apply the transition
      overlayCircle.style.strokeDasharray = `${proportionalScore} ${strokeArray}`;
    }

    //Store the last score in the dataset
    overlayCircle.dataset.lastScore = proportionalScore;

    // If it was the initial load, set the flag to false for next time
    if(initialLoad) {
      overlayCircle.dataset.initialLoad = 'false';
    }
  }
}

// Update the score on input changes
export function updateScoreOnInput( $ ) {

  if($('.seo-central-page-score.svg-wrapper')[0]) {
    var metaTextAreas  = $('#seo-central-metabox-ai .seo-text-area'),
        metaInputs = $('#seo-central-metabox-ai .seo-central-text-input');
  
    metaInputs.each(function() {
      $(this).on('change', function() {
          pageAnalysis( $ );
      });
    });
  
    metaTextAreas.on('change', function() {
      pageAnalysis( $ );
    });
  }
}

// Set the display for the warnings and errors
function displayWarningErrors(warningsAndErrorsArray) {
  const { __ } = wp.i18n;

  var errorRows = document.querySelector('.seo-central-analysis-wrapper.warnings-errors');
  // Title, Warning Copy, Error Copy, Label Copy
  var errorWarningCopy = [
    ["<title>", __("Keep your meta title under 60-65 characters (it'll get cut off) and remember to use your primary keyword.", "seo-central-lite"), __("Your page is missing its meta title. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Title", "seo-central-lite")],
    ["meta_description", __("Your meta description is too long, and it might get cut off when displayed. Be more concise!", "seo-central-lite"), __("Meta descriptions help give your page context. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Description", "seo-central-lite")],
    ["meta_title", __("Keep your meta title under 60-65 characters (it'll get cut off) and remember to use your primary keyword.", "seo-central-lite"), __("Your page is missing its meta title. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Title", "seo-central-lite")], 
    ["http_success", __("None", "seo-central-lite"), __("Your page is giving errors to users accessing it. Check with your team to address this ASAP!", "seo-central-lite"), __("HTTP Status", "seo-central-lite")], 
    ["image_alts", __("Not all of your images have alt text - not only is your user accessibility low, but don't you're missing out on a keyword opportunity!", "seo-central-lite"), __("None of the images on this page has alt text. Please fill for accessibility and SEO.", "seo-central-lite"), __("Image Alts", "seo-central-lite")], 
    ["rel=canonical", __("None", "seo-central-lite"), __("Having the correct URL for rel=canonical helps ensure the correct pages are ranked. Check if yours is filled!", "seo-central-lite"), __("Meta Canonical Link", "seo-central-lite")], 
    ["legible_fonts", __("None", "seo-central-lite"), __("Making your content easy to read is key for user experience. Check text sizes and adjust!", "seo-central-lite"), __("Legible Fonts", "seo-central-lite")], 
    ["tap_targets", __("None", "seo-central-lite"), __("Appropriate tap target sizing helps users engaging with the right content. Edit yours to avoid a bad user experience.", "seo-central-lite"), __("Tap Targets", "seo-central-lite")],
    ["prime_key_use_accuracy", __("There's still some room to optimize your primary keyword placement: H1/title, meta description, headings, and first 300 characters.", "seo-central-lite"), __("Primary keywords should be added to your H1/title, meta description, headings, and first 300 characters.", "seo-central-lite"), __("Primary Keyword", "seo-central-lite")], 
    ["word_count", __("None", "seo-central-lite"), __("Are you sure you're writing enough as an authority on the topic? Expand on your content a bit more.", "seo-central-lite"), __("Word Count", "seo-central-lite")], 
    ["prime_key_slug", __("None", "seo-central-lite"), __("Using your primary keyword in the URL slug is important for ranking. Edit yours a bit to really make it count!", "seo-central-lite"), __("Slug Keyword", "seo-central-lite")], 
    ["second_key_use_accuracy", __("Make sure to write content around your secondary keywords - use them in your headings and body copy.", "seo-central-lite"), __("No secondary keywords are being used on this page. Check again?", "seo-central-lite"), __("Secondary Keywords", "seo-central-lite")], 
    ["meta_viewport", __("None", "seo-central-lite"), __("Without setting a <meta name='viewport'> tag, your content won't be shown properly.", "seo-central-lite"), __("Meta Viewport", "seo-central-lite")], 
    ["links_descriptive", __("Avoid choosing dull text links. Check your content again for any!", "seo-central-lite"), __("Links without descriptive text are boring and not SEO-friendly. Make them descriptive!", "seo-central-lite"), __("Descriptive Links", "seo-central-lite")], 
    ["links_crawlable", __("Setting links to 'nofollow' blocks crawlers from finding pages. Remember to use them strategically! ", "seo-central-lite"), __("All of your links are set as 'nofollow.' Was this on purpose? Check and make sure.", "seo-central-lite"), __("Crawlable Links", "seo-central-lite")],
    ["no_block_index", __("None", "seo-central-lite"), __("This page is currently blocked from being indexed - is this correct?", "seo-central-lite"), __("Robot Index", "seo-central-lite")], 
    ["internal_external_count", __("Having a few more links would help. Any other references you can add?", "seo-central-lite"), __("No internal/external links at all? Are you sure?", "seo-central-lite"), __("Internal & External Links", "seo-central-lite")], 
    ["robots_enabled", __("None", "seo-central-lite"), __("Letting crawlers follow all links on a page is an SEO best practice. You sure you want keep this disabled?", "seo-central-lite"), __("Robots Enabled", "seo-central-lite")]
  ]; 

  //Clear the previous results
  errorRows.innerHTML = "";

  //Go through the array and update the notifications
  warningsAndErrorsArray.forEach(item => {
    const match = errorWarningCopy.find(e => e[0] === item[0]);
    let itemPoints = 0;
    if (match) {
      let message;
      if (item[2] === 'Warning') {
        message = match[1]; // the warning message
        itemPoints = Math.ceil(item[1] / 2);

      } else if (item[2] === 'Error') {
        message = match[2]; // the error message
        itemPoints = 0;
      }
      
      if (message) {
        let itemClass = itemPoints !== 0 ? 'notification-warning' : 'notification-error';

        // Display the message in your UI...
        let notificationRow = `
        <div id='seo-central-${item[0]}-tracker' class='seo-central-analysis-item'>
          <p class='seo-central-analysis-title'>${match[3]}</p>
          <div class='seo-central-analysis-tracker-text ${itemClass}'>
            <span class='seo-central-analysis-tracker-text-content'>${message}</span>
            <p class="seo-central-analysis-tracker-text-score">${itemPoints} / ${item[1]}</p>
          </div>
        </div>
        `;

        errorRows.innerHTML += notificationRow;

        if(errorRows.classList.contains('hidden')) {
          errorRows.classList.remove('hidden');
        }
      }
    }
  });

}

function displaySuccess(successArray) {
  const { __ } = wp.i18n;

  var dropdownWrapper = document.querySelector('.seo-central-analysis-scores-dropdown.success');
  var successRows = dropdownWrapper.querySelector('.seo-central-analysis-scores-dropdown-body');

  // Title, Success Copy, Label Copy
  var successCopy = [
    ["<title>", __("Having a meta title is essential to ranking. Glad to see yours is set!", "seo-central-lite"), __("Meta Title", "seo-central-lite")],
    ["meta_description", __("Well done! Setting a meta description helps search engines provide a preview of your page.", "seo-central-lite"), __("Meta Description", "seo-central-lite")],
    ["meta_title", __("Having a meta title is essential to ranking. Glad to see yours is set!", "seo-central-lite"), __("Meta Title", "seo-central-lite")],
    ["http_success", __("A 200 HTTP status code means your page is accessible. This is ideal - keep it up!", "seo-central-lite"), __("HTTP Status", "seo-central-lite")],
    ["image_alts", __("Thank you for helping user accessibility by writing alt text for every image on this page!", "seo-central-lite"), __("Image Alts", "seo-central-lite")],
    ["rel=canonical", __("Good work! Having the right URL for rel=canonical helps search engines rank the correct page.", "seo-central-lite"), __("Meta Canonical Link", "seo-central-lite")],
    ["legible_fonts", __("Legibility is important, and we're happy you see it this way too. Nice work!", "seo-central-lite"), __("Legible Fonts", "seo-central-lite")],
    ["tap_targets", __("Tap target are all sized appropriate - Good work!", "seo-central-lite"), __("Tap Targets", "seo-central-lite")],
    ["prime_key_use_accuracy", __("This is what we like to see! Good job maximizing placement for your primary keywords.", "seo-central-lite"), __("Primary Keyword", "seo-central-lite")],
    ["word_count", __("You're an expert! Always try to cover your primary keyword/topic better than your next competitor.", "seo-central-lite"), __("Word Count", "seo-central-lite")],
    ["prime_key_slug", __("URL slugs are prime SEO real estate. Glad to see you take advantage of yours!", "seo-central-lite"), __("Slug Keyword", "seo-central-lite")],
    ["second_key_use_accuracy", __("Your secondary keywords look great - we see them in your headings and main content. ", "seo-central-lite"), __("Secondary Keywords", "seo-central-lite")],
    ["meta_viewport", __("<meta name='viewport'> is set! Your content will be visible within the settings you placed.", "seo-central-lite"), __("Meta Viewport", "seo-central-lite")],
    ["links_descriptive", __("Great job! Descriptive link text gives users + search engines context to the linked page.", "seo-central-lite"), __("Descriptive Links", "seo-central-lite")],
    ["links_crawlable", __("Nice work! Creating crawlable links help search engines find new content on your site.", "seo-central-lite"), __("Crawlable Links", "seo-central-lite")],
    ["no_block_index", __("This is great! Crawlers will be able to crawl your page, and people can peep it through search.", "seo-central-lite"), __("Robot Index", "seo-central-lite")],
    ["internal_external_count", __("Links help build relationships between content, and you're making them count!", "seo-central-lite"), __("Internal & External Links", "seo-central-lite")],
    ["robots_enabled", __("Well done! Enabling 'follow' lets crawlers know they should follow all the links on the page. You're following a best practice!", "seo-central-lite"), __("Robots Enabled", "seo-central-lite")]
  ];

  //Clear the items before
  successRows.innerHTML = ""; 
  
  successArray.forEach(item => {
    const match = successCopy.find(e => e[0] === item[0]);
    let itemPoints = 0;

    if (match) {
      let message;

      //Store the messaging and the score
      message = match[1]; // the success message
      itemPoints = item[1];
      
      if (message) {
        // Display the message in your UI...
        let notificationRow = `
        <div id='seo-central-${item[0]}-tracker' class='seo-central-analysis-item'>
          <p class='seo-central-analysis-title'>${match[2]}</p>
          <div class='seo-central-analysis-tracker-text notification-success'>
            <span class='seo-central-analysis-tracker-text-content'>${message}</span>
            <p class="seo-central-analysis-tracker-text-score">${itemPoints} / ${item[1]}</p>
          </div>
        </div>
        `;

        successRows.innerHTML += notificationRow;

        if(dropdownWrapper.classList.contains('hidden')) {
          dropdownWrapper.classList.remove('hidden');
        }
      }
    }
  });
}
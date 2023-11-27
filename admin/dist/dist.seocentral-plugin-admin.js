var seocentralEntry;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./admin/src/js/seocentral-google-preview.js":
/*!***************************************************!*\
  !*** ./admin/src/js/seocentral-google-preview.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "googlePreviews": () => (/* binding */ googlePreviews)
/* harmony export */ });
//Google Preview and Social Card Setup
function googlePreviews($) {
  'use strict';

  //Set this variable up for translation of strings
  var __ = wp.i18n.__;
  if ($('#google-social-card') && $('#google-preview-desktop') && $('#google-preview-mobile')) {
    $('#google-social-card').change(function () {
      //Disable desktop and mobile previews
      $('#google-preview-mobile')[0].checked = false;
      $('#google-preview-desktop')[0].checked = false;

      //Update the desktop and mobile wrappers based off of selected radio button
      if ($('.google-preview-mobile-wrapper')[0].classList.contains('active')) {
        $('.google-preview-mobile-wrapper')[0].classList.remove('active');
        $('.social-card-wrapper')[0].classList.add('active');
      }

      //Disable the google desktop and mobile previews 
      if ($('.google-preview-desktop-wrapper')[0].classList.contains('active')) {
        $('.google-preview-desktop-wrapper')[0].classList.remove('active');
        $('.social-card-wrapper')[0].classList.add('active');
      }
      return false;
    });
    $('#google-preview-desktop').change(function () {
      //If true then set mobile and social card to false
      $('#google-preview-mobile')[0].checked = false;
      $('#google-social-card')[0].checked = false;

      //Update the desktop and mobile wrappers based off of selected radio button
      if ($('.google-preview-mobile-wrapper')[0].classList.contains('active')) {
        $('.google-preview-mobile-wrapper')[0].classList.remove('active');
        $('.google-preview-desktop-wrapper')[0].classList.add('active');
      }

      //disable social card for the google previews
      if ($('.social-card-wrapper')[0].classList.contains('active')) {
        $('.social-card-wrapper')[0].classList.remove('active');
        $('.google-preview-desktop-wrapper')[0].classList.add('active');
      }
      return false;
    });
    $('#google-preview-mobile').change(function () {
      //If this is set to true then set desktop to false;
      $('#google-preview-desktop')[0].checked = false;
      $('#google-social-card')[0].checked = false;

      //Update the desktop and mobile wrappers based off of selected radio button
      if ($('.google-preview-desktop-wrapper')[0].classList.contains('active')) {
        $('.google-preview-desktop-wrapper')[0].classList.remove('active');
        $('.google-preview-mobile-wrapper')[0].classList.add('active');
      }

      //disable social card for the google previews
      if ($('.social-card-wrapper')[0].classList.contains('active')) {
        $('.social-card-wrapper')[0].classList.remove('active');
        $('.google-preview-mobile-wrapper')[0].classList.add('active');
      }
      return false;
    });
    if ($('#seo_central_social_image')) {
      $('#seo-central-media-trigger').click(function () {
        var upload = wp.media({
          title: 'Choose Image',
          //Title for Media Box
          multiple: false,
          //For limiting multiple image
          library: {
            type: ['image'] // this will only allow image types
          }
        }).on('select', function () {
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
            if ($('#seo-central-media-remove').hasClass('disabled')) {
              $('#seo-central-media-remove').removeClass('disabled');
              $('.seo-central-remove-image-file').html(attach.filename);
              if (!$('.seo-central-social-image-instruction').hasClass('hidden')) {
                $('.seo-central-social-image-instruction').addClass('hidden');
              }
            } else {
              $('.seo-central-remove-image-file').html(attach.filename);
              if (!$('.seo-central-social-image-instruction').hasClass('hidden')) {
                $('.seo-central-social-image-instruction').addClass('hidden');
              }
            }

            //Apply the new value to the social card asset 
            if ($('#seo_central_social_image').val()) {
              //console.log($('#seo_central_social_image').val())
              $('.social-card-asset').attr("src", $('#seo_central_social_image').val());
              $('#seo-central-media-trigger').html(__('Choose another file', 'seo-central-lite'));
            }
          } else {
            // alert('Please select an image file (.jpeg, .png, .gif). Videos and other file types are not allowed.');
            return false; // Prevent other file types from being processed
          }
        }).open();
        return false;
      });
      if ($('#seo-central-media-remove')[0]) {
        $('#seo-central-media-remove').click(function () {
          //Disable the button from reloading the page
          return false;
        });

        //Social Image selection update
        $('.seo-central-remove-image-close').click(function () {
          $('#seo-central-tabs input[name=seo_central_social_image]').val('');
          $('.social-card-asset').attr("src", '/wp-content/plugins/seo-central-wp-lite/admin/src/images/seo-placeholder-image.png');

          // Remove the value from the social image field
          $('#seo_central_social_image').val('');
          if (!$('#seo-central-media-remove').hasClass('disabled')) {
            $('#seo-central-media-remove').addClass('disabled');
          }
          $('#seo-central-media-trigger').html(__('Choose file', 'seo-central-lite'));
          if ($('.seo-central-social-image-instruction').hasClass('hidden')) {
            $('.seo-central-social-image-instruction').removeClass('hidden');
          }
          return false;
        });

        //On Load display the current file name from social card if one is saved already
        if (!$('#seo-central-media-remove').hasClass('disabled')) {
          var socialImage = $('.social-card-asset').attr('src');
          var filename = socialImage.split('/').pop();
          $('.seo-central-remove-image-file').html(filename);
          $('#seo-central-media-trigger').html(__('Choose another file', 'seo-central-lite'));
        }
      }
    }
    if ($('#seo_central_social_title')[0] && $('#seo_central_social_description')[0]) {
      //Live update social card's description and title on change
      $('.social-card-title')[0].innerHTML = $('#seo_central_social_title').val();
      $('#seo_central_social_title').on('input', function (e) {
        $('.social-card-title')[0].innerHTML = $('#seo_central_social_title').val();
      });

      //Live update social card's description and title on change
      $('.social-card-description')[0].innerHTML = $('#seo_central_social_description').val();
      $('#seo_central_social_description').on('input', function (e) {
        $('.social-card-description')[0].innerHTML = $('#seo_central_social_description').val();
      });
    }
  }
}

/***/ }),

/***/ "./admin/src/js/seocentral-lite-tips.js":
/*!**********************************************!*\
  !*** ./admin/src/js/seocentral-lite-tips.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "metaboxLiteTips": () => (/* binding */ metaboxLiteTips)
/* harmony export */ });
/* harmony import */ var driver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! driver.js */ "./node_modules/driver.js/dist/driver.js.mjs");
/* harmony import */ var driver_js_dist_driver_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! driver.js/dist/driver.css */ "./node_modules/driver.js/dist/driver.css");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


function metaboxLiteTips($) {
  var __ = wp.i18n.__;

  //Custom Steps array to set the tips of the lite metabox based on the state of the plugin
  var steps = [];

  // Set the steps items and order
  if (!myThemeParams['pro_analysis']) {
    steps.push({
      element: '.js-tips-description',
      popover: {
        title: '',
        description: __("This is your page meta. You can manually edit or generate anytime.", "seo-central-lite"),
        side: "left",
        align: 'center'
      }
    }, {
      element: '.column-1',
      popover: {
        title: '',
        description: __("Customize your page details to further boost your ranking.", "seo-central-lite"),
        side: "right",
        align: 'center'
      }
    }, {
      element: '.column-2',
      popover: {
        title: '',
        description: __("Preview how your page shows up in search engines on social sites, desktop screens, and mobile devices.", "seo-central-lite"),
        side: "bottom",
        align: 'center'
      }
    }, {
      element: '.seo-central-page-score',
      popover: {
        title: '',
        description: __("Central Score is the thermometer for your page SEO health.", "seo-central-lite"),
        side: "left",
        align: 'center'
      }
    }, {
      element: '.seo-central-boring-stuff',
      popover: {
        title: '',
        description: __("Advanced settings and details can be found under The Boring Stuff.", "seo-central-lite"),
        side: "top",
        align: 'center'
      }
    });
  } else {
    steps.push({
      element: '.js-tips-description',
      popover: {
        title: '',
        description: __("This is your page meta. You can manually edit or generate anytime.", "seo-central-lite"),
        side: "left",
        align: 'center'
      }
    }, {
      element: '.column-1',
      popover: {
        title: '',
        description: __("Customize your page details to further boost your ranking.", "seo-central-lite"),
        side: "right",
        align: 'center'
      }
    }, {
      element: '.column-2',
      popover: {
        title: '',
        description: __("Preview how your page shows up in search engines on social sites, desktop screens, and mobile devices.", "seo-central-lite"),
        side: "bottom",
        align: 'center'
      }
    }, {
      element: '.seo-central-page-score',
      popover: {
        title: '',
        description: __("Central Score is the thermometer for your page SEO health.", "seo-central-lite"),
        side: "left",
        align: 'center'
      }
    }, {
      element: '.seo-central-analysis-wrapper',
      popover: {
        title: '',
        description: __("Prescriptions to fix or improve your page SEO appear here.", "seo-central-lite"),
        side: "left",
        align: 'center'
      }
    }, {
      element: '.seo-central-boring-stuff',
      popover: {
        title: '',
        description: __("Advanced settings and details can be found under The Boring Stuff.", "seo-central-lite"),
        side: "top",
        align: 'center'
      }
    });
  }
  if ($('#seo-central-lite-tips')[0]) {
    // let topOffset = $('#seo-central-api').offset().top;
    // $('html, body').animate({ scrollTop: topOffset }, 500);

    var driverObj = (0,driver_js__WEBPACK_IMPORTED_MODULE_0__.driver)({
      showProgress: true,
      popoverClass: 'seocentral-js-theme',
      popoverOffset: 30,
      allowClose: true,
      showButtons: ["close"],
      progressText: "Tip {{current}} <span>of</span> {{total}}",
      overlayColor: 'white',
      onPopoverRender: function onPopoverRender(popover, _ref) {
        var config = _ref.config,
          state = _ref.state;
        var closeButton = document.createElement("button");
        var nextButton = document.createElement("button");
        var buttonWrapper = document.createElement("div"); // create the div element
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
        if (state.activeIndex === 8) {
          //could not get total, using our set amount for now
          nextButton.disabled = true; // Disable the next button
          nextButton.classList.add('hidden');
        }

        // Next Button Event
        nextButton.addEventListener("click", function () {
          driverObj.moveNext();
        });

        //Close Button Event
        closeButton.addEventListener("click", function () {
          if ($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
            $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated');
          }
          if ($('.seo-central-custom-driver').hasClass('active')) {
            $('.seo-central-custom-driver').removeClass('active');
          }
          driverObj.destroy();
        });
      },
      onHighlighted: function onHighlighted(element) {
        //Remove focus from the close button if it gets set when triggering tips
        if ($('.popover-flexed-buttons-close').is(':focus')) {
          $('.popover-flexed-buttons-close').blur();
        }

        //If the notification bars are available within the metabox use them to provide a proper offset to
        var metaNotifications = $('.seo-central-notification-wrapper.metabox-notification');
        var totalNotificationHeight = 0,
          totalNotificationInnerHeight = 0;

        //Retrieve the heights of notifications to fix any offsets on the tips system
        metaNotifications.each(function () {
          //If the notification is enabled
          if (!metaNotifications.hasClass('hidden')) {
            totalNotificationHeight += $(this).outerHeight(); // Include padding and border
            totalNotificationInnerHeight += $(this).height(); // Excludes padding, borders, and margins
          }
        });

        var container = document.getElementById('seo-central-metabox');
        var containerRect = container.getBoundingClientRect();

        // Set the viewBox to match the container's dimensions
        var viewBoxWidth = containerRect.width;
        var viewBoxHeight = containerRect.height;
        document.querySelector('.seo-central-custom-driver').setAttribute('viewBox', "0 0 ".concat(viewBoxWidth, " ").concat(viewBoxHeight));

        // Get the bounding client rectangle
        var rect = element.getBoundingClientRect();

        // Padding
        var padding = 4;

        //Increase padding for the instance of boring stuff
        if (element.classList.contains('seo-central-boring-stuff')) {
          padding = 8;
        } else if (element.classList.contains('seo-central-page-score')) {
          padding = 2;
        }

        // Calculate the center
        var centerX = Math.round(rect.left + rect.width / 2 - containerRect.left);
        var centerY = Math.round(rect.top + rect.height / 2 - containerRect.top);

        // js-tips-ai-description, seo-central-apply-all, js-dips-description, column-1, column-2, seo-central-page-score, seo-central-analysis-wrapper, seo-central-boring-stuff
        // const shiftX = element.classList.contains('seo-central-button-generate') ? 8 : 0;
        var classShiftMapping = {
          'js-tips-description': -8,
          'column-1': 0,
          'column-2': 0,
          'seo-central-page-score': 0,
          'seo-central-boring-stuff': 0
        };

        // Initialize the shift value
        var shiftX = 0;
        var shiftY = 3;

        // Check each class in the element's class list
        var _iterator = _createForOfIteratorHelper(element.classList),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var className = _step.value;
            if (classShiftMapping[className] !== undefined) {
              shiftX = classShiftMapping[className];
              if (className == 'js-tips-description') {
                shiftY = 18;
              }
              if (className == 'seo-central-page-score') {
                shiftY = 18;
              }
              if (className == 'seo-central-boring-stuff') {
                shiftY = 16;
              }
              break; // Exit the loop once a match is found
            }
          }

          // Calculate the shape's attributes
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var x = Math.round(centerX - (rect.width / 2 + padding) + shiftX);
        var y = Math.round(centerY - (rect.height / 2 + padding) - shiftY);
        y += totalNotificationInnerHeight;
        var width = Math.round(rect.width + padding * 2);
        var height = Math.round(rect.height + padding * 2);

        //On the generation fields the reveal needs to show all the fields. 
        if (element.classList.contains('js-tips-ai-description') || element.classList.contains('js-tips-description')) {
          var firstElement = $('.seo-central-metabox-ai-fields-row').first();
          var lastElement = $('.seo-central-metabox-ai-fields-row').last();
          var heightOffset = myThemeParams['pro_analysis'] ? 280 : 230;
          var firstElementRect = firstElement[0].getBoundingClientRect(); // Get bounding rect of the first element

          var firstElementHeight = firstElement.outerHeight();
          var lastElementHeight = lastElement.outerHeight();
          var firstElementTop = firstElement.offset().top;
          var lastElementTop = lastElement.offset().top;
          var distanceBetween = lastElementTop - firstElementTop - firstElementHeight;
          var totalHeight = firstElementHeight + lastElementHeight + distanceBetween - heightOffset; //There is and increased height the 280 accounts for it, works responsive

          y = Math.round(firstElementRect.top - containerRect.top - padding + totalNotificationHeight); // Use first element's top
          height = firstElementRect.height + padding * 2 + totalHeight * 2; // Use first element's height
        }

        // Construct the path string
        var pathString = "M".concat(viewBoxWidth, ",0L0,0L0,").concat(viewBoxHeight, "L").concat(viewBoxWidth, ",").concat(viewBoxHeight, "L").concat(viewBoxWidth, ",0Z\n                            M").concat(x, ",").concat(y, " h").concat(width, " a5,5 0 0 1 5,5 v").concat(height, " a5,5 0 0 1 -5,5 h-").concat(width, " a5,5 0 0 1 -5,-5 v-").concat(height, " a5,5 0 0 1 5,-5 z");

        // Update the path element
        document.querySelector('.seo-central-custom-driver path').setAttribute('d', pathString);
      },
      onDestroyed: function onDestroyed(element) {
        if ($('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').removeClass('active');
        }
        if ($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
          $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated');
        }
      },
      onCloseClick: function onCloseClick(element, step, _ref2) {
        var config = _ref2.config,
          state = _ref2.state;
        if ($('.seo-central-metabox-ai-fields-tip-wrapper').hasClass('activated')) {
          $('.seo-central-metabox-ai-fields-tip-wrapper').removeClass('activated');
        }
        if ($('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').removeClass('active');
        }
      },
      steps: steps
    });

    // driverObj.drive(); 

    // Set the click event to start the tips functionality 
    // This can still be enabled for pro if not all permissions have been set
    if ($('#seo-central-lite-tips')[0]) {
      $('#seo-central-lite-tips').click(function () {
        if (!$('#seo-central-lite-tips').hasClass('activated')) {
          $('#seo-central-lite-tips').addClass('activated');
        }
        if (!$('.seo-central-custom-driver').hasClass('active')) {
          $('.seo-central-custom-driver').addClass('active');
        }
        // Put your logic here. What should happen when the element is clicked?
        driverObj.drive();
      });
    }
  }
}

/***/ }),

/***/ "./admin/src/js/seocentral-metabox.js":
/*!********************************************!*\
  !*** ./admin/src/js/seocentral-metabox.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMetaboxInViewport": () => (/* binding */ isMetaboxInViewport),
/* harmony export */   "metaboxDropdown": () => (/* binding */ metaboxDropdown)
/* harmony export */ });
// This collapses uses a larger max height Requires the header, header arrow, and the body of the table
function metaboxDropdown($, header, arrow, body) {
  // Header element required for display
  if (header) {
    //Set the event triggers for opening and closing the boring stuff section
    header.addEventListener('click', function (e) {
      e.preventDefault();
      var headerText = header.querySelector('.seo-central-analysis-scores-dropdown-header-description');

      //Check for the open and close classes on the dropdown, starts with neither, will close on the first click. 
      if (!body.classList.contains('open') && !body.classList.contains('close')) {
        body.classList.add('close');
        arrow.classList.add('rotate-arrow');
        headerText ? headerText.innerHTML = "Hide all results" : null;
      } else if (body.classList.contains('open')) {
        body.classList.remove('open');
        body.classList.add('close');
        headerText ? headerText.innerHTML = "Show good results" : null;
        if (!arrow.classList.contains('rotate-arrow')) {
          arrow.classList.add('rotate-arrow');
        } else {
          arrow.classList.remove('rotate-arrow');
        }
      } else if (body.classList.contains('close')) {
        body.classList.remove('close');
        body.classList.add('open');
        headerText ? headerText.innerHTML = "Hide all results" : null;
        if (arrow.classList.contains('rotate-arrow')) {
          arrow.classList.remove('rotate-arrow');
        } else {
          arrow.classList.add('rotate-arrow');
        }
      }
    });
  }
}

// Function to check if an element is in the viewport
function isMetaboxInViewport($, element) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ }),

/***/ "./admin/src/js/seocentral-page-analysis.js":
/*!**************************************************!*\
  !*** ./admin/src/js/seocentral-page-analysis.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contentHierarchy": () => (/* binding */ contentHierarchy),
/* harmony export */   "pageAnalysis": () => (/* binding */ pageAnalysis),
/* harmony export */   "updateScoreOnInput": () => (/* binding */ updateScoreOnInput)
/* harmony export */ });
function pageAnalysis($) {
  //Page analysis updates the score
  if ($('.seo-central-page-score.svg-wrapper')[0]) {
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
      seoScore: 0,
      //Start the score at 0, for every successful check add the point value tied with that seo field/check
      seoFlag: true //Set the flag for determining whether all page analysis checks have been made sucessfully 
    };

    //Every Field has a point weight towards the score, as well as other checks (Important Items hold more weight)
    var seoPointsArray = [
    //Adjustable score system following the excel sheet/score system above
    ["<title>", 9, ""],
    //✓ <Title> 9 points
    ["meta_description", 8, ""],
    //✓ Meta Description 8 points
    ["meta_title", 7, ""],
    //✓ Meta Title 7 points
    ["http_success", 7, ""],
    //✓ Page has successful HTTP status code - 7 points
    ["image_alts", 7, ""],
    //✓ All images have alt attributes and text - 7 points
    ["rel=canonical", 6, ""],
    //✓ Document has a valid "rel=canonical" - 6 points
    ["legible_fonts", 7, ""],
    //js request adjustment (defaulted)
    ["tap_targets", 7, ""],
    //curl request adjustment (defaulted)
    ["prime_key_use_accuracy", 8, ""],
    //✓ Primary Keyphrase use and accuracy - 8 points
    ["word_count", 6, ""],
    //✓ Document has a minimum word count of 600 words or 900 if set as a cornerstone page - 6 points
    ["prime_key_slug", 8, ""],
    //✓ Use of primary keyword in URL slug - 8 points
    ["second_key_use_accuracy", 4, ""],
    //✓ Secondary Keyphrase use and accuracy - 4 points
    ["meta_viewport", 3, ""],
    //✓ Has a <meta name="viewport"> tag with width or initial-scale - 3 points
    ["links_descriptive", 2, ""],
    //✓ Links have descriptive text (text within link is accurate) - 2 points
    ["links_crawlable", 3, ""],
    //✓ Links are crawlable (all hrefs have proper links) - optional - 3 points
    ["no_block_index", 3, ""],
    //✓ Page isn't blocked from indexing (robots.txt) - 3 points
    ["internal_external_count", 3, ""],
    //✓ Internal and External Links count (cornerstone content should have a minimum of 2 external links) - 3 points
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
    if (seoData.seoFlag === true) {
      $('#seo-central-analysis-tracker').addClass('seo-central-flag-complete');
      $('#seo_central_page_analysis').val('true');
    } else {
      //If checks are not satisfied display red light and show what fields need adjusments. 
      $('#seo-central-analysis-tracker').addClass('seo-central-flag-incomplete');
      $('#seo_central_page_analysis').val('false');
    }

    //Set the value of the final score to this field, used for reporting and displaying SEO score
    if (finalScore[0]) {
      //Save score to the hidden score field that is utilzed to display seo scoring of page
      finalScore.val(seoData.seoScore);
    }

    //Pro Functionality
    // Set Points for Secondary Keywords
    // subKeywordAnalysis(seoData, seoPointsArray, metaSub); 

    // Update visual for score circle
    updateScoreDisplay($);

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
function contentHierarchy($) {
  if ($('.js-content-hierarchy')) {
    if (myThemeParams.body['hierarchy'] != undefined) {
      for (var i = 0; i < myThemeParams.body['hierarchy'].length; i++) {
        if (myThemeParams.body['hierarchy'][i][0]['content'] != "") {
          $('.js-content-hierarchy').append("<p><strong>".concat(myThemeParams.body['hierarchy'][i][0]['tag'], ":</strong> ").concat(myThemeParams.body['hierarchy'][i][0]['content'], "</p>"));
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
    if (seoScores[i][0] === title) {
      //&& seoScores[i][2] === ""
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
  if (myThemeParams.body['header']) {
    for (var i = 0; i < myThemeParams.body['header'].length; i++) {
      //Score for <title> tag
      if (myThemeParams.body['header'][i]['tag'] == 'title') {
        if (myThemeParams.body['header'][i]['content'] != '') {
          seoData.seoScore += setSeoScore("<title>", seoPointsArray, "Success");
          titleFlag = true;
        } else {
          seoData.seoScore += setSeoScore("<title>", seoPointsArray, "Error");
          titleFlag = true;
        }
      }

      //Score for <meta name="viewport" content="width=device-width, initial-scale=1">  (this should have at least a width or initial scale)
      if (myThemeParams.body['header'][i]['tag'] == 'meta') {
        if (myThemeParams.body['header'][i]['name'] == 'viewport') {
          if (myThemeParams.body['header'][i]['content'].indexOf('width') !== -1 || myThemeParams.body['header'][i]['content'].indexOf('initial-scale') !== -1) {
            seoData.seoScore += setSeoScore("meta_viewport", seoPointsArray, "Success");
            viewFlag = true;
          } else {
            seoData.seoScore += setSeoScore("meta_viewport", seoPointsArray, "Error");
            viewFlag = true;
          }
        }
      }

      //Score for <link rel="canonical" href="https://example.com/">
      if (myThemeParams.body['header'][i]['tag'] == 'link') {
        if (myThemeParams.body['header'][i]['rel'] == 'canonical') {
          if (myThemeParams.body['header'][i]['href'] != '') {
            seoData.seoScore += setSeoScore("rel=canonical", seoPointsArray, "Success");
            canonFlag = true;
          } else {
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
  if (enUrls[0]) {
    enUrls.val(myThemeParams.links['internals']['count']);
    if (csToggle.val() == 'cornerstone') {
      var minInternals = 5;
    } else {
      var minInternals = 3;
    }
    if (enUrls.val() >= minInternals) {
      $('#seo-central-internal-link-tracker').addClass("perfect-seo-score");
      enUrlTracker.text('Inbound Link minimum met!');
    } else {
      enUrlTracker.text("Need minimum of ".concat(minInternals, " Inbound Links"));
      linksFlag = false;
    }
  }

  //External Url check, utilize the externals count to see how many external links exist on the page
  if (exUrls[0]) {
    exUrls.val(myThemeParams.links['externals']['count']);
    if (csToggle.val() == 'cornerstone') {
      if (exUrls.val() >= 2) {
        $('#seo-central-external-link-tracker').addClass("perfect-seo-score");
        exUrlTracker.text('Outbound Link minimum met!');
      } else {
        exUrlTracker.text('Need minimum of 2-3 Outbound Links');
        linksFlag = false;
      }
    } else {
      exUrlTracker.text('Outbound Link minimum met!');
    }
  }

  //After checking both internals and externals urls if they both pass add to the score
  if (linksFlag == true) {
    seoData.seoScore += setSeoScore("internal_external_count", seoPointsArray, 'Success');
  } else {
    seoData.seoScore += setSeoScore("internal_external_count", seoPointsArray, 'Error');
  }
  for (var i = 0; i < myThemeParams.links['crawlables']['check'].length; i++) {
    if (myThemeParams.links['crawlables']['check'][i].indexOf('Warning:') !== -1) {
      crawlFlag = false;
    }
    if (myThemeParams.links['crawlables']['descriptive'][i].indexOf('Warning:') !== -1) {
      linkTextFlag = false;
    }
  }

  //Update score if all links are crawalable
  if (crawlFlag == true) {
    seoData.seoScore += setSeoScore("links_crawlable", seoPointsArray, "Success");
  } else {
    seoData.seoScore += setSeoScore("links_crawlable", seoPointsArray, "Error");
  }

  //Update score if all links have non-generic descriptive text
  if (linkTextFlag == true) {
    seoData.seoScore += setSeoScore("links_descriptive", seoPointsArray, "Success");
  } else {
    seoData.seoScore += setSeoScore("links_descriptive", seoPointsArray, "Error");
  }
}

// Page Item Analysis for http status, wordcount, flesh score, robots
function itemAnalysis(seoData, seoPointsArray, http_status, wordCount, flesch_score, robots, csToggle) {
  //Set the http_status code from the curl request to field for proper scoring. 
  if (http_status[0]) {
    http_status.val(myThemeParams.body['http_status']);

    //Check for the curl request Success message
    if (http_status.val().indexOf('Success') !== -1) {
      seoData.seoScore += setSeoScore("http_success", seoPointsArray, "Success");
    } else {
      seoData.seoScore += setSeoScore("http_success", seoPointsArray, "Error");
    }
  }

  //Set the wordcount to the page analysis fields
  if (wordCount[0]) {
    wordCount.val(myThemeParams.body['flesch']['wordcount']);
    if (csToggle.val() == 'cornerstone') {
      var countMinimum = 900;
    } else {
      var countMinimum = 600;
    }

    // console.log(wordCount.val());

    if (wordCount.val() >= countMinimum) {
      seoData.seoScore += setSeoScore("word_count", seoPointsArray, "Success");
    } else if (wordCount.val() < countMinimum) {
      seoData.seoScore += setSeoScore("word_count", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
  }

  //Set the readablity scores to the page analysis fields (Not tied with the seo scoring)
  if (flesch_score[0]) {
    flesch_score.val(myThemeParams.body['flesch']['medianGrade']);
  }

  // Check to see if robots have been enabled for scoring
  if (robots) {
    // Retrieve the index and follow values
    var robots_index = robots[0].querySelector('.seo-central-radio-input:checked'),
      robots_follow = robots[1].querySelector('.seo-central-radio-input:checked');
    if (robots_index.value == 'yes' && robots_follow.value == 'yes') {
      seoData.seoScore += setSeoScore("robots_enabled", seoPointsArray, "Success");
    } else {
      seoData.seoScore += setSeoScore("robots_enabled", seoPointsArray, "Error");
    }
    if (robots_index.value == 'yes') {
      seoData.seoScore += setSeoScore("no_block_index", seoPointsArray, "Success");
    } else {
      seoData.seoScore += setSeoScore("no_block_index", seoPointsArray, "Error");
    }
  }
}
function titleDescriptionAnalysis(seoData, seoPointsArray, metaTitle, metaDesc, csToggle) {
  if (metaTitle.val().length >= 20 && metaTitle.val().length <= 70) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Success");
  } else if (metaTitle.val().length > 70) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Warning");
    seoData.seoFlag = false;
  } else if (metaTitle.val().length < 20) {
    seoData.seoScore += setSeoScore("meta_title", seoPointsArray, "Error");
    seoData.seoFlag = false;
  }

  //Specify more conditions when page is marked as cornerstone
  if (csToggle.val() == 'cornerstone') {
    var minCount = 120,
      maxCount = 156;
  } else {
    var minCount = 150,
      maxCount = 160;
  }
  if (metaDesc.val().length >= minCount && metaDesc.val().length <= maxCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Success');
  } else if (metaDesc.val().length < minCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Error');
    seoData.seoFlag = false;
  } else if (metaDesc.val().length > maxCount) {
    seoData.seoScore += setSeoScore("meta_description", seoPointsArray, 'Warning');
    seoData.seoFlag = false;
  }
}

//Checks for the primary keyword usage, accuracy, and use in slug.
//And check for empty alt tags
function primeKeywordAnalaysis(seoData, seoPointsArray, csToggle, metaPrime, slug) {
  if (metaPrime.val()) {
    //3 minimum primary keywords in title/h1 and first paragraph should have primary keywords
    //Every instance of the primary keyword within the heading tags (with exception to h1/title only counting for 1 point together, They both require the primary)
    //Base page minimum count is 3 instances, cornerstone page requires 5 instances 
    var primeCount = 0,
      minPrime = 3,
      firstParagaphs = myThemeParams.body['stringbody'].slice(0, 350); //First 350 characters of the page

    //Individual check if the prime keyword is in the Title and H1 of the page.
    var primeFlags = {
      title: 'no-title',
      heading: 'no-heading'
    };

    //Set the minimum count for primary keywords based on cornerstone toggle
    if (csToggle.val() == 'cornerstone') {
      var minPrime = 5;
    }

    //Check for primary keyphrase within the content hierarchy and image alt texts, every instance of the keyphrase should increment the count
    for (var i = 0; i < myThemeParams.body['hierarchy'].length; i++) {
      //Access the body hierarchy array and check for primary keyhprase
      if (myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
        //Only increment primeCount for usage outside of the title and h1 since those are counted as 1 point together
        if (myThemeParams.body['hierarchy'][i][0]['tag'] !== 'title' && myThemeParams.body['hierarchy'][i][0]['tag'] !== 'h1') {
          primeCount++;
        }

        //Strip out the rest of the headings from the first paragraph to properly get count of remaining primary keywphrase not located in headings
        firstParagaphs = firstParagaphs.replace(myThemeParams.body['hierarchy'][i][0]['content'], '');
      }
      if (primeFlags.title == 'no-title' || primeFlags.heading == 'no-heading') {
        //Set the unique flag for the Title tag
        if (myThemeParams.body['hierarchy'][i][0]['tag'] == 'title') {
          if (myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
            primeFlags.title = "title-contains-keyphrase";
          } else {
            primeFlags.title = "title-lacks-keyphrase";
          }
        }

        //Set the unique flag for the "Main Title", if  the page has an h1 as its main title show if the keyphrase is used within the main title
        if (myThemeParams.body['hierarchy'][i][0]['tag'] == 'h1') {
          if (myThemeParams.body['hierarchy'][i][0]['content'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
            primeFlags.heading = "heading-contains-keyphrase";
          } else {
            primeFlags.heading = "heading-lacks-keyphrase";
          }
        }
      }
    }

    //Add to the primeCount if both title and h1 contain the primary keyword
    if (primeFlags.title == 'title-contains-keyphrase' && primeFlags.heading == 'heading-contains-keyphrase') {
      primeCount++;
    }

    //Check all the alt text from the images on page, add to the count primary count if primary keyphrase is being referenced
    var emptyAlts = false;
    for (var _i = 0; _i < myThemeParams.body['images'].length; _i++) {
      //Increment primary count when used in image alts
      if (myThemeParams.body['images'][_i][0]['alt'].toLowerCase().indexOf(metaPrime.val().toLowerCase()) != -1) {
        primeCount++;
      }
      if (myThemeParams.body['images'][_i][0]['alt'] == '') {
        emptyAlts = true;
      }
    }

    //if there are any images are missing any text set warning, else if all text is good set success message
    if (emptyAlts == false) {
      seoData.seoScore += setSeoScore("image_alts", seoPointsArray, "Success");
    } else {
      seoData.seoScore += setSeoScore("image_alts", seoPointsArray, "Warning");
    }

    //Lastly Get the count of each instance of the primary key within the first 350 characters of the page.
    //The main title and all headings should be excluded from this check since they have already been counted
    var regex = new RegExp(metaPrime.val(), "gi");
    var paragraphCount = (firstParagaphs.match(regex) || []).length;
    primeCount += paragraphCount;

    //primeCount and primeFlags must all pass to get success
    if (primeCount >= minPrime && primeFlags.title == "title-contains-keyphrase" && primeFlags.heading == "heading-contains-keyphrase") {
      //all checks passed
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Success");
    } else if (primeCount >= minPrime && primeFlags.title == "title-contains-keyphrase" && primeFlags.heading == "heading-lacks-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Warning");
      seoData.seoFlag = false;
    } else if (primeCount >= minPrime && primeFlags.title == "title-lacks-keyphrase" && primeFlags.heading == "heading-contains-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Warning");
      seoData.seoFlag = false;
    } else if (primeCount >= minPrime && primeFlags.title == "title-lacks-keyphrase" && primeFlags.heading == "heading-lacks-keyphrase") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    } else if (primeCount >= minPrime && primeFlags.title == "no-title" && primeFlags.heading == "no-heading") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    } else if (primeCount < minPrime && primeFlags.title == "no-title" || primeFlags.heading == "no-heading") {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    } else {
      seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error");
      seoData.seoFlag = false;
    }
  } else {
    seoData.seoScore += setSeoScore("prime_key_use_accuracy", seoPointsArray, "Error"); //Missing the field for primary keyword
    seoData.seoFlag = false;
  }

  //Slug check for the primary key, seperate from the count
  if (slug[0]) {
    if (slug.val().indexOf(metaPrime.val()) !== -1) {
      seoData.seoScore += setSeoScore("prime_key_slug", seoPointsArray, "Success");
    } else {
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
function updateScoreDisplay($) {
  var __ = wp.i18n.__;
  if ($('.seo-central-page-score.svg-wrapper')[0]) {
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
    var proportionalScore = finalScore.val() * strokeArray / 100;

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
    if (initialLoad) {
      var animationName = 'progress';
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule("@keyframes ".concat(animationName, " { 0% { stroke-dasharray: ").concat(lastScore, " ").concat(strokeArray, "; } 100% { stroke-dasharray: ").concat(proportionalScore, " ").concat(strokeArray, "; } }"), 0);
    }

    //Update the score within the stroke-dasharray and the text field
    overlayCircle.style.stroke = circleColor;
    overlayText.innerHTML = finalScore.val();
    resultText.innerHTML = tempText;

    //If it's the initial load, apply the animation
    if (initialLoad) {
      overlayCircle.style.animation = "".concat(animationName, " 1s ease forwards");
      setTimeout(function () {
        overlayCircle.style.strokeDasharray = "".concat(proportionalScore, " ").concat(strokeArray);
        overlayCircle.style.animation = '';
      }, 1000);
    } else {
      //If it's not the initial load, remove the animation and apply the transition
      overlayCircle.style.strokeDasharray = "".concat(proportionalScore, " ").concat(strokeArray);
    }

    //Store the last score in the dataset
    overlayCircle.dataset.lastScore = proportionalScore;

    // If it was the initial load, set the flag to false for next time
    if (initialLoad) {
      overlayCircle.dataset.initialLoad = 'false';
    }
  }
}

// Update the score on input changes
function updateScoreOnInput($) {
  if ($('.seo-central-page-score.svg-wrapper')[0]) {
    var metaTextAreas = $('#seo-central-metabox-ai .seo-text-area'),
      metaInputs = $('#seo-central-metabox-ai .seo-central-text-input');
    metaInputs.each(function () {
      $(this).on('change', function () {
        pageAnalysis($);
      });
    });
    metaTextAreas.on('change', function () {
      pageAnalysis($);
    });
  }
}

// Set the display for the warnings and errors
function displayWarningErrors(warningsAndErrorsArray) {
  var __ = wp.i18n.__;
  var errorRows = document.querySelector('.seo-central-analysis-wrapper.warnings-errors');
  // Title, Warning Copy, Error Copy, Label Copy
  var errorWarningCopy = [["<title>", __("Keep your meta title under 60-65 characters (it'll get cut off) and remember to use your primary keyword.", "seo-central-lite"), __("Your page is missing its meta title. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Title", "seo-central-lite")], ["meta_description", __("Your meta description is too long, and it might get cut off when displayed. Be more concise!", "seo-central-lite"), __("Meta descriptions help give your page context. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Description", "seo-central-lite")], ["meta_title", __("Keep your meta title under 60-65 characters (it'll get cut off) and remember to use your primary keyword.", "seo-central-lite"), __("Your page is missing its meta title. Click Generate Meta and we'll generate one for you.", "seo-central-lite"), __("Meta Title", "seo-central-lite")], ["http_success", __("None", "seo-central-lite"), __("Your page is giving errors to users accessing it. Check with your team to address this ASAP!", "seo-central-lite"), __("HTTP Status", "seo-central-lite")], ["image_alts", __("Not all of your images have alt text - not only is your user accessibility low, but don't you're missing out on a keyword opportunity!", "seo-central-lite"), __("None of the images on this page has alt text. Please fill for accessibility and SEO.", "seo-central-lite"), __("Image Alts", "seo-central-lite")], ["rel=canonical", __("None", "seo-central-lite"), __("Having the correct URL for rel=canonical helps ensure the correct pages are ranked. Check if yours is filled!", "seo-central-lite"), __("Meta Canonical Link", "seo-central-lite")], ["legible_fonts", __("None", "seo-central-lite"), __("Making your content easy to read is key for user experience. Check text sizes and adjust!", "seo-central-lite"), __("Legible Fonts", "seo-central-lite")], ["tap_targets", __("None", "seo-central-lite"), __("Appropriate tap target sizing helps users engaging with the right content. Edit yours to avoid a bad user experience.", "seo-central-lite"), __("Tap Targets", "seo-central-lite")], ["prime_key_use_accuracy", __("There's still some room to optimize your primary keyword placement: H1/title, meta description, headings, and first 300 characters.", "seo-central-lite"), __("Primary keywords should be added to your H1/title, meta description, headings, and first 300 characters.", "seo-central-lite"), __("Primary Keyword", "seo-central-lite")], ["word_count", __("None", "seo-central-lite"), __("Are you sure you're writing enough as an authority on the topic? Expand on your content a bit more.", "seo-central-lite"), __("Word Count", "seo-central-lite")], ["prime_key_slug", __("None", "seo-central-lite"), __("Using your primary keyword in the URL slug is important for ranking. Edit yours a bit to really make it count!", "seo-central-lite"), __("Slug Keyword", "seo-central-lite")], ["second_key_use_accuracy", __("Make sure to write content around your secondary keywords - use them in your headings and body copy.", "seo-central-lite"), __("No secondary keywords are being used on this page. Check again?", "seo-central-lite"), __("Secondary Keywords", "seo-central-lite")], ["meta_viewport", __("None", "seo-central-lite"), __("Without setting a <meta name='viewport'> tag, your content won't be shown properly.", "seo-central-lite"), __("Meta Viewport", "seo-central-lite")], ["links_descriptive", __("Avoid choosing dull text links. Check your content again for any!", "seo-central-lite"), __("Links without descriptive text are boring and not SEO-friendly. Make them descriptive!", "seo-central-lite"), __("Descriptive Links", "seo-central-lite")], ["links_crawlable", __("Setting links to 'nofollow' blocks crawlers from finding pages. Remember to use them strategically! ", "seo-central-lite"), __("All of your links are set as 'nofollow.' Was this on purpose? Check and make sure.", "seo-central-lite"), __("Crawlable Links", "seo-central-lite")], ["no_block_index", __("None", "seo-central-lite"), __("This page is currently blocked from being indexed - is this correct?", "seo-central-lite"), __("Robot Index", "seo-central-lite")], ["internal_external_count", __("Having a few more links would help. Any other references you can add?", "seo-central-lite"), __("No internal/external links at all? Are you sure?", "seo-central-lite"), __("Internal & External Links", "seo-central-lite")], ["robots_enabled", __("None", "seo-central-lite"), __("Letting crawlers follow all links on a page is an SEO best practice. You sure you want keep this disabled?", "seo-central-lite"), __("Robots Enabled", "seo-central-lite")]];

  //Clear the previous results
  errorRows.innerHTML = "";

  //Go through the array and update the notifications
  warningsAndErrorsArray.forEach(function (item) {
    var match = errorWarningCopy.find(function (e) {
      return e[0] === item[0];
    });
    var itemPoints = 0;
    if (match) {
      var message;
      if (item[2] === 'Warning') {
        message = match[1]; // the warning message
        itemPoints = Math.ceil(item[1] / 2);
      } else if (item[2] === 'Error') {
        message = match[2]; // the error message
        itemPoints = 0;
      }
      if (message) {
        var itemClass = itemPoints !== 0 ? 'notification-warning' : 'notification-error';

        // Display the message in your UI...
        var notificationRow = "\n        <div id='seo-central-".concat(item[0], "-tracker' class='seo-central-analysis-item'>\n          <p class='seo-central-analysis-title'>").concat(match[3], "</p>\n          <div class='seo-central-analysis-tracker-text ").concat(itemClass, "'>\n            <span class='seo-central-analysis-tracker-text-content'>").concat(message, "</span>\n            <p class=\"seo-central-analysis-tracker-text-score\">").concat(itemPoints, " / ").concat(item[1], "</p>\n          </div>\n        </div>\n        ");
        errorRows.innerHTML += notificationRow;
        if (errorRows.classList.contains('hidden')) {
          errorRows.classList.remove('hidden');
        }
      }
    }
  });
}
function displaySuccess(successArray) {
  var __ = wp.i18n.__;
  var dropdownWrapper = document.querySelector('.seo-central-analysis-scores-dropdown.success');
  var successRows = dropdownWrapper.querySelector('.seo-central-analysis-scores-dropdown-body');

  // Title, Success Copy, Label Copy
  var successCopy = [["<title>", __("Having a meta title is essential to ranking. Glad to see yours is set!", "seo-central-lite"), __("Meta Title", "seo-central-lite")], ["meta_description", __("Well done! Setting a meta description helps search engines provide a preview of your page.", "seo-central-lite"), __("Meta Description", "seo-central-lite")], ["meta_title", __("Having a meta title is essential to ranking. Glad to see yours is set!", "seo-central-lite"), __("Meta Title", "seo-central-lite")], ["http_success", __("A 200 HTTP status code means your page is accessible. This is ideal - keep it up!", "seo-central-lite"), __("HTTP Status", "seo-central-lite")], ["image_alts", __("Thank you for helping user accessibility by writing alt text for every image on this page!", "seo-central-lite"), __("Image Alts", "seo-central-lite")], ["rel=canonical", __("Good work! Having the right URL for rel=canonical helps search engines rank the correct page.", "seo-central-lite"), __("Meta Canonical Link", "seo-central-lite")], ["legible_fonts", __("Legibility is important, and we're happy you see it this way too. Nice work!", "seo-central-lite"), __("Legible Fonts", "seo-central-lite")], ["tap_targets", __("Tap target are all sized appropriate - Good work!", "seo-central-lite"), __("Tap Targets", "seo-central-lite")], ["prime_key_use_accuracy", __("This is what we like to see! Good job maximizing placement for your primary keywords.", "seo-central-lite"), __("Primary Keyword", "seo-central-lite")], ["word_count", __("You're an expert! Always try to cover your primary keyword/topic better than your next competitor.", "seo-central-lite"), __("Word Count", "seo-central-lite")], ["prime_key_slug", __("URL slugs are prime SEO real estate. Glad to see you take advantage of yours!", "seo-central-lite"), __("Slug Keyword", "seo-central-lite")], ["second_key_use_accuracy", __("Your secondary keywords look great - we see them in your headings and main content. ", "seo-central-lite"), __("Secondary Keywords", "seo-central-lite")], ["meta_viewport", __("<meta name='viewport'> is set! Your content will be visible within the settings you placed.", "seo-central-lite"), __("Meta Viewport", "seo-central-lite")], ["links_descriptive", __("Great job! Descriptive link text gives users + search engines context to the linked page.", "seo-central-lite"), __("Descriptive Links", "seo-central-lite")], ["links_crawlable", __("Nice work! Creating crawlable links help search engines find new content on your site.", "seo-central-lite"), __("Crawlable Links", "seo-central-lite")], ["no_block_index", __("This is great! Crawlers will be able to crawl your page, and people can peep it through search.", "seo-central-lite"), __("Robot Index", "seo-central-lite")], ["internal_external_count", __("Links help build relationships between content, and you're making them count!", "seo-central-lite"), __("Internal & External Links", "seo-central-lite")], ["robots_enabled", __("Well done! Enabling 'follow' lets crawlers know they should follow all the links on the page. You're following a best practice!", "seo-central-lite"), __("Robots Enabled", "seo-central-lite")]];

  //Clear the items before
  successRows.innerHTML = "";
  successArray.forEach(function (item) {
    var match = successCopy.find(function (e) {
      return e[0] === item[0];
    });
    var itemPoints = 0;
    if (match) {
      var message;

      //Store the messaging and the score
      message = match[1]; // the success message
      itemPoints = item[1];
      if (message) {
        // Display the message in your UI...
        var notificationRow = "\n        <div id='seo-central-".concat(item[0], "-tracker' class='seo-central-analysis-item'>\n          <p class='seo-central-analysis-title'>").concat(match[2], "</p>\n          <div class='seo-central-analysis-tracker-text notification-success'>\n            <span class='seo-central-analysis-tracker-text-content'>").concat(message, "</span>\n            <p class=\"seo-central-analysis-tracker-text-score\">").concat(itemPoints, " / ").concat(item[1], "</p>\n          </div>\n        </div>\n        ");
        successRows.innerHTML += notificationRow;
        if (dropdownWrapper.classList.contains('hidden')) {
          dropdownWrapper.classList.remove('hidden');
        }
      }
    }
  });
}

/***/ }),

/***/ "./admin/src/js/seocentral-settings.js":
/*!*********************************************!*\
  !*** ./admin/src/js/seocentral-settings.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moveNotifications": () => (/* binding */ moveNotifications),
/* harmony export */   "seocentralSettings": () => (/* binding */ seocentralSettings)
/* harmony export */ });
/* harmony import */ var jquery_sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-sortablejs */ "./node_modules/jquery-sortablejs/jquery-sortable.js");
/* harmony import */ var jquery_sortablejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_sortablejs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var picmo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! picmo */ "./node_modules/picmo/dist/index.js");
/* harmony import */ var _picmo_popup_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @picmo/popup-picker */ "./node_modules/@picmo/popup-picker/dist/index.js");



function seocentralSettings($) {
  //Set this variable up for translation of strings
  var __ = wp.i18n.__;

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
  if ($('#seo_central_setting_image')[0]) {
    $('#select-seo-image-select').click(function () {
      //Access Media library for upload or selection from library, save into input field
      var upload = wp.media({
        title: 'Choose Image',
        //Title for Media Box
        multiple: false,
        //For limiting multiple image
        library: {
          type: ['image'] // this will only allow image types
        }
      }).on('select', function () {
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
          if ($('#deselect-seo-image').hasClass('disabled')) {
            $('#deselect-seo-image').removeClass('disabled');
            if (!$('#seo_central_setting_image_instructions').hasClass('hidden')) {
              $('#seo_central_setting_image_instructions').addClass('hidden');
            }
          }

          // Update the display of the file
          if (!$('#deselect-seo-image').hasClass('disabled')) {
            var siteImage = $('#seo_central_setting_image').val();
            var filename = siteImage.split('/').pop();
            $('#deselect-seo-image .seo-central-remove-image-file').html(filename);
            $('#select-seo-image-select').html(__('Choose another file', 'seo-central-lite'));
          }
          enableSave();

          // Disabled for now
          // if(!$('.seo-central-settings-image-wrapper').hasClass('active')) {
          // 	$('.seo-central-settings-image-wrapper').addClass('active');
          // }
        } else {
          // alert('Please select an image file. Videos and other file types are not allowed.');
          return false; // Prevent other file types from being processed
        }
      }).open();
      return false;
    });

    //Remove the selected image and disable the deselect button
    $('#deselect-seo-image .seo-central-remove-image-close').click(function () {
      $('input[name=seo_central_setting_image]').val('');
      if (!$('#deselect-seo-image').hasClass('disabled')) {
        $('#deselect-seo-image').addClass('disabled');
        if ($('#seo_central_setting_image_instructions').hasClass('hidden')) {
          $('#seo_central_setting_image_instructions').removeClass('hidden');
        }
      }
      $('#select-seo-image-select').html(__('Choose file', 'seo-central-lite'));

      // if($('.seo-central-settings-image-wrapper').hasClass('active')) {
      // 	$('.seo-central-settings-image-wrapper').removeClass('active');
      // }

      enableSave();
      return false;
    });
    if ($('#seo_central_setting_image').val().length > 1) {
      // if(!$('.seo-central-settings-image-wrapper').hasClass('active')) {
      // 	$('.seo-central-settings-image-wrapper').addClass('active');
      // }

      if ($('#deselect-seo-image').hasClass('disabled')) {
        $('#deselect-seo-image').removeClass('disabled');
        if (!$('#seo_central_setting_image_instructions').hasClass('hidden')) {
          $('#seo_central_setting_image_instructions').addClass('hidden');
        }
        if (!$('#deselect-seo-image').hasClass('disabled')) {
          var siteImage = $('#seo_central_setting_image').val();
          var filename = siteImage.split('/').pop();
          $('#deselect-seo-image .seo-central-remove-image-file').html(filename);
          $('#select-seo-image-select').html(__('Choose another file', 'seo-central-lite'));
        }
      }

      // $('.seo-central-settings-image').attr("src",$('#seo_central_setting_image').val());
    }
  }

  $('.seo-central-settings-social-image-select').each(function (index) {
    var currentPost = $(this).data('type'); //Utilize the "$post_type" variable from the function in admin to uniquely target the repeated settings fields

    //Update the Image fields and the deselect button should be enabled to remove the selected image from the post type field.
    var deselect = $('#' + currentPost + '_social_image_deselect'),
      textSelect = $('#' + currentPost + '_social_image_select'),
      deselectFile = $('#' + currentPost + '_social_image_deselect .seo-central-remove-image-file');
    var imageInput = $('input[name=' + currentPost + '_social_image_field]'),
      imageTips = $('#' + currentPost + '_social_image_instructions'),
      imgTag = $('.seo-central-settings-' + currentPost + '-social-image'),
      imgWrapper = $('.seo-central-settings-' + currentPost + '-image-wrapper');

    // Set Click event to each of the image field buttons
    $(this).click(function () {
      //Access Media library for upload or selection from library, save into input field
      var upload = wp.media({
        title: 'Choose Image',
        //Title for Media Box
        multiple: false,
        //For limiting multiple image
        library: {
          type: ['image'] // this will only allow image types
        }
      }).on('select', function () {
        var select = upload.state().get('selection');
        var attach = select.first().toJSON();
        var fileType = attach.subtype; // Get the file type of the selected attachment

        // Check if the selected file is an image
        if (fileType === 'jpeg' || fileType === 'png' || fileType === 'gif') {
          //Set the value to the input to save, and attach the url to the image src to display selection
          imageInput.val(attach.url);
          // imgTag.attr("src",imageInput.val());

          //Re-enable deselect button for image
          if (deselect.hasClass('disabled')) {
            deselect.removeClass('disabled');
            if (!imageTips.hasClass('hidden')) {
              imageTips.addClass('hidden');
            }
            textSelect.html(__('Choose another file', 'seo-central-lite'));
          }
          if (!deselect.hasClass('disabled')) {
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
      }).open();
      return false;
    });

    //On load event check if the input has a file/value and update the display
    if (imageInput.val().length > 1) {
      //Enable the deselect button
      if (deselect.hasClass('disabled')) {
        deselect.removeClass('disabled');
        if (!imageTips.hasClass('hidden')) {
          imageTips.addClass('hidden');
        }
        if (!deselect.hasClass('disabled')) {
          var siteImage = imageInput.val();
          var filename = siteImage.split('/').pop();
          deselectFile.html(filename);
          $(this).html(__('Choose another file', 'seo-central-lite'));
        }
      }

      //Update the empty src on the image tag for display
      // imgTag.attr("src",imageInput.val());
    }
  });

  //Set the deselect button functionality when active
  $('.seo-central-settings-social-image-deselect').each(function (index) {
    //Remove the url from the image input field and disable the the image wrapper and deselect button
    var parent = $(this);
    parent.find('.seo-central-remove-image-close').click(function () {
      var currentPost = parent.data('type');
      var deselect = $('#' + currentPost + '_social_image_deselect'),
        select = $('#' + currentPost + '_social_image_select');
      var imageInput = $('input[name=' + currentPost + '_social_image_field]'),
        imgWrapper = $('.seo-central-settings-' + currentPost + '-image-wrapper'),
        imageTips = $('#' + currentPost + '_social_image_instructions');
      imageInput.val('');
      if (!deselect.hasClass('disabled')) {
        deselect.addClass('disabled');
        if (imageTips.hasClass('hidden')) {
          imageTips.removeClass('hidden');
        }
        select.html(__('Choose file', 'seo-central-lite'));
      }
      if (imgWrapper.hasClass('active')) {
        imgWrapper.removeClass('active');
      }
      enableSave();
      return false;
    });
  });

  //Settings page breadcrumb toggle
  if ($('#seo_central_setting_breadcrumb')[0]) {
    $('#seo_central_setting_breadcrumbs_toggle').click(function () {
      if ($('#seo_central_setting_breadcrumb').val() === 'true') {
        $('#seo_central_setting_breadcrumb').val('false');
        if ($('#seo_central_setting_breadcrumbs_toggle').hasClass('enabled')) {
          $('#seo_central_setting_breadcrumbs_toggle').removeClass('enabled');
        }
      } else if ($('#seo_central_setting_breadcrumb').val() === 'false') {
        $('#seo_central_setting_breadcrumb').val('true');
        if (!$('#seo_central_setting_breadcrumbs_toggle').hasClass('enabled')) {
          $('#seo_central_setting_breadcrumbs_toggle').addClass('enabled');
        }
      }
      enableSave();
      return false;
    });
  }

  //Assign the seo crumb type, apply the selected or inputted crumb value. 
  if ($('#seo_central_setting_crumbseparator')[0]) {
    $('#seo-central-crumbs-separator .seo-central-settings-crumbs-selection-item').each(function (index, element) {
      // Set a click event for each item
      $(this).click(function () {
        // Remove any selected class from the items
        $('#seo-central-crumbs-separator .seo-central-settings-crumbs-selection-item').each(function () {
          // Check if the current element has the 'selected' class
          if ($(this).hasClass('selected')) {
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
  if (modalTriggers) {
    //Modal Triggers and dialog close display and close the modals for the settings page.
    modalTriggers.forEach(function (modal, index) {
      modal.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        dialogBoxes[index].showModal();

        // Clicking off modal or on backdrop closes modal
        dialogBoxes[index].addEventListener('click', function (event) {
          var rect = dialogBoxes[index].getBoundingClientRect();
          var isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            dialogBoxes[index].close();
          }
        });
      });
    });
    dialogClose.forEach(function (close, index) {
      close.addEventListener('click', function (e) {
        e.preventDefault();
        dialogBoxes[index].close();
      });
    });

    // Header Dropdown click events
    theads.forEach(function (thead, index) {
      thead.addEventListener('click', function (e) {
        e.preventDefault();
        // e.stopPropagation(); 

        var currentTable = tableDropdowns[index];
        var arrow = theadArrows[index];
        if (!currentTable.classList.contains('open') && !currentTable.classList.contains('close')) {
          tableDropdowns[index].classList.add('close');
          arrow.classList.add('rotate-arrow');
        } else if (currentTable.classList.contains('open')) {
          currentTable.classList.remove('open');
          currentTable.classList.add('close');
          arrow.classList.add('rotate-arrow');
        } else if (currentTable.classList.contains('close')) {
          currentTable.classList.remove('close');
          currentTable.classList.add('open');
          arrow.classList.remove('rotate-arrow');
        }
      });
    });
    theadArrows.forEach(function (arrow, index) {
      arrow.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var currentTable = tableDropdowns[index];
        if (!currentTable.classList.contains('open') && !currentTable.classList.contains('close')) {
          tableDropdowns[index].classList.add('close');
          arrow.classList.add('rotate-arrow');
        } else if (currentTable.classList.contains('open')) {
          currentTable.classList.remove('open');
          currentTable.classList.add('close');
          arrow.classList.add('rotate-arrow');
        } else if (currentTable.classList.contains('close')) {
          currentTable.classList.remove('close');
          currentTable.classList.add('open');
          arrow.classList.remove('rotate-arrow');
        }
      });
    });
  }

  // Check for the setting form and set all the events on the settings page. 
  if (settingForm) {
    //Check for the setting for element and then loop through all the inputs to detect a change on the input
    textInputs.forEach(function (input, index) {
      input.addEventListener('change', function (e) {
        e.preventDefault();
        enableSave();
      });
    });
    dropdowns.forEach(function (dropdown, index) {
      dropdown.addEventListener('change', function (e) {
        e.preventDefault();
        enableSave();
      });
    });
  }

  // Set up functionality for the variable selections for the title fields
  titleOrderInsert($, titleOrderWrapper);
}
function enableSave($) {
  var updateText = document.querySelectorAll('.seo-central-settings-update-alert'),
    submitButtons = document.querySelectorAll('.submit #submit');
  updateText.forEach(function (alert, index) {
    if (!alert.classList.contains('active')) {
      alert.classList.add('active');
    }
    if (!submitButtons[index].classList.contains('enabled')) {
      submitButtons[index].classList.add('enabled');
    }
  });
}

// This will initialize the draggable library. 
function titleOrderInsert($, titleOrderWrapper) {
  // Loop through each of the divs that set the title order field to apply variables
  $(titleOrderWrapper).each(function (index) {
    // For each title wrap set up the click events
    var titleApply = $(this).find('.js-variable-insert'),
      titleList = $(this).find('.seo-central-title-order-list'),
      titleListItems = $(this).find('.seo-central-title-order-list-item'),
      titleDisplay = $(this).find('.seo-central-title-order-span-list'),
      postType = $(this).data('type');
    var currentInput = $("#".concat(postType, "_title_field"));
    titleApply.click(function (event) {
      //Dont allow this event to propagate to the document event listener for these items
      event.stopPropagation();
      titleList.toggleClass('hidden');
    });
    $(document).click(function (event) {
      // If the clicked element is not within titleList and not the titleApply itself, hide titleList
      if (!$(event.target).closest(titleList).length && !$(event.target).closest(titleApply).length) {
        titleList.addClass('hidden');
      }
    });
    titleListItems.click(function (event) {
      //Dont allow this event to propagate to the document event listener for these items
      event.stopPropagation();

      // Get the variable name from the item and update the div with a span
      var itemTitle = $(this).html();
      var currentValue = currentInput.val();

      // Check if the last character is not a comma and add one if needed (This is mainly for initial load)
      if (currentValue.length > 0 && currentValue.trim().slice(-1) !== ",") {
        currentValue += ", ";
      }
      var html = $("<span class=\"seo-central-title-order-span-list-item\" data-id=\"".concat(index, "\">").concat(itemTitle, "</span>"));

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
    keyphraseTriggers($, titleDisplay, currentInput);

    //For each wrapper set the draggable for each element
    titleDisplay.sortable({
      group: 'list',
      sort: true,
      // sorting inside list
      dataIdAttr: 'data-id',
      // HTML attribute that is used by the `toArray()` method
      animation: 200,
      ghostClass: 'sortable-ghost',
      swapThreshold: 1,
      // Threshold of the swap zone
      direction: 'horizontal',
      // Direction of Sortable 
      update: function update() {
        updateVariableFields($, titleDisplay, currentInput);
      }
    });
  });

  //Set up the picmo emoji Library for element insertion on each of the variable selectors
  emojiInsertSetup($);
}

// This function resets the input value for all the variable fields when sortable is used
function updateVariableFields($, titleDisplay, currentInput) {
  //Change the value of the sort
  titleDisplay.each(function () {
    var titleItems = $(this).find('.seo-central-title-order-span-list-item'),
      newOrder = "";
    titleItems.each(function (index, item) {
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
    if (newOrder != "") {
      currentInput.val(newOrder);
    }
  });

  //On update of the drag enable save
  enableSave();
}

// Initialize the Picmo Emoji Library
function emojiInsertSetup($) {
  // Get all elements with class .js-emoji-insert
  var emojis = document.querySelectorAll('.js-emoji-insert');

  // For each element, create a picker and add event listener
  emojis.forEach(function (emoji, index) {
    // Create the picker for each button
    var picker = (0,_picmo_popup_picker__WEBPACK_IMPORTED_MODULE_2__.createPopup)({}, {
      referenceElement: emoji,
      triggerElement: emoji,
      renderer: new picmo__WEBPACK_IMPORTED_MODULE_1__.NativeRenderer(),
      position: "right",
      showCloseButton: true
    });

    // Add click event listener to the emoji button
    emoji.addEventListener("click", function () {
      picker.toggle();
    });

    // Listen for the emoji:select event
    picker.addEventListener("emoji:select", function (selection) {
      var postType = emoji.dataset.type;
      var currentInput = $("#".concat(postType, "_title_field"));
      var currentValue = currentInput.val();

      // Check if the last character is not a comma and add one if needed (This is mainly for initial load)
      if (currentValue.length > 0 && currentValue.trim().slice(-1) !== ",") {
        currentValue += ", ";
      }
      var html = $("<span class=\"seo-central-title-order-span-list-item\" data-id=\"".concat(index, "\">").concat(selection.emoji, "</span>"));

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
function keyphraseTriggers($, variableWrapper, currentInput) {
  var allSpans = variableWrapper.find('.seo-central-title-order-span-list-item');

  // Focus set up for main-secondary-phrases 
  variableWrapper.focus(function () {
    var $this = $(this);
    $this.data("initialText", $this.html());

    // Remove existing 'keydown' event handlers before attaching a new one
    $this.off('keydown').on('keydown', function (e) {
      if (e.keyCode == 13 || e.keyCode == 9) {
        // Check if 'Enter' was pressed or 'Tab' was pressed
        e.preventDefault();

        // Create a new span
        var newSpan = $('<span class="seo-central-title-order-span-list-item" contenteditable="true" ></span>');

        //Set double click event to the newly generated span
        setVariableDoubleClick($, newSpan);

        // Add new span to the main div
        $(this).append(newSpan);

        // Set focus to the new span (wrapped in a timeout so it fires properly)
        setTimeout(function () {
          var range = document.createRange();
          var sel = window.getSelection();
          range.setStart(newSpan[0], 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          newSpan[0].focus();
        }, 0);
        allSpans = variableWrapper.find('.seo-central-title-order-span-list-item');
      } else if (e.keyCode == 188) {
        // Check if 'Comma' was pressed  
        // Prevent the comma from appearing
        e.preventDefault();

        // Create a new span
        var newSpan = $('<span class="seo-central-title-order-span-list-item" contenteditable="true" ></span>');

        //Set double click event to the newly generated span
        setVariableDoubleClick($, newSpan);

        // Add new span to the main div
        $(this).append(newSpan);

        // Set focus to the new span
        setTimeout(function () {
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
          setTimeout(function () {
            if (focusedSpan.is(':empty') || focusedSpan.contents().length === 1 && focusedSpan.contents().eq(0).is('br')) {
              var newValue = '';
              variableWrapper.find('.seo-central-title-order-span-list-item').each(function () {
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
  allSpans.dblclick(function () {
    var len = $(this).text().length;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(this.firstChild, len); // Sets the start position to the end of the content
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  });

  // When you leave an item
  variableWrapper.blur(function () {
    // if content is different
    if ($(this).data("initialText") !== $(this).html()) {
      //Update the input value and remove empty spans
      var allSpans = variableWrapper.find('.seo-central-title-order-span-list-item'),
        storedText = '';
      allSpans.each(function (index, span) {
        if (span.innerHTML != '<br>' && span.innerHTML != '') {
          storedText += span.innerHTML + ',';
        } else {
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
  $(element).dblclick(function () {
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
function moveNotifications($) {
  var wpAlert = document.querySelector('#wpbody-content .update-nag.notice'),
    centralAlert = document.querySelector('#seo-central-auto-notifier'),
    notificationSpan = document.querySelector("#seo-central-auto-notifier .seo-central-partials-notification-text");

  // Take contents from wordpress default notification and place it into our custom element for proper display 
  // Make sure both elements are found in the DOM
  if (wpAlert && notificationSpan) {
    // Extract the HTML content of the updateDiv
    var updateContent = wpAlert.innerHTML;

    // Place the update content inside the notification span
    notificationSpan.innerHTML = updateContent;
    centralAlert.classList.add('enabled');
    wpAlert.classList.add('hidden');
  }
}

/***/ }),

/***/ "./node_modules/jquery-sortablejs/jquery-sortable.js":
/*!***********************************************************!*\
  !*** ./node_modules/jquery-sortablejs/jquery-sortable.js ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
	"use strict";
	var sortable,
		jq,
		_this = this
	;

	if (true) {
		try {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(Sortable, $) {
				sortable = Sortable;
				jq = $;
				checkErrors();
				factory(Sortable, $);
			}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} catch(err) {
			checkErrors();
		}
		return;
	} else {}

	if (typeof jQuery === 'function' || typeof $ === 'function') {
		jq = jQuery || $;
	}

	if (typeof Sortable !== 'undefined') {
		sortable = Sortable;
	}

	function checkErrors() {
		if (!jq) {
			throw new Error('jQuery is required for jquery-sortablejs');
		}

		if (!sortable) {
			throw new Error('SortableJS is required for jquery-sortablejs (https://github.com/SortableJS/Sortable)');
		}
	}
	checkErrors();
	factory(sortable, jq);
})(function (Sortable, $) {
	"use strict";

	$.fn.sortable = function (options) {
		var retVal,
			args = arguments;

		this.each(function () {
			var $el = $(this),
				sortable = $el.data('sortable');

			if (!sortable && (options instanceof Object || !options)) {
				sortable = new Sortable(this, options);
				$el.data('sortable', sortable);
			} else if (sortable) {
				if (options === 'destroy') {
					sortable.destroy();
					$el.removeData('sortable');
				} else if (options === 'widget') {
					retVal = sortable;
				} else if (typeof sortable[options] === 'function') {
					retVal = sortable[options].apply(sortable, [].slice.call(args, 1));
				} else if (options in sortable.options) {
					retVal = sortable.option.apply(sortable, args);
				}
			}
		});

		return (retVal === void 0) ? this : retVal;
	};
});


/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.7.0
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-05-11T18:29Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.0",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented
// as part of Sizzle so let's maintain them in the 3.x line
// for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./admin/src/css/seocentral-plugin-admin.css":
/*!***************************************************!*\
  !*** ./admin/src/css/seocentral-plugin-admin.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/driver.js/dist/driver.css":
/*!************************************************!*\
  !*** ./node_modules/driver.js/dist/driver.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiDrag": () => (/* binding */ MultiDragPlugin),
/* harmony export */   "Sortable": () => (/* binding */ Sortable),
/* harmony export */   "Swap": () => (/* binding */ SwapPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var version = "1.15.0";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !! /*@__PURE__*/navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        this.forRepaintDummy = repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.forEach(function (p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var _excluded = ["evt"];

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, _excluded);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    var threshold = sortable[expando].options.emptyInsertThreshold;
    if (!threshold || lastChild(sortable)) return;
    var rect = getRect(sortable),
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists && !ChromeForAndroid) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    } // Safari ignores further event handling after mousedown


    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {

    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread2({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // Insert to end of list
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // if there is a last element, it is the target


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();

          if (elLastChild && elLastChild.nextSibling) {
            // the last draggable element is not the last node
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }

          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        // Insert to start of list
        var firstChild = getChild(el, 0, options, true);

        if (firstChild === dragEl) {
          return completed(false);
        }

        target = firstChild;
        targetRect = getRect(target);

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsFirst(evt, vertical, sortable) {
  var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var spacer = 10;
  return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;

var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;

      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (!sortable.options.avoidImplicitDeselect) {
      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      avoidImplicitDeselect: false,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvent: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvent: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvent: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        folding = false; // Do not "unfold" after around dragEl if reverted

        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvent: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sortable);



/***/ }),

/***/ "./node_modules/@picmo/popup-picker/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@picmo/popup-picker/dist/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupPickerController": () => (/* binding */ ae),
/* harmony export */   "createPopup": () => (/* binding */ pe)
/* harmony export */ });
/* harmony import */ var picmo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! picmo */ "./node_modules/picmo/dist/index.js");

function _(t) {
  return t.split("-")[0];
}
function V(t) {
  return t.split("-")[1];
}
function K(t) {
  return ["top", "bottom"].includes(_(t)) ? "x" : "y";
}
function at(t) {
  return t === "y" ? "height" : "width";
}
function tt(t, e, n) {
  let {
    reference: i,
    floating: o
  } = t;
  const c = i.x + i.width / 2 - o.width / 2, r = i.y + i.height / 2 - o.height / 2, s = K(e), l = at(s), a = i[l] / 2 - o[l] / 2, d = _(e), f = s === "x";
  let u;
  switch (d) {
    case "top":
      u = {
        x: c,
        y: i.y - o.height
      };
      break;
    case "bottom":
      u = {
        x: c,
        y: i.y + i.height
      };
      break;
    case "right":
      u = {
        x: i.x + i.width,
        y: r
      };
      break;
    case "left":
      u = {
        x: i.x - o.width,
        y: r
      };
      break;
    default:
      u = {
        x: i.x,
        y: i.y
      };
  }
  switch (V(e)) {
    case "start":
      u[s] -= a * (n && f ? -1 : 1);
      break;
    case "end":
      u[s] += a * (n && f ? -1 : 1);
      break;
  }
  return u;
}
const At = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: c = [],
    platform: r
  } = n, s = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let l = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: a,
    y: d
  } = tt(l, i, s), f = i, u = {}, h = 0;
  for (let m = 0; m < c.length; m++) {
    const {
      name: p,
      fn: w
    } = c[m], {
      x: y,
      y: g,
      data: v,
      reset: x
    } = await w({
      x: a,
      y: d,
      initialPlacement: i,
      placement: f,
      strategy: o,
      middlewareData: u,
      rects: l,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (a = y != null ? y : a, d = g != null ? g : d, u = {
      ...u,
      [p]: {
        ...u[p],
        ...v
      }
    }, x && h <= 50) {
      h++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await r.getElementRects({
        reference: t,
        floating: e,
        strategy: o
      }) : x.rects), {
        x: a,
        y: d
      } = tt(l, f, s)), m = -1;
      continue;
    }
  }
  return {
    x: a,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: u
  };
};
function Lt(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ot(t) {
  return typeof t != "number" ? Lt(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function I(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function Q(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: o,
    platform: c,
    rects: r,
    elements: s,
    strategy: l
  } = t, {
    boundary: a = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: u = !1,
    padding: h = 0
  } = e, m = Ot(h), w = s[u ? f === "floating" ? "reference" : "floating" : f], y = I(await c.getClippingRect({
    element: (n = await (c.isElement == null ? void 0 : c.isElement(w))) == null || n ? w : w.contextElement || await (c.getDocumentElement == null ? void 0 : c.getDocumentElement(s.floating)),
    boundary: a,
    rootBoundary: d,
    strategy: l
  })), g = I(c.convertOffsetParentRelativeRectToViewportRelativeRect ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: f === "floating" ? {
      ...r.floating,
      x: i,
      y: o
    } : r.reference,
    offsetParent: await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(s.floating)),
    strategy: l
  }) : r[f]);
  return {
    top: y.top - g.top + m.top,
    bottom: g.bottom - y.bottom + m.bottom,
    left: y.left - g.left + m.left,
    right: g.right - y.right + m.right
  };
}
const Rt = Math.min, kt = Math.max;
function et(t, e, n) {
  return kt(t, Rt(e, n));
}
const Tt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function z(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Tt[e]);
}
function ft(t, e, n) {
  n === void 0 && (n = !1);
  const i = V(t), o = K(t), c = at(o);
  let r = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[c] > e.floating[c] && (r = z(r)), {
    main: r,
    cross: z(r)
  };
}
const Bt = {
  start: "end",
  end: "start"
};
function G(t) {
  return t.replace(/start|end/g, (e) => Bt[e]);
}
const St = ["top", "right", "bottom", "left"], Dt = /* @__PURE__ */ St.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
function _t(t, e, n) {
  return (t ? [...n.filter((o) => V(o) === t), ...n.filter((o) => V(o) !== t)] : n.filter((o) => _(o) === o)).filter((o) => t ? V(o) === t || (e ? G(o) !== o : !1) : !0);
}
const Vt = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var n, i, o, c, r;
      const {
        x: s,
        y: l,
        rects: a,
        middlewareData: d,
        placement: f,
        platform: u,
        elements: h
      } = e, {
        alignment: m = null,
        allowedPlacements: p = Dt,
        autoAlignment: w = !0,
        ...y
      } = t, g = _t(m, w, p), v = await Q(e, y), x = (n = (i = d.autoPlacement) == null ? void 0 : i.index) != null ? n : 0, b = g[x];
      if (b == null)
        return {};
      const {
        main: M,
        cross: H
      } = ft(b, a, await (u.isRTL == null ? void 0 : u.isRTL(h.floating)));
      if (f !== b)
        return {
          x: s,
          y: l,
          reset: {
            placement: g[0]
          }
        };
      const j = [v[_(b)], v[M], v[H]], E = [...(o = (c = d.autoPlacement) == null ? void 0 : c.overflows) != null ? o : [], {
        placement: b,
        overflows: j
      }], B = g[x + 1];
      if (B)
        return {
          data: {
            index: x + 1,
            overflows: E
          },
          reset: {
            placement: B
          }
        };
      const S = E.slice().sort((A, $) => A.overflows[0] - $.overflows[0]), F = (r = S.find((A) => {
        let {
          overflows: $
        } = A;
        return $.every((yt) => yt <= 0);
      })) == null ? void 0 : r.placement, D = F != null ? F : S[0].placement;
      return D !== f ? {
        data: {
          index: x + 1,
          overflows: E
        },
        reset: {
          placement: D
        }
      } : {};
    }
  };
};
function Nt(t) {
  const e = z(t);
  return [G(t), e, G(e)];
}
const Ft = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: i,
        middlewareData: o,
        rects: c,
        initialPlacement: r,
        platform: s,
        elements: l
      } = e, {
        mainAxis: a = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: u = "bestFit",
        flipAlignment: h = !0,
        ...m
      } = t, p = _(i), y = f || (p === r || !h ? [z(r)] : Nt(r)), g = [r, ...y], v = await Q(e, m), x = [];
      let b = ((n = o.flip) == null ? void 0 : n.overflows) || [];
      if (a && x.push(v[p]), d) {
        const {
          main: E,
          cross: B
        } = ft(i, c, await (s.isRTL == null ? void 0 : s.isRTL(l.floating)));
        x.push(v[E], v[B]);
      }
      if (b = [...b, {
        placement: i,
        overflows: x
      }], !x.every((E) => E <= 0)) {
        var M, H;
        const E = ((M = (H = o.flip) == null ? void 0 : H.index) != null ? M : 0) + 1, B = g[E];
        if (B)
          return {
            data: {
              index: E,
              overflows: b
            },
            reset: {
              placement: B
            }
          };
        let S = "bottom";
        switch (u) {
          case "bestFit": {
            var j;
            const F = (j = b.map((D) => [D, D.overflows.filter((A) => A > 0).reduce((A, $) => A + $, 0)]).sort((D, A) => D[1] - A[1])[0]) == null ? void 0 : j[0].placement;
            F && (S = F);
            break;
          }
          case "initialPlacement":
            S = r;
            break;
        }
        if (i !== S)
          return {
            reset: {
              placement: S
            }
          };
      }
      return {};
    }
  };
};
async function $t(t, e) {
  const {
    placement: n,
    platform: i,
    elements: o
  } = t, c = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), r = _(n), s = V(n), l = K(n) === "x", a = ["left", "top"].includes(r) ? -1 : 1, d = c && l ? -1 : 1, f = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: u,
    crossAxis: h,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return s && typeof m == "number" && (h = s === "end" ? m * -1 : m), l ? {
    x: h * d,
    y: u * a
  } : {
    x: u * a,
    y: h * d
  };
}
const nt = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i
      } = e, o = await $t(e, t);
      return {
        x: n + o.x,
        y: i + o.y,
        data: o
      };
    }
  };
};
function Wt(t) {
  return t === "x" ? "y" : "x";
}
const ot = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: o
      } = e, {
        mainAxis: c = !0,
        crossAxis: r = !1,
        limiter: s = {
          fn: (w) => {
            let {
              x: y,
              y: g
            } = w;
            return {
              x: y,
              y: g
            };
          }
        },
        ...l
      } = t, a = {
        x: n,
        y: i
      }, d = await Q(e, l), f = K(_(o)), u = Wt(f);
      let h = a[f], m = a[u];
      if (c) {
        const w = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", g = h + d[w], v = h - d[y];
        h = et(g, h, v);
      }
      if (r) {
        const w = u === "y" ? "top" : "left", y = u === "y" ? "bottom" : "right", g = m + d[w], v = m - d[y];
        m = et(g, m, v);
      }
      const p = s.fn({
        ...e,
        [f]: h,
        [u]: m
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - i
        }
      };
    }
  };
};
function ut(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function R(t) {
  if (t == null)
    return window;
  if (!ut(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function C(t) {
  return R(t).getComputedStyle(t);
}
function L(t) {
  return ut(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function dt() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function P(t) {
  return t instanceof R(t).HTMLElement;
}
function k(t) {
  return t instanceof R(t).Element;
}
function Mt(t) {
  return t instanceof R(t).Node;
}
function N(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = R(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function U(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i
  } = C(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Ht(t) {
  return ["table", "td", "th"].includes(L(t));
}
function pt(t) {
  const e = /firefox/i.test(dt()), n = C(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function ht() {
  return !/^((?!chrome|android).)*safari/i.test(dt());
}
const it = Math.min, W = Math.max, X = Math.round;
function O(t, e, n) {
  var i, o, c, r;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect();
  let l = 1, a = 1;
  e && P(t) && (l = t.offsetWidth > 0 && X(s.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && X(s.height) / t.offsetHeight || 1);
  const d = k(t) ? R(t) : window, f = !ht() && n, u = (s.left + (f && (i = (o = d.visualViewport) == null ? void 0 : o.offsetLeft) != null ? i : 0)) / l, h = (s.top + (f && (c = (r = d.visualViewport) == null ? void 0 : r.offsetTop) != null ? c : 0)) / a, m = s.width / l, p = s.height / a;
  return {
    width: m,
    height: p,
    top: h,
    right: u + m,
    bottom: h + p,
    left: u,
    x: u,
    y: h
  };
}
function T(t) {
  return ((Mt(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function q(t) {
  return k(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function mt(t) {
  return O(T(t)).left + q(t).scrollLeft;
}
function jt(t) {
  const e = O(t);
  return X(e.width) !== t.offsetWidth || X(e.height) !== t.offsetHeight;
}
function It(t, e, n) {
  const i = P(e), o = T(e), c = O(
    t,
    i && jt(e),
    n === "fixed"
  );
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if ((L(e) !== "body" || U(o)) && (r = q(e)), P(e)) {
      const l = O(e, !0);
      s.x = l.x + e.clientLeft, s.y = l.y + e.clientTop;
    } else
      o && (s.x = mt(o));
  return {
    x: c.left + r.scrollLeft - s.x,
    y: c.top + r.scrollTop - s.y,
    width: c.width,
    height: c.height
  };
}
function gt(t) {
  return L(t) === "html" ? t : t.assignedSlot || t.parentNode || (N(t) ? t.host : null) || T(t);
}
function st(t) {
  return !P(t) || C(t).position === "fixed" ? null : zt(t);
}
function zt(t) {
  let {
    offsetParent: e
  } = t, n = t, i = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: o
    } = n;
    if (o) {
      let c = o.offsetParent;
      if (C(o).display === "contents") {
        const r = o.hasAttribute("style"), s = o.style.display;
        o.style.display = C(n).display, c = o.offsetParent, o.style.display = s, r || o.removeAttribute("style");
      }
      n = o, e !== c && (e = c, i = !0);
    } else if (N(n) && n.host && i)
      break;
    n = N(n) && n.host || n.parentNode;
  }
  return e;
}
function Xt(t) {
  let e = gt(t);
  for (N(e) && (e = e.host); P(e) && !["html", "body"].includes(L(e)); ) {
    if (pt(e))
      return e;
    {
      const n = e.parentNode;
      e = N(n) ? n.host : n;
    }
  }
  return null;
}
function J(t) {
  const e = R(t);
  let n = st(t);
  for (; n && Ht(n) && C(n).position === "static"; )
    n = st(n);
  return n && (L(n) === "html" || L(n) === "body" && C(n).position === "static" && !pt(n)) ? e : n || Xt(t) || e;
}
function rt(t) {
  if (P(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = O(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Yt(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const o = P(n), c = T(n);
  if (n === c)
    return e;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if ((o || !o && i !== "fixed") && ((L(n) !== "body" || U(c)) && (r = q(n)), P(n))) {
    const l = O(n, !0);
    s.x = l.x + n.clientLeft, s.y = l.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - r.scrollLeft + s.x,
    y: e.y - r.scrollTop + s.y
  };
}
function Kt(t, e) {
  const n = R(t), i = T(t), o = n.visualViewport;
  let c = i.clientWidth, r = i.clientHeight, s = 0, l = 0;
  if (o) {
    c = o.width, r = o.height;
    const a = ht();
    (a || !a && e === "fixed") && (s = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: c,
    height: r,
    x: s,
    y: l
  };
}
function Ut(t) {
  var e;
  const n = T(t), i = q(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, c = W(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), r = W(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
  let s = -i.scrollLeft + mt(t);
  const l = -i.scrollTop;
  return C(o || n).direction === "rtl" && (s += W(n.clientWidth, o ? o.clientWidth : 0) - c), {
    width: c,
    height: r,
    x: s,
    y: l
  };
}
function wt(t) {
  const e = gt(t);
  return ["html", "body", "#document"].includes(L(e)) ? t.ownerDocument.body : P(e) && U(e) ? e : wt(e);
}
function Y(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = wt(t), o = i === ((n = t.ownerDocument) == null ? void 0 : n.body), c = R(i), r = o ? [c].concat(c.visualViewport || [], U(i) ? i : []) : i, s = e.concat(r);
  return o ? s : s.concat(Y(r));
}
function qt(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && N(n)) {
    let i = e;
    do {
      if (i && t === i)
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function Gt(t, e) {
  const n = O(t, !1, e === "fixed"), i = n.top + t.clientTop, o = n.left + t.clientLeft;
  return {
    top: i,
    left: o,
    x: o,
    y: i,
    right: o + t.clientWidth,
    bottom: i + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function ct(t, e, n) {
  return e === "viewport" ? I(Kt(t, n)) : k(e) ? Gt(e, n) : I(Ut(T(t)));
}
function Jt(t) {
  const e = Y(t), i = ["absolute", "fixed"].includes(C(t).position) && P(t) ? J(t) : t;
  return k(i) ? e.filter((o) => k(o) && qt(o, i) && L(o) !== "body") : [];
}
function Qt(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: o
  } = t;
  const r = [...n === "clippingAncestors" ? Jt(e) : [].concat(n), i], s = r[0], l = r.reduce((a, d) => {
    const f = ct(e, d, o);
    return a.top = W(f.top, a.top), a.right = it(f.right, a.right), a.bottom = it(f.bottom, a.bottom), a.left = W(f.left, a.left), a;
  }, ct(e, s, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
const Zt = {
  getClippingRect: Qt,
  convertOffsetParentRelativeRectToViewportRelativeRect: Yt,
  isElement: k,
  getDimensions: rt,
  getOffsetParent: J,
  getDocumentElement: T,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    return {
      reference: It(e, J(n), i),
      floating: {
        ...rt(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => C(t).direction === "rtl"
};
function te(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: c = !0,
    elementResize: r = !0,
    animationFrame: s = !1
  } = i, l = o && !s, a = c && !s, d = l || a ? [...k(t) ? Y(t) : [], ...Y(e)] : [];
  d.forEach((p) => {
    l && p.addEventListener("scroll", n, {
      passive: !0
    }), a && p.addEventListener("resize", n);
  });
  let f = null;
  if (r) {
    let p = !0;
    f = new ResizeObserver(() => {
      p || n(), p = !1;
    }), k(t) && !s && f.observe(t), f.observe(e);
  }
  let u, h = s ? O(t) : null;
  s && m();
  function m() {
    const p = O(t);
    h && (p.x !== h.x || p.y !== h.y || p.width !== h.width || p.height !== h.height) && n(), h = p, u = requestAnimationFrame(m);
  }
  return n(), () => {
    var p;
    d.forEach((w) => {
      l && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), (p = f) == null || p.disconnect(), f = null, s && cancelAnimationFrame(u);
  };
}
const ee = (t, e, n) => At(t, e, {
  platform: Zt,
  ...n
});
async function ne(t, e, n, i) {
  if (!i)
    throw new Error("Must provide a positioning option");
  return await (typeof i == "string" ? oe(t, e, n, i) : ie(e, i));
}
async function oe(t, e, n, i) {
  if (!n)
    throw new Error("Reference element is required for relative positioning");
  let o;
  return i === "auto" ? o = {
    middleware: [
      Vt(),
      ot(),
      nt({ mainAxis: 5, crossAxis: 12 })
    ]
  } : o = {
    placement: i,
    middleware: [
      Ft(),
      ot(),
      nt(5)
    ]
  }, te(n, e, async () => {
    if ((!n.isConnected || !n.offsetParent) && se(t))
      return;
    const { x: c, y: r } = await ee(n, e, o);
    Object.assign(e.style, {
      position: "absolute",
      left: `${c}px`,
      top: `${r}px`
    });
  });
}
function ie(t, e) {
  return t.style.position = "fixed", Object.entries(e).forEach(([n, i]) => {
    t.style[n] = i;
  }), () => {
  };
}
function se(t) {
  switch (t.options.onPositionLost) {
    case "close":
      return t.close(), !0;
    case "destroy":
      return t.destroy(), !0;
    case "hold":
      return !0;
  }
}
const re = {
  hideOnClickOutside: !0,
  hideOnEmojiSelect: !0,
  hideOnEscape: !0,
  position: "auto",
  showCloseButton: !0,
  onPositionLost: "none"
};
function ce(t = {}) {
  return {
    ...re,
    rootElement: document.body,
    ...t
  };
}
const le = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>', lt = (0,picmo__WEBPACK_IMPORTED_MODULE_0__.getPrefixedClasses)(
  "popupContainer",
  "closeButton"
);
class ae {
  constructor(e, n) {
    this.isOpen = !1, this.externalEvents = new picmo__WEBPACK_IMPORTED_MODULE_0__.Events(), this.options = { ...ce(n), ...(0,picmo__WEBPACK_IMPORTED_MODULE_0__.getOptions)(e) }, this.popupEl = document.createElement("div"), this.popupEl.classList.add(lt.popupContainer), this.popupEl.classList.add(this.options.theme), n.className && this.popupEl.classList.add(n.className), this.options.showCloseButton && (this.closeButton = document.createElement("button"), this.closeButton.type = "button", this.closeButton.classList.add(lt.closeButton), this.closeButton.innerHTML = le, this.closeButton.addEventListener("click", () => {
      this.close();
    }), this.popupEl.appendChild(this.closeButton));
    const i = document.createElement("div");
    this.popupEl.appendChild(i), this.picker = (0,picmo__WEBPACK_IMPORTED_MODULE_0__.createPicker)({ ...this.options, rootElement: i }), this.focusTrap = new picmo__WEBPACK_IMPORTED_MODULE_0__.FocusTrap(), this.picker.addEventListener("data:ready", () => {
      this.focusTrap.activate(this.picker.el), this.picker.setInitialFocus();
    }), this.options.hideOnEmojiSelect && this.picker.addEventListener("emoji:select", () => {
      var o;
      this.close(), (o = this.triggerElement) == null || o.focus();
    }), this.options.hideOnClickOutside && (this.onDocumentClick = this.onDocumentClick.bind(this), document.addEventListener("click", this.onDocumentClick)), this.options.hideOnEscape && (this.handleKeydown = this.handleKeydown.bind(this), this.popupEl.addEventListener("keydown", this.handleKeydown)), this.referenceElement = this.options.referenceElement, this.triggerElement = this.options.triggerElement;
  }
  addEventListener(e, n) {
    this.externalEvents.on(e, n), this.picker.addEventListener(e, n);
  }
  removeEventListener(e, n) {
    this.externalEvents.off(e, n), this.picker.removeEventListener(e, n);
  }
  handleKeydown(e) {
    var n;
    e.key === "Escape" && (this.close(), (n = this.triggerElement) == null || n.focus());
  }
  async destroy() {
    this.isOpen && await this.close(), document.removeEventListener("click", this.onDocumentClick), this.picker.destroy(), this.externalEvents.removeAll();
  }
  toggle(e) {
    return this.isOpen ? this.close() : this.open(e);
  }
  async open({ triggerElement: e, referenceElement: n } = {}) {
    this.isOpen || (e && (this.triggerElement = e), n && (this.referenceElement = n), await this.initiateOpenStateChange(!0), this.popupEl.style.opacity = "0", this.options.rootElement.appendChild(this.popupEl), await this.setPosition(), this.picker.reset(!1), await this.animatePopup(!0), await this.animateCloseButton(!0), this.picker.setInitialFocus(), this.externalEvents.emit("picker:open"));
  }
  async close() {
    var e;
    !this.isOpen || (await this.initiateOpenStateChange(!1), await this.animateCloseButton(!1), await this.animatePopup(!1), this.popupEl.remove(), this.picker.reset(), (e = this.positionCleanup) == null || e.call(this), this.focusTrap.deactivate(), this.externalEvents.emit("picker:close"));
  }
  getRunningAnimations() {
    return this.picker.el.getAnimations().filter((e) => e.playState === "running");
  }
  async setPosition() {
    var e;
    (e = this.positionCleanup) == null || e.call(this), this.positionCleanup = await ne(
      this,
      this.popupEl,
      this.referenceElement,
      this.options.position
    );
  }
  awaitPendingAnimations() {
    return Promise.all(this.getRunningAnimations().map((e) => e.finished));
  }
  onDocumentClick(e) {
    var o;
    const n = e.target, i = (o = this.triggerElement) == null ? void 0 : o.contains(n);
    this.isOpen && !this.picker.isPickerClick(e) && !i && this.close();
  }
  animatePopup(e) {
    return (0,picmo__WEBPACK_IMPORTED_MODULE_0__.animate)(
      this.popupEl,
      {
        opacity: [0, 1],
        transform: ["scale(0.9)", "scale(1)"]
      },
      {
        duration: 150,
        id: e ? "show-picker" : "hide-picker",
        easing: "ease-in-out",
        direction: e ? "normal" : "reverse",
        fill: "both"
      },
      this.options
    );
  }
  animateCloseButton(e) {
    if (this.closeButton)
      return (0,picmo__WEBPACK_IMPORTED_MODULE_0__.animate)(
        this.closeButton,
        {
          opacity: [0, 1]
        },
        {
          duration: 25,
          id: e ? "show-close" : "hide-close",
          easing: "ease-in-out",
          direction: e ? "normal" : "reverse",
          fill: "both"
        },
        this.options
      );
  }
  async initiateOpenStateChange(e) {
    this.isOpen = e, await this.awaitPendingAnimations();
  }
}
const fe = `.picmo__popupContainer{display:flex;flex-direction:column;position:absolute}.picmo__popupContainer .picmo__closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.picmo__popupContainer .picmo__closeButton:hover{background:var(--accent-color)}.picmo__popupContainer .picmo__closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`, ue = (0,picmo__WEBPACK_IMPORTED_MODULE_0__.createStyleInjector)();
function pe(t, e) {
  return ue(fe), new ae({
    autoFocus: "auto",
    ...t
  }, e);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/driver.js/dist/driver.js.mjs":
/*!***************************************************!*\
  !*** ./node_modules/driver.js/dist/driver.js.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "driver": () => (/* binding */ Se)
/* harmony export */ });
let F = {};
function D(e = {}) {
  F = {
    animate: !0,
    allowClose: !0,
    overlayOpacity: 0.7,
    smoothScroll: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function a(e) {
  return e ? F[e] : F;
}
function I(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function Q(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), p = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...p];
  }).filter((t) => ae(t));
}
function Z(e) {
  if (!e || se(e))
    return;
  const o = a("smoothScroll");
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !o || re(e) ? "auto" : "smooth",
    inline: "center",
    block: "center"
  });
}
function re(e) {
  if (!e || !e.parentElement)
    return;
  const o = e.parentElement;
  return o.scrollHeight > o.clientHeight;
}
function se(e) {
  const o = e.getBoundingClientRect();
  return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function ae(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
let O = {};
function P(e, o) {
  O[e] = o;
}
function l(e) {
  return e ? O[e] : O;
}
function V() {
  O = {};
}
let M = {};
function N(e, o) {
  M[e] = o;
}
function T(e) {
  var o;
  (o = M[e]) == null || o.call(M);
}
function ce() {
  M = {};
}
function le(e, o, t, i) {
  let p = l("__activeStagePosition");
  const n = p || t.getBoundingClientRect(), h = i.getBoundingClientRect(), w = I(e, n.x, h.x - n.x, o), r = I(e, n.y, h.y - n.y, o), v = I(e, n.width, h.width - n.width, o), s = I(e, n.height, h.height - n.height, o);
  p = {
    x: w,
    y: r,
    width: v,
    height: s
  }, J(p), P("__activeStagePosition", p);
}
function G(e) {
  if (!e)
    return;
  const o = e.getBoundingClientRect(), t = {
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height
  };
  P("__activeStagePosition", t), J(t);
}
function de() {
  const e = l("__activeStagePosition"), o = l("__overlaySvg");
  if (!e)
    return;
  if (!o) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, i = window.innerHeight;
  o.setAttribute("viewBox", `0 0 ${t} ${i}`);
}
function pe(e) {
  const o = ue(e);
  document.body.appendChild(o), te(o, (t) => {
    t.target.tagName === "path" && T("overlayClick");
  }), P("__overlaySvg", o);
}
function J(e) {
  const o = l("__overlaySvg");
  if (!o) {
    pe(e);
    return;
  }
  const t = o.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", U(e));
}
function ue(e) {
  const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return p.setAttribute("d", U(e)), p.style.fill = a("overlayColor") || "rgb(0,0,0)", p.style.opacity = `${a("overlayOpacity")}`, p.style.pointerEvents = "auto", p.style.cursor = "auto", i.appendChild(p), i;
}
function U(e) {
  const o = window.innerWidth, t = window.innerHeight, i = a("stagePadding") || 0, p = a("stageRadius") || 0, n = e.width + i * 2, h = e.height + i * 2, w = Math.min(p, n / 2, h / 2), r = Math.floor(Math.max(w, 0)), v = e.x - i + r, s = e.y - i, c = n - r * 2, d = h - r * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${s} h${c} a${r},${r} 0 0 1 ${r},${r} v${d} a${r},${r} 0 0 1 -${r},${r} h-${c} a${r},${r} 0 0 1 -${r},-${r} v-${d} a${r},${r} 0 0 1 ${r},-${r} z`;
}
function ve() {
  const e = l("__overlaySvg");
  e && e.remove();
}
function he() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let o = document.createElement("div");
  return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
}
function K(e) {
  const { element: o } = e;
  let t = typeof o == "string" ? document.querySelector(o) : o;
  t || (t = he()), ge(t, e);
}
function fe() {
  const e = l("activeElement"), o = l("activeStep");
  e && (G(e), de(), ie(e, o));
}
function ge(e, o) {
  const i = Date.now(), p = l("activeStep"), n = l("activeElement") || e, h = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = a("animate"), s = o.onHighlightStarted || a("onHighlightStarted"), c = (o == null ? void 0 : o.onHighlighted) || a("onHighlighted"), d = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), m = a(), g = l();
  !h && d && d(r ? void 0 : n, p, {
    config: m,
    state: g
  }), s && s(w ? void 0 : e, o, {
    config: m,
    state: g
  });
  const u = !h && v;
  let f = !1;
  be();
  const b = () => {
    if (l("__transitionCallback") !== b)
      return;
    const S = Date.now() - i, y = 400 - S <= 400 / 2;
    o.popover && y && !f && u && (X(e, o), f = !0), a("animate") && S < 400 ? le(S, 400, n, e) : (G(e), c && c(w ? void 0 : e, o, {
      config: a(),
      state: l()
    }), P("__transitionCallback", void 0), P("previousStep", p), P("previousElement", n), P("activeStep", o), P("activeElement", e)), window.requestAnimationFrame(b);
  };
  P("__transitionCallback", b), window.requestAnimationFrame(b), Z(e), !u && o.popover && X(e, o), n.classList.remove("driver-active-element"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function we() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function W() {
  const e = l("__resizeTimeout");
  e && window.cancelAnimationFrame(e), P("__resizeTimeout", window.requestAnimationFrame(fe));
}
function me(e) {
  var r;
  if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = l("activeElement"), p = (r = l("popover")) == null ? void 0 : r.wrapper, n = Q([
    ...p ? [p] : [],
    ...i ? [i] : []
  ]), h = n[0], w = n[n.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const v = n[n.indexOf(document.activeElement) - 1] || w;
    v == null || v.focus();
  } else {
    const v = n[n.indexOf(document.activeElement) + 1] || h;
    v == null || v.focus();
  }
}
function ee(e) {
  a("allowKeyboardControl");
  e.key === "Escape" ? T("escapePress") : e.key === "ArrowRight" ? T("arrowRightPress") : e.key === "ArrowLeft" && T("arrowLeftPress");
}
function te(e, o, t) {
  const i = (n, h) => {
    const w = n.target;
    e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), h == null || h(n));
  };
  document.addEventListener("pointerdown", i, !0), document.addEventListener("mousedown", i, !0), document.addEventListener("pointerup", i, !0), document.addEventListener("mouseup", i, !0), document.addEventListener(
    "click",
    (n) => {
      i(n, o);
    },
    !0
  );
}
function ye() {
  window.addEventListener("keyup", ee, !1), window.addEventListener("keydown", me, !1), window.addEventListener("resize", W), window.addEventListener("scroll", W);
}
function xe() {
  window.removeEventListener("keyup", ee), window.removeEventListener("resize", W), window.removeEventListener("scroll", W);
}
function be() {
  const e = l("popover");
  e && (e.wrapper.style.display = "none");
}
function X(e, o) {
  var y, x;
  let t = l("popover");
  t && document.body.removeChild(t.wrapper), t = Pe(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: p,
    showButtons: n,
    disableButtons: h,
    showProgress: w,
    nextBtnText: r = a("nextBtnText") || "Next &rarr;",
    prevBtnText: v = a("prevBtnText") || "&larr; Previous",
    progressText: s = a("progressText") || "{current} of {total}"
  } = o.popover || {};
  t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = s, i ? (t.title.innerText = i, t.title.style.display = "block") : t.title.style.display = "none", p ? (t.description.innerHTML = p, t.description.style.display = "block") : t.description.style.display = "none";
  const c = n || a("showButtons"), d = w || a("showProgress") || !1, m = (c == null ? void 0 : c.includes("next")) || (c == null ? void 0 : c.includes("previous")) || d;
  t.closeButton.style.display = c.includes("close") ? "block" : "none", m ? (t.footer.style.display = "flex", t.progress.style.display = d ? "block" : "none", t.nextButton.style.display = c.includes("next") ? "block" : "none", t.previousButton.style.display = c.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const g = h || a("disableButtons") || [];
  g != null && g.includes("next") && (t.nextButton.disabled = !0, t.nextButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("previous") && (t.previousButton.disabled = !0, t.previousButton.classList.add("driver-popover-btn-disabled")), g != null && g.includes("close") && (t.closeButton.disabled = !0, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const u = t.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
  const f = t.arrow;
  f.className = "driver-popover-arrow";
  const b = ((y = o.popover) == null ? void 0 : y.popoverClass) || a("popoverClass") || "";
  u.className = `driver-popover ${b}`.trim(), te(
    t.wrapper,
    (L) => {
      var B, _, R;
      const E = L.target, A = ((B = o.popover) == null ? void 0 : B.onNextClick) || a("onNextClick"), H = ((_ = o.popover) == null ? void 0 : _.onPrevClick) || a("onPrevClick"), $ = ((R = o.popover) == null ? void 0 : R.onCloseClick) || a("onCloseClick");
      if (E.classList.contains("driver-popover-next-btn"))
        return A ? A(e, o, {
          config: a(),
          state: l()
        }) : T("nextClick");
      if (E.classList.contains("driver-popover-prev-btn"))
        return H ? H(e, o, {
          config: a(),
          state: l()
        }) : T("prevClick");
      if (E.classList.contains("driver-popover-close-btn"))
        return $ ? $(e, o, {
          config: a(),
          state: l()
        }) : T("closeClick");
    },
    (L) => !(t != null && t.description.contains(L)) && !(t != null && t.title.contains(L)) && L.className.includes("driver-popover")
  ), P("popover", t);
  const k = ((x = o.popover) == null ? void 0 : x.onPopoverRender) || a("onPopoverRender");
  k && k(t, {
    config: a(),
    state: l()
  }), ie(e, o), Z(u);
  const S = e.classList.contains("driver-dummy-element"), C = Q([u, ...S ? [] : [e]]);
  C.length > 0 && C[0].focus();
}
function oe() {
  const e = l("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = a("stagePadding") || 0, i = a("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Y(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - p,
      window.innerHeight - i.realHeight - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + p,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : 0;
}
function j(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: p, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - p,
      window.innerWidth - i.realWidth - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + p,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : 0;
}
function ie(e, o) {
  const t = l("popover");
  if (!t)
    return;
  const { align: i = "start", side: p = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, h = e.id === "driver-dummy-element" ? "over" : p, w = a("stagePadding") || 0, r = oe(), v = t.arrow.getBoundingClientRect(), s = e.getBoundingClientRect(), c = s.top - r.height;
  let d = c >= 0;
  const m = window.innerHeight - (s.bottom + r.height);
  let g = m >= 0;
  const u = s.left - r.width;
  let f = u >= 0;
  const b = window.innerWidth - (s.right + r.width);
  let k = b >= 0;
  const S = !d && !g && !f && !k;
  let C = h;
  if (h === "top" && d ? k = f = g = !1 : h === "bottom" && g ? k = f = d = !1 : h === "left" && f ? k = d = g = !1 : h === "right" && k && (f = d = g = !1), h === "over") {
    const y = window.innerWidth / 2 - r.realWidth / 2, x = window.innerHeight / 2 - r.realHeight / 2;
    t.wrapper.style.left = `${y}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${x}px`, t.wrapper.style.bottom = "auto";
  } else if (S) {
    const y = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, x = 10;
    t.wrapper.style.left = `${y}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${x}px`, t.wrapper.style.top = "auto";
  } else if (f) {
    const y = Math.min(
      u,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), x = Y(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${y}px`, t.wrapper.style.top = `${x}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", C = "left";
  } else if (k) {
    const y = Math.min(
      b,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), x = Y(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.right = `${y}px`, t.wrapper.style.top = `${x}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", C = "right";
  } else if (d) {
    const y = Math.min(
      c,
      window.innerHeight - r.realHeight - v.width
    );
    let x = j(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.top = `${y}px`, t.wrapper.style.left = `${x}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", C = "top";
  } else if (g) {
    const y = Math.min(
      m,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
    );
    let x = j(n, {
      elementDimensions: s,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${x}px`, t.wrapper.style.bottom = `${y}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", C = "bottom";
  }
  S ? t.arrow.classList.add("driver-popover-arrow-none") : Ce(n, C, e);
}
function Ce(e, o, t) {
  const i = l("popover");
  if (!i)
    return;
  const p = t.getBoundingClientRect(), n = oe(), h = i.arrow, w = n.width, r = window.innerWidth, v = p.width, s = p.left, c = n.height, d = window.innerHeight, m = p.top, g = p.height;
  h.className = "driver-popover-arrow";
  let u = o, f = e;
  o === "top" ? (s + v <= 0 ? (u = "right", f = "end") : s + v - w <= 0 && (u = "top", f = "start"), s >= r ? (u = "left", f = "end") : s + w >= r && (u = "top", f = "end")) : o === "bottom" ? (s + v <= 0 ? (u = "right", f = "start") : s + v - w <= 0 && (u = "bottom", f = "start"), s >= r ? (u = "left", f = "start") : s + w >= r && (u = "bottom", f = "end")) : o === "left" ? (m + g <= 0 ? (u = "bottom", f = "end") : m + g - c <= 0 && (u = "left", f = "start"), m >= d ? (u = "top", f = "end") : m + c >= d && (u = "left", f = "end")) : o === "right" && (m + g <= 0 ? (u = "bottom", f = "start") : m + g - c <= 0 && (u = "right", f = "start"), m >= d ? (u = "top", f = "start") : m + c >= d && (u = "right", f = "end")), u ? (h.classList.add(`driver-popover-arrow-side-${u}`), h.classList.add(`driver-popover-arrow-align-${f}`)) : h.classList.add("driver-popover-arrow-none");
}
function Pe() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const o = document.createElement("div");
  o.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const i = document.createElement("div");
  i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
  const p = document.createElement("button");
  p.type = "button", p.classList.add("driver-popover-close-btn"), p.setAttribute("aria-label", "Close"), p.innerHTML = "&times;";
  const n = document.createElement("footer");
  n.classList.add("driver-popover-footer");
  const h = document.createElement("span");
  h.classList.add("driver-popover-progress-text"), h.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const r = document.createElement("button");
  r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
  const v = document.createElement("button");
  return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(v), n.appendChild(h), n.appendChild(w), e.appendChild(p), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: n,
    previousButton: r,
    nextButton: v,
    closeButton: p,
    footerButtons: w,
    progress: h
  };
}
function ke() {
  var o;
  const e = l("popover");
  e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function Se(e = {}) {
  D(e);
  function o() {
    a("allowClose") && v();
  }
  function t() {
    const s = l("activeIndex"), c = a("steps") || [];
    if (typeof s > "u")
      return;
    const d = s + 1;
    c[d] ? r(d) : v();
  }
  function i() {
    const s = l("activeIndex"), c = a("steps") || [];
    if (typeof s > "u")
      return;
    const d = s - 1;
    c[d] ? r(d) : v();
  }
  function p(s) {
    (a("steps") || [])[s] ? r(s) : v();
  }
  function n() {
    var f;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), d = l("activeStep"), m = l("activeElement");
    if (typeof c > "u" || typeof d > "u" || typeof l("activeIndex") > "u")
      return;
    const u = ((f = d.popover) == null ? void 0 : f.onPrevClick) || a("onPrevClick");
    if (u)
      return u(m, d, {
        config: a(),
        state: l()
      });
    i();
  }
  function h() {
    var u;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), d = l("activeStep"), m = l("activeElement");
    if (typeof c > "u" || typeof d > "u")
      return;
    const g = ((u = d.popover) == null ? void 0 : u.onNextClick) || a("onNextClick");
    if (g)
      return g(m, d, {
        config: a(),
        state: l()
      });
    t();
  }
  function w() {
    l("isInitialized") || (P("isInitialized", !0), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), ye(), N("overlayClick", o), N("escapePress", o), N("arrowLeftPress", n), N("arrowRightPress", h));
  }
  function r(s = 0) {
    var A, H, $, B, _, R, z, q;
    const c = a("steps");
    if (!c) {
      console.error("No steps to drive through"), v();
      return;
    }
    if (!c[s]) {
      v();
      return;
    }
    P("__activeOnDestroyed", document.activeElement), P("activeIndex", s);
    const d = c[s], m = c[s + 1], g = c[s - 1], u = ((A = d.popover) == null ? void 0 : A.doneBtnText) || a("doneBtnText") || "Done", f = a("allowClose"), b = typeof ((H = d.popover) == null ? void 0 : H.showProgress) < "u" ? ($ = d.popover) == null ? void 0 : $.showProgress : a("showProgress"), S = (((B = d.popover) == null ? void 0 : B.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${c.length}`), C = ((_ = d.popover) == null ? void 0 : _.showButtons) || a("showButtons"), y = [
      "next",
      "previous",
      ...f ? ["close"] : []
    ].filter((ne) => !(C != null && C.length) || C.includes(ne)), x = ((R = d.popover) == null ? void 0 : R.onNextClick) || a("onNextClick"), L = ((z = d.popover) == null ? void 0 : z.onPrevClick) || a("onPrevClick"), E = ((q = d.popover) == null ? void 0 : q.onCloseClick) || a("onCloseClick");
    K({
      ...d,
      popover: {
        showButtons: y,
        nextBtnText: m ? void 0 : u,
        disableButtons: [...g ? [] : ["previous"]],
        showProgress: b,
        progressText: S,
        onNextClick: x || (() => {
          m ? r(s + 1) : v();
        }),
        onPrevClick: L || (() => {
          r(s - 1);
        }),
        onCloseClick: E || (() => {
          v();
        }),
        ...(d == null ? void 0 : d.popover) || {}
      }
    });
  }
  function v(s = !0) {
    const c = l("activeElement"), d = l("activeStep"), m = l("__activeOnDestroyed"), g = a("onDestroyStarted");
    if (s && g) {
      const b = !c || (c == null ? void 0 : c.id) === "driver-dummy-element";
      g(b ? void 0 : c, d, {
        config: a(),
        state: l()
      });
      return;
    }
    const u = (d == null ? void 0 : d.onDeselected) || a("onDeselected"), f = a("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), xe(), ke(), we(), ve(), ce(), V(), c && d) {
      const b = c.id === "driver-dummy-element";
      u && u(b ? void 0 : c, d, {
        config: a(),
        state: l()
      }), f && f(b ? void 0 : c, d, {
        config: a(),
        state: l()
      });
    }
    m && m.focus();
  }
  return {
    isActive: () => l("isInitialized") || !1,
    refresh: W,
    drive: (s = 0) => {
      w(), r(s);
    },
    setConfig: D,
    setSteps: (s) => {
      V(), D({
        ...a(),
        steps: s
      });
    },
    getConfig: a,
    getState: l,
    getActiveIndex: () => l("activeIndex"),
    isFirstStep: () => l("activeIndex") === 0,
    isLastStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && c === s.length - 1;
    },
    getActiveStep: () => l("activeStep"),
    getActiveElement: () => l("activeElement"),
    getPreviousElement: () => l("previousElement"),
    getPreviousStep: () => l("previousStep"),
    moveNext: t,
    movePrevious: i,
    moveTo: p,
    hasNextStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && s[c + 1];
    },
    hasPreviousStep: () => {
      const s = a("steps") || [], c = l("activeIndex");
      return c !== void 0 && s[c - 1];
    },
    highlight: (s) => {
      w(), K({
        ...s,
        popover: s.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...s.popover
        } : void 0
      });
    },
    destroy: () => {
      v(!1);
    }
  };
}



/***/ }),

/***/ "./node_modules/picmo/dist/index.js":
/*!******************************************!*\
  !*** ./node_modules/picmo/dist/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmojiPicker": () => (/* binding */ _s),
/* harmony export */   "Events": () => (/* binding */ le),
/* harmony export */   "FocusTrap": () => (/* binding */ st),
/* harmony export */   "InMemoryProvider": () => (/* binding */ qs),
/* harmony export */   "InMemoryStoreFactory": () => (/* binding */ Se),
/* harmony export */   "IndexedDbStoreFactory": () => (/* binding */ Le),
/* harmony export */   "LocalStorageProvider": () => (/* binding */ zt),
/* harmony export */   "NativeRenderer": () => (/* binding */ Ft),
/* harmony export */   "RecentsProvider": () => (/* binding */ Ae),
/* harmony export */   "Renderer": () => (/* binding */ Et),
/* harmony export */   "SessionStorageProvider": () => (/* binding */ Us),
/* harmony export */   "animate": () => (/* binding */ I),
/* harmony export */   "autoTheme": () => (/* binding */ Os),
/* harmony export */   "caseInsensitiveIncludes": () => (/* binding */ ue),
/* harmony export */   "computeHash": () => (/* binding */ Ue),
/* harmony export */   "createDatabase": () => (/* binding */ Ws),
/* harmony export */   "createPicker": () => (/* binding */ Hs),
/* harmony export */   "createStyleInjector": () => (/* binding */ Ss),
/* harmony export */   "darkTheme": () => (/* binding */ Ns),
/* harmony export */   "debounce": () => (/* binding */ Ke),
/* harmony export */   "deleteDatabase": () => (/* binding */ Bs),
/* harmony export */   "empty": () => (/* binding */ V),
/* harmony export */   "en": () => (/* binding */ ze),
/* harmony export */   "getEmojiForEvent": () => (/* binding */ q),
/* harmony export */   "getOptions": () => (/* binding */ $t),
/* harmony export */   "getPrefixedClasses": () => (/* binding */ p),
/* harmony export */   "globalConfig": () => (/* binding */ At),
/* harmony export */   "i18n": () => (/* binding */ Ks),
/* harmony export */   "isLocalStorageAvailable": () => (/* binding */ qe),
/* harmony export */   "isSessionStorageAvailable": () => (/* binding */ xe),
/* harmony export */   "lightTheme": () => (/* binding */ ot),
/* harmony export */   "prefixClassName": () => (/* binding */ ne),
/* harmony export */   "replaceChildren": () => (/* binding */ w),
/* harmony export */   "shouldAnimate": () => (/* binding */ _e),
/* harmony export */   "throttle": () => (/* binding */ He),
/* harmony export */   "toElement": () => (/* binding */ Q)
/* harmony export */ });
var U = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var y = (s, e, t) => (U(s, e, "read from private field"), t ? t.call(s) : e.get(s)), f = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, A = (s, e, t, o) => (U(s, e, "write to private field"), o ? o.call(s, t) : e.set(s, t), t);
var g = (s, e, t) => (U(s, e, "access private method"), t);
const Ve = "14.0";
function De(s, e, t) {
  let o = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${s}`;
  return typeof t == "function" ? o = t(s, e) : typeof t == "string" && (o = `${t}/${s}`), o;
}
async function ae(s, e = {}) {
  const {
    local: t = !1,
    version: o = "latest",
    cdnUrl: i,
    ...r
  } = e, a = De(s, o, i), n = t ? localStorage : sessionStorage, l = `emojibase/${o}/${s}`, m = n.getItem(l);
  if (m)
    return Promise.resolve(JSON.parse(m));
  const d = await fetch(a, {
    credentials: "omit",
    mode: "cors",
    redirect: "error",
    ...r
  });
  if (!d.ok)
    throw new Error("Failed to load Emojibase dataset.");
  const h = await d.json();
  try {
    n.setItem(l, JSON.stringify(h));
  } catch {
  }
  return h;
}
const Be = {
  discord: "joypixels",
  slack: "iamcal"
};
async function me(s, e, t) {
  var o;
  return ae(`${s}/shortcodes/${(o = Be[e]) !== null && o !== void 0 ? o : e}.json`, t);
}
function k(s, e) {
  if (e.length === 0)
    return s;
  const t = new Set(s.shortcodes);
  return e.forEach((o) => {
    const i = o[s.hexcode];
    Array.isArray(i) ? i.forEach((r) => t.add(r)) : i && t.add(i);
  }), s.shortcodes = [...t], s.skins && s.skins.forEach((o) => {
    k(o, e);
  }), s;
}
function Ne(s, e = []) {
  const t = [];
  return s.forEach((o) => {
    if (o.skins) {
      const {
        skins: i,
        ...r
      } = o;
      t.push(k(r, e)), i.forEach((a) => {
        const n = {
          ...a
        };
        r.tags && (n.tags = [...r.tags]), t.push(k(n, e));
      });
    } else
      t.push(k(o, e));
  }), t;
}
function Oe(s, e) {
  return e.length === 0 || s.forEach((t) => {
    k(t, e);
  }), s;
}
async function Ce(s, e = {}) {
  const {
    compact: t = !1,
    flat: o = !1,
    shortcodes: i = [],
    ...r
  } = e, a = await ae(`${s}/${t ? "compact" : "data"}.json`, r);
  let n = [];
  return i.length > 0 && (n = await Promise.all(i.map((l) => {
    let m;
    if (l.includes("/")) {
      const [d, h] = l.split("/");
      m = me(d, h, r);
    } else
      m = me(s, l, r);
    return m.catch(() => ({}));
  }))), o ? Ne(a, n) : Oe(a, n);
}
async function je(s, e) {
  return ae(`${s}/messages.json`, e);
}
function q(s, e) {
  const o = s.target.closest("[data-emoji]");
  if (o) {
    const i = e.find((r) => r.emoji === o.dataset.emoji);
    if (i)
      return i;
  }
  return null;
}
function _e(s) {
  var t;
  const e = (t = window.matchMedia) == null ? void 0 : t.call(window, "(prefers-reduced-motion: reduce)");
  return s.animate && !(e != null && e.matches);
}
function ue(s, e) {
  return s.toLowerCase().includes(e.toLowerCase());
}
function He(s, e) {
  let t = null;
  return () => {
    t || (t = window.setTimeout(() => {
      s(), t = null;
    }, e));
  };
}
function Ke(s, e) {
  let t = null;
  return (...o) => {
    t && window.clearTimeout(t), t = window.setTimeout(() => {
      s(...o), t = null;
    }, e);
  };
}
function I(s, e, t, o) {
  if (_e(o) && s.animate)
    return s.animate(e, t).finished;
  const i = t.direction === "normal" ? 1 : 0, r = Object.entries(e).reduce((a, [n, l]) => ({
    ...a,
    [n]: l[i]
  }), {});
  return Object.assign(s.style, r), Promise.resolve();
}
function Q(s) {
  var t;
  const e = document.createElement("template");
  return e.innerHTML = s, (t = e.content) == null ? void 0 : t.firstElementChild;
}
async function Ue(s) {
  const e = new TextEncoder().encode(s), t = await crypto.subtle.digest("SHA-256", e);
  return Array.from(new Uint8Array(t)).map((i) => i.toString(16).padStart(2, "0")).join("");
}
function p(...s) {
  return s.reduce((e, t) => ({
    ...e,
    [t]: ne(t)
  }), {});
}
function ne(s) {
  return `picmo__${s}`;
}
function V(s) {
  for (; s.firstChild; )
    s.removeChild(s.firstChild);
  return s;
}
function w(s, ...e) {
  V(s).append(...e);
}
function ke(s) {
  try {
    return window[s].length, !0;
  } catch {
    return !1;
  }
}
function xe() {
  return ke("sessionStorage");
}
function qe() {
  return ke("localStorage");
}
function x(s) {
  var e;
  return {
    emoji: s.emoji,
    label: s.label,
    tags: s.tags,
    skins: (e = s.skins) == null ? void 0 : e.map((t) => x(t)),
    order: s.order,
    custom: !1,
    hexcode: s.hexcode,
    version: s.version
  };
}
function B(s, e, t) {
  var o;
  return t && !t.some((i) => i.order === s.group) ? !1 : ue(s.label, e) || ((o = s.tags) == null ? void 0 : o.some((i) => ue(i, e)));
}
class Ee {
  constructor(e = "en") {
    this.locale = e;
  }
}
const We = [
  (s, e) => (s.hexcode === "1F91D" && e < 14 && (s.skins = []), s),
  (s, e) => (s.skins && (s.skins = s.skins.filter((t) => !t.version || t.version <= e)), s)
];
function Ge(s, e) {
  return We.some((t) => t(s, e) === null) ? null : s;
}
function N(s, e) {
  return s.filter((t) => Ge(t, e) !== null);
}
const W = {};
function Se(s) {
  return W[s] || (W[s] = new Je(s)), W[s];
}
Se.deleteDatabase = (s) => {
};
class Je extends Ee {
  open() {
    return Promise.resolve();
  }
  delete() {
    return Promise.resolve();
  }
  close() {
  }
  isPopulated() {
    return Promise.resolve(!1);
  }
  getEmojiCount() {
    return Promise.resolve(this.emojis.length);
  }
  getEtags() {
    return Promise.resolve({ foo: "bar" });
  }
  getHash() {
    return Promise.resolve("");
  }
  populate(e) {
    return this.categories = e.groups, this.emojis = e.emojis, Promise.resolve();
  }
  getCategories(e) {
    var o;
    let t = this.categories.filter((i) => i.key !== "component");
    if (e.showRecents && t.unshift({ key: "recents", order: -1 }), (o = e.custom) != null && o.length && t.push({ key: "custom", order: 10 }), e.categories) {
      const i = e.categories;
      t = t.filter((r) => i.includes(r.key)), t.sort((r, a) => i.indexOf(r.key) - i.indexOf(a.key));
    } else
      t.sort((i, r) => i.order - r.order);
    return Promise.resolve(t);
  }
  getEmojis(e, t) {
    const o = this.emojis.filter((i) => i.group === e.order).filter((i) => i.version <= t).sort((i, r) => i.order != null && r.order != null ? i.order - r.order : 0).map(x);
    return Promise.resolve(N(o, t));
  }
  searchEmojis(e, t, o, i) {
    const r = this.emojis.filter((l) => B(l, e, i) && l.version <= o).map(x), a = t.filter((l) => B(l, e, i)), n = [
      ...N(r, o),
      ...a
    ];
    return Promise.resolve(n);
  }
  setMeta(e) {
    this.meta = e;
  }
}
function Ze(s, e) {
  const t = `https://cdn.jsdelivr.net/npm/emojibase-data@${s}/${e}`;
  return {
    emojisUrl: `${t}/data.json`,
    messagesUrl: `${t}/messages.json`
  };
}
async function pe(s) {
  try {
    return (await fetch(s, { method: "HEAD" })).headers.get("etag");
  } catch {
    return null;
  }
}
function Ye(s) {
  const { emojisUrl: e, messagesUrl: t } = Ze("latest", s);
  try {
    return Promise.all([
      pe(e),
      pe(t)
    ]);
  } catch {
    return Promise.all([null, null]);
  }
}
async function Qe(s, e, t) {
  let o;
  try {
    o = await s.getEtags();
  } catch {
    o = {};
  }
  const { storedEmojisEtag: i, storedMessagesEtag: r } = o;
  if (t !== r || e !== i) {
    const [a, n] = await Promise.all([je(s.locale), Ce(s.locale)]);
    await s.populate({
      groups: a.groups,
      emojis: n,
      emojisEtag: e,
      messagesEtag: t
    });
  }
}
async function Xe(s, e) {
  const t = await s.getHash();
  return e !== t;
}
async function Fe(s, e, t) {
  let o = t || e(s);
  try {
    await o.open();
  } catch {
    console.warn("[picmo] IndexedDB not available, falling back to InMemoryStoreFactory"), o = Se(s);
  }
  return o;
}
async function et(s, e, t) {
  if (!xe() && typeof window < "u")
    throw new Error("Session storage is required to use CDN emoji data.");
  const o = await Fe(s, e, t), [i, r] = await Ye(s);
  if (await o.isPopulated())
    i && r && await Qe(o, i, r);
  else {
    const [a, n] = await Promise.all([je(s), Ce(s)]);
    await o.populate({ groups: a.groups, emojis: n, emojisEtag: i, messagesEtag: r });
  }
  return o;
}
async function tt(s, e, t, o, i) {
  const r = await Fe(s, e, i), a = await Ue(o);
  return (!await r.isPopulated() || await Xe(r, a)) && await r.populate({ groups: t.groups, emojis: o, hash: a }), r;
}
async function ce(s, e, t, o, i) {
  return t && o ? tt(s, e, t, o, i) : et(s, e, i);
}
function Bs(s, e) {
  s.deleteDatabase(e);
}
class st {
  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  activate(e) {
    this.rootElement = e, this.rootElement.addEventListener("keydown", this.handleKeyDown);
  }
  deactivate() {
    var e;
    (e = this.rootElement) == null || e.removeEventListener("keydown", this.handleKeyDown);
  }
  get focusableElements() {
    return this.rootElement.querySelectorAll('input, [tabindex="0"]');
  }
  get lastFocusableElement() {
    return this.focusableElements[this.focusableElements.length - 1];
  }
  get firstFocusableElement() {
    return this.focusableElements[0];
  }
  checkFocus(e, t, o) {
    e.target === t && (o.focus(), e.preventDefault());
  }
  handleKeyDown(e) {
    e.key === "Tab" && this.checkFocus(
      e,
      e.shiftKey ? this.firstFocusableElement : this.lastFocusableElement,
      e.shiftKey ? this.lastFocusableElement : this.firstFocusableElement
    );
  }
}
const {
  light: ot,
  dark: Ns,
  auto: Os
} = p("light", "dark", "auto");
class c {
  constructor({ template: e, classes: t, parent: o }) {
    this.isDestroyed = !1, this.appEvents = {}, this.uiEvents = [], this.uiElements = {}, this.ui = {}, this.template = e, this.classes = t, this.parent = o, this.keyBindingHandler = this.keyBindingHandler.bind(this);
  }
  initialize() {
    this.bindAppEvents();
  }
  setCustomEmojis(e) {
    this.customEmojis = e;
  }
  setEvents(e) {
    this.events = e;
  }
  setPickerId(e) {
    this.pickerId = e;
  }
  emit(e, ...t) {
    this.events.emit(e, ...t);
  }
  setI18n(e) {
    this.i18n = e;
  }
  setRenderer(e) {
    this.renderer = e;
  }
  setEmojiData(e) {
    this.emojiDataPromise = e, e.then((t) => {
      this.emojiData = t;
    });
  }
  updateEmojiData(e) {
    this.emojiData = e, this.emojiDataPromise = Promise.resolve(e);
  }
  setOptions(e) {
    this.options = e;
  }
  renderSync(e = {}) {
    return this.el = this.template.renderSync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  async render(e = {}) {
    return await this.emojiDataPromise, this.el = await this.template.renderAsync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  postRender() {
    this.bindUIElements(), this.bindKeyBindings(), this.bindUIEvents(), this.scheduleShowAnimation();
  }
  bindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.on(e, this.appEvents[e], this);
    }), this.events.on("data:ready", this.updateEmojiData, this);
  }
  unbindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.off(e, this.appEvents[e]);
    }), this.events.off("data:ready", this.updateEmojiData);
  }
  keyBindingHandler(e) {
    const t = this.keyBindings[e.key];
    t && t.call(this, e);
  }
  bindKeyBindings() {
    this.keyBindings && this.el.addEventListener("keydown", this.keyBindingHandler);
  }
  unbindKeyBindings() {
    this.keyBindings && this.el.removeEventListener("keydown", this.keyBindingHandler);
  }
  bindUIElements() {
    this.ui = Object.keys(this.uiElements).reduce((e, t) => ({
      ...e,
      [t]: this.el.querySelector(this.uiElements[t])
    }), {});
  }
  bindUIEvents() {
    this.uiEvents.forEach((e) => {
      e.handler = e.handler.bind(this), (e.target ? this.ui[e.target] : this.el).addEventListener(e.event, e.handler, e.options);
    });
  }
  unbindUIEvents() {
    this.uiEvents.forEach((e) => {
      (e.target ? this.ui[e.target] : this.el).removeEventListener(e.event, e.handler);
    });
  }
  destroy() {
    this.unbindAppEvents(), this.unbindUIEvents(), this.unbindKeyBindings(), this.el.remove(), this.isDestroyed = !0;
  }
  scheduleShowAnimation() {
    if (this.parent) {
      const e = new MutationObserver((t) => {
        const [o] = t;
        o.type === "childList" && o.addedNodes[0] === this.el && (_e(this.options) && this.animateShow && this.animateShow(), e.disconnect);
      });
      e.observe(this.parent, { childList: !0 });
    }
  }
  static childEvent(e, t, o, i = {}) {
    return { target: e, event: t, handler: o, options: i };
  }
  static uiEvent(e, t, o = {}) {
    return { event: e, handler: t, options: o };
  }
  static byClass(e) {
    return `.${e}`;
  }
}
const it = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>', rt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>', at = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>', nt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>', ct = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>', lt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>', ht = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>', dt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>', mt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cy="10%" id="gradient-0">
      <stop offset="0" stop-color="hsl(50, 100%, 50%)" />
      <stop offset="1" stop-color="hsl(50, 100%, 60%)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="172.586" cy="207.006" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="334.523" cy="207.481" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="313.325" cy="356.208" rx="91.497" ry="59.893"/>
  <path fill="#55a7ff" d="M 159.427 274.06 L 102.158 363.286 L 124.366 417.011 L 160.476 423.338 L 196.937 414.736 L 218.502 375.214"></path>
  <path fill="url(#gradient-0)" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z" />
</svg>`, ut = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>', pt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>', gt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>', yt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>', ft = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>', vt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="radial" cy="85%">
      <stop offset="20%" stop-color="var(--color-secondary)" />
      <stop offset="100%" stop-color="var(--color-primary)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`, wt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';
function bt(s, e) {
  const t = Q(e);
  return t.dataset.icon = s, t.classList.add(ne("icon")), t;
}
const ge = {
  clock: it,
  flag: rt,
  frown: at,
  gamepad: nt,
  lightbulb: ct,
  mug: lt,
  plane: ht,
  robot: dt,
  sad: mt,
  search: ut,
  smiley: pt,
  symbols: gt,
  tree: yt,
  users: ft,
  warning: vt,
  xmark: wt
}, O = {
  recents: "clock",
  "smileys-emotion": "smiley",
  "people-body": "users",
  "animals-nature": "tree",
  "food-drink": "mug",
  activities: "gamepad",
  "travel-places": "plane",
  objects: "lightbulb",
  symbols: "symbols",
  flags: "flag",
  custom: "robot"
};
function Pe(s, e) {
  if (!(s in ge))
    return console.warn(`Unknown icon: "${s}"`), document.createElement("div");
  const t = bt(s, ge[s]);
  return e && t.classList.add(ne(`icon-${e}`)), t;
}
const Ct = {
  mode: "sync"
};
var b, E, S, X, F, ee, P, te;
class u {
  constructor(e, t = {}) {
    f(this, S);
    f(this, F);
    f(this, P);
    f(this, b, void 0);
    f(this, E, void 0);
    A(this, b, e), A(this, E, t.mode || Ct.mode);
  }
  renderSync(e = {}) {
    const t = Q(y(this, b).call(this, e));
    return g(this, P, te).call(this, t, e), g(this, F, ee).call(this, t), g(this, S, X).call(this, t, e), t;
  }
  async renderAsync(e = {}) {
    const t = Q(y(this, b).call(this, e));
    return g(this, P, te).call(this, t, e), g(this, F, ee).call(this, t), await g(this, S, X).call(this, t, e), t;
  }
  render(e) {
    return y(this, E) === "sync" ? this.renderSync(e) : this.renderAsync(e);
  }
}
b = new WeakMap(), E = new WeakMap(), S = new WeakSet(), X = async function(e, t) {
  const o = e.querySelectorAll("[data-view]"), i = [];
  for (const r of o) {
    const a = t[r.dataset.view];
    a ? r.dataset.render !== "sync" ? i.push(a.render().then((n) => (r.replaceWith(n), n))) : r.replaceWith(a.renderSync()) : r.remove();
  }
  return Promise.all(i);
}, F = new WeakSet(), ee = function(e) {
  e.querySelectorAll("i[data-icon]").forEach((o) => {
    const { icon: i, size: r } = o.dataset;
    o.replaceWith(Pe(i, r));
  });
}, P = new WeakSet(), te = function(e, t) {
  return e.querySelectorAll("[data-placeholder]").forEach((i) => {
    const r = i.dataset.placeholder;
    if (r && t[r]) {
      const a = t[r];
      i.replaceWith(...[a].flat());
    } else
      console.warn(`Missing placeholder element for key "${r}"`);
  }), e;
};
const jt = p(
  "imagePlaceholder",
  "placeholder"
), _t = new u(({ classes: s }) => `
  <div class="${s.placeholder} ${s.imagePlaceholder}"></div>
`);
class kt extends c {
  constructor({ classNames: e } = {}) {
    super({ template: _t, classes: jt }), this.classNames = e;
  }
  load(e) {
    const t = document.createElement("img");
    this.classNames && (t.className = this.classNames), t.addEventListener("load", () => {
      this.el.replaceWith(t);
    }, { once: !0 }), Promise.resolve(e).then((o) => t.src = o);
  }
  renderSync() {
    return super.renderSync(), this.classNames && this.classNames.split(" ").forEach((t) => this.el.classList.add(t)), this.el;
  }
}
const xt = p("customEmoji");
class Et {
  renderElement(e) {
    return { content: e };
  }
  renderImage(e = "", t) {
    const o = new kt({ classNames: e });
    return o.renderSync(), { content: o, resolver: () => (o.load(t()), o.el) };
  }
  doRender(e, t, o) {
    if (e.custom)
      return this.renderCustom(e, t, o);
    const { content: i, resolver: r } = this.render(e, o), a = i instanceof Element ? i : i.el;
    return r && r(), a;
  }
  doEmit(e) {
    return e.custom ? this.emitCustom(e) : this.emit(e);
  }
  emitCustom({ url: e, label: t, emoji: o, data: i }) {
    return { url: e, label: t, emoji: o, data: i };
  }
  renderCustom(e, t, o = "") {
    const i = [xt.customEmoji, o].join(" ").trim(), { content: r, resolver: a } = this.renderImage(i, () => e.url), n = r instanceof Element ? r : r.el;
    return a && a(), n;
  }
}
const St = new u(({ emoji: s }) => `<span>${s}</span>`);
class Ft extends Et {
  render(e) {
    return this.renderElement(St.renderSync({ emoji: e.emoji }));
  }
  emit({ emoji: e, hexcode: t, label: o }) {
    return { emoji: e, hexcode: t, label: o };
  }
}
const ze = {
  "categories.activities": "Activities",
  "categories.animals-nature": "Animals & Nature",
  "categories.custom": "Custom",
  "categories.flags": "Flags",
  "categories.food-drink": "Food & Drink",
  "categories.objects": "Objects",
  "categories.people-body": "People & Body",
  "categories.recents": "Recently Used",
  "categories.smileys-emotion": "Smileys & Emotion",
  "categories.symbols": "Symbols",
  "categories.travel-places": "Travel & Places",
  "error.load": "Failed to load emojis",
  "recents.clear": "Clear recent emojis",
  "recents.none": "You haven't selected any emojis yet.",
  retry: "Try again",
  "search.clear": "Clear search",
  "search.error": "Failed to search emojis",
  "search.notFound": "No results found",
  search: "Search emojis..."
}, se = "PicMo";
function Le(s) {
  return new Pt(s);
}
Le.deleteDatabase = (s) => new Promise((e, t) => {
  const o = indexedDB.deleteDatabase(`${se}-${s}`);
  o.addEventListener("success", e), o.addEventListener("error", t);
});
class Pt extends Ee {
  async open() {
    const e = indexedDB.open(`${se}-${this.locale}`);
    return new Promise((t, o) => {
      e.addEventListener("success", (i) => {
        var r;
        this.db = (r = i.target) == null ? void 0 : r.result, t();
      }), e.addEventListener("error", o), e.addEventListener("upgradeneeded", async (i) => {
        var a;
        this.db = (a = i.target) == null ? void 0 : a.result, this.db.createObjectStore("category", { keyPath: "order" });
        const r = this.db.createObjectStore("emoji", { keyPath: "emoji" });
        r.createIndex("category", "group"), r.createIndex("version", "version"), this.db.createObjectStore("meta");
      });
    });
  }
  async delete() {
    this.close();
    const e = indexedDB.deleteDatabase(`${se}-${this.locale}`);
    await this.waitForRequest(e);
  }
  close() {
    this.db.close();
  }
  async getEmojiCount() {
    const t = this.db.transaction("emoji", "readonly").objectStore("emoji");
    return (await this.waitForRequest(t.count())).target.result;
  }
  async getEtags() {
    const t = this.db.transaction("meta", "readonly").objectStore("meta"), [o, i] = await Promise.all([
      this.waitForRequest(t.get("emojisEtag")),
      this.waitForRequest(t.get("messagesEtag"))
    ]);
    return {
      storedEmojisEtag: o.target.result,
      storedMessagesEtag: i.target.result
    };
  }
  async setMeta(e) {
    const t = this.db.transaction("meta", "readwrite"), o = t.objectStore("meta");
    return new Promise((i) => {
      t.oncomplete = i, Object.keys(e).filter(Boolean).forEach((a) => {
        o.put(e[a], a);
      });
    });
  }
  async getHash() {
    const t = this.db.transaction("meta", "readonly").objectStore("meta");
    return (await this.waitForRequest(t.get("hash"))).target.result;
  }
  async isPopulated() {
    const t = this.db.transaction("category", "readonly").objectStore("category");
    return (await this.waitForRequest(t.count())).target.result > 0;
  }
  async populate({
    groups: e,
    emojis: t,
    emojisEtag: o,
    messagesEtag: i,
    hash: r
  }) {
    await this.removeAllObjects("category", "emoji");
    const a = [
      this.addObjects("category", e),
      this.addObjects("emoji", t),
      this.setMeta({ emojisEtag: o, messagesEtag: i, hash: r })
    ];
    await Promise.all(a);
  }
  async getCategories(e) {
    var a;
    const o = this.db.transaction("category", "readonly").objectStore("category");
    let r = (await this.waitForRequest(o.getAll())).target.result.filter((n) => n.key !== "component");
    if (e.showRecents && r.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && r.push({ key: "custom", order: 10 }), e.categories) {
      const n = e.categories;
      r = r.filter((l) => n.includes(l.key)), r.sort((l, m) => n.indexOf(l.key) - n.indexOf(m.key));
    } else
      r.sort((n, l) => n.order - l.order);
    return r;
  }
  async getEmojis(e, t) {
    const r = this.db.transaction("emoji", "readonly").objectStore("emoji").index("category"), l = (await this.waitForRequest(r.getAll(e.order))).target.result.filter((m) => m.version <= t).sort((m, d) => m.order != null && d.order != null ? m.order - d.order : 0).map(x);
    return N(l, t);
  }
  async searchEmojis(e, t, o, i) {
    const r = [];
    return new Promise((a, n) => {
      const d = this.db.transaction("emoji", "readonly").objectStore("emoji").openCursor();
      d.addEventListener("success", (h) => {
        var de;
        const H = (de = h.target) == null ? void 0 : de.result;
        if (!H)
          return a([
            ...N(r, o),
            ...t.filter((Me) => B(Me, e))
          ]);
        const K = H.value;
        B(K, e, i) && K.version <= o && r.push(x(K)), H.continue();
      }), d.addEventListener("error", (h) => {
        n(h);
      });
    });
  }
  async waitForRequest(e) {
    return new Promise((t, o) => {
      e.onsuccess = t, e.onerror = o;
    });
  }
  withTransaction(e, t = "readwrite", o) {
    return new Promise((i, r) => {
      const a = this.db.transaction(e, t);
      a.oncomplete = i, a.onerror = r, o(a);
    });
  }
  async removeAllObjects(...e) {
    const t = this.db.transaction(e, "readwrite"), o = e.map((i) => t.objectStore(i));
    await Promise.all(o.map((i) => this.waitForRequest(i.clear())));
  }
  async addObjects(e, t) {
    return this.withTransaction(e, "readwrite", (o) => {
      const i = o.objectStore(e);
      t.forEach((r) => {
        i.add(r);
      });
    });
  }
}
function $e() {
  let s = {};
  return {
    getItem: (e) => s[e],
    setItem: (e, t) => s[e] = t,
    length: Object.keys(s).length,
    clear: () => s = {},
    key: (e) => Object.keys(s)[e],
    removeItem: (e) => delete s[e]
  };
}
class Ae {
}
const G = "PicMo:recents";
class Ie extends Ae {
  constructor(e) {
    super(), this.storage = e;
  }
  clear() {
    this.storage.removeItem(G);
  }
  getRecents(e) {
    var t;
    try {
      return JSON.parse((t = this.storage.getItem(G)) != null ? t : "[]").slice(0, e);
    } catch {
      return [];
    }
  }
  addOrUpdateRecent(e, t) {
    const o = [
      e,
      ...this.getRecents(t).filter((i) => i.hexcode !== e.hexcode)
    ].slice(0, t);
    try {
      this.storage.setItem(G, JSON.stringify(o));
    } catch {
      console.warn("storage is not available, recent emojis will not be saved");
    }
  }
}
class zt extends Ie {
  constructor() {
    super(qe() ? localStorage : $e());
  }
}
const Lt = {
  dataStore: Le,
  theme: ot,
  animate: !0,
  showCategoryTabs: !0,
  showPreview: !0,
  showRecents: !0,
  showSearch: !0,
  showVariants: !0,
  emojisPerRow: 8,
  visibleRows: 6,
  emojiVersion: "auto",
  i18n: ze,
  locale: "en",
  maxRecents: 50,
  custom: []
};
function $t(s = {}) {
  return {
    ...Lt,
    ...s,
    renderer: s.renderer || new Ft(),
    recentsProvider: s.recentsProvider || new zt()
  };
}
var v, C, D, z, oe;
class le {
  constructor() {
    f(this, C);
    f(this, z);
    f(this, v, /* @__PURE__ */ new Map());
  }
  on(e, t, o) {
    g(this, z, oe).call(this, e, t, o);
  }
  once(e, t, o) {
    g(this, z, oe).call(this, e, t, o, !0);
  }
  off(e, t) {
    const o = g(this, C, D).call(this, e);
    y(this, v).set(e, o.filter((i) => i.handler !== t));
  }
  emit(e, ...t) {
    g(this, C, D).call(this, e).forEach((i) => {
      i.handler.apply(i.context, t), i.once && this.off(e, i.handler);
    });
  }
  removeAll() {
    y(this, v).clear();
  }
}
v = new WeakMap(), C = new WeakSet(), D = function(e) {
  return y(this, v).has(e) || y(this, v).set(e, []), y(this, v).get(e);
}, z = new WeakSet(), oe = function(e, t, o, i = !1) {
  g(this, C, D).call(this, e).push({ context: o, handler: t, once: i });
};
const At = {
  injectStyles: !0
};
class It extends le {
}
class Tt extends le {
}
const ie = p(
  "emojiCategory",
  "categoryName",
  "noRecents",
  "recentEmojis"
);
class he extends c {
  constructor({ template: e, category: t, showVariants: o, lazyLoader: i }) {
    super({ template: e, classes: ie }), this.baseUIElements = {
      categoryName: c.byClass(ie.categoryName)
    }, this.category = t, this.showVariants = o, this.lazyLoader = i;
  }
  setActive(e, t, o) {
    this.emojiContainer.setActive(e, t, o);
  }
}
const Rt = new u(({ classes: s, emoji: e }) => `
  <button
    type="button"
    class="${s.emojiButton}"
    title="${e.label}"
    data-emoji="${e.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`), Mt = p("emojiButton");
class Te extends c {
  constructor({ emoji: e, lazyLoader: t, category: o }) {
    super({ template: Rt, classes: Mt }), this.emoji = e, this.lazyLoader = t, this.category = o;
  }
  initialize() {
    this.uiEvents = [
      c.uiEvent("focus", this.handleFocus)
    ], super.initialize();
  }
  handleFocus() {
    this.category && this.events.emit("focus:change", this.category);
  }
  activateFocus(e) {
    this.el.tabIndex = 0, e && this.el.focus();
  }
  deactivateFocus() {
    this.el.tabIndex = -1;
  }
  renderSync() {
    return super.renderSync({
      emoji: this.emoji,
      emojiContent: this.renderer.doRender(this.emoji, this.lazyLoader)
    });
  }
}
class Vt {
  constructor(e, t, o = 0, i = 0, r = !1) {
    this.events = new le(), this.keyHandlers = {
      ArrowLeft: this.focusPrevious.bind(this),
      ArrowRight: this.focusNext.bind(this),
      ArrowUp: this.focusUp.bind(this),
      ArrowDown: this.focusDown.bind(this)
    }, this.rowCount = Math.ceil(t / e), this.columnCount = e, this.focusedRow = o, this.focusedColumn = i, this.emojiCount = t, this.wrap = r, this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  destroy() {
    this.events.removeAll();
  }
  on(e, t) {
    this.events.on(e, t);
  }
  handleKeyDown(e) {
    e.key in this.keyHandlers && (e.preventDefault(), this.keyHandlers[e.key]());
  }
  setCell(e, t, o = !0) {
    const i = this.getIndex();
    this.focusedRow = e, t !== void 0 && (this.focusedColumn = Math.min(this.columnCount, t)), (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) && (this.focusedRow = this.rowCount - 1, this.focusedColumn = this.emojiCount % this.columnCount - 1), this.events.emit("focus:change", { from: i, to: this.getIndex(), performFocus: o });
  }
  setFocusedIndex(e, t = !0) {
    const o = Math.floor(e / this.columnCount), i = e % this.columnCount;
    this.setCell(o, i, t);
  }
  focusNext() {
    this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1 ? this.setCell(this.focusedRow, this.focusedColumn + 1) : this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, 0) : this.wrap ? this.setCell(0, 0) : this.events.emit("focus:overflow", 0);
  }
  focusPrevious() {
    this.focusedColumn > 0 ? this.setCell(this.focusedRow, this.focusedColumn - 1) : this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.columnCount - 1) : this.wrap ? this.setCell(this.rowCount - 1, this.columnCount - 1) : this.events.emit("focus:underflow", this.columnCount - 1);
  }
  focusUp() {
    this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.focusedColumn) : this.events.emit("focus:underflow", this.focusedColumn);
  }
  focusDown() {
    this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, this.focusedColumn) : this.events.emit("focus:overflow", this.focusedColumn);
  }
  focusToIndex(e) {
    this.setCell(Math.floor(e / this.columnCount), e % this.columnCount);
  }
  getIndex() {
    return this.focusedRow * this.columnCount + this.focusedColumn;
  }
  getCell() {
    return { row: this.focusedRow, column: this.focusedColumn };
  }
  getRowCount() {
    return this.rowCount;
  }
}
const Dt = new u(({ classes: s }) => `
  <div class="${s.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`), Bt = p("emojiContainer");
class $ extends c {
  constructor({ emojis: e, showVariants: t, preview: o = !0, lazyLoader: i, category: r, fullHeight: a = !1 }) {
    super({ template: Dt, classes: Bt }), this.fullHeight = !1, this.showVariants = t, this.lazyLoader = i, this.preview = o, this.emojis = e, this.category = r, this.fullHeight = a, this.setFocus = this.setFocus.bind(this), this.triggerNextCategory = this.triggerNextCategory.bind(this), this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this);
  }
  initialize() {
    this.grid = new Vt(this.options.emojisPerRow, this.emojiCount, 0, 0, !this.category), this.grid.on("focus:change", this.setFocus), this.grid.on("focus:overflow", this.triggerNextCategory), this.grid.on("focus:underflow", this.triggerPreviousCategory), this.uiEvents = [
      c.uiEvent("click", this.selectEmoji),
      c.uiEvent("keydown", this.grid.handleKeyDown)
    ], this.preview && this.uiEvents.push(
      c.uiEvent("mouseover", this.showPreview),
      c.uiEvent("mouseout", this.hidePreview),
      c.uiEvent("focus", this.showPreview, { capture: !0 }),
      c.uiEvent("blur", this.hidePreview, { capture: !0 })
    ), super.initialize();
  }
  setFocusedView(e, t) {
    if (!!e)
      if (typeof e == "string") {
        const o = this.emojis.findIndex((i) => i.emoji === e);
        this.grid.setFocusedIndex(o, !1), setTimeout(() => {
          var n, l, m, d;
          const i = this.emojiViews[o].el;
          i.scrollIntoView();
          const r = (n = i.parentElement) == null ? void 0 : n.previousElementSibling, a = (m = (l = i.parentElement) == null ? void 0 : l.parentElement) == null ? void 0 : m.parentElement;
          a.scrollTop -= (d = r == null ? void 0 : r.offsetHeight) != null ? d : 0;
        });
      } else
        e.row === "first" || e.row === 0 ? this.grid.setCell(0, e.offset, t) : e.row === "last" && this.grid.setCell(this.grid.getRowCount() - 1, e.offset, t);
  }
  setActive(e, t, o) {
    var i;
    e ? this.setFocusedView(t, o) : (i = this.emojiViews[this.grid.getIndex()]) == null || i.deactivateFocus();
  }
  renderSync() {
    return this.emojiViews = this.emojis.map(
      (e) => this.viewFactory.create(Te, {
        emoji: e,
        category: this.category,
        lazyLoader: this.lazyLoader,
        renderer: this.renderer
      })
    ), this.emojiElements = this.emojiViews.map((e) => e.renderSync()), super.renderSync({
      emojis: this.emojiElements,
      i18n: this.i18n
    });
  }
  destroy() {
    super.destroy(), this.emojiViews.forEach((e) => e.destroy()), this.grid.destroy();
  }
  triggerPreviousCategory(e) {
    this.events.emit("category:previous", e);
  }
  triggerNextCategory(e) {
    this.category && this.events.emit("category:next", e);
  }
  setFocus({ from: e, to: t, performFocus: o }) {
    var i, r;
    (i = this.emojiViews[e]) == null || i.deactivateFocus(), (r = this.emojiViews[t]) == null || r.activateFocus(o);
  }
  selectEmoji(e) {
    e.stopPropagation();
    const t = q(e, this.emojis);
    t && this.events.emit("emoji:select", {
      emoji: t,
      showVariants: this.showVariants
    });
  }
  showPreview(e) {
    const o = e.target.closest("button"), i = o == null ? void 0 : o.firstElementChild, r = q(e, this.emojis);
    r && this.events.emit("preview:show", r, i == null ? void 0 : i.cloneNode(!0));
  }
  hidePreview(e) {
    q(e, this.emojis) && this.events.emit("preview:hide");
  }
  get emojiCount() {
    return this.emojis.length;
  }
}
const Nt = new u(({ classes: s, category: e, pickerId: t, icon: o, i18n: i }) => `
  <section class="${s.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${s.categoryName}">
      <i data-icon="${o}"></i>
      ${i.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
class Ot extends he {
  constructor({ category: e, showVariants: t, lazyLoader: o, emojiVersion: i }) {
    super({ category: e, showVariants: t, lazyLoader: o, template: Nt }), this.showVariants = t, this.lazyLoader = o, this.emojiVersion = i;
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    await this.emojiDataPromise;
    const e = await this.emojiData.getEmojis(this.category, this.emojiVersion);
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: e,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: O[this.category.key]
    });
  }
}
class Ht extends $ {
  constructor({ category: e, emojis: t, preview: o = !0, lazyLoader: i }) {
    super({ category: e, emojis: t, showVariants: !1, preview: o, lazyLoader: i });
  }
  async addOrUpdate(e) {
    const t = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
    t && (this.el.removeChild(t), this.emojis = this.emojis.filter((i) => i !== e));
    const o = this.viewFactory.create(Te, { emoji: e });
    if (this.el.insertBefore(o.renderSync(), this.el.firstChild), this.emojis = [
      e,
      ...this.emojis.filter((i) => i !== e)
    ], this.emojis.length > this.options.maxRecents) {
      this.emojis = this.emojis.slice(0, this.options.maxRecents);
      const i = this.el.childElementCount - this.options.maxRecents;
      for (let r = 0; r < i; r++)
        this.el.lastElementChild && this.el.removeChild(this.el.lastElementChild);
    }
  }
}
const Kt = new u(({ emojiCount: s, classes: e, category: t, pickerId: o, icon: i, i18n: r }) => `
  <section class="${e.emojiCategory}" role="tabpanel" aria-labelledby="${o}-category-${t.key}">
    <h3 data-category="${t.key}" class="${e.categoryName}">
      <i data-icon="${i}"></i>
      ${r.get(`categories.${t.key}`, t.message || t.key)}
    </h3>
    <div data-empty="${s === 0}" class="${e.recentEmojis}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
    <div class="${e.noRecents}">
      ${r.get("recents.none")}
    </div>
  </section>
`, { mode: "async" });
class Ut extends he {
  constructor({ category: e, lazyLoader: t, provider: o }) {
    super({ category: e, showVariants: !1, lazyLoader: t, template: Kt }), this.provider = o;
  }
  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: c.byClass(ie.recentEmojis)
    }, this.appEvents = {
      "recent:add": this.addRecent
    }, super.initialize();
  }
  async addRecent(e) {
    await this.emojiContainer.addOrUpdate(e), this.ui.recents.dataset.empty = "false";
  }
  async render() {
    var t;
    const e = (t = this.provider) == null ? void 0 : t.getRecents(this.options.maxRecents);
    return this.emojiContainer = this.viewFactory.create(Ht, {
      emojis: e,
      showVariants: !1,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), await super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: O[this.category.key]
    }), this.el;
  }
}
const qt = new u(({ classes: s, category: e, pickerId: t, icon: o, i18n: i }) => `
  <section class="${s.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${s.categoryName}">
      <i data-icon="${o}"></i>
      ${i.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
class Wt extends he {
  constructor({ category: e, lazyLoader: t }) {
    super({ template: qt, showVariants: !1, lazyLoader: t, category: e });
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.customEmojis.length,
      icon: O[this.category.key]
    });
  }
}
class Re {
  constructor() {
    this.elements = /* @__PURE__ */ new Map();
  }
  lazyLoad(e, t) {
    return this.elements.set(e, t), e;
  }
  observe(e) {
    if (window.IntersectionObserver) {
      const t = new IntersectionObserver(
        (o) => {
          o.filter((i) => i.intersectionRatio > 0).map((i) => i.target).forEach((i) => {
            const r = this.elements.get(i);
            r == null || r(), t.unobserve(i);
          });
        },
        {
          root: e
        }
      );
      this.elements.forEach((o, i) => {
        t.observe(i);
      });
    } else
      this.elements.forEach((t) => {
        t();
      });
  }
}
const ye = p("emojiArea"), Gt = new u(({ classes: s }) => `
  <div class="${s.emojiArea}">
    <div data-placeholder="emojis"></div>
  </div>
`, { mode: "async" }), Jt = {
  recents: Ut,
  custom: Wt
};
function Zt(s) {
  return Jt[s.key] || Ot;
}
function Yt(s) {
  return !s || s === "button" ? {
    row: "first",
    offset: 0
  } : s;
}
class Qt extends c {
  constructor({ categoryTabs: e, categories: t, emojiVersion: o }) {
    super({ template: Gt, classes: ye }), this.selectedCategory = 0, this.scrollListenerState = "active", this.lazyLoader = new Re(), this.categoryTabs = e, this.categories = t, this.emojiVersion = o, this.handleScroll = He(this.handleScroll.bind(this), 100);
  }
  initialize() {
    this.appEvents = {
      "category:select": this.handleCategorySelect,
      "category:previous": this.focusPreviousCategory,
      "category:next": this.focusNextCategory,
      "focus:change": this.updateFocusedCategory
    }, this.uiElements = { emojis: c.byClass(ye.emojiArea) }, this.uiEvents = [c.uiEvent("scroll", this.handleScroll)], super.initialize();
  }
  get focusableEmoji() {
    return this.el.querySelector('[tabindex="0"]');
  }
  async render() {
    this.emojiCategories = this.categories.map(this.createCategory, this);
    const e = {};
    return this.categories.forEach((t, o) => {
      e[`emojis-${t.key}`] = this.emojiCategories[o];
    }), await super.render({
      emojis: await Promise.all(this.emojiCategories.map((t) => t.render()))
    }), this.lazyLoader.observe(this.el), this.el;
  }
  destroy() {
    super.destroy(), this.emojiCategories.forEach((e) => {
      var t;
      (t = this.observer) == null || t.unobserve(e.el), e.destroy();
    });
  }
  handleCategorySelect(e, t) {
    this.el.style.overflow = "hidden", this.selectCategory(e, t), this.el.style.overflow = "auto";
  }
  createCategory(e) {
    const t = Zt(e);
    return this.viewFactory.create(t, {
      category: e,
      showVariants: !0,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion,
      provider: this.options.recentsProvider
    });
  }
  determineInitialCategory() {
    var e;
    return this.options.initialCategory && this.categories.find((t) => t.key === this.options.initialCategory) ? this.options.initialCategory : (e = this.categories.find((t) => t.key !== "recents")) == null ? void 0 : e.key;
  }
  determineFocusTarget(e) {
    const t = this.emojiCategories.find((o) => o.category.key === e);
    return this.options.initialEmoji && (t == null ? void 0 : t.el.querySelector(`[data-emoji="${this.options.initialEmoji}"]`)) ? this.options.initialEmoji : "button";
  }
  reset(e = !0) {
    this.events.emit("preview:hide");
    const t = this.determineInitialCategory();
    t && (this.selectCategory(t, {
      focus: this.determineFocusTarget(t),
      performFocus: e,
      scroll: "jump"
    }), this.selectedCategory = this.getCategoryIndex(t));
  }
  getCategoryIndex(e) {
    return this.categories.findIndex((t) => t.key === e);
  }
  focusPreviousCategory(e) {
    this.selectedCategory > 0 && this.focusCategory(this.selectedCategory - 1, { row: "last", offset: e != null ? e : this.options.emojisPerRow });
  }
  focusNextCategory(e) {
    this.selectedCategory < this.categories.length - 1 && this.focusCategory(this.selectedCategory + 1, { row: "first", offset: e != null ? e : 0 });
  }
  focusCategory(e, t) {
    this.selectCategory(e, {
      focus: t,
      performFocus: !0
    });
  }
  async selectCategory(e, t = {}) {
    var l;
    this.scrollListenerState = "suspend";
    const { focus: o, performFocus: i, scroll: r } = {
      performFocus: !1,
      ...t
    };
    this.emojiCategories[this.selectedCategory].setActive(!1);
    const a = this.selectedCategory = typeof e == "number" ? e : this.getCategoryIndex(e);
    (l = this.categoryTabs) == null || l.setActiveTab(this.selectedCategory, {
      performFocus: i,
      scroll: o === "button"
    });
    const n = this.emojiCategories[a].el.offsetTop;
    this.emojiCategories[a].setActive(!0, Yt(o), o !== "button" && i), r && (this.el.scrollTop = n), this.scrollListenerState = "resume";
  }
  updateFocusedCategory(e) {
    var t;
    this.categories[this.selectedCategory].key !== e && (this.scrollListenerState = "suspend", this.selectedCategory = this.getCategoryIndex(e), (t = this.categoryTabs) == null || t.setActiveTab(this.selectedCategory, {
      changeFocusable: !1,
      performFocus: !1
    }), this.scrollListenerState = "resume");
  }
  handleScroll() {
    if (this.scrollListenerState === "suspend" || !this.categoryTabs)
      return;
    if (this.scrollListenerState === "resume") {
      this.scrollListenerState = "active";
      return;
    }
    const e = this.el.scrollTop, t = this.el.scrollHeight - this.el.offsetHeight, o = this.emojiCategories.findIndex((r, a) => {
      var n;
      return e < ((n = this.emojiCategories[a + 1]) == null ? void 0 : n.el.offsetTop);
    }), i = {
      changeFocusable: !1,
      performFocus: !1,
      scroll: !1
    };
    e === 0 ? this.categoryTabs.setActiveTab(0, i) : Math.floor(e) === Math.floor(t) || o < 0 ? this.categoryTabs.setActiveTab(this.categories.length - 1, i) : this.categoryTabs.setActiveTab(o, i);
  }
}
const Xt = new u(({ classList: s, classes: e, icon: t, message: o }) => `
<div class="${s}" role="alert">
  <div class="${e.iconContainer}"><i data-size="10x" data-icon="${t}"></i></div>
  <h3 class="${e.title}">${o}</h3>
</div>
`), fe = p("error", "iconContainer", "title");
class re extends c {
  constructor({ message: e, icon: t = "warning", template: o = Xt, className: i }) {
    super({ template: o, classes: fe }), this.message = e, this.icon = t, this.className = i;
  }
  renderSync() {
    const e = [fe.error, this.className].join(" ").trim();
    return super.renderSync({ message: this.message, icon: this.icon, classList: e });
  }
}
const es = new u(({ classList: s, classes: e, icon: t, i18n: o, message: i }) => `
  <div class="${s}" role="alert">
    <div class="${e.icon}"><i data-size="10x" data-icon="${t}"></i></div>
    <h3 class="${e.title}">${i}</h3>
    <button type="button">${o.get("retry")}</button>
  </div>
`), ts = p("dataError");
class ss extends re {
  constructor({ message: e }) {
    super({ message: e, template: es, className: ts.dataError });
  }
  initialize() {
    this.uiElements = { retryButton: "button" }, this.uiEvents = [c.childEvent("retryButton", "click", this.onRetry)], super.initialize();
  }
  async onRetry() {
    this.emojiData ? await this.emojiData.delete() : await this.options.dataStore.deleteDatabase(this.options.locale), this.events.emit("reinitialize");
    const e = await ce(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e);
  }
}
const j = p(
  "preview",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag"
), os = new u(({ classes: s, tag: e }) => `
  <li class="${s.tag}">${e}</li>
`), is = new u(({ classes: s }) => `
  <div class="${s.preview}">
    <div class="${s.previewEmoji}"></div>
    <div class="${s.previewName}"></div>
    <ul class="${s.tagList}"></ul>
  </div>
`);
class rs extends c {
  constructor() {
    super({ template: is, classes: j });
  }
  initialize() {
    this.uiElements = {
      emoji: c.byClass(j.previewEmoji),
      name: c.byClass(j.previewName),
      tagList: c.byClass(j.tagList)
    }, this.appEvents = {
      "preview:show": this.showPreview,
      "preview:hide": this.hidePreview
    }, super.initialize();
  }
  showPreview(e, t) {
    if (w(this.ui.emoji, t), this.ui.name.textContent = e.label, e.tags) {
      this.ui.tagList.style.display = "flex";
      const o = e.tags.map((i) => os.renderSync({ tag: i, classes: j }));
      w(this.ui.tagList, ...o);
    }
  }
  hidePreview() {
    V(this.ui.emoji), V(this.ui.name), V(this.ui.tagList);
  }
}
const as = new u(({ classes: s, i18n: e }) => `
  <button title="${e.get("search.clear")}" class="${s.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`), ns = new u(({ classes: s, i18n: e }) => `
<div class="${s.searchContainer}">
  <input class="${s.searchField}" placeholder="${e.get("search")}">
  <span class="${s.searchAccessory}"></span>
</div>
`, { mode: "async" }), _ = p(
  "searchContainer",
  "searchField",
  "clearButton",
  "searchAccessory",
  "clearSearchButton",
  "notFound"
);
class cs extends c {
  constructor({ categories: e, emojiVersion: t }) {
    super({ template: ns, classes: _ }), this.categories = e.filter((o) => o.key !== "recents"), this.emojiVersion = t, this.search = Ke(this.search.bind(this), 100);
  }
  initialize() {
    this.uiElements = {
      searchField: c.byClass(_.searchField),
      searchAccessory: c.byClass(_.searchAccessory)
    }, this.uiEvents = [
      c.childEvent("searchField", "keydown", this.onKeyDown),
      c.childEvent("searchField", "input", this.onSearchInput)
    ], super.initialize();
  }
  async render() {
    return await super.render(), this.searchIcon = Pe("search"), this.notFoundMessage = this.viewFactory.create(re, {
      message: this.i18n.get("search.notFound"),
      className: _.notFound,
      icon: "sad"
    }), this.notFoundMessage.renderSync(), this.errorMessage = this.viewFactory.create(re, { message: this.i18n.get("search.error") }), this.errorMessage.renderSync(), this.clearSearchButton = as.render({
      classes: _,
      i18n: this.i18n
    }), this.clearSearchButton.addEventListener("click", (e) => this.onClearSearch(e)), this.searchField = this.ui.searchField, this.showSearchIcon(), this.el;
  }
  showSearchIcon() {
    this.showSearchAccessory(this.searchIcon);
  }
  showClearSearchButton() {
    this.showSearchAccessory(this.clearSearchButton);
  }
  showSearchAccessory(e) {
    w(this.ui.searchAccessory, e);
  }
  clear() {
    this.searchField.value = "", this.showSearchIcon();
  }
  focus() {
    this.searchField.focus();
  }
  onClearSearch(e) {
    var t;
    e.stopPropagation(), this.searchField.value = "", (t = this.resultsContainer) == null || t.destroy(), this.resultsContainer = null, this.showSearchIcon(), this.events.emit("content:show"), this.searchField.focus();
  }
  handleResultsKeydown(e) {
    this.resultsContainer && e.key === "Escape" && this.onClearSearch(e);
  }
  onKeyDown(e) {
    var t;
    e.key === "Escape" && this.searchField.value ? this.onClearSearch(e) : (e.key === "Enter" || e.key === "ArrowDown") && this.resultsContainer && (e.preventDefault(), (t = this.resultsContainer.el.querySelector('[tabindex="0"]')) == null || t.focus());
  }
  onSearchInput(e) {
    this.searchField.value ? (this.showClearSearchButton(), this.search()) : this.onClearSearch(e);
  }
  async search() {
    var e;
    if (!!this.searchField.value)
      try {
        const t = await this.emojiData.searchEmojis(
          this.searchField.value,
          this.customEmojis,
          this.emojiVersion,
          this.categories
        );
        if (this.events.emit("preview:hide"), t.length) {
          const o = new Re();
          this.resultsContainer = this.viewFactory.create($, {
            emojis: t,
            fullHeight: !0,
            showVariants: !0,
            lazyLoader: o
          }), this.resultsContainer.renderSync(), (e = this.resultsContainer) != null && e.el && (o.observe(this.resultsContainer.el), this.resultsContainer.setActive(!0, { row: 0, offset: 0 }, !1), this.resultsContainer.el.addEventListener("keydown", (i) => this.handleResultsKeydown(i)), this.events.emit("content:show", this.resultsContainer));
        } else
          this.events.emit("content:show", this.notFoundMessage);
      } catch {
        this.events.emit("content:show", this.errorMessage);
      }
  }
}
const ls = new u(({ classes: s }) => `
  <div class="${s.variantOverlay}">
    <div class="${s.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`), ve = p(
  "variantOverlay",
  "variantPopup"
), J = {
  easing: "ease-in-out",
  duration: 250,
  fill: "both"
}, we = {
  opacity: [0, 1]
}, be = {
  opacity: [0, 1],
  transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"]
};
class hs extends c {
  constructor({ emoji: e, parent: t }) {
    super({ template: ls, classes: ve, parent: t }), this.focusedEmojiIndex = 0, this.focusTrap = new st(), this.animateShow = () => Promise.all([
      I(this.el, we, J, this.options),
      I(this.ui.popup, be, J, this.options)
    ]), this.emoji = e;
  }
  initialize() {
    this.uiElements = {
      popup: c.byClass(ve.variantPopup)
    }, this.uiEvents = [
      c.uiEvent("click", this.handleClick),
      c.uiEvent("keydown", this.handleKeydown)
    ], super.initialize();
  }
  animateHide() {
    const e = { ...J, direction: "reverse" };
    return Promise.all([
      I(this.el, we, e, this.options),
      I(this.ui.popup, be, e, this.options)
    ]);
  }
  async hide() {
    await this.animateHide(), this.events.emit("variantPopup:hide");
  }
  handleKeydown(e) {
    e.key === "Escape" && (this.hide(), e.stopPropagation());
  }
  handleClick(e) {
    this.ui.popup.contains(e.target) || this.hide();
  }
  getEmoji(e) {
    return this.renderedEmojis[e];
  }
  setFocusedEmoji(e) {
    const t = this.getEmoji(this.focusedEmojiIndex);
    t.tabIndex = -1, this.focusedEmojiIndex = e;
    const o = this.getEmoji(this.focusedEmojiIndex);
    o.tabIndex = 0, o.focus();
  }
  destroy() {
    this.emojiContainer.destroy(), this.focusTrap.deactivate(), super.destroy();
  }
  renderSync() {
    const e = {
      ...this.emoji,
      skins: null
    }, t = (this.emoji.skins || []).map((i) => ({
      ...i,
      label: this.emoji.label,
      tags: this.emoji.tags
    })), o = [e, ...t];
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: o,
      preview: !1
    }), super.renderSync({ emojis: this.emojiContainer }), o.length < this.options.emojisPerRow && this.el.style.setProperty("--emojis-per-row", o.length.toString()), this.el;
  }
  activate() {
    this.emojiContainer.setActive(!0, { row: 0, offset: 0 }, !0), this.focusTrap.activate(this.el);
  }
}
const ds = new u(({ classes: s, i18n: e, category: t, pickerId: o, icon: i }) => `
<li class="${s.categoryTab}">
  <button
    aria-selected="false"
    role="tab"
    class="${s.categoryButton}"
    tabindex="-1"
    title="${e.get(`categories.${t.key}`, t.message || t.key)}"
    type="button"
    data-category="${t.key}"
    id="${o}-category-${t.key}"
  >
    <i data-icon="${i}"></i>
</li>
`), Z = p(
  "categoryTab",
  "categoryTabActive",
  "categoryButton"
);
class ms extends c {
  constructor({ category: e, icon: t }) {
    super({ template: ds, classes: Z }), this.isActive = !1, this.category = e, this.icon = t;
  }
  initialize() {
    this.uiElements = {
      button: c.byClass(Z.categoryButton)
    }, this.uiEvents = [
      c.childEvent("button", "click", this.selectCategory),
      c.childEvent("button", "focus", this.selectCategory)
    ], super.initialize();
  }
  renderSync() {
    return super.renderSync({
      category: this.category,
      icon: this.icon
    }), this.ui.button.ariaSelected = "false", this.el;
  }
  setActive(e, t = {}) {
    const { changeFocusable: o, performFocus: i, scroll: r } = {
      changeFocusable: !0,
      performFocus: !0,
      scroll: !0,
      ...t
    };
    this.el.classList.toggle(Z.categoryTabActive, e), o && (this.ui.button.tabIndex = e ? 0 : -1, this.ui.button.ariaSelected = e.toString()), e && i && (this.ui.button.focus(), r && this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !1 })), this.isActive = e;
  }
  selectCategory() {
    this.isActive || this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !0 });
  }
}
const us = new u(({ classes: s }) => `
  <div class="${s.categoryButtonsContainer}">
    <ul role="tablist" class="${s.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`), ps = p("categoryButtons", "categoryButtonsContainer");
class gs extends c {
  constructor({ categories: e }) {
    super({ template: us, classes: ps }), this.activeCategoryIndex = 0, this.categories = e;
  }
  initialize() {
    this.keyBindings = {
      ArrowLeft: this.stepSelectedTab(-1),
      ArrowRight: this.stepSelectedTab(1)
    }, this.uiEvents = [
      c.uiEvent("scroll", this.checkOverflow)
    ], super.initialize();
  }
  checkOverflow() {
    const e = Math.abs(this.el.scrollLeft - (this.el.scrollWidth - this.el.offsetWidth)) > 1, t = this.el.scrollLeft > 0;
    this.el.className = "categoryButtonsContainer", t && e ? this.el.classList.add("has-overflow-both") : t ? this.el.classList.add("has-overflow-left") : e && this.el.classList.add("has-overflow-right");
  }
  renderSync() {
    return this.tabViews = this.categories.map((e) => this.viewFactory.create(ms, { category: e, icon: O[e.key] })), super.renderSync({
      tabs: this.tabViews.map((e) => e.renderSync())
    }), this.el;
  }
  get currentCategory() {
    return this.categories[this.activeCategoryIndex];
  }
  get currentTabView() {
    return this.tabViews[this.activeCategoryIndex];
  }
  setActiveTab(e, t = {}) {
    this.checkOverflow();
    const o = this.currentTabView, i = this.tabViews[e];
    o.setActive(!1, t), i.setActive(!0, t), this.activeCategoryIndex = e;
  }
  getTargetCategory(e) {
    return e < 0 ? this.categories.length - 1 : e >= this.categories.length ? 0 : e;
  }
  stepSelectedTab(e) {
    return () => {
      const t = this.activeCategoryIndex + e;
      this.setActiveTab(this.getTargetCategory(t), {
        changeFocusable: !0,
        performFocus: !0
      });
    };
  }
}
const ys = [
  { version: 15, emoji: String.fromCodePoint(129768) },
  { version: 14, emoji: String.fromCodePoint(128733) },
  { version: 13, emoji: String.fromCodePoint(129729) },
  { version: 12, emoji: String.fromCodePoint(129449) },
  { version: 11, emoji: String.fromCodePoint(129463) },
  { version: 5, emoji: String.fromCodePoint(129322) },
  { version: 4, emoji: String.fromCodePoint(9877) },
  { version: 3, emoji: String.fromCodePoint(129314) },
  { version: 2, emoji: String.fromCodePoint(128488) },
  { version: 1, emoji: String.fromCodePoint(128512) }
];
function fs() {
  var e;
  const s = ys.find((t) => vs(t.emoji));
  return (e = s == null ? void 0 : s.version) != null ? e : 1;
}
function vs(s) {
  const e = document.createElement("canvas").getContext("2d");
  if (e)
    return e.textBaseline = "top", e.font = "32px Arial", e.fillText(s, 0, 0), e.getImageData(16, 16, 1, 1).data[0] !== 0;
}
function Y(s, e) {
  return Array.from({ length: s }, () => e).join("");
}
function ws({ showHeader: s, classes: e }) {
  return s ? `
    <header class="${e.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  ` : "";
}
function bs(s) {
  const { classes: e, theme: t, className: o = "" } = s;
  return `
    <div class="picmo__picker ${e.picker} ${t} ${o}">
      ${ws(s)}
      <div class="${e.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
}
function Cs(s) {
  const { emojiCount: e, classes: t, theme: o, className: i, categoryCount: r } = s, a = ({ showSearch: d, classes: h }) => d ? `
    <div class="${h.searchSkeleton}">
      <div class="${h.searchInput} ${h.placeholder}"></div>
    </div>
  ` : "", n = ({ showCategoryTabs: d, classes: h }) => d ? `
    <div class="${h.categoryTabsSkeleton}">
      ${Y(r, `<div class="${h.placeholder} ${h.categoryTab}"></div>`)}
    </div>
  ` : "", l = ({ showHeader: d, classes: h }) => d ? `
    <header class="${h.headerSkeleton}">
      ${a(s)}
      ${n(s)}
    </header>
  ` : "", m = ({ showPreview: d, classes: h }) => d ? `
    <div class="${h.previewSkeleton}">
      <div class="${h.placeholder} ${h.previewEmoji}"></div>
      <div class="${h.placeholder} ${h.previewName}"></div>
      <ul class="${h.tagList}">
        ${Y(3, `<li class="${h.placeholder} ${h.tag}"></li>`)}
      </ul>
    </div>
  ` : "";
  return `
    <div class="picmo__picker ${t.skeleton} ${t.picker} ${o} ${i}">
      ${l(s)}
      <div class="${t.contentSkeleton}">
        <div class="${t.placeholder} ${t.categoryName}"></div>
        <div class="${t.emojiGrid}">
          ${Y(e, `<div class="${t.placeholder} ${t.emoji}"></div>`)}
        </div>
      </div>
      ${m(s)}
    </div>
  `;
}
const js = new u((s) => s.isLoaded ? bs(s) : Cs(s)), T = p(
  "picker",
  "skeleton",
  "placeholder",
  "searchSkeleton",
  "searchInput",
  "categoryTabsSkeleton",
  "headerSkeleton",
  "categoryTab",
  "contentSkeleton",
  "categoryName",
  "emojiGrid",
  "emoji",
  "previewSkeleton",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag",
  "overlay",
  "content",
  "fullHeight",
  "pluginContainer",
  "header"
), R = {
  emojisPerRow: "--emojis-per-row",
  visibleRows: "--row-count",
  emojiSize: "--emoji-size"
};
class _s extends c {
  constructor() {
    super({ template: js, classes: T }), this.pickerReady = !1, this.externalEvents = new Tt(), this.updaters = {
      styleProperty: (e) => (t) => this.el.style.setProperty(R[e], t.toString()),
      theme: (e) => {
        const t = this.options.theme, o = this.el.closest(`.${t}`);
        this.el.classList.remove(t), o == null || o.classList.remove(t), this.el.classList.add(e), o == null || o.classList.add(e);
      },
      className: (e) => {
        this.options.className && this.el.classList.remove(this.options.className), this.el.classList.add(e);
      },
      emojisPerRow: this.updateStyleProperty.bind(this, "emojisPerRow"),
      emojiSize: this.updateStyleProperty.bind(this, "emojiSize"),
      visibleRows: this.updateStyleProperty.bind(this, "visibleRows")
    };
  }
  initialize() {
    this.uiElements = {
      pickerContent: c.byClass(T.content),
      header: c.byClass(T.header)
    }, this.uiEvents = [
      c.uiEvent("keydown", this.handleKeyDown)
    ], this.appEvents = {
      error: this.onError,
      reinitialize: this.reinitialize,
      "data:ready": this.onDataReady,
      "content:show": this.showContent,
      "variantPopup:hide": this.hideVariantPopup,
      "emoji:select": this.selectEmoji
    }, super.initialize(), this.options.recentsProvider;
  }
  destroy() {
    var e, t;
    super.destroy(), (e = this.search) == null || e.destroy(), this.emojiArea.destroy(), (t = this.categoryTabs) == null || t.destroy(), this.events.removeAll(), this.externalEvents.removeAll();
  }
  clearRecents() {
    this.options.recentsProvider.clear();
  }
  addEventListener(e, t) {
    this.externalEvents.on(e, t);
  }
  removeEventListener(e, t) {
    this.externalEvents.off(e, t);
  }
  initializePickerView() {
    this.pickerReady && (this.showContent(), this.emojiArea.reset(!1));
  }
  handleKeyDown(e) {
    const t = e.ctrlKey || e.metaKey;
    e.key === "s" && t && this.search && (e.preventDefault(), this.search.focus());
  }
  buildChildViews() {
    return this.options.showPreview && (this.preview = this.viewFactory.create(rs)), this.options.showSearch && (this.search = this.viewFactory.create(cs, {
      categories: this.categories,
      emojiVersion: this.emojiVersion
    })), this.options.showCategoryTabs && (this.categoryTabs = this.viewFactory.create(gs, {
      categories: this.categories
    })), this.currentView = this.emojiArea = this.viewFactory.create(Qt, {
      categoryTabs: this.categoryTabs,
      categories: this.categories,
      emojiVersion: this.emojiVersion
    }), [this.preview, this.search, this.emojiArea, this.categoryTabs];
  }
  setStyleProperties() {
    this.options.showSearch || this.el.style.setProperty("--search-height-full", "0px"), this.options.showCategoryTabs || (this.el.style.setProperty("--category-tabs-height", "0px"), this.el.style.setProperty("--category-tabs-offset", "0px")), this.options.showPreview || this.el.style.setProperty("--emoji-preview-height-full", "0px"), Object.keys(R).forEach((e) => {
      this.options[e] && this.el.style.setProperty(R[e], this.options[e].toString());
    });
  }
  updateStyleProperty(e, t) {
    this.el.style.setProperty(R[e], t.toString());
  }
  reinitialize() {
    this.renderSync();
  }
  onError(e) {
    const t = this.viewFactory.createWithOptions({ data: !1 }, ss, { message: this.i18n.get("error.load") }), o = this.el.offsetHeight || 375;
    throw this.el.style.height = `${o}px`, w(this.el, t.renderSync()), e;
  }
  async onDataReady(e) {
    const t = this.el;
    try {
      e ? this.emojiData = e : await this.emojiDataPromise, this.options.emojiVersion === "auto" ? this.emojiVersion = fs() || parseFloat(Ve) : this.emojiVersion = this.options.emojiVersion, this.categories = await this.emojiData.getCategories(this.options);
      const [o, i, r, a] = this.buildChildViews();
      await super.render({
        isLoaded: !0,
        search: i,
        categoryTabs: a,
        emojiArea: r,
        preview: o,
        showHeader: Boolean(this.search || this.categoryTabs),
        theme: this.options.theme,
        className: this.options.className
      }), this.el.style.setProperty("--category-count", this.categories.length.toString()), this.pickerReady = !0, t.replaceWith(this.el), this.setStyleProperties(), this.initializePickerView(), this.setInitialFocus(), this.externalEvents.emit("data:ready");
    } catch (o) {
      this.events.emit("error", o);
    }
  }
  renderSync() {
    var t;
    let e = ((t = this.options.categories) == null ? void 0 : t.length) || 10;
    if (this.options.showRecents && (e += 1), super.renderSync({
      isLoaded: !1,
      theme: this.options.theme,
      className: this.options.className,
      showSearch: this.options.showSearch,
      showPreview: this.options.showPreview,
      showCategoryTabs: this.options.showCategoryTabs,
      showHeader: this.options.showSearch || this.options.showCategoryTabs,
      emojiCount: this.options.emojisPerRow * this.options.visibleRows,
      categoryCount: e
    }), this.el.style.setProperty("--category-count", e.toString()), !this.options.rootElement)
      throw new Error("Picker must be given a root element via the rootElement option");
    return w(this.options.rootElement, this.el), this.setStyleProperties(), this.pickerReady && this.initializePickerView(), this.el;
  }
  getInitialFocusTarget() {
    if (typeof this.options.autoFocus < "u")
      switch (this.options.autoFocus) {
        case "emojis":
          return this.emojiArea.focusableEmoji;
        case "search":
          return this.search;
        case "auto":
          return this.search || this.emojiArea.focusableEmoji;
        default:
          return null;
      }
    if (this.options.autoFocusSearch === !0)
      return console.warn("options.autoFocusSearch is deprecated, please use options.focusTarget instead"), this.search;
  }
  setInitialFocus() {
    var e;
    !this.pickerReady || (e = this.getInitialFocusTarget()) == null || e.focus();
  }
  reset(e = !0) {
    var t;
    this.pickerReady && (this.emojiArea.reset(e), this.showContent(this.emojiArea)), (t = this.search) == null || t.clear(), this.hideVariantPopup();
  }
  showContent(e = this.emojiArea) {
    var t, o;
    e !== this.currentView && (this.currentView !== this.emojiArea && ((t = this.currentView) == null || t.destroy()), this.ui.pickerContent.classList.toggle(T.fullHeight, e !== this.emojiArea), w(this.ui.pickerContent, e.el), this.currentView = e, e === this.emojiArea ? (this.emojiArea.reset(), this.categoryTabs && this.ui.header.appendChild(this.categoryTabs.el)) : (o = this.categoryTabs) == null || o.el.remove());
  }
  hideVariantPopup() {
    var e;
    (e = this.variantPopup) == null || e.destroy();
  }
  isPickerClick(e) {
    var r, a;
    const t = e.target, o = this.el.contains(t), i = (a = (r = this.variantPopup) == null ? void 0 : r.el) == null ? void 0 : a.contains(t);
    return o || i;
  }
  async selectEmoji({ emoji: e }) {
    var t, o;
    ((t = e.skins) == null ? void 0 : t.length) && this.options.showVariants && !this.isVariantPopupOpen ? this.showVariantPopup(e) : (await ((o = this.variantPopup) == null ? void 0 : o.animateHide()), this.events.emit("variantPopup:hide"), await this.emitEmoji(e));
  }
  get isVariantPopupOpen() {
    return this.variantPopup && !this.variantPopup.isDestroyed;
  }
  async showVariantPopup(e) {
    const t = document.activeElement;
    this.events.once("variantPopup:hide", () => {
      t == null || t.focus();
    }), this.variantPopup = this.viewFactory.create(hs, { emoji: e, parent: this.el }), this.el.appendChild(this.variantPopup.renderSync()), this.variantPopup.activate();
  }
  async emitEmoji(e) {
    this.externalEvents.emit("emoji:select", await this.renderer.doEmit(e)), this.options.recentsProvider.addOrUpdateRecent(e, this.options.maxRecents), this.events.emit("recent:add", e);
  }
  updateOptions(e) {
    Object.keys(e).forEach((t) => {
      this.updaters[t](e[t]);
    }), Object.assign(this.options, e);
  }
}
class ks {
  constructor({ events: e, i18n: t, renderer: o, emojiData: i, options: r, customEmojis: a = [], pickerId: n }) {
    this.events = e, this.i18n = t, this.renderer = o, this.emojiData = i, this.options = r, this.customEmojis = a, this.pickerId = n;
  }
  setEmojiData(e) {
    this.emojiData = Promise.resolve(e);
  }
  createWithOptions(e = {}, t, ...o) {
    const i = new t(...o);
    return i.setPickerId(this.pickerId), i.setEvents(this.events), i.setI18n(this.i18n), i.setRenderer(this.renderer), e.data !== !1 && i.setEmojiData(this.emojiData), i.setOptions(this.options), i.setCustomEmojis(this.customEmojis), i.viewFactory = this, i.initialize(), i;
  }
  create(e, ...t) {
    return this.createWithOptions({}, e, ...t);
  }
}
var L;
class xs {
  constructor(e = {}) {
    f(this, L, void 0);
    A(this, L, new Map(Object.entries(e)));
  }
  get(e, t = e) {
    return y(this, L).get(e) || t;
  }
}
L = new WeakMap();
function Es(s, e) {
  e === void 0 && (e = {});
  var t = e.insertAt;
  if (!(!s || typeof document > "u")) {
    var o = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", t === "top" && o.firstChild ? o.insertBefore(i, o.firstChild) : o.appendChild(i), i.styleSheet ? i.styleSheet.cssText = s : i.appendChild(document.createTextNode(s));
  }
}
function Ss() {
  let s = !1;
  return function(t) {
    At.injectStyles && !s && (Es(t), s = !0);
  };
}
const Fs = `.picmo__picker .picmo__icon{width:1.25em;height:1em;fill:currentColor}.picmo__icon-small{font-size:.8em}.picmo__icon-medium{font-size:1em}.picmo__icon-large{font-size:1.25em}.picmo__icon-2x{font-size:2em}.picmo__icon-3x{font-size:3em}.picmo__icon-4x{font-size:4em}.picmo__icon-5x{font-size:5em}.picmo__icon-8x{font-size:8em}.picmo__icon-10x{font-size:10em}.picmo__light,.picmo__auto{color-scheme:light;--accent-color: #4f46e5;--background-color: #f9fafb;--border-color: #cccccc;--category-name-background-color: #f9fafb;--category-name-button-color: #999999;--category-name-text-color: hsl(214, 30%, 50%);--category-tab-active-background-color: rgba(255, 255, 255, .6);--category-tab-active-color: var(--accent-color);--category-tab-color: #666;--category-tab-highlight-background-color: rgba(0, 0, 0, .15);--error-color-dark: hsl(0, 100%, 45%);--error-color: hsl(0, 100%, 40%);--focus-indicator-background-color: hsl(198, 65%, 85%);--focus-indicator-color: #333333;--hover-background-color: #c7d2fe;--placeholder-background-color: #cccccc;--search-background-color: #f9fafb;--search-focus-background-color: #ffffff;--search-icon-color: #999999;--search-placeholder-color: #71717a;--secondary-background-color: #e2e8f0;--secondary-text-color: #666666;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #000000;--variant-popup-background-color: #ffffff}.picmo__dark{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}@media (prefers-color-scheme: dark){.picmo__auto{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}}.picmo__picker .picmo__categoryButtonsContainer{overflow:auto;padding:2px 0}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-right{mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-left{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-both{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%)}.picmo__picker .picmo__categoryButtons{display:flex;flex-direction:row;gap:var(--tab-gap);margin:0;padding:0 .5em;align-items:center;height:var(--category-tabs-height);box-sizing:border-box;width:100%;justify-content:space-between;position:relative;list-style-type:none;justify-self:center;max-width:min(23.55rem,calc(var(--category-count, 1) * 2.5rem))}.picmo__picker .picmo__categoryButtons .picmo__categoryTab{display:flex;align-items:center;transition:all .1s;width:2em}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton{color:var(--category-tab-active-color);background:linear-gradient(rgba(255,255,255,.75) 0%,rgba(255,255,255,.75) 100%),linear-gradient(var(--category-tab-active-color) 0%,var(--category-tab-active-color) 100%);border:2px solid var(--category-tab-active-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton:hover{background-color:var(--category-tab-active-background-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton{border-radius:5px;background:transparent;border:2px solid transparent;color:var(--category-tab-color);cursor:pointer;padding:2px;vertical-align:middle;display:flex;align-items:center;justify-content:center;font-size:1.2rem;width:1.6em;height:1.6em;transition:all .1s}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:is(img){width:var(--category-tab-size);height:var(--category-tab-size)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:hover{background:var(--category-tab-highlight-background-color)}.picmo__dataError [data-icon]{opacity:.8}@keyframes appear{0%{opacity:0}to{opacity:.8}}@keyframes appear-grow{0%{opacity:0;transform:scale(.8)}to{opacity:.8;transform:scale(1)}}.picmo__picker .picmo__error{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--secondary-text-color)}.picmo__picker .picmo__error .picmo__iconContainer{opacity:.8;animation:appear-grow .25s cubic-bezier(.175,.885,.32,1.275);--color-primary: var(--error-color);--color-secondary: var(--error-color-dark)}.picmo__picker .picmo__error .picmo__title{animation:appear .25s;animation-delay:50ms;animation-fill-mode:both}.picmo__picker .picmo__error button{padding:8px 16px;cursor:pointer;background:var(--background-color);border:1px solid var(--text-color);border-radius:5px;color:var(--text-color)}.picmo__picker .picmo__error button:hover{background:var(--text-color);color:var(--background-color)}.picmo__emojiButton{background:transparent;border:none;border-radius:15px;cursor:pointer;display:flex;font-family:var(--emoji-font);font-size:var(--emoji-size);height:100%;justify-content:center;align-items:center;margin:0;overflow:hidden;padding:0;width:100%}.picmo__emojiButton:hover{background:var(--hover-background-color)}.picmo__emojiButton:focus{border-radius:0;background:var(--focus-indicator-background-color);outline:1px solid var(--focus-indicator-color)}.picmo__picker .picmo__emojiArea{height:var(--emoji-area-height);overflow-y:auto;position:relative}.picmo__picker .picmo__emojiCategory{position:relative}.picmo__picker .picmo__emojiCategory .picmo__categoryName{font-size:.9em;padding:.5rem;margin:0;background:var(--category-name-background-color);color:var(--category-name-text-color);top:0;z-index:1;display:grid;gap:4px;grid-template-columns:auto 1fr auto;align-items:center;line-height:1;box-sizing:border-box;height:var(--category-name-height);justify-content:flex-start;text-transform:uppercase}.picmo__picker .picmo__emojiCategory .picmo__categoryName button{background:transparent;border:none;display:flex;align-items:center;cursor:pointer;color:var(--category-name-button-color)}.picmo__picker .picmo__emojiCategory .picmo__categoryName button:hover{opacity:1}.picmo__picker .picmo__emojiCategory .picmo__noRecents{color:var(--secondary-text-color);grid-column:1 / span var(--emojis-per-row);font-size:.9em;text-align:center;display:flex;align-items:center;justify-content:center;min-height:calc(var(--emoji-size) * var(--emoji-size-multiplier))}.picmo__picker .picmo__emojiCategory .picmo__recentEmojis[data-empty=true]{display:none}:is(.picmo__picker .picmo__emojiCategory) .picmo__recentEmojis[data-empty=false]+div{display:none}.picmo__picker .picmo__emojiContainer{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center}.picmo__picker.picmo__picker{--border-radius: 5px;--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );--content-height: var(--emoji-area-height);--emojis-per-row: 8;--row-count: 6;--emoji-preview-margin: 4px;--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));--emoji-preview-size: 2.75em;--emoji-size: 2rem;--emoji-size-multiplier: 1.3;--content-margin: 8px;--category-tabs-height:calc(1.5em + 9px);--category-tabs-offset: 8px;--category-tab-size: 1.2rem;--category-name-height: 2rem;--category-name-padding-y: 6px;--search-height: 2em;--search-margin: .5em;--search-margin-bottom: 4px;--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));--overlay-background-color: rgba(0, 0, 0, .8);--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;--ui-font-size: 16px;--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);--preview-background-color: var(--secondary-background-color);background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);font-size:var(--ui-font-size);overflow:hidden;position:relative;width:var(--picker-width);display:grid;gap:8px}.picmo__picker.picmo__picker>*{font-family:var(--ui-font)}.picmo__picker.picmo__skeleton{background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);width:var(--picker-width);color:var(--secondary-text-color)}.picmo__picker.picmo__skeleton *{box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__picker.picmo__skeleton .picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}.picmo__picker.picmo__skeleton .picmo__headerSkeleton{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column;overflow:hidden;gap:8px;border-bottom:1px solid var(--border-color);width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton{padding:0 8px;height:var(--search-height)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton .picmo__searchInput{width:100%;height:28px;border-radius:3px}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton{height:var(--category-tabs-height);display:flex;flex-direction:row;align-items:center;justify-self:center;width:calc(2rem * var(--category-count, 1))}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton .picmo__categoryTab{width:25px;height:25px;padding:2px;border-radius:5px;margin:.25em}.picmo__picker.picmo__skeleton .picmo__contentSkeleton{height:var(--content-height);padding-right:8px;opacity:.7}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__categoryName{width:50%;height:1rem;margin:.5rem;box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center;width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid .picmo__emoji{width:var(--emoji-size);height:var(--emoji-size);border-radius:50%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton{height:var(--emoji-preview-height);border-top:1px solid var(--border-color);display:grid;align-items:center;padding:.5em;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags"}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewEmoji{grid-area:emoji;border-radius:50%;width:var(--emoji-preview-size);height:var(--emoji-preview-size)}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewName{grid-area:name;height:.8em;width:80%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList .picmo__tag{border-radius:3px;padding:2px 8px;margin-right:.25em;height:1em;width:20%}.picmo__overlay{background:rgba(0,0,0,.75);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.picmo__content{position:relative;overflow:hidden;height:var(--content-height)}.picmo__content.picmo__fullHeight{height:calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));overflow-y:auto}.picmo__pluginContainer{margin:.5em;display:flex;flex-direction:row}.picmo__header{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:grid;gap:8px;border-bottom:1px solid var(--border-color)}@media (prefers-reduced-motion: reduce){.picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__placeholder:after{display:none}}.picmo__picker .picmo__preview{border-top:1px solid var(--border-color);display:grid;align-items:center;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags";height:var(--emoji-preview-height);box-sizing:border-box;padding:.5em;position:relative;background:var(--preview-background-color)}.picmo__picker .picmo__preview .picmo__previewEmoji{grid-area:emoji;font-size:var(--emoji-preview-size);font-family:var(--emoji-font);width:1.25em;display:flex;align-items:center;justify-content:center}.picmo__picker .picmo__preview .picmo__previewName{grid-area:name;color:var(--text-color);font-size:.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.picmo__picker .picmo__preview .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0;font-size:.75em;overflow:hidden}.picmo__picker .picmo__preview .picmo__tag{border-radius:3px;background:var(--tag-background-color);color:var(--text-color);padding:2px 8px;margin-right:.25em;white-space:nowrap}.picmo__picker .picmo__preview .picmo__tag:last-child{margin-right:0}.picmo__picker .picmo__searchContainer{display:flex;height:var(--search-height);box-sizing:border-box;padding:0 8px;position:relative}.picmo__picker .picmo__searchContainer .picmo__searchField{background:var(--search-background-color);border-radius:3px;border:none;box-sizing:border-box;color:var(--text-color);font-size:.9em;outline:none;padding:.5em 2.25em .5em .5em;width:100%}.picmo__picker .picmo__searchContainer .picmo__searchField:focus{background:var(--search-focus-background-color)}.picmo__picker .picmo__searchContainer .picmo__searchField::placeholder{color:var(--search-placeholder-color)}.picmo__picker .picmo__searchContainer .picmo__searchAccessory{color:var(--search-icon-color);height:100%;position:absolute;right:1em;top:0;width:1.25rem;display:flex;align-items:center}.picmo__picker .picmo__searchContainer .picmo__searchAccessory svg{fill:var(--search-icon-color)}.picmo__picker .picmo__searchContainer .picmo__clearButton{border:0;color:var(--search-icon-color);background:transparent;cursor:pointer}.picmo__picker .picmo__searchContainer .picmo__clearSearchButton{cursor:pointer;border:none;background:transparent;color:var(--search-icon-color);font-size:1em;width:100%;height:100%;display:flex;align-items:center;padding:0}.picmo__picker .picmo__searchContainer .picmo__notFound [data-icon]{fill:#f3e265}.picmo__picker .picmo__variantOverlay{background:var(--overlay-background-color);border-radius:5px;display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.picmo__picker .picmo__variantOverlay .picmo__variantPopup{background:var(--variant-popup-background-color);border-radius:5px;margin:.5em;padding:.5em;text-align:center;user-select:none;display:flex;align-items:center;justify-content:center}.picmo__customEmoji{width:1em;height:1em}@keyframes shine{to{transform:translate(100%)}}.picmo__picker .picmo__imagePlaceholder{width:2rem;height:2rem;border-radius:50%}.picmo__placeholder{background:#DDDBDD;position:relative}.picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}
`;
function Ps(s) {
  return ce(s.locale, s.dataStore, s.messages, s.emojiData);
}
let zs = 0, M;
function Ls() {
  return `picmo-${Date.now()}-${zs++}`;
}
const $s = Ss();
function Hs(s) {
  $s(Fs);
  const e = $t(s), t = ((e == null ? void 0 : e.custom) || []).map((n) => ({
    ...n,
    custom: !0,
    tags: ["custom", ...n.tags || []]
  })), o = new It();
  M || (M = Ps(e));
  const i = new xs(e.i18n);
  M.then((n) => {
    o.emit("data:ready", n);
  }).catch((n) => {
    o.emit("error", n);
  });
  const a = new ks({
    events: o,
    i18n: i,
    customEmojis: t,
    renderer: e.renderer,
    options: e,
    emojiData: M,
    pickerId: Ls()
  }).create(_s);
  return a.renderSync(), a;
}
const As = {
  "categories.activities": "Aktivit\xE4ten",
  "categories.animals-nature": "Tiere & Natur",
  "categories.custom": "Benutzerdefiniert",
  "categories.flags": "Flaggen",
  "categories.food-drink": "Essen & Trinken",
  "categories.objects": "Gegenst\xE4nde",
  "categories.people-body": "Mensch & K\xF6rper",
  "categories.recents": "Zuletzt genutzt",
  "categories.smileys-emotion": "Smileys & Emotionen",
  "categories.symbols": "Symbole",
  "categories.travel-places": "Reisen & Orte",
  "error.load": "Emojis wurden nicht geladen",
  "recents.clear": "Zuletzt genutzte Emojis l\xF6schen",
  "recents.none": "Kein Emoji ausgew\xE4hlt.",
  retry: "Erneut versuchen",
  "search.clear": "Suche l\xF6schen",
  "search.error": "Suche erfolglos",
  "search.notFound": "Kein Emoji gefunden",
  search: "Emojis durchsuchen ..."
}, Is = {
  "categories.activities": "Aktiviteetit",
  "categories.animals-nature": "El\xE4imet & luonto",
  "categories.custom": "Mukautettu",
  "categories.flags": "Liput",
  "categories.food-drink": "Ruoka & juoma",
  "categories.objects": "Esineet",
  "categories.people-body": "Ihmiset & keho",
  "categories.recents": "Viimeksi k\xE4ytetty",
  "categories.smileys-emotion": "Hymi\xF6t & tunne",
  "categories.symbols": "Symbolit",
  "categories.travel-places": "Matkustus & paikat",
  "error.load": "Emojien lataaminen ep\xE4onnistui",
  "recents.clear": "Tyhjenn\xE4 viimeksi k\xE4ytetyt emojit",
  "recents.none": "Et ole valinnut viel\xE4 emojia.",
  retry: "Kokeile uudestaan",
  "search.clear": "Tyhjenn\xE4 haku",
  "search.error": "Emojien etsiminen ep\xE4onnistui",
  "search.notFound": "Emojia ei l\xF6ytynyt",
  search: "Etsi emojia..."
}, Ts = {
  "categories.activities": "Activit\xE9s",
  "categories.animals-nature": "Animaux et nature",
  "categories.custom": "Personnalis\xE9",
  "categories.flags": "Drapeaux",
  "categories.food-drink": "Nourriture et boissons",
  "categories.objects": "Objets",
  "categories.people-body": "Personnes et corps",
  "categories.recents": "R\xE9cemment utilis\xE9",
  "categories.smileys-emotion": "Visages et \xE9motions",
  "categories.symbols": "Symboles",
  "categories.travel-places": "Voyages et lieux",
  "error.load": "\xC9chec du chargement des \xE9mojis",
  "recents.clear": "Effacez les \xE9mojis r\xE9cents",
  "recents.none": "Vous n'avez pas encore s\xE9lectionn\xE9 d'\xE9mojis.",
  retry: "Essayez \xE0 nouveau",
  "search.clear": "Effacer la recherche",
  "search.error": "\xC9chec de la recherche d'\xE9mojis",
  "search.notFound": "Aucun \xE9moji trouv\xE9",
  search: "Rechercher des \xE9mojis..."
}, Rs = {
  "categories.activities": "Activiteiten",
  "categories.animals-nature": "Dieren & Natuur",
  "categories.custom": "Aangepast",
  "categories.flags": "Vlaggen",
  "categories.food-drink": "Eten & Drinken",
  "categories.objects": "Voorwerpen",
  "categories.people-body": "Mens & Lichaam",
  "categories.recents": "Laatst gebruikt",
  "categories.smileys-emotion": "Smileys en emoties",
  "categories.symbols": "Symbolen",
  "categories.travel-places": "Reizen & Plaatsen",
  "error.load": "Kan emoji's niet laden",
  "recents.clear": "Wis recente emoji's",
  "recents.none": "Geen emoji geselecteerd.",
  retry: "Probeer het nog eens",
  "search.clear": "Zoekopdracht wissen",
  "search.error": "Zoeken mislukt",
  "search.notFound": "Geen emoji gevonden",
  search: "Zoek emoji..."
}, Ms = {
  "categories.activities": "Aktiviteter",
  "categories.animals-nature": "Dyr & natur",
  "categories.custom": "Tilpasset",
  "categories.flags": "Flagg",
  "categories.food-drink": "Mat & drikke",
  "categories.objects": "Objekter",
  "categories.people-body": "Mennesker & kropp",
  "categories.recents": "Nylig brukte",
  "categories.smileys-emotion": "Smilefjes & f\xF8lelser",
  "categories.symbols": "Symboler",
  "categories.travel-places": "Reise & steder",
  "error.load": "Klarte ikke laste inn emojis",
  "recents.clear": "Fjern nylige emojis",
  "recents.none": "Du har ikke valgt noen emojis enda.",
  retry: "Pr\xF8v igjen",
  "search.clear": "T\xF8m s\xF8k",
  "search.error": "Klarte ikke \xE5 s\xF8ke etter emojis",
  "search.notFound": "Ingen emojis funnet",
  search: "S\xF8k etter emojis..."
}, Vs = {
  "categories.activities": "Aktiviteter",
  "categories.animals-nature": "Djur & natur",
  "categories.custom": "Anpassad",
  "categories.flags": "Flagga",
  "categories.food-drink": "Mat & dryck",
  "categories.objects": "Objekt",
  "categories.people-body": "M\xE4nniskor & kropp",
  "categories.recents": "Nyligen anv\xE4nd",
  "categories.smileys-emotion": "Hum\xF6r & k\xE4nslor",
  "categories.symbols": "Symboler",
  "categories.travel-places": "Resor & platser",
  "error.load": "Det gick inte att ladda emojis",
  "recents.clear": "Ta bort de senaste emojis",
  "recents.none": "Du har inte valt n\xE5gra emojis \xE4n",
  retry: "F\xF6rs\xF6k igen",
  "search.clear": "Tom s\xF6kning",
  "search.error": "Det gick inte att s\xF6ka efter emojis",
  "search.notFound": "Inga emojis hittades",
  search: "S\xF6k efter emojis..."
}, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  de: As,
  en: ze,
  fi: Is,
  fr: Ts,
  nl: Rs,
  no: Ms,
  sv: Vs
}, Symbol.toStringTag, { value: "Module" }));
class Us extends Ie {
  constructor() {
    super(xe() ? sessionStorage : $e());
  }
}
class qs extends Ae {
  constructor() {
    super(...arguments), this.recents = [];
  }
  clear() {
    this.recents = [];
  }
  getRecents(e) {
    return this.recents.slice(0, e);
  }
  addOrUpdateRecent(e, t) {
    this.recents = [
      e,
      ...this.getRecents(t).filter((o) => o.hexcode !== e.hexcode)
    ].slice(0, t);
  }
}
async function Ws(s, e, t, o) {
  (await ce(s, e, t, o)).close();
}

//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./admin/src/js/seocentral-plugin-admin.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_seocentral_plugin_admin_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/seocentral-plugin-admin.css */ "./admin/src/css/seocentral-plugin-admin.css");
/* harmony import */ var jquery_sortablejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery-sortablejs */ "./node_modules/jquery-sortablejs/jquery-sortable.js");
/* harmony import */ var jquery_sortablejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_sortablejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var driver_js_dist_driver_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! driver.js/dist/driver.css */ "./node_modules/driver.js/dist/driver.css");
/* harmony import */ var _js_seocentral_google_preview_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/seocentral-google-preview.js */ "./admin/src/js/seocentral-google-preview.js");
/* harmony import */ var _js_seocentral_page_analysis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/seocentral-page-analysis.js */ "./admin/src/js/seocentral-page-analysis.js");
/* harmony import */ var _js_seocentral_settings_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/seocentral-settings.js */ "./admin/src/js/seocentral-settings.js");
/* harmony import */ var _js_seocentral_metabox_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/seocentral-metabox.js */ "./admin/src/js/seocentral-metabox.js");
/* harmony import */ var _js_seocentral_lite_tips_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/seocentral-lite-tips.js */ "./admin/src/js/seocentral-lite-tips.js");












(function ($) {
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
  $(window).load(function () {
    //If the seo central score column is clicked check for the metabox id and scroll into the element
    if (window.location.hash === "#seo-central") {
      // Wait a bit to ensure the metabox has loaded
      setTimeout(function () {
        var mainMetabox = document.getElementById('seo-central');
        if (mainMetabox) {
          mainMetabox.scrollIntoView({
            behavior: 'smooth'
          });
          // Check if the metabox is in the viewport after scrolling
          setTimeout(function () {
            if (!(0,_js_seocentral_metabox_js__WEBPACK_IMPORTED_MODULE_6__.isMetaboxInViewport)($, mainMetabox)) {
              mainMetabox.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }, 1000); // 1-second delay to allow for the scroll to finish
        }
      }, 500);
    }

    //The myThemeParams are conditionaly rendered, if it is not available then this is not an edit or seo central page do NOT load up these functions
    if (typeof myThemeParams !== 'undefined') {
      //On load update the meta title value if its empty
      if ($('#seo_central_meta_title').val() === "") {
        $('#seo_central_meta_title').val($('#title').val());
      }

      // On load udpate the meta Description if value is empty and stringbody returns with content
      if ($('#seo_central_meta_description').val() === "") {
        var stringbody = myThemeParams.body['stringbody'];
        if (stringbody.length > 1) {
          var sentences = stringbody.match(/[^\.!\?©]+[\.!\?©]+/g);
          var metaDescription = "";
          if (sentences != null) {
            for (var i = 0; i < sentences.length; i++) {
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
          } else {
            $('#seo_central_meta_description').val(stringbody);
          }
        }
      }

      //Google Preview and Social Card Setup
      (0,_js_seocentral_google_preview_js__WEBPACK_IMPORTED_MODULE_3__.googlePreviews)($);

      //Page Analysis functionality and hidden fields (lite version does not check for secondary keywords a disabled field)
      if (!myThemeParams['pro_analysis']) {
        (0,_js_seocentral_page_analysis_js__WEBPACK_IMPORTED_MODULE_4__.pageAnalysis)($);
      }

      //Settings page functionality
      (0,_js_seocentral_settings_js__WEBPACK_IMPORTED_MODULE_5__.seocentralSettings)($);

      //Content Hierarchy 
      (0,_js_seocentral_page_analysis_js__WEBPACK_IMPORTED_MODULE_4__.contentHierarchy)($);

      //Update the seo score on completion of input fields
      //Pro install will have its onw updating function
      if (!myThemeParams['pro_analysis']) {
        (0,_js_seocentral_page_analysis_js__WEBPACK_IMPORTED_MODULE_4__.updateScoreOnInput)($);
      }

      // Collapse and open function for all dropdowns within the metabox. Pass Table Header, Header Arrow, and Table Body. 
      (0,_js_seocentral_metabox_js__WEBPACK_IMPORTED_MODULE_6__.metaboxDropdown)($, $('.seo-central-boring-stuff-header')[0], $('.form-table-collapse-arrow')[0], $('.seo-central-boring-stuff-body')[0]);
      (0,_js_seocentral_metabox_js__WEBPACK_IMPORTED_MODULE_6__.metaboxDropdown)($, $('.seo-central-analysis-scores-dropdown-header')[0], $('.seo-central-analysis-scores-dropdown-header-collapse-arrow')[0], $('.seo-central-analysis-scores-dropdown-body')[0]);

      // Set up the tips system for the lite metabox
      (0,_js_seocentral_lite_tips_js__WEBPACK_IMPORTED_MODULE_7__.metaboxLiteTips)($);

      //On load move the notifications to the proper partial for out pages
      (0,_js_seocentral_settings_js__WEBPACK_IMPORTED_MODULE_5__.moveNotifications)($);

      //Cornerstone Checkbox value save (Store the value into the checkbox input based on toggle)
      if ($('#seo_central_meta_cornerstone')) {
        $('.seo-central-checkbox-toggle.regular-checkbox').click(function () {
          // $('#seo_central_meta_cornerstone').val();
          if ($('#seo_central_meta_cornerstone').val() === 'cornerstone') {
            $('#seo_central_meta_cornerstone').val('none');
            if ($('.seo-central-checkbox-toggle.regular-checkbox').hasClass('cornerstone')) {
              $('.seo-central-checkbox-toggle.regular-checkbox').removeClass('cornerstone');
            }
          } else if ($('#seo_central_meta_cornerstone').val() === 'none') {
            $('#seo_central_meta_cornerstone').val('cornerstone');
            if (!$('.seo-central-checkbox-toggle.regular-checkbox').hasClass('cornerstone')) {
              $('.seo-central-checkbox-toggle.regular-checkbox').addClass('cornerstone');
            }
          }
          return false;
        });
      }
    }
  });
})(jQuery);
})();

seocentralEntry = __webpack_exports__;
/******/ })()
;
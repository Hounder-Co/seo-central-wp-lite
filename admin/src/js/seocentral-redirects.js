export function redirectTableFormat( $ ) {

  //Check the table for the wp-list-table class and remove it on mobile to avoid formatting issues with wordpress mobile table setup
  var redirectTable = $('.seo-central-redirection-wrapper .table-view-list');

  if(redirectTable[0] != null || redirectTable[0] != 'undefined') {

    //Initial check
    if($(window).width() <= 800){
      redirectTable.removeClass('wp-list-table');
    }
  
    //Monitor the resize event
    $(window).resize(function(){
      if($(window).width() <= 800){
        //On mobile remove the the wp-list-table class;
        redirectTable.removeClass('wp-list-table');
      } else {
        //Add the class back when the window size is larger than 768px
        redirectTable.addClass('wp-list-table'); 
      }
    });
  }

  //Testing the redirection
  //Redirect Quick edit functionality 
  if($('.quickedit')) {

    var redirectEdit = document.querySelectorAll('.seo-central-quickedit-redirect'), 
        redirectEditSave = document.querySelectorAll('.quickedit-save'),
        redirectEditClose = document.querySelectorAll('.quickedit-close'),
        redirectDelete = document.querySelectorAll('.seo-central-delete-redirect');

    //Open and close the quickedit menus
    redirectEdit.forEach((editButton, index) => {
      // The quickedit icon button
      editButton.addEventListener('click', () => {
        var id = editButton.dataset.id;
        $('#quickedit-row-' + id).toggleClass('hidden');
        $('#redirect-row-' + id).toggleClass('hidden');
      });
      
      //The inner close button
      var innerClose = redirectEditClose[index];
      if(innerClose != null && innerClose != 'undefined') {
        innerClose.addEventListener('click', () => {
          var id = innerClose.dataset.id;
          $('#quickedit-row-' + id).toggleClass('hidden');
          $('#redirect-row-' + id).toggleClass('hidden');
        });
      }
    });

    redirectEditSave.forEach((editSaveButton) => {
      editSaveButton.addEventListener('click', (e) => {
        e.preventDefault();
        var id = editSaveButton.dataset.id;
        var old_url = $('#quickedit-row-' + id + ' input[name="old_url"]').val();
        var new_url = $('#quickedit-row-' + id + ' input[name="new_url"]').val();
        var redirect_type = $('#quickedit-row-' + id + ' .seo-central-redirect-types').val();
        // var redirect_type = $('#quickedit-row-' + id + ' input[name="redirect_type"]').val();

        var data = {
          action: 'quickedit_save',
          nonce: my_script_vars.nonce, 
          id: id,
          old_url: old_url,
          new_url: new_url,
          redirect_type: redirect_type,
        };

        // console.log(my_script_vars.ajaxurl);
        // console.log(data);
        $.post(my_script_vars.ajaxurl, data, function(response) {
          console.log(response);  // Log the response to the console
          location.reload();
        }).fail(function(xhr) {
            console.log('Error: ' + xhr.responseText); // Log any errors
        });
      });
    });

    
    redirectDelete.forEach((deleteButton) => {
      deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
      
        var id = deleteButton.dataset.id;

        var data = {
            action: 'delete_row',
            nonce: my_script_vars.nonce, 
            id: id
        };

        $.post(my_script_vars.ajaxurl, data, function(response) {
          console.log(response);  // Log the response to the console
          location.reload();
        }).fail(function(xhr) {
            console.log('Error: ' + xhr.responseText); // Log any errors
        });
        // $.post(ajaxurl, data, function(response) {
        // 		// Reload the page to see the updated data
        // 		location.reload();
        // });
      });
    });

    // Close Quickedit menu
  }
}

// In the event there are default notifications move them to the proper spot
export function moveNotifications( $ ) {
  if($('.notice').length) {
    var defaultNotices = $('.notice');
    var seoNotifications = $('.seo-central-partials-notification-wrapper');

    defaultNotices.each(function() {
        var cloneNotice = $(this).clone();
        seoNotifications.append(cloneNotice);
        $(this).hide();
    });
  }
}
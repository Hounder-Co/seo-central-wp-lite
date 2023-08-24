<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/admin/partials
 */

// <!-- This file should primarily consist of HTML with a little bit of PHP. -->
  //Get all the redirects from the custom database table to display the listing within the page
  function get_all_redirects() {
    global $wpdb;
    $table_name = $wpdb->prefix . "_custom_redirects"; 

    $result = $wpdb->get_results("SELECT * FROM $table_name");

    // Check if the table exists
    if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name) {
      echo "The table exists";
    } else {
      echo "The table does not exist";
    }
    return $result;
  }

  //Perform the redirections using the custom table, this needs to be loaded before page loads and re-updated on add and edit of submissions

  function add_redirect($old_url, $new_url, $redirect_type) {
    global $wpdb;
    $table_name = $wpdb->prefix . "_custom_redirects"; 

    $wpdb->insert( 
        $table_name, 
        array( 
            'old_url' => $old_url, 
            'new_url' => $new_url,
            'redirect_type' => $redirect_type,
        ) 
    );
  }

  function update_redirect($id, $old_url, $new_url, $redirect_type) {
    global $wpdb;
    $table_name = $wpdb->prefix . "_custom_redirects"; 

    $wpdb->update( 
        $table_name, 
        array( 
            'old_url' => $old_url, 
            'new_url' => $new_url,
            'redirect_type' => $redirect_type,
        ),
        array( 'id' => $id )
    );
  }

  function delete_redirect($id) {
    global $wpdb;
    $table_name = $wpdb->prefix . '_custom_redirects';
    
    $result = $wpdb->delete(
        $table_name, // table name
        array('id' => $id), // where clause
        array('%d')  // where format
    );
    
    if($result===false) {
        // The query failed
        return false;
    } else {
        // The query succeeded, and $result is the number of rows affected
        return true;
    }
  }

  //Access the wp list table class and extend to create custom listing
  if(!class_exists('WP_List_Table')){
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
  }

  class Seo_Central_Custom_Table extends WP_List_Table {

    function get_columns(){
      $columns = array(
          'id'              => 'ID',
          'redirect_type'   => 'Redirect Type',
          'old_url'         => 'Old URL',
          'new_url'         => 'New URL',
          'actions'         => 'Edit/Delete'
      );
      return $columns;
    }


    function prepare_items() {
        global $wpdb;
        $table_name = $wpdb->prefix . '_custom_redirects';

        $query = "SELECT * FROM $table_name";

        $data = $wpdb->get_results($query, ARRAY_A);

        $columns = $this->get_columns();
        $hidden = array('id');
        $sortable = array();

        $this->_column_headers = array($columns, $hidden, $sortable);
        $this->items = $data;
    }

    function column_default($item, $column_name){
        switch($column_name){
            case 'id':
            case 'old_url':
            case 'new_url':
            case 'redirect_type':
                return $item[$column_name];
            default:
                return print_r($item, true) ;
        }
    }

    function column_actions($item){
      $actions = array(
          'quickedit' => sprintf('<a href="javascript:void(0);" class="seo-central-quickedit-redirect" data-id="%s"></a>', $item['id']),
          // 'edit'      => sprintf('<a href="?page=%s&action=%s&id=%s">Edit</a>', $_REQUEST['page'], 'edit', $item['id']),
          'delete'    => sprintf('<a href="javascript:void(0);" class="seo-central-delete-redirect" data-id="%s"></a>', $item['id']),
      );

      return $this->row_actions($actions);
    }

    function column_redirect_type($item){
      return $item['redirect_type'];
    }

    function single_row($item) {

      //Prepare the dropdown selected value
      $redirect_types = array('301','302','307','410','451');
      $redirect_labels = array('301 moved permanently','302 Found','307 Temporary Redirect','410 Temporary Deleted','451 Unavailable for legal reasons');
      $select = '<select class="seo-central-redirect-types" name="redirect_type_'.$item['id'].'" id="redirect_type_'.$item['id'].'">';
      foreach($redirect_types as $key=>$value) {
        // do stuff
        if($value == $item['redirect_type']) {
          $select .= '<option value="'.$value.'" selected>'.$redirect_labels[$key].'</option>';
        }
        else {
          $select .= '<option value="'.$value.'">'.$redirect_labels[$key].'</option>';
        }
      }
      $select .= '</select>';

      //Echo out the hidden row to the single row columns function using the item
      echo '<tr class="seo-central-redirect-table-rows" id="redirect-row-' . $item['id'] . '">';
      $this->single_row_columns($item);
      echo '</tr>';
      // Hidden row displayed when Quick Edit is clicked
      echo '<tr class="hidden quickedit-row seo-central-redirect-table-quickedit" id="quickedit-row-' . $item['id'] . '">';
      echo '<td colspan="' . $this->get_column_count() . '">';
      echo '<div class="seo-central-quickedit-form">';
  
      // Your Quick Edit form goes here
      echo '<div class="seo-central-quickedit-form-input">';
      echo '<label class="hidden">'. __('Redirect Type:', 'seo-central-lite') .'</label> '. $select .'';
      echo '</div>';

      echo '<div class="seo-central-quickedit-form-input">';
      echo '<label class="hidden">'. __('Old URL:', 'seo-central-lite') .'</label> <input type="text" name="old_url" value="' . $item['old_url'] . '" />';
      echo '</div>';

      echo '<div class="seo-central-quickedit-form-input">';
      echo '<label class="hidden">'. __('New URL:', 'seo-central-lite') .'</label> <input type="text" name="new_url" value="' . $item['new_url'] . '" />';
      echo '</div>';
      // echo '<label>Redirect Type:</label> <input type="text" name="redirect_type" value="' . $item['redirect_type'] . '" />';
      echo '<div class="seo-central-quickedit-form-input save-wrapper">';
      echo '<div class="seo-central-redirect-table-quickedit-save-wrapper"><button class="quickedit-save seo-central-redirect-table-quickedit-save" data-id="' . $item['id'] . '"></button></div>';
      echo '<div class="seo-central-redirect-table-quickedit-close-wrapper"><button class="quickedit-close seo-central-redirect-table-quickedit-close" data-id="' . $item['id'] . '"></button></div>';
      echo '</div>';

      echo '</div>';
      echo '</td>';
      echo '</tr>';
  
    }
  }

  function seo_central_custom_table_page(){
    $myListTable = new Seo_Central_Custom_Table();
    echo '<h2 class="wrap seo-central-redirection-wrapper-title">'. __('All Redirects', 'seo-central-lite') .'</h2>';
    echo '<div class="wrap seo-central-redirection-wrapper">'; 
    $myListTable->prepare_items(); 
    $myListTable->display();
    echo '</div>'; 
  }

  //Receive the post request from the top form and edit the database on click of Add Redirect Form
  if(isset($_POST['addRedirect'])) {
    add_redirect($_POST['oldUrl'],$_POST['newUrl'],$_POST['redirect_type']);
  }
?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>

<div class='seo-central-partials-headline-wrapper'>
  <h2 class='seo-central-partials-headline-title'><?php echo __('Redirects', 'seo-central-lite'); ?></h2>  
</div>

<!-- Notifications bar -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-notification.php' ); ?>

<article class="seo-central-redirect-wrapper">

  <div class='seo-central-notification-wrapper'>
    <p class='seo-central-notification'><span class='seo-central-notification-icon icon-blue'></span> <span class='seo-central-notification-text'></span></p>
  </div>
  
  <form method="post" class='seo-central-redirect-form-add'>
    <div class="seo-central-redirect-top-select">
      <label class='seo-central-redirect-form-label' for="redirect_type"><?php echo __('Choose Redirect Type:', 'seo-central-lite'); ?></label>
      <select class="seo-central-redirect-form-select seo-central-select" name="redirect_type" id="redirect_type">
        <option value="301"><?php echo __('301 moved permanently', 'seo-central-lite'); ?></option>
        <option value="302"><?php echo __('302 Found', 'seo-central-lite'); ?></option>
        <option value="307"><?php echo __('307 Temporary Redirect', 'seo-central-lite'); ?></option>
        <option value="410"><?php echo __('410 Content Deleted', 'seo-central-lite'); ?></option>
        <option value="451"><?php echo __('451 Unavailable for legal reasons', 'seo-central-lite'); ?></option>
      </select>
    </div>

    <div>
      <label class='seo-central-redirect-form-label' for="oldUrl"><?php echo __('Old URL:', 'seo-central-lite'); ?></label>
      <input class='seo-central-redirect-form-input seo-central-text-input' type="text" name="oldUrl" class="seo-central-redirect-urls" value="" />
    </div>

    <div>
      <label class='seo-central-redirect-form-label' for="newUrl"><?php echo __('New URL:', 'seo-central-lite'); ?></label>
      <input class='seo-central-redirect-form-input seo-central-text-input' type="text" name="newUrl" class="seo-central-redirect-urls" value="" />
    </div>

    <input class='seo-central-redirect-form-submit seo-central-button-small seo-central-button-secondary' type="submit" name="addRedirect" class="seo-central-redirect-add" value="Add redirect" />
  </form>

</article>

<?php seo_central_custom_table_page(); ?>

<style>
  #wpcontent {
    padding-left: 0px !important;
  }

  #wpbody {
    overflow: hidden;

    .update-nag.notice {
      //display: none;
    }
  }
</style>
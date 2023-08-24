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
// class Seo_Central_Report_Table extends WP_List_Table {

//   function get_columns() {
//     $columns = array(
//       'id'        => 'ID',
//       'title'     => 'Page Title',
//       'seo_score' => 'SEO Score',
//     );
//     return $columns;
//   }

//   function prepare_items() {
//       $args = array(
//           'post_type' => 'page',
//           'meta_query' => array(
//               array(
//                   'key' => 'seo_central_page_analysis',
//                   'value' => 'false',
//                   'compare' => '=='
//               )
//           )
//       );
//       $query = new WP_Query($args);
//       $pages = $query->posts;

//       $data = array_map(function($post){
//           return array(
//               'id' => $post->ID,
//               'title' => $post->post_title,
//               'seo_score' => get_post_meta($post->ID, 'seo_central_page_analysis', true)
//           );
//       }, $pages);

//       $columns = $this->get_columns();
//       $hidden = array();
//       $sortable = array();

//       $this->_column_headers = array($columns, $hidden, $sortable);
//       $this->items = $data;
//   }

//   function column_default($item, $column_name) {
//       switch($column_name){
//           case 'id':
//           case 'title':
//           case 'seo_score':
//               return $item[$column_name];
//           default:
//               return print_r($item, true) ;
//       }
//   }
// }

// function display_seo_central_custom_table() {
//   // Create an instance of our package class
//   $seoCentralListTable = new Seo_Central_Report_Table();

//   // Fetch, prepare, sort, and filter our data
//   $seoCentralListTable->prepare_items();

//   // Display the list table
//   $seoCentralListTable->display();
// }

function seo_central_bad_scores() {
  global $wpdb;
  $table_name = $wpdb->prefix . "postmeta"; 
  $query = "SELECT * FROM ". $table_name ." WHERE meta_key = 'seo_central_page_analysis' AND meta_value = 'false'";
  // var_dump($query);
  $rows = $wpdb->get_results($query);

  // var_dump($rows);
  
  if($rows){
    echo '<table class="wp-list-table widefat fixed striped table-view-list pages">';
    echo '<thead><tr><th>Title</th><th>Author</th><th>Score</th></tr></thead>';
    echo '<tbody>';
    foreach($rows as $row){
      $edit_link = get_edit_post_link($row->post_id);
      $delete_link = get_delete_post_link($row->post_id);
      $author_id = get_post_field('post_author', $row->post_id);
      $author_name = get_the_author_meta('display_name', $author_id);
      echo '<tr>';
      echo '<td><a class="row-title" href="'.get_permalink($row->post_id).'">'.get_the_title($row->post_id).'</a> <div class="row-actions"><a href="'.$edit_link.'">Edit</a> | <a href="'.$delete_link.'">Delete</a></div></td>';
      echo '<td>'.$author_name.'</td>';
      echo '<td>'.$row->meta_value.'</td>';
      echo '</tr>';
    }
    echo '</tbody>';
    echo '</table>';
  } else {
      echo 'No pages found with bad SEO score.';
  }
}

function seo_central_good_scores() {
  global $wpdb;
  $table_name = $wpdb->prefix . "postmeta"; 
  $query = "SELECT * FROM ". $table_name ." WHERE meta_key = 'seo_central_page_analysis' AND meta_value = 'true'";
  $rows = $wpdb->get_results($query);
  
  if($rows){
    echo '<table class="wp-list-table widefat fixed striped table-view-list pages">';
    echo '<thead><tr><th>ID</th><th>Page Title</th><th>Score</th></tr></thead>';
    echo '<tbody>';
    foreach($rows as $row){
        $edit_link = get_edit_post_link($row->post_id);
        $delete_link = get_delete_post_link($row->post_id);
        echo '<tr>';
        echo '<td>'.$row->post_id.'</td>';
        echo '<td>'.$row->meta_key.'</td>';
        echo '<td>'.$row->meta_value.'</td>';
        echo '</tr>';
      }
      echo '</tbody>';
      echo '</table>';
  } else {
      echo 'No pages found with good SEO score.';
  }
}


?>

<!-- Include the partials nav -->
<?php include( plugin_dir_path( __FILE__ ) . '/seo-central-partial-nav.php' ); ?>

<article class="seo-central-admin-wrapper">
  <h1>Report SEO Central</h1>
  <?php seo_central_bad_scores(); ?>
  <?php seo_central_good_scores(); ?>

</article>

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
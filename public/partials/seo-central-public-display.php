<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://hounder.co
 * @since      1.0.0
 *
 * @package    Seo_Central
 * @subpackage Seo_Central/public/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<?php 
  //Access Post to get meta values from seo central and set up the page's schema
  global $post;
  
  if ($post->ID) {
    $post_meta = get_post_meta(get_queried_object_id($post->ID));

    $google = get_option('seo_central_setting_google_key');
    $bing = get_option('seo_central_setting_bing_key');
  }

  //Check for the schema page type field. 
  if(isset($post_meta['seo_central_page_type']) && $post_meta['seo_central_page_type']) {

    // If page has a parent (exclude homepage)
    if( $post->post_parent ){
            
      // Ancestor Array 
      $ancArray = array();

      // If child page, get parents 
      $anc = get_post_ancestors( $post->ID );
          
      // Get parents in the right order
      $anc = array_reverse($anc);
          
      // Parent page loop
      if ( !isset( $parents ) ) $parents = null;
      foreach ( $anc as $index=>$ancestor ) {

          //Store all the list items in order, Should start from (home).
          $listItem = [
            '@type' => 'ListItem',
            'position' => ( $index + 1),
            'name' => get_the_title($ancestor),
            'item' => get_the_permalink($ancestor)
          ];

          array_push($ancArray, $listItem);

          //If on the last element of loop set child item (current page)
          if ($index === array_key_last($anc)) {
            $listItem = [
              '@type' => 'ListItem',
              'position' => ( $index + 2),
              'name' => get_the_title($post->ID)
            ];

            array_push($ancArray, $listItem);
          }
      }
          
      //Store all the breadcrumbs within the breadcrumbslist for google crawler.     
      $breadcrumbs = [
        '@type' => 'BreadcrumbList',
        '@id' => wp_get_canonical_url() . '#breadcrumb',
        'itemListElement' => $ancArray
      ];

    } else {
        //Set single breadcrumbs for homepage, should just have the one item in the list
        $breadcrumbs = [
          '@type' => 'BreadcrumbList',
          '@id' => wp_get_canonical_url() . '#breadcrumb',
          'itemListElement' => [
            '@type' => 'ListItem',
            'position' => 1,
            'name' => get_the_title($post->ID)
          ]
        ];
    }

    //Set schema with default or other page types
    if(isset($post_meta['seo_central_page_type']) && $post_meta['seo_central_page_type'][0] != 'WebPage') {
      $webpage_schema = [
        '@type' => ['WebPage', $post_meta['seo_central_page_type'][0]],
        '@id' => wp_get_canonical_url(),
        'url' => wp_get_canonical_url(),
        'name' => $post_meta['seo_central_meta_title'][0],
        'isPartOf' => ['@id' => get_site_url() . '/#website'],
        'datePublished' => get_the_date(),
        'dateModified' => get_the_modified_date(),
        'description' => $post_meta['seo_central_meta_description'][0],
        'breadcrumb' => ['@id' => wp_get_canonical_url() . '#breadcrumb'],
        'inLanguage' => get_bloginfo( 'language' ),
        'potentialAction' => ['@type' => 'ReadAction', 'target' => wp_get_canonical_url()]
      ];
    }
    else if(isset($post_meta['seo_central_page_type'])) { //Default WebPage schema
      $webpage_schema = [
        '@type' => $post_meta['seo_central_page_type'][0],
        '@id' => wp_get_canonical_url(),
        'url' => wp_get_canonical_url(),
        'name' => $post_meta['seo_central_meta_title'][0],
        'isPartOf' => ['@id' => get_site_url() . '/#website'],
        'datePublished' => get_the_date(),
        'dateModified' => get_the_modified_date(),
        'description' => $post_meta['seo_central_meta_description'][0],
        'breadcrumb' => ['@id' => wp_get_canonical_url() . '#breadcrumb'],
        'inLanguage' => get_bloginfo( 'language' ),
        'potentialAction' => ['@type' => 'ReadAction', 'target' => wp_get_canonical_url()]
      ];
    }

    //Article Schema
    if(isset($post_meta['seo_central_article_type']) && str_contains($post_meta['seo_central_article_type'][0], 'Article')){ //(If it contains Article it just needs one type)
      $user = get_userdata($post->post_author);

      $article_schema = [
        '@type' => $post_meta['seo_central_article_type'][0],
        '@id' => wp_get_canonical_url() . '#article',
        'isPartOf' => ['@id' => wp_get_canonical_url()],
        'author' => ['name' => $user->display_name, '@id' => get_site_url() . '/#/schema/person/' . wp_hash( $user->user_login . $post->post_author)],
        'headline' => get_the_title($post->ID),
        'datePublished' => get_the_date(),
        'dataeModified' => get_the_modified_date(),
        'mainEntityOfPage' => ['@id' => wp_get_canonical_url()],
        'wordCount' => 1  
      ];

    } else if(isset($post_meta['seo_central_article_type']) && $post_meta['seo_central_article_type'][0] != 'None'){ //Else if it is set to a Non article selection set both
      $user = get_userdata($post->post_author);

      $article_schema = [
        '@type' => ["Article", $post_meta['seo_central_article_type'][0]],
        '@id' => wp_get_canonical_url() . '#article',
        'isPartOf' => ['@id' => wp_get_canonical_url()],
        'author' => ['name' => $user->display_name, '@id' => get_site_url() . '/#/schema/person/' . wp_hash( $user->user_login . $post->post_author)],
        'headline' => get_the_title($post->ID),
        'datePublished' => get_the_date(),
        'dataeModified' => get_the_modified_date(),
        'mainEntityOfPage' => ['@id' => wp_get_canonical_url()],
        'wordCount' => 1
      ];
    }

    //Entire Site Schema goes on almost all pages
    $website_schema = [
      '@type' => 'WebSite',
      '@id' => get_site_url() . '/#website',
      'url' => get_site_url(),
      'name' => get_bloginfo('name'),
      'description' => get_bloginfo('description'),
      'publisher' => get_site_url() . '/#organization',
      'potentialAction' => ['@type' => 'SearchAction', 'target' =>['@type' => 'EntryPoint', 'urlTemplate' => get_site_url() . '?s={search_term_string}'], 'query-input' => 'required name=search_term_string'],
      'inLanguage' => get_bloginfo( 'language' ),
    ];

    //Organization Site Schema goes on almost all pages
    $organization_schema = [
      '@type' => 'Organization',
      '@id' => get_site_url() . '/#organization',
      'name' => get_bloginfo('name'),
      'url' => get_site_url(),
      'logo' => ['@type' => 'ImageObject', 'inLanguage' => get_bloginfo( 'language' ), '@id' => get_site_url() . '/#/schema/logo/image', 'url' => get_site_icon_url(), 'contentURL' => get_site_icon_url()]
    ];
  }

  // var_dump($post_meta['seo_central_robot_index']);
?>

<!-- Check for theme support to drop the title tag -->

<!-- Pass the Site name and the meta title -->
<?php if (function_exists('current_theme_supports') && current_theme_supports( 'title-tag' )): ?>
  <!-- The Theme is already generating a title tag -->
<?php else: ?>

  <!-- Pass the Site name and the meta title -->
  <?php if (isset($post_meta['seo_central_meta_title'][0]) && !empty($post_meta['seo_central_meta_title'][0])): ?>
    <title><?php echo $post_meta['seo_central_meta_title'][0]; ?> <?php echo get_option('seo_central_setting_crumbseparator'); ?> <?php echo get_bloginfo( 'name' ); ?></title>
    <meta name='og:title' content="<?php echo $post_meta['seo_central_meta_title'][0]; ?>">
  <?php elseif (isset($post_meta['seo_central_meta_title'][0]) && empty($post_meta['seo_central_meta_title'][0])): ?>
    <title><?php echo get_bloginfo( 'name' ); ?></title>
  <?php endif; ?>

<?php endif; ?>

<!-- Meta Description -->
<?php if (isset($post_meta['seo_central_meta_description'][0]) && !empty($post_meta['seo_central_meta_description'][0])): ?>
  <meta name='description' content="<?php echo $post_meta['seo_central_meta_description'][0]; ?>">
  <meta name='og:description' content="<?php echo $post_meta['seo_central_meta_description'][0]; ?>">
<?php endif; ?>

<!-- Language -->
<meta name='og:local' content="<?php echo get_bloginfo( 'language' ); ?>">

<!-- Canonical URL -->
<meta name='og:url' content="<?php echo wp_get_canonical_url(); ?>">

<!-- Site Name -->
<meta name='og:site_name' content="<?php echo get_bloginfo( 'name' ); ?>">

<!-- Social Image (Defaults to settings site image if empty) -->
<?php if (isset($post_meta['seo_central_social_image'][0]) && !empty($post_meta['seo_central_social_image'][0])): ?>
  <meta property="og:image" content="<?php echo $post_meta['seo_central_social_image'][0]; ?>">
<?php elseif (get_option('seo_central_setting_image')): ?>
  <meta property="og:image" content="<?php echo get_option('seo_central_setting_image'); ?>">
<?php endif; ?>

<!-- Social Title -->
<?php if (isset($post_meta['seo_central_social_title'][0]) && !empty($post_meta['seo_central_social_title'][0])): ?>
  <meta name='twitter:card' content="<?php echo $post_meta['seo_central_social_title'][0]; ?>">
<?php endif; ?>

<!-- Robots Radio Checks -->
<?php if (isset($post_meta['seo_central_robot_index'][0]) && isset($post_meta['seo_central_robot_follow'][0])): ?>
  <?php if ($post_meta['seo_central_robot_index'][0] == 'yes' && $post_meta['seo_central_robot_follow'][0] == 'yes'): ?>
    <meta name='robots' content='<?php echo 'index, follow'; ?>'>
  <?php elseif ($post_meta['seo_central_robot_index'][0] == 'yes' && $post_meta['seo_central_robot_follow'][0] == 'no'): ?>
    <meta name='robots' content='<?php echo 'index'; ?>'>
  <?php elseif ($post_meta['seo_central_robot_index'][0] == 'no' && $post_meta['seo_central_robot_follow'][0] == 'yes'): ?>
    <meta name='robots' content='<?php echo 'follow'; ?>'>
  <?php elseif ($post_meta['seo_central_robot_index'][0] == 'no' && $post_meta['seo_central_robot_follow'][0] == 'no'): ?>
    <meta name='robots' content='<?php echo 'none'; ?>'>
  <?php endif; ?>
<?php endif; ?>

<!-- Google Verification -->
<?php if ($google): ?>
  <meta name="google-site-verification" content='<?php echo $google; ?>' />
<?php endif; ?>

<!-- Bing Verfication -->
<?php if ($bing): ?>
  <meta name="bing-site-verification" content='<?php echo $bing; ?>' />
<?php endif; ?>


<?php if (isset($post_meta['seo_central_article_type']) && $post_meta['seo_central_article_type'][0] != 'None'): ?>
  <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@graph": [<?php echo json_encode($article_schema, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($webpage_schema, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($breadcrumbs, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($website_schema, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($organization_schema, JSON_UNESCAPED_SLASHES); ?>]
  
      }
  </script>
<?php else: ?>
  <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@graph": [<?php echo json_encode($webpage_schema, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($breadcrumbs, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($website_schema, JSON_UNESCAPED_SLASHES); ?>, <?php echo json_encode($organization_schema, JSON_UNESCAPED_SLASHES); ?>]
  
      }
  </script>
<?php endif; ?>
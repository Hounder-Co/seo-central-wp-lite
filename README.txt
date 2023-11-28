=== SEO Central ===
Contributors: justinhough, joshounder, rashadnaime, austinamento
Donate link: https://hounder.co
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: SEO, XML Sitemap, AI Generation, Page Analysis
Requires PHP: 7.2
Requires at least: 1.0
Tested up to: 1.0
Stable tag: 1.0

== Description ==

Start ranking higher in search engine results! After analyzing your page content, the SEO Central plugin 
automatically generates optimized meta titles, meta descriptions, and keywords that will skyrocket your page up Google's ranks. Features include scoring and analysis of your current SEO health, with clear and concise directions for improvement. 

## SEO Central features

* Live page scoring. See the SEO score of each of your pages.

* Customize Meta Title, Meta Description, Primary Keywords, and more to improve your SEO ranking. 

* SEO analysis avaiable for each page of your site, get the best recomendations for optimizing your SEO. 

* Each on page analysis will tell you what 

* Custom XML Sitemaps for search engines. 

* Social and Google Previews available and customizable per page.

* Custom redirection system. 

* Custom File editor to update your robots.txt and humans.txt

== Installation ==

Install and start using SEO Central in 3 simple steps. 
(Note: you may need to rename the folder "seo-central-wp-lite-main" to "seo-central-wp-lite")

1. Navigate to the plugins page in your Wordpress admin dashboard. 
2. Click the Add New button and search for 'SEO Central' in the plugins search.
3. Click Install then Activate to enable the SEO Central plugin on your site. 

== Post Activation ==

Activate Breadcrumbs functionality by placing `<?php do_shortcode('seo_central_breadcrumbs'); ?>` or alternatively `{{ function('do_shortcode', '[seo_central_breadcrumbs]') }}` in your theme's templates.

== SEO Central Pro Installation ==

Starting point after SEO Central lite plugin has been installed and activated.  

1. Navigate to https://app.seocentral.ai/ 
2. Click "Create an account" or "Login" to access the Central Cloud.
3. Once you're signed in, navigate to "Account Manager" in the top navigation.
4. Click "Add Site" then enter your site domain and purchase your pro account.
5. Now you'll need to add your SEO Central Pro Plugin files and generated API Key to your WordPress site:
6. On your WordPress admin dashboard, go to Plugins and click "Add New."
7. Click "Upload Plugin" and upload the SEO Central Pro .zip files.
8. Install and Activate the SEO Central Pro Plugin files to Wordpress. Not all features of the SEO Central Pro Plugin are enabled upon activation.
9. Add your generated API Key from https://app.seocentral.ai/dashboard/central-cloud to the SEO Central Dashboard field: SEO Central API Key. To use all features SEO Central has to offer.

== Frequently Asked Questions ==

= Do I need to install the pro version to automatically generate optimized SEO? =

Yes. In order to have full access to the automatic SEO optimization for pages the pro version must be purchased and installed with the API key setup on Dashboard. 

= How do I get breadcrumbs to work? =

Activate Breadcrumbs functionality by placing `<?php do_shortcode('seo_central_breadcrumbs'); ?>` or alternatively `{{ function('do_shortcode', '[seo_central_breadcrumbs]') }}` in your theme's templates.

Recommended placement of the breadcrumbs would be 'page.php' or primary display file for you template. 

= Are sitemaps a pro feature? =

No. As soon as SEO Central plugin has been installed and activated from the plugin marketplace the XML sitemaps are updated. However conflicts may arise if other SEO plugins are active at the same time. 

Wordpress default XML sitemaps path is changed from '/wp-sitemap.xml' to '/central-sitemap.xml' 

= Sitemaps not enabling? =

If there are any other SEO plugins that alter sitemaps then they need to be deactivated to avoid conflicts with SEO Central. If the sitemap page is still a 404 page after deactivating other conflicting plugins then navigate to Wordpress Settings in the dashboard and select Permalinks. Simply save changes in the Permalinks page to update wordpress then refresh the 'wp-sitemap.xml' page. If you see the url update to 'central-sitemap.xml' then success sitemaps have been enabled properly.

Wordpress default XML sitemaps path is changed from '/wp-sitemap.xml' to '/central-sitemap.xml' 

= SEO Central plugin isn't activating? =

A common error you main run into is due to a few complications Timber being active prior to installing SEO Central. If you see the Notice below upon activating SEO Central Plugin follow the steps. 

Notice: add_theme_support( 'title-tag' ) was called incorrectly. Theme support for title-tag should be registered before the wp_loaded hook. Please see Debugging in WordPress for more information. (This message was added in version 4.1.0.) in /app/wp-includes/functions.php on line 5775 Fatal error: Cannot redeclare my_acf_json_save_point() (previously declared in /app/wp-content/themes/everstreamai/inc/acf.php:8) in /app/wp-content/themes/everstreamai/inc/acf.php on line 8

1. Timber needs to be deactivated first
2. Activate SEO Central
3. Finally reactivate Timber.

= My question is unavailable here? =

If you have not found the question and answer you are looking for here visit our support at https://app.seocentral.ai/ 

== Screenshots ==

1.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_1.png  SEO Central App signup]
2.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_2.png  Account Manager provide domain]
3.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_3.png  Account Manager files & api-key result]
4.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_4.png  Pro Plugin installation]
5.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_5.png  Pro plugin Activation]
6.  [https://seo-central-cdn.sfo3.digitaloceanspaces.com/screenshots/Seo_Central_Pro_Setup_Step_6.png  API key setup on Dashboard]

== Changelog ==

= 1.0 =
* Original Version 1.0.
* Starting version of SEO Central Plugin.

== Upgrade Notice ==

### Other
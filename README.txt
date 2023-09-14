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

Optimize your site's SEO! Utilizing the content of a page SEO Central plugin can 
automatically generate optimized meta titles, meta descriptions, and keywords that rank based on 
your content. Features include scoring and analysis of your seo with directions for improvement. 

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

Install and start SEO Central in 3 simple steps.

1. Within your Wordpress admin dashboard navigate to the plugins page.
2. Click the Add New button and search for 'SEO Central' within the plugins search.
3. Click Install then Activate to enable the SEO Central plugin to you site. 

== Post Activation ==

Activate Breadcrumbs functionality by placing `<?php do_shortcode('seo_central_breadcrumbs'); ?>` or alternatively `{{ function('do_shortcode', '[seo_central_breadcrumbs]') }}` in your theme's templates.

== SEO Central Pro Installation ==

Starting point after SEO Central lite plugin has been installed and activated.  

1. Navigate to https://app.seocentral.ai/ 
2. Click "Create an account" or "Login" to access the Central Cloud.
3. Once you're signed in, navigate to "Account Manager" in the top navigation.
4. Click Central Cloud then click Upgrade to Pro to purchase your pro account.
5. Enter your site domain to generate an API Key for your WordPress site.
6. On your WordPress admin dashboard, go to Plugins and click "Add New."
7. Click "Upload Plugin" and upload the SEO Central Pro .zip files.
8. Install and Activate the SEO Central Pro Plugin files to Wordpress. Not all features of the SEO Central Pro Plugin are enabled upon activation.
9. Add your generated API Key from https://app.seocentral.ai/dashboard/central-cloud to the SEO Central Dashboard field: Seo Central Api Key. To use all features SEO Central has to offer.

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

1.  [http://example.com/images/screenshot.png  SEO Central App signup]
2.  [http://example.com/images/screenshot.png  Account Manager provide domain]
3.  [http://example.com/images/screenshot.png  Account Manager files & api-key result]
4.  [http://example.com/images/screenshot.png  Pro Plugin installation]
5.  [http://example.com/images/screenshot.png  Pro plugin Activation]
6.  [http://example.com/images/screenshot.png  API key setup on Dashboard]

== Changelog ==

= 1.0 =
* Original Version 1.0.
* Starting version of SEO Central Plugin.

== Upgrade Notice ==

= 1.0 =
Upgrade notices describe the reason a user should upgrade.  No more than 300 characters.

### Other
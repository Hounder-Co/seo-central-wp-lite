=== Plugin Name ===
Contributors: (this should be a list of wordpress.org userid's)
Donate link: https://hounder.co
Tags: comments, spam
Requires at least: 1.0.1
Tested up to: 1.0.1
Stable tag: 1.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

SEO Central plugin used is for page optimiziation. Utilizing the content of a page SEO Central plugin can 
automatically generate optimized meta titles, meta descriptions, and multiple keywords that rank based on 
your content. Features include scoring and analysis of your seo with directions for improvement. 

Best practices with the SEO Central plugin:

    * Upgrade files and api key must be applied to the plugin for full use of generating SEO.  
    * Ensure page content has been saved prior to generating content. This will allow for all content on the page to be properly analyzed. 

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload `seo-central.php` to the `/wp-content/plugins/` directory

1. Activate the plugin through the 'Plugins' menu in WordPress
2. Download pro version at https://app.seocentral.ai/
3. Upload the pro files to the plugin folder `/wp-content/plugins/seo-central`
4. On the SEO Central Dashboard enter your API Key for access to optimized SEO generation. 
5. Place `<?php do_shortcode('seo_central_breadcrumbs'); ?>` or alternatively `{{ function('do_shortcode', '[seo_central_breadcrumbs]') }}` in your templates for Breadrumbs.

== Frequently Asked Questions ==

= Do I need to install the pro version to automatically generate optimized SEO? =

Yes. In order to have full access to the plugin then the pro version must be purchased and installed with the API key setup on Dashboard. 

= How do I get breadcrumbs to work? =

Within installation instructions the shortcode for shortcodes needs to be provided to your theme template files. 

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).

1.  [http://example.com/images/screenshot.png  Plugin installation]
2.  [http://example.com/images/screenshot.png  Pro version installation]
3.  [http://example.com/images/screenshot.png  API key setup]

== Changelog ==

= 1.0 =
* Original Version 1.0.
* Starting version of SEO Central Plugin.

= 0.5 =
* List versions from most recent at top to oldest at bottom.

== Upgrade Notice ==

= 1.0 =
Upgrade notices describe the reason a user should upgrade.  No more than 300 characters.

= 0.5 =
This version fixes a security related bug.  Upgrade immediately.

== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above.  This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation."  Arbitrary sections will be shown below the built-in sections outlined above.

== A brief Markdown Example ==

Ordered list:

1. Generate optimized SEO 
2. Live SEO scoring
3. Page analysis and suggestions to improve page SEO.


Here's a link to [WordPress](http://wordpress.org/ "Your favorite software") and one to [Markdown's Syntax Documentation][markdown syntax].
Titles are optional, naturally.

[markdown syntax]: http://daringfireball.net/projects/markdown/syntax
            "Markdown is what the parser uses to process much of the readme file"

Markdown uses email style notation for blockquotes and I've been told:
> Asterisks for *emphasis*. Double it up  for **strong**.

`<?php code(); // goes in backticks ?>`
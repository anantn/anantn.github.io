---
author: anant
comments: true
date: 2006-06-28 12:20:56+00:00
layout: post
slug: an-ebuild-for-repodoc-web
title: An ebuild for repodoc-web
wordpress_id: 15
---

At long last, I have managed to create an
[ebuild](http://www.kix.in/soc/repodoc/repodoc-web-0.0.1_alpha.ebuild) for
the repodoc web service and its sample client. This should help all
interested Gentoo devs in installing it and giving us feedback. If your
overlay is located at /usr/local/portage, you must first build the Manifest:
`ebuild /usr/local/portage/www-apps/repodoc-web-0.0.1_alpha.ebuild digest`.
After that, `emerge repodoc-web` should do the trick.

But that's not all. As the post-install instructions say, you must do two
more things before you can start using the service.

1. Change the first 2 define lines in validate/index.php:

``` php
define('HTDOCS', '/path/to/htdocs');
define('REPODOC', '/path/to/repodoc/executable');
```

2. Please note that the service will work well only with the latest GIT
checkout of repodoc from Ferdy's repository. The repodoc-0.0.1_beta ebuild
will still work, although the output may not be as predicted as there are
module changes between the ebuild and GIT versions.

3. You need to create the /.repodoc directory and assign its ownership to
the web server (usually 'apache' or 'nobody'). This step could not be
included in the ebuild because of access violations. This is strictly a
repodoc requirement and not related to the web-service. The repodoc team and
myself will be working on a solution for this soon.

Once you've done these two steps, you may access the client at
`http://localhost/repodoc-web`. Select a GuideXML file and click on Validate
to get a tabulated result of the validation.

Now, I'd like to point out that the system is far from perfect. There are two
basic issues that I need to tackle:

1. Eliminating the modify define lines' step since webapp.eclass knows the
location of htdocs. Also repodoc is usually at `/usr/bin/repodoc`, but this
is not entirely true if you're not using the ebuild and just the GIT version.

2. Error Handling for non GuideXML files. Trying to validate a non GuideXML
file will result in a non-helpful error message. Proper handling is necessary
here.

Well, of course these aren't the only flaws, so I'd love to hear about what
you have to say about everything!

Building the ebuild was quite tricky, considering this is the first one I've
made. The [webapp](http://www.gentoo.org/proj/en/webapps/webapp-eclass.xml)
and [depend.php](http://gunnarwrobel.de/projects/EbuildDevelopment.html)
eclasses made things a little easier. The webapp eclass was nicely
documented, and looking at other ebuilds like phpmyadmin or tikiwiki also
helped quite a bit.

On other news, I was frantically trying to finalize on a particular AJAX
toolkit. After further discussion with Stuart, who very kindly let me make
the choice, it looks like we'll go with Dojo. Although I'm not entirely sure
yet. I've seen better eye-candy with
[Echo2](http://www.nextapp.com/platform/echo2/echo/), another Java based
toolkit. Also, GWT is out because of licensing problems. Apparently, the
license states that:

> "You may not distribute Google Web Toolkit Development Tools or any services or software associated with or derived from them, or modify, copy, license, or create derivative works from Google Web Toolkit Development Tools, unless you obtain Google's written permission in advance."

Quite a day, I'm still undecided on the toolkit, but atleast I can sleep with
the comfort of having written my first ebuild. Go Gentoo!

---
author: anant
comments: true
date: 2006-06-28 06:14:23+00:00
layout: post
slug: choosing-the-right-ajax-toolkit
title: Choosing the right AJAX toolkit
wordpress_id: 982
---

So, I've been pondering over how exactly the editor is going to be
implemented. I've decided not to use any of the existing web-based WYSIWYG
editors, but rather use one of the AJAX toolkits out there to build the
whole application. I've narrowed it down to 3 choices, and here they are, in
order of my preference:

1. [Google Web Toolkit](http://replay.waybackmachine.org/20061119152147/http://code.google.com/webtoolkit/) - Yep, it's a Google product, so it should be
quite fun to
use! They have the good old swing-type widget concept here, so the main
editor would consist of a custom widget that I will extend from the basic
textarea. Yeah, if you notice, I will have to code in Java, which is not a
problem for me at all. Before you arrive at any wrong conclusions, I would
like to make it clear that GWT uses Java classes only as a base to generate
code. The end-result is pure JavaScript + XHTML that can work with any
server-side language (which in our case, is PHP). The advantages I see here
are: support for a wide variety of browsers, a good solution for the
triple-b (Browser Back Button) problem, and a robust framework to lean on.

2. [Yahoo UI Library](http://replay.waybackmachine.org/20061119152147/http://developer.yahoo.com/yui/) -  Ok, so I mentioned Google,
it would be unfair not to mention
the competition. The Yahoo UI library is damn stable and widely used (it's
not in “beta” like most of Google's products!). Rich widget library,
although building a custom editor widget here would be much tougher. Great
effects, cool CSS and design patterns to go along. Pretty much everything to
get the editor up and running.

3. [Dojo](http://replay.waybackmachine.org/20061119152147/http://dojotoolkit.org/) -
I don't know why, but this reminds me of Django. Well Dojo uses the
Moxie editor, which is to be modified to handle GuideXML instead of plain
HTML. One thing that caught my eye here was the persistent storage
functionality, that would allows users to temporarily save the document they
are editing, on the server. I'm not sure we want that feature in the editor,
but even otherwise, this toolkit is quite interesting.

Other than these 3, there is also
[Rico](http://replay.waybackmachine.org/20061119152147/http://openrico.org/rico/home.page) and [Mochikit](http://replay.waybackmachine.org/20061119152147/http://www.mochikit.com/).
This is the worst part about FLOSS, there's just too much choice!
Although my scales tip heavily towards the GWT (this being the Google
Summer of Code and all!); I plead all of you to please send me your opinion of
what toolkit would be the best fit for the project.

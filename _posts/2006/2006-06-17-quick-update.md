---
author: anant
comments: true
date: 2006-06-17 06:12:21+00:00
layout: post
slug: quick-update
title: Quick Update
wordpress_id: 978
---

A brief update on what's been happening. So, according to my  schedule, the
web service is supposed to be all ready to go, which it  is. So now onto the
next phase, Interface Design. Interesting stuff, now  this is where I get to
design all the eye-candy and decide on how  usable we want the editor to be!

No surprises here, the good old XHTML + CSS + JavaScript combination  can do
wonders. I don't think I'll need to employ anything else to get a  nice UI up
and running. I'll have to keep in mind to keep the JS open  enough for AJAX
integration later on though.

But, before I get into that, Stuart wanted an ebuild for the repodoc  web
service. Which is an awesome idea, fits into the 'Gentoo Way'™,  besides
making the installation for the web service a lot more generic  and painless.
My ebuilding skills are amateurish at best, but hey, I  think I can pull it
off. To begin with, the webapps.eclass should help  immensely. The _man _page
for that is quite informative, so I don't  thnk I'll have any trouble here.
OTOH, there is nothing much right now  to package, just 3 files.The package
would be a lot more substantial if I  wrote a client for the web service and
included that too. So I guess  I'll do that before writing the ebuild.

And my totally awesome mentor has posted a blog entry on
[Mentoring SoC Participants](http://replay.waybackmachine.org/20061119152147/http://blog.stuartherbert.com/gentoo.php/2006/06/15/thoughts_on_mentoring_soc_participants)!
I'm very glad to be working with a mentor who puts so much thought into his
work, thanks Stuart!

That's about it, stay tuned for updates on the ebuild and the UI. Cheers!

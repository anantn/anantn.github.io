---
author: anant
comments: true
date: 2008-07-17 08:03:18+00:00
layout: post
slug: weeks-8-9-load-balancing-oauth
title: 'Weeks 8 & 9: Load balancing, OAuth'
wordpress_id: 1129
---

So, after a fun July 4 weekend at Atlanta (which comprised of visits to [white water](http://replay.waybackmachine.org/20080928114646/http://www.sixflags.com/whitewater/index.aspx) and [stone mountain](http://replay.waybackmachine.org/20080928114646/http://www.stonemountainpark.com/), not to mention quality time with family and some amazing mini-golf), it was back to work.

Week 8 was mostly consolidating the server-side, as post 0.2 releases of Weave increased the number of active users. We needed to make sure we can scale well (one of the main reasons why WebDAV was chosen as a data store), so Chris and I came up with a few quick-fixes.

Tip 1: If you have a large number of files or directories in a single directory, consider splitting them into buckets. We put usernames with the same first letter in a directory, sourceforge takes it a step further by creating one-letter directory names and then two-letter ones in them.

Tip 2: There's only so much load one server can handle. Get another one and load-balance ;)

Ok, I admit the second tip was not really a tip.

Building scalable web applications is definitely a hard problem; which is why we have some amazing technology like [Amazon EC2](http://replay.waybackmachine.org/20080928114646/http://www.kix.in/blog/aws.amazon.com/ec2) and [Google App Engine](http://replay.waybackmachine.org/20080928114646/http://code.google.com/appengine/). Hacking up a quick PHP script to do something is one thing, making sure a million users can use it simultaneously is another. Which is why working at the Mozilla Labs has exposed me to an entirely different way of looking at things - sure, it works now - but will it work when thousands of people bang on it? I'm loving it here.

One of the other important aspects of Weave that has been doing the rounds is that of data sharing. Sharing your bookmarks with a friend is cool, but sharing your browsing history or bookmarks with a third party web service can potentially lead to some awesome mashups and services.

To maintain the integrity of your (encrypted) data, we need data sharing with third parties to work in a secure way. [OAuth](http://replay.waybackmachine.org/20080928114646/http://oauth.net/) is an open protocol to share personal data with services, and we think it'd be an excellent choice for Weave.

This week, I'm looking into the OAuth spec and coming up with a suitable implementation for Weave. This will also potentially tie-in to the web client ([previewed](/2008/06/07/week-3-web-client-for-weave/) earlier) - you could authorize your own web server (on which you setup the web client) to access your data and decrypt it server-side to make the client a lot more faster, while losing none of the security.

On a different note, if you haven't read Jono's post on software development and UIs yet, [DO IT NOW](http://replay.waybackmachine.org/20080928114646/http://jonoscript.wordpress.com/2008/07/17/these-things-i-believe/). Definitely one of the best posts I've seen around the blogosphere in a while.

Well, back to discussing fun - we interns had a basketball match with the full-timers today. And there's more to come: some of us have tickets to the opening of [The Dark Knight](http://replay.waybackmachine.org/20080928114646/http://thedarkknight.warnerbros.com/) tomorrow, followed by the Intern BBQ on Friday (co-incidentally, also my 21st birthday). As if that weren't enough, I'm going to Los Angeles to catch [Russell Peters](http://replay.waybackmachine.org/20080928114646/http://www.thegroveofanaheim.com/events/show.aspx?ID=1368) on Saturday, and maybe spend Sunday at Disneyland.

And then, there's the [summit](http://replay.waybackmachine.org/20080928114646/http://wiki.mozilla.org/Summit2008), no saying what we're in for ;)

---
author: anant
comments: true
date: 2008-11-27 14:46:01+00:00
layout: post
slug: glendix-on-the-web
title: Glendix on the Web!
wordpress_id: 304
categories: [plan9]
---

[Glendix](http://glendix.org/) has been making the rounds on the web lately, with coverage from [OSNews](http://www.osnews.com/story/20588/Glendix_Bringing_the_Beauty_of_Plan_9_to_Linux), [Reddit](http://www.reddit.com/r/programming/comments/7fs3g/glendix_aims_to_combine_the_plan_9_userspace_with/), and even a Russian site, [Linux.org.ru](http://www.linux.org.ru/view-message.jsp?msgid=3285997). It's really motivating to see some buzz around the project, giving me the extra boost needed to push the completion of a usable release!

Some of the major obstacles that have to be crossed before making a beta-quality release are the completion of critical synthetic filesystems - especially `/net` and `/draw`. We also have to work out the kinks with per-process namespaces and union mounts. I don't know if we'll be able to get Rio running as a WM before an official release; if not, [Plan9Port](http://swtch.com/plan9port/)'s Rio and [WMII](http://www.suckless.org/wmii/) are good candidates.

The biggest criticism of Glendix seems to be the reasoning that Plan9 user-space tools are somehow superior to their GNU counterparts, and several people have asked us to substantiate our claims. At this point, however, I don't think that it is really important, or even relevant. Even if Plan9 user-space tools aren't somehow better - I think it is generally a refreshing idea to see Linux combined with a user-space other than GNU.

We're at [FOSS.IN](http://foss.in/2008/) this year, where a large number of kernel developers have [gathered](http://foss.in/2008/news/lkh-lightning-talks-and-workout.html); and I hope to get some of their valuable input on the problems Glendix currently faces, and maybe even write some code to solve them.

Thanks for all the community support and critical comments, they are all very vital feedback for the project and are much appreciated!

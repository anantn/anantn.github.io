---
author: anant
comments: true
date: 2007-08-22 07:16:16-07:00
layout: post
slug: say-hello-to-angled-0-1
title: Say Hello to Angled 0.1!
wordpress_id: 1081
---

I feel like I'm in the seventh heaven. After a few sleepless nights struggling with Mozilla's XPCOM, I finally got the 9P Firefox plugin to work.

The plugin is called Angled (an anagram of [Glenda](http://replay.waybackmachine.org/20070911164007/http://plan9.bell-labs.com/plan9/glenda.html), the Plan 9 bunny) and is in a pretty simplistic state right now: you can read any files served by 9P right in your browser window. Let's take a step by step look.

First I startup [Inferno](http://replay.waybackmachine.org/20070911164007/http://www.vitanuova.com/inferno/) to start a 9P server. `${INFERNO}/usr/anant/home` is symlinked to my actual home directory, `/Users/anant`:

{% highlight bash %}
$ emu
; runas nobody {listen -A tcp!localhost!1564 {export /usr/anant/home &}}
{% endhighlight %}

Let's see what files are actually there:

{% highlight bash %}
[theghost web9]$ pwd
/Users/anant/Plan9/web9
[theghost web9]$ ls
README TODO js9p php9p
{% endhighlight %}

Alright, I open my browser window and type `ninep://localhost!1564/Plan9/web9/README` into the address bar. I could also say `tcp!localhost!1564`, but TCP is the only protocol available for Angled, so it would be redundant.

Cool! But wait, Angled also displays binary files right in the browser. There's a catch though, it will only work for binary files that can be viewed directly in the browser window. Certain types of files (.doc for example) do trigger a download request, but then become corrupted for some reason.

{% highlight bash %}
[theghost content]$ pwd
/Users/anant/Plan9/web9/js9p/angled/content
[theghost content]$ ls
angled.png firefoxOverlay.xul glenda-error.png overlay.js
{% endhighlight %}

Let's say I want to view `angled.png`. Here's what I get:

Okay, but what if you type in a URL that points to an invalid file? Check this out:

Sweet! I'm yet to figure out how to transmit the exact error message to that page, so you'll have to make do with that generic image for now.

Okay, now onto the bad parts. Angled doesn't support authentication yet (although the base JS implementation is capable of generating and parsing auth messages). Next, you won't get directory listings (you'll get a bunch of binary gibberish which is actually Rstat messages for the directory's contents). Also, I'm doing the 9P connection and transactions in a blocking thread, so the UI freezes while all that is done. I couldn't feel the difference since I was testing on my local 9P server, but connecting to remote 9P servers won't be a pleasant experience. The solution to this is to create a custom nsIChannel implementation, which is a lot of work... I'll do it when I get to it.

Enjoy!






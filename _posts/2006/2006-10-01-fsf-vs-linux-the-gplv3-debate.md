---
author: anant
comments: true
date: 2006-10-01 06:25:29+00:00
layout: post
slug: fsf-vs-linux-the-gplv3-debate
title: FSF vs. Linux - The GPLv3 Debate
wordpress_id: 998
categories: [gnu]
---

It was quite amusing to read about how the Kernel developers were
[against adopting GPLv3](http://lwn.net/Articles/200422/).
It created quite a buzz amongst the FSF and Open Source communities, with a
[news report](http://replay.waybackmachine.org/20061106071711/http://www.linux-watch.com/news/NS5561540450.html)
going as far as saying: "GPLv3 could kill open
source, top Linux dev's warn"! The FSF then posted a
[clarification](http://replay.waybackmachine.org/20061106071711/http://www.fsf.org/news/gplv3-clarification)
on the issue. Apparently the Kernel devs had misinterpreted the intentions of the license.

The debate is however far from over. Linus maintains that Linux will remain
under GPLv2, they had made that choice ages ago, when they removed the "or
later" clause from their licensing terms. Their argument is that when there
is nothing wrong with the GPLv2, why switch? Switching licenses for a
project as large as the Kernel is also poses a practical problem; they would
have to get consent from the thousands of people who have ever contribuuted
to the sources.

The FSF is pretty quiet about the issue, with a "take it or leave it"
kind-of approach. It seems as if Stallman really doesn't care whether Linux
adopts GPLv3 or not!

The debate has basically fragmented itself into several issues. One such
issue is the extent to which the FSF is against DRM. The Kernel hackers are
largely of the opinion that DRM is not entirely evil, as the FSF claims it
to be: "it all depends on the context; DRM can be used for good too". This
debate also raises the rift between the "Free Software" and "Open Source"
camps. Here's what Linus had to
[say](http://lkml.org/lkml/2006/9/25/161) about that:

> The whole "Open Source" renaming was done largely _exactly_ because people wanted to distance themselves from the FSF. The fact that the FSF and it's followers refused to accept the name "Open Source", and continued to call Linux "Free Software" is not _our_ fault. Similarly, the fact that rms and the FSF has tried to paint Linux as a GNU project (going as far as trying to rename it "GNU/Linux" at every opportunity they get) is their confusion, not ours.

Ah, well. The latest debate is over the "extremist" nature of Stallman.
Linus called Stallman an extremist, while others believe that he is just a
person with very strong ideals who is willing to go to any lengths to
protect them. Somewhere in the middle, the issue of whether Stallman was a
"commie" came into the picture. This
[latest post](http://article.gmane.org/gmane.linux.kernel/450668/match=gplv3)
from Linus tells us the story of how things were in the "good old days":
how the FSF and Open Source camps actually came into being.

It'll be damn interesting to see where this goes as the GPLv3 draft gets
closer to completion. Catch all the hot geek-on-geek action on our very own
[linux-kernel](http://thread.gmane.org/gmane.linux.kernel/448894/)
mailing list!

On a totally unrelated note, I also came to know that the
[MadWifi](http://replay.waybackmachine.org/20061106071711/http://madwifi.org/)
drivers I use actually taint the Kernel. I found this interesting
[page](http://replay.waybackmachine.org/20061106071711/http://madwifi.org/wiki/HAL)
on the MadWifi-Wiki, which states the reason why the HAL module that
MadWifi uses is closed source. Looks like Atheros doesn't want to make the
HAL module open source because then, we would be capable of using our Wifi
cards to transmit at frequencies we aren't supposed to legally. What say
you, FSF?

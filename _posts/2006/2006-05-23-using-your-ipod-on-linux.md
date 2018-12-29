---
author: anant
comments: true
date: 2006-05-23 06:06:19+00:00
layout: post
slug: using-your-ipod-on-linux
title: Using your iPod on Linux
wordpress_id: 971
categories: [gnu]
---

It's pretty bad that Apple doesn't give a version of iTunes for GNU/Linux.
Not surprising though, considering Google, which in-spite of sponsoring
stuff like the Summer of Code does not provide any of its software for
GNU/Linux either!

So I set out on my endeavour to somehow get some MP3's playing on the brand
new iPod. First try was YamiPod, because it supported last.fm. Alas, it just
didn't work. In an effort to be extremely user-friendly, the makers of
YamiPod completely forgot usability. I just couldn't get it to detect my
iPod. In all fairness to them, they probably expected the iPod to have been
used before, which was not true in my case.

Leslie's recommendation, gtkpod, however makes no such assumption. Upon
running the software it automatically created a `/mnt/ipod` directory. When I
plugged in my iPod, it didn't mount it though. That wasn't such a big
problem. After a simple `mount /dev/sdb2 /mnt/ipod` (it's sdb2 for the iPod
Nano, sdb1 is the system partition where all the firmware is), all I had to
do was File->Create iPod's directories, and I was good to go!

I then added some MP3's using the nice UI and then synced the list. After a
few minutes of data transfer (USB2.0), I unmounted the iPod and then… music
to my ears! Pretty simple, at-least much simpler than what I expected it to
be.

Another word of advice. When you plugin your iPod, it will continue flashing
"Do not disconnect" even if it is unmounted. The trick here is to use the
`eject` command: `eject /dev/sdb`.

gtkpod and eject were available on the Gentoo Portage tree by the way, which
made the process even more awesome. The only thing missing was the last.fm
plugin. Which I should probably spend a few days in making anyway.

So for anyone wanting to use their iPod with Linux, I'm all for gtkpod.
Thanks to Leslie and of course, the gtkpod team!

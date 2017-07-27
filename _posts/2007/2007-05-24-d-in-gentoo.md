---
author: anant
comments: true
date: 2007-05-24 06:46:54+00:00
layout: post
slug: d-in-gentoo
title: D in Gentoo
wordpress_id: 1037
---

Hiya! This is probably the first post that will appear on Planet Gentoo since I last posted on the Gentoo SoC Planet - so I'd like to say hello to all my fellow developers and the all the awesome Gentoo users out there!

Now that the greetings are out of the way, the real topic of this post is to introduce you to the new D system in Gentoo. [D](http://replay.waybackmachine.org/20070607083037/http://www.digitalmars.com/d/) was introduced to portage recently with the introduction of the `d` USE flag for GCC and the dmd-bin ebuild. This provides you with GDC 0.23 and DMD 1.014 respectively and both of them use the standard Phobos library. You can have both the packages simultaneously on a system, no slotting is required, no executable names clash.

I also added support for using the [Tango](http://replay.waybackmachine.org/20070607083037/http://www.dsource.org/projects/tango) standard library instead of phobos - the ebuilds can be found in my [overlay](http://replay.waybackmachine.org/20070607083037/http://overlays.gentoo.org/dev/anant). Full instructions for building DMD with Tango can be found [here](http://replay.waybackmachine.org/20070607083037/http://www.dsource.org/projects/tango/wiki/GentooLinux). The Tango ebuild also supports replacing phobos for GDC, but hasn't been enabled yet since I want to double-check with the toolchain ninjas that I'm doing everything correctly first!

Enjoy!

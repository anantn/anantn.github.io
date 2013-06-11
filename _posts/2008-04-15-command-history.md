---
author: anant
comments: true
date: 2008-04-15 04:55:31-07:00
layout: post
slug: command-history
title: Command History
wordpress_id: 195
---

Looks like everyone's doing one of these around the blogosphere lately, so I'm joining in the fun:

{% highlight bash %}
[theghost ~]$ uname -a
Darwin theghost.local 9.2.2 Darwin Kernel Version 9.2.2:
Tue Mar 4 21:17:34 PST 2008;
root:xnu-1228.4.31~1/RELEASE_I386 i386
{% endhighlight %}

{% highlight bash %}
[theghost ~]$ history|awk \
  '{a[$2]++ } END{for(i in a){print a[i] " " i}}'|sort -rn|head
118 ls
81 cd
61 hg
39 exit
29 vi
24 ssh
24 mate
23 grep
19 rm
9 wget
{% endhighlight %}

And for the Linux virtual machine:

{% highlight bash %}
anant@tg-nix ~ $ uname -a
Linux tg-nix 2.6.24-gentoo-r1
#32 SMP Sun Apr 13 09:15:20 IST 2008
i686 Genuine Intel(R) CPU T2600 @ 2.16GHz GenuineIntel GNU/Linux

anant@tg-nix ~ $ history|awk \
  '{a[$2]++ } END{for(i in a){print a[i] " " i}}'|sort -rn|head
142 ls
88 cd
83 sudo
48 vi
33 emerge
30 exit
8 rm
8 mv
7 startx
7 cmake
{% endhighlight %}

I'm going to leave it for you to figure out what `mate` is ;)

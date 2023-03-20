---
layout: post
comments: true
category: favorite
slug: introducing-thinmusic
title: Introducing ThinMusic
categories: [tech, favorite]
---

At the peak of my career as a software engineer, I spent most of my free time either playing video games or reading books about engineering management. These days, my day job is mostly engineering management, and so I find myself carving out play-time to write some code (and of course, still indulge in video games).

A result of that play-time over this winter break merits broader sharing than my usual side project. I built a web player for Apple Music, [called ThinMusic](https://www.thinmusic.com), to scratch two of my itches:

1. As an Apple Music subscriber, I had no way to play songs on my Linux desktop.
2. Scrobbling my play history on Apple Music to [last.fm](http://last.fm) has never worked reliably.

The latter point irked me quite a bit (given I've been scrobbling consistently since 2006 or so), but not enough to switch to Spotify which supports scrobbling natively (worth mentioning that Apple Music's family plan is best in the industry especially with international family members, adding additional inertia).

However, at this year's [WWDC](https://developer.apple.com/videos/wwdc2018/), Apple announced [MusicKit JS](https://developer.apple.com/documentation/musickitjs) which was quite intriguing on its own, but also opened the doors to kill these two birds with one stone. Thus, ThinMusic was born:

![ThinMusic Screenshot](/images/2018/thinmusic.png)

ThinMusic requires an Apple Music subscription (and a Facebook account so it can store the authentication tokens securely). It supports all the basic features of a music player and works on any modern browser. It is also optimized for desktop use, since on mobile devices you're probably better off with Apple Music's native app (available on both iOS and Android). You can use it on mobile if you really want, but be warned the experience is not as good (mostly due to my laziness to optimize the layout and make a real responsive design).

As an added bonus, it appears this might be a good way to play songs on the [Portal](https://portal.facebook.com), since the [Apple Music skill for Alexa](https://support.apple.com/en-in/HT209250) doesn't work on it yet:

![ThinMusic on Portal](/images/2018/thinmusic-portal.png)

Just open the browser app, navigate to [thinmusic.com](https://www.thinmusic.co) and login. Since it is running inside the browser, there is no support for voice control (and who wants to type for extended periods on the Portal), but if you just want to queue up a playlist quickly, this setup can work pretty well.

If you're an Apple Music subscriber, give ThinMusic a whirl and email [support@thinmusic.com](mailto:support@thinmusic.com) with your questions or suggestions!

---
author: anant
comments: true
date: 2009-07-17 05:43:54-07:00
layout: post
slug: audio-recording-in-the-browser
title: Audio Recording in the Browser
category: favorite
---

I'm really excited to announce a new feature in [Jetpack 0.4](http://web.archive.org/web/20090720113039/https://addons.mozilla.org/en-US/firefox/addon/12025) – Audio Recording. "Jetpacks" can now access the microphone with just a few simple lines of Javascript:

{% highlight js %}
jetpack.future.import('audio');
jetpack.audio.recordToFile();
var path = jetpack.audio.stopRecording();
{% endhighlight %}

The result is an audio file encoded in [Ogg/Vorbis](http://xiph.org/vorbis/), which you can then playback with `jetpack.audio.playFile()`, or if you choose to upload the file to a remote location, using the `<audio>` tag.

A sample Jetpack I came up with that uses this feature is [Voice Memos](http://web.archive.org/web/20090720113039/http://hg.mozilla.org/labs/jetpack/raw-file/tip/website/demos/audio.js). It lets you record a memo that is mapped to the page you were on when you recorded it (which is achieved using [Simple Storage](https://wiki.mozilla.org/Labs/Jetpack/JEP/11)), and also displays a list of recorded memos in a [SlideBar](http://web.archive.org/web/20090720113039/https://wiki.mozilla.org/Labs/Jetpack/JEP/16). If you revisit a page attached to a memo, you will be notified via the SlideBar.

The code to achieve this was written in a couple of days, but I spent the better part of last week trying to build the component on Windows. The Mac/Linux versions seem to (mostly) run without issues, but Windows support is a little flaky at the moment. Part of the problem is that the XPCOM component dynamically links against [portaudio](http://web.archive.org/web/20090720113039/http://www.portaudio.com/) and [libsndfile](http://web.archive.org/web/20090720113039/http://www.mega-nerd.com/libsndfile/), after which [DLL Hell](http://en.wikipedia.org/wiki/DLL_hell) ensues. We're looking to resolve these issues in upcoming releases as well as reducing the size of the XPIs.

One of my future goals is to allow raw PCM streaming rather than just recording to a file so you can do cool things like manipulating audio on the fly.

In the meantime, do play around with this feature - we'd love to know what you think! The JEP for Audio support can be found [here](https://wiki.mozilla.org/Labs/Jetpack/JEP/18), and there's a [group](http://web.archive.org/web/20090720113039/http://groups.google.com/group/mozilla-labs-jetpack/topics) for Jetpack-related discussion.

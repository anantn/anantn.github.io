---
layout: default
title: Anant Narayanan | Home
---

<span class="marginnote">
<img src="/images/avatar.jpg" alt="Avatar" />
The opinions expressed on this website are solely my own and do not reflect the views or opinions of any other party,
including my current and former employers.
</span>

Hello, my name is Anant Narayanan, and you've reached my small slice of the web!

I'm a software engineer by trade, and love using technology to solve problems in people's lives.

You may want to check out some of my most popular [blog posts](/blog) or the [full archive](/archive). Perhaps you'd like to download slides for, or view, a [talk I've given](/talks).

This page also includes brief summaries of my involvement with various software organizations over the years: [Facebook](#facebook), [Ozlo](#ozlo), [Firebase](#firebase), [Mozilla](#mozilla), [Plan 9](#plan9), [Google Summer of Code](#gsoc), [PHP](#php), [Gentoo](#gentoo), and [GNU](#gnu).

<div class="org">

## <a name="facebook"></a> Facebook (2017-)

![Facebook](/images/projects/facebook.svg){: class="prose"}

<div class="prose">
I'm currently employed by Facebook, working on AR/VR and knowledge graph efforts at the company.
<br/>

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [Enterprise Scale Knowledge Graphs](/talks#2018-kg)
</div>

</div>

## <a name="ozlo"></a> Ozlo (2014-2017)

![Ozlo](/images/projects/ozlo.png){: class="prose"}

<div class="prose">
I was an early employee at Ozlo, a startup focused on building an AI-powered digital assistant.
My main area of focus was building large scale data pipelines to build a structured model of the world for the assistant to utilize. Ozlo was acquired by Facebook in 2017.

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [Building an Intelligent Assistant](/talks#2017-assistant)
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'ozlo' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="firebase"></a> Firebase (2012-2014)

![Firebase](/images/projects/firebase.png){: class="prose"}

<div class="prose">
As an early employee at Firebase, I ran the developer evangelism, support, and framework integration efforts. I authored the original version of [AngularFire](https://github.com/angular/angularfire), among other JS framework integrations like Ember and React.

I also prototyped the first version of [static hosting](https://firebase.google.com/docs/hosting/) during a hack week, which is still a core part of the Firebase offering. Firebase was acquired by Google in 2014, integrated into Google's cloud services portfolio.

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [Building Realtime Apps with Angular and Firebase](/talks#2014-jsconf) ,  [Building JS APIs for Browsers](/talks#2013-jsapi) , [Message Passing vs. Data Synchronization](/talks#2013-message2) ,  [Realtime Web Apps with Firebase and AngularJS](/talks#2013-angularfire) , [Firebase: Tales from the Trenches](/talks#2013-firebase) and [Server-less Apps](/talks#2013-serverless)
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'firebase' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="mozilla"></a> Mozilla (2008-2012)

![Mozilla](/images/projects/mozilla.png){: class="prose"}

<div class="prose">
Mozilla holds a special place in my heart: they were my gateway into Silicon Valley. I worked on a number of Mozilla projects in various capacities, first as a volunteer, then as an intern, and finally as a full-time employee for [Mozilla Labs](https://labs.mozilla.org/).

Perhaps my most significant contribution while at Mozilla was [WebRTC](https://webrtc.org/), where I served as Mozilla's rep to the W3C and IETF during standardization efforts. I was co-editor for two W3C specifications: ["WebRTC"](https://www.w3.org/TR/webrtc/) as well as ["Media Capture and Streams"](https://www.w3.org/TR/mediacapture-streams/). Additionally, I led implementation efforts for _getUserMedia_ in Firefox. Interestingly, this may also have been my most impactful contribution in the industry to date: WebRTC is in very wide use, ranging from [Messenger](https://webrtchacks.com/facebook-webrtc/) to [Discord](https://blog.discordapp.com/how-discord-handles-two-and-half-million-concurrent-voice-users-using-webrtc-ce01c3187429), a significant portion of internet video/audio calling traffic uses parts or whole of the WebRTC spec and codebase.

I also spent a lot of my time working on various parts of [Firefox Sync](https://www.mozilla.org/en-US/firefox/accounts/), which was still called "Weave" during incubation at Mozilla Labs. Sync is a privacy-first browser data synchronization solution. Aside from this, I made minor contributions to other active Mozilla Labs projects at the time, which included the Mozilla [web app marketplace](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/Marketplace) and [Persona](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/Persona) (a decentralized identity and sign-in solution).

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [WebRTC: A Practical Introduction](/talks#2013-webrtc2) , [WebRTC: An Overview](/talks#2013-webrtc1) , [Error Handling in WebRTC](/talks#2012-webrtc-error), [WebRTC Demystified](/talks#2012-webrtc-demystified) , [Apps for Firefox OS](/talks#2012-firefoxos), [WebRTC: User Security &amp; Privacy](/talks#2011-webrtc-security) , [Firefox Architecture Overview](/talks#2011-firefox-architecture) , [Mozilla Weave](/talks#2009-weave) , [about:labs](/talks#2009-about-labs) , [Innovating with Mozilla Labs](/talks#2008-mozilla-labs) and [Mozilla Project Day: XPConnect](/talks#2007-xpconnect)
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'mozilla' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="plan9"></a> Plan 9 (2006-2010)

![Plan 9](/images/projects/plan9.png){: class="prose"}

<div class="prose">
I was enraptured by Plan 9 ever since I first heard of it: the idea of an operating system built for the networked world, and designed by the creators of Unix (who had surely learned a lesson or two from it), was too enthralling to ignore. I host a [page on this site](/plan9) with more information and links if you're interested. Here is another [short write-up](http://www.catb.org/esr/writings/taoup/html/plan9.html) on Plan 9 by esr, the article also includes links to a little bit of history regarding UTF-8, which was invented for the OS.

I've tinkered with Plan 9 in a few different ways. The biggest endeavor was probably [Glendix](http://glendix.org), a set of Linux kernel modules that enables the execution of Plan 9 "a.out" binaries natively. It isn't maintained anymore &mdash; [plan9port](https://github.com/9fans/plan9port) is a much more practical way to run Plan 9 programs on modern UNIXes &mdash; but the code is probably instructive to anyone interested in understanding how to write Linux kernel modules or execution formats (like Plan 9's a.out) at the lowest level.

I was also lucky enough to work with [Sape Mullender](https://www.diversiorum.org/sape/) at Bell-Labs, Antwerp on making improvements to the 9P network protocol. This resulted in a thesis and protocol implementation of what we called [πp](https://proness.kix.in/misc/πp-v2.pdf).

One of the nice side effects of being involved in the Plan 9 community was following the adventures of [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson), [Rob Pike](https://ai.google/research/people/r) and [Russ Cox](https://swtch.com/~rsc/), who all eventually ended up at Google and made [Go](https://golang.org/). Unsurprisingly, Go borrows many ideas from Plan 9, a language I use almost exclusively for all my personal and professional projects these days.

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [πp](/talks#2010-piep) , [Glendix: The Why and The How](/talks#2008-glendix) , [Unix++: Plan 9 from Bell Labs](/talks#2007-plan92) and [Introducing Plan 9](/talks#2007-plan91)
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'plan9' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="gsoc"></a> Google Summer of Code (2006-2009)

![Google Summer of Code](/images/projects/gsoc.png){: class="prose"}

<div class="prose">
Google's Summer of Code program was the first time I was paid to write software, open source no less! It was a very exciting opportunity and experience. I participated in 2006 and 2007 as a student, working on projects for [Gentoo](https://developers.google.com/open-source/gsoc/2006/#gentoo) and [Plan 9](https://developers.google.com/open-source/gsoc/2007/#p9).

In 2008 and 2009, I mentored four student projects: [Setting Beacon Afloat](https://developers.google.com/open-source/gsoc/2008/#gentoo), [PHP Bindings for Cairo](https://developers.google.com/open-source/gsoc/2008/#php), [Web-based Image Builder](https://www.google-melange.com/archive/gsoc/2009/orgs/gentoo/projects/eitan.html), and [Implement per-process Namespaces](https://www.google-melange.com/archive/gsoc/2009/orgs/plan9/projects/psharma.html).

The Summer of Code is a wonderful program and I'm very grateful to Google for having run it and keeping it going for all these years. If you are eligible and interested in software development or open source, I highly [recommend applying](https://summerofcode.withgoogle.com/archive/)!

<div class="also">
_See also:_
<br/>
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'gsoc' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="php"></a> PHP (2006-2008)

![PHP](/images/projects/php.png){: class="prose"}

<div class="prose">
[PHP-GTK](http://gtk.php.net/) was my first foray into open source. It initially caught my eye while trying to build a UI application for my university, and I eventually ended up contributing tutorials and documentation for the project.

I am so grateful to the maintainers of the project: [Christian Weiske](https://cweiske.de), [Andrei Zmievski](http://zmievski.org/about/), [Steph Fox](https://uk.linkedin.com/in/stephfox), and [Scott Mattocks](https://www.linkedin.com/in/scottmattocks/). I couldn't have asked for a better set of people to onboard me into the world of open source and professional programming more broadly.

<div class="also">
_See also:_
<br/>
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'php' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="gentoo"></a> Gentoo Linux (2006-2007)

![Gentoo Linux](/images/projects/gentoo.png){: class="prose"}

<div class="prose">
[Gentoo](https://gentoo.org/) was my primary choice of Linux distribution for many years. I eventually waded into helping out by maintaining a few packages, and writing a web-based editor for GuideXML, Gentoo's documentation format.

I owe a lot of my understanding of Linux to Gentoo. I would still recommend anyone interested in the operating system to install Gentoo atleast once, you learn so much because the distribution doesn't hide the internals from you. To this day, I wince slightly when installing new "binaries" on my computers &mdash; on Gentoo you compile everything from source &mdash; how can you really trust binaries built by someone else on their computers?

Over time, I found myself with lesser free time, so the practicality of Ubuntu on the Desktop and a Macbook Pro on-the-go eventually won over.

<div class="also">
_See also:_
<br/>
<img class="inline" src="/images/talks.svg" alt="Talks" /> [Making Gentoo Tick](/talks#2007-gentoo)
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'gentoo' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

## <a name="gnu"></a> GNU (2006-2007)

![GNU](/images/projects/gnu.svg){: class="prose"}

<div class="prose">
After contributing code for proper signal handling in [GNU Parted](https://www.gnu.org/software/parted/), I was briefly the maintainer of the project for a little over a year. Parted is a partition manager and is widely used on most Linux distributions, notably in the default installer for Ubuntu.

Thanks are due to [Leslie Patrick Polzer](https://wiki.debian.org/LesliePolzer) for his encouragement and help with my involvement in the project.

<div class="also">
_See also:_
<br/>
<ul>
<li><img class="inline" src="/images/blog.svg" alt="Blog" /></li>
{% for post in site.posts %}
{% if post.categories contains 'gnu' %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>

</div>

</div>

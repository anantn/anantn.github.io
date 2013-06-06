---
author: anant
comments: true
date: 2006-07-01 05:33:43-07:00
layout: post
slug: ajax-toolkit-shootout
title: AJAX Toolkit Shootout
wordpress_id: 16
---

[Stuart](http://www.stuartherbert.com/) inspired me to do an objective
evaluation of all the toolkits out there and then make a choice. So, here it
is, my personal evaluation and reasons for choosing what I chose!

<table border="1" width="100%">
<tbody>
  <tr>
    <td><strong>Toolkit</strong></td>
    <td><strong>License</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Pros</strong></td>
    <td><strong>Cons</strong></td>
  </tr>
  <tr>
    <td><a href="http://code.google.com/webtoolkit/">Google Web toolkit</a></td>
    <td>Custom</td>
    <td>Java &#8211; Integrated AJAX Library</td>
    <td>Great widget set, easily extensible, it&#8217;s from Google!</td>
    <td>Java based, no pretty visual effects, Bad license</td>
  </tr>
  <tr>
    <td><a href="http://developer.yahoo.com/yui/">Yahoo UI Library</a></td>
    <td>BSD</td>
    <td>Javascript &#8211; UI Library</td>
    <td>Widely used, vast widget library, great support</td>
    <td>CSS does not validate, Some browser quirks</td>
  </tr>
  <tr>
    <td><a href="http://www.dojotoolkit.org/">Dojo</a></td>
    <td>AFL/BSD</td>
    <td>Javascript &#8211; Integrated AJAX Library</td>
    <td>Popular, Good mix of effects and widgets</td>
    <td>Doesn&#8217;t work on Opera, Skimpy documentation</td>
  </tr>
  <tr>
    <td><a href="http://www.nextapp.com/platform/echo2/echo/">Echo2</a></td>
    <td>Mozilla/LGPL</td>
    <td>Java &#8211; Effects and UI library</td>
    <td>Fantastic widget set and eye-candy, Smooth rendering</td>
    <td>Java based, No control on JS</td>
  </tr>
  <tr>
    <td><a href="http://www.openrico.org/">OpenRICO</a></td>
    <td>Apache 2.0</td>
    <td>Javascript &#8211; Integrated AJAX Library</td>
    <td>Good balance between JS effects and AJAX functions, Smooth &#8220;Behaviour&#8221;</td>
    <td>NIL documentation, making it hard to learn</td>
  </tr>
  <tr>
    <td><a href="http://www.mochikit.com/">MochiKit</a></td>
    <td>AFL/MIT</td>
    <td>Javascript &#8211; Integrated AJAX Library</td>
    <td>Comprehensive docs/demos, Extremely well thought-out, Programmer Friendly</td>
    <td>Very Basic library, Some visual effects broken</td>
  </tr>
  <tr>
    <td><a href="http://script.aculo.us/">Script.aculo.us</a></td>
    <td>MIT Style</td>
    <td>Javascript &#8211; Integrated AJAX and UI Library</td>
    <td>Excellent set of effects and widgets, Backed by Ruby on Rails</td>
    <td>Skimpy AJAX function set</td>
  </tr>
  <tr>
    <td><a href="http://www.cross-browser.com/toys/">The X Library</a></td>
    <td>LGPL</td>
    <td>Javascript &#8211; Effects and UI Library</td>
    <td>Simply the best effects library</td>
    <td>Not a great UI library, Slightly heavy in size</td>
  </tr>
</tbody>
</table>

Okay, so that's the brief summary. I haven't included
[prototype](http://prototype.conio.net/) in the list because its too
fundamental and a lot of the toolkits are actually based on it. I also have
probably missed many more toolkits, but these were the ones that caught my
eye.

The main factors that we kept in mind while making the choice were:

* **License**. It is important for the toolkit to have an open license that
falls within the limits of the Gentoo Social Contract.

* **Infrastructure**. The toolkits' deployment requirements must be
something that the Gentoo-Infra team can provide.

* **Documentation**. It shouldn't take a long time to learn the toolkit
itself. One of the important requirements of the project is rapid prototyping
since the UI forms a core component of the editor.

* **Stability & Support**. The chosen toolkit should obviously not be one
that is dead. It is important for the toolkit to be stable, and under active
development; since the application may be used by hundreds of people.

* **Features**. Of course, the stuff that the toolkit offers should match
with what we require. Ideally, it shouldn't offer anything more nor less.

Based on the above, all Java based tollkits are out. The GWT has a
particularly restrictive license. I wasn't too comfortable YUI because it
wouldn't validate. I ruled out Dojo because it wouldn't work in Opera. I am
not too particular about the application working on IE, but I would expect it
to work smoothly in Firefox and Opera at the very least. I started out with
OpenRICO but then realised that I'm spending too much time finding out what
functions it offers.

MochiKit offers most of the effects that script.aculo.us has, besides being
one of the most awesome toolkits out there. One look at its documentation,
and I knew this was it. It's very programmer friendly, and work exactly like
how you expect it too. MochiKit forms a very nice abstraction layer over JS
to hide all the gory browser quirks. Its visual library however, is a bit
broken, basic functions such as Move' or Scale' are broken, although they're
working on it for 1.4.

I couldn't not use MochiKit just because of its Visual Effect backdraw, the
other stuff that it offers are just too amazing too miss. So here's where the
X library comes in. I believe MochiKit and the X Library to perfectly
complement each other; use MochiKit for the Model and Event Handling, while
leaving X to do all the jazzy stuff. It's working out quite well uptil now,
although ideally I would prefer to use MochiKit alone (If only the Move'
function would work!). But then, X is quite amazing too, and its fun to use
both the toolkits.

So that's that, I'm going to go ahead with MochiKit and the X Library. More
on how the UI is going to turn out later.

(If you're looking for the right AJAX toolkit to use for your application,
I'd suggest you start your search with MochiKit. There are also good listings
at [OSAF](http://wiki.osafoundation.org/bin/view/Projects/AjaxLibraries) and
[AJAX Patterns](http://ajaxpatterns.org/Frameworks))

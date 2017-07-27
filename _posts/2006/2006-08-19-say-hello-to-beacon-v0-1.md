---
author: anant
comments: true
date: 2006-08-19 07:04:18-07:00
layout: post
slug: say-hello-to-beacon-v0-1
title: Say Hello to Beacon v0.1!
wordpress_id: 989
---

Phew! At last we have a working prototype of the GuideXML editor, and it's
called Beacon. Before we get bogged down with the technical details, lets
have a look at the good stuff first!

The welcome screen for Beacon is very simple, two options: Create new
GuideXML document, or edit an existing one.

Once you've entered the essential details, you're taken to the actual
editor. It's mostly based on Dojo's InPlace Editor widget, but the more
complicated tags like and are handled by a textarea instead (basically, tags
that can have more tags in them). Although they are just stupid textareas for
now, watch out for shiny new RTEs like TinyMCE, they are bound to replace the
textareas anytime in the near future!

With Beacon, you can even edit existing GuideXML documents with ease. Er,
almost, don't try editing the Gentoo Installation Handbook yet! (to be
specific, based GuideXML documents are not yet supported) But basically,
everything remains the same as how it was when you create new document
except that the content is already there:

Okay, the cool toolbox on the left allows you to drag and drop GuideXML
elements on the document to add them. Dojo's DnD kind of sucks, but
MochiKit's packed version doesn't have DnD support yet...

... Now the problem is that you can't remove elements yet. Lame, I know, but I
guarantee that the space below the toolbox is reserved for the DOM tree of
the document. That neat little widget will allow you to re-arrange or delete
your GuideXML elements at will.

Neat. Now onto the gory details. The whole application is meant to be a
generic XML editor, yeah, that's right, Beacon is not entirely specific to
GuideXML alone! Thanks to Dojo and MochiKit (both of whom still don't like
to talk to each other, I made them sit in the same room with great
difficulty; Dojo wouldn't let MochiKit in unless it was 'packed'!) the
entire application is driven by powerful XML configuration files that
control all aspects of the application.

Beacon maintains dual representation of the document at all times; that
means we have two DOM trees, one representing the GuideXML document itself,
and the other representing the HTML (and editable) version of the document
which you see in the 'Design' tab of the editor. Thanks to XSLT,
interconversion is quick (I won't say painless though, XSLT is TOUGH!).

Well, I better get back to making the editor look more beautiful while
thinking about that DOM Tree widget... Meanwhile, you guys, enjoy!

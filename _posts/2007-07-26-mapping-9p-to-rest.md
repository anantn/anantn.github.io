---
author: anant
comments: true
date: 2007-07-26 07:05:04-07:00
layout: post
slug: mapping-9p-to-rest
title: Mapping 9P to REST
wordpress_id: 1061
category: favorite
---

Now that the PHP bindings to libixp are somewhat usable, I've moved on to the JavaScript portion of my project. The first (and easier!) part of it is to map 9P to a RESTful scheme, so traditional web developers can use 9P without having to learn anything new.

The PHP bindings to libixp was an important pre-requisite to achieve this: presenting a REST interface to an existing 9P serve would require a "bridge" at the middle, to convert REST requests to 9P requests and vice-versa with responses. This "bridge" may be present at any location that is mutually accessible by the client wanting RESTful access and the server providing the 9P service. This bridge can be easily coded in PHP using the new libixp bindings.

To those not very familiar with [REST](http://replay.waybackmachine.org/20070818155809/http://en.wikipedia.org/wiki/REST), it is simply a way of accessing resources using plain-old [HTTP](http://replay.waybackmachine.org/20070818155809/http://en.wikipedia.org/wiki/HTTP). It's become quite popular with web developers these days, as a much simpler alternative to [SOAP](http://replay.waybackmachine.org/20070818155809/http://en.wikipedia.org/wiki/SOAP). A lot of web services these days are RESTful, including those offered by [Amazon](http://replay.waybackmachine.org/20070818155809/http://aws.amazon.com/) and [Yahoo](http://replay.waybackmachine.org/20070818155809/http://developer.yahoo.com/search/rest.html).

From the client's perspective, accessing a 9P resource boils down to 4 things: reading, creating, modifying and deleting. These operations map neatly onto the GET, PUT, POST and DELETE HTTP requests, respectively. And thus, we have our REST URI scheme. This scheme would be enough if my bridge exposes only a single 9P serve as a REST service. As an example, suppose I start a bridge at `http://plan9.kix.in/rest/` that exposes only the `tcp!sources.cs.bell-labs.com!564` 9P serve, to read the file named `lsr` I would perform a GET request at `http://plan9.kix.in/rest/lsr`.

However, the plot thickens when I want to design a bridge that allows access to any 9P service (which is definitely better). Now we need to encode the information represented in Plan 9 as: `tcp!sources.cs.bell-labs.com!564` into a HTTP URI. The intuitive thing to do would be something like: `[ROOT]/[PROTOCOL]/[9P-URI]/[PORT]/[FILE-PATH]`.

Hmm. That leads to really long URI's like `http://plan9.kix.in/rest/tcp/sources.cs.bell-labs.com/564/lsr`. Besides that, there are several things that need to be worked out. What happens when you do a GET on a file that is actually a directory? What about parameters to GET that you usually pass to a `read()` function: Suppose you want to read the first 1024 bytes of a file only?

Comments and Suggestions welcome!

P.S.: Thanks to some pointers by Kris, the PHP9P client example shown in the previous post now handles binary files correctly.

---
author: anant
comments: true
date: 2007-08-16 07:12:17+00:00
layout: post
slug: to-block-or-not-to-block-sockets-javascript
title: To block or not to block (Sockets & JavaScript)
wordpress_id: 1073
---

There's one last hurdle before I finish my GSoC project. I've already written the JavaScript that produces binary messages for every possible 9P transaction, and all that needs to be done is to actually send those messages to the 9P server.

In a few of my previous posts, I mention that there were two apparent ways to do this:

1. Send the message wrapped in an XMLHttpRequest to a HTTP server that forwards the message to the actual 9P server.

2. Use Mozilla's XPCOM components to access Sockets directly in JavaScript.

Well, it turns out that (1) is probably not a solution at all. HTTP is far from what one would call a protocol that supports streaming. A 9P server (correctly) doesn't return an `EOF` until you have completed your _whole_ session. So the first time I send an XMLHttpRequest to, say a PHP script, the script blocks forever, since PHP would never know when the first R-message has been actually sent through. I can always peek at the first 4 bytes and find out the length of the R-message, but what then? I can't close the socket since that would terminate the 9P session, but I have to return from the script for the HTTP response to be actually sent.

PHP doesn't support threading (proper) so I can't do the `select()` mojo either. How about storing the socket FD in the session variable? Well, this is probably the closest to a good solution but that would limit every client to exactly one 9P session.

Although Mozilla's XPCOM is one hell of a beast, I think it might be good to just build a firefox extension to access 9P resources. Not exactly sure of how I'm going to make it work, but tentatively, I'm thinking of parsing URIs beginning with `9p://` or something like that. Let's see how this goes.

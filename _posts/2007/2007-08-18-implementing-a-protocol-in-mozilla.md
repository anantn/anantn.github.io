---
author: anant
comments: true
date: 2007-08-18 07:15:06-07:00
layout: post
slug: implementing-a-protocol-in-mozilla
title: Implementing a Protocol in Mozilla
wordpress_id: 1079
categories: [mozilla, favorite]
---

Creating a Firefox extension is nothing short of an adventure. I was able to get started pretty quickly, thanks to [this](http://replay.waybackmachine.org/20070818155809/http://ted.mielczarek.org/code/mozilla/extensionwiz/) web-based quick-start wizard, all the boilerplate code was generated in literally no time.

Now, onto the actual functionality of the extension. I have to implement a protocol handler for the 9P protocol, which essentially means you type in `ninep://sources.cs.bell-labs.com/` and start reading files right off the browser window. (`ninep://` because a URL can’t start with a number)

[This](http://replay.waybackmachine.org/20070818155809/http://www.nexgenmedia.net/docs/protocol/) page provides some useful insights and code snippets on the subject of adding a new protocol handler. I was able to get as far as displaying a Glenda image whenever you type in a URL beginning with `ninep`.

The way this works is you create an XPCOM component that implements a standard interface. Specifically, the `newChannel()` method is where all the action is. It receives a URL and you do something and return an [nsIChannel](http://replay.waybackmachine.org/20070818155809/http://www.xulplanet.com/references/xpcomref/ifaces/nsIChannel.html). Mozilla provides standard nsIChannel implementations for popular protocols such as http, ftp and even the ubiquitous `file://`.

The intuitive thing to do here would be to do all my 9P processing in the `newChannel()` implementation and return a stream in a standard channel. However, that’s not going to work, since `newChannel()` would then block and the UI would actually freeze until the 9P transaction completes. Sub-optimal.

The "proper" way to do this would be to create my own implementation of `nsIChannel`. That way I just create a new `nsIChannel` in `newChannel()` and be on my way. nsIChannel would then take care of firing callbacks as and when data arrives. There’s somewhere I can start with, and that’s the Mozilla [implementation](http://replay.waybackmachine.org/20070818155809/http://lxr.mozilla.org/seamonkey/source/extensions/finger/) of the [finger](http://replay.waybackmachine.org/20070818155809/http://en.wikipedia.org/wiki/Finger_protocol) protocol. It’s written in C++, however, and I need to figure out how I can map the same to JavaScript (via [XPConnect](http://replay.waybackmachine.org/20070818155809/http://www.mozilla.org/scriptable/)).

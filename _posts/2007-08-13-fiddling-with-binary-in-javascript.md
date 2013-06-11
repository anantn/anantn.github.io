---
author: anant
comments: true
date: 2007-08-13 07:09:48-07:00
layout: post
slug: fiddling-with-binary-in-javascript
title: Fiddling with Binary in JavaScript
wordpress_id: 1068
---

Since ordinary JavaScript cannot directly communicate with a 9P server (over TCP), we decided to go in for a 2-tier approach: A script on the client generates a 9P message which is sent to a server via an XMLHttpRequest. The server then forwards the message to the actual 9P server. Messages from the 9P server to the client are sent in a similar fashion.

All 9P messages are just binary sequences, which means I need some way of representing a 9P message in JavaScript. A character is always 1 byte, so representing characters is not a problem. For representing integers in binary I use the following snippet of code:

{% highlight js %}
while (num) {
  str[str.length] = String.fromCharCode(num % 256);
  num = Math.floor(num / 256);
}
{% endhighlight %}

where `num` is the number to be encoded, and `str` is returned as:
`str + join('')`.

This means I can now encode any 9P message as a simple sequence of JavaScript strings. The final string can then be sent along with the payload of an XMLHttpRequest. I’m wondering whether it will be a good idea to encode the string in Base64 first, although an XMLHttpRequest should have no trouble with the string representation either.

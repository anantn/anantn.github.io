---
author: anant
comments: true
date: 2007-08-09 07:06:25-07:00
layout: post
slug: swapping-endian-ness-in-javascript
title: Swapping Endian-ness in JavaScript
wordpress_id: 1063
category: favorite
---

My [mentor](http://replay.waybackmachine.org/20070818155809/http://www.maht0x0r.net/) came up with two interesting ways of swapping [endian-ness](http://replay.waybackmachine.org/20070818155809/http://en.wikipedia.org/wiki/Endian) on JavaScript. The first one he proposed was based on what was "usually done in Plan 9", something along the lines of:

{% highlight js %}
b = "\1\1\1\2";
n = (b.charCodeAt(0) & 0xff) << 24;
n += (b.charCodeAt(1) & 0xff) << 16;
n += (b.charCodeAt(2) & 0xff) << 8;
n += (b.charCodeAt(3) & 0xff);
{% endhighlight %}

which gives us `n = 16843010`.

Maht then had a look at the series of JavaScript [lectures](http://replay.waybackmachine.org/20070818155809/http://101out.com/jss.php) by [Douglas Crockford](http://replay.waybackmachine.org/20070818155809/http://www.crockford.com/) at Yahoo!. The first of the series tells us that bit shifting is not faster than simple multiplication. Maht gave me this code snippet doing the same conversion, but using multiplication instead of bit shifts this time:

{% highlight js %}
b = "\1\1\1\2";
n = b.charCodeAt(0) * 16777216;
n += b.charCodeAt(1) * 65536;
n += b.charCodeAt(2) * 256;
n += b.charCodeAt(3) * 1;
{% endhighlight %}

`n`, is of course `16843010`; the real question is how much longer (or, shorter) did this take.

[Venkman](http://replay.waybackmachine.org/20070818155809/http://www.mozilla.org/projects/venkman/) is probably one of the more mature "old-school" JavaScript debuggers out there. [FireBug](http://replay.waybackmachine.org/20070818155809/http://www.getfirebug.com/), the relatively modern sibling to Venkman certainly has a few nifty features, but profiling is not one of its strong points. After failing to profile the script in FireBug, I used the trusty old Venkman - and it came up with some interesting results:

{% highlight js %}
Venkman Profile Report
Created ………. Thu Aug 09 2007 20:18:54 GMT+0530 (IST)
User Agent ……. Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6
Debugger Version . Venkman 0.9.87 [Mozilla rv:1.8.1.6/2]
..
Function Name: multi (Lines 1 - 6)
Total Calls: 1 (max recurse 0)
Total Time: 0.21 (min/max/avg 0.21/0.21/0.21)
Time (ex. calls): 0.21 (min/max/avg 0.21/0.21/0.21)
..
Function Name: shift (Lines 8 - 13)
Total Calls: 1 (max recurse 0)
Total Time: 0.02 (min/max/avg 0.02/0.02/0.02)
Time (ex. calls): 0.02 (min/max/avg 0.02/0.02/0.02)
{% endhighlight %}

As you can tell from the function names, `multi` uses simple multiplication, while `shift` uses bit-shifting. Turns out that bit-shifting does indeed take a lot lesser time. A Firefox quirk?

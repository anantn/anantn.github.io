---
author: anant
comments: true
date: 2007-07-09 07:01:16-07:00
layout: post
slug: herald-the-php-9p-client
title: Herald the PHP 9P Client
wordpress_id: 1055
---

I've given a few final touches to the 9P client for PHP. All the basic stuff should work (if they don't please let me know!), and I've written a script that shows some of the basic functionality that the client offers. Two actually, [this one](http://replay.waybackmachine.org/20070818155809/http://code.kix.in/projects/web9/browser/php9p/examples/ixpc.php) for the CLI SAPI and [this one](http://replay.waybackmachine.org/20070818155809/http://code.kix.in/projects/web9/browser/php9p/examples/viewer.php) for the Apache2 SAPI. All they do is read files and show directory listings, but the scripts are a good place to see what the API is like, since there's no official documentation yet. I couldn't locate a proper PHP 5 server to actually host the second example, which would have been cool.. but now we'll just have to make do with these screenshots I took off my browser (with the script running on my local Apache):

Once you've put in the address, you'll get a directory listing of the root:

While the CLI SAPI demo script also handles binary files quite well, this one will just send gibberish to your screen if you click on a binary file (text files work fine though). I'm still trying to figure out what's the best way of determining the MIME type of a file so I can send the appropriate HTTP header before transmitting the data itself,  so your browser would know how to interpret it. As for the server-side of things, the code is still in a state of flux and I'm not decided on what kind of API to offer. I'll probably take a break from this part of the project and move on the JS bindings, and then come back to tie this up in the end. That's not to say that the server-side code is not usable, just that it's not very developer-friendly; feel free to play around with it if you're feeling adventurous!

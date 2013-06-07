---
author: anant
comments: true
date: 2008-12-16 23:07:58-07:00
layout: post
slug: ssh-http-multiplexer
title: SSH-HTTP Multiplexer
wordpress_id: 315
---

One of my friends wanted to run a HTTP server on his office machine, but the network it is connected to blocks all ports except 22 (SSH). Sure, he could run Apache on port 22 but that would mean he could no longer login remotely.

I wrote a quick hack in python: [muxer.py](http://proness.kix.in/misc/muxer.py), that will multiplex incoming connections between an SSH and HTTP server. It is slow, and makes all incoming SSH connections wait for 5 seconds before responding, but it works! The 5 second timeout is required because the SSH protocol specifies that the server should be the first one to send the client it's version string, and only then will the client respond.

I should probably rewrite it in C at some point. Anyway, here's your hack for today. Maybe someone will find use for it, or even better, come up with a better solution (this one is certainly the worst!)

---
author: anant
comments: true
date: 2007-05-01 06:45:40+00:00
layout: post
slug: web9-for-bell-labs
title: Web9 for Bell Labs
wordpress_id: 1035
categories: [gsoc]
---

Howdy folks and welcome to another edition of the Summer of Code - Last year was really fun and I hope this year will be more!

This time I'll be working with the wonderful folks at [Plan 9 from Bell Labs](http://replay.waybackmachine.org/20070515140834/http://plan9.bell-labs.com/plan9/) on alternative implementations of the [9P](http://replay.waybackmachine.org/20070515140834/http://cat-v.org/9p/) protocol - a fundamental component of the Plan 9 operating system. The goal of the project is to provide a "Web-2.0ish" face to the 9P system and therefore has been codenamed "Web9". A trac instance and subversion repository has been [setup](http://replay.waybackmachine.org/20070515140834/http://code.kix.in/projects/web9) for the same.

I'll start off with an OO-style PHP wrapper and then move onto a pure JavaScript implementation. Once that is done, a couple of applications showing off the new wrappers would make a great addition. Something like a FF extension to access 9P based filesystems (using the newly developed JS 9P implementations) would be fun!

Looking forward to an awesome summer...

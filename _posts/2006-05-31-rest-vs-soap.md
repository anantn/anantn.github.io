---
author: anant
comments: true
date: 2006-05-31 03:01:07-07:00
layout: post
slug: rest-vs-soap
title: REST vs. SOAP
wordpress_id: 6
---

Okay I finally began a little analysis of the project. So essentially, we
have two mini-projects within this one, the first thing to do would be design
and implement a web service for
[repodoc](http://dev.gentoo.org/~yoswink/repodoc/), which is an experimental
tool to validate GuideXML documents. Instead of directly invoking the tool on
the server, we decided that it would be more secure and useful if a web
service for the same could be prepared.

So which kind of web service do we implement? Three options that immediately
pop up are XML-RPC, SOAP and REST. We ruled out XML-RPC because of all the
security vulnerabilities, so the debate essentially boils down to SOAP vs.
REST. SOAP is a more feature rich and robust option, while REST has the
advantage of extreme simplicity and lesser security issues. I'm quite
comfortable with SOAP and would not face any trouble in implementing a web
serice using it, but my mentor is a bit keen on using REST because of its
simplicity and suitability for this project.

I'm taking a deeper look at REST right now, because I'm not too familiar with
it. Hopefully, I should make a final decision on this, because according to
the schedule I put on the proposal, my analysis phase ends today ;)

We're more or less decided on the other factors though. PHP 5.1 all the way,
[Smarty](http://smarty.php.net/) for templating the editor and a nice
Javascript based WYSIWYG editor for the base. Lot's of options for the
WYSIWYG editor though, we have the classic ones like
[TinyMCE](http://tinymce.moxiecode.com/) and
[FCKEditor](http://www.fckeditor.net/default.html), and some really funky
ones like [Bitflux](http://www.bitfluxeditor.org/),
[Kupu](http://kupu.oscom.org/) and
[SPAW](http://www.solmetra.com/en/disp.php/en_products/en_spaw/en_spaw_intro).

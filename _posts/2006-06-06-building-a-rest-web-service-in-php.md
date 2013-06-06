---
author: anant
comments: true
date: 2006-06-06 12:46:28+00:00
layout: post
slug: building-a-rest-web-service-in-php
title: Building a REST Web Service in PHP
wordpress_id: 8
---

Finally, some substantial progress. First thing I did today was to figure out
a concrete way of developing a REST web service in PHP. Turns out that the
`$_SERVER` global variable has all that I need to respond to HTTP GET/POST
etc. requests. PHP even has a nifty function called
`apache_request_headers()` to get all this stuff. After that, it's merely a
question of processing the request and echoing back a response. `headers()`
is what will help in sending back the proper response codes and HTTP headers.

So this is how it's going to work. You make a POST request to, say
`http://docs.gentoo.org/repodoc/validate` with the XML document to be
validated attached to the request, and you receive a 201 (Resource Created)
response code, with a location such as
`http://docs.gentoo.org/repodoc/result/<someID>`. Next, the client makes a
GET request to that location, which will send you back an XML file with
details on the validation; whether it was successful or not, and if it
wasn't, what the problems were.I'm kind of deviating from the actual REST
specification a bit, the location returned by the response to a POST request
should really be the URI of the resource created, which in our case is the
XML file to be validated. But what I'm doing instead is to create the result
of the validation at that URI. The original XML file will actually not be
stored permanently on the server. And neither will the results, so the URI
returned with the 201 code is not persistent. This is sort of tricky, we need
to decide on the amount of time that the result will stay. I was thinking of
a daily cron job that cleans up the results, but we'll need a debate on that.

So that's just two resources, the `validate` resource responds to POST
requests, and the `result` resource responds to the GET requests. As simple
as it can get. The only XML that the server sends back is the result file,
the Schema for which I'm currently authoring. Which would help people
interested in writing a client for the repodoc web service, although I'll be
writing a reference client' once the web service is up and running.

Phew! Surprisingly, there isn't much information available on the internet on
how to build a REST service in PHP. Making a nice tutorial and putting it up
on xml.com or something would be a philanthrophic thing to do!

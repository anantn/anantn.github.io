---
author: anant
comments: true
date: 2008-06-07 08:10:01+00:00
layout: post
slug: week-3-web-client-for-weave
title: 'Week 3: Web client for Weave'
wordpress_id: 1131
category: favorite
---

I spent most of my 3rd week at Mozilla writing a web-based client for read-only access to Weave data. We figured it would be most useful for people to be able to access their bookmarks and open tabs/windows. The other data types that Weave syncs, like form history and cookies are probably not that useful to look at in a web browser.

After doing a quick [refresh](/2006/07/01/ajax-toolkit-shootout/) of the Javascript toolkits out there, I picked [YUI](http://replay.waybackmachine.org/20080702220300/http://developer.yahoo.com/yui/), which seemed to have improved a lot from the last time I looked at it, besides being extremely popular at Mozilla (second only to [jQuery](http://replay.waybackmachine.org/20080702220300/http://jquery.com/) - though one might argue that they aren’t used for the same things and thus can’t be compared directly).

Since we aren’t decided on the final data encryption format for Weave 0.2 yet, I just did a mockup of the client that fetches unencrypted data and displays it - read-only - to the user. Once the basics were done, I realized that this could easily be a great alternative to online bookmarking sites like [del.icio.us](http://replay.waybackmachine.org/20080702220300/http://del.icio.us/), once we add read/write support to the web client. The only reason I don’t use the Firefox bookmarks feature currently, is because I’m constantly moving between computers and even different browsers, so online bookmarking makes more sense. But once I hack in write support to the web client, I get all the benefits of online bookmarking, while still having them available in Firefox - with all the [AwesomeBar](http://replay.waybackmachine.org/20080702220300/http://ed.agadak.net/2007/11/smartbar-to-awesomebar) goodness!

Anyway, here’s how the initial prototype of the client looks. Login page:

![Weave's web client login page](/images/2008/weave-client-login.png)

And the page you get after logging in:

![You can view your bookmarks and open tabs/windows](/images/2008/weave-client-inside.png)

[Chris](http://replay.waybackmachine.org/20080702220300/http://cbeard.typepad.com/) thought it would be great if we pushed the limits a little more, what if we get Weave to sync all the data the AwesomeBar needs to act awesome? We could write a web-based AwesomeBar and integrate it with the Weave web-client - needless to say that it would be totally wicked. Chris also tried accessing the web client in an iPhone, and it just worked out of the box (which wasn’t totally surprising because it was just Safari, anyway), but it definitely makes for an awesome demo.

Towards the end of the week, I started working on a RESTful API in PHP ([not my first time](/2006/06/06/building-a-rest-web-service-in-php/)) for new user registration on the Mozilla weave server. We needed this because we wanted to integrate the registration into the browser chrome of the add-on, instead of making the user visit a web page. However, we also had to keep access to the API secure, by not allowing automated registrations. Maria, also an intern at the labs, will be writing the XUL required to integrate registration into the chrome for the Weave add-on.

I had heard about [reCAPTCHA](http://replay.waybackmachine.org/20080702220300/http://recaptcha.net/) sometime back when someone mentioned it on some random IRC channel months ago. On taking a deeper look, I realized that it would be the perfect solution for us. The REST API is now designed such that doing a GET on the registration URL would return the HTML required to display a captcha from reCAPTCHA, and then a subsequent POST request to the same URL would then validate the captcha as well as other user details and then return an appropriate response code depending on whether the user was registered or not. Writing this API was a lot more fun than my last one, because I got to use exotic HTTP status codes like: `400 (Bad Request)`, `405 (Method Not Allowed)`, and `417 (Expectation Failed)`.

By next week, we should have decided on the encryption format, and I should be able to plugin my Javascript crypto modules to finish up the web client for the 0.2 release. As for the weekend, no immediate plans except to head towards the great pancake house at noon.

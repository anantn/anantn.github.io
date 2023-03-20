---
author: anant
comments: true
date: 2009-11-03 03:08:27-07:00
layout: post
slug: identity-on-the-web-is-broken
title: Identity on the web is broken
wordpress_id: 554
categories: [tech, favorite]
---

The mere presence of systems like [OpenID](http://openid.net/), [Facebook Connect](http://developers.facebook.com/connect.php) and a host of other identity services on the web today is attestation to the fact.

Authentication should be a feature of the protocol, not something that relies on hacks like [cookies](http://en.wikipedia.org/wiki/HTTP_cookie). 99% of websites today rely on cookies for authentication for their websites, besides offering custom registration and login pages. This means the browser, as the user's agent, has no clue of what is going on. A user is forced to manually track myriads of accounts, remember passwords for each of them, and remember what personal information each of them holds. Sure, part of the problem is solved by using password managers (like the one in-built into Firefox, or external programs like [1Password](http://agilewebsolutions.com/products/1Password)), but even these programs rely on heuristic algorithms to determine if something _looks_ like a login credential or not. There's no explicit way for web pages to tell your browser: "This is a login form, please fill in details of the user's identity here" or "These pages are privileged, please give me the user's identity". Why is that?

Actually, there is such a mechanism: [HTTP based Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) has been a feature present since HTTP/1.0, but only 1% of sites actually use it. The reason for that is purely cosmetic, most browsers display a very bland modal dialog when it encounters a page that requires HTTP Auth, and sites are unable to customize that interaction. So, the technically right way to do things sucks from a user experience perspective, and websites started adopting alternate means. Someone discovered they could use cookies to store session information on the client, and the whole situation exploded ever since. As a programmer, I feel very sad when I think about the fact that instead of fixing the problem in HTTP/1.1, web-based authentication took the route it did and led to the mess we are in today.

However, I must also state that HTTP authentication doesn't solve the _entire_ problem - there is still the issue of users having to create an account for every site they want to be part of. This is because there existed no protocols to _federate_ and provide _decentralized_ authentication. That is, until OpenID and [OAuth](http://oauth.net/) came about. Now we're at this exciting juncture, and the browser is in a unique position to use these tools together to provide the user with an experience that is secure and easy to use. Every architect will agree that it is indeed a fun challenge to use the state of identity on the web today and make it into something awesome.

This is precisely what the Mozilla Labs team has been thinking about for a while now. Sometime ago, we [added support](http://mozillalabs.com/blog/2009/05/identity-in-the-browser/) for automagic one-click OpenID logins to Weave. We plan to spin that "feature" out into it's own extension and build on it, something we call "[Weave Identity](http://hg.mozilla.org/labs/weave-identity/)", part of the broader "Open Identity" initiative by the Labs. "[Weave Sync](http://hg.mozilla.org/labs/weave/)", the original extension, will just focus on the synchronization parts so we can tackle these two different problems separately.

So, how exactly are we planning on doing this? Take a look at an initial version of a document describing an in-browser "[Account Manager](https://wiki.mozilla.org/Labs/Weave/Identity/Account_Manager)". We've also put up a WEP (which expands to Weave Enhancement Proposal, by the way) describing the raw form of a specification for [automatic actions](https://wiki.mozilla.org/Labs/Weave/WEP/110) on websites, such as user registration or password changes.

Keep in mind that all of this is in its very early stages (pre-alpha); but that also means it's a great opportunity for the community to get involved! What are your thoughts on Open Identity? Use the discussion tab on any of those Wiki pages, start a thread on the Mozilla Labs [group](http://groups.google.com/group/mozilla-labs), or simply leave a comment on this blog entry, and chip in - we'd love to hear from you!

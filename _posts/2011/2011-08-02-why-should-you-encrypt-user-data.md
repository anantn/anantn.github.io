---
author: anant
comments: true
date: 2011-08-02 23:34:44+00:00
layout: post
slug: why-should-you-encrypt-user-data
title: Why should you encrypt user data?
wordpress_id: 1290
category: favorite
---

One of the things I like most about [Firefox Sync](https://www.mozilla.com/en-US/mobile/sync/) is that all my browsing data is [encrypted](http://kix.in/2009/10/11/how-does-weave-use-cryptography/) before anything leaves my computer. This wasn't easy to do, there is a **ton** of engineering effort involved in scaling servers, maintaining all the crypto code for the client, and most of all, in making the experience smooth and inclusive of all types of users. The last one is especially hard since average users find it hard to grok the concept of two passwords (one that the server knows and another that only they know, which means if they lose or forget the latter we really can't help them). I can't think of any major services out there that offer the same feature (it is clear now that Dropbox does not encrypt user data in an irrecoverable manner **EDIT**: Peter points out in the comments that Chrome does allow you to [encrypt your passwords](https://www.google.com/support/chrome/bin/answer.py?answer=1181035&hl=en-US)), and for good reason: it is damn hard to pull off. All the more reason to be very proud of the Mozilla Services team.

The question of why we should bother doing all this has come up now and then. Users readily trust a lot of services with their personal data. Google could read your email if they wanted to, but they have a reputation to maintain and therefore have strict internal policies on who has access to what. Every other service that allows access to your data via a web interface operates in the same way. Surely, Mozilla is just as [trustworthy, (if not more)](https://www.mozilla.org/about/) than all of them. Why not get rid of client-side encryption to make the user experience really awesome and save many valuable hours of engineering and operations effort?

Additionally, if programs on the server-side (not humans) had access to unencrypted browser data, there are many more interesting services one could offer. If these services are compelling enough, until [homomorphic encryption](http://research.microsoft.com/apps/pubs/default.aspx?id=148825) becomes usable commercially, they are a good argument for why you may not want to encrypt user data in a way that not even the server can read it. However, doing this also has some drawbacks...

<blockquote class="twitter-tweet" lang="en">
<p lang="en" dir="ltr">between PSN and Dropbox, lots of reminders about why Firefox Sync feels like the solution we want to provide</p>&mdash; Mike Connor (@mconnor)
<a href="https://twitter.com/mconnor/status/63094507889106944">April 27, 2011</a>
</blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Running production-quality servers is no walk in the park. There are so many ways in which a small misconfiguration can open up your service to all sorts of attacks. But what makes it even harder is a 0-day exploit in the web/application server you happen to be using, because then you have to wait for upstream to fix it. And then you have to make a judgement call, do you take your service down until a fix is released? Many would blame Sony's technical "incompetence" for the [PSN data leaks](http://arstechnica.com/gaming/news/2011/04/sony-admits-utter-psn-failure-your-personal-data-has-been-stolen.ars), but the fact remains that servers are run by humans, and _humans make mistakes_.

Keeping the user's data encrypted provides everyone with an extra layer of protection. Not from the folks running the service, users probably already trust them, but from everyone else. And that doesn't just include groups like Lulzsec or Anonymous.

Unfortunately, whether we like it or not, it is ridiculously easy for the government to strong-arm a technology company (especially one that isn't giant enough to generate press) into releasing data for individuals, even for frivolous reasons. There has certainly been a lot of precedent for these kinds of "requests" from the government, and not all companies (Twitter, most famously) respond to them with user data, but that is harder to do for companies that don't have that much money to spend on lawyers. In the real world, there are laws that require the government to obtain a search warrant before they are able to gain access to your physical belongings, and until we have the equivalent of a search warrant for an individual's digital data; encryption provides a fine compromise.

If you can make your application work entirely client-side, using the cloud merely as a storage mechanism, you should. It's worth the extra week you put into working out the crypto.js is rapidly becoming fast enough to do a lot client-side, and with things like [DOMCrypt](http://mozilla.ddahl.com/domcrypt/demos/demo.html), this realm is poised to get better with time.

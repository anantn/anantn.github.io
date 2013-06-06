---
author: anant
comments: true
date: 2006-03-26 23:44:02-07:00
layout: post
slug: the-scosta-experience
title: The SCOSTA Experience
wordpress_id: 58
---

Prof. [Rajat Moona](http://www.cse.iitk.ac.in/~moona/index.php) had visited
our college today to give a talk on Smart cards and how the
[IIT-K](http://www.iitk.ac.in/) team had managed to bring in a standard for
transport applications. Yes, India now officially has a standard for issuing
smart card based driving licenses in all states!

The standard is named SCOSTA, or Smart Card OS for Transport Applications.
The job of the IIT-K team was, among others, to define this standard and
provide a reference implementation. SCOSTA is based on the the ISO 7816-x
series of standards, but improves upon many of its drawbacks and ambiguities.

Some of the challenges that
[SCOSTA](http://www.cse.iitk.ac.in/~moona/scosta/) faced were very similar to
those that any Government project in India does: corruption and fierce
competition. In addition to dealing with corrupt officials, the SCOSTA
committee also had to face the various smart card vendors and their business
motives that tried to influence the standard. Technically, they also had to
keep in mind the limitations of the processing power: only a mere 32kB of ROM
and an 8Bit processor. Quite a different ball game when compared to the
regular programming that we do on today's PC: virtually unlimited memory on
64Bit processors! It's amazing how they've managed to build an entire OS on a
credit-card sized card!

It was a truly eye-opening experience. It seems that the
[NIC](http://www.nic.in/) was responsible for this initiative and was the
driving force behind the committee. I also learnt that Transport (and
therefore issual of driving licenses) is, contrary to popular belief, under
the Union Government. The state government only performs the task _on behalf_
of the Central Government, and the police only challan offenders _on behalf_
of the Judiciary!

He also gave us an insight into the future of smart cards. VISA has already
started issuing contact-less smart card with biometric identification built
in. One just has to hold the card with his right thumb, and a switch is
activated which scans the fingerprint, and on successful validation,
generates a one-time use number (which would be a hash of a combination of
the current time, account number, etc) on a plasma display on the card itself!

Our institute has planned to issue "smart" identity card to us students after
that encouraging talk. Let's see how far that goes!

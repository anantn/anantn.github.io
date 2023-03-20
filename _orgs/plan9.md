---
layout: org
date: 2006-01-05
key: plan9
name: Plan 9
years: 2006-2010
short: Glendix, πp, 9p
---

I was enraptured by Plan 9 ever since I first heard of it: the idea of an operating system built for the networked world, and designed by the creators of Unix (who had surely learned a lesson or two from it), was too enthralling to ignore. I host a [page on this site](/plan9) with more information and links if you're interested. Here is another [short write-up](http://www.catb.org/esr/writings/taoup/html/plan9.html) on Plan 9 by esr, the article also includes links to a little bit of history regarding UTF-8, which was invented for the OS.

I've tinkered with Plan 9 in a few different ways. The biggest endeavor was probably [Glendix](http://glendix.org), a set of Linux kernel modules that enables the execution of Plan 9 "a.out" binaries natively. It isn't maintained any more &mdash; [plan9port](https://github.com/9fans/plan9port) is a much more practical way to run Plan 9 programs on modern UNIXes &mdash; but the code is probably instructive to anyone interested in understanding how to write Linux kernel modules or execution formats (like Plan 9's a.out) at the lowest level.

I was also lucky enough to work with [Sape Mullender](https://www.diversiorum.org/sape/) at Bell-Labs, Antwerp on making improvements to the 9P network protocol. This resulted in a thesis and protocol implementation of what we called [πp](https://proness.kix.in/misc/πp-v2.pdf).

One of the nice side effects of being involved in the Plan 9 community was following the adventures of [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson), [Rob Pike](https://ai.google/research/people/r) and [Russ Cox](https://swtch.com/~rsc/), who all eventually ended up at Google and made the [Go language](https://golang.org/). Unsurprisingly, Go borrows many ideas from Plan 9, a language I use almost exclusively for all my personal and professional projects these days.

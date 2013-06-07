---
author: anant
comments: true
date: 2008-02-29 08:56:47+00:00
layout: post
slug: adventuring-with-aout
title: Adventuring with a.out
wordpress_id: 193
---

The first step in the [Glendix](http://www.glendix.org/) project was to write a binary loader for the Plan 9 [a.out format](http://lsub.org/magic/man2html/6/a.out). Linux has a clean interface for registering new binary format handlers from a module. Basically, you define a structure of type [linux_binfmt](http://lxr.linux.no/linux+v2.6.24.3/include/linux/binfmts.h#L66) and call [register_binfmt](http://lxr.linux.no/linux+v2.6.24.3/include/linux/binfmts.h#L76) during initialization of the module. Now all that's left to do is implement the three functions that you pointed to in your structure: `load_binary`, `load_shlib` and `core_dump`.

Luckily for me, all Plan 9 executables are statically linked so I can just leave `load_shlib` as `NULL`. `core_dump` is also not that important during the development stages, although the final product must definitely implement it. To get a feel of what I needed to do in `load_binary`, I decided to take a peek into some of the other binary format handlers. I tried to comprehend the code for ELF with not much luck. I then turned to [UTLK](http://www.oreilly.com/catalog/understandlk/), which helped me understand what was going on. I highly recommend the book for anyone interested in kernel programming.

Anyway, here is when I found out that all ELF executables have sections that are actually page aligned! That means every ELF executable contains a bunch of zeroes after the TEXT section, so that the DATA section starts at the next page address. That's how the executable is supposed to be laid out in memory, but I had no idea someone would actually think of doing it in the file. I guess they have their reasons, all the binary format loader does is [mmap](http://en.wikipedia.org/wiki/Mmap) the file. Maybe for ELF2 they could put in zeros for the BSS section in the file too ;)

Plan 9 executables on the other hand, are just normal files with no padding. This gives me a headache because I can no longer use `mmap`. Recall that all addressees passed to `mmap` have to be page-aligned. But the DATA section in Plan 9's a.out will start at a non-page-aligned address most of the time.

One of the first things I tried to do was to `mmap` the file into a high address, copy portions into the appropriate locations and then free the mapping. That didn't work so well because:

* `memcpy` works only on physical addresses. Logical addresses from the virtual process address space can't be easily translated to physical ones because Linux delays physical memory allocation for as long as possible. Now we know why all the loaders use _mmap_, it is fundamental to the "Linux way" of memory management.

* There is no generic `copy_in_user` implementation. There are specific ones that use assembly code for [PPC](http://lxr.linux.no/linux+v2.6.24.3/arch/powerpc/lib/usercopy_64.c#L28), [SPARC](http://lxr.linux.no/linux+v2.6.24.3/include/asm-sparc64/uaccess.h#L247) and even [x86_64](http://lxr.linux.no/linux+v2.6.24.3/arch/x86/lib/usercopy_64.c#L158), but none for x86. The alternative was to use [copy\_from\_user](http://lxr.linux.no/linux+v2.6.24.3/include/asm-x86/uaccess_32.h#L563) to move data into kernel addresses and then bring them back using [copy\_to\_user](http://lxr.linux.no/linux+v2.6.24.3/include/asm-x86/uaccess_32.h#L561). That didn't work out well either - `copy_to_user` kept failing for some reason.

I ended up writing a userspace program called `pad` that page-aligns a Plan 9 a.out executable. The loader just `mmap`'s the file, like all other loaders. The solution is suboptimal, if someone knows a clean way of doing all of this in kernel-space, I'll be grateful for the help. The ultimate goal is to run Plan 9 executables on Linux, unmodified.

The code for the loader and the pad program can be found on git [here](http://hg.glendix.org/glendix/).

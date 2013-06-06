---
author: anant
comments: true
date: 2007-02-12 06:39:10+00:00
layout: post
slug: compiling-systemc-with-gcc-4-and-mac-os-x
title: Compiling SystemC with GCC 4 (and Mac OS X)
wordpress_id: 1019
---

I'm having to use [SystemC](http://replay.waybackmachine.org/20070219120114/http://www.systemc.org/) for a project involving simulation of [Network-On-Chip](http://replay.waybackmachine.org/20070219120114/http://en.wikipedia.org/wiki/Network_On_Chip) applications. Turned out that it didn't quite compile cleanly on my GNU/Linux machine:

``` bash
sc_process_int.cpp: In member function
  'virtual void sc_core::sc_thread_process::prepare_for_simulation()':
sc_process_int.cpp:441: error:
  'sc_thread_cor_fn' was not declared in this scope
sc_process_int.cpp: In member function
  'virtual void sc_core::sc_cthread_process::prepare_for_simulation()':
sc_process_int.cpp:630: error:
  'sc_cthread_cor_fn' was not declared in this scope
```

My friend pointed me to a patch for this, which I later [modified](http://proness.kix.in/misc/patch_systemc-2.1.v1-gcc4-osx) slightly. Turns out that GCC4 is a bit more stricter about friend functions than its old counterpart.

That problem solved, I went on to compiling SystemC on the Mac. My Macbook Pro has an Intel processor so it shouldn't have been much trouble. Needless to say, configure couldn't even detect the build type:

``` bash
checking build system type...
  configure: error: cannot guess build type; you must specify one
```

And after specifying one explicitely:

``` bash
$ ./configure --build=i386-pc-macosx
configure: error: "sorry...architecture not supported"
```

Not a problem. After adding a case…esac block to configure.in (setting the `CXXFLAGS` etc. to the the same as the case for linux), we were up and running!

In summary, here's what you have to do after grabbing the SystemC sources (requires registration and acceptance of license):

``` bash
$ tar xvzf systemc-2.1.v1.tgz
$ cd systemc-2.1.v1
$ wget http://www.kix.in/misc/patch_systemc-2.1.v1-gcc4-osx
$ patch -p0 < patch_systemc-2.1.v1-gcc4-osx
```

Those of you trying to compile SystemC on GNU/Linux with GCC4 do the same; but leave out the `build` argument to the configure statement.

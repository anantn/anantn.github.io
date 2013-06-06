---
author: anant
comments: true
date: 2007-06-10 06:56:17+00:00
layout: post
slug: kde-4-umbrello-et-al-on-mac-os-x
title: 'KDE 4, Umbrello et. al. on Mac OS X!'
wordpress_id: 1051
---

I needed a decent [UML](http://replay.waybackmachine.org/20070713072718/http://en.wikipedia.org/wiki/UML) modeller that was capable of converting my class diagrams into PHP 5 code. I usually use [ArgoUML](http://replay.waybackmachine.org/20070713072718/http://argouml.tigris.org/) on my Mac; it's a great product but lacks the code-generation feature that I needed. (It does generate C++ and Java code though). (EDIT: As noted in comment below, ArgoUML indeed supports PHP code generation as a seperate module!). So I rebooted into Linux and emerged [Umbrello](http://replay.waybackmachine.org/20070713072718/http://uml.sourceforge.net/). However, I had heard about the Qt/Mac edition, which is essentially Qt4 but with a native Mac interface. I was very tempted to try this out - KDE 4 without X with a native Mac look is absolutely exciting!

Check out this yummy screenshot (click for the full version):

That's Umbrello on Mac OS X, complete with an Apple style menu and a Dock Icon! Read on for compilation instructions…

[This](http://replay.waybackmachine.org/20070713072718/http://techbase.kde.org/Getting_Started/Build/KDE4/Mac_OS_X) page provided lots of useful info to get started. I downloaded the Qt/Mac Open Source edition, version 4.3. After applying the patches mentioned in the KDE for Mac OS X build page (not all of them applied cleanly, but I guess those patches were for a older version of Qt) I began compiling Qt. Here are the exact steps:

``` bash
$ mkdir ~/kde.build
$ cd ~/kde.build
$ wget ftp://ftp.trolltech.com/qt/source/qt-mac-opensource-src-4.3.0.tar.gz
$ tar xvzf qt-mac-opensource-src-4.3.0.tar.gz
$ svn co svn://anonsvn.kde.org/home/kde/trunk/qt-copy/patches/
$ cd qt-mac-opensource-src-4.3.0
$ for patch in ../patches/*.diff; do patch -p0 &lt; $patch; done
$ ./configure –prefix=/opt/qt4 -qt-gif -fast -qdbus
$ make all
$ sudo make install
```

Note that you need DBus installed before you try this. I highly recommend [MacPorts](http://replay.waybackmachine.org/20070713072718/http://www.macports.org/) for all you Mac OS X users out there, its chock-full of useful open source software for your Mac. `port install dbus` to get Dbus. Qt took about an hour to build on my Macbook Pro.

Now onto KDE 4. All of the pre-requisites mentioned on the KDE 4 for Mac OS X page can easily be got through MacPorts - with the exception of Strigi. You can easily build Strigi from source though, make sure you get a recent SVN checkout. Strigi depends on CLucene, there's a version in MacPorts but it's not new enough for strigi. Anyway this wasn't so difficult either:

``` bash
$ cd ~/kde.build
$ wget http://downloads.sourceforge.net/clucene/clucene-core-0.9.16a.tar.bz2
$ tar xvjf clucene-core-0.9.16a.tar.bz2
$ cd clucene-core-0.9.16a
$ ./configure –prefix=/opt/kde4-deps
$ make
$ sudo make install
```

KDE 4 requires a recent SVN build of Strigi:

``` bash
$ cd ~/kde.build
$ svn co svn://anonsvn.kde.org/home/kde/trunk/kdesupport/strigi
$ cd strigi
$ export CMAKE_INCLUDE_PATH=”/opt/kde4-deps/include:/opt/local/include”
$ export CMAKE_LIBRARY_PATH=”/opt/kde4-deps/lib:/opt/local/lib”
$ mkdir build
$ cd build
$ cmake ../ -DCMAKE_INSTALL_PREFIX=/opt/kde4-deps
$ make
$ sudo make install
```

Now, we're all set to build the base KDE libs:

``` bash
$ cd ~/kde.build
$ svn co svn://anonsvn.kde.org/home/kde/trunk/KDE/kdelibs
$ export PATH=”/opt/qt4/bin:/opt/kde4/bin:/opt/kde4-deps/bin:$PATH”
$ export PKG_CONFIG_PATH=”/opt/qt4/lib:/opt/local/lib”
$ cd kdelibs
$ mkdir build
$ cd build
$ cmake ../ -DCMAKE_INSTALL_PREFIX=/opt/kde4
$ make
$ sudo make install
```

Voila! All done. Now you can build your additional KDE components quite easily. Umbrello, for example, is part of `kdesdk`, which depends on `kdepimlib`. To build Umbrello:

``` bash
$ cd ~/kde.build
$ svn co svn://anonsvn.kde.org/home/kde/trunk/KDE/kdepimlib
$ cd kdepimlib
$ mkdir build
$ cd build
$ cmake ../ -DCMAKE_INSTALL_PREFIX=/opt/kde4
$ make
$ sudo make install

$ cd ~/kde.build
$ svn co svn://anonsvn.kde.org/home/kde/trunk/KDE/kdesdk
$ cd kdesdk
$ mkdir build
$ cmake ../ -DCMAKE_INSTALL_PREFIX=/opt/kde4
$ cd umbrello
$ make
$ sudo make install
```

Now just run Umbrello.app from `/opt/kde4/bin`! It may fail the first time you run because you haven't initialized DBus yet:

``` bash
$ sudo mkdir -p /opt/local/var/lib/dbus
$ sudo dbus-uuidgen –ensure
```

Have fun! I'm going to try and build Amarok now!

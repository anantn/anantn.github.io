---
author: anant
comments: true
date: 2007-06-06 06:51:17-07:00
layout: post
slug: object-oriented-php-extensions
title: Object Oriented PHP Extensions
wordpress_id: 1046
---

Before I begin, if you're using Gentoo Linux, don't forget to [check out](http://replay.waybackmachine.org/20070630070830/http://anant.wordpress.com/2007/05/30/experience-plan-9-on-linux/) the plan9port ebuild I recently made.

The Summer of Code has officially started - and I will begin my blogging with a quick post on creating object-oriented extensions to [PHP](http://replay.waybackmachine.org/20070630070830/http://www.php.net/), which is what the first phase of my project is all about!

There isn't much documentation on building OO extensions apart from the [README](http://replay.waybackmachine.org/20070630070830/http://cvs.php.net/viewvc.cgi/ZendEngine2/OBJECTS2_HOWTO?revision=1.6&view=markup) series in the PHP source. If you're looking to build a conventional procedural extension, however, I've found that the 3-part [tutorial series](http://replay.waybackmachine.org/20070630070830/http://devzone.zend.com/node/view/id/1021) on Zend by Sara Golemon is most useful.

I've chosen the [libixp](http://replay.waybackmachine.org/20070630070830/http://www.suckless.org/wiki/libs) (pronounced as lib9p, get it?) library to wrap over. libixp is a small and clean C library that helps you write 9P servers and clients and should serve as a great base for the PHP extension. Incidentally, libixp's current maintainer is Kris Maglione; one of my fellow SoCers! Anyway, the first thing I did was to run the [ext_skel](http://replay.waybackmachine.org/20070630070830/http://cvs.php.net/viewvc.cgi/php-src/ext/ext_skel?revision=1.49&view=markup) script for my new extension but quickly found out that you can't have PHP extensions that begin with a number (I wanted to name the extension 9P). Rinse and repeat with an extension name of `ixp` instead. Now what?

[Marcus Börger](http://replay.waybackmachine.org/20070630070830/http://marcus-boerger.de/) had presented a talk on “[Implementing PHP 5 OOP extensions](http://replay.waybackmachine.org/20070630070830/http://talks.somabo.de/200505_cancun_implementing_php5_oop_extensions.pdf)” at php|tropics, which, though a bit dated, served well as a guide. The bundled [util](http://replay.waybackmachine.org/20070630070830/http://somabo.de/php/ext/util/) extension is a good example of some OO code in action. However, as time progresses, I realized that creating a class and setting its properties in itself was getting *very* monotonous. Surely, this wasn't code that was meant to be typed in by humans; after all, why code when the computer can do it for you?

Yep, Code generation to the rescue! [PEAR](http://replay.waybackmachine.org/20070630070830/http://pear.php.net/) has a neat package called [CodeGen_PECL](http://replay.waybackmachine.org/20070630070830/http://pear.php.net/package/CodeGen_PECL) that takes an XML description of your extension and generates not only the extension code, but also skeletal documentation to go along with it! No more worrying about naming conventions and other such menial stuff - you get straight to coding. Indeed, this is how programming should be. I will recommend this extension to anyone trying to build an extension to PHP, *especially* if you're creating an OO extension (given the lack of documentation and Zend's clunky object system for PHP5).

Now that I had a neat little skeleton of my extension (CodeGen_PECL indents and comments the code for you too) all I had to do was to begin actually implementing the methods. The client portion of it wasn't such a big deal, but when I started to code the classes that would help you create a 9P server, I hit a roadblock. libixp expects me to pass a bunch of function pointers, one each for every 9P operation (read, write, clunk, attach etc… more details in the [9P specification](http://replay.waybackmachine.org/20070630070830/http://plan9.bell-labs.com/sys/man/5/INDEX.html)). I now have to think of some way to map that to the PHP way. Tricky, but the answer lay quite close to me.

I've been working with the [PHP-GTK](http://replay.waybackmachine.org/20070630070830/http://plan9.bell-labs.com/sys/man/5/INDEX.html) team for quite some time. In fact, it was my [first experience](http://replay.waybackmachine.org/20070630070830/http://marc.info/?l=php-gtk-doc&m=113199882219277&w=2) with open-source projects in general. PHP-GTK is an OO extension that wraps over the [Gtk+ toolkit](http://replay.waybackmachine.org/20070630070830/http://www.gtk.org/). Gtk+ has a ton of functions that expect function pointers, their whole signal-callback system is built that way. PHP-GTK maps this behavior to the PHP way by creating a "marshaller" function for every type of function pointer, that expects the same arguments as the function pointer is given. While this marshaller function is passed to the C-level Gtk+ methods, PHP-GTK maintains a separate callback structure that stores the Zend object for the corresponding PHP-level function. Gtk+ (thankfully) provides an extra gpointer for the developer to pass around their own data to callbacks, and PHP-GTK uses this to pass around the callback structure. When the marshaller function is called, it simply reads the callback structure and invokes the PHP-level function with all the parameters that it received (after appropriate conversion of course).

Cool, I could do the same thing with libixp! Except libixp doesn't allow me pass custom data to callbacks:

``` cpp
typedef struct Ixp9Srv {
  void (*attach)(Ixp9Req *r);
  void (*clunk)(Ixp9Req *r);
  void (*create)(Ixp9Req *r);
  void (*flush)(Ixp9Req *r);
  void (*open)(Ixp9Req *r);
  void (*read)(Ixp9Req *r);
  void (*remove)(Ixp9Req *r);
  void (*stat)(Ixp9Req *r);
  void (*walk)(Ixp9Req *r);
  void (*write)(Ixp9Req *r);
  void (*freefid)(Fid *f);
} Ixp9Srv;
```

Hmm. Luckily, I'm bundling the libixp sources with the extension; it's a `--with` extension, not a `--enable` one. I guess I can hack up the libixp sources to allow for passing this extra data around to the callbacks. Let's see how this goes!

Until next time, Happy Hacking!

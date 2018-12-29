---
author: anant
comments: true
date: 2008-07-22 08:20:51+00:00
layout: post
slug: aes-256-using-php-mcrypt
title: AES-256 using PHP-mcrypt
wordpress_id: 1142
categories: [mozilla, php, favorite]
---

PHP is sometimes really dumb.

While working on a library for Weave's OAuth implementation (so 3rd party developers don't have to understand the nitty-gritty of OAuth and can instead use a simple library in their favorite programming language), I ran across the need to do AES-256 decryption in PHP.

The best (and fastest) method would be to use PHP's mcrypt extension, but mcrypt lists support for 'Rijndael' and not 'AES'. They're both practically the same, _except_ for the very small difference of the IV (initialization vector) being different sizes. In Rijndael, the IV is always the same size as that of the key, but in AES, the IV is always 16 bytes.

Weave uses AES-256, which means we have a 32 byte key, and a 16 byte IV. mcrypt implements Rijndael, so my first try:

{% highlight php %}

<?php
// $key is 32 bytes long
$iv = 'sixteenbyteslong';
$td = mcrypt_module_open(
  MCRYPT_RIJNDAEL_256, '', MCRYPT_MODE_CBC, ''
);
mcrypt_generic_init($td, $key, $iv);
?>

{% endhighlight %}

failed with:

{% highlight bash %}
Warning: mcrypt_generic_init(): Iv size incorrect;
supplied length: 16, needed: 32 in aes.php on line 26
{% endhighlight %}

Here's the workaround:

{% highlight php %}

<?php
$td = mcrypt_module_open(
  MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, ''
);
mcrypt_generic_init($td, $key, $iv);
?>

{% endhighlight %}

That's right - you call `mcrypt_module_open` with Rijndael-128 instead of 256, but still pass a 32 byte key to `mcrypt_generic_init` and be on your merry way.

WTF, but I'm happy that it atleast works.

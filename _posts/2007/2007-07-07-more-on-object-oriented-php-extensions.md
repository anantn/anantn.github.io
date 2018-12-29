---
author: anant
comments: true
date: 2007-07-07 06:55:32+00:00
layout: post
slug: more-on-object-oriented-php-extensions
title: More on Object Oriented PHP extensions
wordpress_id: 1048
categories: [php]
---

In the [last](http://replay.waybackmachine.org/20070630070830/http://summerofcode.wordpress.com/2007/05/30/object-oriented-php-extensions/) post, I mentioned that the libixp sources may have to be modified to work around callbacks, but [Kris](http://replay.waybackmachine.org/20070630070830/http://gsoc.cat-v.org/people/kris) quickly pointed out that there’s a special `aux` element meant specifically for developers to put whatever they like into. The `aux` element is automatically passed to every callback function via the Ixp9Req struct:

{% highlight cpp %}
struct Ixp9Req {
Ixp9Conn *conn;
Fid *fid;
Fid *newfid;
Ixp9Req *oldreq;
Fcall ifcall;
Fcall ofcall;
void \*aux;
};
{% endhighlight %}

The `aux` element is created during the call to `ixp_listen`:

{% highlight cpp %}
IxpConn *ixp_listen(IxpServer *s, int fd, void *aux,
void (*read)(IxpConn *c), void (*close)(IxpConn \*c));
{% endhighlight %}

Now how do we wrap this functionality in PHP land? The `aux` functionality must be passed on the 9P developers using PHP, while still being able to extract the `zval` that we need to invoke the appropriate callback. Thanks to the marshaller method, we can mangle struct values as much as we like before passing the values into their PHP counterparts. We simply create a struct to wrap both our callback values and the `aux` element from the user:

{% highlight cpp %}
typedef struct \_IxpAux {
IxpCallback *cb;
zval *aux;
int type;
} IxpAux;
{% endhighlight %}

In the marshaller, we simply extract the `aux` value out from the structure, convert it to a regular PHP-type and pass it along to the PHP-level function using Zend’s `call_user_function_ex()` method. That problem solved, onto the next. Creating objects of a class in amethod of another class - the `IxpCFid` class has no constructor, but an object is returned by calls to an `IxpClient` object. More on that later!

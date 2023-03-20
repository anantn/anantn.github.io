---
author: anant
comments: true
date: 2007-12-30 07:18:00-07:00
layout: post
slug: the-trampoline
title: The Trampoline
wordpress_id: 187
categories: [tech, favorite]
---

Most programmers readily make use of recursion - it is indeed a very elegant
solution for several problems, and results in much cleaner code. However,
recursion brings along with it a drawback, the stack is filled up very
quickly. Usually, this isn't really much of a problem, since most desktops
these days have decent memory and most language runtimes grow the stack
automatically for you.

On embedded systems however, it's a different story. Limited availability of
resources forces you to write efficient code which is usually not very
elegant. This is also true for recursions that loop a large number of times on
normal machines - imagine finding the Fibonacci series for the largest 64 bit
number.

I recently had to write a cryptographic routine that was tree-recursive. I had
5 functions, let's call them F, A, B, C and D. F was the entry point for the
routine, and F calls one of A, B, C or D depending on the parameters passed to
it. A, B, C and D, in turn call F again with a different set of arguments.
This goes on until F detects a terminating condition, upon which it returns a
value. A typical run would result in around 400 nested calls, which worked
fine on my desktop, but not on the target platform (an embedded system).

The first step I took was to roll all A, B, C and D into F itself.
This meant F became larger and more ugly (no more modularity!) but it
reduced the nesting level by half. Now I had a single recursive function. This, unfortunately, wasn't enough.

Then, I learned about a programming device called the trampoline. It's a great
way of attaining recursive properties while saving stack space. A trampoline
is kind of marshal function that repeatedly calls your recursive function
until a terminating condition is reached (the function keeps 'bouncing', hence
the name!). The recursive function doesn't recurse anymore, but instead just
returns a true/false value that determines if there's more work to be done or
not:

{% highlight java %}
boolean F(/* notice we don't have arguments to save more stack space */) {
    /* we load them from the class variables instead */
    arg1 = this.arg1;
    ...
    if (more_work) {
        /* save arguments for next call */
        this.arg1 = something;
        return false;
    } else {
        /* we've reached termination */
        this.finalVal = finalReturnValue;
        return true;
    }
}

int trampoline(arg1, ...) {
    this.arg1 = arg1 /* initial argument setting */
    ...
    while (true) {
        if (F())
            break;
    }
    return this.finalVal;
}
{% endhighlight %}

This way, we never reach a nesting level of more than 2, saving stack space by
drastic amounts, with only a minimal addition to the heap load. The code
doesn't look that bad either. Definitely one of those 'Aha!' moments for me.

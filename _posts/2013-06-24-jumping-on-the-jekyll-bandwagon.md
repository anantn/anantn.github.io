---
author: anant
layout: post
slug: jumping-on-the-jekyll-bandwagon
title: Jumping on the Jekyll Bandwagon
---

Regular readers of this blog may have noticed the new look and feel of the site
that was rolled out a couple of weeks ago. Hope you like it!

These changes are not purely cosmetic, however. I also migrated from
[Wordpress](http://wordpress.com) to [Jekyll](http://jekyllrb.com). Jekyll is
a [Markdown](http://daringfireball.net/projects/markdown/)-aware static
website generator. We use Jekyll for the
[Firebase Blog](https://www.firebase.com/blog/), and I thought it was about
time I switched over my personal blog as well.

Why switch?

* Since Jekyll generates static HTML files as output, the website is noticeably
faster than the PHP-powered Wordpress (even when served by wordpress.com which
has a cache in front).

* Jekyll offers a lot more customizability than Wordpress. I had to purchase
a custom upgrade on wordpress.com to be able to tweak the CSS. There was
no way to create custom subdirectories (you could only create "Pages") in
Wordpress, which was a little inconvenient since I hosted my top-level domain
there.

The first step was to import all my existing content. Jekyll offers a Wordpress
[import tool](http://jekyllrb.com/docs/migrations/), but I found it rather
lacking. The resulting markdown files weren't formatted correctly, and a lot
of metadata was missing. After looking around a little more, I found
[exitwp](https://github.com/thomasf/exitwp), a more full-featured tool that
claimed to preserve as much data as possible.

After [exporting](http://en.support.wordpress.com/export/) all your posts and
pages from Wordpress, you may need to make a small tweak to the resulting XML
file (if you're exporting from wordpress.com). Add a namespace declaration,
`xmlns:atom="http://www.w3.org/2005/Atom"` to the top-level `<rss>` element.
Then, tweak exitwp's `config.yaml` file to your liking. Mine looked like this:

{% highlight yaml %}
target_format: markdown
date_format: '%Y-%m-%d %H:%M:%S'
download_images: True
item_type_filter: {attachment, nav_menu_item}
item_field_filter: {status: draft}
taxonomies:
  filter: {category}
  entry_filter: {category: Uncategorized}
{% endhighlight %}

exitwp will also download all the images contained in your posts, which is
really convenient!

{% highlight bash %}
$ python exitwp.py
writing...........
done
{% endhighlight %}

Now that you have a bunch of Markdown files (they'll be in `build/jekyll/<domain>/_posts`), you can bootstrap your Jekyll site:

{% highlight bash %}
$ jekyll new kix
$ mv exitwp/build/jekyll/kix.in/_posts/* kix/_posts/
$ cd kix && jekyll serve
{% endhighlight %}

Access your brand new site at `http://localhost:4000`. Jekyll comes with a
simple default theme (the one used by [Tom Preston-Werner](http://tom.preston-werner.com/)),
so you can see if your posts were all imported correctly striaght away. You
may want to customize the look and feel of your website. Just start editing
`_layouts/default.html` to your liking! I used the [Pure](http://purecss.io/)
CSS framework, some icons from [Topcoat](http://topcoat.io/) and the color
scheme from [Solarized](http://ethanschoonover.com/solarized)
to build [the layout](https://github.com/anantn/anantn.github.io/blob/master/_layouts/default.html)
for this website.

The one thing I couldn't figure out how to automate was making sure syntax
highlighting for code snippets worked correctly. Code blocks are kind of a mess
in Jekyll right now, especially if you're going to be hosting on
[Github Pages](http://pages.github.com). In order to use Github-style
[fenced code blocks](https://help.github.com/articles/github-flavored-markdown),
you'll have to switch to using
[redcarpet](https://github.com/vmg/redcarpet) as the Markdown parser:

{% highlight yaml %}
markdown: redcarpet
redcarpet:
  extensions: ["no_intra_emphasis", "fenced_code_blocks"]
{% endhighlight %}

Unfortunately, I also wanted to enable
[SmartyPants](http://daringfireball.net/projects/smartypants/)
to display beautiful punctuation. Github Pages has
[enabled SmartyPants](https://github.com/blog/706-jekyll-puts-on-smartypants),
but only if you use [rdiscount](https://github.com/davidfstr/rdiscount).
Since I had to go in and convert all my code snippets to either fenced code
blocks or [liquid tags](http://stackoverflow.com/questions/8648390/syntax-highlighting-markdown-code-blocks-in-jekyll-without-using-liquid-tags),
I [opted to enable](https://github.com/anantn/anantn.github.io/blob/master/_config.yml)
rdiscount with SmartyPants and use liquid tags to highlight code.

Now for comments. Since Jekyll generates static HTML pages, the only option
is to use [Disqus](http://disqus.com/) (or a similar JS-only comment system - I
haven't come across any yet). Disqus makes it really easy to import your
Wordpress comments, just upload your wordpress.xml in the admin interface and
you should be good to go in a few hours.

Setting up a feed is really easy. Jekyll automatically runs every file that
starts with "`---`" through its processor, so simply create a `feed.xml` file
at the root that looks something
[like this](https://github.com/anantn/anantn.github.io/blob/master/feed.xml).
You can repeat this process to create seperate RSS and Atom feeds if you wish.

Finally, permalinks. The URL syntax for my site has (regrettably) changed over
the years, so there's lots of incoming links with varying permalink syntaxes.
I wanted to make sure these didn't break. Wordpress did a great job of
redirecting broken links as neccessary, but with Jekyll you'll need to use a
plugin like the [Alias Generator](https://github.com/tsmango/jekyll_alias_generator).
Unfortunately, Github Pages does not support plugins, so I had to use the
rather hacky approach of a [custom 404 page](https://help.github.com/articles/custom-404-pages).

Whenever you arrive at a broken link, Github will render the custom 404 page
instead. This doesn't help search engines, of course - you'd need a 301
redirect for that - but at-least for users I can
do a dynamic redirect to the closest match. Since the slugs always match
across multiple permalink syntaxes, I can do something simple like this:

{% highlight js %}
var toRedirect = {};
{% raw %}{% for post in site.posts %}
  toRedirect["{{ post.slug }}"] = "{{ site.url }}{{ post.url }}"
{% endfor %}{% endraw %}
var url = document.location.href;
for (var key in toRedirect) {
  if (url.indexOf(key) != -1) {
    document.getElementById("redirect").style.display = "block";
    setTimeout(function() {
      document.location.href = toRedirect[key];
    }, 2000);
    break;
  }
}
{% endhighlight %}

One caveat with this approach is that Github only recognizes a static
`404.html` as a valid custom 404 page - it won't run Jekyll on it. You'll
need to run `jekyll build` yourself to generate the HTML file locally, *before*
checking it in.

That's it! You'll notice that Jekyll is a fairly low-level engine, leaving
a lot of room for customization, but also requires a fair bit of work upfront.
If you're looking for something that's dedicated to blogging and easier to get
started with, check out [Octopress](http://octopress.org/). I haven't used it,
but it seems to be quite popular.

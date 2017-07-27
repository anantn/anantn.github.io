---
author: anant
comments: true
date: 2006-07-23 06:15:28+00:00
layout: post
slug: javascript-mochikit-php-x-tinymce-et-al
title: JavaScript, MochiKit, PHP, X, TinyMCE et. al.
wordpress_id: 984
---

So, it's been a while since I posted anything, but that only means I've been
in my coding hole all day all night!

Lots of progress on the editor front, I finally got started on the UI and
the AJAX backend. In priniciple, this is how it works: We have the welcome
page which first asynchronously makes a request to the server for an XML
file that contains everything needed to make the forms on the welcome page,
essentially the fields that the 'Create new File'  form requires. This may
sound stupid, we already know what we need to create a new GuideXML
document, but, I decided to take a more generic approach for two reasons:

* Easy Extensibility. What if there are changes to the GuideXML format
itself?! This way, we also open up avenues for making a generic XML editor,
not specific to GuideXML.

* Easy Translation. As mentioned in my proposal, I'm going to use the
PO-file format to handle translations. Requesting for information at the
very beginning allows me to get the strings to be displayed immediately.

True to the 'AJAX' concept, the PHP script returns an XML file (which is
actually part of a larger 'configuration' file for the editor itself, more
on that soon) which is then parsed by the friendly JavaScript and the form
displayed to the user.

I'm going to be focussing on the creation of new documents at first, and so
I've disabled the 'Edit existing Document' feature for now. So once the form
for creating a new file has been filled, the JavaScript once again kicks
into action and validates the form; if all is well, we submit the form to
another PHP script that handles the initialization of the editor itself.

Coming on the editor, what we have here is a 'Toolbox' on the left with 3
menus and a tabbed pane on the right which acts as the editor itself. The
first menu called 'Primary Elements' consists of buttons for modifying the
Title, Author(s), Abstract, Version and Date of the GuideXML document. The
second menu is called 'Content Elements' and has two buttons named 'Chapter'
and 'Section'. My plan is to be able to allow the user to simply
drag-and-drop the Chapter/Section button to the editor, and, voila a
Chapter/Section is inserted! Likewise with the 3rd menu called 'Body
Elements'.

In the editor area, every editable portion (title of the chapter/section,
contents of any body element etc.) highlights when you move your cursor over
it. Double-clicking it will open up a textbox (in cases of one-line contents
or when formatting is not required/allowed, the chapter title for example)
or a textarea (in cases where formatting is required, like the contents of
any body element). Now the textarea is where TinyMCE kicks in, all
textarea's on the page will be replaced by a heavily-modified and stripped
down version of TinyMCE that I am working on. Essentially, this WYSIWYG
widget will allow you to format the text as `<em>` and in the case
of all body elements other than , and `<em>` and `<var>` in the case
of pre-tags. Now this is kind of tough, I need to develop a plugin for each
of these tags, the only functionality I can reuse from TinyMCE is the
spellcheck plugin and the `<sup>` and `<sub>` tags.

Moving on to the backend, I was thinking of an XSLT file that translates the
GuideXML source to a div-filled HTML format suitable for display in the
editor and vice-versa. Actually we need two of these to convert from one
format to another, the one to be used will be determined by the active tab;
if the 'View Source' tab is active we convert the source to HTML, HTML to
source otherwise.

Some knick-knacks to sort out would be stuff like how frequently the file
should be saved, and how exactly that is to be done. All-in-all, pretty
interesting stuff, please do have a look at the code in the
[SVN repository](http://replay.waybackmachine.org/20061119152147/http://soc.gentoo.org/viewcvs.py/guidexml/) if you're interested!

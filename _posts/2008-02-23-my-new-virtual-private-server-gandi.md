---
author: anant
comments: true
date: 2008-02-23 15:21:55+00:00
layout: post
slug: my-new-virtual-private-server-gandi
title: 'My new virtual private server: Gandi'
wordpress_id: 192
---

I've been contemplating switching to a virtual private server for quite some time. The cheapest one I could find was [SliceHost](http://www.slicehost.com/). While their services seem to be great, $20 a month was too steep a price. A few weeks ago, I stumbled upon Gandi.

[Gandi](http://www.gandi.net/) is a known name in the domain registrar space, but they recently launched a "beta" version of their Xen-based [hosting service](http://www.gandi.net/hosting/proposal/). Because the service is beta, they offer a rock-bottom price of $7 per month for 256 MB RAM, 1/64th the processing power of a Quad Dual-Core AMD, and ~500GB of monthly traffic! Talk about tempting, I wasted no time in signing up :)

It's been 3 weeks now, and I must say that their service is absolutely fantastic. My server was up in no more than 10 minutes (that includes the time taken for payment). I chose a [Debian](http://www.debian.org/)-based machine (Gentoo isn't on their list yet :(). As soon as I logged in, I got to work - I needed to setup my web and mail server. Here's what I did first:

{% highlight bash %}
$ apt-get update
$ apt-get upgrade
{% endhighlight %}

Now to setup the web server with [PHP](http://www.php.net/) 5:

{% highlight bash %}
$ apt-get install php5 php5-cli
The following NEW packages will be installed:
apache2-mpm-prefork apache2-utils apache2.2-common libapache2-mod-php5
libapr1 libaprutil1 libexpat1 libpcre3 libpq4 libsqlite3-0 php5 php5-cli php5-common ucf
{% endhighlight %}

Edit the default configuration files to your liking and get the default web site running:

{% highlight bash %}
$ vi /etc/apache2/sites-available/default
$ /etc/init.d/apache2 restart
{% endhighlight %}

Now, onto the mail server. I chose the [postfix](http://www.postfix.org/), [procmail](http://www.procmail.org/), [saslauthd](http://asg.web.cmu.edu/sasl/), [spamassassin](http://spamassassin.apache.org/) and [dovecot](http://www.dovecot.org/) combo:

{% highlight bash %}
$ apt-get install postfix procmail sasl2-bin libsasl2-modules
The following NEW packages will be installed:
postfix procmail sasl2-bin ssl-cert
{% endhighlight %}

You'll be asked a few questions, but we're going to be reconfiguring anyway so it doesn't matter what you say:

{% highlight bash %}
$ dpkg-reconfigure postfix
General type of configuration?
Internet Site
Where should mail for root go
someuser
Mail name?
mail.example.com
Other destinations to accept mail for? (blank for none)
server.example.com, mail.example.com, example.com, localhost
Force synchronous updates on mail queue?
No
Local networks?
127.0.0.0/8
Use procmail for local delivery?
Yes
Mailbox size limit
0
Local address extension character?
+
Internet protocols to use?
ipv4
{% endhighlight %}

To get postfix to play along with saslauthd, we need to make some changes to the postfix configuration. You can edit `/etc/postfix/main.cf` directly, or use `postconf`:

{% highlight bash %}
$ postconf -e 'smtpd_sasl_local_domain ='
$ postconf -e 'smtpd_sasl_auth_enable = yes'
$ postconf -e 'smtpd_sasl_security_options = noanonymous'
$ postconf -e 'broken_sasl_auth_clients = yes'
$ postconf -e 'smtpd_recipient_restrictions = permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination'
$ postconf -e 'inet_interfaces = all'
$ echo 'pwcheck_method: saslauthd' &gt;&gt; /etc/postfix/sasl/smtpd.conf
$ echo 'mech_list: plain login' &gt;&gt; /etc/postfix/sasl/smtpd.conf
{% endhighlight %}

Since postfix on Debian runs in a chroot, you need to make sure it can access saslauthd:

{% highlight bash %}
$ mkdir -p /var/spool/postfix/var/run/saslauthd
$ vi /etc/default/saslauthd
# Edit to your liking, I use /etc/passwd as my auth source
$ /etc/init.d/postfix restart
$ /etc/init.d/saslauthd start
{% endhighlight %}

The most important thing while setting up a mail server is to test at every interval so you can know where a problem came from, if one comes at all. I tested whether postfix + saslauthd were working file using telnet. For the PLAIN authentication type, you can find your auth string by determining the [Base64](http://en.wikipedia.org/wiki/Base64) encoding of the string "usernamepassword". Here's a transcript of the telnet session ('<' is data sent from you to the server - meaning you have to type it and press the return key, '>' is data sent to your computer from the server):

{% highlight bash %}
$ telnet mail.example.com 25
> Trying 10.10.10.10
> Connected to mail.example.com.
> Escape character is '^]'.
> 220 mail.example.com ESMTP Postfix (Debian/GNU)
< auth plain AHVzZXJuYW1lAHBhc3N3b3Jk
> 235 2.0.0 Authentication successful
< quit
> 221 2.0.0 Bye
> Connection closed by foreign host.
{% endhighlight %}

When you see "Authentication successful", you can be sure that saslauthd is working fine with postfix. Now, edit the .procmailrc file in your home directory as required. I love procmail because it lets me do all sorts of preprocessing on my mail (liking moving spam to /dev/null and arranging mails into the proper IMAP folders).

I also use [greylisting](http://en.wikipedia.org/wiki/Greylisting), a technique used to block 99% of incoming spam (while spamassassin catches the rest 1%). This comes at a price though, whenever someone genuine sends you mail for the first time, it may take upto 20 minutes for it to reach your inbox. I'm not going to discuss greylisting in detail here, but I think 20 minutes is a fair compromise to keep my inbox spam-free:

{% highlight bash %}
$ apt-get install postgrey
The following NEW packages will be installed:
libberkeleydb-perl libdigest-hmac-perl libdigest-sha1-perl libio-multiplex-perl
libnet-cidr-perl libnet-dns-perl libnet-ip-perl libnet-server-perl postgrey
$ vi /etc/postfix/main.cf
# Add the line
smtpd_recipient_restrictions=check_policy_service inet:127.0.0.1:60000
# to the file
{% endhighlight %}

Time for another test to see if [postgrey](http://postgrey.schweikert.ch/) is doing its work. You also might want to send yourself a test mail to see if your system is working.

{% highlight bash %}
$ tail /var/log/mail.log
{% endhighlight %}

Now, for spamassassin:

{% highlight bash %}
$ apt-get install spamassassin spamc
The following NEW packages will be installed:
libarchive-tar-perl libcompress-zlib-perl libhtml-parser-perl libhtml-tagset-perl
libhtml-tree-perl libio-zlib-perl libsocket6-perl liburi-perl libwww-perl spamassassin spamc
{% endhighlight %}

You need to create a user so you can run spamassassin securely:

{% highlight bash %}
$ groupadd spamd
$ useradd -g spamd -s /sbin/nologin -d /var/lib/spamassassin spamd
$ mkdir /var/lib/spamassassin
$ chown spamd:spamd /var/lib/spamassassin
{% endhighlight %}

Now edit the spamassassin configuration:

{% highlight bash %}
$ vi /etc/default/spamassassin
ENABLED=1
OPTIONS="--create-prefs --max-children 5 --username spamd --helper-home-dir /var/lib/spamassassin -s /var/log/spamd.log"
$ vi /etc/spamassassin/local.cf
$ /etc/init.d/spamassassin start
# usual check
$ tail /var/log/spamd.log
{% endhighlight %}

Get postfix to start using spamassassin:

{% highlight bash %}
$ vi /etc/postfix/master.cf
# Append this to the first line:
-o content_filter=spamassassin
# and then add this at the end:
spamd   unix -     n       n       -       -       pipe
user=spamd argv=/usr/bin/spamc -f -e /usr/sbin/sendmail -oi -f
${sender} ${recipient}
$ /etc/init.d/postfix restart
{% endhighlight %}

Time for a final test!

{% highlight bash %}
telnet mail.example.com 25
> Trying 10.10.10.10...
> Connected to mail.example.com.
> Escape character is '^]'.
> 220 mail.example.com ESMTP Postfix (Debian/GNU)
< ehlo example.net
> 250-mail.example.com
> 250-PIPELINING
> 250-SIZE 10240000
> 250-VRFY
> 250-ETRN
> 250-STARTTLS
> 250-AUTH LOGIN PLAIN
> 250-AUTH=LOGIN PLAIN
> 250-ENHANCEDSTATUSCODES
> 250-8BITMIME
> 250 DSN
< auth plain AHVzZXJuYW1lAHBhc3N3b3Jk
> 235 2.0.0 Authentication successful
< mail from: test@example.net
> 250 2.1.0 Ok
< rcpt to: test@example.com
> 250 2.1.5 Ok
< data
> 354 End data with .
< Subject: Test Mail
< Let's see if you get this test mail!
< .
> 250 2.0.0 Ok: queued as 944E12E3EB
< quit
> 221 2.0.0 Bye
> Connection closed by foreign host.
{% endhighlight %}

Now how do you check if you actually got the mail? You can ssh into the server and use something like [mutt](http://www.mutt.org/), but a long term solution would be to setup an IMAP server so you can connect with your favorite [mail](http://www.mozilla.com/en-US/thunderbird/) [client](http://code.google.com/p/acme-sac/):

{% highlight bash %}
$ apt-get install dovecot-imapd
The following NEW packages will be installed:
dovecot-common dovecot-imapd libmysqlclient15off mysql-common
$ vi /etc/dovecot/dovecot.conf
{% endhighlight %}

The most important portions in the configuration file are the `protocols`, `mail_location` and `auth` sections. Once again, I chose to authenticate against `/etc/passwd`. Start the server and check for any warnings or errors:

{% highlight bash %}
$ /etc/init.d/dovecot start
$ tail /var/log/dovecot.log
{% endhighlight %}

Now, I also wanted to transfer all my mail from an old server to the new one. I came across a nifty utility called [imapsync](http://www.linux-france.org/prj/imapsync/) to do that for me:

{% highlight bash %}
$ apt-get install imapsync
The following NEW packages will be installed:
imapsync libio-socket-ssl-perl libmail-imapclient-perl libnet-ssleay-perl
libparse-recdescent-perl libterm-readkey-perl
$ imapsync --help
{% endhighlight %}

Phew!

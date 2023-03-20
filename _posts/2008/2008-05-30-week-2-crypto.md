---
author: anant
comments: true
date: 2008-05-31 23:49:40-07:00
layout: post
slug: week-2-crypto
title: 'Week 2: Crypto'
wordpress_id: 210
categories: [mozilla, javascript, favorite]
---

It's almost the end of my second week, and for the last 4 days I've been really frustrated trying to write some crypto code in Javascript. Just now, however, I got the 800-line beast to run successfully, and man, am I happy!

A little background here, [Weave](http://labs.mozilla.com/2007/12/introducing-weave/) encrypts data to keep it safe (duh). One of the primary goals of Weave is to ensure security of personal data, so at no point in time is the password ever stored anywhere (except if you ask the Firefox password manager to remember it for you, in which case it is also encrypted, but that's outside the scope of Weave). The current trunk version of weave simply issues calls to openssl to encrypt the data using RSA. The decryption also happens with calls to openssl, so we don't care in what format the data is encrypted, we just upload the Base64'ed version of the data to the server.

One of the ideas [Chris](http://cbeard.typepad.com/) had, however, was to create a web-based client so that users can access their data even when not using Firefox. And thus, one of the constraints here is that the decryption of the data *must* be done on the client-side, and thereby, entirely in portable Javascript. But that would also mean, that the uploaded encrypted data would have to be in a standard format.

[Dan](http://blog.sandmill.org/) had written a WeaveCrypto component that uses [PKCS #12](http://www.rsa.com/rsalabs/node.asp?id=2138) (not a fun standard, mind you) and [DES](http://en.wikipedia.org/wiki/Triple_DES) to encrypt data. DES is the usual Triple-DES algorithm, and PKCS #12 defines how the key and initialization vector for DES can be generated from the password. This encrypted data is then encapsulated in a [PKCS #7](http://www.rsa.com/rsalabs/node.asp?id=2129) format, which stipulates [ASN.1](http://asn1.elibel.tm.fr/) encoding. Well... now you know :roll:

It took me about 2 days to find out which standards the component was actually using, because the encryption was done by 3 simple calls to [NSS](http://www.mozilla.org/projects/security/pki/nss/). GDB to the rescue, I wrote a small console C++ application that linked against NSS and then traced the execution of my executable to see what was going on.

The Javascript decryption code is made of 5 basic parts:

  * ASN.1 parser: I didn't write a real ASN.1 parser, it only understands a particular type of ASN.1 encoding that NSS outputs for the very specific case of PKCS#12-Triple-DES encryption. This portion simply reads out the value of the salt, number of iteration and the encrypted text.


  * PKCS 12 Generator: This portion takes the salt and number of iterations to generate a 64 byte key and 8 byte initialization vector.


  * [DES Decoder](http://www.tero.co.uk/des/): This one takes the initialization vector, key and encrypted text to output a decrypted message.


  * [SHA-1 Hasher](http://snipplr.com/view/6175/javascript-implementation-of-the-sha1/) and [Base64-Encoder/Decoder](http://rumkin.com/tools/compression/base64.php): Self-explanatory.

I only wrote the first two parts, but it took a whole week. That says something about the PKCS #12 and ASN.1 standards - like - they're not meant to be used ;)

Anyway, it was fun while it lasted. Hoping to get started on the next portions of the Weave web-based client. Have a fun weekend everyone, I know I will!

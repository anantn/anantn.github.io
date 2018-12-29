---
author: anant
comments: true
date: 2009-10-11 15:26:53+00:00
layout: post
slug: how-does-weave-use-cryptography
title: How does Weave use Cryptography?
wordpress_id: 530
categories: [mozilla, favorite]
---

I'm back from the EU MozCamp in Prague and we all had a great time! Check out the slides from my talks: [Labs Overview](http://proness.kix.in/talks/mozcamp09-labs.pdf) and [Weave in Depth](http://proness.kix.in/talks/mozcamp09-weave.pdf).

A few people at the MozCamp were interested in Weave's use of cryptography to protect the user's data and privacy. Although the specs for the Weave server are [available](https://wiki.mozilla.org/Labs/Weave/0.5/API), it may take someone new a while to wrap their head around the whole scheme. I'm going to attempt explaining what crypto operations we do and why we do it in this blog post.

First, let's get some basic definitions out of the way. Symmetric cryptography means you have one key that can perform both encryption and decryption, and they are complementary operations. For Weave, we use [AES](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) with a 256 bit key, and we use it in a mode that requires an 'initialization vector' for every decryption. Asymmetric cryptography means there's a pair of keys (usually called 'public' and 'private' keys). A piece of text "encrypted" by one key can only be "decrypted" by the other key. Here, we use [RSA](http://en.wikipedia.org/wiki/RSA) with a 2048 bit private key.

So, when a user first signs up for Weave using the wizard on their computer, we generate a (random) pair of public and private keys. Next, we use the user's passphrase to create a symmetric key. This is done using a pretty standard algorithm known as [PBKDF2](http://en.wikipedia.org/wiki/PBKDF2) (short for "Password Key Derivation Function"). The PBKDF2 algorithm requires a 'salt' value which is also stored on the server. Now that we have a symmetric key, we use it to encrypt the user's private key and upload it along with the public key to the server. Note that the passphrase is never sent to the server, so if the user's password ever gets compromised all the attacker can get is their encrypted private key, which really isn't of much use (especially given that the key is 2048 bits long).

Whenever a particular "engine" is to be synchronized (an engine could be Tabs, Bookmarks, History etc.) we generate a random symmetric key for that engine. This key is then encrypted using the user's public key (now, one can only retrieve the original symmetric key with the corresponding private key) and uploaded as being associated with a particular engine. All entries (the 'ciphertext' property in a "Weave Basic Object") in that engine are encrypted with the symmetric key that was generated for it.

To make things clear, let's enumerate the steps we would take to decrypt a single tab object for user 'foo':

1. Find the user's cluster by making a GET request to `https://services.mozilla.com/user/1/foo/node/weave`. It returns `https://sj-weave06.services.mozilla.com/`.

2. Fetch the user's encrypted private key and public key from `https://sj-weave06.services.mozilla.com/0.5/foo/storage/keys/privkey` and `https://sj-weave06.services.mozilla.com/0.5/foo/storage/keys/pubkey` respectively. The user's password is required to access these JSON objects.

3. Ask the user for their passphrase and generate a 256 bit symmetric key from it using PBKDF2 and the 'salt' found in the privkey object.

4. Use the generated symmetric key and the initialization vector found in the 'iv' property of the privkey object to decrypt the user's private key.

5. Fetch the user's encrypted tab objects from `https://sj-weave06.services.mozilla.com/0.5/foo/storage/tabs/?full=1`.

6. Fetch the corresponding symmetric key (the URL is also listed in the "encryption" property of every WBO), in this case `https://sj-weave06.services.mozilla.com/0.5/foo/storage/crypto/tabs`.

7. Decrypt the symmetric key with the user's private key.

8. Use the decrypted symmetric key to decrypt any WBO from the tabs collection with the initialization vector found in the 'bulkIV' property of the tabs symmetric key WBO.

9. **Profit**.

A word about the formats in which the keys are actually stored in. All values are Base64. For symmetric keys, the key is stored as-is. For asymmetric keys, I wish we used a standard format like PKCS#12, but we don't. It's still [ASN.1](http://en.wikipedia.org/wiki/ASN.1) though, in some format NSS exports private keys in. You need to do a bit of ASN.1 parsing to figure out the values you're interested in.

Fortunately, I've already figured out most of the details for you - check out my [Javascript](http://hg.mozilla.org/labs/weaveweb/file/tip/weave.js#l163) or [PHP](http://hg.mozilla.org/users/anarayanan_mozilla.com/weave-proxy/file/tip/crypto/) implementations of the crypto elements required to decrypt Weave Basic Objects.

Finally, a quick note about why we do all this. Sharing is now reasonably easy, if you want to share your bookmarks with someone, you just need to encrypt the corresponding symmetric key with their public key and they're good to go. Also, each WBO has it's own 'encryption' property so this can be as granular as needed. Secondly, the passphrase is never stored anywhere (except possibly on the user's computer) so the server never sees anything other than encrypted blobs of Base64'ed text. Along with making HTTPS mandatory, we think this is a pretty secure way of protecting the user's data.

If you have other encryption schemes that might fit into Weave's use cases please let us know! (We've already been looking at interesting developments in this area such as [Tahoe](http://allmydata.org/~warner/pycon-tahoe.html)). I'd also love to hear from you if you have any questions on our current cryptography scheme. We're constantly trying to improve the security and efficiency of our system so these details are only valid until we change our scheme :-)

Now, go write that third-party Weave client, you have no excuse not to!

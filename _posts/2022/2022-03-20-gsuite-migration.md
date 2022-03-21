---
author: anant
comments: true
layout: post
slug: gsuite-migration
title: Migrating a G Suite Legacy Account
categories: [favorite]
---

Google [recently announced](https://9to5google.com/2022/01/19/g-suite-legacy-free-edition/)
that all "G Suite legacy free edition" (formerly known as "Google Apps", currently known as "Google Workspace")
accounts will need to transition to their paid workspace plans starting July 1, 2022. Legacy users will get access
to a discounted rate of $3/user/month, which will turn into $6/user/month starting July 2023 at the lowest tier.

I'm the sole user on my G Suite account, so the new rates aren't a big issue per se. I've been getting a ton of
value from this service for over a decade &mdash; namely the ability to use Gmail and other Google services but
with my own custom domain.

The bigger issue is that Google Workspace accounts have long been denied access to several products.
You [can't use the new GPay](https://support.google.com/googlepay/answer/10191029?hl=en), you cannot sign up for
[Google One](https://one.google.com/about), and you cannot sign up for a [Pixel Pass](https://support.google.com/store/answer/11201976?hl=en).
For some time you couldn't sign up for Google Fi either, though [that changed](https://workspaceupdates.googleblog.com/2017/06/project-fi-now-available-for-g-suite.html) a few years ago.

So with this news, I decided to bite the bullet and transition my account to a plain old consumer Google account.
Google already has a mechanism to [transition educational accounts into personal ones](https://support.google.com/a/answer/6364687?hl=en),
and it appears they might be working on a [solution for all accounts "soon"](https://bit.ly/3qoBaNh). However, I
didn't want to wait for that solution, and I don't have a ton of payments or purchases on my GSuite account. It's
mostly the data that needed to be moved, and I figured this would be a good exercise to see how much of my life
exactly depends on my Google account.

I came across this [excellent article](https://www.39digits.com/migrate-g-suite-account-to-a-personal-google-account) detailing the steps. I had to tweak some of the instructions
to fit my use-cases, and in some cases found simpler ways to migrate, which I'll write about here.

## Setup

Before you begin, it is important to note what you _cannot_ transfer from a G Suite account through a manual
migration:

- Any purchases or subscriptions made through Google Play (Apps, music, games).
- Google pay subscriptions and payment methods.
- Accounts on external websites that you signed into via Google.

That last point varies from provider to provider, some will let you relink by verifying your email address, but
others won't work at all. You can review all third-party apps you [logged into via Google here](https://myaccount.
google.com/permissions).

I'm probably missing other things &mdash; but if any of these are important to you then this migration is not suitable.
You're better off upgrading to the paid plan, or waiting for Google to roll out their migration tool.

I'll refer to the old G Suite account as a "workspace" account here on out. The new plain old consumer Google
account will be called the a "personal" account.

1. **Start by backing up everything in your workspace account.** You can do this via [Google Takeout](https://takeout.google.com/settings/takeout). It may take a day or two for them to generate the data depending on how much you have. Recommend storing these zip files somewhere safe.

2. **Review the services and data** stored on your workspace account [via this dashboard](https://myaccount.google.com/dashboard). It gives you a nice overview of all your data and services used, which will come in handy as you decide how to migrate each one.

3. **Create a new browser profile**, and sign up for a "plain" Google account, one with a @gmail.com suffix. Having both accounts logged in on two Chrome profiles is pretty handy as you follow the steps below.

Now, we'll start migrating data for each service one-by-one.

## Gmail

This is arguably the most important service &mdash; and was the primary reason I signed for a workspace account all
those years ago.

We'll do this process in three phases:

### Redirect incoming mail

If you use Google domains to manage your custom domain, this part is relatively easy. You can use the Google
domains [email forwarding feature](https://support.google.com/domains/answer/3251241?hl=en) to redirect all mail
from your workspace email address into your personal one.
If you don't use Google domains built-in DNS service, forwarding won't work &mdash;
you will have to [update MX records at your DNS host](https://support.google.com/domains/answer/9428703?hl=en).
My DNS is run by Cloudflare, and updating my MX records to the ones listed on that support page worked well.

```
# Name  # Type  # Priority  # Value
@	MX	5	    gmr-smtp-in.l.google.com
@	MX	10	    alt1.gmr-smtp-in.l.google.com
@	MX	20	    alt2.gmr-smtp-in.l.google.com
@	MX	30	    alt3.gmr-smtp-in.l.google.com
@	MX	40	    alt4.gmr-smtp-in.l.google.com
```

Send a test email from somewhere else to make sure you are able to receive email for your custom domain in the inbox of your personal account before proceeding.

### Configure outgoing mail

Now let's make it so you can send email for your custom domain but from your personal account.

1. On the gmail screen in your personal email, go to "Settings", then "Accounts and Import".
2. Click on "Add another email address" under "Send mail as".
3. Put in the email of your workspace account, with "Treat as an alias" checked.
4. Enter `smtp.gmail.com` as the SMTP server, set port to `465`, and put in the credentials to your _personal_ account in username and password.
5. This won't work the first time, and you'll be directed to enable "Less-secure" mode for your personal Google account, which [you'll have to enable](https://myaccount.google.com/lesssecureapps).
6. Retry with your credentials again and it should work this time. You can now set this email as the default through the "make default" link.

Try sending an email and ensure everything is working properly.

### Migrate all your old mail

There are a few ways to move all your email: using POP/IMAP is a popular option but has a drawback that you can't migrate labels if you made heavy use of them.

I decided to use a custom tool &mdash; ["Got Your Back"](https://github.com/GAM-team/got-your-back) &mdash; which uses the Gmail API and preserves labels.

```bash
# This is generally a pretty terrible way to install scripts, be warned
bash <(curl -s -S -L https://git.io/gyb-install)
```

Start by downloading all your email from the workspace account:

```bash
# gyb installs into ~/bin by default
~/bin/gyb --email <your-workspace-account@custom.domain>
```

This process will first ask for authorization to manage your Google cloud account (instructions provided when you run the command).
Once you've created the app, make sure to go into "APIs & Services" > "Oauth consent screen" and click "Make external". You can make it external for just one "Test user",
enter the email for your personal account here. This will be necessary later when you import your emails into the personal account.

After the cloud app is created and you've pasted in the requisite client ID & secret, GYB will request authorization to read your email. On this screen, it is sufficient
to grant just "readonly access". GYB will then begin downloading your email &mdash; this process took around 2 hours for me, YMMV.

Once this is done, you can then upload the email to your new account:

```bash
~/bin/gyb --email <your-personal-account@gmail.com> --action restore \
    --local-folder GYB-GMail-Backup-<your-workspace-account@custom.domain>
```

This process takes much longer (took around 14 hours for me). You can tend to moving your other services while this is happening, but you should see all your old email
start appearing in your personal inbox.

You can delete GYB from your cloud console when the process is complete.

### Filters

If you have a lot of filters, you can export them from the "Filters and Blocked Addresses" settings page. Select all the filters &mdash; or just ones you want to move &mdash; and click export.
You can then import this file into your personal account. I recommend doing this after GYB has finished uploading your new email and labels, as the filters will rely on them.

## Calendar

Migrating this involves a simple export & import of your calendar events through a single file.

1. From the workspace calendar, go to Settings (gear in the top-right), then "Import & Export".
2. Click on "Export", which will download a zip file.
3. Unzip the file and upload it in the "Import" section of settings on your personal account.

Note that this will only copy the events, but not any linked users. You'll also have to re-share any calendars imported if you had shared them previously.

## Photos

Your takeout zip file should contain all your photos which you can upload again. However, I found an easier way to accomplish this, by using the ["partner sharing"](https://support.google.com/photos/answer/7378858) feature. On your workspace account, initiate a partner share from settings to your personal account and accept it on the other end. On the personal account, select the option to save all photos from your partner account into your library.

Once I did this, face recognition on my family and pets didn't work out of the box. I had to disable and re-enable the feature from my personal account to get this to work. After about a day, the timeline and photos all appeared exactly as they did in the workspace account. You may disable partner sharing once all photos have been saved to the library on your personal account.

Keep in mind that any albums shared with your workspace account must also be shared to your personal account &mdash; manually and one at a time. This can be a time consuming process depending on how many albums were shared with you, but I found no way to automate this.

## Drive

I didn't have much stuff in Google drive, so I ended up just uploading everything again manually. For any Google sheets, docs, or slides &mdash; just share them directly with your personal account. Google Drive does offer a [desktop app](https://www.google.com/drive/download/) to make this process a bit easier.

## YouTube

I was rather lucky in this regard. Back when Google asked all YouTube accounts to be migrated to a Google Plus account, the backlash was so immense that they quickly offered an option to keep your YouTube account separate (but linked) to your Google account. I remember taking advantage of this option, which has since come to be known as a ["brand" account](https://support.google.com/youtube/answer/9367690?hl=en).

If you're in a similar situation as me &mdash; transferring your YouTube uploads, watch history, and playlists becomes somewhat simple. You need to add your personal account as an admin to your channel &mdash; doing this is not obvious. Go to [studio.youtube.com](https://studio.youtube.com/), click "Settings" in the left pane, then "Permissions" > "Manage Permissions". This takes you to a page where you can invite your personal account as an "Owner" to your channel.

After 7 days, you will be able to switch the personal account from just "Owner" to "Primary Owner". At this point, you can remove the workspace account, and still retain your YouTube account.

## Google Fi

Moving a Fi mobile subscription to a personal Google account is thankfully a [documented and supported](https://support.google.com/fi/answer/6201840#zippy=%2Cwhat-to-do-if-your-admin-turns-off-google-fi) process. Painful, but doable.

Contact [Fi support](https://support.google.com/fi/gethelp) and they'll walk you through the steps. It generally involves verifying both your workspace and personal accounts. You can only do this if you have fully paid off your phone. If you have additional friends or family on your account, you'll have to remove them from your plan (temporarily). This was the most painful part of the process as additional Fi subscribers on my account basically lost cell service for around 2 hours.

Once it is moved over, you keep your original phone number, billing, and service. At this point you can re-add your friends & family, everything should be back to normal.

## Analytics

If you use Google analytics, you can add your personal account as an admin for any properties you created. By giving this account full admin privileges, you retain basically the same functionality as before.

## Cloud

In case you use Google Cloud or Firebase, these services are also tied to your workspace account. Similar to Analytics, adding your personal account as admin on projects you wanted to keep was a simple way of retaining access.

## Alerts, Groups, Keep

I found no way to migrate these services to the new account. I manually recreated alerts from my personal account, and re-subbed to the groups I was interested in. For Keep, the notes you had are available in the takeout file as plain text.

## Android Phone

The final step was to switch my Android phone to my personal account. You can login with [multiple Google accounts](https://support.google.com/googleplay/answer/2521798?hl=en) on Android which was helpful. I first moved by WhatsApp backup, by uploading it to my personal account (you can also use [local backup](https://faq.whatsapp.com/android/chats/how-to-restore-your-chat-history)).

After about a week of using my phone this way to make sure all data was moved over, I did a factory reset and logged back in with only my personal account. It's been a couple of weeks using it that way and I haven't had to go back to my workspace account for anything!

## Closing Thoughts

Switching from workspace to a personal account was a time consuming yet insightful process. As more and more of your personal data moves to the cloud, you end up being beholden to a single company for your whole digital life. This can be scary, and using a custom domain is one of the important ways in which I'm able to retain some control over my digital identity. Going through this process made me build some confidence in my ability to move things over to a new provider should the need arise in the future.

While being able to download your data through services like Takeout is a helpful start, we are still a long way from true data portability. As the process above has outlined, it's not just about access to your **raw data** but **metadata** that may be provider specific &mdash; such as comments on photos, filters & labels on your email, and your video uploads and watch history. I dream of a future where you are able to seamlessly store, control, and and move not just your raw data but also all digital interactions that you have had or others have had with content you create.

Google has been working on the [Data Transfer Project](https://datatransferproject.dev/), which Apple recently joined and includes contributions from Facebook, Microsoft, and Twitter. The project has similar goals but currently only works for moving Photos between a select few services. We shall if this initiative will expand to more types of data in the future!

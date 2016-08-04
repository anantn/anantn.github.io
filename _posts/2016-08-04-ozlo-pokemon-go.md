---
layout: post
comments: true
category: favorite
slug: ozlo-pokemon-go
title: Teaching Ozlo about Pokémon GO
---

Pokémon GO is all the rage these days. [Ozlo](https://www.ozlo.com), your friendly AI sidekick,
would be remiss if he didn't help you catch them all!

![Ozlo learns about Pokémon GO](/images/2016/ozlo-pokemon.png)

Thanks to Ozlo's unique, knowledge-based approach to the world, we were able to teach him about
Pokémon in just under a week, including how to find PokéStops and Pokémon Gyms near places you
might be going. In this blog post, we'll take a look at some of Ozlo's inner workings,
what goes into teaching him a completely new concept, and why his ability to learn quickly matters.

The process involves three high-level steps:

* Feeding Ozlo data about the new concept
* Teaching Ozlo to understand how people talk about the concept
* Teaching Ozlo how to talk to people about what it knows

We'll cover each of these steps one-by-one and then discuss why it's important we do things this way —
and why that makes Ozlo fundamentally different than many other chatbots and AI assistants out there.

## Data

Ozlo's view of the world consists of *entities* (people, places, or things) and relationships among them.
Teaching Ozlo about something new begins with acquiring data about the subject that so we can augment
his knowledge of the world. This can happen by several means — crawling the web, hitting APIs,
and obtaining data from partners, for example.

In Pokémon GO's case, we decided to focus on a use-case that helps you play the game effectively but
doesn't break it or cheat in any way: finding PokéStops. PokéStops are places all around the world,
and they have certain attributes that identify them: coordinates, a name, picture and sometimes a description.

Once we found all the PokéStops in the US, we turned them into entities and started creating relationships.
Ozlo already knows about all the cities in the US as well as what landmarks and restaurants exist in each city.
With this knowledge, he can perform reasoning to know that if a given place is inside the polygon for a given
city's boundary, then the place must be in the city (and so on...)

When this process concludes, Ozlo has a mental map of where all the PokéStops in the US are located,
which of them are "gyms", what cities they are in, and which landmarks and restaurants they are near.

## Understanding

Next, we had to teach Ozlo some of the common ways in which humans might ask him about PokéStops.
In the beginning that involves just writing out some examples and telling Ozlo what each of them mean.

Consider the following sentence, resembling something a human might ask Ozlo:

> "Show me pokemon gyms near the ferry building"

There's a lot in that sentence that Ozlo can already understand! He has a basic understanding of the English language,
but also knows how people talk about restaurants and landmarks (since we taught him that earlier). What does Ozlo see
in that sentence?

> *"show me"*: Here's a hint that the answer to this question requires some sort of visual presentation.

> *"near"*: I've seen this word many times before and when it is followed by a name of a place, I know what that means.

> *"ferry building"*: Looks like I have many entities that match this name. But, I can rank all the places with this
name by their popularity and distance from where the user currently location to narrow down a likely candidate.

The only part of that sentence Ozlo didn't quite understand was "pokemon gyms". This is where we step in and give him
some examples along with what they mean:

> *"pokestops"*: This means entities that are PokéStops

> *"pokemon gyms"*: This means entities that are PokéStops of type "gym"

We also added many more variations of the above to give him a basic understanding of PokéStops. And don't forget —
Ozlo also keeps learning as you use him — so he'll collect a lot more examples over time than what we just start
him off with!

## Presentation

The final step was to teach Ozlo how to turn his answer into words and interactions that humans can understand.
In many ways this is exactly the reverse of Ozlo trying to translate what a human said into terms he can understand.

Ozlo already has a good knowledge of English, so he can mostly construct the sentence on his own. We just need to give
him a few hints and we get:

> "There are many Pokémon Gyms around Ferry Building"

Then we construct the visual format of the response. In our iOS app we settled on using the "multi-pin map" element,
which is an easy way to view several points of interest in a given geographic area. For now, we just tell Ozlo what
type of visual result format to use, based on the user's device.

![Ozlo learns about Pokémon GO](/images/2016/ozlo-pokemon-mpm.png)

Ozlo's capabiltities aren't limited to just rendering maps though - he can choose between a variety of output formats -
and we pick the one that's best suited to the medium you're using to communicate with him.

## Why This Matters

Why go to all this effort to actually teach Ozlo about PokéStops instead of just having Ozlo redirect your question
to some other service? We've talked about the [multi-agent problem](http://venturebeat.com/2016/07/17/personal-assistant-bots-like-siri-and-cortana-have-a-serious-problem/) before — and we believe there is a fundamental
difference between bots that **know** things and bots that **guess** what other services might know about things.

As Ozlo's knowledge of the world grows, adding more data to it enriches his entire world view. There's a network effect
between entities — because these entities have relationships with each other — adding new entities has an exponential
effect on Ozlo's understanding of the world. This is what lets us leverage the fact that Ozlo already knows about
"the Ferry Building" to help you find out what PokéStops are near it with only a minimal amount of effort.

We can't wait for the day where we're not the only ones teaching Ozlo about new concepts! In the meantime, please keep
using Ozlo and giving him feedback to help him continue to learn more about the world.

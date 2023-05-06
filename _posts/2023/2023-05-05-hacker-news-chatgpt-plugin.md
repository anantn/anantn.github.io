---
author: anant
comments: true
layout: post
slug: hacker-news-chatgpt-plugin
title: "Building a Hacker News ChatGPT Plugin"
categories: [ai, favorite, hacker-news]
---

I recently received access to develop and use ChatGPT plugins, and embarked on a project to build a Hacker News integration as a learning exercise. My goal was to enable retrieval of content from HN to answer questions and produce insights in conversations with ChatGPT. Here is a short video demo of what the experience looks like:

<video controls src="https://user-images.githubusercontent.com/37190/236521903-da8eb5a6-3b8e-4125-a8c0-64b869d47f55.mp4"></video>

If you don't have ChatGPT plugins access, you can play with a watered down version of just the [semantic search part of the project here](https://hn.kix.in). The source code for this project [can be found on Github](https://github.com/anantn/hn-chatgpt-plugin).

In this blog post I'll cover the process of building this plugin. If you are interested in learning about how ChatGPT plugins work, the Hacker News API and dataset, or building a semantic search index through use of embeddings &mdash; read on!

## What are ChatGPT plugins?

[Plugins are a new feature](https://openai.com/blog/chatgpt-plugins) announced by OpenAI that allows ChatGPT to extend its functionality by calling external APIs. This unlocks key capabilities such as web browser and code execution, but also allows for bringing various data sources into the large language model. No more "knowledge cutoff" problems!

The [official documentation](https://platform.openai.com/docs/plugins/introduction) goes into the process of building a plugin in much more detail, but at a high level, you can build a ChatGPT plugin by:

* **Describing an existing (or new) API** to ChatGPT in plain english. The specific format is the “OpenAPI” (formerly Swagger) spec, but the most important fields in the spec are the description fields which ChatGPT will read to understand your API.
* **Processing API calls** when ChatGPT calls them. The system will decide when to invoke your API given your description and the user’s utterance, it generally does a pretty good job at this. Data returned by your API will then be processed by ChatGPT as part of the “prompt” in order to do whatever the user is asking - whether it is taking an action or answering a question.

There [is a waitlist](https://openai.com/waitlist/plugins) for both using and creating plugins, if you aren't signed up already.

## Tips for plugin development

While in theory you can just "plug and play" an existing API by providing an OpenAPI specification for it, to get the most out of the integration, I've found that creating something more bespoke to the specific style in which ChatGPT invokes them is useful. A few things I've learned:

* **Fewer calls with more arguments are better than many calls with fewer arguments**. My initial design for the hacker news API involved individual endpoints for stories, comments, polls, etc. Simplifying it to just `/items` and `/users` with many query parameters to further control the output worked much better.
* **Learn what functionality to add by iteration**. I found that ChatGPT would sometimes hallucinate parameters for your API that don't exist. My initial API did not have a `sort_order` parameter, but I kept seeing ChatGPT add it for certain types of queries. That was a good hint for me to just implement it! You can (and should) [run a plugin API on localhost](https://platform.openai.com/docs/plugins/getting-started/running-a-plugin) first which makes iteration fairly quick and easy.
* **Be as terse as possible**. This holds true for both your OpenAPI specification and the actual API responses. You do need to be descriptive but short and to-the-point descriptions actually stuck more than lengthy flowery language. I've noticed that if your actual API responses are too long, it increases chances of hallucinations or the model just ignoring your response. This is likely related to context window limits for the GPT models.
    * The official documentation states the limit for API respones is 100,000 characters - in practice you'll want to be well below it.
    * Some plugin authors have found a trick by forgoing JSON as an output format altogether, plain text responses work just as well and saves quite a few characters!
* **Be tolerant of inputs, more than usual**. ChatGPT is a very language driven model and is not as precise when it comes to numbers. Avoid use of things like UNIX timestamps in your APIs, it's often better to receive standardized date formats like ISO8601, and even better to accept natural language.
    * Using parsers like [`dateparser`](https://github.com/scrapinghub/dateparser) in python for processing natural language dates and times can be helpful.
    * ChatGPT often inserts comments into its `POST` requests. If you handle JSON as payload, use a parser like [`json5`](https://json5.org/) to be tolerant of this.
* **Set reasonable defaults**. I've fluctuated on the default `limit` value for the `/items` endpoint, from 1 to 10 and back to 5. I've found that 3 was the magic number that allowed the response to be as long as possible without throwing ChatGPT off the rails while still being useful enough to summarize any given topic.
* **Use ChatGPT itself to help you**! Not only can ChatGPT write code for the implementation of your API, it's also very good at creating terse descriptions of APIs from lengthy documentation. That's often a great starting point - I started my project by throwing the [Hacker News Firebase API documentation](https://github.com/HackerNews/API) at it.

With these guidelines in mind, here is a rough sketch of what we want a Hacker News API to look like:

```yaml
/items          # find and retrieve stories, comments, polls, or jobs
    query       # search for items matching this text
    type        # story, comment, poll, job
    by          # filter by author
    after_time  # content submitted after this (natural language ok)
    before_time
    min_comment # minimum number of comments for a story
    max_comment
    min_score   # minimum score for a story
    max_score
    sort_by     # relevance, score, time, or number of comments
    sort_order  # asc or desc
    limit       # maximum number of items to return
    offset      # offset into the results to page through
/users          # find and retrieve users
    ...         # similar API as above
```

You can see the full API I [ended up with here](https://hn.kix.in/docs). The directions you give the plugin in the `ai-plugin.json` manifest file through the `description_for_model` are even more important than the individual `description` lines you put in your OpenAPI schema. This part will likely take a lot of tweaking for you to find something that works optimally. For the hacker news plugin, here is the prompt I ended up using:

```
Retrieve stories, comments, polls, and jobs from the Hacker News (HN) community in real-time. Follow these guidelines:

General rules:
1. You MAY provide natural language for dates, but ONLY after converting spelled-out numbers into their numerical equivalents. For instance, 'a couple of days' should become '2 days' and 'few weeks later' should become '3 weeks later'.
2. ALWAYS attempt to provide the hacker news URL (hn_url) and original URL (url) in your response.
3. ONLY incorporate API response data in your output.
4. Utilize the 'text' and 'top_comments' fields from API responses to answer questions, provide insights, and generate summaries.

Using find_items:
1. Search for user requested topics with find_items.
2. Remove 'Ask HN' prefix from user queries when providing them as the 'query' argument.
3. Use 'text' and 'top_comments' fields to answer questions or provide summaries.
4. Request a minimum of 3 stories for summarizing or searching a topic.

Using get_item:
1. Obtain more comments for any story using this endpoint.
2. Provide an ID obtained from find_items.

Using get_user and find_users:
1. Use get_user to access detailed information about a single user.
2. Employ find_users to search for users based on specific criteria.
```

Now let's talk about the best way to implement this API!

## Search index considerations

There are really two main pieces to our API. The first is to retrieve content matching a certain set of filters, which feels like a straightforward mapping to a SQLite database or even directly with the Hacker News Firebase API.

The second, more interesting part is implementing the `query` argument on the `/items` endpoint. Plugin users are likely to want to retrieve many kinds of content from hacker news using natural language.

Hacker News already has a [Firebase API](https://github.com/HackerNews/API) to retrieve the raw data, but this by itself is insufficient, as you need a search index in order to properly rank and retrieve only a *subset* of documents for any given user query.

There are basically two options for building such a search index:

1. **Traditional keyword search**. This is the classic information retrieval technique refined over a couple of decades, and services like ElasticSearch and Algolia make it easy to create such indexes. Algolia already has a [great HN search index](https://hn.algolia.com) that can “plug and play” with ChatGPT plugins for the most part.
2. **Semantic search**. With all the attention on AI recently, a fairly old technique called “embeddings” has received renewed interest and enthusiasm. Embeddings are a way to generate an n-dimensional vector for any input content, such that content “similar” to each other will be near each other in this n-dimensional space.

I first built a plugin with the [Algolia search API](https://github.com/anantn/hn-chatgpt-plugin/tree/main/algolia). It performed relatively well, especially when the questions were “keyword-y” in nature, like asking for more information about a specific a project or person. However, there was room for improvement on questions that were more generic in nature or long queries of a conversational style. There is no publicly available API or dataset for embeddings on the HN corpus, so time to roll up my sleeves and build one!

## Downloading the dataset

👉 [Download the SQLite DB from HuggingFace](https://huggingface.co/datasets/anantn/hacker-news/tree/main) 🤗

The first step was to download the Hacker News corpus onto my computer. As of April 2023, HN contained just under 36 million items (an item can be a story, comment, job, or poll) and just under 900k users. That’s small enough to download and process on a single computer but large enough to make it a non-trivial and interesting exercise!

I wrote implementation in [node](https://github.com/anantn/hn-chatgpt-plugin/tree/main/hn-to-sqlite/node), [go](https://github.com/anantn/hn-chatgpt-plugin/tree/main/hn-to-sqlite/go), and [python](https://github.com/anantn/hn-chatgpt-plugin/tree/main/hn-to-sqlite/python) to see which one would perform best. Node turned out to be the most reliable because it uses the Firebase SDK while the go and python versions used the REST API. I ended up using the node version, taking the performance hit for better reliability. To make the download faster, I simply parallelized it over 32 AWS spot instances:

* [fetch.js](https://github.com/anantn/hn-chatgpt-plugin/blob/main/hn-to-sqlite/node/fetch.js) is the core download script.
* [run.sh](https://github.com/anantn/hn-chatgpt-plugin/blob/main/hn-to-sqlite/node/run.sh) is a quick-and-dirty user-script to parallelize the download on AWS EC2. Note the hard-coded number of machines.
* [fetch-users.js](https://github.com/anantn/hn-chatgpt-plugin/blob/main/hn-to-sqlite/node/fetch-users.js) is a script to fetch user data profiles, can be done on a single machine and is fairly quick.
* [merge.py](https://github.com/anantn/hn-chatgpt-plugin/blob/main/hn-to-sqlite/python/merge.py) can be used to merge each partition into a single sqlite file.

This cost around $4 and took an hour to run. The final DB is around 32GB on disk, but compresses down to 6.5GB. Check out [this python notebook](https://github.com/anantn/hn-chatgpt-plugin/blob/main/playground.ipynb) for quick and dirty ways to visualize data from this SQLite table.

<aside>
⚠️ Note: the database on hugging face includes indexes on various columns for efficient queries. I added these indexes after bulk download & inserts which is much more efficient. Incremental inserts are now slower due to these indexes, but the volume is low enough to not matter.
</aside>

## Constructing embeddings

Next step is to take all this content and generate embeddings from them. To do this, we have three main questions to answer: what embedder to use, how to structure the input content, and where will we store the embeddings for retrieval.

### Embedder options

There are many ways to construct embeddings from all kinds of data (text, images, even video). Our focus is on text, so a good place to start is by looking at the “Massive Text Embedding Benchmark” (MTEB). You can filter the leaderboard by various criteria to find the right embedder for your use-case.

Note that some embedding services run in the cloud behind an API call, such as OpenAI’s [ada-002](https://beta.openai.com/docs/guides/embeddings/types-of-embedding-models) or [Cohere](https://docs.cohere.com/docs/embeddings). Most of them can be downloaded and run locally though, normally in python. [LangChain](https://python.langchain.com/en/latest/index.html) is a good way to quickly experiment with different embedders with small datasets.

After a bunch of experimentation, I decided to pick [`instructor-large`](https://github.com/HKUNLP/instructor-embedding) as it gave me a good balance of quality and speed of generation, plus the ability to run locally and leverage [my new NVIDIA GPU](https://twitter.com/anantn/status/1641672926687801344). 

In your selection of the embedder, also keep in mind that whatever you choose to embed your corpus will also be the one you will need to use at runtime when processing user queries!

### Structuring input documents

Most embedding models have a maximum token length they will accept as input, so we need to think about how to represent our data. The default for `instructor-large` is `512` tokens, but can be extended to around `1024` with only a slight dip in quality.

The naive approach would be to simply embed each item in our table (story or comment), giving us around ~35 million embeddings. But most of these items are much smaller than 512 tokens, not to mention, not every piece of content is worth embedding because it might be spam or of low relevance.

Since comments on a story are usually pretty related to the story itself, a smarter way would be to group all the comments for a story along with the story text and treat it as a single “document”. By adding an additional filter for stories that have at-least 20 upvotes and 3 comments to make each document meaningful (and weed out spam), we get:

```sql
sqlite> select count(*) from items where score >= 20 and descendants >= 3;
402007
```

That's a much more manageable ~400k documents. Keep in mind that since we are grouping comments together with the story, a document can get much longer than 1024 tokens. To solve this, we will chunk each document into “pages” of up to 1024 tokens each. It seems on average, every document is around 7.5 pages:

```sql
sqlite> select count(*) from embeddings;
3050324
```

### Storing embeddings for retrieval

Embeddings are just an array of floats. The length of this array is known as the *dimensionality* of our vector. instructor-large produces embeddings of `768` dimensions. A floating point number can be represented in 32 or 64 bits. Assuming we use 32-bit floats, one embedding would be just over `3kb` (768x4 bytes).

Note that the size of the output embedding is fixed for any input size. This is one of the reasons we tried to maximize the number of tokens per embedding when generating our input document. For 3 million embeddings that’s around 10GB of data. Nothing a sqlite table can’t handle so let’s just store it there.

```
sqlite> select * from sqlite_schema;
table|embeddings|embeddings|2|CREATE TABLE embeddings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    story INTEGER,
    part_index INTEGER,
    embedding BLOB,
    UNIQUE (story, part_index)
)
```

Generating 3 million embeddings took almost an entire day on my RTX 4090. I let this job run overnight. Each embedding itself takes a fraction of a second to generate, but is not parallelizable on my Gaming GPU as there is not enough VRAM to load multiple model instances.

## Vector search & indexing

Now that we have generated embeddings for the most interesting stories and comments, we can use it as the basis of a semantic search engine. This process boils down to:

1. Generate an embedding for the query.
    * `instructor-large` accepts an instruction argument while generating an embedding, note that we give [different instructions](https://github.com/anantn/hn-chatgpt-plugin/blob/main/embeddings/embedder.py#L13) for query embedding than we do for document embedding.
2. Find `k` vectors nearest to the query embedding.
3. Rank these k vectors to obtain results with the highest relevance to your input query.
    * Limit this list to the top `n` results, retrieve supporting metadata for each item and return them.

Step 2 is the most interesting part of this flow. Generally, if you have less than a million embeddings, the naive approach of comparing your query embedding to *every* vector in your dataset is [quite feasible](https://twitter.com/anantn/status/1647048626752090114). When comparing two vectors you can quickly compute the distance between them. Sorting by distance in ascending order is an easy way to find the most relevant documents for a query. This approach is known as k-NN (k-nearest neighbors).

With more than a million embeddings the brute force approach breaks down and starts taking too long. We have to find some way to reduce the number of vectors we have to compare with. There are a few strategies to do this:

* **Compress your embedding** down to fewer dimensions. There are a handful of smart ways to employ lossy compression while minimizing a drop in accuracy. In this approach you don’t reduce the number of embeddings to compare against per-se, but rather reduce the size of each vector so as to reduce the time taken for each comparison.
    * As an example, if you compress `768` dimensions down to `384`, you can now do 2 million vector comparisons by brute force in a reasonable amount of time. **Quantization** is one common way by which you can reduce the dimensionality of a vector. Google's [ScaNN library](https://github.com/google-research/google-research/tree/master/scann) is a popular choice.
* **Cluster your embeddings**. You can pre-process your dataset into `n` clusters, compare the query embedding to the centroid of every cluster. Then you only have to compare the query embedding to vectors in cluster that was closest.
    * There are small variations of this where you can have a large number of smaller clusters and you compare the vector to everything from a few adjacent clusters. Facebook's [FAISS library](https://github.com/facebookresearch/faiss) has a few implementations of this general type of technique.
* **Small world graphs**. This is another way to partition your dataset following the intuition that vectors based on real data will follow "small world" clustering rules similar to the real world (e.g. [Six Degrees of Kevin Bacon](https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon)).
    * In this technique we navigate the graph finding "small world" clusters. More complex implementations (like HNSW - hierarchical navigable small world) add other techniques to make this more robust. The FAISS library mentioned above also has an HNSW implementation.
* **Partitioning using trees**. One technique to partition your vectors are to pick two random vectors and split by a plane equidistant between them. This is effectively a random split and can be repeated multiple times until the number of vectors in each leaf node is low enough. One might also construct a "forest" of binary trees with different random split paths taken.
    * In practice, this works very well when you have a small number of dimensions (less than 100). Spotify's [Annoy library](https://github.com/spotify/annoy) is a popular implementation of this technique.

These strategies are known as "Approximate Nearest Neighbors" or "ANN". I [recommend this guide](https://towardsdatascience.com/comprehensive-guide-to-approximate-nearest-neighbors-algorithms-8b94f057d6b6) if you want to dive deeper on any of these.

One of the primary benefits of a ChatGPT plugin is the ability to access real-time data, so for our use-case we need to consider the ability to update the embedding index with new data periodically. I settled on a simple `IndexIVFFlate` implementation using FAISS. This is a type of clustering based on assigning vectors to a [voronoi cell](https://en.wikipedia.org/wiki/Voronoi_diagram). The cells are determined once at boot based on the initial set of embeddings, new embeddings inserted are assigned to an existing cell.

All embeddings are loaded in-memory, for around 3M embeddings this takes around 16GB of RAM (there is some overhead due to clustering and metadata). FAISS has an option to use a disk-based index, but this was small enough to fit on my 32GB machine.

The full implementation of this is a very short [80-line python program](https://github.com/anantn/hn-chatgpt-plugin/blob/main/embeddings/search.py)!

### Ranking

FAISS will return `k` embeddings nearest to your query ranked by distance. For our Hacker News plugin, story upvotes and time of submission are also pretty important factors. Relying only on distance would often surface stories with low scores or very old submissions at the very top which was undesirable.

Semantic search based on embeddings also has the drawback of not being great at exact keyword match, particularly when that word doesn't occur often in the corpus. To make up for this slightly, I also introduced the notion of "topicality" where we boost stories whose title has words matching the query.

Once you normalize these four values on a 0-1 scale, you can pick weights to associate with each attribute. Through trial and error, I landed on something like this:

```python
# Compute topicality
query_words = set(word.lower() for word in query.split())
title_words = [word.lower() for word in title.split()]
topicality = calculate_topicality(query_words, title_words)

# Weights for score, distance, story age, and topicality
w1, w2, w3, w4 = 0.2, 0.25, 0.35, 0.2
score_rank = (
    w1 * normalized_scores[i]
    + w2 * normalized_distances[i]
    + w3 * normalized_ages[i]
    + w4 * topicality
)
```

You can see we give the most importance to the story age, followed by the vector distance, and finally account for story upvotes and topicality. The full ranker implementation [can be found here](https://github.com/anantn/hn-chatgpt-plugin/blob/main/api-server/search.py#LL163C12).

## Keeping the data & index updated

Moving onto our next piece of the puzzle &mdash; keeping the data updated. Luckily for us, the Firebase API helps us keep things real-time, simply by subscribing to the [changes endpoint](https://github.com/HackerNews/API#changed-items-and-profiles). This endpoint is updated roughly every 15 to 30 seconds and typically has a dozen item and user profile changes.

Fetching these items and profiles on every update, then inserting them into the SQLite table was [fairly straightforward](https://github.com/anantn/hn-chatgpt-plugin/blob/main/embeddings/updater.py#L253). What's more complex is what we do with our embeddings index &mdash; simply adding to the items to the table isn't enough since the API won't be able to find it through a text search.

I refactored the code that did the initial embedding pass to also run on individual documents. Recall that generating an embedding is a single-threaded sequential process (because of my limited VRAM). Generating embeddings every time a story was updated had the chance to completely starve incoming queries from being embedded which would be bad.

To solve this problem, I employed two techniques:
* While the data updates are processed in real-time, we batch the embedding updates [every 15 minutes](https://github.com/anantn/hn-chatgpt-plugin/blob/main/embeddings/updater.py#L17). This allows us to collect a bunch of changes to an active story (comments are added rapidly and upvoted) and process them together.
* Implemented a [priority queue](https://github.com/anantn/hn-chatgpt-plugin/blob/main/embeddings/embedder.py#L24) in the embedder service such that we would always process embedding an incoming query over embedding an updated document.

This gave us a good balance between keeping our data updates while not compromising on the machine's ability to respond to incoming queries.

## API server

All of this is brought together by a [FastAPI server](https://github.com/anantn/hn-chatgpt-plugin/blob/main/api-server/main.py#L54) to implement the API spec we defined earlier. Doing this was pretty easy through use of SQAlchemy.

We run two independent processes, one for the data update and embedder service, and another for the FastAPI server. The update/embedder service has write locks on the SQLite databases while the FastAPI opens the db in readonly mode.

The first time our embedding server starts, we do a quick "catchup" on any missed stories or embedding updates to keep the database fresh even if the server was offline for any reason.

## Closing thoughts

Hope this was a useful tutorial on building a non-trivial ChatGPT plugin and helped with your understanding of embeddings and semantic search. My advice for anyone dipping their toes in this space is to:
* **Focus on the first principles of what you are building.** There is a lot of buzz around embeddings and AI, but having a conceptual understanding of these tools will help you navigate the landscape. You don't need to know _how_ these tools work as long you know _what_ they do, and _why_ you need them.
* **Keep things simple and beware premature optimization!** I've seen a few examples that are built for hyper-scale from day one, but it's usually a better idea to start small and only add layers of complexity as you need them. The entirety of this particular project is around 2500 lines of python code,including boilerplate.
* **Use ChatGPT liberally.** You'd be surprised at how much this tool can you help you, right from writing API descriptions and specs, to full fledged server code, to helping debug issues when they occur. $20/mo for ChatGPT plus is an absolute bargain.

Happy hacking!
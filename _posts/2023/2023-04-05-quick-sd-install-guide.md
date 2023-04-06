---
author: anant
comments: true
layout: post
slug: txt2img
title: "Quick guide to installing Stable Diffusion"
categories: [ai, favorite]
---

In my last post ["AI primer: Image Models 101"](/2023/04/01/txt2img/), I recommended Midjourney and Stable Diffusion as my top two choices. If your goal is to make beautiful images and art, Midjourney is the best choice, as they have a very easy to use service and can produce high quality output with minimal effort.

However, if you are a hobbyist and tinkerer, or just want to invest a bit of time to go deeper in this space, Stable Diffusion is a great choice. It's a bit more involved to set up, but has several advantages:

* It is one of the few image generation models that you can run fully offline on your own computer - it's free and no cloud service required!
* You can generate images that you have a hard time generating with tools Midjourney, such as images with an obscure or very specific style. One example <a href="https://twitter.com/vikrum5000">my friend Vikrum</a> gave recently was the ability generate art from Indian Trucks.
* The model weights are open to inspect, and you can fine-tune these weights to achieve various effects (which we will talk about in a future post).
* It has a powerful suite of image to image models &mdash; such as for upscaling, inpainting, and outpainting.
* There's a large community of open source developers and hobbyists who work on a wide range of tools and applications around it.

Sold? Let's get started!

## Easy 1-click options

The open source community has made it easy to materialize a basic Stable Diffusion setup in just a few clicks. You can use these options if you want something quick and easy to work with.

* [NMKD UI](https://nmkd.itch.io/t2i-gui) is the easiest 1-click option for Windows users.
* [Diffusion Bee](https://diffusionbee.com/) is a popular option for Mac users.
* [Easy Diffusion](https://stable-diffusion-ui.github.io/) has installers for Windows and Linux that are fairly easy to use.

The option I would most recommend however, is the [Automatic1111 Web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui). This UI has the most functionality and is actively used by the community for the most cutting-edge work in this space. Installing and using it is a little more daunting compared to the other three options above, but if ease of use were your goal, you might be better off with something like Midjourney anyway.

So, if working with the command line and getting a bit in the weeds doesn't faze you, read on!

## Pre-requisites

Large AI models typically require immense compute capability, particularly in the form of GPUs. Even though Stable Diffusion is light enough to run on your own computer, you'll still get the best results from having a fairly beefy setup:

* PC with 8 GB or more RAM, and at least 10 GB of free disk space.
* A good GPU with at least 6 GB of VRAM. NVIDIA is preferred though AMD can work too.
* If you are on a Mac, then any of the Apple Silicon (M1 or higher) laptops will work, thanks to [CoreML optimizations](https://machinelearning.apple.com/research/stable-diffusion-coreml-apple-silicon) made by the Apple ML research team!

If you are on a Windows PC, I recommend installing WSL2 first. WSL2 is basically an easy way to run a full Linux installation within Windows. While Stable Diffusion is fully supported on Windows natively, I've only set it up in WSL2 and there are a lot of nice Unix tools that make my workflows easier.

Installing WSL is [fairly straightforward](https://learn.microsoft.com/en-us/windows/wsl/install), open a Windows terminal or PowerShell and type:

```bash
wsl --install
```

This installs the latest version of Ubuntu, which is what I use. Most of the instructions that follow are common to Windows, Linux, and Mac.

Python is the _lingua franca_ of all things AI, so we'll need an installation. Python is notorious for a very messy package management system that is rife with version conflicts, specifically so for commonly used ML packages that aren't always compatible with every python version. I don't recommend using the standard system version for this reason.

A lot of projects suggest using python virtual environments ([venv](https://docs.python.org/3/library/venv.html)), but I go a different route. venvs are annoying because you have to manually activate them, and sometimes I do want two projects to use the same set of python packages. So I went with [pyenv](https://github.com/pyenv/pyenv) which is a lightweight way to manage multiple python versions. Installing pyenv is easy:

```bash
$ curl https://pyenv.run | bash
```

Make sure to add the required lines to your`~/.bashrc` or `~/.zshrc` file as instructed. For bash this looks something like:

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
```

You can test this worked by opening a new terminal and typing:

```bash
$ pyenv versions
```

Don't worry about installing a python version for now, we'll do it while installing the Stable Diffusion UI. Now is a good time to install `git` if you haven't already:

```bash
$ sudo apt install git
```

On the Mac, you should already have git if you ever installed Xcode. If you didn't, I recommend you install Homebrew first, and then install git:

```bash
$ brew install git
```

You should now have all the prerequisites!

## Installing stable-diffusion-webui

Automatic1111's UI has everything you need to get going. I recommend installing it by cloning the Github repository as it makes keeping up to date with changes easy:

```bash
$ git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

Because we are using pyenv, the installation instructions with differ somewhat compared to the official ones. But feel free to use the official installer scripts if you prefer using the `venv` setup, they work just as well.

```bash
# Make sure you are in the webui folder
$ cd stable-diffusion-webui
# Python version 3.10.6 works best
$ pyenv install 3.10.6
# We set this specific version to activate whenever we are in this directory
$ pyenv local 3.10.6
```

Now we can install the UI:

```bash
# IGNORE if you are on WSL or Linux, only do this on Mac:
$ source webui-macos-env.sh

# launch.py also intalls any dependencies the first time you use it
$ python launch.py
```

This will take some time the first time you run it, as it will also install all your python dependencies into pyenv, as well as fetch the Stable Diffusion 1.5 model weights. Once it's done, you should see something like this:

```
Running on local URL:  http://127.0.0.1:7860

To create a public link, set `share=True` in `launch()`.
Startup time: 8.2s (import torch: 1.0s, import gradio: 0.9s, import ldm: 0.3s, other imports: 1.0s, load scripts: 0.3s, load SD checkpoint: 4.6s, create ui: 0.1s).
```

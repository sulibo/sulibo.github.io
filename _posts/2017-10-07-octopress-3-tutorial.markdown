---
layout: post
title: "Octopress 3 Tutorial"
tags: jekyll blog github-page octopress
categories: [Tech]
comments: true
#excerpt: "Octopress 3 Tutorial"
date: 2017-10-07T09:50:20+101:00
---
Octopress is a blog toolkit built on top of Jekyll. Using Octopress, we can easily build a static blog website from scratch. Recently, Octopress 3.0 has been release on its GitHub page. Octopress 3.0 is a full rewrite of Octopress 2. This version is now only a plugin for Jekyll so no division between Octopress and Jekyll. The management is cleaner than the previous versions. However,  the official documents are not complete yet. So I decided to write a tutorial for it, including installation, basic use, deployment to Github page, and also how
to use Octopress from different places. 
<!--more-->
# Install Octopress 
## Preparation  
Two packages are required before installing Octopress: Ruby and Git. 

In Arch Linux, you can install these two software by the following commands in your terminal.
```bash
$ sudo pacman -S ruby 
$ sudo pacman -S git
```
For other Linux distributions, use the corresponding package managers to install these two packages. For example, for Ubuntu user, using the following commands
```bash 
$ sudo apt-get install ruby 
$ sudo apt-get install git 
```

## Install Octopress 
With Ruby and Git installed, you can easily install Octopress. 
```bash 
$ gem install octopress
```
Or you can use [Bundler](https://bundler.io). Bundler can be installed by Gem. 
```bash
$ gem install bundler

```
Create a fine named 'Gemfile' in your site's root directory with the following content: 
```Gemfile
source 'https://rubygems.org'
gem 'octopress', '~>3.0'
```
And then run 
```bash
$ bundle
```
# Setup 
With the new Octopress CLI commands, seting up your blog site is easy. 

First, navigate to your working directory and run the following command: 
```bash 
$ octopress new your_blog_site_name
```
Octopress will generate a directory named **your_blog_site_name** with scaffolding for the website. 
```
your_blog_site_name
.
│___ _config.yml
|___ .gitignore
|___ .sass-cache
|___ about.md
|___ Gemfile
|___ Gemfile.lock
|___ index.md
|___ _posts
|    |___ 2017-10-07-welcome-to-jekyll.makrdown 
|___ _templates
     |___ draft 
     |___ page 
     |___ post
```
First, you will need to configure the setting for the websit. The configuration file is **_config.yml** located in the root directory of the site. Below is an example of such file. In this file, you can add the informaiton of your site (title, url, social accouts, etc.). Edit the file as you desire.  
```
# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely edit after that. If you find
# yourself editing this file very often, consider using Jekyll's data files
# feature for the data you need to update frequently.
#
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'bundle exec jekyll serve'. If you change this file, please restart the server process.

# Site settings
# These are used to personalize your new site. If you look in the HTML files,
# you will see them accessed via {{ site.title }}, {{ site.email }}, and so on.
# You can create any custom variable you would like, and they will be accessible
# in the templates via {{ site.myvariable }}.
title: Your awesome title
email: your-email@example.com
description: >- # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jekyllrb
github_username:  jekyll

# Build settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed

# Exclude from processing.
# The following items will not be processed, by default. Create a custom list
# to override the default setting.
# exclude:
#   - Gemfile
#   - Gemfile.lock
#   - node_modules
#   - vendor/bundle/
#   - vendor/cache/
#   - vendor/gems/
#   - vendor/ruby/
```
# Basic Usage 
## Create a Post 
Octopress provides the following Octopress CLI command to create a post
```bash
$ octopress new post Hello World 
```
This command create a new blog post with the tile of `Hello World`. You can change the title to any title you like. The newly created post can be found in the **_post** directory, which looks like below: 
```
---
layout: post 
title: "Hello World"
---
```
The post file is a markdown file by default. You can add you content below the second `---`. The lines between the two triple-hypen `---` is the YAML front matter, where you can set predefined and custom variables, such as Categories, Tags and permalink for the post. More details can be found in [Jeyll Documentation](https://jekyllrb.com/docs/frontmatter/).   

## Build and Preview the site 
Octopress use Jekyll commands for building and preview the site. We can use the following command to build: 

```bash 
$ jekyll build 
```
This command will build a static HTML website in the **_site** directory. 

To view the site built, use the command below 

```bash 
$ jekyll serve 
```
Use you favorite browser to view it at the address `localhost: 4000`.

# Deploy 
Ocotopress includes a deploy module, called [octopress deploy](https://github.com/octopress/deploy) that allows your site to be deployed with Rsync to S3 or GitHub papges. I deploy my site on GitHub page. 

First, create a repository named **username.github.io** on your Github. Your blog can be accessed via "https://username.github.io" after deployment. The "username" should be your own username.  

Then, setup the deployment configuration by `octopress deploy`. 
```bash 
$ octopress deploy init git git@github.com:username/username.github.io
```
Remember to replace "username" with your own username.

Update the **_config.yml** if necessary (for example, add your blog URL). The line start with "url" in **_config.yml** should be 
```
url: "https://username.github.io" # the base hostname & protocal for your site , e.g. http://exampel.com 
``` 

Build your site with 
```bash
$ jekyll build
```
Deploy your site to GitHub page.
```bash
$ octopress deploy 
```
After this, you can view your site at https://username.github.io.

With `octopress deploy`, a master branch is created in the directory **.deploy** and pushed to your GitHub page repository. 

To manage the source code, we can create a `source` branch and push it to your GitHub page repository. 

First add the following two lines in your `.gitignore` file. 

```
.deploy 
_deploy.yml
```

Set your site's root directory as a Git repository. In your site's root directory, run 
```bash
$ git init
``` 
Add the remote 
```bash
$ git remote add git@github.com:username/username.github.io
```
Create the `source` branch
```bash
$ git checkout -b source 
```
Push the source code to Github
```bash
$ git add . 
$ git commit -m "Initialization" 
$ git push origin source 
 ```

# Use in different places 
This section describes how to recreate a local repository of your Octopress blog. This allows you to blog from different places.

Before we start, let us have a look at how Octopress works. 
If you follow the deployment steps in the previous section, your Octopress repository on GitHub have two branches, `source` and `master`. The `source` branch contains the files to generate the blog and the `master` contains the blog itself. In the local repository, the `master` branch is stored in the subdirectory named **.deploy**. With '.deploy' in the **.gitignore** file, it is ignored when you run `git push origin source`. The `master` branch is updated when you run `octopress deploy`. 

## Clone your blog to the new location 
In the new location, clone the `source` branch to the local Octopress folder 
```bash
$ git clone -b source git@github.com:username/username.github.io.git your_blog_site_name
```
Then install Octopress using Bundler 
```bash 
$ cd your_blog_site_name
$ bundler 
```
Build the site using `jekyll build` 
```bash 
$ jekyll build
``` 

Setup GitHub pages deployment 
```bash
$ octopress deploy init git git@github.com:username/username.github.io.git
```
Pull the `master` branch from the GitHub repository via `octopress deploy` 
```bash 
$ octopress deploy
``` 
Note that in Octopress 3.0, `octopress deploy` includes the step of cloning (pulling) the `master` branch from the remote to the folder **.deploy** folder. 

## Pushing changes from two different machines 
To blog from more than one computer, you must make sure you push everything before switching between computers. In the first machine, follow the instructions after you have made the changes 
```bash
$ jekyll build 
$ octopress deploy # update the blog and the remote master branch 
$ git add . 
$ git commit -m "some comments" 
$ git push origin source # update the remote source branch
``` 
In the second machine, pull the changes 
```bash 
$ git pull origin source #update the local source branch 
``` 
After making the changes, update the blog and update the repository again 
```bash 
$ jekyll build 
$ octopress deploy # udpate the blog and the remote master branch 
$ git add . 
$ git commit -m "some comments" 
$ git push origin source 
``` 




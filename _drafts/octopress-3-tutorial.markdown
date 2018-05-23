---
layout: post
title: "Octopress 3 Tutorial"
---
Octopress is a blog toolkit build on top of Jekyll. Using Ocotopress, we can easily build a static blog website from scratch. Recently, Octopress 3.0 has been release on its GitHub page. Ocotpress 3.0 is a full rewrite of Octopress 2. This version is now only a plugin for Jekyll so no division between Octopress and Jekyll. The management is cleaner than the previous versions. However,  the official documents are not complete yet. So I decided to write a tutorial for it, including installation, basic use, deployment to Github page, and also how
to use Octopress from different places. 

# Installing Octopress 
Two softwares are required before installing Octopress: Ruby and Git. 
In Arch Linux, you can install these two software by the following commands in your terminal.
## Preparation  
```bash
$ sudo pacman -S ruby 
```
```bash 
$ sudo pacman -S git
```
In Arch Linux, the package ruby includes RubyGems. If the ruby package in your distribution has no RubyGems included, you will need to install it. For Ubuntu users, you can install it by the following command 
```bash
$ sudo apt-get install rubygems
```

## Install Octopress 
With Ruby and Git installed, you can easily install Octopress. 
```bash 
$ gem install octopress
```
You will also need Bundler 
```bash
$ gem install bundler
```
## Setup 
With the new Octopress CLI commands, seting up your blog site is easy. First,Navigate to your working directory and run the following command: 
```bash 
$ octopress new your_blog_site_name
```
Octopress will generate a directory named **your_blog_site_name** with scaffolding for the website. 
```
your_blog_site_name
.
│___ _config.yml
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
## Basic Usage 
### Create a Post 
Octopress provides the following Octopress CLI command to creat a post
```bash
$ octopress new post Hello World 
```
This command creats a new blog post with the tile of `Hello World`. You can change the title to any title you like. The newly created post can be found in the **_post** directory, which is looking like below: 
```
---
layout: post 
title: "Hello World"
date: 2017-10-07T09:50:20+101:00
---
```
The post file is a markdown file by default. You can add you content below the second `---`. The lines between the two triple-hypen `---` is the YAML front matter, where you can set predefined and custom variables, such as Categories, Tags and permalink for the post. More details can be found in [Jeyll Documentation](https://jekyllrb.com/docs/frontmatter/).   

### Build and Preview the site 
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

# Use in different places 



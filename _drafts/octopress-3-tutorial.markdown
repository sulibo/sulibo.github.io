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
Octopress will generate a directory named **your_blog_site_name** with scaffolding for the website. Go to the newly created directory
```
your_blog_site_name
.
│___   _config.yml
|___   _posts
|___   _templates
|
│   
│
└───folder1
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│
└───folder2
    │   file021.txt
    │   file022.txt
```
# Deploy 

# Use in different places 



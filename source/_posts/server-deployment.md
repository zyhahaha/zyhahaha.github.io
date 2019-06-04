---
title: 前后端服务器部署
date: 2019-06-02 22:28:31
tags: linux
---

### 准备

服务器、域名、dns解析

### 目标

了解前后端交互，后端接口的实现与原理。
在linux环境下的前端静态资源部署。
linux基础命令，一些常用服务的安装与使用。

### nginx

最常用的静态资源服务器

``` bash
	$ sudo apt-get update
	$ sudo apt-get install nginx
```

### nodejs

``` bash
	$ wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz
	  wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-armv7l.tar.xz
	$ tar x -f node-v10.15.3-linux-x64.tar.xz
	$ ln -s /home/zhaoyang/nodejs/node-v10.15.3-linux-x64/bin/node /usr/local/node
```

### mysql

``` bash
	$ apt-get update
	$ sudo apt-get install mysql-server mysql-client
```
	
### mongodb

``` bash
	$ apt-get update
	$ apt-get install mongodb-server
```


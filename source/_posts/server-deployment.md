---
title: server-deployment
date: 2019-06-02 22:28:31
tags: linux
---

### nginx

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


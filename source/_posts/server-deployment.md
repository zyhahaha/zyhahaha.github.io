---
title: Web项目服务器部署
date: 2021-12-05 22:28:31
categories:
  - Linux
tags: 
  - Linux
---

作为一名Web开发，服务器部署肯定是一项必备技能，首先部署线上项目服务器肯定是要有的，不管是云服务器还是实体服务器都可以。

### 前置条件
必备：服务器、域名、DNS解析服务商
非必备：CDN服务商、HTTPS证书（[SSL](https://blog.123123.store/ssl.html)）

### 目标
在Linux环境下的前端静态资源部署；
CDN加速；
HTTPS证书部署；

<!-- more -->

### nginx
最常用的静态资源服务器

``` bash
	$ sudo apt-get update
	$ sudo apt-get install nginx
```

### dns解析
域名解析

### cdn
推荐使用七牛云的CDN服务，每个月有10GB的免费额度

### HTTPS部署
```
server {
    listen 443;
    server_name www.zhaoyang.com; #// 你的域名
    ssl on;
    root /home/jrkj/site/jrkj/; #// 前台文件存放文件夹，可改成别的
    index index.html index.htm; #// 上面配置的文件夹里面的index.html
    ssl_certificate  cert/2751021_www.zhaoyang.com.pem; #// 改成你的证书的名字
    ssl_certificate_key cert/2751021_www.zhaoyang.com.key; #// 你的证书的名字
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        index index.html index.htm;
    }
}
```

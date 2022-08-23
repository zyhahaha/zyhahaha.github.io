---
title: 前端项目的服务器部署
date: 2019-06-02 22:28:31
categories:
  - Linux
tags: 
  - Linux
---

前端项目的服务器部署

<!-- more -->

### 准备
服务器、域名、dns解析、cdn服务、https证书

### 目标
在linux环境下的前端静态资源部署；
cdn、https的部署。

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
内容分发网络

### https部署
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

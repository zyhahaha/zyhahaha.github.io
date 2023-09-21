---
title: Web项目服务器部署
date: 2020-09-05 22:28:31
categories:
  - Linux
tags: 
  - Linux
---

作为一名Web开发，服务器部署肯定是一项必备技能，本文主要对项目部署流程简述一下，也是对所学知识的归纳总结。

### 前置条件
必备：服务器、域名（国内需备案）、DNS解析服务商
非必备：CDN服务商、HTTPS证书（[SSL](https://blog.123123.store/ssl.html)）

### 目标
在Linux环境下的前端静态资源部署；
CDN加速；
HTTPS证书部署；

<!-- more -->

### DNS域名解析
域名可以到各大[域名提供商](https://wanwang.aliyun.com/)那购买，这里就不详细说明。有了域名之后需要把域名解析到服务器上，这样用户才能访问我们部署在服务器上的资源，我用的是阿里云的[DNS解析服务](https://dns.console.aliyun.com/#/pdns/dashboard)，每个月有一定的**免费额度**，对于普通用户来说完全够用。

![DNS解析](http://119.96.189.81:7788/blog/server-deploy/server-deploy-dns.jpg)

可以看到子域名、CDN这些都需要用到DNS解析，而且还可以把域名解析到**Ipv6**地址上（*这个功能大家能想到啥？*）感兴趣可以看我[另一篇博客](https://blog.123123.store/linux-deploy.html)通过Ipv6手机提供公网访问。

### Nginx
通过DNS服务把域名解析到我们的服务器上面，那么我们要怎么提供Web服务呢，这里就要用到Nginx Web服务，下面简单说一下配置步骤：

1. 安装
``` bash
	$ sudo apt-get update
	$ sudo apt-get install nginx
```

2. 配置
``` bash
server {
  listen 80;
  server_name blog.123123.store;

  location / {
          root /home/zyhahaha/sites/zyhahaha.github.io;
          index   index.html index.htm;
          try_files $uri $uri/ @rewrites;
  }

  location @rewrites {
          rewrite ^(.*)$ /index.html last;
  }
}
```

### CDN
不知道大家买的云服务器是多少带宽，我买的是8M带宽的腾讯云服务器，换算成流量就是1MB/s，一个网页除了媒体资源外，200KB ~ 2MB不定。就按1MB算，一台用户访问响应时间约一秒，如果并发太多，就是N+1秒的响应时间，对用户体验极为不好。一般我们的前端静态资源都不会到自己的业务服务器上，往往是放到CDN服务器里（*不管是用CDN服务商提供的，还是自己搭建的*），还可以做到隐藏业务服务器的IP，一定程度上防止被攻击。
关于CDN服务，这里推荐使用七牛云的[CDN服务](https://portal.qiniu.com/cdn/overview)，每个月有10GB的免费额度

### HTTPS部署
关于HTTPS部署我最近专门开了[一篇文章](https://blog.123123.store/ssl.html)叙述，大家感兴趣的可以去看一下。

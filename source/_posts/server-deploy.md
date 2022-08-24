---
title: Web项目服务器部署
date: 2021-12-05 22:28:31
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

### DNS解析
域名可以到各大[域名提供商](https://wanwang.aliyun.com/)那购买，这里就不详细说明。有了域名之后需要把域名解析到服务器上，这样用户才能访问我们部署在服务器上的资源，我用的是阿里云的[DNS解析服务](https://dns.console.aliyun.com/#/pdns/dashboard)，每个月有一定的免费额度，对于普通用户来说完全够用。

### Nginx
最常用的静态资源服务器
``` bash
	$ sudo apt-get update
	$ sudo apt-get install nginx
```

### CDN
推荐使用七牛云的CDN服务，每个月有10GB的免费额度

### HTTPS部署
关于HTTPS部署我最近专门开了[一篇文章](https://blog.123123.store/ssl.html)叙述，大家感兴趣的可以去看一下。

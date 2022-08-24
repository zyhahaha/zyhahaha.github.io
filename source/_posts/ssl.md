---
title: 网站HTTPS部署（Nginx）
date: 2021-12-12 10:21:16
categories:
  - Linux
tags: 
  - Linux
---

目前绝大多数的网站都已使用HTTPS协议，如果我们的个人站点还在使用HTTP协议，就不说啥安全性问题，光是浏览器地址栏有个不安全的标志，看起来也让用户觉得很不靠谱的样子。
想要部署HTTPS，首先要有一个SSL证书，如果网站想要做PWA或者使用HTTP2.0也必须部署SSL，这样看起来未来SSL证书还挺重要的。

### SSL证书类型
目前SSL证书是需要收费的，如果想要降低成本我们可以试用免费版的SSL证书，我使用的是[JoySSL](https://www.joyssl.com/)。
在部署SSL证书之前我们需要了解一下它各个类型的适用范围：**单域名证书**、**通配符证书**、**多域名证书**、**IP地址证书**
对应的使用范围：*只能为单个子域名提供HTTPS服务*、*可以为一个主域名下的多个子域名提供服务*、*可以为多个主域名提供服务*、*IP地址证书没咋用过，不太了解*
这里我使用的是**通配符证书**既：可以为一个主域名下的多个子域名提供HTTPS认证。

<!-- more -->

### 通过JoySSL获取SSL证书
在JoySSL注册登录，填写信息、下载SSL证书这些我就不细说了，没有什么难度，大家记得选择证书类型时要选择**通配符证书**，生成证书的时候需要验证域名的所有权，这个根据提示操作即可。
JoySSL会提供多种Web服务器的SSL证书及对应的部署文档，大家也可以按照部署文档操作。下面的操作就跟JoySSL没有关系了，如果是从其他服务商那获取到的证书也可以按照下面步骤操作。

### 配置SSL证书（Nginx）
这里我以Nginx为例，最后会得到两个文件，分别是 *.key*、*.crt*格式的。
1、将证书文件和 KEY 文件都上传到服务器（推荐放到 etc/nginx/cert/文件夹下）
2、修改 nginx 配置文件如下(默认配置文件一般是在/etc/nginx/目录下)：
``` bash
# ssl配置
server {
    listen 443;
    server_name blog.123123.store; #修改为您证书绑定的域名。
    ssl on; #设置为 on 启用 SSL 功能。
    root html;
    index index.html index.htm;
    ssl_certificate cert/123123_store_integrated.crt; #替换成您证书的文件名。
    ssl_certificate_key cert/123123_store.key; #替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;
    location / {
        root /home/zyhahaha/sites/zyhahaha.github.io; #站点目录。
        index index.html index.htm; #添加属性。
    }
}
```
4、保存 nginx.conf 文件后退出。
5、重启 Nginx 服务。
``` bash
nginx -s reload
```
结束，配置完成，打开网站通过HTTPS协议访问，看看吧。

### HTTP重定向HTTPS
你可能会发现，如果不指定协议浏览器会默认使用以前的协议访问网站，那么我们肯定是想，如果用户通过http协议访问网站，我们要把它重定向到https站点，配置如下：
``` bash
server {
    listen 80;
    server_name blog.123123.store;
    return 301 https://$server_name$request_uri;
}
```

### 结束
有问题可以发我邮箱：980355088@qq.com
或者在我[个人主页](https://cv.123123.store/message.html)留言

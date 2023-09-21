---
title: PCDN
date: 2022-05-17 19:49:12
categories:
  - 个人爱好
tags: 
  - PCDN
---

**PCDN**（*P2P CDN*）P2P内容分发网络，看名字大概能猜到是干嘛的。常规的CDN服务主要是大公司在做，使用遍布全国的CDN服务器提供静态资源访问服务。阿里云有提供PCDN这种服务的，感兴趣可以看一下[阿里云PCDN](https://help.aliyun.com/product/54287.html)。

**想象一下这种场景：** 你家邻居在家里看腾讯视频，这个视频一般来说可能是存储在腾讯服务器上的，如果很多人同时看这个视频，腾讯的服务器是不是很有压力（*主要是硬盘读取压力和带宽压力*）。

而且如果这个服务器离你家还很远，是不是除了服务器压力之外，带宽传输是不是也是一种浪费。这个时候如果你家里的电脑，做CDN节点，预先把这个视频缓存到你电脑上，当你附近有人访问这个资源，优先从你电脑上访问，是不是就不用浪费厂商的服务器资源了。

但是我们**为什么要这么做**呢，肯定是要别人给钱，我才愿意做这个CDN节点，我用的是**网心云**（*纯属爱好，随便玩玩*），下面讲一下它怎么部署：

### 前置条件
首先你要有个服务器（*也就是电脑，闲置的云服务器也行*）、Docker的基本用法；

**个人观点：** *这个也就是玩玩，别指望它赚多少钱。用自己电脑做CDN节点，一方面要24小时开机，费电、费硬盘、占网络*；

### 声明
本文不是教你赚钱的教程，我写文章的初衷是分享一些有意思的工具、软件、想法等。欢迎各位志同道合，爱折腾的朋友一起探讨。

<!-- more -->

#### 安装Docker
``` bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### 拉取Docker镜像并启动
``` bash
docker run -d --name=wxedge \
  --restart=always --privileged --net=host \
  --tmpfs /run --tmpfs /tmp \
  -v /data/wxedge_storage:/storage:rw  \
  onething1/wxedge
```
注意：/data/wxedge_storage需要改成自己的本地路径（*当然不该也行*）

#### 多实例
``` bash
docker run -d -e LISTEN_ADDR=":28888" --name=wxedge2 \
  --restart=always --privileged --net=host \
  --tmpfs /run --tmpfs /tmp \
  -v /home/zyhahaha/wxy:/storage:rw  \
  onething1/wxedge
```

### 相关链接
    注册网心云：这个是拉新链接，邀请人和被邀请人均可获得优惠券
    https://act.walk-live.com/acts/invite?inviteid=51845cd2
    
    安装网心云：
    可到应用市场下载，也可以通过上面的链接注册下载。

    官网：
    https://www.onethingcloud.com/

### 最后一步
安装完App后，浏览器访问 你服务器IP:18888，会出现下面的界面，再通过App扫一扫浏览器的二维码添加设备。
![浏览器打开 IP:18888](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/pcdn/qrcode.jpg)
![App扫一扫](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/pcdn/scan.jpg)
![设备列表](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/pcdn/device.jpg)

### 特别提示
App上推荐的产品统统不要买，包括各种硬件设备，就跟以前的玩客云一样。
想玩就玩**X86 Docker**版（*官方叫法：容器魔方*），也就是本文介绍的这种部署方式，不用买设备，直接用闲置服务器跑。

### Docker Hub
https://hub.docker.com/r/onething1/wxedge

### 阮一峰Docker教程
https://ruanyifeng.com/blog/2018/02/docker-tutorial.html

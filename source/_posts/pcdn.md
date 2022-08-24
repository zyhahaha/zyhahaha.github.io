---
title: PCDN
date: 2021-05-17 19:49:12
categories:
  - 个人爱好
tags: 
  - PCDN
---

**PCDN**（*P2P CDN*）P2P内容分发网络，看名字大概能猜到是干嘛的（*P2P是什么可以自行百度*）。常规的CDN服务主要是大公司在做，使用遍布全国的CDN服务器提供静态资源访问服务（*CDN是什么可以自行百度*）。阿里云有提供PCDN这种服务的，感兴趣可以看一下[阿里云PCDN](https://help.aliyun.com/product/54287.html)。
想象一下这种场景：你家邻居在家里看腾讯视频，这个视频一般来说可能是存储在腾讯服务器上的，如果很多人同时看这个视频，腾讯的服务器是不是很有压力（*主要是硬盘读取压力和带宽压力*），而且如果这个服务器离你家还很远，是不是除了服务器压力之外，带宽传输是不是也是一种浪费。这个时候如果你家里的电脑，做CDN节点，预先把这个视频缓存到你电脑上，如果你附近有人访问这个资源，优先从你电脑上访问，是不是就不用浪费厂商的服务器资源了。
但是我们为什么要这么做呢，肯定是要别人给钱，我才愿意做这个CDN节点，我用的是网心云（*纯属爱好，随便玩玩*），下面讲一下它怎么部署：
前置条件：首先你要有个服务器（*闲置的云服务器也行*），Docker基本用法；
个人观点：*这个也就是玩玩，别指望它赚多少钱。用自己电脑做CDN节点，一方面要24小时开机，费电、费硬盘、占网络*；

<!-- more -->

#### 安装Docker
``` bash
curl -sSL https://get.daocloud.io/docker | sh
```

#### 拉取Docker镜像并启动
``` bash
docker run -d --name=wxedge \
  --restart=always --privileged --net=host \
  --tmpfs /run --tmpfs /tmp \
  -v /data/wxedge_storage:/storage:rw  \
  onething1/wxedge
```
注意：/data/wxedge_storage需要改成自己的本地路径

#### 多实例
``` bash
docker run -d -e LISTEN_ADDR=":28888" --name=wxedge2 \
  --restart=always --privileged --net=host \
  --tmpfs /run --tmpfs /tmp \
  -v /home/zyhahaha/wxy:/storage:rw  \
  onething1/wxedge
```

### docker hub
https://hub.docker.com/r/onething1/wxedge

### 阮一峰docker教程
https://ruanyifeng.com/blog/2018/02/docker-tutorial.html

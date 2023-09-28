---
title: 可道云kodbox私有云网盘（NAS软件）
date: 2023-02-26 23:18:23
categories:
  - 个人爱好
tags: 
  - Linux
---

有些数据存放在第三方网盘里不放心（*百度云之类*）想用家里的电脑搭建一个自己的私有网盘。
或者觉得第三方网盘访问速度太慢（*比如百度云*）就算开了会员，受带宽限制还是不够快，而家里的局域网理论带宽能达到千兆级。
本文介绍**可道云kodbox**作为家庭NAS的一种方案。

适用场景：
1. 私有云网盘；
2. NAS家庭存储；

### 前置条件
* Docker
* DockerHub https://hub.docker.com/r/kodcloud/kodbox
* 可运行Docker的计算机一台

<!-- more -->

### 安装开始
**可道云kodbox**基于PHP，数据库使用的是Mysql，用户可以自己装安装PHP、Mysql环境来进行安装，也可以通过Docker快速安装。
这里介绍Docker的安装流程（Docker安装比较简单，不需要安装环境）：

#### 安装Docker
``` bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### 拉取Docker镜像并启动
``` bash
mkdir /data
docker run -d -p 80:80 -v /data:/var/www/html kodcloud/kodbox
```

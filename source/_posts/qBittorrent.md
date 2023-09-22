---
title: qBittorrent安装（Debian 11 OR Ubuntu18）
date: 2022-05-02 19:55:42
categories:
  - 工具
tags: 
  - Torrent
---

想一想这种场景：有一个Torrent资源大小为**3.5GB**，下载速度为**62kb/s ~ 12kb/s**，而且这个资源我们势在必得（*哈哈*）。
这种情况下，我们怎么办，电脑开着挂机下载？可以，但是乐观估计需要开一天一夜，有点浪费。

如果我们有云服务器的话，这个时候我们可以通过云服务器挂机下载。

Linux下有很多Torrent下载软件，这里我使用的是**qBittorrent**，对我而言它主要是可以支持Web网页进行下载操作，而且容易配置，最最重要的是它支持**Web Api**，这个功能提供了很多有趣的玩法！

下面是安装步骤：

### 安装qBittorrent

安装add-apt-repository命令
``` bash
sudo apt-get update && sudo apt-get install software-properties-common -y
```

<!-- more -->

添加qbittorrent-nox的PPA软件源
``` bash
# qBittorrent 稳定版
sudo add-apt-repository ppa:qbittorrent-team/qbittorrent-stable

# qBittorrent 测试版
sudo add-apt-repository ppa:qbittorrent-team/qbittorrent-unstable
```

安装qbittorrent-nox
``` bash
sudo apt-get update && sudo apt-get install qbittorrent-nox -y
```

<!-- more -->

设置开机启动
``` bash
sudo apt-get install vim -y && vim /etc/systemd/system/qbittorrent-nox.service
```
``` bash
[Unit]
Description=qBittorrent-nox
After=network.target
[Service]
User=root
Type=forking
RemainAfterExit=yes
ExecStart=/usr/bin/qbittorrent-nox -d
[Install]
WantedBy=multi-user.target
```

修改qbittorrent-nox.service文件后重新载入
``` bash
sudo systemctl daemon-reload
```

启动
``` bash
sudo systemctl start qbittorrent-nox
```

停止
``` bash
sudo systemctl stop qbittorrent-nox
```

设置开机启动
``` bash
sudo systemctl enable qbittorrent-nox
```

查看状态
``` bash
sudo systemctl status qbittorrent-nox
```

默认账号：admin 密码：adminadmin

默认登陆网址：ip:8080

![DNS解析](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/qBittorrent/web-ui.jpg)

### 最后
你可能会好奇，我们安装的不是*qbittorrent*吗，怎么安装命令是*qbittorrent-nox*。
解释一下这个**nox**就是**No x-server**，因为qbittorrent是默认使用x-server提供图形界面服务的，想要使用Web版，还要关闭、配置，太麻烦，这里我们干脆直接使用nox版本。

### 结束
有问题可以发我邮箱：980355088@qq.com
或者在我[个人主页](https://cv.123123.store/message.html)留言

---
title: Debian
date: 2020-12-25 17:45:46
categories:
  - 个人爱好
tags: 
  - Linux
---

在家里看一些电影，很多片源都是从网上下载的，我一开始是使用windows开启网络共享，然后通过电视网络访问。但是每次看电影都需要先打开我的电脑。
于是我想把电影资源都放到一台专门的主机上，不说24小时开机，用的时候开机即可。
由于我日常使用的服务器发行版是Debian AND Ubuntu，家里的服务器也就安装该发行版，下面专门对它进行简单的介绍：

### Debian
官网：https://www.debian.org/
安装手册：https://www.debian.org/releases/bullseye/amd64/index.zh-cn.html

<!-- more -->

### 最低硬件要求
CPU：1核1GHz、21世纪的CPU（只要不是上个世纪19xx年的CPU）
无桌面系统：内存512MB、硬盘2GB
桌面系统：内存1GB、硬盘10GB
基本是个正常主机都可以安装，如果是特殊设备刷机（机顶盒、路由器等）可以自行查看debian安装手册

### 更新系统时间
``` bash
date # 查看当前的系统时间
sudo apt-get update # 更新源
sudo apt-get install ntpdate # 安装ntpdate
sudo ntpdate ntp1.aliyun.com # 更新系统时间
```

### 添加sudo
``` bash
apt-get install sudo
sudo usermod -aG sudo zhaoyang # zhaoyang为自己的用户名
```

### 跑分

安装必要程序
``` bash
apt install -y git make automake gcc autoconf time perl
```

运行脚本
``` bash
git clone https://github.com/kdlucas/byte-unixbench.git
cd byte-unixbench/UnixBench
make && ./Run
```

### 性能测试 
Github地址：https://github.com/FunctionClub/ZBench
``` bash
#中文版：
wget -N --no-check-certificate https://raw.githubusercontent.com/FunctionClub/ZBench/master/ZBench-CN.sh && bash ZBench-CN.sh

#英文版：
wget -N --no-check-certificate https://raw.githubusercontent.com/FunctionClub/ZBench/master/ZBench.sh && bash ZBench
```
---
title: Debian
date: 2022-06-05 21:45:46
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
CPU：1核1GHz、21世纪的CPU
无桌面系统：内存512MB、硬盘2GB
桌面系统：内存1GB、硬盘10GB
这配置基本上99%的电脑都可以安装，如果是特殊设备刷机（机顶盒、路由器等）可以自行查看debian安装手册

### 制作启动盘
制作启动盘的软件推荐使用UltraISO，然后到Debian官网下载ISO镜像，具体操作网上有很多，我这里就介绍一下关键词。

### 更新系统时间
Debian安装成功后需要校正时间，否则访问网络会有一点点问题。
``` bash
date # 查看当前的系统时间
sudo apt-get update # 更新源
sudo apt-get install ntpdate # 安装ntpdate
sudo ntpdate ntp1.aliyun.com # 更新系统时间
```

### 添加sudo
系统安装后默认是没有sudo的，需要自行安装。
``` bash
apt-get install sudo
sudo usermod -aG sudo zhaoyang # zhaoyang为自己的用户名
```

### 使用手机USB共享网络
我有一台小主机的电容被弄掉了，导致网口不能用，主板上的无线网卡也有点问题，本来打算放弃的。某天手机给windows电脑共享网络的时候，想起来通过USB应该也可以给Linux主机共享网络。
参考博客：https://blog.csdn.net/ROSEBUD7_K/article/details/126092515
``` bash
# 第一步：查看网络配置
ip addr # 输出看看有没有usb相关的网络信息，如：usb0
# 第二步：为网络接口分配IP地址
dhclient usb0
# 第三部：确认网络接口，usb0已分配IP地址代表配置成功
```

### 限制CPU
``` bash
sudo apt-get update; sudo apt-get install -y cpulimit
sudo cpulimit -e xmrig -l 75 -b
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

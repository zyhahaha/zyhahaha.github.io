---
title: 通过Redroid搭建自己的云手机
date: 2023-05-28 22:09:03
categories:
  - 个人爱好
tags: 
  - Linux
---

最近玩游戏使用云手机比较多，正好手边有个闲置的云服务器，就想自己搭个云手机玩玩。

写这篇文章的时候，阿里云的无影云电脑可以免费试用三个月，配置是4核8G的Ubuntu20系统。目前在闲置着，于是拿来折腾一下。

搭建云手机使用的是Redroid方案，通过Docker部署，再通过Scrcpy远程连接控制云手机。

阿里云的无影云电脑是一台amd64架构的计算机，其实搭建云手机最佳方案是使用Arm架构的服务器（*减去了amd指令转arm的过程，性能好的不是一点半点*），但是目前国内云主机厂商的Arm架构服务器特别贵，而且不能免费试用。

唯一可以用的是甲骨文的云服务器（*https://cloud.oracle.com/*），它提供4核24G内存的Arm云主机，并且永久免费试用（*这配置搭建云手机吊打市面的真实手机*）。

<!-- more -->

但是由于太多人薅羊毛机器根本不够用，所以很难抢到，有感兴趣的可以去碰碰运气，注册账号的时候选择区域不要选择韩国、日本这些热门区域，根本抢不到资源。
甲骨文账号注册提醒：需要准备一张支持外币支付的信用卡用于验证身份，很多银行都可以办理。并且不需要挂VPN代理，填写地址也要是真实地址（*建议是你的信用卡账单地址*）。注册失败的话，可以连接手机网络，切换浏览器（*或者打开浏览器的无痕模式*）多试几次。

![Arm主机](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/oracle-cloud/vm.jpg)
![选择Arm实例](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/oracle-cloud/config.jpg)

### 前置条件
* 云服务器（建议2C4G以上）
* scrcpy的使用方法

### 我的环境
* Ubuntu 20.04
* 4核8G内存4M带宽（amd64）

### 参考链接
``` text
Docker Hub地址：
https://hub.docker.com/r/redroid/redroid

在Windows10上安装：
https://github.com/remote-android/redroid-doc/blob/master/deploy/wsl.md

参考博客：
https://blog.hanlin.press/2022/08/play-redroid-on-oracle-cloud/
```

### 一、安装

##### 安装docker

``` bash
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

##### docker镜像
``` bash
sudo vim /etc/docker/daemon.json

{
 "registry-mirrors": ["https://docker.mirrors.tuna.tsinghua.edu.cn"]
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```

##### 安装依赖

``` bash
sudo apt install linux-modules-extra-`uname -r`
sudo modprobe binder_linux devices="binder,hwbinder,vndbinder"
sudo modprobe ashmem_linux
```

##### 安装adb

``` bash
sudo apt install adb
```

##### 运行docker 安装redroid
``` bash
docker run -itd --rm --memory-swappiness=0 \
    --privileged --pull always \
    -v /data:/data \
    -p 5556:5555 \
    redroid/redroid:11.0.0-latest \
    androidboot.hardware=mt6891 ro.secure=0 ro.boot.hwc=GLOBAL ro.ril.oem.imei=861503068361145 ro.ril.oem.imei1=861503068361145 ro.ril.oem.imei2=861503068361148 ro.ril.miui.imei0=861503068361148 ro.product.manufacturer=Xiaomi ro.build.product=chopin \
    redroid.width=720 redroid.height=1280 \
    redroid.gpu.mode=guest
```

OR

``` bash
docker run -itd --rm --privileged \
    --pull always \
    -v ~/data:/data \
    -p 5555:5555 \
    redroid/redroid:11.0.0-latest
```

### adb连接
``` bash
# 如果是远程机器，localhost改为对应的ip
adb connect localhost:5555
```

### 安装scrcpy
``` bash
# snap方式安装（snap安装比较慢）
snap install scrcpy

# apt方式安装（版本比较旧）
apt install scrcpy
```

### scrcpy连接设备
``` bash
# 单个设备连接
scrcpy

# 多设备时通过指定ip连接
scrcpy -s localhost:5555
```

### 安装应用
安装应用直接把apk文件拖放到 scrcpy 窗口安装即可，这时终端会输出一条日志


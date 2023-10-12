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

搭建云手机使用的是Redroid方案，通过Docker部署，再通过Scrcpy远程连接控制云手机

### 前置条件
* 云服务器（建议2C4G以上）
* scrcpy的使用方法

### 我的环境
* Ubuntu 20.04
* 4核8G内存4M带宽

### 参考链接
``` text
Docker Hub地址：
https://hub.docker.com/r/redroid/redroid

在Windows10上安装：
https://github.com/remote-android/redroid-doc/blob/master/deploy/wsl.md

参考博客：
https://blog.hanlin.press/2022/08/play-redroid-on-oracle-cloud/
```

<!-- more -->

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


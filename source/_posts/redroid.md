---
title: Redroid
date: 2023-05-28 22:09:03
categories:
  - 个人爱好
tags: 
  - Linux
---

使用Redroid在服务器上搭建云手机
https://hub.docker.com/r/redroid/redroid

在Windows10上安装：
https://github.com/remote-android/redroid-doc/blob/master/deploy/wsl.md

### 前置条件
* 云服务器
* scrcpy的使用方法（*见我的另外一篇文章*）

### 我的环境（不代表其他环境不行）
* Ubuntu 20.04
* 4核8G内存云主机

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


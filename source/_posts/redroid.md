---
title: Redroid
date: 2023-05-28 22:09:03
categories:
  - 个人爱好
tags: 
  - Linux
---

使用Redroid在服务器上搭建云手机

### 前置条件
* 云服务器
* scrcpy的使用方法（*见我的另外一篇文章*）

### 我的环境（不代表其他环境不行）
* Ubuntu 20.04
* 4核8G内存云主机

<!-- more -->

### 安装

##### 安装docker

``` bash
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
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
    redroid/redroid:8.1.0-latest \
    androidboot.hardware=mt6891 ro.secure=0 ro.boot.hwc=GLOBAL ro.ril.oem.imei=861503068361145 ro.ril.oem.imei1=861503068361145 ro.ril.oem.imei2=861503068361148 ro.ril.miui.imei0=861503068361148 ro.product.manufacturer=Xiaomi ro.build.product=chopin \
    redroid.width=720 redroid.height=1280 \
    redroid.gpu.mode=guest
```

### adb连接
``` bash
# 如果是远程机器，localhost改为对应的ip
adb connect localhost:5555
```

### 安装scrcpy
``` bash
snap install scrcpy
```

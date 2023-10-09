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

### 一、安装

##### 安装docker

``` bash
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

##### docker镜像
``` bash
vim /etc/docker/daemon.json

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
snap install scrcpy
```

### 三、Redroid安装完成，开始安装Magisk
参考文档：https://gist.github.com/assiless/a23fb52e8c6156db0474ee8973c4be66

##### 设置环境变量
``` bash
echo -e "\n
export image=redroid/redroid:11.0.0-amd64
export image_tar=${HOME}/redroid:11.0.0-amd64" >> ${HOME}/.bashrc
source ${HOME}/.bashrc
```

##### 使用docker安装
``` bash

```

``` bash

```

``` bash

```
``` bash

```

``` bash

```

``` bash

```
``` bash

```

``` bash

```

``` bash

```
``` bash

```

``` bash

```

``` bash

```


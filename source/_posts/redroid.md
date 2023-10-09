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

### adb连接
``` bash
# 如果是远程机器，localhost改为对应的ip
adb connect localhost:5555
```

### 安装scrcpy
``` bash
snap install scrcpy
```

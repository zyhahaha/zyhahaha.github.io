---
title: 通过Redroid搭建自己的云手机
date: 2023-05-28 22:09:03
categories:
  - 个人爱好
tags: 
  - Linux
---

最近玩游戏使用云手机比较多，正好手边有个**闲置的云服务器**，就想自己搭个**云手机**玩玩。

写这篇文章的时候，阿里云的**无影云电脑**可以**免费试用三个月**，配置是**4核8G的Ubuntu20**系统（*Amd64架构*）。目前在闲置着，于是拿来折腾一下。

搭建云手机使用的是**Redroid**方案，通过**Docker**部署，再通过**Scrcpy**远程连接控制云手机。

### 前置条件
* 云服务器（建议2C4G以上）*Amd64、Arm架构都行，Arm架构最佳*
* Scrcpy的使用方法

### 我的环境
* Ubuntu 20.04
* 4核8G内存4M带宽（*Amd64架构*）

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

### 一、开始安装

##### 安装docker

``` bash
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

##### docker镜像（可选）
``` bash
# 使用docker安装redroid太慢时，可以修改镜像源试试（不保证有效）
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

##### 安装scrcpy
``` bash
# snap方式安装（snap安装比较慢）
snap install scrcpy

# apt方式安装（版本比较旧）
apt install scrcpy
```

### 二、运行docker 安装redroid
``` bash
docker run -itd --rm --privileged \
    --pull always \
    -v ~/data:/data \
    -p 5555:5555 \
    redroid/redroid:11.0.0-latest
```

如果需要给云手机加一些**手机属性**，让云手机更像手机来规避一些游戏的风控，可以执行下面的命令来**启动容器**。

``` bash
docker run -itd --rm --memory-swappiness=0 \
    --privileged --pull always \
    -v /data:/data \
    -p 5555:5555 \
    redroid/redroid:11.0.0-latest \
    androidboot.hardware=mt6891 ro.secure=0 ro.boot.hwc=GLOBAL ro.ril.oem.imei=861503068361145 ro.ril.oem.imei1=861503068361145 ro.ril.oem.imei2=861503068361148 ro.ril.miui.imei0=861503068361148 ro.product.manufacturer=Xiaomi ro.build.product=chopin \
    redroid.width=720 redroid.height=1280 \
    redroid.gpu.mode=guest
```
这个镜像约**800MB左右**，如果在拉取镜像的时候有网络问题（*dockerhub国内网速比较慢*）导致拉取失败，可以在我公众号内留言：**redroid镜像**，来获取redroid的docker镜像。

获取镜像后可以本地导入，不用再远程拉取，不会的可以私信我出教程。

### 三、使用adb连接
``` bash
# 如果是远程机器，localhost改为对应的ip
adb connect localhost:5555
```

### 四、scrcpy连接设备
``` bash
# 单个设备连接
scrcpy

# 多设备时通过指定ip连接
scrcpy -s localhost:5555
```

![连接成功，启动Redroid](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/start.jpg)

### 五、安装应用
安装应用直接把apk文件拖放到 scrcpy 窗口安装即可，这时终端会输出一条日志。

![安装应用](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/安装应用.jpg)

##### 从底部向上拉打开应用列表
![打开应用列表](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/上拉.png)

### 六、Redroid安装完成，开始安装Magisk，管理云手机Root权限

如果想管理云手机的**Root权限**，可以**刷入Magisk**（*面具*）来给需要Root权限的App授权。

通过上面的**参考文档**可以很容易的安装**Magisk**，如果不会搞的话**给我留言**，我后面再出个Root的文章。

``` text
参考文档：
https://gist.github.com/assiless/a23fb52e8c6156db0474ee8973c4be66
```

##### Magisk安装成功
![打开应用列表](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/magisk.jpg)

### 七、大功告成，开始使用

##### 安装Devcheck查看手机配置
![Devcheck](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/devcheck.jpg)
![硬件配置](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/redroid/devcheck-hardware.jpg)


### 写在最后

阿里云的**无影云电脑**是一台**amd64架构**的计算机，其实搭建云手机最佳方案是使用**Arm架构**的服务器（*省去了amd64指令转arm的过程，性能好的不是一点半点*），但是目前国内云主机厂商的Arm架构服务器特别贵，而且不能免费试用。

唯一可以用的是**甲骨文**的云服务器（*https://cloud.oracle.com/*），它提供**4核24G内存的Arm云主机**，并且永久免费试用（*这配置搭建云手机吊打市面的真实手机*）。

但是由于**太多人薅羊毛**机器根本不够用，所以很难抢到，有感兴趣的可以去碰碰运气，注册账号的时候选择区域不要选择**韩国、日本**这些热门区域，根本抢不到资源。

**甲骨文账号注册提醒**：需要准备一张支持外币支付的信用卡用于验证身份，很多银行都可以办理。并且不需要挂VPN代理，填写地址也要是真实地址（*建议是你的信用卡账单地址*）。

注册失败的话，可以连接手机网络，切换浏览器（*或者打开浏览器的无痕模式*）多试几次。

![Arm主机](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/oracle-cloud/vm.png)
![选择Arm实例](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/oracle-cloud/config.png)

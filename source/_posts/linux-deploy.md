---
title: Linux Deploy（在手机上运行Linux服务器）
date: 2021-07-20 22:18:41
categories:
  - Linux
tags: 
  - Linux
---

十年来，**智能手机发展极为迅速**，某些手机厂商的旗舰手机*一年一迭代*，**手机淘汰速度完全跟不上**。现在华为手机都要发布**P50**了，我还在用**P20**，而我手机才买了不到三年（*有点舍不得换，毕竟还没用三年*）。这么快的淘汰速度，相应的各位家里应该有不少明明都好好的，但是已经不用的手机吧（*我家里有5台不用的手机，还好好的*）。这些手机扔了可惜，卖了不值钱，而且还怕被人盗取信息。

作为一名**勤俭节约**、**充满好奇**、**愿意折腾**的本人，找到了一个有意思的用途：**把旧手机作为一台低功耗服务器**。

那要怎么做呢，首先，安装一个软件即可：[Linux Deploy](https://github.com/meefik/linuxdeploy)，这款软件只支持安卓手机，不支持IOS，那IOS用户怎么办：请**以旧换新**，还是很划算的。

### 相关链接
Github：https://github.com/meefik/linuxdeploy
Android APP下载地址：https://github.com/meefik/linuxdeploy/releases/tag/2.3.0

<!-- more -->

下面就以我这台八年前的手机为例：
![华为G750](https://resource.123123.store/blog/linux-deploy/linux-deploy-phone.jpeg)

通过上面的相关链接下载app，安装打开后页面是这样的
![软件界面](https://resource.123123.store/blog/linux-deploy/linux-deploy-default.jpeg)

点击**右下角图标**进入以下配置界面，配置需要安装的**Linux发行版、镜像大小、用户名密码**、最下面有个开启**SSH服务**一定要勾选，不然没法远程访问（截图没截到，往下翻就看到了）。
![配置界面](https://resource.123123.store/blog/linux-deploy/linux-deploy-config.jpeg)

通过一系列的配置、安装（*安装时间可能要十几分钟到半个小时*）后，点击**启动**按钮，出现以下页面代码启动成功
![启动成功](https://resource.123123.store/blog/linux-deploy/linux-deploy-start.jpeg)

之后可以通过电脑SSH远程访问手机服务器
![MobaXterm](https://resource.123123.store/blog/linux-deploy/linux-deploy-ssh.jpg)
![查看服务器配置](https://resource.123123.store/blog/linux-deploy/linux-deploy-df.jpg)
![查看服务器CPU](https://resource.123123.store/blog/linux-deploy/linux-deploy-cpu.jpg)

8核、2GB内存、2GB硬盘，硬盘有点小，可以挂载SD卡扩展空间（*可以看到df -h后，有一个sdcard1的30GB空间可用*），有时间我会细说一下怎么挂载SD卡。

``` bash
$ ssh root@192.168.1.1
```

### 注意事项
大家安装的时候看好版本，Android版本跟软件版本要对应上，低版本的系统用不了高版本的软件，反之亦然。

对了还有一个重中之重的一个问题：安装这个软件**系统需要ROOT**⊙﹏⊙∥，如果无法ROOT的话，只能用另外一个替代方案了：[Termux](https://termux.dev/en/)
![Termux](https://termux.dev/assets/globals/home/htop_framed.png)
有时间我会写一下Termux相关的教程，由于不需要ROOT相对而言Termux肯定在权限方面是不如**Linux Deploy**，不过作为一台Web服务器还是够的。

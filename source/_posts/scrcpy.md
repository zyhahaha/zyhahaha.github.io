---
title: scrcpy安卓投屏神器（可电脑操作手机）
date: 2023-03-26 23:27:16
categories:
  - 个人爱好
tags: 
  - Linux
---

scrcpy可以通过**adb调试**的方式把安卓手机屏幕投放到电脑上，并且可以**操作手机**。
它**不需要Root权限**，不需要在手机安装任何软件，支持Windows、MacOS、Linux操作系统。

连接方式有两种：**USB有线连接**、**Wifi无线连接**

适用场景：
1. 手机屏幕坏了看不清，通过电脑连接手机进行备份操作；
2. 上班摸鱼不方便拿手机，通过scrcpy把手机投放到电脑上，装作在电脑上工作其实是在玩手机；
3. 当你有电脑操作手机的需求时；

### 前置条件
* 电脑下载scrcpy软件（https://github.com/Genymobile/scrcpy）
* 安卓5.0以上，打开**开发者选项**，打开**USB调试**
* USB连接电脑，手机同意USB调试，信任此电脑

<!-- more -->

##### 下载软件
到Github下载你对应平台的安装包
https://github.com/Genymobile/scrcpy

![下载](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/scrcpy/github.jpg)

这里我以windows平台为例，解压到本地：

![scrcpy软件](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/scrcpy/software.jpg)

### 配置手机
首先准备一个安卓5.0以上的手机（*现在的手机基本支持*），打开**开发者选项**（怎么打开就不细说了，很简单自行百度），打开**USB调试**。
如果在后续投屏时电脑无法操作手机，可能是你手机还有个**USB模拟点击**选项，这个选项也要打开。

### 开始投屏（有线连接）
手机usb连接电脑，cmd进入scrcpy文件夹目录
``` bash
# adb查看设备
adb.exe devices

# 开始投屏
scrcpy.exe
```
![cmd](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/scrcpy/cmd.jpg)

![phone](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/scrcpy/phone.jpg)

快捷键：
1. Alt + O 手机息屏，电脑继续控制手机（*摸鱼更安心*）
2. Alt + F 切换全屏
3. Alt + 上下键  调节音量

### 无线连接（WIFI）

无线连接的前提是已经有线连接过设备，并且手机与电脑在同一局域网下，以上操作成功后按Ctrl + C结束投屏。
下面开始通过WIFI无线操作：

``` bash
# 找到你手机的IP地址，确认在同一局域网下 比如你手机的IP地址为192.168.0.69
ping 192.168.0.69

adb tcpip 5555

adb connect 192.168.0.69:5555

# 拔下数据线，输入以下命令，如果能发现刚刚添加的192.168.0.69设备，说明设备可投屏
adb devices

scrcpy

# 当有多个手机时，通过指定ip连接对应的手机
# scrcpy --tcpip=192.168.0.69
```

![WIFI连接](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/scrcpy/wifi-connect.jpg)

### adb玩法

``` bash
# adb连接后
adb shell

# 查看当前分辨率
wm size

# 修改分辨率
wm size 720x1280

# 查看当前dpi
wm density

# 修改dpi
wm density 320

# 重置回默认值：分辨率、dpi
wm size reset
wm density reset
```

### 结束
更多功能持续探索中

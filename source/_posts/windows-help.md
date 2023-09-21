---
title: Windows 拯救手册
date: 2020-07-01 20:00:10
categories:
  - Windows
tags: 
  - Windows
---

Windows常见问题修复方法，本文基于**Win10**出现的问题及其解决办法，其他版本可以作为参考

#### 误操作关闭资源管理器（explorer.exe）导致桌面崩溃
打开文件时如果该文件过大、或者当前磁盘繁忙、用户连续点击打开文件、用户误操作关闭进程等行为，都会导致资源管理器无响应，着急的用户可能会直接去强制关闭资源管理器，这个时候可能就会出现桌面崩溃的情况。

![桌面崩溃](http://119.96.189.81:7788/blog/windows-help/windows-help-desktop-crash.jpg)

<!-- more -->

这种情况大多数人可能直接重启电脑，但是如果电脑里正在运行一个不能关闭的程序，我们除了重启还有其他办法吗？下面介绍一下比重启更快、更安全的解决办法：
首先打开任务管理器（在没桌面的情况先使用键盘快捷键打开），点击文件 --> 新任务 --> 输入cmd，打开cmd界面 --> 在cmd里输入explorer回车 --> 解决问题，桌面程序重新打开

![任务管理器](http://119.96.189.81:7788/blog/windows-help/windows-help-task.jpg)

![CMD](http://119.96.189.81:7788/blog/windows-help/windows-help-cmd.jpg)



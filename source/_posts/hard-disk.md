---
title: Linux挂载新硬盘
date: 2020-09-15 10:06:49
categories:
  - Linux
tags: 
  - Linux
---

作为一个程序员只有云服务器是不够的，你还要有一个实体的[真实服务器](https://blog.123123.store/debian.html)。作为一台服务器增加配置是常事，换CPU就不说了，麻烦！加内存就简单一点，插上就行！这里我们重点说说加硬盘怎么弄，直接插上是不行的o_o ....插上之后需要*分区、格式化、挂载*，我们的程序才能使用这块硬盘。
下面我们一步一步来配置：

### 查看硬盘状况
``` bash
sudo fdisk -l
```

<!-- more -->

### 建立挂载硬盘路径
``` bash
sudo mkdir /data
```

### 硬盘格式化（/dev/sdb不是固定写法，是第一步命令查看到的新硬盘Device名）
``` bash
sudo mkfs.ext4  /dev/sdb
```

###  使用fdisk建立硬盘分区表、进行分区
``` bash
sudo fdisk /dev/sdb
```

输入p，查看当前的分区表
分别输入g、p重建为gpt分区表
分别输入n、1、w创建新分区（将整个硬盘划分为单独的一个分区）
查看分区是否有效

``` bash
file /dev/sdb
```

### 分区生效后再次进行硬盘格式化
``` bash
sudo mkfs.ext4  /dev/sdb
```

### 使用mount命令挂在硬盘到新建文件夹
``` bash
sudo mount /dev/sdb /data
```

### 配置 /etc/fstab 文件，使重启时也可以自动挂载
``` bash
sudo echo '/dev/sdb  /data   ext4    defaults    0   0' >> /etc/fstab
```
修改路径权限
``` bash
sudo chmod -R 777 /data
sudo chown -R 777 /data
```

### 挂载NFS网络硬盘
$ sudo apt-get install nfs-common
$ mount -t nfs -o vers=3,nolock 10.187.128.183:/64fc2ca4-2d2a-4152-a97f-bee2df87d9f5 /mnt

### 参考
https://blog.csdn.net/qq_37358732/article/details/107568654

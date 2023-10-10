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

#
scrcpy -s localhost:5555
```

### scrcpy连接设备
``` bash
# 单个设备连接
scrcpy

# 多设备时通过指定ip连接
scrcpy -s localhost:5555
```

### 三、Redroid安装完成，开始安装Magisk
参考文档：https://gist.github.com/assiless/a23fb52e8c6156db0474ee8973c4be66

##### 设置环境变量
``` bash
echo -e "\n
export image=redroid/redroid:11.0.0-latest
export image_tar=${HOME}/redroid:11.0.0-latest" >> ${HOME}/.bashrc
source ${HOME}/.bashrc
```

##### 使用docker安装
``` bash
# 拉取镜像
sudo docker pull $image
# 导出镜像
sudo docker save --output redroidBak.tar $image
# sudo docker save --output redroidBak.tar redroid/redroid:11.0.0-latest
```

``` bash
# 删除已更改的镜像
sudo docker image rmi -f $image
# 加载刚刚备份的镜像
sudo docker load -i redroidBak.tar
```

##### Setting Up
``` bash
sudo mkdir ~/MagiskOnRedroid
cd ~/MagiskOnRedroid
```

``` bash
# 下载、提取Magisk
find -maxdepth 1 -iname "magisk*" -not -name "*.apk" -exec rm -r {} \;
magisk_file="app-debug.apk"
# download Magisk 9b61bdfc(25201) debug as you did i guess
if [ ! -f $magisk_file ]; then
  sudo wget "https://cdn.jsdelivr.net/gh/topjohnwu/magisk-files@1cea72840fbf690f9a95512d03721f6a710fe02e/app-debug.apk"
fi
# because my machine x64 i will choose x86_64
sudo unzip -j $magisk_file "lib/x86_64/libmagisk64.so" -d magisk
sudo unzip -j $magisk_file "lib/x86_64/libbusybox.so" -d magisk
sudo mv -v magisk/libmagisk64.so magisk/magisk
sudo mv -v magisk/libbusybox.so magisk/busybo
# $ tree ~/MagiskOnRedroid
# .
# ├── app-debug.apk
# └── magisk
#     ├── busybox
#     └── magisk
```

##### compress magisk（不知道是啥，直接执行）
``` bash
tar --transform 's/.*\///g' -cf ~/magisk.tar --absolute-names $( find ~/MagiskOnRedroid | grep -E "magisk/|app-debug.apk$" )
```

##### remove.rc
``` bash
cat <<\EOF > ~/remove.rc
on early-init
	export PATH /sbin:/product/bin:/apex/com.android.runtime/bin:/apex/com.android.art/bin:/system_ext/bin:/system/bin:/system/xbin:/odm/bin:/vendor/bin:/vendor/xbin
	chmod 0700 /magisk.tar
	chown root root /magisk.tar
	chmod 0700 /setup.sh
	chown root root /setup.sh
	exec root root -- /setup.sh
service magisk-d /sbin/magisk --daemon
	user root
	oneshot
on boot
	start magisk-d
on post-fs-data
	start logd
	rm /dev/.magisk-unblock
	start s1
	wait /dev/.magisk-unblock 5
	rm /dev/.magisk-unblock
service s1 /sbin/magisk --post-fs-data
	user root
	oneshot
service s2 /sbin/magisk --service
	class late_start
	user root
	oneshot
on property:sys.boot_completed=1
	exec /sbin/magisk --boot-complete
on property:init.svc.zygote=restarting
	exec /sbin/magisk --zygote-restart
on property:init.svc.zygote=stopped
	exec /sbin/magisk --zygote-restart
EOF
sudo chmod 644 ~/remove.rc
sudo chown root:root ~/remove.rc
```

##### setup.sh
``` bash
cat <<\EOF > ~/setup.sh
#!/system/bin/sh

# rm /system/fonts/NotoColorEmoji.ttf
tmpPushed=/magisk
rm -rf $tmpPushed
mkdir $tmpPushed
tar -xvf /magisk.tar --no-same-owner -C $tmpPushed
umount /magisk.tar ; rm -v /magisk.tar
mkdir /sbin
chown root:root /sbin
# chmod 0700 /sbin
chmod 0751 /sbin
cp $tmpPushed/magisk /sbin/
cp $tmpPushed/app-debug.apk /sbin/stub.apk
find /sbin -type f -exec chmod 0755 {} \;
find /sbin -type f -exec chown root:root {} \;
# add /sbin
# /sbin/
# ├── magisk
# └── stub.apk


ln -f -s /sbin/magisk /system/xbin/su
mkdir /product/bin
chmod 751 /product/bin
ln -f -s /sbin/magisk /product/bin/su
# add su (override `/system/xbin/su`)
# /product/bin/
# └── su -> /sbin/magisk

mkdir -p /data/adb/magisk
chmod 700 /data/adb
mv $tmpPushed/busybox /data/adb/magisk/
chmod -R 755 /data/adb/magisk
chmod -R root:root /data/adb/magisk
# /data/adb/
# ├── magisk
# │   └── busybox

# rm -rf $tmpPushed
EOF
sudo chmod 700 ~/setup.sh
sudo chown root:root ~/setup.sh
```

##### 运行Magisk（boot with magisk support）
``` bash
(
sudo docker stop a11
clear
sudo docker run -itd --rm --privileged \
  --name a11 \
  -v ~/data:/data \
  -v ~/remove.rc:/vendor/etc/init/remove.rc \
  -v ~/setup.sh:/setup.sh \
  -v ~/magisk.tar:/magisk.tar \
  -p 5555:5555 \
  redroid/redroid:11.0.0-latest \
  ro.secure=0
)
```

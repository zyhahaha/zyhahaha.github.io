---
title: Linux Termux（在手机上运行Linux服务器）
date: 2021-09-13 22:17:40
categories:
  - Linux
tags: 
  - Linux
---

### 安装Termux 运行Linux安装脚本

Termux下载地址：https://f-droid.org/packages/com.termux/

``` bash
. <(curl -L gitee.com/mo2/linux/raw/2/2)
```

剩下的自由发挥
参考博客：https://blog.dreamfall.cn/post/termux-xmr/

### 编译 C3-xmrig

进入 Ubuntu
``` bash
# 在Termux终端输入命令，启动Ubuntu
debian
```

安装依赖
``` bash
apt-get install git build-essential cmake libuv1-dev libssl-dev libhwloc-dev -y
```

克隆代码
``` bash
git clone https://github.com/C3Pool/xmrig-C3.git
```

去除抽水率
``` bash
vim xmrig-C3/src/donate.h
```
``` bash
# 把1改为0
constexpr const int kDefaultDonateLevel = 1
constexpr const int kMinimumDonateLevel = 1
```

编译安装
``` bash
mkdir xmrig-C3/build && cd xmrig-C3/build && cmake .. && make -j$(nproc) && mv xmrig ~ && cd ~ && rm -rf xmrig-C3
```

启动Xmrig
``` bash
./xmrig -u 422x5HQKsFpRPi6UF7J9ngESkU1FBVzFVUVTgz4jDm6P6nDezgzMXujW7Wjt6QWWSTMy5sQx63YvG9gWoMCWMrLxBKTx3Qo -o  auto.c3pool.org:19999 -p termuxZ -a cn-pico
```

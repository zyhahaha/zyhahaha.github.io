---
title: Linux环境比特币安装（Debian 11 OR Ubuntu18）
date: 2021-07-17 21:28:58
tags: BTC
---

现在才玩比特币属于**高位接盘**，但是并不妨碍我们了解它，不求赚钱，只为了满足一下好奇心。
那么怎么玩？首先我们要有个钱包吧，之前国内有各种交易平台，并不需要我们安装钱包就能交易，但是现在基本已经关停，而且钱包攥在别人手里，各位心里不难受吗。

那为什么钱包要安装到Linux系统里呢，因为bitcoin钱包很大，有多大？下面会说。而且要联网同步节点，第一次运行钱包的时候，要开机联网同步数据，具体时间看你电脑性能。
以我的**4核4G内存5MB带宽**的云服务器为例：跑了大概有两天多才把数据同步完。如果你安装到你的Windows10上，你电脑要开机两天两夜，而且同步节点时会占用CPU，这两天这台电脑使用起来都不痛快，
最最最主要的是会占用你宝贵的硬盘空间o_o ...

话不多说下面开始教一下大家怎么安装钱包：
**个人观点：** *比特币、以太坊、门罗币等虚拟货币我觉得水太深，各位小白别玩，但是它们的区块链技术，我觉得很可能是互联网的未来，至少是未来的一部分*

<!-- more -->

### 安装bitcoin钱包 （v0.21.0）
安装bitcoincore全节点需要400GB的硬盘空间，如果硬盘空间不足可以安装bitcoincore轻节点，如何选择全节点还是轻节点在后面会说。
使用轻节点需要大约7GB的硬盘空间

1. 下载bitcoin
https://bitcoincore.org/en/download/
``` bash
wget https://bitcoincore.org/bin/bitcoin-core-0.21.0/bitcoin-0.21.0-x86_64-linux-gnu.tar.gz
```

2. 下载解压后
``` bash
tar xzf bitcoin-0.21.0-x86_64-linux-gnu.tar.gz
```

3. 使用图形界面安装
``` bash
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-0.21.0/bin/*

/usr/local/bin/bitcoin-qt
```

4. 安装完成，开始同步区块（这个时候可以关闭GUI程序，剩下的使用命令行操作）

### bitcoin配置

1. bitcoin的默认配置目录为 ~/.bitcoin/bitcoin.conf，填写以下配置
``` bash
# ~/.bitcoin/bitcoin.conf
datadir=/opt/btc/datadir
# 设置数据库缓存大小
dbcache=10240

# 交易索引 txindex=1就代表全节点 不填写就是轻节点
# txindex=1

# 是否开启修剪模式 (https://bitcoin.org/en/full-node#reduce-storage)
prune=10240

# rpc访问的user
rpcuser=zhaoyang

# rpc访问的password
rpcpassword=zy980355088

# 后台运行
daemon=1
server=1
rest=1

rpcbind=0.0.0.0:8332
rpcallowip=0.0.0.0/0
deprecatedrpc=accounts

# 闪电网络需要下面两行配置的支持
# 允许在本机端口28332上广播原始区块信息
zmqpubrawblock=tcp://127.0.0.1:28332
# 允许在本机端口28333上广播原始交易信息
zmqpubrawtx=tcp://127.0.0.1:28333
```

### 命令使用说明

启动bitcoin
``` bash
bitcoind -daemon
```

关闭bitcoin，一定要用以下命令，否则会有可能导致数据异常，需要重新同步数据
``` bash
bitcoin-cli stop
```

一些其他命令
``` bash
# 创建钱包
bitcoin-cli createwallet "zhaoyang"
# 生成钱包地址
bitcoin-cli getnewaddress "test"  #"test"是输入的账号label
# 获取所有钱包地址及其账号名
bitcoin-cli listreceivedbyaddress 1 true
# 查看网络状态：
bitcoin-cli getnetworkinfo
# 查看网络节点：
bitcoin-cli getpeerinfo
# 查看区块链信息：如同步进度、
bitcoin-cli getblockchaininfo
# 查看所有命令
bitcoin-cli help
```

启动后钱包会自动同步区块，可以打开日志查看具体同步情况
``` bash
tail -f nohup.out
```

进入bitcoin安装目录
``` bash
cd $HOME/.bitcoin
ls
banlist.dat  bitcoind.pid  blocks  chainstate  debug.log  peers.dat  wallets
ls wallets/
database  db.log  wallet.dat
```
``` bash
bitcoind.pid bitcoind   运行的进程文件
 
blocks  区块链数据文件
 
chainstate 区块链状态的数据库使用LevelDB存储
 
db.log 数据库日志文件
 
debug.log 运行时的日志文件
 
wallet.dat 钱包文件（这个要划重点了，此文件保存了我们钱包生成的私钥，特别重要，建议通过编写shell脚本或者使用后台程序每天做个备份）
```

钱包命令介绍
``` bash
bitcoin-cli getwalletinfo   查看钱包详情，在0.18版本中，以前的getinfo已经取消
{
  "walletname": "",
  "walletversion": 169900,              钱包版本
  "balance": 0.00000000,                钱包余额
  "unconfirmed_balance": 0.00000000,    未确认余额
  "immature_balance": 0.00000000,       这个暂时还不清楚
  "txcount": 0,                         钱包内交易数量
  "keypoololdest": 1562826486,          密钥池内最早密钥创建时间
  "keypoolsize": 1000,                  密钥池大小
  "keypoolsize_hd_internal": 1000,
  "paytxfee": 0.00000000,               手续费率（这个比较重要，后面单独讲）
  "hdseedid": "ed13b2019c2e28e9dc84cf7124ba2e36cebcb656",
  "private_keys_enabled": true
}
 
bitcoin-cli getblockchaininfo   查看区块详情
{
  "chain": "main",
  "blocks": 238558,                     钱包当前区块（btc安装启动后一般1-2天可以同步到最新区块高度）
  "headers": 584893,                    当前最新区块高度
  ....  后面还有其他信息，我们暂不关注
}
 
bitcoin-cli sendtoaddress   转账接口（后面具体介绍）
Response:
1. "address"            (string, required) 接收地址
2. "amount"             (numeric or string, required) 转账金额
 
Result:
"txid"                  (string) 唯一标识tx_id
 
Examples:
> bitcoin-cli sendtoaddress "bc1q7wuvm9q4s0gr9mtqtn2wamjx0462hg43g8h8ak" 0.1
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["bc1q7wuvm9q4s0gr9mtqtn2wamjx0462hg43g8h8ak", 0.1] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

### Github地址
https://github.com/bitcoin/bitcoin

### 官网
https://bitcoincore.org/en/download/

### 下载地址
https://bitcoincore.org/bin/

### 门罗币
1. 官网（下载钱包）：https://www.getmonero.org/downloads/
2. 下载挖矿程序：https://github.com/xmrig/xmrig/releases
3. 矿池：mine.c3pool.com:13333

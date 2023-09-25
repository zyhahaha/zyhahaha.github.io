---
title: DHT
date: 2022-09-17 20:35:06
categories:
  - 个人爱好
tags: 
  - Linux
---

一直很好奇那些资源站、磁力链接网站是怎么做到这么多资源的，经过一番专研，我自建了一个磁力链接网站，这里给大家分享一下它是怎么实现的。
经过这篇文章的讲解，大家也可以搭建属于自己的磁力链接网站。

### 前置条件
1. 至少一台linux服务器（*最好两台*）
2. Mysql数据库（*磁力链接数据库*）
3. 安装Nodejs、Npm（*Nodejs >= 10*）
4. 需安装qbittorrent（*用于解析磁力链接内容*）

### 代码已开源
1. DHT仓库：https://github.com/zyhahaha/DHT
2. 磁力链接前端：https://github.com/zyhahaha/AppMe

<!-- more -->

### 简述
首先简述一下实现磁力链接网站的大概思路：
1. 加入DHT网络获取磁力链接hash
2. 把磁力链接hash存入数据库
3. 解析磁力链接获得BT种子，把磁力链接内容存入数据库
4. 搭建前端页面提供磁力链接的查询

### 加入DHT网络获取磁力链接
直接下载这个代码，开箱即用：https://github.com/zyhahaha/DHT
![Github仓库](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/dht/github.jpg)


下面我说一下调用方式。
``` javascript
const spider = new (require('./lib/spider'))

// 这里直接把磁力链接打印出来
spider.on('ensureHash', (hash, addr)=> console.log(`magnet:?xt=urn:btih:${hash}`))

spider.listen(6339)
```

### 把磁力链接hash存入数据库
这一步是最简单的一步，因为我的后端代码包含一些敏感信息就没有开源，大家自己搭建一个后端，提供基础的增删改查功能，用于保存磁力链接数据。
这里我推荐用**Nestjs**作为后端框架，感兴趣的可以看我另外一篇文章：https://zyhahaha.github.io/nestjs.html

我们只需要保存**ensureHash**事件返回的hash即可
``` javascript
spider.on('ensureHash', (hash, addr)=> {
  // 保存磁力链接到数据库
  saveHash(`magnet:?xt=urn:btih:${hash}`)
})
```

### 通过磁力链接获取种子
只有磁力链接我们就可以通过一些软件下载资源了，但是如果我们要做一个磁力链接网站，在查询时要知道这个磁力链接的资源内容，资源大小等信息。
这个时候我们就需要把磁力链接转为种子，种子内包含这些信息。


那么如何获取种子呢，这里就需要用到qbittorrent，可以用它通过磁力链接来下载种子。
![qbittorrent](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/dht/qbittorrent.png)

通过qbittorrent下载种子，获取磁力链接内容，如何实现自动化下载、获取、存入数据库。
市面上有这么多磁力链接下载软件，我为啥选择qbittorrent呢，因为qbittorrent提供了Web Api，我们可以用脚本调用Web Api来自动下载资源、获取资源内容、删除已经下好的任务。
具体代码在parse-hash-v2文件夹内
``` bash
cd parse-hash-v2

node index.js
```
简述各脚本的用处：
1. query-remote-hash-list.js *获取数据库内的磁力链接*
2. add-hash.js *把磁力链接添加入qbittorrent任务*
3. query-local-hash-list.js *获取qbittorrent内下载完成的任务*
4. update-remote-hash.js *把上一步获取的种子内容更新到数据库中*
5. delete-hash.js *删除已经处理的磁力链接任务*

### 结束
![frontend](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/dht/frontend.jpg)

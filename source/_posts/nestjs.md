---
title: Nestjs个人理解
date: 2020-12-22 20:16:22
tags:
---

作为**前端开发人员**，应该很多人都知道**Nodejs**，也有想用Nodejs写后台项目的，我估计有很多人写着写着最终也就放弃了，然后会说：*Nodejs不适合写Web服务端项目*。**事实并不是这样**，他们用Nodejs写后台项目，大多数用到框架可能是：*Koa、Express、Eggjs、Koa2、Fastify*。这一类框架只是提供了最基础的底座，想完成一个成熟的项目，需要在上面添加很多东西，所以写着写着就烦了。

用**JavaScript**写后端项目有两大难点：**弱类型语言、相关生态不成熟**。弱类型语言会导致编写大型项目时代码难以把控，生态不够成熟会导致项目越写越累，需要到处找轮子，而且各种轮子质量参差不齐，没法像**Java Sprint**一样拿来一把梭。
现在我推荐一下[Nestjs](https://docs.nestjs.com/)，它支持[Typescript](https://www.tslang.cn/index.html)编写代码，完美解决JS的弱类型问题，而且生态很健全，项目中需要用到的大多数工具都可以在@nestjs中找到。

``` bash
npm i -g @nestjs/cli
nest new project-name
```

<!-- more -->

我目前写的项目也是用的Nestjs，这里我专门把*业务代码*抽离出去，剩下的作为[项目模板](https://github.com/zyhahaha/e-shop-backend-nest)开源出来，感兴趣的可以看一下。
这个模板项目可以让小白了解以下几个知识点：
* Redis连接及基础操作；
* Mysql连接及基础操作；
* Mongodb连接及基础操作；
* Websockets；
* log4js日志处理；
* 邮件通知、七牛云对象存储操作；
* 通过代码自动生成Swagger接口文档；
* 基础的注册登录，JWT跨域认证解决方案（*一种基于 Token 的认证授权机制*）；
* 通过阿里云SDK修改DNS解析地址；

### PM2开机自启
``` bash
# 启动项目
pm2 start xxxx
# 保存pm2程序配置
pm2 save
# 生成开机自启动服务
pm2 startup
# 开机服务
systemctl enable pm2-root
# 重启
reboot
```

未完待续，有时间再写

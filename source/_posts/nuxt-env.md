---
title: Nuxt多环境配置
date: 2022-08-26 16:00:10
categories:
  - Javascript
tags: 
  - Javascript
---

Nuxt项目测试、生产**环境变量配置**，首先使用[cross-env](https://www.cnblogs.com/jiaoshou/p/12187504.html)（一款跨平台设置和使用环境变量的脚本）配置环境变量。

#### 第一步：修改package.json文件（通过cross-env添加环境变量MODE）
``` json
"scripts": {
    "test-start": "cross-env MODE=test nuxt start",
    "test": "cross-env MODE=test nuxt build",
}
```

<!-- more -->

#### 第二步：创建env.js文件（各环境配置字典）
``` javascript
module.exports = {
    dev: {
        MODE: 'dev',
        ENV_API: 'https://api.dev.cn',
        ENV_OPEN_DOC_URL: 'https://qwer.dev.cn'
    },
    test: {
        MODE: 'test',
        ENV_API: 'https://api.test.cn',
        ENV_OPEN_DOC_URL: 'https://qwer.test.cn'
    },
    prod: {
        MODE: 'prod',
        ENV_API: 'https://api.prod.cn',
        ENV_OPEN_DOC_URL: 'https://qwer.prod.cn'
    }
}
```

#### 第三步：修改nuxt.config.js文件（通过环境变量MODE，获取当前环境配置）
``` javascript
import env from './env'
export default {
    env: {
        NUXT_ENV: env[process.env.MODE]
    }
}
```

#### 第四步：如何在项目中使用
``` javascript
computed: {
    baseApiUrl () {
        return process.env.NUXT_ENV.ENV_API
    }
    baseSiteUrl () {
        return process.env.NUXT_ENV.ENV_OPEN_DOC_URL
    }
}
```
``` html
<img :src="`${baseSiteUrl}/images/defalut.png`" alt="">
```

#### 第五步：结束

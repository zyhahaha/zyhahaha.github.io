---
title: 手机端部署 Go Phone Agent - Termux + LADB 完整指南
date: 2025-01-13 22:28:30
categories:
  - AI应用
tags:
  - Go
  - Termux
  - LADB
  - 手机部署
---

Go Phone Agent 不仅可以运行在 PC 端，还能直接部署在 Android 手机上，实现真正的"手机自动化"。通过 Termux（Android 终端模拟器）和 LADB（Local ADB），我们可以让智能体直接在手机上运行，无需依赖电脑连接。

本文将详细介绍如何在 Android 手机上完整部署 Go Phone Agent。

## 为什么选择手机端部署

相比 PC 端运行，手机端部署有以下优势：

* **独立运行**：无需电脑连接，手机即可独立完成自动化任务
* **便携性强**：随身携带，随时可用
* **隐私安全**：数据不经过第三方设备
* **24小时运行**：手机插电即可持续执行任务
* **低功耗**：相比 PC 端，手机耗电量更低

<!-- more -->

## 准备工作

### 硬件要求

* Android 7.0+ 设备
* 建议 3GB+ 内存
* 至少 2GB 可用存储空间

### 软件准备

1. **Termux**：Android 终端模拟器
2. **LADB**：本地 ADB 服务器（无需 root）
3. **ADB Keyboard**：虚拟键盘，用于文本输入
4. **Go 编译环境**

## 安装 Termux

### 方法一：通过 F-Droid 安装（推荐）

1. 访问 https://f-droid.org/packages/com.termux/
2. 下载并安装 Termux
3. 打开应用，更新系统包：

```bash
pkg update && pkg upgrade
```

### 方法二：通过 GitHub 安装

1. 访问 https://github.com/termux/termux-app/releases
2. 下载最新版本的 APK
3. 允许安装未知来源应用
4. 安装 APK

## 配置 Termux

### 安装必要工具

```bash
# 安装 Go 语言
pkg install golang

# 验证安装
go version
```

## 安装 LADB

### 什么是 LADB

LADB（Local ADB）是一个无需 root 即可在本地运行 ADB 的应用。它允许手机内部的程序通过 localhost 与 ADB 服务器通信。

### 安装步骤

1. 下载 LADB APK：https://github.com/tytydraco/LADB/releases
2. 安装 LADB 应用
3. 打开应用启动 ADB 服务器
4. 记录显示的端口号（默认为 5555）

### 在 Termux 中连接 LADB

```bash
# 安装 ADB 工具
pkg install android-tools

# 连接到本地 ADB 服务器
adb connect localhost:5555

# 验证连接
adb devices
```

![LADB](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/ai-phone-agent/local-adb.png)

## 安装 ADB Keyboard

ADB Keyboard 是一个虚拟键盘，通过 ADB 接收文本输入命令。

### 安装步骤

1. 下载 ADB Keyboard APK：https://github.com/senzhk/ADBKeyBoard/blob/master/ADBKeyboard.apk
2. 安装应用
3. 进入系统设置 → 语言和输入法
4. 启用 ADB Keyboard
5. 切换当前输入法为 ADB Keyboard

## 部署 Go Phone Agent

### 克隆项目

```bash
# 创建项目目录
mkdir -p ~/projects
cd ~/projects

# 克隆仓库
git clone https://github.com/zyhahaha/go-phone-agent.git
cd go-phone-agent
```

### 下载依赖

```bash
# 设置 Go 代理
go env -w GOPROXY=https://goproxy.cn,direct

# 下载依赖
go mod download
```

### 编译项目

```bash
# 编译为 Android ARM64 版本
GOOS=android GOARCH=arm64 go build -o phone-agent cmd/main.go

# 如果是 32 位 ARM 设备
# GOOS=android GOARCH=arm go build -o phone-agent cmd/main.go

# 设置可执行权限
chmod +x phone-agent
```

### 验证编译

```bash
# 查看帮助信息
./phone-agent --help
```

![Termux Phone Agent](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/ai-phone-agent/termux-phone-agent.png)

## 配置智能体

### 配置模型服务

编辑配置文件或直接使用命令行参数：

```bash
# 创建配置脚本
cat > ~/phone-agent-config.sh << 'EOF'
#!/bin/bash
export BASE_URL="https://open.bigmodel.cn/api/paas/v4"
export API_KEY="ce1cd5c3a99c4c548383b88097294daa.9UC5Lk7RZHCCBiAt"
export MODEL="autoglm-phone"
EOF

# 设置执行权限
chmod +x ~/phone-agent-config.sh

# 加载配置
source ~/phone-agent-config.sh
```

### 测试运行

```bash
# 进入项目目录
cd ~/projects/go-phone-agent

# 简单测试
./phone-agent --base-url $BASE_URL --apikey $API_KEY --model $MODEL "打开设置"
```

![Termux Task](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/ai-phone-agent/termux-task.png)

## 创建自动化脚本

### 场景一：定时消息

创建定时发送消息的脚本：

```bash
cat > ~/send-message.sh << 'EOF'
#!/bin/bash
source ~/phone-agent-config.sh
cd ~/projects/go-phone-agent
./phone-agent --base-url $BASE_URL --apikey $API_KEY --model $MODEL \
  "打开微信,给小明发消息:早上好,今天天气不错"
EOF

chmod +x ~/send-message.sh
```

### 场景二：每日打卡

```bash
cat > ~/daily-checkin.sh << 'EOF'
#!/bin/bash
source ~/phone-agent-config.sh
cd ~/projects/go-phone-agent
./phone-agent --base-url $BASE_URL --apikey $API_KEY --model $MODEL \
  "打开钉钉,点击打卡"
EOF

chmod +x ~/daily-checkin.sh
```

### 场景三：快递监控

```bash
cat > ~/check-express.sh << 'EOF'
#!/bin/bash
source ~/phone-agent-config.sh
cd ~/projects/go-phone-agent
./phone-agent --base-url $BASE_URL --apikey $API_KEY --model $MODEL \
  "打开快递100,查询快递SF123456789"
EOF

chmod +x ~/check-express.sh
```

## 常见问题

### 1. LADB 连接失败

**问题**：`adb connect localhost:5555` 失败

**解决方案**：
- 确保先打开 LADB 应用并启动服务
- 检查端口号是否正确
- 重启 LADB 服务

### 2. 编译错误

**问题**：`go build` 时出现架构不匹配错误

**解决方案**：
```bash
# 查看设备架构
uname -m

# 根据架构选择编译参数
# aarch64 → GOARCH=arm64
# armv7l → GOARCH=arm
```

### 3. 输入法切换问题

**问题**：文本输入不生效

**解决方案**：
- 确保已将 ADB Keyboard 设为默认输入法
- 检查是否正确安装 ADB Keyboard
- 尝试手动切换到 ADB Keyboard

### 4. 权限问题

**问题**：运行脚本提示权限不足

**解决方案**：
```bash
# 给脚本添加执行权限
chmod +x script-name.sh

# 检查 Termux 存储权限
termux-setup-storage
```

### 5. 后台任务被系统杀死

**问题**：Termux 在后台被系统杀死

**解决方案**：
- 将 Termux 添加到电池优化白名单
- 在系统设置中允许 Termux 后台运行
- 使用 Termux:Boot 实现开机自启动

## 总结

通过 Termux 和 LADB，我们成功将 Go Phone Agent 部署到了 Android 手机上。这种部署方式的优势包括：

* ✅ **完全独立**：无需电脑，手机自主运行
* ✅ **低功耗**：相比 PC，耗电量更少
* ✅ **便携性强**：随身携带，随时可用
* ✅ **隐私安全**：数据不经过第三方设备
* ✅ **24小时运行**：插电即可持续工作

无论是定时消息、自动打卡，还是快递监控，手机端部署都能提供更灵活的自动化解决方案。

## 相关链接

* [Termux 官方文档](https://wiki.termux.com/)
* [LADB GitHub](https://github.com/tytydraco/LADB)
* [ADB Keyboard GitHub](https://github.com/senzhk/ADBKeyBoard)
* [Go Phone Agent 项目](https://github.com/zyhahaha/go-phone-agent)

---

如有问题或建议，欢迎交流讨论。

---
title: Go Phone Agent - 基于视觉模型的手机自动化智能体
date: 2025-01-10 22:28:30
categories:
  - AI应用
tags:
  - Go
  - ADB
  - 视觉模型
---

## 简介

Go Phone Agent 是一个基于视觉语言模型的开源手机自动化框架。它让 AI 能够"看懂"手机屏幕，像人类一样自然地操作设备——你只需要用自然语言描述任务，智能体就能自动分析屏幕、思考决策、执行操作，直到任务完成。

与传统基于坐标或元素定位的自动化方案不同，Go Phone Agent 通过视觉理解实现真正的智能操作，无需编写复杂的规则脚本，界面布局变化也不会影响运行。

## 快速开始

### 前置条件

* Go 1.21+ 环境
* ADB (Android Debug Bridge)
* AutoGLM-Phone 模型服务或兼容的视觉模型
* ADB Keyboard(仅 Android 设备需要，用于文本输入)

### 手机环境准备
确保设备已启用开发者选项和USB调试。
安装ADB Keyboard。
1. 下载ADB Keyboard APK: https://github.com/senzhk/ADBKeyBoard/blob/master/ADBKeyboard.apk

2. 将下载的APK安装到安卓设备中

3. 在设置-输入法中启用ADB Keyboard

### 安装 ADB

```bash
# macOS
brew install android-platform-tools

# Linux
sudo apt install android-tools-adb

# Windows
# 下载并添加到 PATH: https://developer.android.com/tools/releases/platform-tools
```

连接设备:

```bash
adb devices
```

![scrcpy连接手机](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/ai-phone-agent/adb-connect.png)

### 编译项目

```bash
cd go-phone-agent
go env -w GOPROXY=https://goproxy.cn,direct
go mod download
go build -o phone-agent cmd/main.go
```

### 运行示例

```bash
# 单次任务
./phone-agent --base-url https://open.bigmodel.cn/api/paas/v4 --apikey YOUR_API_KEY --model autoglm-phone "打开微信发消息给文件传输助手:测试"

# 交互模式
./phone-agent --base-url https://open.bigmodel.cn/api/paas/v4 --apikey YOUR_API_KEY --model autoglm-phone
```

![交互模式](https://cdn.jsdelivr.net/gh/zyhahaha/assets@master/images/blog/ai-phone-agent/run-task.png)

## 工作原理

智能体通过以下循环流程完成任务：

```
用户指令 → ADB 截图 → 视觉模型分析 → 输出动作指令 → ADB 执行操作 → 循环直到任务完成
```

## 核心特性

### 1. 真正的视觉理解

传统自动化工具依赖坐标或元素定位，界面布局变化就会失效。本方案采用视觉语言模型，能够真正"看"懂屏幕内容，无论界面如何变化都能准确识别操作目标。

### 2. 自然语言交互

```bash
./phone-agent --base-url https://open.bigmodel.cn/api/paas/v4 --apikey YOUR_API_KEY --model autoglm-phone "打开微信,搜索小明,发消息说你好"
```

无需编写代码或配置复杂规则，直接使用自然语言描述任务即可。

### 3. 轻量级高效

| 指标 | 数值 |
|------|------|
| 内存占用 | 20-30MB |
| 启动速度 | < 100ms |
| 单步执行 | < 1s（不含模型推理） |
| 编译体积 | ~10MB |

得益于 Go 语言的高性能，即便在随身 WiFi 这类小设备上也能流畅运行。

### 4. 跨平台支持

支持 Windows、Linux、macOS，甚至可以在 Android 手机上独立运行（Termux + LADB）。

## 使用场景

### 场景一：自动化测试

自动测试 App 的各项功能流程：

```bash
./phone-agent "打开淘宝,搜索iPhone,进入商品详情,加入购物车"
```

### 场景二：批量操作

批量执行重复性操作，如给好友发消息、点赞、打卡等：

```bash
./phone-agent "打开微信,给张三发消息:早上好"
```

结合脚本循环执行，彻底解放双手。

### 场景三：辅助特殊人群

帮助老年人或技术不熟练的用户完成复杂操作：

```bash
./phone-agent "打开设置,连接WiFi,输入密码123456"
```

### 场景四：定时监控

结合定时任务，实现对特定应用或页面的自动化监控：

```bash
# 每小时检查一次快递状态
*/60 * * * * /root/phone-agent "打开快递100,查询快递123456"
```

## 原子操作

智能体通过以下原子操作组合完成复杂任务：

| 操作 | 说明 |
|------|------|
| Launch | 启动应用 |
| Tap | 点击屏幕 |
| Type | 输入文本 |
| Swipe | 滑动屏幕 |
| Back | 返回上一页 |
| Home | 返回桌面 |
| Double Tap | 双击 |
| Long Press | 长按 |
| Wait | 等待 |

## 多设备支持

支持同时连接多个手机，通过 WiFi 或 USB 都可以：

```bash
# 连接远程设备
adb connect 192.168.1.100:5555

# 指定设备运行
./phone-agent --device-id 192.168.1.100:5555 "打开抖音"
```

## 高级功能

### 自定义回调

添加确认和接管逻辑，实现人工干预：

```go
confirmationCallback := func(message string) bool {
    fmt.Printf("确认操作: %s (Y/N): ", message)
    var response string
    fmt.Scanln(&response)
    return strings.ToUpper(response) == "Y"
}

takeoverCallback := func(message string) {
    fmt.Printf("需要人工干预: %s\n", message)
    fmt.Println("完成后按回车继续...")
    fmt.Scanln(new(string))
}

phoneAgent := agent.NewPhoneAgent(config, &agent.AgentConfig{}, confirmationCallback, takeoverCallback)
```

### 步进模式

单步执行，观察每一步的决策过程：

```go
// 执行第一步
result := phoneAgent.Step("打开微信")
fmt.Printf("思考: %s\n动作: %v\n", result.Thinking, result.Action)

// 继续执行
result = phoneAgent.Step("")
```

## 项目结构

```
go-phone-agent/
├── cmd/main.go          # 命令行入口
├── agent/               # Agent 核心逻辑
├── adb/                 # ADB 操作封装
├── model/               # 模型客户端
├── actions/             # 动作处理器
├── config/              # 配置文件
└── examples/            # 使用示例
```

代码结构清晰，易于扩展和定制。

## 总结

Go Phone Agent 将视觉理解能力和手机自动化完美结合：

* ✅ **智能**：基于视觉模型，真正"看"懂屏幕
* ✅ **轻量**：Go 实现，低资源占用
* ✅ **易用**：自然语言指令，无需编程
* ✅ **灵活**：支持多设备、自定义回调
* ✅ **独立**：可在手机上独立运行

无论是自动化测试、批量操作，还是辅助特殊需求，都很实用。

## 相关链接

* 项目地址：https://github.com/zyhahaha/go-phone-agent
* 欢迎提交 issue 和 PR，一起把这个工具做得更好

---

如果有更好的视觉模型推荐，或者想分享使用心得，欢迎交流。

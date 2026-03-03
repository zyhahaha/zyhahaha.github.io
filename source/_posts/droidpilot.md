---
title: DroidPilot - 用 TypeScript 重构手机自动化智能体
date: 2025-03-03 22:30:00
categories:
  - AI应用
tags:
  - TypeScript
  - LangChain
  - Electron
  - 手机自动化
---

最近将之前的 Go Phone Agent 项目用 TypeScript 完整重构了，项目更名为 **DroidPilot**。主要原因很简单：**LangChain 不支持 Go**——它是一个 AI Agent 框架，官方只支持 Python 和 JavaScript。

LangChain 提供了成熟的 Agent 开发框架：
- **工具系统**：标准化的工具定义和调用机制
- **消息管理**：规范化的对话历史处理
- **错误处理**：内置的重试和异常处理机制
- **可扩展性**：丰富的插件和集成生态

相比之下，Go 语言没有类似的成熟框架，需要从零实现这些功能，维护成本高且容易出错。

## 核心改进

### 1. LangChain.js 集成

使用 LangChain.js 重构了 Agent 核心逻辑：

- **工具调用（Tools）**：将 ADB 操作封装为标准 LangChain Tools
  - `ScreenCaptureTool` - 截取屏幕
  - `TapTool` - 点击操作
  - `SwipeTool` - 滑动手势
  - `TypeTextTool` - 文本输入
  - `NavigationTool` - 导航按键
  - `WaitTool` - 等待延迟
  - ...

- **消息管理**：LangChain 的消息系统让对话历史管理更规范
- **结构化输出**：使用 Zod 定义工具参数，类型安全

### 2. Skills 系统

引入了 **技能（Skills）** 的概念，支持特定场景的优化脚本：

```yaml
---
name: clash-of-clans-battle
description: 《部落冲突》自动战斗脚本
---
```

采用**渐进式披露**机制：
- **Level 1**：只加载元数据（~100 tokens）
- **Level 2**：按需加载完整 SKILL.md
- **Level 3**：按需读取资源文件

这样既节省 token，又保证了灵活性。AI 会先检查是否有匹配的技能，再决定是否加载详细指令。

### 3. 桌面端支持

加入了 Electron 桌面端，方便调试和可视化操作流程。

## 工作原理

整个流程依然是经典的 Agent 循环：

```
用户指令 → ADB 截图 → 视觉模型分析 → 调用工具/Skills → 执行操作 → 循环
```

现在有了 LangChain 的加持，工具调用、消息管理、错误处理都更加规范。

## 技术栈

- **LangChain.js** - Agent 框架
- **TypeScript** - 类型安全
- **Zod** - Schema 验证

## 效果演示

微信视频号链接：[待补充]

---

总体来说，用 TypeScript + LangChain 重构后，代码更清晰、扩展性更好，也有了更完善的生态系统支持。项目已开源，欢迎交流。

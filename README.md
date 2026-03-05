<p align="center">
  <img src="assets/openspec-learning-guide.png" alt="OpenSpec 中文学习指南" width="400">
</p>

<h1 align="center">OpenSpec 中文学习指南</h1>

<p align="center">
  <strong>让 AI 不再瞎写代码的规范驱动开发工具</strong>
</p>

<p align="center">
  <a href="#-快速开始">快速开始</a> •
  <a href="#-学习路线">学习路线</a> •
  <a href="#-文档目录">文档目录</a> •
  <a href="#-实战案例">实战案例</a>
</p>

---

## 🎯 这是什么？

**OpenSpec** 是一个开源的规范驱动开发工具，帮助你和 AI 助手在写代码**之前**先对齐需求。

```
没有 OpenSpec：
  你说"加个登录" → AI 写一堆代码 → 不是你要的 → 改来改去 → 💀

有 OpenSpec：
  你说"加个登录" → 先写规范文档 → 确认无误 → AI 按规范写代码 → ✅
```

**本指南** 是 OpenSpec 的完整中文教程，从入门到精通，适合中国开发者。

---

## ✨ 5 分钟体验

```bash
# 1. 安装（需要 Node.js 20.19.0+）
npm install -g @fission-ai/openspec@latest

# 2. 在项目中初始化
cd your-project
openspec init

# 3. 告诉 AI 你想做什么
/opsx:propose 添加用户登录功能

# 4. AI 会生成规范文档，你确认后
/opsx:apply

# 5. 完成后归档
/opsx:archive
```

---

## 📚 学习路线

```
┌─────────────────────────────────────────────────────────────────┐
│                        学习路线图                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   入门篇（1-2 天）                                               │
│   ├── 00-快速开始.md      → 5 分钟体验                          │
│   ├── 01-为什么需要OpenSpec → 痛点 + 解决方案                    │
│   ├── 02-核心概念.md      → Specs/Changes/Deltas 图解           │
│   ├── 03-安装配置.md      → 详细安装步骤                        │
│   └── 04-基础工作流.md    → propose → apply → archive           │
│                                                                 │
│   进阶篇（2-3 天）                                               │
│   ├── 05-项目配置详解.md  → config.yaml 深入                    │
│   ├── 06-多语言支持.md    → 中文/日文配置                       │
│   ├── 07-Profile系统.md   → core vs custom                      │
│   ├── 08-全局配置.md      → 跨项目共享                          │
│   └── 09-避坑指南.md      → 常见错误 + 解决方案                  │
│                                                                 │
│   高级篇（3-5 天）                                               │
│   ├── 10-自定义Schema.md  → 创建自己的工作流 ⭐                 │
│   ├── 11-Artifact依赖图.md → DAG 原理 + 拓扑排序 ⭐             │
│   ├── 12-模板系统.md      → 自定义模板                          │
│   ├── 13-AI工具适配器.md  → 多工具支持原理 ⭐                   │
│   ├── 14-Shell补全系统.md → bash/zsh/fish/pwsh                 │
│   └── 15-多变更并行.md    → 高效工作流                          │
│                                                                 │
│   原理篇（可选）                                                 │
│   ├── 16-源码架构.md      → 目录结构 + 模块职责                  │
│   ├── 17-核心模块解析.md  → artifact-graph 等                   │
│   └── ...                                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📖 文档目录

### 入门篇

| 文档 | 内容 | 预计时间 |
|------|------|---------|
| [00-快速开始](docs/00-快速开始.md) | 5 分钟体验 OpenSpec | 5 分钟 |
| [01-为什么需要OpenSpec](docs/01-为什么需要OpenSpec.md) | 痛点分析 + 解决方案 | 10 分钟 |
| [02-核心概念](docs/02-核心概念.md) | Specs/Changes/Deltas/Artifacts/Schemas | 20 分钟 |
| [03-安装配置](docs/03-安装配置.md) | 详细安装步骤 | 5 分钟 |
| [04-基础工作流](docs/04-基础工作流.md) | propose → apply → archive | 15 分钟 |

### 进阶篇

| 文档 | 内容 | 预计时间 |
|------|------|---------|
| [05-项目配置详解](docs/05-项目配置详解.md) | config.yaml、context、rules | 15 分钟 |
| [06-多语言支持](docs/06-多语言支持.md) | 中文/日文配置 | 10 分钟 |
| [07-Profile系统](docs/07-Profile系统.md) | core vs custom | 10 分钟 |
| [08-全局配置](docs/08-全局配置.md) | 跨项目共享 | 10 分钟 |
| [09-避坑指南](docs/09-避坑指南.md) | 常见错误 + 解决方案 | 15 分钟 |

### 高级篇

| 文档 | 内容 | 预计时间 |
|------|------|---------|
| [10-自定义Schema](docs/10-自定义Schema.md) | 创建自己的工作流 ⭐ | 30 分钟 |
| [11-Artifact依赖图](docs/11-Artifact依赖图.md) | DAG 原理 + 拓扑排序 ⭐ | 30 分钟 |
| [12-模板系统](docs/12-模板系统.md) | 自定义模板 | 20 分钟 |
| [13-AI工具适配器](docs/13-AI工具适配器.md) | 多工具支持原理 ⭐ | 25 分钟 |
| [14-Shell补全系统](docs/14-Shell补全系统.md) | bash/zsh/fish/pwsh | 15 分钟 |
| [15-多变更并行](docs/15-多变更并行.md) | 高效工作流 | 15 分钟 |

---

## 🛠️ 实战案例

| 案例 | 难度 | 内容 |
|------|------|------|
| [Hello OpenSpec](examples/01-hello-openspec/) | ⭐ | 最简单的入门案例 |
| [Todo 应用](examples/02-todo-app/) | ⭐⭐ | 完整的 CRUD 应用 |
| [自定义 Schema](examples/03-custom-schema/) | ⭐⭐⭐ | 企业级工作流定制 |

---

## 📝 练习题

| 练习 | 难度 | 内容 |
|------|------|------|
| [基础练习](exercises/01-基础练习/) | ⭐ | 创建变更、基础工作流 |
| [进阶练习](exercises/02-进阶练习/) | ⭐⭐ | 项目配置、多语言 |
| [高级挑战](exercises/03-高级挑战/) | ⭐⭐⭐ | 自定义 Schema、贡献代码 |

---

## 🌟 核心亮点

```
┌─────────────────────────────────────────────────────────────────┐
│                    OpenSpec 核心亮点                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1️⃣ 增量式规范（Delta Specs）                                   │
│     只写"变化"的部分，不用重写整个规范                           │
│                                                                 │
│  2️⃣ 流体式工作流                                                │
│     随时可以回到任何一步，不死板                                  │
│                                                                 │
│  3️⃣ 支持 20+ AI 工具                                            │
│     Claude Code、Cursor、Windsurf、Copilot...                    │
│                                                                 │
│  4️⃣ 可自定义 Schema                                             │
│     创建适合自己团队的工作流                                      │
│                                                                 │
│  5️⃣ 开源免费                                                    │
│     MIT 协议，活跃维护                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🤔 适合谁？

| 人群 | 是否适合 | 原因 |
|------|---------|------|
| AI 编程新手 | ✅ 强烈推荐 | 避免 AI 写出不符合预期的代码 |
| 有经验的开发者 | ✅ 推荐 | 提高团队协作效率，减少返工 |
| 团队/企业 | ✅ 推荐 | 统一规范，方便代码审查 |
| 只写简单脚本 | ⚠️ 可选 | 简单修改可能不需要 |

---

## 📦 项目结构

```
openspec-learning-guide/
├── README.md              # 你正在看的文件
├── docs/                  # 文档
│   ├── 00-快速开始.md
│   ├── 01-为什么需要OpenSpec.md
│   └── ...
├── examples/              # 实战案例
│   ├── 01-hello-openspec/
│   ├── 02-todo-app/
│   └── 03-custom-schema/
├── exercises/             # 练习题
│   ├── 01-基础练习/
│   ├── 02-进阶练习/
│   └── 03-高级挑战/
└── assets/                # 图片素材
```

---

## 🔗 相关链接

- [OpenSpec 官方仓库](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec 官方文档](https://github.com/Fission-AI/OpenSpec/tree/main/docs)
- [Discord 社区](https://discord.gg/YctCnvvshC)

---

## 📄 许可证

本指南采用 [MIT](LICENSE) 协议开源。

---

## 🙏 致谢

感谢 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 团队创造了这么棒的工具！

---

<p align="center">
  <strong>觉得有用？给个 ⭐ Star 支持一下！</strong>
</p>

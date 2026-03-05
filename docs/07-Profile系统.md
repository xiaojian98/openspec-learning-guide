# 07 - Profile 系统

> core vs custom：选择适合你的工作流

## 什么是 Profile？

Profile 是 OpenSpec 的"功能包"，决定了你会获得哪些斜杠命令。

```
┌─────────────────────────────────────────────────────────────────┐
│                      Profile 对比                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   core（默认）              custom（自定义）                     │
│   ┌─────────────────┐      ┌─────────────────────────┐        │
│   │ • propose       │      │ • propose               │        │
│   │ • explore       │      │ • explore               │        │
│   │ • apply         │      │ • apply                 │        │
│   │ • archive       │      │ • archive               │        │
│   └─────────────────┘      │ • new        ←──────────┤        │
│                            │ • continue   ←  额外命令  │        │
│   4 个命令                  │ • ff         ←──────────┤        │
│   适合：快速上手             │ • verify     ←──────────┤        │
│                            │ • sync       ←──────────┤        │
│                            │ • bulk-archive←──────────┤        │
│                            │ • onboard    ←──────────┤        │
│                            └─────────────────────────┘        │
│                                                                 │
│                            11 个命令                            │
│                            适合：高级用户                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Profile（默认）

### 包含的命令

| 命令 | 用途 |
|------|------|
| `/opsx:propose` | 创建变更提案 |
| `/opsx:explore` | 思考模式 |
| `/opsx:apply` | 实现任务 |
| `/opsx:archive` | 归档变更 |

### 适合人群

- 新用户
- 想要简单体验的用户
- 不需要高级功能的团队

---

## Custom Profile（自定义）

### 切换方式

```bash
# 查看当前配置
openspec config list

# 选择 profile
openspec config profile

# 或直接设置
openspec config profile custom
```

### 额外包含的命令

| 命令 | 用途 |
|------|------|
| `/opsx:new` | 仅创建变更目录（不生成 artifacts） |
| `/opsx:continue` | 创建下一个 artifact |
| `/opsx:ff` | 快速创建所有 artifacts |
| `/opsx:verify` | 验证实现与 specs 是否一致 |
| `/opsx:sync` | 同步 delta specs 到主 specs |
| `/opsx:bulk-archive` | 批量归档多个变更 |
| `/opsx:onboard` | 引导式端到端演示 |

### 适合人群

- 高级用户
- 需要精细控制的团队
- 有复杂工作流的项目

---

## 切换 Profile 后的操作

切换 profile 后，需要更新项目的 AI 指令文件：

```bash
openspec update
```

这会重新生成 `.claude/` 目录中的文件。

---

## 下一步

→ [08-全局配置](08-全局配置.md)：跨项目共享配置

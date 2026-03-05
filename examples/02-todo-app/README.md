# Todo 应用案例

> 从零到一的完整 OpenSpec 工作流演示

---

## 案例概述

本案例演示如何使用 OpenSpec 从零开发一个完整的 Todo 应用。

**你将学到**：
- 如何用 OpenSpec 管理真实项目
- Delta Specs 的实际应用
- 多变更并行处理
- 从提案到归档的完整流程

---

## 项目结构

```
02-todo-app/
├── README.md                    # 本文件
├── before/                      # 初始项目（空项目）
│   └── package.json
├── after/                       # 完成后的代码
│   └── src/
│       ├── index.ts
│       ├── todo.ts
│       └── storage.ts
└── openspec/                    # OpenSpec 变更记录
    ├── config.yaml
    ├── specs/
    │   └── todo/
    │       └── spec.md
    └── changes/
        ├── add-todo-feature/    # 变更记录
        │   ├── proposal.md
        │   ├── specs/
        │   │   └── todo/
        │   │       └── spec.md
        │   ├── design.md
        │   └── tasks.md
        └── archive/             # 归档的变更
```

---

## 工作流演示

### 步骤 1：初始化项目

```bash
# 创建项目
mkdir todo-app && cd todo-app
npm init -y

# 初始化 OpenSpec
openspec init
```

### 步骤 2：配置中文

编辑 `openspec/config.yaml`：

```yaml
schema: spec-driven

context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。

  技术栈: TypeScript + Node.js
```

### 步骤 3：创建变更

在 Claude Code 中：

```
/opsx:propose 添加 Todo 管理功能
```

这将创建：
- `proposal.md` - 描述要做什么
- `specs/todo/spec.md` - 功能规范
- `design.md` - 技术设计
- `tasks.md` - 实现步骤

### 步骤 4：实现变更

```
/opsx:apply
```

Claude Code 会：
1. 读取所有 artifacts
2. 按顺序实现每个 task
3. 更新 tasks.md 标记完成

### 步骤 5：归档变更

```
/opsx:archive
```

---

## Delta Specs 示例

### 变更前（主 Spec）

```markdown
# Todo Capability Specification

## Purpose
管理个人待办事项。

## Requirements

### Requirement: 项目初始化
系统 SHALL 支持初始化一个空的 Todo 列表。
```

### Delta Spec（add-todo-feature）

```markdown
# Todo Capability Specification

## ADDED Requirements

### Requirement: 添加任务
用户 SHALL 能够添加新的待办事项。

#### Scenario: 添加新任务
- **GIVEN** 用户有一个 Todo 列表
- **WHEN** 用户添加任务 "买牛奶"
- **THEN** 列表中包含 "买牛奶"
- **AND** 任务状态为 "未完成"

### Requirement: 完成任务
用户 SHALL 能够标记任务为已完成。

#### Scenario: 标记任务完成
- **GIVEN** 列表中有任务 "买牛奶"
- **WHEN** 用户将其标记为完成
- **THEN** 任务状态变为 "已完成"

### Requirement: 删除任务
用户 SHALL 能够删除任务。

#### Scenario: 删除任务
- **GIVEN** 列表中有任务 "买牛奶"
- **WHEN** 用户删除该任务
- **THEN** 列表中不再包含 "买牛奶"
```

### 归档后（合并的主 Spec）

```markdown
# Todo Capability Specification

## Purpose
管理个人待办事项。

## Requirements

### Requirement: 项目初始化
系统 SHALL 支持初始化一个空的 Todo 列表。

### Requirement: 添加任务
用户 SHALL 能够添加新的待办事项。

#### Scenario: 添加新任务
- **GIVEN** 用户有一个 Todo 列表
- **WHEN** 用户添加任务 "买牛奶"
- **THEN** 列表中包含 "买牛奶"
- **AND** 任务状态为 "未完成"

### Requirement: 完成任务
用户 SHALL 能够标记任务为已完成。

#### Scenario: 标记任务完成
- **GIVEN** 列表中有任务 "买牛奶"
- **WHEN** 用户将其标记为完成
- **THEN** 任务状态变为 "已完成"

### Requirement: 删除任务
用户 SHALL 能够删除任务。

#### Scenario: 删除任务
- **GIVEN** 列表中有任务 "买牛奶"
- **WHEN** 用户删除该任务
- **THEN** 列表中不再包含 "买牛奶"
```

---

## 关键学习点

### 1. Delta 的作用

```
┌─────────────────────────────────────────────────────────┐
│                    Delta 工作流                          │
└─────────────────────────────────────────────────────────┘

   主 Spec                Delta Spec              归档后
   ═════════              ══════════              ═══════
   ┌─────────┐            ┌─────────┐            ┌─────────┐
   │ Req A   │            │ ADDED   │            │ Req A   │
   │ Req B   │  ───────▶  │  Req C  │  ───────▶  │ Req B   │
   │         │            │  Req D  │            │ Req C   │
   └─────────┘            └─────────┘            │ Req D   │
                                                 └─────────┘

   Delta 只描述"变更"部分，归档时自动合并
```

### 2. 多变更并行

```
┌─────────────────────────────────────────────────────────┐
│                   并行处理多个变更                        │
└─────────────────────────────────────────────────────────┘

   时间线
   ══════
   │
   │  /opsx:propose 添加登录功能
   │  /opsx:propose 添加导出功能
   │
   ├─────────────────────────────────────────────────
   │
   │  Changes:
   │    add-login (in-progress)
   │    add-export (in-progress)
   │
   ├─────────────────────────────────────────────────
   │
   │  /opsx:apply add-login
   │  /opsx:archive add-login
   │
   ├─────────────────────────────────────────────────
   │
   │  /opsx:apply add-export
   │  /opsx:archive add-export
   │
   ▼
```

### 3. 任务追踪

`tasks.md` 记录实现进度：

```markdown
## Tasks

- [x] 创建 Todo 类型定义
- [x] 实现 TodoList 类
- [x] 添加 add() 方法
- [x] 添加 complete() 方法
- [x] 添加 delete() 方法
- [x] 实现本地存储
- [x] 添加 CLI 入口
- [x] 编写测试
```

---

## 自己尝试

1. 复制 `before/` 目录到新位置
2. 运行 `openspec init`
3. 按照上述步骤操作
4. 对比你的结果和 `after/` 目录

---

## 常见问题

### Q: Delta 和主 Spec 有冲突怎么办？

A: 使用 `MODIFIED` 和 `REMOVED` 部分：

```markdown
## MODIFIED Requirements

### Requirement: 添加任务
~原有描述被修改~

## REMOVED Requirements

### Requirement: 旧功能
~被删除~
```

### Q: 如何处理复杂变更？

A: 拆分成多个小变更：
- `add-todo-basic` - 基础 CRUD
- `add-todo-storage` - 持久化
- `add-todo-cli` - 命令行界面

---

## 下一步

完成本案例后，继续学习 [自定义 Schema 案例](../03-custom-schema/)。

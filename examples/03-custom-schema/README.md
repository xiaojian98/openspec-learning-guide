# 自定义 Schema 案例

> 创建适合你团队的工作流

---

## 案例概述

本案例演示如何创建自定义 Schema 来适应不同的开发场景。

**你将学到**：
- 如何 Fork 和修改 Schema
- 如何设计 Artifact 依赖关系
- 不同工作流的适用场景

---

## Schema 1：安全审查优先 (security-first)

### 适用场景

- 金融/支付系统
- 用户数据处理
- API 开发
- 合规要求高的项目

### 工作流

```
┌─────────────────────────────────────────────────────────┐
│              security-first 工作流                       │
└─────────────────────────────────────────────────────────┘

   proposal
       │
       ▼
   security-review  ◀── 安全审查必须先于设计
       │
       ▼
   specs
       │
       ▼
   design
       │
       ▼
   tasks
       │
       ▼
   [implementation]
```

### 关键特点

1. **安全审查是强制步骤**：在写 Specs 之前必须完成安全审查
2. **结构化的安全评估**：使用模板确保覆盖所有安全方面
3. **风险评估表**：量化风险等级和缓解措施

### 文件结构

```
openspec/schemas/security-first/
├── schema.yaml           # Schema 定义
└── templates/
    ├── proposal.md
    ├── security-review.md  # 安全审查模板
    ├── spec.md
    ├── design.md
    └── tasks.md
```

---

## Schema 2：快速原型 (quick-prototype)

### 适用场景

- POC (Proof of Concept)
- 黑客马拉松
- 快速验证想法
- 内部工具开发

### 工作流

```
┌─────────────────────────────────────────────────────────┐
│              quick-prototype 工作流                      │
└─────────────────────────────────────────────────────────┘

   idea
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
   prototype      demo-flow     tech-notes
       │              │              │
       └──────────────┴──────────────┘
                      │
                      ▼
              [implementation]
```

### 关键特点

1. **并行 Artifacts**：三个文档可以同时创建
2. **轻量级**：没有复杂的依赖关系
3. **实用导向**：关注可运行的原型而非完整文档

### 文件结构

```
openspec/schemas/quick-prototype/
├── schema.yaml           # Schema 定义
└── templates/
    ├── idea.md            # 核心想法
    ├── prototype.md       # 原型代码说明
    ├── demo-flow.md       # 演示流程
    └── tech-notes.md      # 技术笔记
```

---

## 两种 Schema 对比

| 特性 | security-first | quick-prototype |
|------|----------------|-----------------|
| 适用阶段 | 正式开发 | 早期探索 |
| 文档量 | 多（5个artifacts） | 少（4个artifacts） |
| 依赖关系 | 严格线性 | 并行友好 |
| 审查重点 | 安全合规 | 快速验证 |
| 团队规模 | 适合大团队 | 适合小团队/个人 |

---

## 如何使用

### 创建 security-first Schema

```bash
# Fork 默认 schema
openspec schema fork spec-driven security-first

# 编辑 schema.yaml
# （参见本目录下的示例文件）

# 验证 schema
openspec schema validate security-first

# 使用 schema 创建变更
openspec new change add-payment --schema security-first
```

### 创建 quick-prototype Schema

```bash
# 创建新 schema
openspec schema new quick-prototype

# 编辑 schema.yaml
# （参见本目录下的示例文件）

# 验证 schema
openspec schema validate quick-prototype

# 使用 schema 创建变更
openspec new change test-ai-feature --schema quick-prototype
```

---

## 自己尝试

1. 复制本目录下的 schema 文件到你的项目
2. 运行 `openspec schema validate <schema-name>` 验证
3. 使用自定义 schema 创建一个变更
4. 体验不同的工作流

---

## 设计你自己的 Schema

### 步骤 1：识别需求

问自己：
- 团队需要哪些文档？
- 哪些步骤是必须的？
- 哪些可以并行？

### 步骤 2：定义 Artifacts

```yaml
artifacts:
  - id: my-artifact
    generates: my-artifact.md
    template: my-artifact.md
    requires: [other-artifact]  # 依赖
    instruction: |
      创建这个 artifact 时应该做什么...
```

### 步骤 3：定义 Apply 条件

```yaml
apply:
  requires: [artifact1, artifact2]  # 实现前必须完成
  tracks: tasks.md                   # 追踪进度的文件
```

### 步骤 4：验证和迭代

```bash
# 验证 schema 结构
openspec schema validate my-schema

# 实际使用测试
openspec new change test-my-schema --schema my-schema
```

---

## 最佳实践

1. **从默认 schema 开始**：先 Fork 再修改
2. **保持简单**：不要创建太多 artifacts
3. **明确依赖**：确保依赖关系形成 DAG（有向无环图）
4. **写好 instruction**：帮助 AI 理解每个 artifact 的目的
5. **迭代改进**：根据使用反馈调整 schema

---

## 下一步

完成本案例后，你可以：
- 为你的团队设计专属 Schema
- 提交到 OpenSpec 社区分享
- 阅读更多 [Schema 自定义文档](../../docs/10-自定义Schema.md)

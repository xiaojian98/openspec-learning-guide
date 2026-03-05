# 10 - 自定义 Schema

> 创建适合自己团队的工作流

## 什么是 Schema？

Schema 定义了：
1. 有哪些 Artifacts（产物）
2. Artifacts 之间的依赖关系
3. 每个 Artifact 的生成规则

```
┌─────────────────────────────────────────────────────────────────┐
│                    Schema 结构                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   schema.yaml                   templates/                      │
│   ┌─────────────────┐          ┌─────────────────┐             │
│   │ name: my-flow   │          │ proposal.md     │             │
│   │ version: 1      │          │ design.md       │             │
│   │                 │◄────────►│ tasks.md        │             │
│   │ artifacts:      │          │ spec.md         │             │
│   │   - proposal    │          └─────────────────┘             │
│   │   - design      │                                          │
│   │   - tasks       │                                          │
│   └─────────────────┘                                          │
│                                                                 │
│   定义"有什么"和"怎么依赖"     定义"长什么样"                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 快速开始：Fork 现有 Schema

```bash
# Fork 默认的 spec-driven Schema
openspec schema fork spec-driven my-workflow
```

这会在你的项目中创建：

```
openspec/schemas/my-workflow/
├── schema.yaml           # Schema 定义
└── templates/
    ├── proposal.md       # proposal 模板
    ├── spec.md           # specs 模板
    ├── design.md         # design 模板
    └── tasks.md          # tasks 模板
```

现在你可以编辑这些文件来自定义工作流。

---

## Schema YAML 结构

```yaml
# openspec/schemas/my-workflow/schema.yaml

name: my-workflow
version: 1
description: 我团队的自定义工作流

artifacts:
  # Artifact 1: 提案
  - id: proposal
    generates: proposal.md
    description: 变更提案
    template: proposal.md
    instruction: |
      创建变更提案，说明：
      - 为什么要做
      - 做什么
      - 影响范围
    requires: []  # 无依赖，可以第一个创建

  # Artifact 2: 安全审查（新增！）
  - id: security-review
    generates: security-review.md
    description: 安全审查报告
    template: security-review.md
    instruction: |
      评估变更的安全影响：
      - 认证授权
      - 数据安全
      - API 安全
    requires:
      - proposal  # 依赖 proposal

  # Artifact 3: 规范
  - id: specs
    generates: specs/**/*.md
    description: 功能规范
    template: spec.md
    requires:
      - proposal
      - security-review  # 现在依赖安全审查

  # Artifact 4: 设计
  - id: design
    generates: design.md
    description: 技术设计
    template: design.md
    requires:
      - proposal

  # Artifact 5: 任务
  - id: tasks
    generates: tasks.md
    description: 任务清单
    template: tasks.md
    requires:
      - specs
      - design

# apply 阶段配置
apply:
  requires: [tasks]
  tracks: tasks.md
```

---

## Artifact 字段详解

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 唯一标识符 |
| `generates` | ✅ | 输出路径（支持 glob） |
| `description` | ❌ | 描述 |
| `template` | ✅ | 模板文件路径 |
| `instruction` | ❌ | AI 指令 |
| `requires` | ❌ | 依赖的 artifact id 列表 |

---

## 创建模板文件

模板是 Markdown 文件，指导 AI 如何生成内容：

```markdown
<!-- templates/security-review.md -->

# 安全审查报告

## 审查范围
<!-- 列出需要审查的功能点 -->

## 认证授权
<!-- 评估认证授权相关风险 -->

## 数据安全
<!-- 评估数据处理相关风险 -->

## API 安全
<!-- 评估 API 相关风险 -->

## 风险评估

| 风险项 | 等级 | 缓解措施 |
|--------|------|---------|
| <!-- 自动填充 --> | | |

## 结论
<!-- 安全审查结论 -->
```

**模板技巧：**
- 使用 HTML 注释 `<!-- -->` 指导 AI
- 使用表格结构让 AI 填充
- 保持简洁，不要过度约束

---

## 完整示例：企业安全工作流

### 目录结构

```
openspec/schemas/enterprise-security/
├── schema.yaml
└── templates/
    ├── proposal.md
    ├── security-review.md
    ├── compliance-check.md
    ├── spec.md
    ├── design.md
    └── tasks.md
```

### Schema 定义

```yaml
name: enterprise-security
version: 1
description: 企业级安全合规工作流

artifacts:
  - id: proposal
    generates: proposal.md
    template: proposal.md
    requires: []

  - id: security-review
    generates: security-review.md
    template: security-review.md
    instruction: |
      创建安全审查报告，包括：
      - OWASP Top 10 检查
      - 认证授权评估
      - 数据加密检查
      - API 安全评估
    requires: [proposal]

  - id: compliance-check
    generates: compliance-check.md
    template: compliance-check.md
    instruction: |
      创建合规检查报告，包括：
      - GDPR 合规性
      - SOC 2 要求
      - 行业特定合规（如 HIPAA、PCI-DSS）
    requires: [proposal]

  - id: specs
    generates: specs/**/*.md
    template: spec.md
    requires: [proposal, security-review, compliance-check]

  - id: design
    generates: design.md
    template: design.md
    requires: [specs]

  - id: tasks
    generates: tasks.md
    template: tasks.md
    requires: [design]

apply:
  requires: [tasks]
  tracks: tasks.md
  instruction: |
    实现时注意：
    - 每个 PR 必须通过安全扫描
    - 敏感代码需要额外的代码审查
```

### 依赖图

```
         proposal
            │
     ┌──────┴──────┐
     ▼             ▼
security-review  compliance-check
     │             │
     └──────┬──────┘
            ▼
          specs
            │
            ▼
          design
            │
            ▼
          tasks
```

---

## 验证 Schema

```bash
# 验证 Schema 结构
openspec schema validate my-workflow

# 查看解析路径
openspec schema which my-workflow

# 测试使用
openspec new change test --schema my-workflow
```

---

## 使用自定义 Schema

### 方式一：命令行指定

```bash
openspec new change my-feature --schema my-workflow
```

### 方式二：项目默认

```yaml
# openspec/config.yaml
schema: my-workflow
```

---

## 下一步

→ [11-Artifact依赖图](11-Artifact依赖图.md)：深入理解 DAG 和拓扑排序

# 高级挑战

> 深入理解和扩展 OpenSpec

---

## 挑战 1：创建自定义 Schema ⭐⭐⭐

### 要求

创建一个"安全审查优先"的 Schema，包含以下 Artifacts：

1. `proposal` - 提案
2. `security-review` - 安全审查
3. `specs` - 规范（依赖 security-review）
4. `design` - 设计
5. `tasks` - 任务

### 验证标准

- Schema 验证通过
- 使用 Schema 创建变更，确认依赖关系正确

### 提示

1. Fork 默认 Schema：`openspec schema fork spec-driven security-first`
2. 编辑 `schema.yaml` 添加 `security-review` artifact
3. 创建 `templates/security-review.md`
4. 验证：`openspec schema validate security-first`

### 参考答案

<details>
<summary>点击查看</summary>

```yaml
# openspec/schemas/security-first/schema.yaml

name: security-first
version: 1
description: 安全审查优先的工作流

artifacts:
  - id: proposal
    generates: proposal.md
    template: proposal.md
    requires: []

  - id: security-review
    generates: security-review.md
    template: security-review.md
    instruction: |
      创建安全审查报告，评估：
      - 认证授权
      - 数据安全
      - API 安全
      - 潜在风险
    requires: [proposal]

  - id: specs
    generates: specs/**/*.md
    template: spec.md
    requires: [proposal, security-review]

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
```

```markdown
<!-- templates/security-review.md -->

# 安全审查报告

## 审查范围
<!-- 描述本次变更的安全审查范围 -->

## 认证授权
<!-- 评估认证授权相关风险 -->

## 数据安全
<!-- 评估数据安全相关风险 -->

## API 安全
<!-- 评估 API 安全相关风险 -->

## 风险评估

| 风险项 | 等级 | 缓解措施 |
|--------|------|---------|
| <!-- 填充 --> | | |

## 结论
<!-- 安全审查结论 -->
```

```bash
# 验证
openspec schema validate security-first

# 使用
openspec new change test-security --schema security-first
```

</details>

---

## 挑战 2：添加新 AI 工具适配器 ⭐⭐⭐⭐

### 要求

为一个假想的 AI 工具 "MyAI" 创建适配器。

### 验证标准

- 适配器正确实现接口
- 测试通过

### 提示

1. 创建 `src/core/command-generation/adapters/my-ai.ts`
2. 实现 `ToolCommandAdapter` 接口
3. 注册到 `adapters/index.ts`
4. 添加到 `config.ts` 的 `AI_TOOLS`

### 参考答案

<details>
<summary>点击查看</summary>

```typescript
// src/core/command-generation/adapters/my-ai.ts

import type { ToolCommandAdapter, CommandContent } from '../types.js';

export const myAiAdapter: ToolCommandAdapter = {
  toolId: 'my-ai',

  getFilePath(commandId: string): string {
    // MyAI 使用 .myai/rules/ 目录
    return `.myai/rules/openspec-${commandId}.md`;
  },

  formatFile(content: CommandContent): string {
    // MyAI 使用简单的 Markdown 格式
    return `# ${content.name}

${content.description}

---

${content.body}`;
  }
};
```

```typescript
// src/core/command-generation/adapters/index.ts

import { myAiAdapter } from './my-ai.js';

export const adapters: Record<string, ToolCommandAdapter> = {
  // ...existing adapters
  'my-ai': myAiAdapter,
};
```

```typescript
// src/core/config.ts

export const AI_TOOLS: AIToolOption[] = [
  // ...existing tools
  {
    value: 'my-ai',
    name: 'My AI',
    skillsDir: '.myai/skills',
    commandsDir: '.myai/rules',
  },
];
```

</details>

---

## 挑战 3：理解并修改 ArtifactGraph ⭐⭐⭐⭐⭐

### 要求

1. 阅读 `src/core/artifact-graph/graph.ts` 源码
2. 添加一个新方法 `getCriticalPath()`，返回最长依赖路径

### 验证标准

- 方法正确实现
- 测试通过

### 提示

使用深度优先搜索（DFS）计算最长路径。

### 参考答案

<details>
<summary>点击查看</summary>

```typescript
// src/core/artifact-graph/graph.ts

/**
 * 获取关键路径（最长依赖路径）
 * 用于估算完成变更所需的最少步骤
 */
getCriticalPath(): string[] {
  const memo = new Map<string, string[]>();

  const dfs = (id: string): string[] => {
    if (memo.has(id)) {
      return memo.get(id)!;
    }

    const artifact = this.artifacts.get(id);
    if (!artifact || artifact.requires.length === 0) {
      memo.set(id, [id]);
      return [id];
    }

    let longestPath: string[] = [];
    for (const dep of artifact.requires) {
      const path = dfs(dep);
      if (path.length > longestPath.length) {
        longestPath = path;
      }
    }

    const result = [...longestPath, id];
    memo.set(id, result);
    return result;
  };

  // 找到所有终点（没有依赖者的节点）
  const allDeps = new Set<string>();
  for (const artifact of this.artifacts.values()) {
    for (const dep of artifact.requires) {
      allDeps.add(dep);
    }
  }

  const endpoints = [...this.artifacts.keys()].filter(
    id => !allDeps.has(id)
  );

  // 找最长路径
  let criticalPath: string[] = [];
  for (const endpoint of endpoints) {
    const path = dfs(endpoint);
    if (path.length > criticalPath.length) {
      criticalPath = path;
    }
  }

  return criticalPath;
}
```

```typescript
// test/core/artifact-graph/graph.test.ts

describe('getCriticalPath', () => {
  it('should return the longest dependency path', () => {
    const graph = ArtifactGraph.fromYamlContent(`
      name: test
      version: 1
      artifacts:
        - id: a
          generates: a.md
          template: a.md
          requires: []
        - id: b
          generates: b.md
          template: b.md
          requires: [a]
        - id: c
          generates: c.md
          template: c.md
          requires: [a]
        - id: d
          generates: d.md
          template: d.md
          requires: [b, c]
    `);

    const path = graph.getCriticalPath();
    // 最长路径可能是 a → b → d 或 a → c → d
    expect(path.length).toBe(3);
    expect(path[0]).toBe('a');
    expect(path[2]).toBe('d');
  });
});
```

</details>

---

## 完成挑战后

恭喜你完成了所有练习！

如果你理解了这些内容，你已经可以：
- 自定义 OpenSpec 工作流
- 添加新的 AI 工具支持
- 理解并修改核心代码

**下一步**：考虑为 OpenSpec 做贡献！
- 提交 Bug 报告
- 提交功能建议
- 提交代码 PR

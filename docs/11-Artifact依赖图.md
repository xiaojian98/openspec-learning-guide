# 11 - Artifact 依赖图

> 深入理解 DAG 和拓扑排序

## 什么是 DAG？

**DAG（Directed Acyclic Graph）** = 有向无环图

```
┌─────────────────────────────────────────────────────────────────┐
│                        DAG 示例                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              proposal                                           │
│              (入度=0)                                           │
│                 │                                               │
│         ┌───────┴───────┐                                       │
│         ▼               ▼                                       │
│       specs          design                                     │
│      (入度=1)       (入度=1)                                    │
│         │               │                                       │
│         └───────┬───────┘                                       │
│                 ▼                                               │
│               tasks                                             │
│              (入度=2)                                           │
│                                                                 │
│   特点：                                                        │
│   1. 有方向（箭头指向依赖关系）                                  │
│   2. 无环（不能 A→B→A）                                         │
│   3. 入度=入边的数量                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 为什么用 DAG？

### 1. 确定构建顺序

拓扑排序可以确定"先做什么，后做什么"：

```
proposal → specs → design → tasks
或
proposal → design → specs → tasks
```

### 2. 检测循环依赖

如果有 A→B→A 的循环，拓扑排序会失败。

### 3. 并行处理

没有依赖关系的节点可以并行：

```
specs 和 design 都只依赖 proposal
→ 可以并行创建
```

---

## Kahn 算法（OpenSpec 使用的）

### 算法步骤

```
1. 计算每个节点的入度
2. 将入度为 0 的节点加入队列
3. 当队列不为空：
   a. 取出队首节点
   b. 加入结果
   c. 将其所有邻居的入度减 1
   d. 如果邻居入度变为 0，加入队列
4. 如果结果包含所有节点，成功；否则有环
```

### 源码参考

```typescript
// src/core/artifact-graph/graph.ts

getBuildOrder(): string[] {
  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();

  // 初始化入度
  for (const artifact of this.artifacts.values()) {
    inDegree.set(artifact.id, artifact.requires.length);
    dependents.set(artifact.id, []);
  }

  // 构建反向邻接表
  for (const artifact of this.artifacts.values()) {
    for (const req of artifact.requires) {
      dependents.get(req)!.push(artifact.id);
    }
  }

  // 入度为 0 的节点入队
  const queue = [...this.artifacts.keys()]
    .filter(id => inDegree.get(id) === 0)
    .sort();

  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const newlyReady: string[] = [];
    for (const dep of dependents.get(current)!) {
      const newDegree = inDegree.get(dep)! - 1;
      inDegree.set(dep, newDegree);
      if (newDegree === 0) {
        newlyReady.push(dep);
      }
    }
    queue.push(...newlyReady.sort());
  }

  return result;
}
```

---

## Artifact 状态

| 状态 | 含义 | 触发条件 |
|------|------|---------|
| `blocked` | 不能创建 | 有未完成的依赖 |
| `ready` | 可以创建 | 所有依赖已完成 |
| `done` | 已完成 | 文件存在 |

### 状态查询

```bash
openspec status --change my-change --json
```

输出示例：

```json
{
  "artifacts": [
    { "id": "proposal", "status": "done" },
    { "id": "specs", "status": "ready" },
    { "id": "design", "status": "ready" },
    { "id": "tasks", "status": "blocked", "missingDeps": ["specs", "design"] }
  ]
}
```

---

## ArtifactGraph API

### 核心方法

| 方法 | 说明 |
|------|------|
| `getBuildOrder()` | 获取拓扑排序结果 |
| `getNextArtifacts(completed)` | 获取下一个可创建的 artifacts |
| `getBlocked(completed)` | 获取被阻塞的 artifacts |
| `isComplete(completed)` | 检查是否全部完成 |

### 使用示例

```typescript
import { ArtifactGraph } from '@fission-ai/openspec';

const graph = ArtifactGraph.fromYaml('schema.yaml');

// 获取构建顺序
const order = graph.getBuildOrder();
// ['proposal', 'design', 'specs', 'tasks']

// 获取下一个可创建的
const completed = new Set(['proposal']);
const next = graph.getNextArtifacts(completed);
// ['design', 'specs']

// 获取被阻塞的
const blocked = graph.getBlocked(completed);
// { tasks: ['specs', 'design'] }
```

---

## 复杂依赖图示例

### 企业安全工作流

```
              proposal
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
   security  compliance  specs
     review     check
        │        │        │
        └────────┼────────┘
                 ▼
               design
                 │
                 ▼
               tasks
```

**构建顺序可能是**：
```
proposal → specs → security-review → compliance-check → design → tasks
或
proposal → security-review → compliance-check → specs → design → tasks
```

---

## 下一步

→ [12-模板系统](12-模板系统.md)：自定义模板

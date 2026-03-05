# 技术设计

## 架构概览

```
┌─────────────────────────────────────────────────────┐
│                    CLI Layer                        │
│                   src/index.ts                       │
│              (命令解析 & 用户交互)                    │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   Storage Layer                     │
│                  src/storage.ts                      │
│           (TodoStorage extends TodoManager)          │
│              (load/save to JSON file)               │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Business Logic                     │
│                   src/todo.ts                        │
│               (TodoManager class)                    │
│            (add/complete/delete/list)               │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   Type Layer                        │
│                   src/types.ts                       │
│               (Todo interface)                       │
│             (TodoList interface)                     │
└─────────────────────────────────────────────────────┘
```

## 数据结构

### Todo 类型

```typescript
interface Todo {
  id: string;           // 唯一标识符，格式: todo-{timestamp}-{random}
  title: string;        // 任务标题
  completed: boolean;   // 是否完成
  createdAt: Date;      // 创建时间
  completedAt?: Date;   // 完成时间（可选）
}
```

### 存储格式

```json
[
  {
    "id": "todo-1709821234567-abc123",
    "title": "买牛奶",
    "completed": false,
    "createdAt": "2024-03-07T10:30:00.000Z"
  }
]
```

## 模块职责

### types.ts
- 定义 `Todo` 接口
- 定义 `TodoList` 接口
- 纯类型定义，无运行时代码

### todo.ts
- 实现 `TodoManager` 类
- 提供内存中的任务管理
- 不涉及持久化

### storage.ts
- 继承 `TodoManager`
- 添加 `load()` 和 `save()` 方法
- 使用 Node.js fs 模块操作文件

### index.ts
- 解析命令行参数
- 调用相应的 TodoStorage 方法
- 格式化输出给用户

## 命令设计

| 命令 | 参数 | 说明 |
|------|------|------|
| add | <title> | 添加新任务 |
| complete | <id> | 标记完成 |
| delete | <id> | 删除任务 |
| list | (无) | 列出所有任务 |
| help | (无) | 显示帮助 |

## 错误处理

- 任务不存在：显示错误消息，不崩溃
- 文件读写失败：显示错误，使用空列表
- 参数缺失：显示用法提示

## 测试策略

1. 单元测试：TodoManager 的各个方法
2. 集成测试：Storage 的 load/save
3. E2E 测试：CLI 命令执行

# 实现任务

## Tasks

- [x] 创建 `src/types.ts` 定义 Todo 接口
- [x] 创建 `src/todo.ts` 实现 TodoManager 类
- [x] 实现 `add()` 方法
- [x] 实现 `complete()` 方法
- [x] 实现 `delete()` 方法
- [x] 实现 `list()` 方法
- [x] 创建 `src/storage.ts` 继承 TodoManager
- [x] 实现 `load()` 方法从 JSON 加载
- [x] 实现 `save()` 方法保存到 JSON
- [x] 创建 `src/index.ts` CLI 入口
- [x] 实现 `add` 命令
- [x] 实现 `complete` 命令
- [x] 实现 `delete` 命令
- [x] 实现 `list` 命令
- [x] 实现 `help` 命令
- [x] 添加错误处理
- [x] 测试所有功能

## 实现笔记

### ID 生成策略
使用 `todo-{timestamp}-{random}` 格式确保唯一性。

### 存储位置
使用 `process.cwd()/.todo-storage.json` 存储在当前目录。

### 日期处理
JSON 序列化时 Date 会变成字符串，需要在 load 时转换回来。

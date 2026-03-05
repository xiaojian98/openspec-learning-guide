# Todo Capability Specification

## Purpose
提供一个命令行 Todo 管理工具，支持任务的创建、完成、删除和列表查看。

## ADDED Requirements

### Requirement: 添加任务
用户 SHALL 能够添加新的待办事项。

#### Scenario: 添加新任务
- **GIVEN** 用户在项目目录下
- **WHEN** 用户运行 `npm run dev add 买牛奶`
- **THEN** 系统创建新任务
- **AND** 任务标题为 "买牛奶"
- **AND** 任务状态为 "未完成"
- **AND** 系统显示成功消息

### Requirement: 完成任务
用户 SHALL 能够标记任务为已完成。

#### Scenario: 标记任务完成
- **GIVEN** 存在任务 ID 为 "todo-123"
- **WHEN** 用户运行 `npm run dev complete todo-123`
- **THEN** 任务状态变为 "已完成"
- **AND** 记录完成时间

#### Scenario: 完成不存在的任务
- **GIVEN** 不存在任务 ID 为 "todo-999"
- **WHEN** 用户运行 `npm run dev complete todo-999`
- **THEN** 系统显示错误消息
- **AND** 不修改任何任务

### Requirement: 删除任务
用户 SHALL 能够删除任务。

#### Scenario: 删除任务
- **GIVEN** 存在任务 ID 为 "todo-123"
- **WHEN** 用户运行 `npm run dev delete todo-123`
- **THEN** 任务从列表中移除
- **AND** 系统显示成功消息

### Requirement: 列出任务
用户 SHALL 能够查看所有任务。

#### Scenario: 列出所有任务
- **GIVEN** 存在多个任务
- **WHEN** 用户运行 `npm run dev list`
- **THEN** 系统显示所有任务
- **AND** 每个任务显示 ID、标题、状态和创建日期

#### Scenario: 空任务列表
- **GIVEN** 没有任何任务
- **WHEN** 用户运行 `npm run dev list`
- **THEN** 系统显示 "暂无任务"

### Requirement: 本地持久化
系统 SHALL 将任务保存到本地文件。

#### Scenario: 数据持久化
- **GIVEN** 用户添加了任务
- **WHEN** 程序退出
- **THEN** 任务数据保存到 `.todo-storage.json`

#### Scenario: 数据恢复
- **GIVEN** 存在 `.todo-storage.json` 文件
- **WHEN** 程序启动
- **THEN** 系统从文件加载任务数据

# 贡献指南

感谢你考虑为 OpenSpec 中文学习指南做出贡献！

---

## 如何贡献

### 报告问题

如果你发现文档中有错误或不清楚的地方：

1. 在 [Issues](https://github.com/xiaojian98/openspec-learning-guide/issues) 中搜索是否已有相关问题
2. 如果没有，创建新的 Issue，包含：
   - 问题描述
   - 所在文档位置
   - 建议的改进方式

### 改进文档

1. Fork 本仓库
2. 创建分支：`git checkout -b improve-docs`
3. 修改文档
4. 提交 PR

### 添加练习题

欢迎添加更多练习题！请遵循现有格式：

```markdown
## 练习 X：标题 ⭐⭐

### 要求

1. 步骤一
2. 步骤二

### 验证标准

- [ ] 标准 1
- [ ] 标准 2

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 答案代码
```

</details>
```

### 添加案例

案例应该：
- 有完整的目录结构
- 包含 `before/` 和 `after/` 代码
- 有对应的 OpenSpec 变更记录
- README 清晰说明学习目标

---

## 文档风格

### 语言

- 使用简体中文
- 技术术语可保留英文（如 Schema、Artifact、Delta）
- 代码注释使用中文

### 格式

- 使用 GFM（GitHub Flavored Markdown）
- ASCII 图表使用代码块
- 文件路径使用反引号

### 结构

每个文档应该包含：
1. 标题和简介
2. 详细内容
3. 示例（如果适用）
4. 总结或下一步

---

## 开发设置

```bash
# 克隆仓库
git clone https://github.com/your-username/openspec-learning-guide.git
cd openspec-learning-guide

# 安装 OpenSpec（如果需要在本地测试）
npm install -g openspec

# 验证案例
cd examples/02-todo-app
openspec schema validate security-first
```

---

## 代码规范

### 示例代码

- TypeScript 使用 strict mode
- 添加适当的类型注释
- 代码风格保持一致

### Schema 文件

- 使用 YAML 格式
- 包含 `name`、`version`、`description`
- 每个 Artifact 都要有 `instruction`

---

## 发布流程

1. 文档更新后，确保所有链接有效
2. 检查 Markdown 格式
3. 更新 README.md 中的目录（如果有变化）
4. 提交 PR 并等待审核

---

## 行为准则

- 尊重所有贡献者
- 建设性的反馈
- 专注于改进内容

---

## 联系方式

- Issues: [GitHub Issues](https://github.com/xiaojian98/openspec-learning-guide/issues)
- Discussions: [GitHub Discussions](https://github.com/xiaojian98/openspec-learning-guide/discussions)

---

再次感谢你的贡献！🙏

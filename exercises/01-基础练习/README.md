# 基础练习

> 巩固 OpenSpec 基础操作

---

## 练习 1：创建第一个变更 ⭐

### 要求

1. 创建一个新项目
2. 初始化 OpenSpec
3. 使用 `/opsx:propose` 添加一个 `.gitignore` 文件
4. 使用 `/opsx:apply` 实现
5. 使用 `/opsx:archive` 归档

### 验证标准

- `openspec list` 显示没有活跃变更
- `.gitignore` 文件存在
- `openspec/changes/archive/` 目录包含归档的变更

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 1. 创建项目
mkdir my-first-change && cd my-first-change
git init

# 2. 初始化 OpenSpec
openspec init

# 3. 创建变更
# 在 Claude Code 中输入：
/opsx:propose 添加 .gitignore 文件

# 4. 实现
/opsx:apply

# 5. 归档
/opsx:archive
```

</details>

---

## 练习 2：查看变更状态 ⭐

### 要求

1. 创建一个新变更（内容随意）
2. 使用 `openspec status` 查看状态
3. 只创建 proposal，不创建其他 artifacts
4. 查看哪些 artifacts 是 ready，哪些是 blocked

### 验证标准

- 理解 `ready` 和 `blocked` 状态
- 知道如何查看变更进度

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 创建变更
/opsx:propose 添加 LICENSE 文件

# 查看状态
openspec status

# 输出示例：
# Change: add-license
# Schema: spec-driven
#
# [x] proposal (done)
# [ ] specs (ready)      ← 依赖 proposal，已满足
# [ ] design (ready)     ← 依赖 proposal，已满足
# [ ] tasks (blocked)    ← 依赖 specs 和 design

# JSON 格式
openspec status --json
```

</details>

---

## 练习 3：修改 Delta Specs ⭐⭐

### 要求

1. 创建一个变更，添加"用户注册"功能
2. 查看生成的 `specs/user/spec.md`
3. 手动修改 Delta Spec，添加一个新的场景：
   - "邮箱已被注册"
4. 验证修改后的 spec

### 验证标准

- Delta Spec 格式正确
- 新场景符合 Given/When/Then 格式
- `openspec validate` 通过

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 创建变更
/opsx:propose 添加用户注册功能

# 查看 spec
cat openspec/changes/add-user-registration/specs/user/spec.md

# 编辑添加新场景
# 在 specs/user/spec.md 中添加：

#### Scenario: 邮箱已被注册
- **GIVEN** 邮箱 user@example.com 已被注册
- **WHEN** 用户使用该邮箱注册
- **THEN** 系统显示"邮箱已被注册"
- **AND** 不创建新账户

# 验证
openspec validate add-user-registration
```

</details>

---

## 练习 4：并行处理多个变更 ⭐⭐

### 要求

1. 创建两个独立的变更：
   - `add-readme`
   - `add-license`
2. 先实现 `add-license`
3. 再实现 `add-readme`
4. 分别归档

### 验证标准

- 两个变更都成功归档
- 理解如何指定变更名

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 创建两个变更
/opsx:propose 添加 README 文件
/opsx:propose 添加 LICENSE 文件

# 查看变更列表
openspec list
# 输出：
# add-readme (in-progress)
# add-license (in-progress)

# 指定变更实现
/opsx:apply add-license
/opsx:archive add-license

/opsx:apply add-readme
/opsx:archive add-readme

# 确认都已归档
openspec list
# 输出：No active changes
```

</details>

---

## 练习 5：理解 Delta 合并 ⭐⭐

### 要求

1. 在项目中创建一个初始的 `specs/project/spec.md`
2. 创建一个变更，添加新的 requirement
3. 归档变更
4. 查看主 spec 是否包含新的 requirement

### 验证标准

- 理解 Delta 如何合并到主 spec
- 理解 `## ADDED Requirements` 的作用

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 1. 手动创建初始 spec
mkdir -p openspec/specs/project
cat > openspec/specs/project/spec.md << 'EOF'
# Project Specification

## Purpose
这是一个示例项目。

## Requirements

### Requirement: 项目名称
系统 SHALL 有一个项目名称。
EOF

# 2. 创建变更
/opsx:propose 添加项目版本号

# 3. 查看生成的 Delta Spec
cat openspec/changes/add-project-version/specs/project/spec.md

# Delta 应该包含：
# ## ADDED Requirements
# ### Requirement: 项目版本号
# ...

# 4. 实现并归档
/opsx:apply
/opsx:archive

# 5. 查看合并后的主 spec
cat openspec/specs/project/spec.md

# 现在应该包含：
# ### Requirement: 项目名称
# ### Requirement: 项目版本号  ← 新增的
```

</details>

---

## 下一步

完成基础练习后，继续 [进阶练习](../02-进阶练习/)。

# 进阶练习

> 配置和自定义 OpenSpec

---

## 练习 1：配置中文项目 ⭐⭐

### 要求

1. 创建一个新项目
2. 配置 `openspec/config.yaml` 使用中文
3. 创建一个变更
4. 验证生成的文档是中文的

### 验证标准

- `proposal.md` 是中文的
- `tasks.md` 是中文的

### 参考答案

<details>
<summary>点击查看</summary>

```yaml
# openspec/config.yaml

schema: spec-driven

context: |
  语言：中文（简体）
  所有产出物必须用简体中文撰写。

  技术栈: TypeScript + React
```

```bash
# 创建变更
/opsx:propose 添加用户登录功能

# 查看生成的 proposal（应该是中文的）
cat openspec/changes/add-user-login/proposal.md
```

</details>

---

## 练习 2：自定义规则 ⭐⭐

### 要求

1. 配置 `rules` 字段
2. 创建变更验证规则生效

### 验证标准

- `proposal.md` 包含回滚方案（如果配置了这个规则）

### 参考答案

<details>
<summary>点击查看</summary>

```yaml
# openspec/config.yaml

context: |
  语言：中文

rules:
  proposal:
    - 必须包含回滚方案
    - 必须评估性能影响
  design:
    - 必须包含数据库变更说明
```

创建变更后，检查 `proposal.md` 是否包含回滚方案部分。

</details>

---

## 练习 3：并行处理多个变更 ⭐⭐⭐

### 要求

1. 创建两个变更：`add-feature-a` 和 `add-feature-b`
2. 实现 `add-feature-a`
3. 切换到 `add-feature-b` 实现
4. 分别归档

### 验证标准

- 两个变更都成功归档
- 理解如何指定变更名

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 创建两个变更
/opsx:propose 添加功能 A
/opsx:propose 添加功能 B

# 查看变更列表
openspec list
# 输出：
# Changes:
#   add-feature-a (in-progress)
#   add-feature-b (in-progress)

# 实现变更 A
/opsx:apply add-feature-a
/opsx:archive add-feature-a

# 实现变更 B
/opsx:apply add-feature-b
/opsx:archive add-feature-b

# 验证
openspec list
# 输出：无活跃变更
```

</details>

---

## 练习 4：切换 Profile ⭐⭐

### 要求

1. 查看当前 Profile
2. 切换到 `custom` Profile
3. 更新项目
4. 查看新增的斜杠命令

### 验证标准

- 理解 `core` vs `custom` 的区别
- 看到 `/opsx:ff` 等新命令

### 参考答案

<details>
<summary>点击查看</summary>

```bash
# 查看当前配置
openspec config show

# 切换 Profile
openspec config profile custom

# 更新项目
openspec update

# 查看新增的命令
ls .claude/commands/openspec/

# 现在应该看到更多命令文件
```

</details>

---

## 下一步

完成进阶练习后，继续 [高级挑战](../03-高级挑战/)。

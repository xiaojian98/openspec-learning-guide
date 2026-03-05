# Hello OpenSpec 示例

> 5 分钟完成你的第一个 OpenSpec 变更

## 目标

给项目添加一个简单的 README 文件，体验完整的 OpenSpec 工作流。

---

## 步骤 1：初始化项目

```bash
# 创建空项目
mkdir hello-openspec
cd hello-openspec

# 初始化 Git
git init

# 初始化 OpenSpec
openspec init
```

**选择 Claude Code**（或你使用的 AI 工具）。

---

## 步骤 2：创建变更提案

```
/opsx:propose 添加 README 文件
```

**AI 会生成**：
- `openspec/changes/add-readme/proposal.md`
- `openspec/changes/add-readme/design.md`
- `openspec/changes/add-readme/tasks.md`

---

## 步骤 3：查看生成的文件

```bash
# 查看变更列表
openspec list

# 查看变更详情
openspec show add-readme
```

**输出示例**：
```
Change: add-readme
Schema: spec-driven
Progress: 0/3 artifacts complete

[ ] design
[ ] specs
[ ] tasks

Ready to implement!
```

---

## 步骤 4：实现变更

```
/opsx:apply
```

**AI 会**：
1. 读取 `proposal.md` 理解目标
2. 读取 `design.md` 了解实现方案
3. 按 `tasks.md` 逐个完成任务
4. 创建 `README.md` 文件

**输出示例**：
```
Implementing tasks...
✓ 1.1 Create README.md with project title
✓ 1.2 Add project description
✓ 1.3 Add installation instructions

All tasks complete!
```

---

## 步骤 5：验证

```bash
# 查看 README 内容
cat README.md

# 验证变更
openspec validate add-readme
```

---

## 步骤 6：归档

```
/opsx:archive
```

**归档后**：
```
openspec/
├── changes/
│   └── archive/
│       └── 2025-01-20-add-readme/    ← 归档的变更
│           ├── proposal.md
│           ├── design.md
│           ├── tasks.md
│           └── README.md
└── README.md                          ← 你的 README
```

---

## 完整终端输出

```bash
$ mkdir hello-openspec && cd hello-openspec

$ git init
Initialized empty Git repository in /hello-openspec/.git/

$ openspec init
? Select AI tools: Claude Code
✔ Created .claude/ directory
✔ Created openspec/ directory

$ /opsx:propose 添加 README 文件

Creating change 'add-readme'...
✔ Created openspec/changes/add-readme/
  ✓ proposal.md
  ✓ design.md
  ✓ tasks.md

$ openspec list
Changes:
  add-readme (in-progress, 0/3 tasks)

$ /opsx:apply

Implementing tasks for add-readme...
✓ 1.1 Create README.md
✓ 1.2 Add project description
✓ 1.3 Add installation instructions

All tasks complete!

$ cat README.md
# Hello OpenSpec

这是一个简单的示例项目，演示 OpenSpec 的基本用法。

## 安装

```bash
npm install
```

## 使用

```bash
npm start
```

$ /opsx:archive

Archiving change 'add-readme'...
✔ Merged specs
✔ Moved to archive/2025-01-20-add-readme/

Done! 🎉
```

---

## 目录结构（完成后）

```
hello-openspec/
├── .claude/
│   ├── commands/
│   │   └── openspec/
│   │       ├── propose.md
│   │       ├── apply.md
│   │       └── archive.md
│   └── skills/
│       └── openspec-*/
│           └── SKILL.md
├── openspec/
│   ├── config.yaml
│   ├── changes/
│   │   └── archive/
│   │       └── 2025-01-20-add-readme/
│   │           ├── proposal.md
│   │           ├── design.md
│   │           └── tasks.md
│   └── specs/
│       └── project/
│           └── spec.md
├── README.md              ← 生成的 README
└── .gitignore
```

---

## 下一步

- 尝试 [Todo 应用示例](../02-todo-app/)
- 学习 [自定义 Schema](../03-custom-schema/)
- 阅读 [核心概念](../../docs/02-核心概念.md)

# 14 - Shell 补全系统

> bash/zsh/fish/PowerShell 自动补全

## 概览

OpenSpec 支持 4 种 Shell 的自动补全：

| Shell | 配置文件 | 状态 |
|-------|---------|------|
| Bash | `~/.bash_completion.d/openspec` | ✅ |
| Zsh | `~/.zsh/completion/_openspec` | ✅ |
| Fish | `~/.config/fish/completions/openspec.fish` | ✅ |
| PowerShell | `$PROFILE` | ✅ |

---

## 快速安装

### Bash

```bash
openspec completion install bash

# 重启终端或执行
source ~/.bashrc
```

### Zsh

```bash
openspec completion install zsh

# 如果使用 oh-my-zsh，可能需要添加到 fpath
echo "fpath=(~/.zsh/completion \$fpath)" >> ~/.zshrc

# 重启终端
source ~/.zshrc
```

### Fish

```bash
openspec completion install fish

# Fish 会自动加载，但可以重启确认
```

### PowerShell

```powershell
openspec completion install pwsh

# 重启 PowerShell 或执行
. $PROFILE
```

---

## 补全功能

### 命令补全

```bash
openspec <TAB>
# 显示：init, list, status, show, archive, validate, config, schema...

openspec s<TAB>
# 自动补全为：openspec status
```

### 变更名补全

```bash
openspec show <TAB>
# 显示当前所有变更名称
```

### Schema 名补全

```bash
openspec schema validate <TAB>
# 显示所有可用的 Schema
```

### 选项补全

```bash
openspec init --<TAB>
# 显示：--tools, --force, --profile
```

---

## 补全系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                    补全系统架构                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   CommandRegistry                                               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 注册所有命令和选项                                        │   │
│   │ - 命令名                                                  │   │
│   │ - 子命令                                                  │   │
│   │ - 选项                                                    │   │
│   │ - 动态补全提供者                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│   CompletionProvider                                           │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 查询补全数据                                              │   │
│   │ - 命令补全                                                │   │
│   │ - 变更名补全（从 openspec list --json）                  │   │
│   │ - Schema 补全（从 openspec schemas --json）              │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│   Shell Generator                                               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 将补全数据转换为 Shell 格式                               │   │
│   │ - BashGenerator                                           │   │
│   │ - ZshGenerator                                            │   │
│   │ - FishGenerator                                           │   │
│   │ - PowerShellGenerator                                     │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 目录结构

```
src/core/completions/
├── command-registry.ts       # 命令注册
├── completion-provider.ts    # 补全数据提供
├── factory.ts                # Generator 工厂
├── types.ts                  # 类型定义
├── generators/               # Shell 脚本生成器
│   ├── bash-generator.ts
│   ├── zsh-generator.ts
│   ├── fish-generator.ts
│   └── powershell-generator.ts
├── installers/               # 安装器
│   ├── bash-installer.ts
│   ├── zsh-installer.ts
│   ├── fish-installer.ts
│   └── powershell-installer.ts
└── templates/                # 补全模板
    ├── bash-templates.ts
    ├── zsh-templates.ts
    ├── fish-templates.ts
    └── powershell-templates.ts
```

---

## 手动生成补全脚本

```bash
# 生成 Bash 补全脚本（输出到 stdout）
openspec completion generate bash

# 生成 Zsh 补全脚本
openspec completion generate zsh

# 生成 Fish 补全脚本
openspec completion generate fish

# 生成 PowerShell 补全脚本
openspec completion generate pwsh
```

---

## 调试补全

### 查看补全数据

```bash
# 内部命令：获取补全数据
openspec __complete commands
# 输出：init,list,status,show...

openspec __complete changes
# 输出：当前所有变更名
```

### 验证安装

```bash
# 查看补全脚本位置
openspec completion which bash

# 详细安装日志
openspec completion install bash --verbose
```

---

## 常见问题

### Q: 补全不生效？

1. 确认已安装：`openspec completion which <shell>`
2. 重启终端
3. 检查配置文件是否正确加载

### Q: Zsh 补全显示 "command not found: compdef"？

```bash
# 确保 compinit 已加载
echo "autoload -Uz compinit && compinit" >> ~/.zshrc
source ~/.zshrc
```

### Q: Windows PowerShell 执行策略问题？

```powershell
# 允许执行脚本
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 下一步

→ [15-多变更并行](15-多变更并行.md)：高效处理多个变更

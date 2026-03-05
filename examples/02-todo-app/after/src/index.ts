// CLI 入口

import { TodoStorage } from './storage.js';

const todoStorage = new TodoStorage();
todoStorage.load();

const [command, ...args] = process.argv.slice(2);

function printUsage(): void {
  console.log(`
Todo 应用 - 命令行工具

用法:
  add <任务内容>     添加新任务
  complete <id>      标记任务完成
  delete <id>        删除任务
  list               列出所有任务
  help               显示帮助
`);
}

function listTodos(): void {
  const todos = todoStorage.list();
  if (todos.length === 0) {
    console.log('暂无任务');
    return;
  }

  console.log('\n任务列表:');
  console.log('─'.repeat(50));
  todos.forEach(todo => {
    const status = todo.completed ? '✅' : '⬜';
    const date = todo.createdAt.toLocaleDateString('zh-CN');
    console.log(`${status} [${todo.id}] ${todo.title} (${date})`);
  });
  console.log('─'.repeat(50));
}

switch (command) {
  case 'add': {
    const title = args.join(' ');
    if (!title) {
      console.error('错误: 请提供任务内容');
      process.exit(1);
    }
    const todo = todoStorage.add(title);
    todoStorage.save();
    console.log(`✅ 已添加: [${todo.id}] ${todo.title}`);
    break;
  }

  case 'complete': {
    const id = args[0];
    if (!id) {
      console.error('错误: 请提供任务 ID');
      process.exit(1);
    }
    if (todoStorage.complete(id)) {
      todoStorage.save();
      console.log(`✅ 已完成: ${id}`);
    } else {
      console.error(`❌ 未找到任务: ${id}`);
    }
    break;
  }

  case 'delete': {
    const id = args[0];
    if (!id) {
      console.error('错误: 请提供任务 ID');
      process.exit(1);
    }
    if (todoStorage.delete(id)) {
      todoStorage.save();
      console.log(`🗑️ 已删除: ${id}`);
    } else {
      console.error(`❌ 未找到任务: ${id}`);
    }
    break;
  }

  case 'list': {
    listTodos();
    break;
  }

  case 'help':
  case '--help':
  case '-h':
  default:
    printUsage();
    break;
}

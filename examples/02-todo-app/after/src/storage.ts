// 本地存储实现

import type { Todo } from './types.js';
import { TodoManager } from './todo.js';
import * as fs from 'fs';
import * as path from 'path';

const STORAGE_FILE = path.join(process.cwd(), '.todo-storage.json');

export class TodoStorage extends TodoManager {
  /**
   * 从本地存储加载
   */
  load(): void {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const todos: Todo[] = JSON.parse(data);

        // 转换日期字符串为 Date 对象
        this.items = todos.map(t => ({
          ...t,
          createdAt: new Date(t.createdAt),
          completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
        }));
      }
    } catch (error) {
      console.error('加载存储失败:', error);
      this.items = [];
    }
  }

  /**
   * 保存到本地存储
   */
  save(): void {
    try {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(this.items, null, 2));
    } catch (error) {
      console.error('保存失败:', error);
    }
  }
}

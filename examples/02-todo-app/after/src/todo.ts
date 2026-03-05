// Todo 管理类

import type { Todo, TodoList as ITodoList } from './types.js';

export class TodoManager implements ITodoList {
  items: Todo[] = [];

  /**
   * 添加新任务
   */
  add(title: string): Todo {
    const todo: Todo = {
      id: this.generateId(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.items.push(todo);
    return todo;
  }

  /**
   * 标记任务为已完成
   */
  complete(id: string): boolean {
    const todo = this.items.find(t => t.id === id);
    if (!todo) return false;

    todo.completed = true;
    todo.completedAt = new Date();
    return true;
  }

  /**
   * 删除任务
   */
  delete(id: string): boolean {
    const index = this.items.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }

  /**
   * 获取所有任务
   */
  list(): Todo[] {
    return [...this.items];
  }

  /**
   * 生成唯一 ID
   */
  private generateId(): string {
    return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}

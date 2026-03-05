// Todo 类型定义

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TodoList {
  items: Todo[];
  add(title: string): Todo;
  complete(id: string): boolean;
  delete(id: string): boolean;
  list(): Todo[];
}

'use client'

import { TodoItem } from './TodoItem'
import type { Todo } from '@/lib/types'

interface TodoListProps {
  todos: Todo[]
  loading: boolean
  onToggle: (id: string, currentStatus: boolean) => Promise<boolean>
  onUpdate: (id: string, text: string) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function TodoList({ todos, loading, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (loading) {
    return (
      <div className="space-y-3" role="status" aria-label="Loading todos">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Loading todos...</span>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400" role="status">
        <p className="text-lg">No todos yet!</p>
        <p className="text-sm mt-1">Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

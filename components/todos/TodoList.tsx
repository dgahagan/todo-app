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
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No todos yet!</p>
        <p className="text-sm mt-1">Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
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

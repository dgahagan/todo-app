'use client'

import { useState, useMemo } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { TodoForm } from '@/components/todos/TodoForm'
import { TodoList } from '@/components/todos/TodoList'
import { TodoFilters } from '@/components/todos/TodoFilters'
import type { TodoFilter } from '@/lib/types'

export default function TodosPage() {
  const {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  } = useTodos()

  const [filter, setFilter] = useState<TodoFilter>('all')

  // Filter todos based on current filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.is_completed)
      case 'completed':
        return todos.filter((todo) => todo.is_completed)
      default:
        return todos
    }
  }, [todos, filter])

  // Calculate counts for filters
  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((todo) => !todo.is_completed).length,
    completed: todos.filter((todo) => todo.is_completed).length,
  }), [todos])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Add Todo Form */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Add New Todo</h2>
            <TodoForm onAddTodo={addTodo} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {/* Filters */}
          {todos.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Filter</h3>
              <TodoFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
            </div>
          )}

          {/* Todo List */}
          <div>
            {filter !== 'all' && (
              <h3 className="text-sm font-medium mb-3 text-gray-700">
                {filter === 'active' ? 'Active Todos' : 'Completed Todos'}
              </h3>
            )}
            <TodoList
              todos={filteredTodos}
              loading={loading}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="text-sm text-gray-500 text-center pt-4 border-t">
              {counts.active} {counts.active === 1 ? 'item' : 'items'} remaining
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

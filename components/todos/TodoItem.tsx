'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Todo } from '@/lib/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, currentStatus: boolean) => Promise<boolean>
  onUpdate: (id: string, text: string) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    await onToggle(todo.id, todo.is_completed)
    setLoading(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSave = async () => {
    if (!editText.trim()) {
      setEditText(todo.text)
      setIsEditing(false)
      return
    }

    if (editText.trim() === todo.text) {
      setIsEditing(false)
      return
    }

    setLoading(true)
    const success = await onUpdate(todo.id, editText.trim())
    setLoading(false)

    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setLoading(true)
      await onDelete(todo.id)
      // Loading state will be removed when component unmounts
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={handleToggle}
        disabled={loading}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1"
            autoFocus
          />
          <Button
            onClick={handleSave}
            disabled={loading || !editText.trim()}
            size="sm"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 cursor-pointer ${
              todo.is_completed
                ? 'line-through text-gray-400'
                : 'text-gray-900'
            }`}
            onDoubleClick={handleEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
          <Button
            onClick={handleEdit}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="destructive"
            size="sm"
          >
            Delete
          </Button>
        </>
      )}
    </div>
  )
}

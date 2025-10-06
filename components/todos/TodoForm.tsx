'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TodoFormProps {
  onAddTodo: (text: string) => Promise<any>
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      return
    }

    setLoading(true)
    try {
      await onAddTodo(text.trim())
      setText('') // Clear input on success
    } catch (err) {
      console.error('Failed to add todo:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        className="flex-1"
      />
      <Button type="submit" disabled={loading || !text.trim()}>
        {loading ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}

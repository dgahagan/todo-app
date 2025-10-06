'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import type { Todo, Database } from '@/lib/types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos for the current user
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('Not authenticated')
        return
      }

      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        toast.error('Failed to load todos', {
          description: fetchError.message,
        })
        return
      }

      setTodos(data || [])
    } catch (err) {
      const errorMessage = 'Failed to fetch todos'
      setError(errorMessage)
      toast.error('Failed to load todos', {
        description: errorMessage,
      })
      console.error('Fetch todos error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Add a new todo
  const addTodo = async (text: string) => {
    try {
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('Not authenticated')
        return null
      }

      const newTodo: Database['public']['Tables']['todos']['Insert'] = {
        text,
        user_id: user.id,
        is_completed: false,
      }

      const { data, error: insertError } = await supabase
        .from('todos')
        // @ts-ignore - Supabase types inference issue
        .insert(newTodo)
        .select()
        .single()

      if (insertError) {
        setError(insertError.message)
        toast.error('Failed to add todo', {
          description: insertError.message,
        })
        return null
      }

      // Add to local state (optimistic update)
      setTodos((prev) => [data, ...prev])
      toast.success('Todo added')
      return data
    } catch (err) {
      const errorMessage = 'Failed to add todo'
      setError(errorMessage)
      toast.error('Failed to add todo', {
        description: errorMessage,
      })
      console.error('Add todo error:', err)
      return null
    }
  }

  // Toggle todo completion status
  const toggleTodo = async (id: string, currentStatus: boolean) => {
    try {
      setError(null)

      // Optimistic update
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !currentStatus } : todo
        )
      )

      const updateData: Database['public']['Tables']['todos']['Update'] = {
        is_completed: !currentStatus
      }

      const { error: updateError } = await supabase
        .from('todos')
        // @ts-ignore - Supabase types inference issue
        .update(updateData)
        .eq('id', id)

      if (updateError) {
        // Revert on error
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, is_completed: currentStatus } : todo
          )
        )
        setError(updateError.message)
        toast.error('Failed to update todo', {
          description: updateError.message,
        })
        return false
      }

      return true
    } catch (err) {
      const errorMessage = 'Failed to toggle todo'
      setError(errorMessage)
      toast.error('Failed to update todo', {
        description: errorMessage,
      })
      console.error('Toggle todo error:', err)
      return false
    }
  }

  // Update todo text
  const updateTodo = async (id: string, text: string) => {
    try {
      setError(null)

      const updateData: Database['public']['Tables']['todos']['Update'] = {
        text
      }

      const { data, error: updateError } = await supabase
        .from('todos')
        // @ts-ignore - Supabase types inference issue
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        setError(updateError.message)
        toast.error('Failed to update todo', {
          description: updateError.message,
        })
        return false
      }

      // Update local state
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? data : todo))
      )
      toast.success('Todo updated')
      return true
    } catch (err) {
      const errorMessage = 'Failed to update todo'
      setError(errorMessage)
      toast.error('Failed to update todo', {
        description: errorMessage,
      })
      console.error('Update todo error:', err)
      return false
    }
  }

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null)

      // Optimistic delete
      setTodos((prev) => prev.filter((todo) => todo.id !== id))

      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (deleteError) {
        // Revert on error - refetch to be safe
        fetchTodos()
        setError(deleteError.message)
        toast.error('Failed to delete todo', {
          description: deleteError.message,
        })
        return false
      }

      toast.success('Todo deleted')
      return true
    } catch (err) {
      const errorMessage = 'Failed to delete todo'
      setError(errorMessage)
      toast.error('Failed to delete todo', {
        description: errorMessage,
      })
      console.error('Delete todo error:', err)
      return false
    }
  }

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  }
}

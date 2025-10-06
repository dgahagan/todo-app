// Database types matching Supabase schema

export interface Todo {
  id: string
  user_id: string
  text: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string | null
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

// Database schema type
export interface Database {
  public: {
    Tables: {
      todos: {
        Row: Todo
        Insert: Omit<Todo, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Todo, 'id' | 'created_at' | 'updated_at'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

// Auth types
export interface User {
  id: string
  email?: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
}

// Filter types for todos
export type TodoFilter = 'all' | 'active' | 'completed'

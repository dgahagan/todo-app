import { redirect } from 'next/navigation'
import { getSession } from '@/lib/supabase/server'
import { LoginForm } from '@/components/auth/LoginForm'

export default async function LoginPage() {
  // Check if user is already logged in
  const session = await getSession()

  if (session) {
    // Redirect to todos if already authenticated
    redirect('/todos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <LoginForm />
    </div>
  )
}

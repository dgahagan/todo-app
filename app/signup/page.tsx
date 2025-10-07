import { redirect } from 'next/navigation'
import { getSession } from '@/lib/supabase/server'
import { SignupForm } from '@/components/auth/SignupForm'

export default async function SignupPage() {
  // Check if user is already logged in
  const session = await getSession()

  if (session) {
    // Redirect to todos if already authenticated
    redirect('/todos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <SignupForm />
    </div>
  )
}

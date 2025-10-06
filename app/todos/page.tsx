import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
import { supabase } from '@/lib/supabase/client'

export default async function TodosPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Todos</h1>
          <p className="text-gray-600 mb-4">You are logged in as: {user.email}</p>
          <p className="text-sm text-gray-500">
            Todo functionality will be added in Phase 4.
          </p>

          <div className="mt-6">
            <form action="/api/auth/signout" method="POST">
              <button
                type="button"
                onClick={async () => {
                  await fetch('/api/auth/signout', { method: 'POST' })
                  window.location.href = '/login'
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

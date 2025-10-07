import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const supabase = await createServerClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to todos if already logged in
  if (user) {
    redirect('/todos')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Hero Section */}
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Organized, Get Things Done
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A simple and elegant todo app to help you manage your tasks efficiently.
            Built with Next.js, React, and Supabase.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center items-center flex-col sm:flex-row">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/signup">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">✓</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Simple & Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quickly add, edit, and complete tasks with an intuitive interface
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with Supabase authentication and RLS
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Responsive</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works seamlessly on desktop, tablet, and mobile devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

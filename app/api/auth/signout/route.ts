import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createServerClient()

  // Sign out the user
  await supabase.auth.signOut()

  return NextResponse.json({ success: true })
}

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack todo application built with Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS, and shadcn/ui components. The backend uses Supabase for PostgreSQL database, authentication, and real-time capabilities. The app is designed to be deployed on Vercel.

## Development Commands

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Start production**: `npm start`
- **Type check**: `npx tsc --noEmit`

## Environment Variables

Required environment variables (add to `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous/public key

Template available in `.env.example` (if it exists).

## Architecture

### Authentication Flow
- Uses Supabase Auth with email/password
- Session management handled via Supabase client
- Protected routes should check for authenticated session
- Supabase client utilities split between client-side (`lib/supabase/client.ts`) and server-side (`lib/supabase/server.ts`)

### Database Schema
- **todos table**: Contains user todos with RLS policies ensuring users can only access their own data
  - Fields: `id` (UUID), `user_id` (UUID FK to auth.users), `text`, `is_completed`, `created_at`, `updated_at`
  - Automatic `updated_at` trigger on updates
- **profiles table**: Optional extended user data
  - Automatic profile creation on user signup via trigger

See `supabase/migrations/001_initial_schema.sql` for complete schema.

### Project Structure
```
app/                  # Next.js App Router pages
├── layout.tsx
├── page.tsx
├── login/
├── signup/
└── todos/
components/
├── ui/              # shadcn/ui components
├── auth/            # LoginForm, SignupForm
├── todos/           # TodoList, TodoItem, TodoForm, TodoFilters
└── layout/          # Header, Navigation
lib/
├── supabase/
│   ├── client.ts    # Client-side Supabase instance (✅ complete)
│   └── server.ts    # Server-side Supabase instance (✅ complete)
├── types.ts         # TypeScript interfaces (✅ complete)
└── utils.ts         # Utility functions
hooks/
└── useTodos.ts
middleware.ts        # Auth protection (✅ complete)
```

### Row Level Security (RLS)
All database access is protected by RLS policies. Users can only SELECT, INSERT, UPDATE, and DELETE their own todos (where `auth.uid() = user_id`). When writing queries, no additional user filtering is needed - RLS handles it automatically.

### Supabase Client Pattern
- Use client-side instance (`lib/supabase/client.ts`) for client components
- Use server-side instance (`lib/supabase/server.ts`) for Server Components and API routes
- Server-side client should handle cookie-based session management

## Implementation Phases

The project is designed to be built in phases:
1. Project Setup (Next.js, dependencies, basic structure)
2. Supabase Configuration (run migration, set up client utilities)
3. Authentication (login, signup, session management, protected routes)
4. Todo Features (CRUD operations, filtering)
5. UI/UX Polish (shadcn/ui, responsive design, loading states, error handling)
6. Deployment (GitHub, Vercel with env vars)

Refer to `PROJECT_OUTLINE.md` for detailed phase breakdowns.

## Deployment

- **Vercel Configuration**: `vercel.json` contains build settings, security headers, and environment variable definitions
- **Auto-deployment**: Push to GitHub triggers automatic Vercel deployment
- **Database Migration**: Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor before first deployment

## Infrastructure Setup

Before development, Supabase and Vercel must be configured. Two options:
1. Run `scripts/setup-infrastructure.sh` for guided setup
2. Follow manual steps in `docs/SETUP_GUIDE.md`

Both approaches ensure:
- Supabase project created and database migrated
- `.env.local` created with API credentials
- Git repository initialized with remote
- Vercel account ready for deployment

## Development Workflow Preferences

**After completing each phase:**
1. Update `docs/implementation/IMPLEMENTATION_PLAN.md` to mark the phase as complete
2. Note any issues, decisions, or deviations from the original plan in the documentation
3. Commit all changes with a descriptive commit message
4. Push to GitHub to trigger Vercel deployment

**This ensures:**
- Single source of truth for completed work
- Clear history of implementation decisions
- Continuous deployment and testing
- Ability to track progress and resume work easily

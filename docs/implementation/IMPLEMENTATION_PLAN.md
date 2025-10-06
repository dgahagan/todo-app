# Todo App - Detailed Implementation Plan

## 📋 Project Review & Implementation Plan

### **Current State**
✓ PROJECT_OUTLINE.md - Complete project specification
✓ Database migration - Well-structured with RLS policies, indexes, triggers
✓ Setup script - Good automation with dependency checks
✓ Vercel config - Proper security headers and env var definitions
⚠️ SETUP_GUIDE.md - More of a file inventory; needs actual Supabase setup steps

### **Suggested Improvements**
The SETUP_GUIDE.md should include detailed Supabase setup instructions (creating project, running migration, getting API keys). This will be enhanced during implementation.

---

## 🎯 Detailed Implementation Plan

### **Phase 0: Infrastructure Setup** (DO FIRST)

**Order of Operations:**
1. **Supabase Setup** (15 min)
   - Create account at supabase.com
   - Create new project (name: "todo-app")
   - Wait for database provisioning
   - Navigate to SQL Editor → Run `001_initial_schema.sql`
   - Verify: Check Table Editor for `todos` and `profiles` tables
   - Copy API credentials from Settings → API

2. **Local Environment** (5 min)
   - Create `.env.local` with Supabase credentials
   - Verify Node.js v18+ installed: `node --version`

3. **Git Setup** (5 min)
   - Initialize: `git init` (already done)
   - Create GitHub repository (web UI)
   - Add remote: `git remote add origin <url>`

4. **Vercel Account** (5 min)
   - Sign up at vercel.com with GitHub OAuth
   - Don't import yet - we'll do this after code is ready

**Verification:**
- [ ] Supabase: SQL Editor shows tables with RLS enabled
- [ ] Local: `.env.local` exists with valid credentials
- [ ] Git: `git remote -v` shows origin
- [ ] Vercel: Account exists and connected to GitHub

---

### **Phase 1: Project Initialization** (10 min)

```bash
# Initialize Next.js with all required settings
npx create-next-app@latest . --typescript --tailwind --app --no-src --import-alias "@/*"

# Install core dependencies
npm install @supabase/supabase-js

# Install shadcn/ui
npx shadcn@latest init -d

# Install specific shadcn components (we'll determine which ones as we build)
npx shadcn@latest add button input card label
```

**Files Created:**
- `package.json`, `tsconfig.json`, `tailwind.config.ts`
- `next.config.ts`, `postcss.config.mjs`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components.json` (shadcn config)

---

### **Phase 2: Core Infrastructure Files** (30 min)

**Implementation Order (dependencies matter!):**

1. **`lib/types.ts`** (5 min)
   - TypeScript interfaces for Todo, User, Database
   - Keeps type safety throughout app

2. **`lib/supabase/client.ts`** (5 min)
   - Client-side Supabase instance
   - Uses `createBrowserClient`
   - Required by: All client components

3. **`lib/supabase/server.ts`** (10 min)
   - Server-side Supabase instance
   - Cookie-based session management
   - Uses `createServerClient` with Next.js cookies
   - Required by: Server Components, API routes, middleware

4. **`middleware.ts`** (10 min)
   - Auth middleware for protected routes
   - Refreshes session tokens
   - Redirects unauthenticated users to `/login`
   - Protects `/todos` route

---

### **Phase 3: Authentication UI** (60 min)

**Implementation Order:**

1. **`components/ui/*`** (Already from shadcn)
   - button, input, card, label components

2. **`components/auth/LoginForm.tsx`** (20 min)
   - Client component with useState for form
   - Calls `supabase.auth.signInWithPassword()`
   - Error handling and loading states
   - Redirect to `/todos` on success

3. **`components/auth/SignupForm.tsx`** (20 min)
   - Similar to LoginForm
   - Calls `supabase.auth.signUp()`
   - Email confirmation message

4. **`app/login/page.tsx`** (10 min)
   - Server Component (checks existing session)
   - Renders `<LoginForm />`
   - Redirect if already logged in

5. **`app/signup/page.tsx`** (10 min)
   - Server Component
   - Renders `<SignupForm />`
   - Redirect if already logged in

**Testing Checkpoint:**
- [ ] Visit `/signup` → Create account
- [ ] Check Supabase → Auth → Users (user exists)
- [ ] Check Supabase → Table Editor → profiles (profile auto-created)
- [ ] Visit `/login` → Sign in with created account
- [ ] Browser DevTools → Application → Cookies (session cookies exist)

---

### **Phase 4: Todo Functionality** (90 min)

**Implementation Order:**

1. **`hooks/useTodos.ts`** (20 min)
   - Custom hook for todo CRUD operations
   - `fetchTodos()`, `addTodo()`, `updateTodo()`, `deleteTodo()`, `toggleTodo()`
   - Uses client-side Supabase
   - Returns loading, error, todos state

2. **`components/todos/TodoForm.tsx`** (15 min)
   - Input field + Add button
   - Calls `addTodo()` from useTodos
   - Clears input on success

3. **`components/todos/TodoItem.tsx`** (20 min)
   - Checkbox for completion status
   - Inline editing (double-click text)
   - Delete button
   - Optimistic UI updates

4. **`components/todos/TodoFilters.tsx`** (15 min)
   - Tabs: All / Active / Completed
   - Filter state management
   - Returns filtered todos

5. **`components/todos/TodoList.tsx`** (20 min)
   - Maps over todos
   - Renders `<TodoItem />` for each
   - Empty state message
   - Loading skeleton

6. **`app/todos/page.tsx`** (10 min)
   - Server Component (checks auth)
   - Composes: `<TodoForm />`, `<TodoFilters />`, `<TodoList />`
   - Logout button in header

**Testing Checkpoint:**
- [ ] Visit `/todos` (redirects to login if not authenticated)
- [ ] Add todo → Appears in list
- [ ] Check Supabase Table Editor → `todos` table (new row exists with correct `user_id`)
- [ ] Mark todo complete → Checkbox updates
- [ ] Edit todo text → Saves correctly
- [ ] Delete todo → Removes from list
- [ ] Filter Active/Completed → Shows correct todos
- [ ] Open new incognito window → Try accessing `/todos` → Redirects to login

**RLS Verification:**
- [ ] Create second user account
- [ ] Each user only sees their own todos
- [ ] Try directly querying another user's todo (should fail)

---

### **Phase 5: Layout & Navigation** (30 min)

1. **`components/layout/Header.tsx`** (15 min)
   - App title/logo
   - User email display (from session)
   - Logout button

2. **`app/layout.tsx`** (10 min)
   - Root layout with `<Header />` (conditionally shown)
   - Metadata (title, description)

3. **`app/page.tsx`** (5 min)
   - Landing page
   - Links to login/signup
   - Redirect to `/todos` if authenticated

---

### **Phase 6: Polish & Error Handling** (45 min)

1. **Loading States** (15 min)
   - Skeleton loaders in TodoList
   - Button disabled states during async operations
   - Loading spinners

2. **Error Handling** (15 min)
   - Toast notifications for errors (use shadcn toast)
   - Form validation messages
   - Network error recovery

3. **Accessibility** (15 min)
   - ARIA labels on interactive elements
   - Keyboard navigation (Enter to submit, Escape to cancel edit)
   - Focus management

**Testing Checkpoint:**
- [ ] Network throttling (DevTools) → Check loading states
- [ ] Invalid credentials → Error message displays
- [ ] Disconnect internet → Graceful error handling
- [ ] Tab navigation works throughout app
- [ ] Screen reader testing (basic)

---

### **Phase 7: Deployment** (30 min)

**Pre-deployment:**
```bash
# Verify production build works
npm run build
npm run start  # Test production mode locally

# Commit all changes
git add .
git commit -m "feat: complete todo app with auth and CRUD"
git push -u origin main
```

**Vercel Deployment:**
1. Visit vercel.com → New Project
2. Import GitHub repository
3. Framework: Next.js (auto-detected)
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy → Wait for build
6. Visit production URL

**Post-deployment Verification:**
- [ ] Production site loads
- [ ] Can create account on production
- [ ] Can create todos on production
- [ ] Check Supabase logs for production requests
- [ ] Test on mobile device
- [ ] Verify security headers (DevTools → Network → Response Headers)

**Automatic Deployments:**
- [ ] Make small change (e.g., update README)
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deploys

---

## 🧪 Testing Strategy

### **Unit Testing (Optional - Recommend for Production)**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```
- Test `useTodos` hook with mock Supabase client
- Test TodoItem rendering and interactions

### **Manual Testing Checklist**

**Authentication Flow:**
- [ ] Signup with new email → Success
- [ ] Signup with existing email → Error
- [ ] Login with correct credentials → Success
- [ ] Login with wrong password → Error
- [ ] Logout → Session cleared
- [ ] Access `/todos` without auth → Redirect to `/login`
- [ ] Login → Auto-redirect to `/todos`

**Todo CRUD:**
- [ ] Add todo with empty text → Validation error
- [ ] Add valid todo → Appears at top of list
- [ ] Toggle todo → Updates immediately (optimistic UI)
- [ ] Edit todo → Saves on blur/Enter
- [ ] Delete todo → Removes from list
- [ ] Refresh page → Todos persist

**Filters:**
- [ ] All filter → Shows all todos
- [ ] Active filter → Only incomplete todos
- [ ] Completed filter → Only completed todos

**RLS Security:**
- [ ] User A creates todos
- [ ] User B logs in → Doesn't see User A's todos
- [ ] User B creates todos → Only sees own todos

**Edge Cases:**
- [ ] No todos → Empty state message
- [ ] Very long todo text → Text wraps properly
- [ ] Rapid clicking → No duplicate todos
- [ ] Offline → Graceful error handling

---

## 📂 File Creation Order (Summary)

```
1.  lib/types.ts
2.  lib/supabase/client.ts
3.  lib/supabase/server.ts
4.  middleware.ts
5.  components/auth/LoginForm.tsx
6.  components/auth/SignupForm.tsx
7.  app/login/page.tsx
8.  app/signup/page.tsx
9.  hooks/useTodos.ts
10. components/todos/TodoForm.tsx
11. components/todos/TodoItem.tsx
12. components/todos/TodoFilters.tsx
13. components/todos/TodoList.tsx
14. app/todos/page.tsx
15. components/layout/Header.tsx
16. app/layout.tsx (update)
17. app/page.tsx (update)
```

---

## 🎯 Success Criteria

Before considering the project complete:

- ✅ All authentication flows work (signup, login, logout, session persistence)
- ✅ All CRUD operations work (create, read, update, delete todos)
- ✅ Filters work correctly (all, active, completed)
- ✅ RLS verified (users can only see their own data)
- ✅ Production deployment successful on Vercel
- ✅ No TypeScript errors
- ✅ No console errors in browser
- ✅ Responsive design (works on mobile)
- ✅ Basic accessibility (keyboard navigation)

---

## 🚀 Implementation Workflow

**Recommended approach:**
1. Complete Phase 0 (Infrastructure Setup) first
2. Approve this plan or request modifications
3. Implement each phase step-by-step
4. Test thoroughly after each phase

**Next Steps:**
- Complete Supabase setup (create project, run migration, get API keys)
- Create `.env.local` file
- Initialize Next.js project
- Begin implementing core files

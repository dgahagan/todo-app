# Todo App - Infrastructure Setup Guide

This guide provides detailed step-by-step instructions for setting up Supabase (database & auth) and Vercel (deployment) for your todo application.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Local Environment Setup](#local-environment-setup)
4. [GitHub Repository Setup](#github-repository-setup)
5. [Vercel Setup](#vercel-setup)
6. [Verification & Testing](#verification--testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js v18+** installed ([download](https://nodejs.org/))
  ```bash
  node --version  # Should show v18.0.0 or higher
  ```
- **npm** (comes with Node.js)
  ```bash
  npm --version
  ```
- **Git** installed
  ```bash
  git --version
  ```
- **Email account** for Supabase and Vercel signup
- **GitHub account** ([sign up](https://github.com/join))

---

## Supabase Setup

Supabase provides your PostgreSQL database, authentication, and real-time capabilities.

### Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with:
   - GitHub (recommended - enables GitHub integration)
   - OR email/password
4. Verify your email if prompted

### Step 2: Create New Project

1. After login, click **"New project"** or **"+ New Project"**
2. **Select organization**: Use your default organization or create a new one
3. **Project settings**:
   - **Name**: `todo-app` (or your preferred name)
   - **Database Password**: Generate a strong password
     - ⚠️ **IMPORTANT**: Save this password securely (you'll need it for database access)
     - Click the **Generate a password** button for a secure random password
   - **Region**: Choose closest to your users (e.g., `East US`, `West EU`, `Southeast Asia`)
   - **Pricing Plan**: Select **Free** tier (perfect for this project)
4. Click **"Create new project"**
5. Wait 2-3 minutes for database provisioning (you'll see a progress indicator)

### Step 3: Run Database Migration

Once your project is ready:

1. In Supabase dashboard sidebar, click **"SQL Editor"**
2. Click **"+ New query"** button
3. Copy the **entire contents** of `supabase/migrations/001_initial_schema.sql` from your local project
4. Paste into the SQL Editor
5. Click **"Run"** (or press `Ctrl/Cmd + Enter`)
6. You should see: **"Success. No rows returned"** (this is expected)

**What this migration does:**
- Creates `todos` table with columns: id, user_id, text, is_completed, created_at, updated_at
- Creates `profiles` table for user metadata
- Sets up Row Level Security (RLS) policies
- Adds indexes for performance
- Creates triggers for auto-updating timestamps

### Step 4: Verify Tables Created

1. In sidebar, click **"Table Editor"**
2. You should see two tables:
   - **todos** - 0 rows
   - **profiles** - 0 rows
3. Click on **todos** table
4. Click the **shield icon** or check **"RLS enabled"** - it should show as **enabled**

### Step 5: Get API Credentials

1. In sidebar, click **"Settings"** (gear icon at bottom)
2. Click **"API"** in the settings menu
3. **Copy these two values** (you'll need them next):

   **Project URL:**
   ```
   https://xxxxxxxxxxx.supabase.co
   ```

   **anon/public key** (under "Project API keys"):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...
   ```

⚠️ **Security Notes:**
- The `anon` key is safe to use in browser/client-side code
- It's restricted by Row Level Security policies
- Never commit the `service_role` key to git (we don't need it for this project)

### Step 6: Configure Email Authentication (Optional)

By default, Supabase requires email confirmation. For development, you can disable this:

1. Go to **"Authentication"** → **"Providers"** → **"Email"**
2. Scroll to **"Confirm email"**
3. Toggle **OFF** for easier testing (re-enable in production)
4. Click **"Save"**

**For production**: Keep email confirmation enabled and configure SMTP settings.

---

## Local Environment Setup

### Step 1: Create Environment File

In your project root, create `.env.local`:

```bash
# In your terminal, from project root:
touch .env.local
```

### Step 2: Add Supabase Credentials

Open `.env.local` and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with the values you copied from Supabase Settings → API.

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5MDAwMDAwMCwiZXhwIjoyMDA1NTc2MDAwfQ.1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 3: Create Environment Template

Create `.env.example` (this will be committed to git):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Ensure .env.local is Gitignored

Verify `.env.local` is in `.gitignore` (Next.js adds this by default):

```bash
# Check if .env.local is ignored
cat .gitignore | grep .env.local
```

If not present, add it:
```bash
echo ".env.local" >> .gitignore
```

---

## GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name**: `todo-app` (or your preferred name)
3. **Description**: `Full-stack todo app with Next.js and Supabase`
4. **Visibility**:
   - **Public** (recommended for portfolio/learning)
   - OR **Private** (for personal projects)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Verify you're in the project directory
pwd

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: project setup files"

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Verify Repository

1. Refresh your GitHub repository page
2. You should see all your project files
3. Verify `.env.local` is **NOT** present (gitignored correctly)
4. Verify these files **ARE** present:
   - `PROJECT_OUTLINE.md`
   - `CLAUDE.md`
   - `vercel.json`
   - `.env.example`
   - `supabase/migrations/001_initial_schema.sql`
   - `scripts/setup-infrastructure.sh`

---

## Vercel Setup

Vercel will host your Next.js frontend application.

### Step 1: Create Vercel Account

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"** (recommended)
3. Authorize Vercel to access your GitHub account
4. Complete account setup

### Step 2: Import Repository (After Code is Ready)

⚠️ **Note**: Only do this after you've built the app and pushed code to GitHub.

1. From Vercel dashboard, click **"Add New..."** → **"Project"**
2. Under **"Import Git Repository"**, find your `todo-app` repo
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (leave as default)

**Build Settings**: (auto-filled, no changes needed)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Step 4: Add Environment Variables

⚠️ **CRITICAL STEP** - Your app won't work without these:

1. In the import screen, expand **"Environment Variables"**
2. Add **first variable**:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Paste your Supabase URL (from `.env.local`)
   - Select environments: **Production**, **Preview**, **Development** (check all three)
3. Click **"Add"**
4. Add **second variable**:
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Paste your Supabase anon key (from `.env.local`)
   - Select environments: **Production**, **Preview**, **Development** (check all three)
5. Click **"Add"**

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. You'll see a success screen with your deployment URL

**Your app is now live at**: `https://your-app-name.vercel.app`

### Step 6: Configure Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

**Test it:**
```bash
# Make a small change
echo "# Todo App" > README.md

# Commit and push
git add README.md
git commit -m "docs: add README"
git push

# Check Vercel dashboard - new deployment should start automatically
```

### Step 7: Add Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (requires DNS configuration)
4. Follow Vercel's instructions to update DNS records

---

## Verification & Testing

### Local Verification Checklist

Before building the app:

- [ ] `.env.local` exists with correct Supabase credentials
- [ ] `node --version` shows v18+
- [ ] `git remote -v` shows GitHub repository
- [ ] Supabase dashboard shows `todos` and `profiles` tables
- [ ] Supabase shows RLS enabled on both tables

### Supabase Verification

1. **Test RLS Policies**:
   - Go to **Table Editor** → **todos**
   - Try to insert a row manually (it should fail - this is correct!)
   - This proves RLS is working (only authenticated users can insert)

2. **Check Authentication**:
   - Go to **Authentication** → **Users**
   - Should show 0 users (users will be created when they sign up through your app)

### Post-Deployment Verification

After deploying to Vercel and building the app:

- [ ] Production URL loads without errors
- [ ] Can create an account (check Supabase → Authentication → Users)
- [ ] Can log in with created account
- [ ] Can create todos (check Supabase → Table Editor → todos)
- [ ] Profile auto-created (check Supabase → Table Editor → profiles)
- [ ] Logout works and redirects properly
- [ ] Incognito mode: accessing `/todos` redirects to `/login`

---

## Troubleshooting

### Supabase Issues

#### "Migration failed" or SQL errors

**Problem**: Syntax error or permissions issue

**Solutions**:
1. Verify you copied the **entire** migration file
2. Make sure you're in the **SQL Editor**, not Table Editor
3. Check for any extra characters (curly quotes, etc.)
4. Try running migration in sections:
   - First: CREATE TABLE statements
   - Second: RLS policies
   - Third: Triggers and functions

#### "Table already exists" error

**Problem**: Migration was already run

**Solutions**:
- Tables exist → You're good! Check Table Editor
- Need to reset → Go to SQL Editor and run:
  ```sql
  DROP TABLE IF EXISTS public.todos CASCADE;
  DROP TABLE IF EXISTS public.profiles CASCADE;
  ```
  Then re-run the migration

#### "Can't connect to Supabase from app"

**Problem**: Wrong credentials or network issue

**Solutions**:
1. Double-check `.env.local` has correct URL and key
2. Verify no extra spaces or quotes in `.env.local`
3. Restart dev server: `Ctrl+C` then `npm run dev`
4. Check Supabase project status (Settings → General)
5. Try creating a new anon key: Settings → API → "Generate new key"

#### "RLS policy is blocking my query"

**Problem**: User not authenticated or policy misconfigured

**Solutions**:
1. Verify user is logged in (check browser cookies)
2. Check Supabase logs: Logs → Postgres Logs
3. Temporarily disable RLS for testing:
   ```sql
   ALTER TABLE public.todos DISABLE ROW LEVEL SECURITY;
   ```
   (Remember to re-enable after debugging!)

### Vercel Issues

#### "Build failed" on Vercel

**Problem**: Build errors or missing dependencies

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure build works locally: `npm run build`
3. Fix TypeScript errors before deploying
4. Check Node.js version: Settings → General → Node.js Version (should be 18.x or 20.x)

#### "Environment variables not working"

**Problem**: Variables not set or not prefixed correctly

**Solutions**:
1. Verify env vars are in Vercel: Settings → Environment Variables
2. **MUST** start with `NEXT_PUBLIC_` for client-side access
3. Redeploy after adding env vars: Deployments → ⋯ → Redeploy
4. Check .env.local locally has same values

#### "Deployment succeeded but app shows errors"

**Problem**: Runtime errors or API issues

**Solutions**:
1. Check browser console for errors (F12 → Console)
2. Check Vercel logs: Deployments → [Latest] → Runtime Logs
3. Verify Supabase credentials are correct in Vercel settings
4. Test API connection with this snippet (in browser console):
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

#### "Automatic deployments not working"

**Problem**: GitHub integration issue

**Solutions**:
1. Check Vercel has GitHub repo access: Settings → Git
2. Re-connect repository if needed
3. Check webhook exists in GitHub: Repo Settings → Webhooks
4. Manual deploy: Deployments → ⋯ → Redeploy

### GitHub Issues

#### "Permission denied" when pushing

**Problem**: SSH key or authentication issue

**Solutions**:
1. Use HTTPS instead of SSH:
   ```bash
   git remote set-url origin https://github.com/USERNAME/todo-app.git
   ```
2. Or set up SSH key: [GitHub SSH docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
3. Check credentials: `git config user.name` and `git config user.email`

#### "Repository not found"

**Problem**: Wrong URL or no access

**Solutions**:
1. Verify repository exists on GitHub
2. Check remote URL: `git remote -v`
3. Update remote:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/USERNAME/todo-app.git
   ```

### Local Development Issues

#### "Module not found" errors

**Problem**: Dependencies not installed

**Solutions**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### "Port 3000 already in use"

**Problem**: Dev server already running or port conflict

**Solutions**:
```bash
# Find process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### ".env.local not loading"

**Problem**: Server not restarted or syntax error

**Solutions**:
1. Restart dev server (Ctrl+C, then `npm run dev`)
2. Check `.env.local` syntax (no quotes around values)
3. Ensure file is named exactly `.env.local` (not `.env` or `.env.development`)

---

## Quick Reference

### Supabase Dashboard URLs
- **Main dashboard**: https://app.supabase.com
- **SQL Editor**: https://app.supabase.com/project/YOUR_PROJECT/sql
- **Table Editor**: https://app.supabase.com/project/YOUR_PROJECT/editor
- **API Settings**: https://app.supabase.com/project/YOUR_PROJECT/settings/api
- **Auth Users**: https://app.supabase.com/project/YOUR_PROJECT/auth/users

### Vercel Dashboard URLs
- **Projects**: https://vercel.com/dashboard
- **Deployments**: https://vercel.com/YOUR_USERNAME/todo-app
- **Settings**: https://vercel.com/YOUR_USERNAME/todo-app/settings

### Important Commands

```bash
# Local development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Test production build
npm run lint             # Check for errors

# Git workflow
git status               # Check changed files
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to GitHub (triggers Vercel deploy)

# Environment
cat .env.local           # View local env vars (never commit this!)
cat .env.example         # View template (safe to commit)
```

---

## Next Steps

After completing this setup:

1. ✅ Supabase project created with database schema
2. ✅ Local environment configured with `.env.local`
3. ✅ GitHub repository created and connected
4. ✅ Vercel account ready (deploy after building app)

**You're ready to build!**

Proceed to:
- Review `PROJECT_OUTLINE.md` for project requirements
- Follow `docs/implementation/IMPLEMENTATION_PLAN.md` for development phases
- Start coding with Next.js

---

## Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

---

**Questions or issues?** Check the troubleshooting section above or refer to the official documentation links.

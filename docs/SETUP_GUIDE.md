# Todo App - Project Setup Files

## Overview
This document lists all the setup files you need to save before starting development with Claude CLI.

## Files to Save

### 1. Project Documentation

#### `PROJECT_OUTLINE.md`
Complete project specification including:
- Tech stack
- Features
- Database schema
- Project structure
- Implementation phases

**Location**: Root of project folder

---

#### `SETUP_GUIDE.md`
Step-by-step instructions for configuring Supabase and Vercel, including:
- Manual setup walkthrough
- CLI-based setup
- Terraform configuration (advanced)
- Troubleshooting guide

**Location**: `docs/SETUP_GUIDE.md`

---

### 2. Infrastructure Scripts

#### `setup-infrastructure.sh`
Automated setup script that guides you through:
- Dependency checking
- Supabase configuration
- Git repository setup
- Vercel deployment preparation

**Location**: `scripts/setup-infrastructure.sh`

**To use:**
```bash
chmod +x scripts/setup-infrastructure.sh
./scripts/setup-infrastructure.sh
```

---

### 3. Configuration Files

#### `vercel.json`
Vercel deployment configuration including:
- Build settings
- Environment variable definitions
- Security headers
- Region configuration

**Location**: Root of project folder

---

#### `001_initial_schema.sql`
Supabase database migration containing:
- Todos table schema
- Profiles table (optional)
- Row Level Security policies
- Indexes and triggers
- Seed data (commented out)

**Location**: `supabase/migrations/001_initial_schema.sql`

---

### 4. Environment Files

#### `.env.example`
Template for environment variables (commit this to git):
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Location**: Root of project folder

---

#### `.env.local`
Your actual environment variables (DO NOT commit to git):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Location**: Root of project folder
**Note**: Create this file after setting up Supabase

---

### 5. Claude CLI Initialization

#### `CLAUDE_CLI_PROMPT.md`
The prompt to use when starting Claude CLI, which includes:
- Instructions to review all setup documentation
- Request for detailed implementation plan
- Phased development approach

**Location**: Root of project folder or keep handy to copy/paste

---

## Quick Start Guide

### Step 1: Create Project Structure
```bash
mkdir todo-app
cd todo-app
mkdir -p docs scripts supabase/migrations
```

### Step 2: Save All Files
Save each file listed above to its corresponding location:

```
todo-app/
├── PROJECT_OUTLINE.md
├── CLAUDE_CLI_PROMPT.md
├── vercel.json
├── .env.example
├── docs/
│   └── SETUP_GUIDE.md
├── scripts/
│   └── setup-infrastructure.sh
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

### Step 3: Configure Infrastructure

**Option A: Automated Script**
```bash
chmod +x scripts/setup-infrastructure.sh
./scripts/setup-infrastructure.sh
```

**Option B: Manual Setup**
Follow the detailed instructions in `docs/SETUP_GUIDE.md`

### Step 4: Initialize with Claude CLI
```bash
# Start Claude CLI
claude

# Copy and paste the prompt from CLAUDE_CLI_PROMPT.md
```

### Step 5: Follow Claude CLI's Plan
Claude CLI will guide you through:
1. Next.js project initialization
2. Installing dependencies
3. Creating components
4. Implementing features
5. Testing
6. Deployment

---

## What Each File Does

| File | Purpose | When to Use |
|------|---------|-------------|
| `PROJECT_OUTLINE.md` | High-level project spec | Reference throughout development |
| `SETUP_GUIDE.md` | Detailed infrastructure setup | Before starting development |
| `setup-infrastructure.sh` | Automates infrastructure setup | Alternative to manual setup |
| `vercel.json` | Configures Vercel deployment | Auto-used when deploying |
| `001_initial_schema.sql` | Creates database schema | Run in Supabase SQL Editor |
| `.env.example` | Template for environment vars | Reference when setting up |
| `.env.local` | Actual environment variables | Created after Supabase setup |
| `CLAUDE_CLI_PROMPT.md` | Starts development with Claude CLI | First interaction with Claude CLI |

---

## Infrastructure Setup Checklist

Before starting development, ensure:

### Supabase
- [ ] Account created
- [ ] Project created  
- [ ] Migration run in SQL Editor
- [ ] API credentials copied
- [ ] RLS verified as enabled

### GitHub
- [ ] Repository created
- [ ] Local git initialized
- [ ] Remote added
- [ ] Ready to push code

### Vercel
- [ ] Account created (with GitHub OAuth)
- [ ] Ready to import repository
- [ ] Know where to add environment variables

### Local Environment
- [ ] Node.js installed (v18+)
- [ ] npm installed
- [ ] Git installed
- [ ] `.env.local` created with Supabase credentials

---

## Development Workflow

Once setup is complete:

1. **Develop locally**
   ```bash
   npm run dev
   ```

2. **Make changes and test**

3. **Commit to git**
   ```bash
   git add .
   git commit -m "Your message"
   ```

4. **Push to GitHub**
   ```bash
   git push
   ```

5. **Vercel auto-deploys** 🎉

---

## Need Help?

- **Supabase issues**: Check `docs/SETUP_GUIDE.md` troubleshooting section
- **Vercel issues**: Check build logs in Vercel dashboard
- **Code issues**: Ask Claude CLI to help debug
- **General questions**: Review `PROJECT_OUTLINE.md` for architecture decisions

---

## Next Steps

After saving all these files:

1. Run the setup script OR follow manual setup guide
2. Verify all infrastructure is configured
3. Start Claude CLI with the initialization prompt
4. Begin development following Claude CLI's implementation plan

**Ready to build!** 🚀
# Todo App

A modern, full-stack todo application built with Next.js 14+, React 18+, TypeScript, and Supabase. Features include user authentication, real-time data synchronization, dark mode support, and a beautiful UI powered by Tailwind CSS and shadcn/ui.

## Features

- **User Authentication**: Secure email/password and Google OAuth login via Supabase Auth
- **Todo Management**: Create, read, update, and delete todos with real-time updates
- **Dark Mode**: Automatic system preference detection with manual toggle (light/dark/system)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Row Level Security**: Your data is protected - users can only access their own todos
- **Modern UI**: Beautiful interface using shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time)
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up free](https://supabase.com))
- A Vercel account ([sign up free](https://vercel.com))
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dgahagan/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Run the database migration in the Supabase SQL Editor:
   - Navigate to your project's SQL Editor
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run the SQL

   c. Get your API credentials:
   - Go to Project Settings > API
   - Copy your project URL and anon/public key

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Configure OAuth (Optional)**

   If using Google OAuth:
   - Copy your Vercel deployment URL
   - Add it to Supabase Auth settings:
     - Go to Authentication > URL Configuration
     - Add your URL to "Site URL" and "Redirect URLs"

### Continuous Deployment

Once connected to Vercel, every push to `main` automatically triggers a new deployment.

## Project Structure

```
todo-app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   └── todos/               # Todo management page
├── components/
│   ├── auth/                # LoginForm, SignupForm
│   ├── layout/              # Header, Navigation
│   ├── providers/           # ThemeProvider
│   ├── todos/               # TodoList, TodoItem, TodoForm, TodoFilters
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client-side Supabase instance
│   │   └── server.ts        # Server-side Supabase instance
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utility functions
├── hooks/
│   └── useTodos.ts          # Custom React hook for todo operations
├── supabase/
│   └── migrations/          # Database schema migrations
├── middleware.ts            # Auth route protection
└── docs/                    # Additional documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx tsc --noEmit` - Run TypeScript type checking

## Database Schema

### `todos` table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `text` (text, the todo content)
- `is_completed` (boolean, completion status)
- `created_at` (timestamp)
- `updated_at` (timestamp, auto-updated)

### Row Level Security (RLS)
All database queries are automatically filtered by user. Users can only:
- SELECT their own todos
- INSERT todos for themselves
- UPDATE their own todos
- DELETE their own todos

## Features in Detail

### Authentication
- Email/password signup and login
- Google OAuth integration
- Session management with cookies
- Protected routes via middleware
- Automatic redirect for authenticated users

### Todo Management
- Add new todos
- Mark todos as complete/incomplete
- Edit todo text (double-click or edit button)
- Delete todos with confirmation
- Filter by All/Active/Completed
- Real-time updates across sessions
- Todo count statistics

### Dark Mode
- Automatic system preference detection
- Manual theme toggle (light/dark/system)
- Smooth theme transitions
- Persistent theme preference
- Proper contrast in all components

## Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGc...` |

Optional for OAuth:
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your production URL | `https://your-app.vercel.app` |

## Documentation

Additional documentation is available in the `docs/` directory:

- **[SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Detailed infrastructure setup instructions
- **[PROJECT_OUTLINE.md](PROJECT_OUTLINE.md)** - Complete project specification

## Troubleshooting

### Database connection issues
- Verify your Supabase credentials in `.env.local`
- Ensure the database migration has been run
- Check RLS policies are enabled

### OAuth not working
- Verify Site URL is set in Supabase Auth settings
- Check redirect URLs include your deployment URL
- Ensure `NEXT_PUBLIC_SITE_URL` is set for production

### Build failures
- Run `npx tsc --noEmit` to check for TypeScript errors
- Verify all dependencies are installed
- Check Vercel build logs for specific errors

### Dark mode issues
- Clear browser cache and local storage
- Check system theme preference settings
- Verify ThemeProvider is wrapping the app in layout.tsx

## Contributing

This is a personal project, but feel free to fork and adapt it for your own use!

## License

MIT License - feel free to use this project as a template for your own applications.

## Support

For issues, questions, or suggestions:
- Check the [SETUP_GUIDE.md](docs/SETUP_GUIDE.md) troubleshooting section
- Review the [PROJECT_OUTLINE.md](PROJECT_OUTLINE.md) for architecture details
- Open an issue on GitHub

---

**Built with ❤️ using Next.js, Supabase, and Claude Code**

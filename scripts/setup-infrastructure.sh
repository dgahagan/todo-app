#!/bin/bash
# setup-infrastructure.sh
# Automated setup script for Supabase and Vercel

set -e

echo "🚀 Todo App Infrastructure Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if required CLIs are installed
check_dependencies() {
    echo "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    print_success "Node.js found: $(node --version)"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_success "npm found: $(npm --version)"
    
    if ! command -v git &> /dev/null; then
        print_error "git is not installed."
        exit 1
    fi
    print_success "git found: $(git --version)"
    
    echo ""
}

# Setup Supabase
setup_supabase() {
    echo "📦 Supabase Setup"
    echo "-----------------"
    
    print_info "Please complete Supabase setup manually:"
    echo "  1. Go to https://supabase.com"
    echo "  2. Create a new project named 'todo-app'"
    echo "  3. Copy your project URL and anon key"
    echo ""
    
    read -p "Have you created your Supabase project? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please create a Supabase project first."
        exit 1
    fi
    
    read -p "Enter your Supabase URL: " SUPABASE_URL
    read -p "Enter your Supabase anon key: " SUPABASE_ANON_KEY
    
    # Create .env.local
    cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF
    
    print_success ".env.local created"
    
    print_info "Next, run the migration in Supabase SQL Editor:"
    echo "  1. Open SQL Editor in Supabase dashboard"
    echo "  2. Copy contents of supabase/migrations/001_initial_schema.sql"
    echo "  3. Run the migration"
    echo ""
    
    read -p "Have you run the migration? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please run the migration first."
        exit 1
    fi
    
    print_success "Supabase setup complete"
    echo ""
}

# Setup Git
setup_git() {
    echo "📝 Git Setup"
    echo "------------"
    
    if [ -d ".git" ]; then
        print_info "Git repository already initialized"
    else
        git init
        print_success "Git repository initialized"
    fi
    
    read -p "Enter your GitHub username: " GITHUB_USER
    read -p "Enter repository name (default: todo-app): " REPO_NAME
    REPO_NAME=${REPO_NAME:-todo-app}
    
    if ! git remote | grep -q "origin"; then
        git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
        print_success "Git remote added"
    else
        print_info "Git remote already exists"
    fi
    
    print_info "Create the repository on GitHub first, then:"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    echo "  git push -u origin main"
    echo ""
}

# Setup Vercel
setup_vercel() {
    echo "🔺 Vercel Setup"
    echo "---------------"
    
    if ! command -v vercel &> /dev/null; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI installed"
    else
        print_success "Vercel CLI already installed"
    fi
    
    print_info "Manual setup option:"
    echo "  1. Go to https://vercel.com"
    echo "  2. Sign up with GitHub"
    echo "  3. Import your repository"
    echo "  4. Add environment variables from .env.local"
    echo "  5. Deploy"
    echo ""
    
    print_info "OR use Vercel CLI:"
    echo "  1. Run: vercel login"
    echo "  2. Run: vercel"
    echo "  3. Follow the prompts"
    echo "  4. Add env vars: vercel env add NEXT_PUBLIC_SUPABASE_URL"
    echo "  5. Add env vars: vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
}

# Main setup flow
main() {
    check_dependencies
    
    echo "This script will help you set up:"
    echo "  • Supabase (database and auth)"
    echo "  • Git repository"
    echo "  • Vercel (deployment)"
    echo ""
    
    read -p "Continue with setup? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    
    echo ""
    setup_supabase
    setup_git
    setup_vercel
    
    echo ""
    echo "=================================="
    print_success "Setup complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Install dependencies: npm install"
    echo "  2. Run development server: npm run dev"
    echo "  3. Test the application locally"
    echo "  4. Push to GitHub: git push -u origin main"
    echo "  5. Deploy via Vercel dashboard or CLI"
    echo ""
    print_info "See SETUP_GUIDE.md for detailed instructions"
}

main
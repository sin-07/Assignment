# 🚨 Production Database Setup Required

## Current Issue
Your production deployment is failing because **SQLite databases don't persist in Vercel's serverless environment**. Each serverless function run gets a fresh filesystem, so any data stored in SQLite files is lost.

## Quick Fix Options

### Option 1: Turso (Recommended - Cloud SQLite)
Turso provides SQLite databases in the cloud, perfect for your current setup:

1. **Sign up for Turso**: https://turso.tech/
2. **Create a database**:
   ```bash
   # Install Turso CLI (Windows)
   winget install tursodatabase.turso-cli
   
   # Or download from: https://github.com/tursodatabase/turso-cli/releases
   
   # Authenticate
   turso auth signup
   
   # Create database
   turso db create kandid-production
   
   # Get connection info
   turso db show kandid-production
   ```

3. **Update Vercel Environment Variables**:
   ```
   DATABASE_URL=libsql://your-database-name.turso.io
   DATABASE_AUTH_TOKEN=your-auth-token
   ```

4. **Run migrations**:
   ```bash
   npx drizzle-kit push
   ```

### Option 2: Vercel Postgres (Alternative)
1. Go to Vercel Dashboard → Storage → Create Database
2. Select PostgreSQL
3. Update your schema to use PostgreSQL
4. Run migrations

### Option 3: Supabase (PostgreSQL)
1. Create account at supabase.com
2. Create new project
3. Get connection string
4. Update environment variables

## Current Environment Variables Needed in Vercel

Go to Vercel Dashboard → Project Settings → Environment Variables:

```bash
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-turso-token
NEXTAUTH_URL=https://assignment-pied-six.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret
```

## Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add to Authorized redirect URIs:
   - `https://assignment-pied-six.vercel.app/api/auth/google/callback`

## Testing After Setup
1. Try registration: https://assignment-pied-six.vercel.app/register
2. Try Google OAuth: https://assignment-pied-six.vercel.app/login
3. Check Vercel function logs for any remaining errors

## Why This Happened
- **Serverless = Stateless**: Each function invocation gets a clean environment
- **No Persistent Storage**: Files written to the filesystem disappear after the function ends
- **SQLite Limitation**: SQLite files can't persist across serverless function calls

The new database configuration with LibSQL will work once you set up a cloud database! 🚀

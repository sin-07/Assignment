# Production Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
1. GitHub account
2. Vercel account (sign up at vercel.com)
3. Push your code to GitHub

### Step 1: Prepare Repository
```bash
# Add all changes to git
git add .
git commit -m "Prepare for production deployment"
git push origin master
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure settings
5. Click "Deploy"

### Step 3: Configure Environment Variables
In Vercel Dashboard > Project Settings > Environment Variables, add:

```
DATABASE_URL=file:./local.db
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-random-secret-here
```

### Step 4: Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel URL to "Authorized redirect URIs":
   - `https://your-app-name.vercel.app/api/auth/google/callback`

### Step 5: Database Setup for Production
For production, you'll need a proper database. Options:

#### Option A: Turso (Recommended for SQLite)
```bash
# Install Turso CLI
npm install -g @tursodatabase/cli

# Create database
turso db create kandid-app

# Get connection details
turso db show kandid-app
```

Then update your environment variables:
```
DATABASE_URL=libsql://your-database-url.turso.io
DATABASE_AUTH_TOKEN=your-auth-token
```

#### Option B: Vercel Postgres
1. In Vercel Dashboard, go to Storage tab
2. Create a new Postgres database
3. Update your schema to use PostgreSQL
4. Run migrations

## 🛠️ Alternative Deployment Options

### Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Railway
1. Connect GitHub repo to Railway
2. Railway will auto-deploy
3. Add environment variables in Railway dashboard

### Self-Hosted (VPS/Server)
```bash
# On your server
git clone your-repo
cd your-repo
npm install
npm run build
npm start
```

## 🔧 Production Checklist

- [ ] Environment variables configured
- [ ] Google OAuth redirect URLs updated
- [ ] Database properly configured
- [ ] HTTPS enabled
- [ ] Domain configured (optional)
- [ ] Error monitoring setup (optional)
- [ ] Analytics setup (optional)

## 🚨 Important Notes

1. **Database**: SQLite files don't persist in serverless environments. Use Turso, PostgreSQL, or MySQL for production.

2. **Environment Variables**: Never commit `.env.local` to git. Always configure environment variables in your deployment platform.

3. **Google OAuth**: Update your OAuth settings with production URLs.

4. **HTTPS**: Most OAuth providers require HTTPS in production.

## 🔍 Troubleshooting

- **"Cannot find module"**: Run `npm install` on the deployment platform
- **OAuth errors**: Check redirect URIs in Google Console
- **Database errors**: Ensure environment variables are set correctly
- **Build failures**: Check the build logs in your deployment platform

Your app should be live at: `https://your-app-name.vercel.app`

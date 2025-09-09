# 🚀 Vercel Production Setup Guide

Your app is deployed at: **https://assignment-pied-six.vercel.app**

## ⚙️ Immediate Setup Required

### 1. Configure Environment Variables in Vercel

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

Add these variables:

```bash
DATABASE_URL=./local.db
NEXTAUTH_URL=https://assignment-pied-six.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXTAUTH_SECRET=kandid-assignment-production-secret-2025
```

### 2. Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID
3. Add these to **Authorized redirect URIs**:
   - `https://assignment-pied-six.vercel.app/api/auth/google/callback`
4. Save changes

### 3. Test Your Deployment

1. Visit: https://assignment-pied-six.vercel.app
2. Try Google OAuth login
3. Test registration with email/password
4. Verify all routes work correctly

## 🔄 Redeploy After Changes

After updating environment variables in Vercel:

```bash
# Force a new deployment
vercel --prod --force
```

Or simply push changes to your GitHub repository (if connected).

## 🗄️ Database Setup (Optional but Recommended)

For production persistence, consider upgrading to a cloud database:

### Option 1: Turso (SQLite Cloud)
```bash
npm install -g @tursodatabase/cli
turso auth signup
turso db create kandid-production
turso db show kandid-production
```

### Option 2: Vercel Postgres
1. In Vercel Dashboard → Storage → Create Database
2. Select Postgres
3. Copy connection string to `DATABASE_URL`

## 🎯 Current Status

- ✅ **Deployed**: https://assignment-pied-six.vercel.app
- ⏳ **Environment Variables**: Need to be configured in Vercel
- ⏳ **Google OAuth**: Need to update redirect URIs
- ⏳ **Database**: Using temporary SQLite (will reset on each deployment)

## 🚨 Important Notes

1. **Database Persistence**: Current SQLite database will reset on each deployment. Set up cloud database for permanent data storage.

2. **Environment Variables**: Must be configured in Vercel Dashboard for the app to work properly.

3. **Google OAuth**: Must update redirect URIs or OAuth will fail.

Your application should be fully functional once these steps are completed! 🎉

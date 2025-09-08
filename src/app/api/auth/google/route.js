import { NextResponse } from 'next/server'

export async function GET() {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const APP_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  if (!GOOGLE_CLIENT_ID) {
    return NextResponse.redirect(`${APP_BASE_URL}/login?error=google_oauth_not_configured`)
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${APP_BASE_URL}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  
  return NextResponse.redirect(authUrl)
}

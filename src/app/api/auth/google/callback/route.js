import { NextRequest, NextResponse } from 'next/server'
import { registerOrLoginUser } from '@/actions/auth'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const authCode = searchParams.get('code')
  const authError = searchParams.get('error')

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  if (authError) {
    return NextResponse.redirect(`${baseUrl}/login?error=google_oauth_denied`)
  }

  if (!authCode) {
    return NextResponse.redirect(`${baseUrl}/login?error=no_code`)
  }

  try {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      throw new Error('Google OAuth not properly configured')
    }

    // Exchange the auth code for an access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Fetch user profile from Google
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const googleProfile = await profileResponse.json()

    // Register/login user in database before redirecting
    try {
      await registerOrLoginUser({
        name: `${googleProfile.given_name || ''} ${googleProfile.family_name || ''}`.trim(),
        email: googleProfile.email,
        id: googleProfile.id
      })
    } catch (dbError) {
      console.error('Database error during OAuth registration:', dbError)
      // Continue with the flow even if database fails
    }

    // Build redirect URL with user data for the success page
    const userParams = new URLSearchParams({
      id: googleProfile.id,
      firstName: encodeURIComponent(googleProfile.given_name || ''),
      lastName: encodeURIComponent(googleProfile.family_name || ''),
      email: encodeURIComponent(googleProfile.email)
    })

    return NextResponse.redirect(`${baseUrl}/login-success?${userParams.toString()}`)
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(`${baseUrl}/login?error=google_oauth_failed`)
  }
}

// Custom Google OAuth setup - rolled my own instead of using NextAuth
// Honestly NextAuth was overkill for what I needed here
import { redirect } from 'next/navigation'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const APP_BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

// Generate the Google OAuth URL for login redirect
export const createGoogleAuthUrl = () => {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not configured')
  }

  const oauthParams = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${APP_BASE_URL}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams.toString()}`
  return googleAuthUrl
}

// Process the callback from Google with the auth code
export const processGoogleCallback = async (authCode: string) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth not properly configured')
  }

  try {
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
        redirect_uri: `${APP_BASE_URL}/api/auth/google/callback`,
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

    return {
      id: googleProfile.id,
      email: googleProfile.email,
      name: googleProfile.name,
      firstName: googleProfile.given_name || '',
      lastName: googleProfile.family_name || '',
      image: googleProfile.picture,
    }
  } catch (error) {
    throw error
  }
}

"use client"

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { storeUserProfile } from '@/lib/userStorage'

function LoginSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle auth success redirect and store user data
    // This page gets hit after both form login and Google OAuth
    const userId = searchParams.get('id')
    const userFirstName = searchParams.get('firstName')
    const userLastName = searchParams.get('lastName')
    const userEmail = searchParams.get('email')

    if (userId && userFirstName && userEmail) {
      const authenticatedUser = {
        id: parseInt(userId),
        firstName: decodeURIComponent(userFirstName),
        lastName: decodeURIComponent(userLastName || ''),
        email: decodeURIComponent(userEmail)
      }

      storeUserProfile(authenticatedUser)
      router.push('/leads')
    } else {
      // No valid user data, redirect to login
      router.push('/login')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}

export default function LoginSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginSuccessContent />
    </Suspense>
  )
}

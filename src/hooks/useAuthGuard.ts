import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/userStorage'

// Custom hook for protecting routes on the client side
// This provides an additional layer of protection beyond middleware
export const useAuthGuard = (redirectTo: string = '/login') => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser()
      
      if (!currentUser) {
        // If no user data found, redirect to login
        router.push(redirectTo)
        return false
      }
      
      return true
    }

    // Check authentication immediately
    const isAuthenticated = checkAuth()
    
    // Also check periodically in case localStorage is cleared
    const authCheckInterval = setInterval(checkAuth, 5000) // Check every 5 seconds
    
    return () => {
      clearInterval(authCheckInterval)
    }
  }, [router, redirectTo])
}

// Hook to redirect authenticated users away from auth pages
export const useGuestGuard = (redirectTo: string = '/leads') => {
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    
    if (currentUser) {
      // If user is already logged in, redirect away from auth pages
      router.push(redirectTo)
    }
  }, [router, redirectTo])
}

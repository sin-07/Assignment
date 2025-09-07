// User data structure for the app
// Kept it simple since we're not using any fancy state management
export interface UserData {
  id: number
  firstName: string
  lastName: string
  email: string
}

// Store user info in localStorage after login
// I know localStorage isn't the most secure but it works for this demo
export const storeUserProfile = (userProfile: UserData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUserData', JSON.stringify(userProfile))
  }
}

// Retrieve currently logged in user data
export const getCurrentUser = (): UserData | null => {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('currentUserData')
    return storedData ? JSON.parse(storedData) : null
  }
  return null
}

// Clear user session data on logout
export const clearUserSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUserData')
  }
}

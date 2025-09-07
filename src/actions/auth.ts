'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

// Handle user login authentication
// I went with a simple email/password approach since it's more straightforward
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Extract credentials from the form submission
    const userEmail = formData.get('email') as string
    const userPassword = formData.get('password') as string
    
    if (!userEmail || !userPassword) {
      return 'Please fill in all fields.'
    }

    // Query the database to find matching user
    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail))
      .limit(1)

    if (!foundUser[0] || !foundUser[0].password) {
      return 'Invalid credentials.'
    }

    // Check if password matches the stored hash
    const passwordMatches = await bcrypt.compare(userPassword, foundUser[0].password)
    
    if (!passwordMatches) {
      return 'Invalid credentials.'
    }
    
    // Split the stored name into first and last names
    // This is a bit hacky but works for most cases
    const storedName = foundUser[0].name || ''
    const nameComponents = storedName.trim().split(' ')
    const userFirstName = nameComponents[0] || 'User'
    const userLastName = nameComponents.length > 1 ? nameComponents.slice(1).join(' ') : ''
    
    // Bundle up user data for the redirect
    const userProfile = {
      id: foundUser[0].id,
      firstName: userFirstName,
      lastName: userLastName || 'User',
      email: foundUser[0].email
    }
    
    // Build the success page URL with user data as query params
    const redirectParams = new URLSearchParams({
      id: userProfile.id.toString(),
      firstName: encodeURIComponent(userProfile.firstName),
      lastName: encodeURIComponent(userProfile.lastName),
      email: encodeURIComponent(userProfile.email)
    })
    
    redirect(`/login-success?${redirectParams.toString()}`)
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('NEXT_REDIRECT')) {
        // This is actually a successful redirect, not an error
        throw error
      }
      return 'Something went wrong: ' + error.message
    }
    throw error
  }
}

// Create new user account 
// Kept this pretty straightforward - hash password, check for duplicates, insert to DB
export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const userFirstName = formData.get('firstName') as string
    const userLastName = formData.get('lastName') as string
    const userEmail = formData.get('email') as string
    const userPassword = formData.get('password') as string

    if (!userFirstName || !userLastName || !userEmail || !userPassword) {
      return 'All fields are required.'
    }

    // Combine names into a single field for storage
    const fullUserName = `${userFirstName} ${userLastName}`.trim()

    // Make sure email isn't already taken
    const duplicateUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail))
      .limit(1)

    if (duplicateUser.length > 0) {
      return 'User with this email already exists.'
    }

    // Hash the password before storing - basic security
    const securePassword = await bcrypt.hash(userPassword, 12)

    // Insert the new user record
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name: fullUserName,
      email: userEmail,
      password: securePassword,
    })

    // Send them back to login with a success message
    redirect('/login?message=Registration successful! Please sign in.')
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('NEXT_REDIRECT')) {
        // This is actually a successful redirect, not an error
        throw error
      }
      return `Registration failed: ${error.message}`
    }
    return 'An error occurred during registration.'
  }
}

export async function logout() {
  redirect('/login')
}

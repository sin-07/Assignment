'use server'

import { db, dbClient } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

// Initialize database tables for production
async function initializeDatabaseTables() {
  try {
    // Check if we're in production and need to create tables
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('Initializing database tables for production...')
      
      // Try to query users table first to see if it exists
      try {
        await db.select().from(users).limit(1)
        console.log('Database tables already exist')
        return
      } catch (error: any) {
        // Table doesn't exist, we need to create it
        console.log('Creating database tables...')
      }
      
      // For LibSQL, we need to use the client directly for CREATE TABLE statements
      
      // Create users table
      await dbClient.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT,
          email TEXT NOT NULL,
          email_verified INTEGER,
          image TEXT,
          password TEXT,
          created_at INTEGER,
          updated_at INTEGER
        )
      `)
      
      // Create campaigns table
      await dbClient.execute(`
        CREATE TABLE IF NOT EXISTS campaigns (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          status TEXT DEFAULT 'active' NOT NULL,
          user_id TEXT NOT NULL,
          total_leads INTEGER DEFAULT 0 NOT NULL,
          request_sent INTEGER DEFAULT 0 NOT NULL,
          request_accepted INTEGER DEFAULT 0 NOT NULL,
          request_replied INTEGER DEFAULT 0 NOT NULL,
          created_at INTEGER,
          updated_at INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `)
      
      // Create leads table
      await dbClient.execute(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          email TEXT,
          subtitle TEXT,
          avatar TEXT,
          campaign_id TEXT NOT NULL,
          status TEXT DEFAULT 'pending' NOT NULL,
          status_type TEXT DEFAULT 'pending' NOT NULL,
          company TEXT,
          created_at INTEGER,
          updated_at INTEGER,
          FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
        )
      `)
      
      console.log('Database tables created successfully')
    }
  } catch (error: any) {
    console.error('Error initializing database tables:', error)
    // Don't throw the error, just log it - we'll try to continue
  }
}

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
    // Initialize database tables in production if needed
    await initializeDatabaseTables()
    
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

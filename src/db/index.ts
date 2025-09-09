import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// Temporary solution for production: use in-memory database
// This will work but data won't persist between deployments
const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production'

let client

if (isProduction && !process.env.DATABASE_URL?.startsWith('libsql://')) {
  // Production without proper database URL - use in-memory
  console.warn('Using in-memory database in production. Data will not persist!')
  client = createClient({
    url: ':memory:',
  })
} else {
  // Use the configured database URL or local file
  client = createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })
}

export const db = drizzle(client, { schema })
export const dbClient = client // Export client for direct SQL operations
export type DB = typeof db

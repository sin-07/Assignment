import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// Database configuration with better production handling
const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production'
const databaseUrl = process.env.DATABASE_URL || 'file:local.db'

let client

// For production, we need to ensure tables are created each time
// since in-memory databases don't persist between function calls
if (isProduction && !databaseUrl.startsWith('libsql://')) {
  console.log('Production: Using file-based SQLite with /tmp directory')
  client = createClient({
    url: 'file:/tmp/production.db', // Use /tmp for serverless file storage
  })
} else if (databaseUrl.startsWith('libsql://')) {
  // External LibSQL database (Turso)
  client = createClient({
    url: databaseUrl,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })
} else {
  // Local development
  client = createClient({
    url: databaseUrl,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })
}

export const db = drizzle(client, { schema })
export const dbClient = client // Export client for direct SQL operations
export type DB = typeof db

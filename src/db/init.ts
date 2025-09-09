import { db } from './index'
import { users, campaigns, leads } from './schema'

export async function initializeDatabase() {
  try {
    // Create tables if they don't exist
    // This is a simple approach for SQLite
    await db.run(`
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

    await db.run(`
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

    await db.run(`
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

    console.log('Database tables initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize database:', error)
    return false
  }
}

import { db } from '@/db'
import { users, accounts, sessions, leads, campaigns } from '@/db/schema'

async function resetDatabase() {
  try {
    console.log('🗑️  Clearing all tables...')
    
    // Delete all data from tables (in order to respect foreign keys)
    await db.delete(sessions)
    console.log('✅ Cleared sessions')
    
    await db.delete(accounts)
    console.log('✅ Cleared accounts')
    
    await db.delete(leads)
    console.log('✅ Cleared leads')
    
    await db.delete(campaigns)
    console.log('✅ Cleared campaigns')
    
    await db.delete(users)
    console.log('✅ Cleared users')
    
    console.log('🎉 Database reset complete!')
    
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  }
}

resetDatabase()

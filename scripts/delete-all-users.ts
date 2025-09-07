import { db } from '@/db'
import { users } from '@/db/schema'

async function deleteAllUsers() {
  try {
    console.log('🗑️  Deleting all users...')
    
    const result = await db.delete(users)
    
    console.log('✅ All users deleted successfully!')
    
  } catch (error) {
    console.error('❌ Error deleting users:', error)
  }
}

deleteAllUsers()

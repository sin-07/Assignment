import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

async function deleteUser() {
  const userEmail = process.argv[2]
  
  if (!userEmail) {
    console.log('❌ Please provide a user email')
    console.log('Usage: npm run delete-user user@example.com')
    process.exit(1)
  }

  try {
    console.log(`🗑️  Deleting user: ${userEmail}`)
    
    const result = await db
      .delete(users)
      .where(eq(users.email, userEmail))
    
    console.log('✅ User deleted successfully!')
    
  } catch (error) {
    console.error('❌ Error deleting user:', error)
  }
}

deleteUser()

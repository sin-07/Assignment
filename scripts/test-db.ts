import { db } from '../src/db'
import { users } from '../src/db/schema'

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try a simple query to check if the users table exists
    const result = await db.select().from(users).limit(1)
    console.log('✅ Database connection successful!')
    console.log('Users table accessible, found', result.length, 'users')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error)
    
    if (error instanceof Error) {
      if (error.message.includes('no such table')) {
        console.log('\n🔧 Solution: Run database migrations')
        console.log('npm run db:migrate')
      }
    }
  }
  
  process.exit(0)
}

testConnection()

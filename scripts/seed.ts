import { db } from '../src/db'
import { users, campaigns, leads } from '../src/db/schema'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    console.log('🌱 Seeding database...')

    // Create a demo user
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    const [user] = await db.insert(users).values({
      id: crypto.randomUUID(),
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
    }).returning()

    console.log('✅ Demo user created:', user.email)

    // Create demo campaigns
    const campaignData = [
      {
        id: crypto.randomUUID(),
        name: 'Q4 Product Launch Campaign',
        status: 'active',
        userId: user.id,
        totalLeads: 150,
        requestSent: 120,
        requestAccepted: 45,
        requestReplied: 23,
      },
      {
        id: crypto.randomUUID(),
        name: 'Holiday Marketing Campaign',
        status: 'paused',
        userId: user.id,
        totalLeads: 89,
        requestSent: 75,
        requestAccepted: 32,
        requestReplied: 18,
      },
    ]

    const createdCampaigns = await db.insert(campaigns).values(campaignData).returning()
    console.log('✅ Created campaigns:', createdCampaigns.length)

    // Create demo leads for the first campaign
    const leadData = Array.from({ length: 10 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: `Lead ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      subtitle: `Software Engineer at Company ${i + 1}`,
      company: `Company ${i + 1}`,
      campaignId: createdCampaigns[0].id,
      status: ['pending', 'contacted', 'replied', 'connected'][i % 4],
      statusType: ['pending', 'sent', 'replied', 'accepted'][i % 4],
    }))

    await db.insert(leads).values(leadData)
    console.log('✅ Created leads:', leadData.length)

    console.log('🎉 Database seeded successfully!')
    console.log('📧 Demo login: demo@example.com / password123')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

seed()

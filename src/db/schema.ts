import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('email_verified'),
  image: text('image'),
  password: text('password'),
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
})

// Campaign and Leads tables
export const campaigns = sqliteTable('campaigns', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull().default('active'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  totalLeads: integer('total_leads').notNull().default(0),
  requestSent: integer('request_sent').notNull().default(0),
  requestAccepted: integer('request_accepted').notNull().default(0),
  requestReplied: integer('request_replied').notNull().default(0),
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
})

export const leads = sqliteTable('leads', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  subtitle: text('subtitle'),
  avatar: text('avatar'),
  campaignId: text('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('pending'),
  statusType: text('status_type').notNull().default('pending'),
  company: text('company'),
  createdAt: integer('created_at').$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at').$defaultFn(() => Date.now()),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Campaign = typeof campaigns.$inferSelect
export type NewCampaign = typeof campaigns.$inferInsert
export type Lead = typeof leads.$inferSelect
export type NewLead = typeof leads.$inferInsert

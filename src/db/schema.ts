import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import type { AdapterAccount } from "next-auth/adapters"

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

export const accounts = sqliteTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = sqliteTable('sessions', {
  sessionToken: text('session_token').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires').notNull(),
})

export const verificationTokens = sqliteTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires').notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

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

import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { init } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'

const createId = init({
  length: 6,
})

export const users = pgTable(
  'users',
  {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar({ length: 25 }).unique().notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    created_at: timestamp({ mode: 'date' }).defaultNow().notNull(),
    updated_at: timestamp({ mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex('id_idx').on(table.id)],
)

export const usersRelations = relations(users, ({ many }) => ({
  shares: many(shares),
}))

export const shares = pgTable(
  'shares',
  {
    id: uuid().defaultRandom().primaryKey(),
    slug: varchar({ length: 6 })
      .$defaultFn(() => createId())
      .unique(),
    title: varchar({ length: 255 }),
    content: text().notNull(),
    is_public: boolean().default(false).notNull(),
    expires_at: timestamp({ mode: 'date' }),
    creator_id: uuid().references(() => users.id, {
      onDelete: 'cascade',
    }),
    created_at: timestamp({ mode: 'date' }).defaultNow().notNull(),
    updated_at: timestamp({ mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex('slug_idx').on(table.slug)],
)

export const sharesRelations = relations(shares, ({ one }) => ({
  creator: one(users, {
    fields: [shares.creator_id],
    references: [users.id],
  }),
}))

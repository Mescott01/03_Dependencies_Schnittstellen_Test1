import { text } from "drizzle-orm/mysql-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const postsTable = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
});

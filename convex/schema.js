import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  videos: defineTable({
    title: v.string(),
    thumbnail: v.string(),
    prompt: v.string(),
    video: v.string(),
  }).searchIndex("search_body", {
    searchField: "title",
  }),
});

export default schema;

import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  videos: defineTable({
    title: v.string(),
    thumbnail: v.id("_storage"),
    prompt: v.string(),
    video: v.id("_storage"),
    creator: v.id("users"),
  })
    .index("by_creator", ["creator"])
    .searchIndex("search_body", {
      searchField: "title",
      filterFields: ["creator"],
    }),
});

export default schema;

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
    isLiked: v.optional(v.boolean()),
  })
    .index("by_creator", ["creator"])
    .index("by_creator_liked", ["creator", "isLiked"])
    .searchIndex("search_body", {
      searchField: "title",
      filterFields: ["creator"],
    }),
});

export default schema;

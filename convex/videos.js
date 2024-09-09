import { v } from "convex/values";
import { query } from "./_generated/server";

export const getVideos = query({
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").collect();
    return videos;
  },
});

export const searchVideos = query({
  args: { query_field: v.string() },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("videos")
      .withSearchIndex("search_body", (q) =>
        q.search("title", args.query_field)
      )
      .take(10);
    return res || [];
  },
});

import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getVideos = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_creator", (q) => q.eq("creator", userId))
      .collect();
    return Promise.all(
      videos.map(async (video) => ({
        ...video,
        video: await ctx.storage.getUrl(video.video),
        thumbnail: await ctx.storage.getUrl(video.thumbnail),
      }))
    );
  },
});

export const searchVideos = query({
  args: { query_field: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }
    const res = await ctx.db
      .query("videos")
      .withIndex("by_creator", (q) => q.eq("creator", userId))
      .withSearchIndex("search_body", (q) =>
        q.search("title", args.query_field)
      )
      .take(10);
    return res || [];
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const insertData = mutation({
  args: {
    title: v.string(),
    thumbnail: v.id("_storage"),
    prompt: v.string(),
    video: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }
    await ctx.db.insert("videos", {
      title: args.title,
      thumbnail: args.thumbnail,
      prompt: args.prompt,
      video: args.video,
      creator: userId,
    });
  },
});

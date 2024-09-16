import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserInfo = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    // Get user info
    const user = await ctx.db.get(userId);

    // Get user posts count
    const userPosts = await ctx.db
      .query("videos")
      .withIndex("by_creator", (q) => q.eq("creator", userId))
      .collect();

    return {
      ...user,
      userPostsCount: userPosts.length,
    };
  },
});

export const updateUserInfo = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    await ctx.db.patch(userId, {
      name: args.name,
      phone: args.phone,
    });

    return { success: true };
  },
});

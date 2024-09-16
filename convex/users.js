import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const getUserInfo = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Client is not authenticated!");
    }

    //  Get user posts and number of bookmarks
    const user = await ctx.db.get(userId);
    return user;
  },
});

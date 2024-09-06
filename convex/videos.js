import { query } from "./_generated/server";

export const getVideos = query({
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").collect();
    return videos;
  },
});

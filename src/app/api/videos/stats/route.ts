import { NextRequest, NextResponse } from "next/server";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;
const BATCH_SIZE = 50;

export async function GET(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { message: "YouTube API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json(
        { message: "Video IDs are required" },
        { status: 400 }
      );
    }

    const allVideoIds = ids.split(",");
    const stats: Array<{
      videoId: string;
      viewCount: number;
      likeCount: number;
      commentCount: number;
    }> = [];

    for (let i = 0; i < allVideoIds.length; i += BATCH_SIZE) {
      const batch = allVideoIds.slice(i, i + BATCH_SIZE);
      
      const res = await fetch(
        `${YOUTUBE_API_BASE}/videos?part=statistics&id=${batch.join(",")}&key=${API_KEY}`
      );
      const data = await res.json();

      const batchStats = (data.items || []).map(
        (item: Record<string, unknown>) => {
          const statistics = item.statistics as Record<string, string>;
          return {
            videoId: item.id as string,
            viewCount: parseInt(statistics.viewCount || "0"),
            likeCount: parseInt(statistics.likeCount || "0"),
            commentCount: parseInt(statistics.commentCount || "0"),
          };
        }
      );

      stats.push(...batchStats);
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Video stats API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch video stats" },
      { status: 500 }
    );
  }
}

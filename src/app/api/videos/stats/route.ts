import { NextRequest, NextResponse } from "next/server";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;

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

    const videoIds = ids.split(",").slice(0, 50); // Max 50 at a time

    const res = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );
    const data = await res.json();

    const stats = (data.items || []).map(
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

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Video stats API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch video stats" },
      { status: 500 }
    );
  }
}

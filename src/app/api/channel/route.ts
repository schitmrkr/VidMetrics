import { NextRequest, NextResponse } from "next/server";
import { parseChannelInput } from "@/models/services/youtube";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { message: "YouTube API key not configured" },
        { status: 500 }
      );
    }

    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { message: "Channel URL is required" },
        { status: 400 }
      );
    }

    const parsed = parseChannelInput(url);
    let channelId: string | null = null;

    if (parsed.type === "id") {
      channelId = parsed.value;
    } else if (parsed.type === "handle") {
      // Resolve handle to channel ID
      const searchRes = await fetch(
        `${YOUTUBE_API_BASE}/channels?part=id&forHandle=${parsed.value}&key=${API_KEY}`
      );
      const searchData = await searchRes.json();

      if (searchData.items?.length > 0) {
        channelId = searchData.items[0].id;
      }
    } else {
      // Try custom URL search
      const searchRes = await fetch(
        `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(parsed.value)}&maxResults=1&key=${API_KEY}`
      );
      const searchData = await searchRes.json();

      if (searchData.items?.length > 0) {
        channelId = searchData.items[0].snippet.channelId;
      }
    }

    if (!channelId) {
      return NextResponse.json(
        { message: "Channel not found" },
        { status: 404 }
      );
    }

    // Fetch full channel details
    const channelRes = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      return NextResponse.json(
        { message: "Channel not found" },
        { status: 404 }
      );
    }

    const item = channelData.items[0];

    return NextResponse.json({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      customUrl: item.snippet.customUrl || "",
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url || "",
      bannerUrl: item.brandingSettings?.image?.bannerExternalUrl || "",
      subscriberCount: parseInt(item.statistics.subscriberCount || "0"),
      videoCount: parseInt(item.statistics.videoCount || "0"),
      viewCount: parseInt(item.statistics.viewCount || "0"),
      uploadsPlaylistId:
        item.contentDetails?.relatedPlaylists?.uploads || "",
    });
  } catch (error) {
    console.error("Channel API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch channel data" },
      { status: 500 }
    );
  }
}

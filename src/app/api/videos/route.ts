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
    const channelId = searchParams.get("channelId");
    const pageToken = searchParams.get("pageToken") || "";

    if (!channelId) {
      return NextResponse.json(
        { message: "channelId is required" },
        { status: 400 }
      );
    }

    // First, get the uploads playlist ID
    const channelRes = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.length) {
      return NextResponse.json(
        { message: "Channel not found" },
        { status: 404 }
      );
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Fetch videos from uploads playlist (1 quota unit vs 100 for search)
    const params = new URLSearchParams({
      part: "snippet",
      playlistId: uploadsPlaylistId,
      maxResults: "50",
      key: API_KEY,
    });

    if (pageToken) {
      params.set("pageToken", pageToken);
    }

    const videosRes = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?${params}`
    );
    const videosData = await videosRes.json();

    const videos = (videosData.items || []).map(
      (item: Record<string, unknown>) => {
        const snippet = item.snippet as Record<string, unknown>;
        const resourceId = snippet.resourceId as Record<string, string>;
        const thumbnails = snippet.thumbnails as Record<
          string,
          Record<string, unknown>
        >;

        return {
          id: resourceId.videoId,
          title: snippet.title as string,
          description: snippet.description as string,
          thumbnailUrl:
            (thumbnails?.medium?.url as string) ||
            (thumbnails?.default?.url as string) ||
            "",
          publishedAt: snippet.publishedAt as string,
          channelId: snippet.channelId as string,
        };
      }
    );

    return NextResponse.json({
      videos,
      nextPageToken: videosData.nextPageToken || null,
    });
  } catch (error) {
    console.error("Videos API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

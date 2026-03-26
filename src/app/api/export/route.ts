import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { videos, channelTitle } = await request.json();

    if (!videos || !Array.isArray(videos)) {
      return NextResponse.json(
        { message: "Videos array is required" },
        { status: 400 }
      );
    }

    const headers = [
      "Video Title",
      "URL",
      "Upload Date",
      "Views",
      "Likes",
      "Comments",
      "Engagement Rate (%)",
    ];

    const rows = videos.map(
      (video: {
        title: string;
        id: string;
        publishedAt: string;
        viewCount: number;
        likeCount: number;
        commentCount: number;
        engagementRate: number;
      }) => [
        `"${video.title.replace(/"/g, '""')}"`,
        `https://youtube.com/watch?v=${video.id}`,
        video.publishedAt,
        video.viewCount.toString(),
        video.likeCount.toString(),
        video.commentCount.toString(),
        video.engagementRate.toString(),
      ]
    );

    const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join(
      "\n"
    );

    const filename = channelTitle
      ? `vidmetrics-${channelTitle.replace(/[^a-zA-Z0-9]/g, "-")}`
      : "vidmetrics-export";

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export API error:", error);
    return NextResponse.json(
      { message: "Failed to generate export" },
      { status: 500 }
    );
  }
}

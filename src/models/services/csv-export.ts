import type { VideoWithStats } from "@/models/types/video";

/**
 * Generate CSV content from video data.
 */
export function generateCSV(videos: VideoWithStats[]): string {
  const headers = [
    "Video Title",
    "URL",
    "Upload Date",
    "Views",
    "Likes",
    "Comments",
    "Engagement Rate (%)",
  ];

  const rows = videos.map((video) => [
    `"${video.title.replace(/"/g, '""')}"`,
    `https://youtube.com/watch?v=${video.id}`,
    video.publishedAt,
    video.viewCount.toString(),
    video.likeCount.toString(),
    video.commentCount.toString(),
    video.engagementRate.toString(),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Download CSV as a file.
 */
export function downloadCSV(
  videos: VideoWithStats[],
  filename = "vidmetrics-export"
): void {
  const csv = generateCSV(videos);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

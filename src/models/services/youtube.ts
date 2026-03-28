import type { Channel } from "@/models/types/channel";
import type { Video, VideoStats } from "@/models/types/video";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

/**
 * Resolves a YouTube channel URL/handle to a channel ID.
 * Supports formats: /channel/UC..., /@handle, /c/CustomName
 */
export function parseChannelInput(input: string): {
  type: "id" | "handle" | "customUrl";
  value: string;
} {
  const trimmed = input.trim();

  // Direct channel ID
  const channelIdMatch = trimmed.match(
    /(?:youtube\.com\/channel\/|^)(UC[\w-]{22})$/
  );
  if (channelIdMatch) {
    return { type: "id", value: channelIdMatch[1] };
  }

  // Handle format: @username
  const handleMatch = trimmed.match(
    /(?:youtube\.com\/)?@([\w.-]+)/
  );
  if (handleMatch) {
    return { type: "handle", value: `@${handleMatch[1]}` };
  }

  // Custom URL: /c/CustomName
  const customMatch = trimmed.match(
    /youtube\.com\/c\/([\w.-]+)/
  );
  if (customMatch) {
    return { type: "customUrl", value: customMatch[1] };
  }

  // Fallback: treat as handle if starts with @, else as custom URL
  if (trimmed.startsWith("@")) {
    return { type: "handle", value: trimmed };
  }

  return { type: "customUrl", value: trimmed };
}

/**
 * Validates a YouTube channel URL or handle.
 */
export function validateChannelInput(input: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, error: "Enter a YouTube channel URL, @handle, or channel ID" };
  }

  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/UC[\w-]{22}|@[\w.-]+|c\/[\w.-]+)/;
  const handlePattern = /^@[\w.-]+$/;
  const channelIdPattern = /^UC[\w-]{22}$/;

  if (
    youtubeUrlPattern.test(trimmed) ||
    handlePattern.test(trimmed) ||
    channelIdPattern.test(trimmed)
  ) {
    return { valid: true };
  }

  return {
    valid: false,
    error: "Invalid format. Use: youtube.com/@handle, youtube.com/channel/ID, or @handle",
  };
}

/**
 * Fetches channel metadata from the API route.
 */
export async function fetchChannel(input: string): Promise<Channel> {
  const response = await fetch("/api/channel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: input }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch channel");
  }

  return response.json();
}

/**
 * Fetches videos for a channel from the API route.
 */
export async function fetchVideos(
  channelId: string,
  pageToken?: string
): Promise<{ videos: Video[]; nextPageToken?: string }> {
  const params = new URLSearchParams({ channelId });
  if (pageToken) params.set("pageToken", pageToken);

  const response = await fetch(`/api/videos?${params}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch videos");
  }

  return response.json();
}

/**
 * Fetches detailed statistics for a batch of video IDs.
 */
export async function fetchVideoStats(
  videoIds: string[]
): Promise<VideoStats[]> {
  const params = new URLSearchParams({ ids: videoIds.join(",") });
  const response = await fetch(`/api/videos/stats?${params}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch video stats");
  }

  return response.json();
}

/**
 * Calculates engagement rate for a video.
 */
export function calculateEngagementRate(
  likes: number,
  comments: number,
  views: number
): number {
  if (views === 0) return 0;
  return Number(((likes + comments) / views * 100).toFixed(2));
}

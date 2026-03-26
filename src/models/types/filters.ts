export type SortOption =
  | "views_desc"
  | "views_asc"
  | "engagement_desc"
  | "engagement_asc"
  | "date_desc"
  | "date_asc"
  | "likes_desc"
  | "comments_desc";

export type DateRange =
  | "7d"
  | "30d"
  | "90d"
  | "1y"
  | "all"
  | "custom";

export interface CustomDateRange {
  start: string; // ISO date
  end: string;   // ISO date
}

export interface FilterState {
  sortBy: SortOption;
  dateRange: DateRange;
  customDateRange?: CustomDateRange;
  searchQuery: string;
}

export const DEFAULT_FILTERS: FilterState = {
  sortBy: "date_desc",
  dateRange: "all",
  searchQuery: "",
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "views_desc", label: "Most Viewed" },
  { value: "views_asc", label: "Least Viewed" },
  { value: "engagement_desc", label: "Highest Engagement" },
  { value: "engagement_asc", label: "Lowest Engagement" },
  { value: "date_desc", label: "Newest First" },
  { value: "date_asc", label: "Oldest First" },
  { value: "likes_desc", label: "Most Liked" },
  { value: "comments_desc", label: "Most Comments" },
];

export const DATE_RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" },
];

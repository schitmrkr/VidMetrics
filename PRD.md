# VidMetrics Competitor Analyzer — Product Requirements Document

> **"Instantly see which competitor videos are crushing it."**

---

## 1. Executive Summary

VidMetrics Competitor Analyzer is a modern SaaS platform that empowers media companies, digital agencies, and enterprise YouTube creators to monitor and analyze competitor channel performance in real time. By simply pasting a YouTube channel URL, users gain instant access to rich performance dashboards, engagement metrics, trend visualizations, and AI-powered insights — all within a sleek, responsive interface.

The product targets a gap in the market where existing YouTube analytics tools are either too expensive, overly complex, or focused solely on a user's own channel rather than competitor intelligence.

---

## 2. Problem Statement

| Pain Point                      | Description                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Manual competitor research**  | Creators manually browse rival channels, losing hours comparing videos.                                |
| **Scattered data**              | Views, likes, comments, and upload dates must be gathered from multiple pages.                         |
| **No engagement benchmarking**  | YouTube Studio only shows your own analytics — there's no built-in way to compare against competitors. |
| **Lack of actionable insights** | Raw numbers don't tell creators _why_ certain videos perform better.                                   |
| **No trend tracking over time** | Spotting patterns (e.g., upload frequency vs. engagement) requires spreadsheet work.                   |

---

## 3. Target Audience

### 3.1 Primary Users

| Persona                           | Description                                                                                       | Key Need                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Agency Strategist**             | Plans content strategies for multiple brands. Needs quick competitor snapshots to inform pitches. | Fast data, export capabilities           |
| **YouTube Creator (10K–1M subs)** | Growing creator who wants to understand what's working in their niche.                            | Trend visualization, engagement insights |
| **Media Company Analyst**         | Works at a digital media firm analyzing market performance.                                       | Bulk analysis, benchmarking              |

### 3.2 Secondary Users

| Persona                          | Description                                                           |
| -------------------------------- | --------------------------------------------------------------------- |
| **Brand Marketing Manager**      | Evaluates influencer/competitor YouTube presence before partnerships. |
| **Freelance Content Consultant** | Provides data-driven recommendations to clients.                      |

---

## 4. User Scenarios

### Scenario 1: Agency Strategist — Quick Competitor Audit

> **Sarah**, a digital strategist at a marketing agency, is preparing a pitch for a fitness brand client. She pastes three competitor YouTube channel URLs into VidMetrics. Within seconds, she sees each channel's top-performing videos sorted by engagement rate. She filters to the last 30 days, identifies that "workout challenge" videos are trending, and exports the data to CSV for her pitch deck.

**Features Used:** Channel Input, Video Performance Dashboard, Sorting & Filtering, CSV Export

---

### Scenario 2: Growing YouTube Creator — Niche Research

> **Raj**, a tech reviewer with 50K subscribers, wants to understand why a competitor's recent videos are getting 3× more views. He pastes the rival's channel URL, switches to the Trend Visualization tab, and notices a spike in engagement every time the competitor posts "vs" comparison videos on Tuesdays. Raj adjusts his content calendar accordingly.

**Features Used:** Channel Input, Trend Visualization, Video Performance Dashboard

---

### Scenario 3: Media Analyst — Multi-Channel Benchmarking

> **Elena**, an analyst at a digital media company, needs to benchmark five news channels' YouTube performance. She uses VidMetrics' multi-channel comparison feature to view side-by-side engagement metrics. She identifies that Channel A has the highest average engagement rate despite having the fewest subscribers, suggesting superior content quality.

**Features Used:** Multi-Channel Benchmarking, Channel Comparison Dashboard, Export

---

### Scenario 4: Brand Manager — Influencer Vetting

> **Marcus**, a brand marketing manager, is evaluating potential influencer partners. He pastes candidate channels into VidMetrics to check engagement authenticity. He notices one influencer has high view counts but suspiciously low like-to-view ratios, suggesting potential bot traffic. He chooses a different influencer with healthier engagement metrics.

**Features Used:** Video Performance Dashboard, Engagement Rate Analysis, Anomaly Detection (Enhancement)

---

### Scenario 5: Freelance Consultant — Client Report

> **Priya**, a freelance content consultant, uses VidMetrics to generate a weekly competitor report for her client. She sets up saved channels, checks the latest performance data, and exports a formatted CSV with engagement breakdowns. She attaches trend charts as screenshots in her report.

**Features Used:** Saved Channels (Enhancement), CSV Export, Trend Visualization

---

## 5. Core Features (v1)

### 5.1 Channel Input & Validation

| Attribute            | Detail                                                                         |
| -------------------- | ------------------------------------------------------------------------------ |
| **Description**      | Users paste a YouTube channel URL (or handle) to initiate analysis.            |
| **Accepted Formats** | `youtube.com/channel/UC...`, `youtube.com/@handle`, `youtube.com/c/CustomName` |
| **Validation**       | Real-time URL validation with clear error messages for invalid inputs.         |
| **Recent Channels**  | Last 5 analyzed channels are saved locally for quick re-access.                |
| **Priority**         | P0 (Must Have)                                                                 |

### 5.2 Video Performance Dashboard

| Attribute                  | Detail                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Description**            | A card-based grid displaying all fetched videos from the analyzed channel.                              |
| **Data Points per Video**  | Thumbnail, title, upload date, views, likes, comments, engagement rate (likes + comments / views × 100) |
| **Top Video Highlighting** | Top 3 videos by engagement rate are visually distinguished with a badge/glow effect.                    |
| **Pagination**             | Load more videos on scroll (infinite scroll) or paginate (50 per page).                                 |
| **Priority**               | P0 (Must Have)                                                                                          |

### 5.3 Sorting & Filtering

| Attribute          | Detail                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Sort Options**   | Views (high → low), Engagement Rate (high → low), Upload Date (newest first), Likes, Comments |
| **Filter Options** | Date range: Last 7 days, 30 days, 90 days, 1 year, All time, Custom range                     |
| **Search**         | Text search within video titles                                                               |
| **Priority**       | P0 (Must Have)                                                                                |

### 5.4 Channel Overview Panel

| Attribute       | Detail                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Description** | A summary header showing key channel-level stats.                                                                 |
| **Data Points** | Channel name, avatar, subscriber count, total videos, total views, channel creation date, average engagement rate |
| **Priority**    | P0 (Must Have)                                                                                                    |

### 5.5 Trend Visualization

| Attribute         | Detail                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Description**   | Interactive charts showing video performance patterns over time.                              |
| **Chart Types**   | Line chart (views over time), Bar chart (engagement per video), Area chart (cumulative views) |
| **Interactivity** | Hover tooltips, click to drill down into specific video                                       |
| **Library**       | Recharts (React-native, responsive)                                                           |
| **Priority**      | P1 (Should Have)                                                                              |

### 5.6 CSV Export

| Attribute       | Detail                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| **Description** | Export the current filtered/sorted video list as a downloadable CSV file. |
| **Columns**     | Video Title, URL, Upload Date, Views, Likes, Comments, Engagement Rate    |
| **Priority**    | P1 (Should Have)                                                          |

### 5.7 Responsive Design

| Attribute              | Detail                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| **Description**        | Fully responsive layout optimized for desktop, tablet, and mobile. |
| **Breakpoints**        | Mobile (<640px), Tablet (640–1024px), Desktop (>1024px)            |
| **Mobile Adaptations** | Collapsible filters, stacked cards, touch-friendly interactions    |
| **Priority**           | P0 (Must Have)                                                     |

---

## 6. Enhanced Features (Proposed Additions)

### 6.1 Multi-Channel Comparison

| Attribute       | Detail                                                                      |
| --------------- | --------------------------------------------------------------------------- |
| **Description** | Analyze and compare up to 5 channels side-by-side.                          |
| **View**        | Split-screen comparison cards with overlaid metric charts.                  |
| **Metrics**     | Average views, engagement rate, upload frequency, subscriber-to-view ratio. |
| **Priority**    | P1                                                                          |

### 6.2 Engagement Anomaly Detection

| Attribute            | Detail                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| **Description**      | Automatically flags videos with unusual engagement patterns (e.g., very high views but very low likes). |
| **Algorithm**        | Statistical outlier detection based on channel averages.                                                |
| **Visual Indicator** | Warning badge on flagged video cards.                                                                   |
| **Priority**         | P2                                                                                                      |

### 6.3 Video Category & Tag Analysis

| Attribute       | Detail                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| **Description** | Break down channel performance by video category/tags to identify which topics drive the most engagement. |
| **View**        | Donut chart for category distribution, bar chart for engagement by category.                              |
| **Priority**    | P2                                                                                                        |

### 6.4 Upload Schedule Heatmap

| Attribute       | Detail                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| **Description** | Visualize when the competitor uploads videos (day of week × time of day) and correlate with performance. |
| **View**        | GitHub-style contribution heatmap showing upload density and engagement.                                 |
| **Priority**    | P2                                                                                                       |

### 6.5 Saved Channels & History

| Attribute       | Detail                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Description** | Users can save favorite channels for quick re-analysis. Full analysis history is preserved. |
| **Storage**     | LocalStorage for free tier, server-side for authenticated users.                            |
| **Priority**    | P1                                                                                          |

### 6.6 Shareable Report Links

| Attribute       | Detail                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Description** | Generate a unique, read-only URL that displays the current analysis snapshot. Useful for sharing with clients or teammates. |
| **Expiration**  | Links expire after 7 days by default.                                                                                       |
| **Priority**    | P2                                                                                                                          |

### 6.7 Dark Mode

| Attribute       | Detail                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| **Description** | Full dark mode support with system preference detection and manual toggle. |
| **Priority**    | P1                                                                         |

### 6.8 Keyboard Shortcuts

| Attribute       | Detail                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Description** | Power-user keyboard shortcuts for navigation and actions (e.g., `Ctrl+K` for search, `E` for export). |
| **Priority**    | P2                                                                                                    |

---

## 7. Technical Architecture

### 7.1 Tech Stack

| Layer                | Technology                                       |
| -------------------- | ------------------------------------------------ |
| **Framework**        | Next.js 15 (App Router)                          |
| **Language**         | TypeScript                                       |
| **Styling**          | Tailwind CSS v4 + shadcn/ui                      |
| **Charts**           | Recharts                                         |
| **API**              | YouTube Data API v3                              |
| **State Management** | React Context + TanStack Query (for API caching) |
| **Deployment**       | Vercel                                           |
| **Testing**          | Vitest + Playwright                              |

### 7.2 Architecture Diagram

```
┌──────────────────────────────────────────────────┐
│                   Frontend (Next.js)             │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │  Channel    │  │  Dashboard │  │   Trend    │ │
│  │  Input      │  │  Grid      │  │   Charts   │ │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘ │
│         └───────────┬───┘───────────────┘        │
│                     ▼                            │
│           ┌─────────────────┐                    │
│           │  API Route Layer │                    │
│           │  /api/channel    │                    │
│           │  /api/videos     │                    │
│           └────────┬────────┘                    │
└────────────────────┼─────────────────────────────┘
                     ▼
          ┌─────────────────────┐
          │  YouTube Data API   │
          │  v3 (Google Cloud)  │
          └─────────────────────┘
```

### 7.3 API Routes

| Route               | Method | Description                                                              |
| ------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/channel`      | `POST` | Accepts a channel URL, resolves to channel ID, returns channel metadata. |
| `/api/videos`       | `GET`  | Fetches video list for a channel ID with pagination support.             |
| `/api/videos/stats` | `GET`  | Fetches detailed statistics for a batch of video IDs.                    |
| `/api/export`       | `POST` | Generates and returns a CSV file of filtered video data.                 |

### 7.4 YouTube API Integration

| Endpoint        | Purpose                                             | Quota Cost       |
| --------------- | --------------------------------------------------- | ---------------- |
| `channels.list` | Fetch channel metadata (name, subs, avatar)         | 1 unit           |
| `search.list`   | List videos from a channel                          | 100 units        |
| `videos.list`   | Fetch detailed video stats (views, likes, comments) | 1 unit per video |

> [!IMPORTANT]
> YouTube Data API v3 has a daily quota of **10,000 units** by default. The app must implement caching and rate limiting to stay within quota. Consider using `playlistItems.list` (1 unit) instead of `search.list` (100 units) where possible by fetching the channel's "uploads" playlist.

### 7.5 Caching Strategy

| Cache Layer                 | TTL        | Purpose                                                 |
| --------------------------- | ---------- | ------------------------------------------------------- |
| **TanStack Query (Client)** | 5 minutes  | Prevents redundant API calls during a session.          |
| **Next.js Route Cache**     | 15 minutes | Caches API route responses server-side.                 |
| **LocalStorage**            | 24 hours   | Persists recent channel analyses for instant re-access. |

---

## 8. UI/UX Design Principles

### 8.1 Design Philosophy

- **Clean & Modern**: Minimal chrome, generous whitespace, focused content.
- **Data-Forward**: Numbers and visualizations take center stage.
- **Speed-First**: Skeleton loaders, optimistic UI, instant feedback.
- **Accessible**: WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly.

### 8.2 Page Structure

```
┌─────────────────────────────────────────────────────┐
│  Navbar  [Logo]  [Dark Mode Toggle]  [GitHub Link]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Hero Section                                 │  │
│  │  "Analyze any YouTube channel instantly"      │  │
│  │  [ Paste channel URL here...        ] [GO]    │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Channel Overview Panel                       │  │
│  │  [Avatar] Channel Name | Subs | Videos | Avg  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────┐ ┌──────────────────────────────────┐  │
│  │ Filters  │ │  Video Performance Grid          │  │
│  │          │ │  ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │ Sort By  │ │  │Card 1│ │Card 2│ │Card 3│      │  │
│  │ Date     │ │  └──────┘ └──────┘ └──────┘      │  │
│  │ Search   │ │  ┌──────┐ ┌──────┐ ┌──────┐      │  │
│  │          │ │  │Card 4│ │Card 5│ │Card 6│      │  │
│  └──────────┘ └──────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Trend Charts Section                         │  │
│  │  [Views Over Time] [Engagement Breakdown]     │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Footer                                       │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 8.3 Color Palette

| Token              | Light Mode         | Dark Mode | Usage                          |
| ------------------ | ------------------ | --------- | ------------------------------ |
| **Primary**        | `#6366F1` (Indigo) | `#818CF8` | CTAs, active states, links     |
| **Background**     | `#FAFAFA`          | `#0F172A` | Page background                |
| **Surface**        | `#FFFFFF`          | `#1E293B` | Cards, panels                  |
| **Text Primary**   | `#0F172A`          | `#F1F5F9` | Headings, body text            |
| **Text Secondary** | `#64748B`          | `#94A3B8` | Captions, labels               |
| **Success**        | `#10B981`          | `#34D399` | Positive engagement indicators |
| **Warning**        | `#F59E0B`          | `#FBBF24` | Anomaly flags                  |
| **Danger**         | `#EF4444`          | `#F87171` | Errors, negative trends        |

---

## 9. Feature Prioritization (MoSCoW)

| Priority             | Features                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Must Have (P0)**   | Channel Input & Validation, Video Performance Dashboard, Sorting & Filtering, Channel Overview Panel, Responsive Design    |
| **Should Have (P1)** | Trend Visualization, CSV Export, Multi-Channel Comparison, Saved Channels, Dark Mode                                       |
| **Could Have (P2)**  | Engagement Anomaly Detection, Video Category Analysis, Upload Schedule Heatmap, Shareable Report Links, Keyboard Shortcuts |
| **Won't Have (v1)**  | Real-time tracking, AI recommendations, Slack/email notifications                                                          |

---

## 10. Success Metrics

| Metric                     | Target                   | Measurement                            |
| -------------------------- | ------------------------ | -------------------------------------- |
| **Time to First Analysis** | < 5 seconds              | From URL paste to dashboard render     |
| **API Quota Efficiency**   | < 200 units per analysis | Track quota usage per analysis session |
| **Page Load (LCP)**        | < 2.5 seconds            | Lighthouse / Web Vitals                |
| **Mobile Usability Score** | > 95                     | Lighthouse Mobile Audit                |
| **User Retention (7-day)** | > 40%                    | Analytics tracking                     |

---

## 11. Risks & Mitigations

| Risk                            | Impact   | Mitigation                                                                           |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| YouTube API quota exhaustion    | High     | Use `playlistItems.list` instead of `search.list`, aggressive caching, rate limiting |
| API key exposure                | Critical | Store keys in environment variables, use Next.js API routes as proxy                 |
| Channels with 10K+ videos       | Medium   | Paginate fetches, limit initial load to 50 most recent videos                        |
| YouTube API deprecation/changes | High     | Abstract API layer for easy swap, monitor Google API changelogs                      |
| Rate limiting by Google         | Medium   | Implement exponential backoff, queue requests                                        |

---

## 12. Development Phases

### Phase 1: Foundation (Week 1)

- [x] Project setup (Next.js + Tailwind + shadcn/ui + TypeScript)
- [ ] Channel input component with URL validation
- [ ] YouTube API integration (channel metadata + video list)
- [ ] Video performance dashboard (card grid)
- [ ] Channel overview panel

### Phase 2: Intelligence (Week 2)

- [ ] Sorting & filtering system
- [ ] Text search within video titles
- [ ] Engagement rate calculation and top video highlighting
- [ ] Trend visualization charts (Recharts)
- [ ] Dark mode implementation

### Phase 3: Power Features (Week 3)

- [ ] CSV export functionality
- [ ] Multi-channel comparison
- [ ] Saved channels & analysis history
- [ ] Upload schedule heatmap
- [ ] Responsive design polish

### Phase 4: Polish & Launch (Week 4)

- [ ] Performance optimization (caching, lazy loading)
- [ ] Error handling & edge cases
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] SEO optimization
- [ ] Deploy to Vercel

---

## 13. Non-Functional Requirements

| Requirement         | Specification                                                 |
| ------------------- | ------------------------------------------------------------- |
| **Performance**     | First Contentful Paint < 1.5s, Time to Interactive < 3s       |
| **Accessibility**   | WCAG 2.1 AA compliant, keyboard navigable                     |
| **Browser Support** | Chrome, Firefox, Safari, Edge (last 2 versions)               |
| **Security**        | API keys server-side only, HTTPS enforced, input sanitization |
| **Scalability**     | Stateless frontend, API route caching for horizontal scaling  |

---

## 14. Glossary

| Term                 | Definition                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| **Engagement Rate**  | `(likes + comments) / views × 100` — measures audience interaction quality |
| **Quota Unit**       | YouTube API billing unit; default limit is 10,000/day                      |
| **Channel Handle**   | YouTube's `@username` format (e.g., `@mkbhd`)                              |
| **Uploads Playlist** | A hidden YouTube playlist containing all channel uploads, ID prefix `UU`   |

---

_Document Version: 1.0_
_Last Updated: March 25, 2026_
_Author: VidMetrics Team_

# VidMetrics - YouTube Competitor Analyzer

A modern SaaS platform that empowers media companies, digital agencies, and enterprise YouTube creators to monitor and analyze competitor channel performance in real time.

---

## Features

- **Channel Analysis**: Paste any YouTube channel URL to instantly view performance metrics
- **Video Performance Dashboard**: Card-based grid with views, likes, comments, and engagement rates
- **Trend Visualization**: Interactive charts showing video performance over time
- **Multi-Channel Comparison**: Compare up to 5 channels side-by-side
- **CSV & PDF Export**: Download analysis data for reports
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile

---

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- YouTube Data API v3 key (from [Google Cloud Console](https://console.cloud.google.com/))

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vibe-code-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory from the example:

```bash
cp .env.example .env
```

Edit `.env` and set your YouTube API key:

```env
YOUTUBE_API_KEY=your_api_key_here
```

To get a YouTube API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the key to your `.env`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

### 6. Start Production Server

```bash
npm start
```

---

## Running with Docker

You can also run the application using Docker for an environment consistent with production (e.g., ECS).

### 1. Build the Docker Image

Pass your YouTube API key as a build argument:

```bash
docker build --build-arg YOUTUBE_API_KEY=your_api_key_here -t vidmetrics .
```

### 2. Run the Container

Run the container and map port 3000:

```bash
docker run -p 3000:3000 -e YOUTUBE_API_KEY=your_api_key_here vidmetrics
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Charts**: Recharts
- **State Management**: Zustand + TanStack Query
- **API**: YouTube Data API v3

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── channel/       # Channel metadata endpoint
│   │   ├── videos/        # Video list & stats endpoints
│   │   └── export/        # CSV/PDF export endpoint
│   ├── dashboard/        # Main dashboard page
│   ├── compare/           # Channel comparison page
│   ├── trends/            # Trends page
│   ├── history/           # Analysis history page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── channel/           # Channel-related components
│   ├── charts/            # Chart components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components (Navbar, Sidebar)
│   └── ui/                # UI primitives
├── models/                # Data models & services
│   ├── services/          # YouTube API, export services
│   └── types/             # TypeScript types
├── providers/             # React context providers
├── store/                 # Zustand stores
└── viewmodels/            # Business logic hooks
```

---

## Notes on Build Approach

This project was built with the following approach:

### Architecture Decisions

1. **Next.js App Router**: Utilized Next.js 16 with the App Router for modern routing, server components, and API routes that proxy YouTube API calls (keeping API keys secure).

2. **State Management**: Combined Zustand for global UI state (current channel, comparison selections) with TanStack Query for server state (YouTube API data with automatic caching).

3. **Component Architecture**: Followed a modular component structure with:
   - `components/ui/` for primitive UI elements (buttons, cards)
   - `components/layout/` for structural components (navbar, sidebar)
   - `components/[feature]/` for feature-specific components
   - `viewmodels/` for business logic separated from UI

4. **YouTube API Integration**:
   - Used `playlistItems.list` (1 quota unit) instead of `search.list` (100 units) for efficiency
   - Implemented server-side caching via Next.js route cache
   - Proxy all API calls through internal API routes to protect credentials

5. **Design System**: Implemented a custom Material Design 3-inspired theme using Tailwind CSS with CSS variables for theming. The design uses a "Kinetic Lens" aesthetic with gradients and smooth animations.

### Key Implementation Details

- **Engagement Rate Calculation**: `(likes + comments) / views × 100`
- **Caching Strategy**: 5-minute client cache (TanStack Query), 15-minute server cache (Next.js)
- **API Routes**: All YouTube API calls go through `/api/*` routes to keep the API key server-side only

### Current Status

The core features (P0) are implemented:

- ✅ Channel Input & Validation
- ✅ Video Performance Dashboard
- ✅ Sorting & Filtering
- ✅ Channel Overview Panel
- ✅ Responsive Design

P1 features partially implemented:

- ✅ Trend Visualization
- ✅ CSV Export
- ✅ Multi-Channel Comparison
- ✅ Dark Mode
- ✅ History/Saved Channels

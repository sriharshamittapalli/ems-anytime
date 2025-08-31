# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Environmental Monitoring System (EMS) dashboard for Cleveland State University that displays real-time sensor data from ThingSpeak. It's a Next.js 15 application with TypeScript using the App Router, shadcn/ui components, and Tailwind CSS.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

The application fetches environmental data from ThingSpeak API and displays it in a dashboard with:

- **Real-time data updates** every 15 seconds via `useSensorData` hook
- **Responsive sidebar navigation** using shadcn/ui Sidebar components
- **Chart visualizations** using Recharts library
- **Alert system** for smoke detection (threshold > 400)

### Key Files and Structure

- `src/app/page.tsx` - Main dashboard page
- `src/components/dashboard.tsx` - Main dashboard component with sidebar layout
- `src/hooks/use-sensor-data.ts` - Custom hook for ThingSpeak data fetching
- `src/lib/thingspeak.ts` - ThingSpeak API integration and utilities
- `src/lib/types.ts` - TypeScript type definitions
- `src/components/ui/` - shadcn/ui component library

### Data Flow

1. ThingSpeak API provides sensor readings (temperature, humidity, air quality, smoke)
2. `useSensorData` hook fetches and auto-refreshes data
3. Dashboard displays metrics cards, charts, and smoke alerts
4. Components use latest reading for current status displays

### UI Framework

Uses shadcn/ui with:
- **Style**: "new-york" variant
- **Base color**: stone
- **Icons**: Lucide React
- **CSS Variables**: enabled for theming
- **Path aliases**: `@/components`, `@/lib`, `@/hooks`

### External Dependencies

- ThingSpeak Channel: 2097821
- Recharts for data visualization
- Radix UI primitives via shadcn/ui
- Tailwind CSS for styling

## Important Configuration

- TypeScript path mapping: `@/*` points to `src/*`
- ESLint extends Next.js core web vitals and TypeScript rules
- ThingSpeak data refresh interval: 15 seconds
- Smoke detection threshold: 400 units
# The Blockchain Pulse - Cryptocurrency Course Website

## Overview

This is a marketing and registration website for "The Blockchain Pulse," a cryptocurrency and blockchain basics course offered by an SECP-registered Pakistani company. The site serves as a landing page to attract potential students, explain the course curriculum, display pricing, and collect early access registrations via email. The course is delivered through Discord with downloadable video content over 2 months covering 10 modules.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom build script
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives with custom styling)
- **Animations**: Framer Motion for scroll reveal effects

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/`
- shadcn/ui primitives in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ES modules)
- **API Pattern**: REST endpoints under `/api/`
- **Build**: esbuild for production bundling

The server handles:
- Email registration collection (`POST /api/register`)
- Registration retrieval (`GET /api/registrations`)
- Static file serving in production
- Vite dev server middleware in development

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Current Storage**: In-memory storage (`MemStorage` class) with interface designed for easy database swap
- **Tables**: `users` and `registrations`

The storage layer uses an interface pattern (`IStorage`) allowing seamless transition from memory to PostgreSQL when DATABASE_URL is configured.

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Third-Party Services
- **Discord**: Course content delivery platform (external, not integrated)
- **Social Media**: Links to X/Twitter, Instagram, LinkedIn, Facebook

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations in `./migrations/`

### UI/Design Dependencies
- **Google Fonts**: Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter
- **Lucide Icons**: Primary icon library
- **React Icons**: Social media icons (Discord, Instagram, LinkedIn, Facebook)

### Key NPM Packages
- `express` - HTTP server
- `drizzle-orm` + `drizzle-zod` - Database ORM and validation
- `@tanstack/react-query` - Data fetching
- `zod` - Schema validation
- `framer-motion` - Animations
- Full shadcn/ui component library (Radix UI based)
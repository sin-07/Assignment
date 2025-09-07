# Kandid Assignment

A modern Next.js 15+ application built with a comprehensive tech stack including Server Actions, Tailwind CSS + shadcn/ui, PostgreSQL with Drizzle ORM, TanStack Query, and Zustand for state management.

## Tech Stack

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Server Actions** - Server-side mutations

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── utils.ts         # Class name utilities
├── db/                   # Database configuration
│   ├── index.ts         # Drizzle client setup
│   └── schema.ts        # Database schema definitions
├── store/                # Zustand stores
│   └── app-store.ts     # Main application store
├── actions/              # Server Actions
│   └── index.ts         # Database operations
└── providers.tsx         # React Query provider
```

## Environment Setup

1. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

2. Update the database URL in `.env`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/kandid_assignment"
   ```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your PostgreSQL database** and update the `DATABASE_URL` in your `.env` file.

3. **Generate and run database migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## Key Features

### Server Actions
Server Actions are configured in `src/actions/index.ts` for server-side data mutations.

### Database Schema
Database tables are defined in `src/db/schema.ts` using Drizzle ORM with PostgreSQL.

### State Management
- **TanStack Query**: Server state management in `src/providers.tsx`
- **Zustand**: Client state management in `src/store/app-store.ts`

### UI Components
Pre-configured shadcn/ui components are available in `src/components/ui/`:
- Button component with variants
- Card components for layouts

### Styling
- Tailwind CSS with custom design system
- Dark mode support
- CSS variables for theming
- shadcn/ui component styling

## Database Operations

The project includes example CRUD operations:
- Create and fetch users
- Create and fetch posts
- Server Actions for form handling

## Development Guidelines

1. **Components**: Use shadcn/ui components from `src/components/ui/`
2. **Styling**: Use Tailwind CSS classes and the `cn()` utility for conditional classes
3. **Database**: Define new tables in `src/db/schema.ts` and generate migrations
4. **Server Actions**: Add server-side logic in `src/actions/`
5. **State**: Use TanStack Query for server state, Zustand for client state
6. **Types**: Define TypeScript types as needed

## Contributing

1. Follow the established folder structure
2. Use TypeScript for all new files
3. Follow the component patterns established by shadcn/ui
4. Use Server Actions for data mutations
5. Test your changes thoroughly

## License

This project is private and for assignment purposes.

# LearnLab — Next-Gen Learning Dashboard

A futuristic, dark-mode student dashboard built for the Frontend Intern Challenge. It fetches live course data from Supabase via **Next.js Server Components**, renders a Bento Grid layout with **Framer Motion** animations, and uses **Tailwind CSS** for styling.

## Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Framework      | Next.js 16 (App Router)                              |
| Language       | TypeScript                                           |
| Database       | Supabase (PostgreSQL)                                |
| Styling        | Tailwind CSS v4                                      |
| Animations     | Framer Motion                                        |
| Icons          | Lucide React                                         |

## Architecture Decisions

### Server / Client Component Split

The `app/page.tsx` is an **async Server Component** that calls `fetchCourses()` to query Supabase. This keeps sensitive logic on the server — no Supabase credentials ever reach the browser.

The fetched data is passed as props to `BentoGrid` (a Client Component), which is the cut-off point for client interactivity. All Framer Motion animations and interactive state live in client components (`"use client"`), while `SkeletonCard` remains a server-only component since it has no interactivity.

```
page.tsx (server)
  └─ BentoGrid.tsx (client)  ← first client boundary
       ├─ MotionWrapper.tsx   client — stagger animation variants
       ├─ HeroTile.tsx        client — streak animation
       ├─ CourseCard.tsx      client — hover + progress animation
       └─ ActivityTile.tsx    client — bar chart animation
```

### Supabase Integration

A server-side Supabase client is created via `lib/supabase/server.ts` using `process.env` variables. Session persistence is disabled (`persistSession: false`) since this is a read-only dashboard with no authentication.

If the environment variables are missing or the query fails, `fetchCourses()` catches the error and returns a structured `{ data, error }` object. The UI renders a graceful error state with an icon and message.

### Animation Strategy

All animations use **`transform`** and **`opacity`** exclusively — no properties that trigger layout shift (width, height, margin, padding, top, left) are animated. This ensures hardware-accelerated compositing and zero forced reflows.

| Animation               | Implementation                                                |
| ----------------------- | ------------------------------------------------------------- |
| Staggered entrance      | `MotionContainer` with `staggerChildren: 0.08`                |
| Card hover              | `scale(1.02)` via `whileHover` with spring physics            |
| Active nav highlight    | `layoutId="activeNav"` — the highlight smoothly repositions   |
| Progress bars           | `scaleX` with `transformOrigin: "left"`                       |
| Bar chart growth        | `scaleY` with `transformOrigin: "bottom"`                     |

### Responsive Strategy

- **Desktop (>1024px)**: Full sidebar (user-toggleable width), 4-column Bento grid.
- **Tablet (768–1024px)**: Sidebar auto-collapses to icons-only (`w-16`). Grid becomes 2 columns.
- **Mobile (<768px)**: Sidebar becomes a fixed bottom nav with icon labels. Hamburger menu opens a slide-out overlay. Grid stacks to a single column.

All breakpoints are handled via Tailwind responsive prefixes (`md:`, `lg:`) — no JavaScript media queries needed.

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com/).
2. Run the contents of `supabase/seed.sql` in the SQL Editor to create the `courses` table and insert 4 sample rows:

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Atom'),
  ('Design Systems Mastery', 58, 'Palette'),
  ('TypeScript Essentials', 86, 'Code2'),
  ('Data Visualization Basics', 42, 'BarChart3');
```

3. Copy your Supabase URL and anon key from **Project Settings → API**.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

A `.env.example` is provided. **Never commit `.env.local`.**

## Loading & Error States

- **Loading**: `app/loading.tsx` and `<Suspense>` boundaries in `page.tsx` / `courses/page.tsx` render skeleton cards with a CSS `animate-skeleton` pulse.
- **Error**: If `fetchCourses()` fails (missing env vars, network error, or Supabase error), the error is caught and displayed as a centered error card with an `AlertCircle` icon and the error message.
- **Missing course**: The `courses/[id]` page calls `notFound()` if no course is returned.

## Run Locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev -- --webpack      # start at http://localhost:3000
```

> The `--webpack` flag is needed because Turbopack lacks native bindings on some platforms.

## Deploy on Vercel

1. Push to GitHub.
2. Import into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.
4. Deploy.

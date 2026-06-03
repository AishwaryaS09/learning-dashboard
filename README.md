# LearnLab – Next-Gen Learning Dashboard

A futuristic student dashboard built using Next.js, Supabase, Tailwind CSS, and Framer Motion. The application features a responsive Bento Grid layout, animated course progress tracking, and server-side data fetching.

## Tech Stack

* Next.js (App Router)
* TypeScript
* Supabase
* Tailwind CSS
* Framer Motion
* Lucide React

## Architectural Choices

The application follows a modular component-based architecture, separating UI components, data fetching logic, and shared types. Next.js App Router was used to leverage Server Components for efficient data fetching and improved performance.

## Server / Client Component Split

* **Server Components:** Used for fetching course data from Supabase and rendering initial page content.
* **Client Components:** Used for interactive features such as animations, sidebar navigation, progress indicators, and message interactions using Framer Motion.

This approach keeps data fetching secure while maintaining a smooth interactive user experience.

## Challenges Faced

* Implementing dynamic data fetching from Supabase using Server Components.
* Maintaining smooth animations while avoiding layout shifts.
* Creating a responsive Bento Grid layout across desktop, tablet, and mobile devices.
* Dynamically rendering Lucide icons based on database values.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

A `.env.example` file is included in the repository.

## Running Locally

```bash
npm install
npm run dev
```

## Deployment

The application is deployed on Vercel and the source code is hosted on GitHub.

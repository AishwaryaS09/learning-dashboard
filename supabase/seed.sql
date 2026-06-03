-- Create the courses table
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Atom'),
  ('Design Systems Mastery', 58, 'Palette'),
  ('TypeScript Essentials', 86, 'Code2'),
  ('Data Visualization Basics', 42, 'BarChart3');

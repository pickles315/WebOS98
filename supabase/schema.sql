-- TinyGames starter schema
-- Run in Supabase SQL Editor after creating a project.
create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 60),
  url text not null check (url ~* '^https?://'),
  category text not null check (category in ('Arcade','Puzzle','Chill','Weird')),
  description text not null check (char_length(description) between 1 and 180),
  created_at timestamptz not null default now()
);

alter table public.games enable row level security;

-- Anyone can read the public game directory.
create policy "Anyone can read games"
on public.games for select
to anon, authenticated
using (true);

-- For the initial prototype, visitors may submit games.
-- Add moderation/rate limiting before treating this as a trusted public directory.
create policy "Visitors can submit games"
on public.games for insert
to anon, authenticated
with check (
  char_length(title) between 1 and 60
  and char_length(description) between 1 and 180
  and category in ('Arcade','Puzzle','Chill','Weird')
  and url ~* '^https?://'
);

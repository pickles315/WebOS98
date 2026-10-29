# TinyGames

A small browser-game directory. Static HTML, CSS and JavaScript; no build step required.

## Run it
Open `index.html` in a browser, or publish the repository with GitHub Pages.

## Current features
- Responsive dark interface
- Search and category filters
- Starter directory cards
- Random game button
- Submit-game dialog
- Browser-local saved submissions using `localStorage`

## Important
This first version is a frontend prototype. Submissions are stored only in the browser that created them. They are **not shared between visitors yet**. The sample game links currently point to itch.io's game directory, not verified individual game pages.

## Next: shared data with Supabase
The included `supabase/schema.sql` defines a public directory of submitted games with Row Level Security. Once a Supabase project is chosen, add its project URL and publishable key to a small config file, connect the frontend, and use the public read policy plus authenticated insert policy. Never put a Supabase service-role key in frontend code.

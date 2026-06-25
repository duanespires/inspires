# Inspire

Duane's command center for everything he's building. Single-file React app
(formerly "S1 Command Center"), now a standalone product on its own domain.

## Stack
- React 18 (Create React App) — entire UI lives in `src/App.js`
- Supabase JS v2 (data wiring — pending a dedicated Inspire project)
- Hosting: GitHub Pages -> inspiresapp.com (DNS managed at GoDaddy)

## Pages
- Systems       — connected services and their status
- Robot Systems — the automation fleet
- Memory        — running log of decisions and changes
- Notepad       — quick notes (live once the data store is wired)
- Reports       — metrics (live once the data store is wired)

## Editing
The whole frontend is one file: `src/App.js`. Components, styles, and the
page data all live there. The sidebar switches pages with React state — no router.

## Local build (optional)
    npm install
    CI=true npx react-scripts build

## Security
No secrets ever live in this frontend. Live data uses a Supabase anon key
(browser-safe, RLS-protected) or an edge function. Management tokens and PATs
stay server-side. This is a hard rule.

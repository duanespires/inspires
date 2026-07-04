# Inspire

Duane's command center for everything he's building. Single-file React app
(formerly "S1 Command Center"), now a standalone product on its own domain.

## Stack
- React 18 (Create React App) — entire UI lives in `src/App.js`
- Supabase JS v2 — dedicated Inspire project (ref rbwdzgjymkorehkdqzmy): auth, robots, memory, notepad, reports (all RLS)
- Hosting: GitHub Pages -> inspiresapp.com (DNS managed at GoDaddy)

## Pages
- Command Center — live stat cards + cockpit state
- Life           — personal tracking (placeholders, wired as we go)
- Finance        — money & wealth (placeholders; Plaid later)
- Business       — Clients / Check-Ins / Sites shells (wire per project)
- Systems        — connected services and their status
- Robot Systems  — the automation fleet (reads inspire_robots)
- Intelligence   — Memory (live) · Notepad (live CRUD) · Reports (live)

## Auth
Login required (Supabase Auth — email/password or magic link).
Open signups are disabled; users are created by the admin.

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

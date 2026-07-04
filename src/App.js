import React from 'react';
import { createClient } from '@supabase/supabase-js';

const { useState, useEffect, useCallback } = React;

// ════════════════════════════════════════════════════════════════
// INSPIRE — Duane's command center. Single-file React app.
// Theme: Light / Dark / System via CSS custom properties.
// Data store: dedicated Supabase project (anon key + RLS only).
// ════════════════════════════════════════════════════════════════

const DATA_STORE = {
  url: 'https://rbwdzgjymkorehkdqzmy.supabase.co',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJid2R6Z2p5bWtvcmVoa2Rxem15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODQyNzAsImV4cCI6MjA5ODc2MDI3MH0.sTGgLBtQYHt2jZ7ltswGuT8dKsfqcD2REJRrVGY17qg',
};
const supabase = createClient(DATA_STORE.url, DATA_STORE.anonKey);

const LOGO = 'https://app.sourceonesoftware.com/assets/images/s1-logo-960x960.png';

// ── Navigation (Suarez-style: emoji + compact, collapsible subs) ──

const NAV = [
  { id: 'command', label: 'Command Center', emoji: '\uD83C\uDF0D' },
  {
    id: 'life', label: 'Life', emoji: '\uD83C\uDF33',
    subs: [
      { id: 'health', label: 'Health', emoji: '\u2764\uFE0F' },
      { id: 'family', label: 'Family', emoji: '\uD83D\uDC6A' },
      { id: 'goals', label: 'Goals', emoji: '\uD83C\uDFAF' },
      { id: 'links', label: 'Links', emoji: '\uD83D\uDD17' },
    ],
  },
  {
    id: 'finance', label: 'Finance', emoji: '\uD83D\uDCB0',
    subs: [
      { id: 'findash', label: 'Dashboard', emoji: '\uD83D\uDCCA' },
      { id: 'banking', label: 'Banking', emoji: '\uD83C\uDFE6' },
      { id: 'bookkeeping', label: 'Bookkeeping', emoji: '\uD83D\uDCD2' },
      { id: 'assets', label: 'Assets', emoji: '\uD83C\uDFE0' },
      { id: 'insurance', label: 'Insurance', emoji: '\uD83D\uDEE1\uFE0F' },
    ],
  },
  {
    id: 'business', label: 'Business', emoji: '\uD83D\uDCBC',
    subs: [
      { id: 'clients', label: 'Clients', emoji: '\uD83D\uDC65' },
      { id: 'checkins', label: 'Check-Ins', emoji: '\u2705' },
      { id: 'sites', label: 'Sites', emoji: '\uD83C\uDF10' },
    ],
  },
  { id: 'systems', label: 'Systems', emoji: '\uD83D\uDDA5\uFE0F' },
  { id: 'robots', label: 'Robot Systems', emoji: '\uD83E\uDD16' },
  {
    id: 'intel', label: 'Intelligence', emoji: '\uD83E\uDDE0',
    subs: [
      { id: 'memory', label: 'Memory', emoji: '\uD83D\uDCDC' },
      { id: 'notepad', label: 'Notepad', emoji: '\uD83D\uDDD2\uFE0F' },
      { id: 'reports', label: 'Reports', emoji: '\uD83D\uDCC8' },
    ],
  },
];

const PARENT_OF = {};
NAV.forEach((n) => (n.subs || []).forEach((s) => (PARENT_OF[s.id] = n.id)));
const firstSub = (id) => { const n = NAV.find((x) => x.id === id); return n.subs ? n.subs[0].id : id; };

const BOTTOM_NAV = [
  { id: 'life', label: 'Life' },
  { id: 'finance', label: 'Finance' },
  { id: 'command', label: 'Command' },
  { id: 'business', label: 'Business' },
  { id: 'intel', label: 'Intel' },
];

// ── Static data ─────────────────────────────────────────────────

const SYSTEMS = [
  { id: 'inspire-store', name: 'Inspire Data Store', kind: 'Auth · robots · memory · notes · reports', status: 'connected', statusLabel: 'Connected',
    meta: [['Endpoint', 'rbwdzgjymkorehkdqzmy.supabase.co'], ['Security', 'Anon key + Row-Level Security'], ['Holds', 'Login · fleet · memory · notes · reports']] },
  { id: 'github', name: 'GitHub', kind: 'Source control + hosting', status: 'connected', statusLabel: 'Connected',
    meta: [['Account', 'duanespires'], ['Hosting', 'GitHub Pages \u2192 inspiresapp.com'], ['Access', 'Fine-grained PAT']] },
  { id: 's1-prod', name: 'S1 Production', kind: 'Students · enrollment · billing', status: 'pending', statusLabel: 'Wiring pending',
    meta: [['Endpoint', 'ivjuwnbyeduzmkmukwoo.supabase.co'], ['Serves', 'Source One core platform'], ['Next step', 'Wire KPI reads into Business']] },
  { id: 's1-checkin', name: 'Check-In System', kind: 'Studio + school check-ins', status: 'pending', statusLabel: 'Wiring pending',
    meta: [['Endpoint', 'itmqbkdzdiiukweubqaj.supabase.co'], ['Serves', 'Check-in volume'], ['Next step', 'Wire counts into Business \u2192 Check-Ins']] },
  { id: 's1-sites', name: 'S1 Sites', kind: 'Website platform', status: 'pending', statusLabel: 'Wiring pending',
    meta: [['Endpoint', 'eqadwdvednxvnuyrgwrz.supabase.co'], ['Serves', 'Sites + form submissions'], ['Next step', 'Wire stats into Business \u2192 Sites']] },
  { id: 's1-client', name: 'Client Data', kind: 'Client records + dashboards', status: 'pending', statusLabel: 'Wiring pending',
    meta: [['Endpoint', 'sekhxglapwllavpspozd.supabase.co'], ['Serves', 'Client metrics'], ['Next step', 'Wire metrics into Business \u2192 Clients']] },
];

const ROBOTS_FALLBACK = [
  { slug: 'vector', name: 'VECTOR', callsign: 'Inspire operations robot', status: 'standby', status_label: 'Standby · awaiting API hookup',
    description: 'Runs the cockpit. VECTOR watches every connected system from inside Inspire — integration health, deploy status, and alerts — and keeps the Memory log.',
    assignment: 'Inspire', duties: 'System monitoring · deploy checks · memory log', apis: 'To be connected' },
  { slug: 'atlas', name: 'ATLAS', callsign: 'S1 operations robot', status: 'standby', status_label: 'Standby · awaiting API hookup',
    description: 'Carries the business. ATLAS works across Source One — client data, check-ins, and website platform tasks.',
    assignment: 'Source One Software operations', duties: 'Client data · check-ins · site platform tasks', apis: 'To be connected' },
];

const PLACEHOLDERS = {
  health: { rows: [['Training', 'Sessions per week, program, PRs'], ['Recovery', 'Sleep + readiness'], ['Habits', 'Daily streaks worth keeping']], next: 'Decide the 3 numbers worth tracking daily.' },
  family: { rows: [['Key dates', 'Birthdays, anniversaries, events'], ['People', 'The short list that matters'], ['Traditions', 'The recurring stuff to protect']], next: 'Add birthdays + key dates.' },
  goals: { rows: [['2026 targets', 'The yearly numbers'], ['Weekly scoreboard', 'What got moved this week'], ['Review cadence', 'When the scoreboard gets checked']], next: 'Write the 2026 targets.' },
  links: { rows: [['Daily', 'The tabs opened every morning'], ['Tools', 'Logins + dashboards'], ['Reading', 'The save-for-later pile']], next: 'Drop in the first 5 links.' },
  findash: { rows: [['Net worth', 'Assets minus liabilities'], ['Cash position', 'Liquid across accounts'], ['Monthly burn', 'Spending trend']], next: 'Goes live once accounts are connected.' },
  banking: { rows: [['Accounts', 'Linked banks + balances'], ['Activity', 'Recent transactions']], next: 'Plaid connection — later phase.' },
  bookkeeping: { rows: [['Income', 'Money in, by source'], ['Expenses', 'Money out, by category'], ['Statements', 'Monthly closes']], next: 'Pick the source of truth (bank feed vs. manual).' },
  assets: { rows: [['Real estate', 'Properties, loans, equity'], ['Vehicles', 'Owned vehicles + values']], next: 'Add the first property record.' },
  insurance: { rows: [['Policies', 'Coverage by type'], ['Renewals', 'Dates + premiums']], next: 'Add policy summaries.' },
};

const BUSINESS_PAGES = {
  clients: { ref: 'sekhxglapwllavpspozd', blurb: 'Client records and engagement from the Client Data project.', metrics: ['Active clients', 'New this month', 'Engagement'] },
  checkins: { ref: 'itmqbkdzdiiukweubqaj', blurb: 'Studio and school check-in volume from the Check-In System.', metrics: ['Today', 'This week', 'Top location'] },
  sites: { ref: 'eqadwdvednxvnuyrgwrz', blurb: 'Website builds and inbound form submissions from S1 Sites.', metrics: ['Live sites', 'Form submissions', 'Build jobs'] },
};

// ── Theme-aware styles (CSS custom properties) ──────────────────

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  :root, [data-theme='dark'] {
    color-scheme: dark;
    --bg: #080810;
    --surface: #16161C;
    --surface-2: rgba(8, 8, 16, 0.65);
    --text: #F6F4FA;
    --text-mut: rgba(246, 244, 250, 0.62);
    --text-dim: rgba(246, 244, 250, 0.45);
    --border: rgba(156, 90, 216, 0.14);
    --border-2: rgba(156, 90, 216, 0.25);
    --accent: #9C5AD8;
    --accent-soft: #E4C6FC;
    --side-bg: linear-gradient(180deg, #0B0716 0%, #080810 55%);
    --hover: rgba(156, 90, 216, 0.10);
    --ok: #3DDC97; --pending: #F5B841; --danger: #F26D6D;
    --shadow: 0 6px 18px rgba(72, 28, 124, 0.55);
  }
  [data-theme='light'] {
    color-scheme: light;
    --bg: #F6F4FA;
    --surface: #FFFFFF;
    --surface-2: rgba(101, 30, 130, 0.06);
    --text: #0C0E1A;
    --text-mut: rgba(12, 14, 26, 0.66);
    --text-dim: rgba(12, 14, 26, 0.45);
    --border: rgba(101, 30, 130, 0.14);
    --border-2: rgba(101, 30, 130, 0.24);
    --accent: #651E82;
    --accent-soft: #662A9C;
    --side-bg: linear-gradient(180deg, #FBF9FE 0%, #F2EDF9 100%);
    --hover: rgba(101, 30, 130, 0.07);
    --ok: #0FA968; --pending: #C77E00; --danger: #D14040;
    --shadow: 0 6px 18px rgba(101, 30, 130, 0.25);
  }

  body {
    background: var(--bg); color: var(--text);
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .shell { display: flex; min-height: 100%; }

  .sidebar {
    width: 224px; flex-shrink: 0;
    background: var(--side-bg);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 20px 12px calc(16px + env(safe-area-inset-bottom));
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }
  .brand { display: flex; align-items: center; gap: 10px; padding: 2px 8px 18px; }
  .brand img { height: 38px; width: 38px; border-radius: 9px; }
  .brand-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-style: italic; font-size: 22px;
    letter-spacing: 0.04em; line-height: 0.92; text-transform: uppercase;
  }
  .brand-name small {
    display: block; font-size: 11px; font-weight: 700; font-style: normal;
    letter-spacing: 0.24em; color: var(--accent); margin-top: 3px;
  }
  .nav { display: flex; flex-direction: column; gap: 3px; margin-top: 4px; }
  .nav-row { display: flex; align-items: stretch; gap: 2px; }
  .nav-btn {
    flex: 1; display: flex; align-items: center; gap: 10px; min-width: 0;
    border: 1px solid transparent; border-radius: 10px;
    background: transparent; color: var(--text-mut);
    font: inherit; font-size: 14px; font-weight: 500;
    padding: 10px 10px; cursor: pointer; text-align: left;
    transition: background 140ms ease, color 140ms ease;
  }
  .nav-btn:hover { background: var(--hover); color: var(--text); }
  .nav-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .nav-btn.active {
    background: linear-gradient(180deg, #662A9C 0%, #481C7C 100%);
    color: #fff; border-color: rgba(228, 198, 252, 0.25);
    box-shadow: var(--shadow);
  }
  .nav-emoji { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }
  .chev {
    flex-shrink: 0; width: 30px; border: none; border-radius: 8px;
    background: transparent; color: var(--text-dim); cursor: pointer;
    font-size: 11px; transition: transform 160ms ease, color 140ms ease;
  }
  .chev:hover { color: var(--text); background: var(--hover); }
  .chev.open { transform: rotate(90deg); }
  .nav-subs {
    margin: 2px 0 4px 18px; padding-left: 10px;
    border-left: 1px solid var(--border-2);
    display: flex; flex-direction: column; gap: 1px;
  }
  .nav-sub {
    display: flex; align-items: center; gap: 8px;
    border: none; background: transparent; text-align: left; cursor: pointer;
    font: inherit; font-size: 13px; padding: 8px 9px; border-radius: 8px;
    color: var(--text-dim);
  }
  .nav-sub .nav-emoji { font-size: 13px; width: 17px; }
  .nav-sub:hover { color: var(--text); background: var(--hover); }
  .nav-sub.active { color: var(--text); background: var(--surface-2); font-weight: 700; }
  [data-theme='dark'] .nav-sub.active { background: rgba(102, 42, 156, 0.45); color: #fff; }

  .sidebar-foot {
    margin-top: auto; padding: 12px 6px 0;
    border-top: 1px solid var(--border);
    font-size: 12px; color: var(--text-dim);
    display: flex; flex-direction: column; gap: 10px;
  }
  .theme-seg { display: flex; gap: 4px; background: var(--surface-2); border-radius: 9px; padding: 3px; }
  .theme-seg button {
    flex: 1; border: none; border-radius: 7px; background: transparent;
    color: var(--text-dim); font: inherit; font-size: 11.5px; font-weight: 700;
    padding: 6px 0; cursor: pointer;
  }
  .theme-seg button.on { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.25); }
  .foot-user { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 0; }
  .foot-user span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .signout {
    border: 1px solid var(--border-2); background: transparent;
    color: var(--accent); border-radius: 8px; padding: 6px 10px;
    font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; flex-shrink: 0;
  }
  .signout:hover { background: var(--hover); }

  .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .topstrip { height: 4px; background: linear-gradient(90deg, #481C7C 0%, #662A9C 55%, #9C5AD8 100%); }
  .header { padding: 28px 32px 4px; }
  .eyebrow {
    font-size: 12px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
  }
  h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(34px, 5vw, 50px);
    line-height: 0.95; text-transform: uppercase; letter-spacing: 0.015em;
  }
  .header-sub { margin-top: 9px; color: var(--text-mut); font-size: 14.5px; max-width: 640px; }
  .content { padding: 22px 32px 50px; display: grid; gap: 14px; align-content: start; min-width: 0; }
  @media (min-width: 980px) { .content.two-col { grid-template-columns: 1fr 1fr; } }

  /* ── Panels & tables ── */
  .panel {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden; min-width: 0;
  }
  .panel-head {
    display: flex; justify-content: space-between; align-items: center; gap: 12px;
    padding: 14px 18px; border-bottom: 1px solid var(--border);
  }
  .panel-title {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 19px; text-transform: uppercase; letter-spacing: 0.03em;
  }
  .panel-sub { font-size: 12.5px; color: var(--text-dim); margin-top: 2px; }
  .trow {
    display: flex; align-items: center; gap: 12px; min-width: 0;
    padding: 12px 18px; border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .trow:last-child { border-bottom: none; }
  .trow.click { cursor: pointer; }
  .trow.click:hover { background: var(--hover); }
  .trow-main { flex: 1; min-width: 0; }
  .trow-name { font-weight: 700; overflow-wrap: anywhere; }
  .trow-kind { font-size: 12.5px; color: var(--text-dim); margin-top: 2px; overflow-wrap: anywhere; }
  .trow-side { flex-shrink: 0; display: flex; align-items: center; gap: 8px; }
  .trow-chev { color: var(--text-dim); font-size: 11px; transition: transform 160ms ease; }
  .trow-chev.open { transform: rotate(90deg); }
  .tdetail { padding: 4px 18px 14px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
  .tdetail:last-child { border-bottom: none; }
  .meta-row {
    display: flex; justify-content: space-between; gap: 14px;
    padding: 8px 0; font-size: 13px;
    border-bottom: 1px solid var(--border);
  }
  .meta-row:last-child { border-bottom: none; }
  .meta-k { color: var(--text-dim); flex-shrink: 0; }
  .meta-v { text-align: right; overflow-wrap: anywhere; min-width: 0; }
  .next-chip {
    display: inline-block; margin: 10px 18px 14px;
    font-size: 12px; color: var(--pending);
    border: 1px dashed var(--pending); border-radius: 999px; padding: 5px 12px;
  }
  .next-chip b { letter-spacing: 0.1em; font-size: 10.5px; margin-right: 6px; }

  .status {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11.5px; font-weight: 600; white-space: nowrap;
    padding: 5px 10px; border-radius: 999px;
    background: var(--surface-2); border: 1px solid var(--border-2);
  }
  .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .status.connected .dot { background: var(--ok); }
  .status.pending .dot   { background: var(--pending); }
  .status.standby .dot   { background: var(--accent); }
  @media (prefers-reduced-motion: no-preference) {
    .dot { animation: pulse 2.4s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
  }

  /* ── Stat cards ── */
  .stats { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); min-width: 0; }
  @media (min-width: 980px) { .stats { grid-template-columns: repeat(4, 1fr); } }
  .stat { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; min-width: 0; }
  .stat-n { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 38px; line-height: 1; }
  .stat-k { margin-top: 5px; font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-dim); }
  .stat-sub { margin-top: 3px; font-size: 12px; color: var(--accent); overflow-wrap: anywhere; }

  /* ── Memory timeline ── */
  .timeline { position: relative; padding-left: 24px; min-width: 0; }
  .timeline::before {
    content: ''; position: absolute; left: 6px; top: 6px; bottom: 6px; width: 2px;
    background: linear-gradient(180deg, var(--accent), transparent);
  }
  .mem { position: relative; margin-bottom: 15px; min-width: 0; }
  .mem::before {
    content: ''; position: absolute; left: -22px; top: 6px;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 9px var(--accent);
  }
  .mem-head { display: flex; align-items: baseline; gap: 9px; flex-wrap: wrap; }
  .mem-date { font-size: 12px; color: var(--text-dim); }
  .mem-tag {
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); background: var(--surface-2);
    border: 1px solid var(--border-2); border-radius: 999px; padding: 2px 8px;
  }
  .mem h3 { margin-top: 4px; font-size: 15px; font-weight: 700; }
  .mem p { margin-top: 4px; font-size: 13.5px; line-height: 1.55; color: var(--text-mut); overflow-wrap: anywhere; }

  /* ── Forms ── */
  .field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .field label { font-size: 11.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dim); }
  .input, textarea.input, select.input {
    background: var(--surface-2); border: 1px solid var(--border-2);
    color: var(--text); border-radius: 10px; padding: 11px 12px;
    font: inherit; font-size: 15px; width: 100%; max-width: 100%;
  }
  .input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
  textarea.input { min-height: 110px; resize: vertical; }
  .btn {
    border: none; border-radius: 10px; cursor: pointer; font: inherit;
    font-weight: 700; font-size: 14px; padding: 12px 18px; color: #fff;
    background: linear-gradient(180deg, #662A9C, #481C7C); box-shadow: var(--shadow);
  }
  .btn:hover { filter: brightness(1.1); }
  .btn.ghost { background: transparent; border: 1px solid var(--border-2); color: var(--accent); box-shadow: none; }
  .btn.small { padding: 8px 14px; font-size: 13px; border-radius: 9px; }
  .btn.dangerous { background: transparent; border: 1px solid var(--danger); color: var(--danger); box-shadow: none; }
  .form-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .form-row .field { flex: 1; min-width: 130px; }
  .err { color: var(--danger); font-size: 13.5px; }
  .okmsg { color: var(--ok); font-size: 13.5px; }
  .empty { padding: 24px 18px; text-align: center; color: var(--text-dim); font-size: 13.5px; }

  /* ── Login ── */
  .login-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background:
      radial-gradient(900px 550px at 85% -10%, rgba(102,42,156,0.30), transparent 60%),
      radial-gradient(750px 450px at -10% 110%, rgba(72,28,124,0.32), transparent 55%),
      var(--bg);
  }
  .login-card {
    width: 100%; max-width: 396px; background: var(--surface);
    border: 1px solid var(--border-2); border-radius: 18px;
    padding: 32px 28px calc(28px + env(safe-area-inset-bottom));
    display: grid; gap: 15px;
  }
  .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 2px; }
  .login-brand img { width: 44px; height: 44px; border-radius: 10px; }

  /* ── Mobile ── */
  .menu-btn { display: none; }
  .bottomnav { display: none; }
  .scrim { display: none; }
  @media (max-width: 900px) {
    .sidebar {
      position: fixed; left: 0; top: 0; bottom: 0; z-index: 40; width: 262px;
      transform: translateX(-105%); transition: transform 220ms ease;
      box-shadow: 20px 0 50px rgba(0,0,0,0.45);
    }
    .sidebar.open { transform: translateX(0); }
    .scrim.show { display: block; position: fixed; inset: 0; z-index: 30; background: rgba(4,4,10,0.55); backdrop-filter: blur(2px); }
    .menu-btn {
      display: inline-flex; align-items: center; justify-content: center;
      position: fixed; top: 12px; left: 12px; z-index: 20;
      width: 42px; height: 42px; border-radius: 12px; cursor: pointer;
      border: 1px solid var(--border-2); background: var(--surface);
      color: var(--text); font-size: 18px;
    }
    .header { padding: 64px 18px 4px; }
    .content { padding: 18px 14px calc(88px + env(safe-area-inset-bottom)); }
    .bottomnav {
      display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 25;
      background: var(--surface); border-top: 1px solid var(--border-2);
      padding: 7px 4px calc(7px + env(safe-area-inset-bottom));
    }
    .bn-btn {
      flex: 1; border: none; background: transparent; cursor: pointer;
      color: var(--text-dim); font: inherit; font-size: 10px; font-weight: 700;
      display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 3px 0;
    }
    .bn-btn .nav-emoji { font-size: 18px; width: auto; }
    .bn-btn.active { color: var(--accent); }
  }
`;

// ── Shared bits ─────────────────────────────────────────────────

function StatusPill({ tone, label }) {
  return <span className={`status ${tone}`}><span className="dot" /> {label}</span>;
}

function MetaRows({ rows }) {
  return rows.map(([k, v]) => (
    <div className="meta-row" key={k}><span className="meta-k">{k}</span><span className="meta-v">{v}</span></div>
  ));
}

// A collapsible table row: main line + expandable detail
function ExpandRow({ name, kind, side, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="trow click" onClick={() => setOpen(!open)}>
        <div className="trow-main">
          <div className="trow-name">{name}</div>
          {kind && <div className="trow-kind">{kind}</div>}
        </div>
        <div className="trow-side">{side}<span className={`trow-chev ${open ? 'open' : ''}`}>{'\u25B6'}</span></div>
      </div>
      {open && <div className="tdetail">{children}</div>}
    </>
  );
}

function Panel({ title, sub, right, children, next }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div><div className="panel-title">{title}</div>{sub && <div className="panel-sub">{sub}</div>}</div>
        {right}
      </div>
      {children}
      {next && <span className="next-chip"><b>NEXT STEP</b>{next}</span>}
    </section>
  );
}

// ── Login ───────────────────────────────────────────────────────

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('password');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const submit = async () => {
    setErr(''); setOk(''); setBusy(true);
    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setOk('Magic link sent — check your email.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e) { setErr(e.message || 'Sign-in failed.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">
          <img src={LOGO} alt="" />
          <div className="brand-name">Inspire<small>COMMAND CENTER</small></div>
        </div>
        <div className="field"><label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} /></div>
        {mode === 'password' && (
          <div className="field"><label htmlFor="pw">Password</label>
            <input id="pw" className="input" type="password" autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} /></div>
        )}
        {err && <div className="err">{err}</div>}
        {ok && <div className="okmsg">{ok}</div>}
        <button className="btn" onClick={submit} disabled={busy || !email}>
          {busy ? 'Working\u2026' : mode === 'magic' ? 'Send magic link' : 'Sign in'}
        </button>
        <button className="btn ghost" onClick={() => { setMode(mode === 'magic' ? 'password' : 'magic'); setErr(''); setOk(''); }}>
          {mode === 'magic' ? 'Use password instead' : 'Email me a magic link'}
        </button>
      </div>
    </div>
  );
}

// ── Pages ───────────────────────────────────────────────────────

function CommandPage({ counts }) {
  const cards = [
    { n: counts.robots, k: 'Robots in fleet', sub: 'VECTOR + ATLAS on standby' },
    { n: counts.memory, k: 'Memory entries', sub: 'Running build record' },
    { n: counts.notes, k: 'Notes', sub: 'Notepad is live' },
    { n: SYSTEMS.filter((s) => s.status === 'connected').length, k: 'Systems connected', sub: `${SYSTEMS.filter((s) => s.status !== 'connected').length} awaiting wire-up` },
  ];
  return (
    <>
      <div className="stats">
        {cards.map((c) => (
          <div className="stat" key={c.k}>
            <div className="stat-n">{c.n}</div><div className="stat-k">{c.k}</div><div className="stat-sub">{c.sub}</div>
          </div>
        ))}
      </div>
      <Panel title="Today's state" sub="What the cockpit knows right now" right={<StatusPill tone="connected" label="Data store live" />}>
        <div style={{ padding: '12px 18px 14px', fontSize: 14, lineHeight: 1.55, color: 'var(--text-mut)' }}>
          Login, robot fleet, Memory, Notepad, and Reports all persist to the dedicated Inspire data store.
          The four Source One projects are linked on Systems and feed the Business dashboards as they get wired.
        </div>
        <div style={{ padding: '0 18px 14px' }}>
          <MetaRows rows={[['Data store', 'rbwdzgjymkorehkdqzmy.supabase.co'], ['Hosting', 'GitHub Pages \u2192 inspiresapp.com'], ['Fleet', 'VECTOR \u00b7 ATLAS']]} />
        </div>
      </Panel>
    </>
  );
}

function PlaceholderPage({ pageId, title }) {
  const p = PLACEHOLDERS[pageId];
  return (
    <Panel title={title} right={<StatusPill tone="pending" label="Placeholder" />} next={p.next}>
      {p.rows.map(([name, kind]) => (
        <div className="trow" key={name}>
          <div className="trow-main"><div className="trow-name">{name}</div><div className="trow-kind">{kind}</div></div>
          <div className="trow-side"><span className="meta-k">{'\u2014'}</span></div>
        </div>
      ))}
    </Panel>
  );
}

function BusinessPage({ pageId, title }) {
  const b = BUSINESS_PAGES[pageId];
  return (
    <>
      <div className="stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {b.metrics.map((m) => (
          <div className="stat" key={m}><div className="stat-n">{'\u2014'}</div><div className="stat-k">{m}</div></div>
        ))}
      </div>
      <Panel title={title} sub={b.blurb} right={<StatusPill tone="pending" label="Awaiting wire-up" />}
        next="Add anon key + read-only views, then these numbers go live.">
        <div style={{ padding: '10px 18px 4px' }}>
          <MetaRows rows={[['Source project', `${b.ref}.supabase.co`]]} />
        </div>
      </Panel>
    </>
  );
}

function SystemsPage() {
  return (
    <Panel title="Connected systems" sub={`${SYSTEMS.length} services \u00b7 tap a row for details`}>
      {SYSTEMS.map((s) => (
        <ExpandRow key={s.id} name={s.name} kind={s.kind} side={<StatusPill tone={s.status} label={s.statusLabel} />}>
          <MetaRows rows={s.meta} />
        </ExpandRow>
      ))}
    </Panel>
  );
}

function RobotsPage({ robots }) {
  return (
    <Panel title="The fleet" sub={`${robots.length} units \u00b7 tap a row for the full profile`}>
      {robots.map((r) => (
        <ExpandRow key={r.slug} name={r.name} kind={r.callsign} side={<StatusPill tone={r.status} label={r.status_label || r.status} />}>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-mut)', padding: '8px 0 4px' }}>{r.description}</p>
          <MetaRows rows={[['Assignment', r.assignment], ['Duties', r.duties], ['APIs', r.apis || 'To be connected']]} />
        </ExpandRow>
      ))}
    </Panel>
  );
}

function MemoryPage({ entries, refresh }) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState('Build');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!title.trim()) return;
    setBusy(true);
    await supabase.from('inspire_memory').insert({ tag, title: title.trim(), body: body.trim() });
    setTitle(''); setBody(''); setOpen(false); setBusy(false); refresh();
  };

  return (
    <>
      {!open ? (
        <button className="btn small" style={{ justifySelf: 'start' }} onClick={() => setOpen(true)}>+ Add memory</button>
      ) : (
        <Panel title="New memory">
          <div style={{ padding: '14px 18px', display: 'grid', gap: 12 }}>
            <div className="form-row">
              <div className="field"><label>Tag</label>
                <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
                  {['Build', 'Milestone', 'Infra', 'Robots', 'Integration', 'Decision'].map((x) => <option key={x}>{x}</option>)}
                </select></div>
              <div className="field" style={{ flex: 3 }}><label>Title</label>
                <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            </div>
            <div className="field"><label>What happened</label>
              <textarea className="input" value={body} onChange={(e) => setBody(e.target.value)} /></div>
            <div className="form-row">
              <button className="btn small" onClick={save} disabled={busy || !title.trim()}>Save memory</button>
              <button className="btn ghost small" onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        </Panel>
      )}
      <div className="timeline">
        {entries.map((m) => (
          <div className="mem" key={m.id}>
            <div className="mem-head">
              <span className="mem-date">{new Date(m.entry_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {m.tag && <span className="mem-tag">{m.tag}</span>}
            </div>
            <h3>{m.title}</h3><p>{m.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function NotepadPage({ notes, refresh }) {
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    if (editing === 'new') await supabase.from('inspire_notepad').insert({ title: title.trim() || 'Untitled', body });
    else await supabase.from('inspire_notepad').update({ title: title.trim() || 'Untitled', body, updated_at: new Date().toISOString() }).eq('id', editing.id);
    setBusy(false); setEditing(null); refresh();
  };
  const remove = async () => {
    setBusy(true);
    await supabase.from('inspire_notepad').delete().eq('id', editing.id);
    setBusy(false); setEditing(null); refresh();
  };

  if (editing) {
    return (
      <Panel title={editing === 'new' ? 'New note' : 'Edit note'}>
        <div style={{ padding: '14px 18px', display: 'grid', gap: 12 }}>
          <div className="field"><label>Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="field"><label>Note</label>
            <textarea className="input" style={{ minHeight: 220 }} value={body} onChange={(e) => setBody(e.target.value)} /></div>
          <div className="form-row">
            <button className="btn small" onClick={save} disabled={busy}>Save note</button>
            <button className="btn ghost small" onClick={() => setEditing(null)}>Back</button>
            {editing !== 'new' && <button className="btn dangerous small" onClick={remove} disabled={busy}>Delete</button>}
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <>
      <button className="btn small" style={{ justifySelf: 'start' }}
        onClick={() => { setEditing('new'); setTitle(''); setBody(''); }}>+ New note</button>
      <Panel title="Notes" sub={notes.length ? `${notes.length} saved` : undefined}>
        {notes.length === 0 && <div className="empty">Notepad is live — write the first note and it saves straight to the data store.</div>}
        {notes.map((n) => (
          <div className="trow click" key={n.id} onClick={() => { setEditing(n); setTitle(n.title); setBody(n.body || ''); }}>
            <div className="trow-main">
              <div className="trow-name">{n.title}</div>
              {n.body && <div className="trow-kind">{n.body.length > 90 ? n.body.slice(0, 90) + '\u2026' : n.body}</div>}
            </div>
            <div className="trow-side"><span className="mem-date">{new Date(n.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
          </div>
        ))}
      </Panel>
    </>
  );
}

function ReportsPage({ reports }) {
  if (!reports.length) {
    return (
      <Panel title="Reports" right={<StatusPill tone="connected" label="Live" />}
        next="Wire the first Business dashboard, then pipe its numbers into inspire_reports.">
        <div className="empty">Waiting on the first metric — as VECTOR and the Business wiring come online, numbers land here.</div>
      </Panel>
    );
  }
  return (
    <div className="stats">
      {reports.map((r) => (
        <div className="stat" key={r.id}>
          <div className="stat-n">{Number(r.value).toLocaleString()}{r.unit || ''}</div>
          <div className="stat-k">{r.metric}</div>
          <div className="stat-sub">{r.period || ''}{r.source ? ` \u00b7 ${r.source}` : ''}</div>
        </div>
      ))}
    </div>
  );
}

// ── Page registry ───────────────────────────────────────────────

const PAGES = {
  command: { eyebrow: 'Cockpit', title: 'Command Center', sub: 'The one screen that knows the true state of everything Duane is running.' },
  health: { eyebrow: 'Life', title: 'Health', sub: 'Training, recovery, and habit streaks.' },
  family: { eyebrow: 'Life', title: 'Family', sub: 'Dates, events, and the people that matter.' },
  goals: { eyebrow: 'Life', title: 'Goals', sub: 'The yearly targets and the weekly scoreboard.' },
  links: { eyebrow: 'Life', title: 'Links', sub: 'The personal shortcuts you reach for daily.' },
  findash: { eyebrow: 'Finance', title: 'Dashboard', sub: 'Net worth and cash position at a glance.' },
  banking: { eyebrow: 'Finance', title: 'Banking', sub: 'Linked bank accounts and balances.' },
  bookkeeping: { eyebrow: 'Finance', title: 'Bookkeeping', sub: 'Income, expenses, and statements.' },
  assets: { eyebrow: 'Finance', title: 'Assets', sub: 'Real estate and vehicles.' },
  insurance: { eyebrow: 'Finance', title: 'Insurance', sub: 'Policies and coverage.' },
  clients: { eyebrow: 'Business \u00b7 Source One', title: 'Clients', sub: 'Client records, dashboards, and engagement.' },
  checkins: { eyebrow: 'Business \u00b7 Source One', title: 'Check-Ins', sub: 'Studio and school check-in volume.' },
  sites: { eyebrow: 'Business \u00b7 Source One', title: 'Sites', sub: 'Website platform builds and inbound forms.' },
  systems: { eyebrow: 'Infrastructure', title: 'Systems', sub: 'Every connected service, its status, and its next step.' },
  robots: { eyebrow: 'The fleet', title: 'Robot Systems', sub: 'The automation fleet \u2014 who is assigned where.' },
  memory: { eyebrow: 'Intelligence', title: 'Memory', sub: 'The running record of every decision and change.' },
  notepad: { eyebrow: 'Intelligence', title: 'Notepad', sub: 'Quick notes that save straight to the data store.' },
  reports: { eyebrow: 'Intelligence', title: 'Reports', sub: 'Metrics captured from the connected systems.' },
};

// ── App shell ───────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(undefined);
  const [page, setPage] = useState('command');
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState({ });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('inspire-theme') || 'system'; } catch { return 'system'; }
  });
  const [robots, setRobots] = useState(ROBOTS_FALLBACK);
  const [memory, setMemory] = useState([]);
  const [notes, setNotes] = useState([]);
  const [reports, setReports] = useState([]);

  // Theme: resolve system preference + react to OS changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const resolved = theme === 'system' ? (mq.matches ? 'light' : 'dark') : theme;
      document.documentElement.setAttribute('data-theme', resolved);
    };
    apply();
    try { localStorage.setItem('inspire-theme', theme); } catch { /* private mode */ }
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadAll = useCallback(async () => {
    const [r, m, n, rp] = await Promise.all([
      supabase.from('inspire_robots').select('*').order('sort_order'),
      supabase.from('inspire_memory').select('*').order('entry_date', { ascending: false }).order('created_at', { ascending: false }),
      supabase.from('inspire_notepad').select('*').order('updated_at', { ascending: false }),
      supabase.from('inspire_reports').select('*').order('captured_at', { ascending: false }).limit(24),
    ]);
    if (r.data && r.data.length) setRobots(r.data);
    if (m.data) setMemory(m.data);
    if (n.data) setNotes(n.data);
    if (rp.data) setReports(rp.data);
  }, []);

  useEffect(() => { if (session) loadAll(); }, [session, loadAll]);

  if (session === undefined) return <><style>{CSS}</style><div className="login-wrap" /></>;
  if (!session) return <><style>{CSS}</style><LoginPage /></>;

  const current = PAGES[page];
  const counts = { robots: robots.length, memory: memory.length, notes: notes.length };
  const activeParent = PARENT_OF[page] || page;
  const isExpanded = (id) => expanded[id] !== undefined ? expanded[id] : activeParent === id;
  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !isExpanded(id) }));
  const go = (id) => { setPage(firstSub(id)); setDrawer(false); if (NAV.find((n) => n.id === id)?.subs) setExpanded((e) => ({ ...e, [id]: true })); };

  return (
    <>
      <style>{CSS}</style>
      <button className="menu-btn" aria-label="Open menu" onClick={() => setDrawer(true)}>{'\u2630'}</button>
      <div className={`scrim ${drawer ? 'show' : ''}`} onClick={() => setDrawer(false)} />
      <div className="shell">
        <aside className={`sidebar ${drawer ? 'open' : ''}`}>
          <div className="brand">
            <img src={LOGO} alt="" />
            <div className="brand-name">Inspire<small>COMMAND CENTER</small></div>
          </div>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <React.Fragment key={n.id}>
                <div className="nav-row">
                  <button className={`nav-btn ${activeParent === n.id ? 'active' : ''}`} onClick={() => go(n.id)}>
                    <span className="nav-emoji" aria-hidden="true">{n.emoji}</span>{n.label}
                  </button>
                  {n.subs && (
                    <button className={`chev ${isExpanded(n.id) ? 'open' : ''}`}
                      aria-label={`${isExpanded(n.id) ? 'Collapse' : 'Expand'} ${n.label}`}
                      onClick={() => toggle(n.id)}>{'\u25B6'}</button>
                  )}
                </div>
                {n.subs && isExpanded(n.id) && (
                  <div className="nav-subs">
                    {n.subs.map((s) => (
                      <button key={s.id} className={`nav-sub ${page === s.id ? 'active' : ''}`}
                        onClick={() => { setPage(s.id); setDrawer(false); }}>
                        <span className="nav-emoji" aria-hidden="true">{s.emoji}</span>{s.label}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
          <div className="sidebar-foot">
            <div className="field">
              <label>Appearance</label>
              <div className="theme-seg">
                {['system', 'light', 'dark'].map((t) => (
                  <button key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)}>
                    {t[0].toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="foot-user">
              <span>{session.user?.email}</span>
              <button className="signout" onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topstrip" />
          <header className="header">
            <div className="eyebrow">{current.eyebrow}</div>
            <h1>{current.title}</h1>
            <p className="header-sub">{current.sub}</p>
          </header>
          <main className="content">
            {page === 'command' && <CommandPage counts={counts} />}
            {PLACEHOLDERS[page] && <PlaceholderPage pageId={page} title={current.title} />}
            {BUSINESS_PAGES[page] && <BusinessPage pageId={page} title={current.title} />}
            {page === 'systems' && <SystemsPage />}
            {page === 'robots' && <RobotsPage robots={robots} />}
            {page === 'memory' && <MemoryPage entries={memory} refresh={loadAll} />}
            {page === 'notepad' && <NotepadPage notes={notes} refresh={loadAll} />}
            {page === 'reports' && <ReportsPage reports={reports} />}
          </main>
        </div>
      </div>

      <nav className="bottomnav" aria-label="Quick nav">
        {BOTTOM_NAV.map(({ id, label }) => {
          const n = NAV.find((x) => x.id === id);
          return (
            <button key={id} className={`bn-btn ${activeParent === id ? 'active' : ''}`} onClick={() => go(id)}>
              <span className="nav-emoji" aria-hidden="true">{n.emoji}</span>{label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

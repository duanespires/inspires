import React from 'react';
import { createClient } from '@supabase/supabase-js';

const { useState, useEffect, useCallback } = React;

// ════════════════════════════════════════════════════════════════
// INSPIRE — Duane's command center for everything he's building.
// Single-file React app. Brand tokens from s1-sites/BRAND.md.
// Data store: dedicated Supabase project "inspire" (RLS + anon key
// only — browser-safe). Management tokens and PATs NEVER live here.
// ════════════════════════════════════════════════════════════════

const T = {
  purple: '#651E82',
  purpleBright: '#662A9C',
  purpleDeep: '#481C7C',
  violet: '#9C5AD8',
  lavender: '#E4C6FC',
  ink: '#080810',
  inkSurface: '#16161C',
  mist: '#F6F4FA',
  text: '#0C0E1A',
  ok: '#3DDC97',
  pending: '#F5B841',
  standby: '#9C5AD8',
  danger: '#F26D6D',
};

const LOGO = 'https://app.sourceonesoftware.com/assets/images/s1-logo-960x960.png';

// ── Inspire data store (dedicated Supabase project — LIVE) ──────
const DATA_STORE = {
  url: 'https://rbwdzgjymkorehkdqzmy.supabase.co',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJid2R6Z2p5bWtvcmVoa2Rxem15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODQyNzAsImV4cCI6MjA5ODc2MDI3MH0.sTGgLBtQYHt2jZ7ltswGuT8dKsfqcD2REJRrVGY17qg',
};
const supabase = createClient(DATA_STORE.url, DATA_STORE.anonKey);

// ── Static data ─────────────────────────────────────────────────

const SYSTEMS = [
  {
    id: 'inspire-store',
    name: 'Inspire Data Store',
    kind: 'Auth + robots + memory + notepad + reports',
    status: 'connected',
    statusLabel: 'Connected',
    detail: 'Dedicated Supabase project — rbwdzgjymkorehkdqzmy',
    meta: [
      ['Endpoint', 'rbwdzgjymkorehkdqzmy.supabase.co'],
      ['Holds', 'Login · robot fleet · memory · notes · reports'],
      ['Security', 'Anon key + Row-Level Security'],
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    kind: 'Source control + hosting',
    status: 'connected',
    statusLabel: 'Connected',
    detail: 'Hosts + serves Inspire',
    meta: [
      ['Account', 'duanespires'],
      ['Hosting', 'GitHub Pages → inspiresapp.com'],
      ['Access', 'Fine-grained PAT · contents + pages'],
    ],
  },
  {
    id: 'supabase-production',
    name: 'Supabase — S1 Production',
    kind: 'Students · enrollment · billing',
    status: 'pending',
    statusLabel: 'Linked · wiring pending',
    detail: 'Project ref ivjuwnbyeduzmkmukwoo',
    meta: [
      ['Endpoint', 'ivjuwnbyeduzmkmukwoo.supabase.co'],
      ['Serves', 'Source One core platform'],
      ['Next step', 'Wire KPI reads into Business'],
    ],
  },
  {
    id: 'supabase-checkin',
    name: 'Supabase — Check-In System',
    kind: 'Database + auth + edge functions',
    status: 'pending',
    statusLabel: 'Linked · wiring pending',
    detail: 'Project ref itmqbkdzdiiukweubqaj',
    meta: [
      ['Endpoint', 'itmqbkdzdiiukweubqaj.supabase.co'],
      ['Serves', 'Studio + school check-ins'],
      ['Next step', 'Wire check-in counts into Business'],
    ],
  },
  {
    id: 'supabase-website',
    name: 'Supabase — S1 Sites',
    kind: 'Database + auth + edge functions',
    status: 'pending',
    statusLabel: 'Linked · wiring pending',
    detail: 'Project ref eqadwdvednxvnuyrgwrz',
    meta: [
      ['Endpoint', 'eqadwdvednxvnuyrgwrz.supabase.co'],
      ['Serves', 'S1 website platform'],
      ['Next step', 'Wire site + form stats into Business'],
    ],
  },
  {
    id: 'supabase-client',
    name: 'Supabase — Client Data',
    kind: 'Database + auth + edge functions',
    status: 'pending',
    statusLabel: 'Linked · wiring pending',
    detail: 'Project ref sekhxglapwllavpspozd',
    meta: [
      ['Endpoint', 'sekhxglapwllavpspozd.supabase.co'],
      ['Serves', 'Client records + dashboards'],
      ['Next step', 'Wire client metrics into Business'],
    ],
  },
];

// Fallback fleet if the network read fails — DB is source of truth.
const ROBOTS_FALLBACK = [
  {
    slug: 'vector',
    name: 'VECTOR',
    callsign: 'Inspire operations robot',
    status: 'standby',
    status_label: 'Standby · awaiting API hookup',
    description:
      'Runs the cockpit. VECTOR watches every connected system from inside ' +
      'Inspire — integration health, deploy status, and alerts — and keeps ' +
      'the Memory log, so Inspire always knows the true state of the fleet.',
    assignment: 'Inspire',
    duties: 'System monitoring · deploy checks · memory log',
    apis: 'To be connected',
  },
  {
    slug: 'atlas',
    name: 'ATLAS',
    callsign: 'S1 operations robot',
    status: 'standby',
    status_label: 'Standby · awaiting API hookup',
    description:
      'Carries the business. ATLAS works across Source One — client data, ' +
      'check-ins, and website platform tasks — handling the heavy lifting ' +
      'so the team can stay on growth.',
    assignment: 'Source One Software operations',
    duties: 'Client data · check-ins · site platform tasks',
    apis: 'To be connected',
  },
];

const NAV = [
  { id: 'command', label: 'Command Center', glyph: '\u25CE' },
  { id: 'life', label: 'Life', glyph: '\u2740' },
  { id: 'finance', label: 'Finance', glyph: '\u25A4' },
  { id: 'business', label: 'Business', glyph: '\u25A3' },
  { id: 'systems', label: 'Systems', glyph: '\u25C9' },
  { id: 'robots', label: 'Robot Systems', glyph: '\u2B21' },
  {
    id: 'intel', label: 'Intelligence', glyph: '\u25C8',
    subs: [
      { id: 'memory', label: 'Memory' },
      { id: 'notepad', label: 'Notepad' },
      { id: 'reports', label: 'Reports' },
    ],
  },
];

const BOTTOM_NAV = ['life', 'finance', 'command', 'business', 'intel'];

const BUSINESS_TABS = [
  { id: 'clients', label: 'Clients', ref: 'sekhxglapwllavpspozd', blurb: 'Client records, dashboards, and engagement — sourced from the Client Data project.', metrics: ['Active clients', 'New this month', 'Engagement rate'] },
  { id: 'checkins', label: 'Check-Ins', ref: 'itmqbkdzdiiukweubqaj', blurb: 'Studio and school check-in volume — sourced from the Check-In System project.', metrics: ['Check-ins today', 'This week', 'Top location'] },
  { id: 'sites', label: 'Sites', ref: 'eqadwdvednxvnuyrgwrz', blurb: 'Website platform builds and inbound form submissions — sourced from the S1 Sites project.', metrics: ['Live sites', 'Form submissions', 'Build jobs'] },
];

const LIFE_GROUPS = [
  { title: 'Health', desc: 'Training, recovery, and habit streaks.', next: 'Decide the 3 numbers worth tracking daily.' },
  { title: 'Family', desc: 'Dates, events, and the people that matter.', next: 'Add birthdays + key dates.' },
  { title: 'Goals', desc: 'The yearly targets and the weekly scoreboard.', next: 'Write the 2026 targets.' },
  { title: 'Links', desc: 'The personal shortcuts you reach for daily.', next: 'Drop in the first 5 links.' },
];

const FINANCE_GROUPS = [
  { group: 'OVERVIEW', items: [{ title: 'Dashboard', desc: 'Net worth and cash position at a glance.', next: 'Goes live once accounts are connected.' }] },
  { group: 'ACCOUNTS', items: [
    { title: 'Banking', desc: 'Linked bank accounts and balances.', next: 'Plaid connection — later phase.' },
    { title: 'Bookkeeping', desc: 'Income, expenses, and statements.', next: 'Pick the source of truth (bank feed vs. manual).' },
  ]},
  { group: 'ASSETS', items: [
    { title: 'Real Estate', desc: 'Properties, loans, and equity.', next: 'Add first property record.' },
    { title: 'Vehicles', desc: 'Owned vehicles and values.', next: 'Add vehicle list.' },
  ]},
  { group: 'PROTECTION', items: [{ title: 'Insurance', desc: 'Policies and coverage.', next: 'Add policy summaries.' }] },
];

// ── Styles ──────────────────────────────────────────────────────

const CSS = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body {
    background: ${T.ink};
    color: ${T.mist};
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .shell { display: flex; min-height: 100%; }

  .sidebar {
    width: 236px; flex-shrink: 0;
    background: linear-gradient(180deg, #0B0716 0%, ${T.ink} 55%);
    border-right: 1px solid rgba(156, 90, 216, 0.14);
    display: flex; flex-direction: column;
    padding: 22px 14px calc(18px + env(safe-area-inset-bottom));
    position: sticky; top: 0; height: 100vh;
    overflow-y: auto;
  }
  .brand { display: flex; align-items: center; gap: 11px; padding: 2px 8px 20px; }
  .brand img { height: 42px; width: 42px; border-radius: 9px; }
  .brand-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-style: italic; font-size: 24px;
    letter-spacing: 0.04em; line-height: 0.92; text-transform: uppercase;
  }
  .brand-name small {
    display: block; font-size: 12px; font-weight: 700; font-style: normal;
    letter-spacing: 0.26em; color: ${T.violet}; margin-top: 3px;
  }
  .nav { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
  .nav-btn {
    display: flex; align-items: center; gap: 12px;
    width: 100%; border: 1px solid transparent; border-radius: 12px;
    background: transparent; color: rgba(246, 244, 250, 0.66);
    font: inherit; font-size: 15px; font-weight: 500;
    padding: 13px 14px; cursor: pointer; text-align: left;
    transition: background 160ms ease, color 160ms ease;
  }
  .nav-btn:hover { background: rgba(156, 90, 216, 0.10); color: ${T.mist}; }
  .nav-btn:focus-visible { outline: 2px solid ${T.violet}; outline-offset: 2px; }
  .nav-btn.active {
    background: linear-gradient(180deg, ${T.purpleBright} 0%, ${T.purpleDeep} 100%);
    color: #fff; border-color: rgba(228, 198, 252, 0.25);
    box-shadow: 0 6px 18px rgba(72, 28, 124, 0.55);
  }
  .nav-glyph { font-size: 15px; width: 18px; text-align: center; color: ${T.lavender}; }
  .nav-btn.active .nav-glyph { color: #fff; }
  .nav-subs {
    margin: 4px 0 4px 22px; padding-left: 12px;
    border-left: 1px solid rgba(156, 90, 216, 0.25);
    display: flex; flex-direction: column; gap: 2px;
  }
  .nav-sub {
    border: none; background: transparent; text-align: left; cursor: pointer;
    font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 8px;
    color: rgba(246, 244, 250, 0.55);
  }
  .nav-sub:hover { color: ${T.mist}; background: rgba(156, 90, 216, 0.10); }
  .nav-sub.active { color: #fff; background: rgba(102, 42, 156, 0.45); font-weight: 600; }
  .sidebar-foot {
    margin-top: auto; padding: 14px 10px 0;
    border-top: 1px solid rgba(156, 90, 216, 0.12);
    font-size: 12px; color: rgba(246, 244, 250, 0.45);
    display: flex; flex-direction: column; gap: 8px;
  }
  .signout {
    border: 1px solid rgba(156, 90, 216, 0.3); background: transparent;
    color: ${T.lavender}; border-radius: 9px; padding: 8px 10px;
    font: inherit; font-size: 12.5px; cursor: pointer;
  }
  .signout:hover { background: rgba(156, 90, 216, 0.12); }

  .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .topstrip {
    height: 4px;
    background: linear-gradient(90deg, ${T.purpleDeep} 0%, ${T.purpleBright} 55%, ${T.violet} 100%);
  }
  .header { padding: 30px 34px 6px; }
  .eyebrow {
    font-size: 12px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: ${T.violet}; margin-bottom: 6px;
  }
  h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(38px, 5.5vw, 56px);
    line-height: 0.95; text-transform: uppercase; letter-spacing: 0.015em;
  }
  .header-sub { margin-top: 10px; color: rgba(246, 244, 250, 0.62); font-size: 15px; max-width: 640px; }
  .content { padding: 26px 34px 50px; display: grid; gap: 16px; align-content: start; }
  @media (min-width: 980px) { .content.two-col { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 980px) { .content.three-col { grid-template-columns: 1fr 1fr 1fr; } }

  .card {
    position: relative; background: ${T.inkSurface};
    border: 1px solid rgba(156, 90, 216, 0.14);
    border-radius: 16px; padding: 22px 22px 20px 26px; overflow: hidden;
  }
  .card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; }
  .card.connected::before { background: ${T.ok}; box-shadow: 0 0 14px rgba(61, 220, 151, 0.55); }
  .card.pending::before   { background: ${T.pending}; box-shadow: 0 0 14px rgba(245, 184, 65, 0.45); }
  .card.standby::before   { background: ${T.violet}; box-shadow: 0 0 14px rgba(156, 90, 216, 0.55); }
  .card.active::before    { background: ${T.ok}; box-shadow: 0 0 14px rgba(61, 220, 151, 0.55); }
  .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
  .card h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 25px; line-height: 1;
    text-transform: uppercase; letter-spacing: 0.02em;
  }
  .card-kind { margin-top: 5px; font-size: 13px; color: rgba(246, 244, 250, 0.5); }
  .status {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 600; white-space: nowrap;
    padding: 6px 11px; border-radius: 999px;
    background: rgba(8, 8, 16, 0.65); border: 1px solid rgba(156, 90, 216, 0.2);
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
  .connected .dot, .active .dot { background: ${T.ok}; animation: pulse 2.2s ease-in-out infinite; }
  .pending .dot   { background: ${T.pending}; animation: pulse 2.2s ease-in-out infinite; }
  .standby .dot   { background: ${T.violet}; animation: pulse 2.8s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
  @media (prefers-reduced-motion: reduce) { .dot { animation: none !important; } }
  .card-detail { margin-top: 13px; font-size: 14px; color: ${T.lavender}; }
  .card-desc { margin-top: 12px; font-size: 14px; line-height: 1.55; color: rgba(246, 244, 250, 0.74); }
  .meta { margin-top: 16px; border-top: 1px solid rgba(156, 90, 216, 0.12); }
  .meta-row {
    display: flex; justify-content: space-between; gap: 16px;
    padding: 9px 0; font-size: 13px;
    border-bottom: 1px solid rgba(156, 90, 216, 0.07);
  }
  .meta-row:last-child { border-bottom: none; }
  .meta-k { color: rgba(246, 244, 250, 0.45); flex-shrink: 0; }
  .meta-v { color: ${T.mist}; text-align: right; word-break: break-word; }

  .robot-badge {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
    color: ${T.violet}; margin-bottom: 4px;
  }

  /* ── Stat cards (Command Center) ── */
  .stats { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 980px) { .stats { grid-template-columns: repeat(4, 1fr); } }
  .stat {
    background: ${T.inkSurface}; border: 1px solid rgba(156, 90, 216, 0.14);
    border-radius: 16px; padding: 18px 18px 16px;
  }
  .stat-n {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 42px; line-height: 1; color: #fff;
  }
  .stat-k { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(246,244,250,0.55); }
  .stat-sub { margin-top: 4px; font-size: 12px; color: ${T.violet}; }

  /* ── Sub tab strip (Business / Intelligence on mobile) ── */
  .tabstrip {
    display: flex; gap: 8px; padding: 0 34px; margin-top: 18px;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    position: sticky; top: 0; z-index: 5;
    background: linear-gradient(180deg, ${T.ink} 70%, transparent);
    padding-bottom: 10px;
  }
  .tab-pill {
    border: 1px solid rgba(156, 90, 216, 0.25); border-radius: 999px;
    background: transparent; color: rgba(246,244,250,0.6);
    font: inherit; font-size: 13.5px; font-weight: 600;
    padding: 9px 16px; cursor: pointer; white-space: nowrap;
  }
  .tab-pill.active {
    background: linear-gradient(180deg, ${T.purpleBright}, ${T.purpleDeep});
    color: #fff; border-color: rgba(228,198,252,0.3);
  }

  /* ── Memory timeline ── */
  .timeline { position: relative; padding-left: 26px; }
  .timeline::before {
    content: ''; position: absolute; left: 7px; top: 6px; bottom: 6px; width: 2px;
    background: linear-gradient(180deg, ${T.violet}, rgba(156,90,216,0.15));
  }
  .mem { position: relative; margin-bottom: 16px; }
  .mem::before {
    content: ''; position: absolute; left: -24px; top: 7px;
    width: 10px; height: 10px; border-radius: 50%;
    background: ${T.violet}; box-shadow: 0 0 10px rgba(156,90,216,0.7);
  }
  .mem-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .mem-date { font-size: 12px; color: rgba(246,244,250,0.45); }
  .mem-tag {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: ${T.lavender}; background: rgba(102,42,156,0.35);
    border: 1px solid rgba(156,90,216,0.3); border-radius: 999px; padding: 2px 9px;
  }
  .mem h3 { margin-top: 5px; font-size: 16px; font-weight: 700; }
  .mem p { margin-top: 5px; font-size: 14px; line-height: 1.55; color: rgba(246,244,250,0.7); }

  /* ── Forms ── */
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(246,244,250,0.55); }
  .input, textarea.input {
    background: rgba(8,8,16,0.7); border: 1px solid rgba(156,90,216,0.25);
    color: ${T.mist}; border-radius: 10px; padding: 12px 13px;
    font: inherit; font-size: 15px; width: 100%;
  }
  .input:focus { outline: 2px solid ${T.violet}; outline-offset: 1px; }
  textarea.input { min-height: 110px; resize: vertical; }
  .btn {
    border: none; border-radius: 11px; cursor: pointer; font: inherit;
    font-weight: 700; font-size: 14.5px; padding: 13px 20px; color: #fff;
    background: linear-gradient(180deg, ${T.purpleBright}, ${T.purpleDeep});
    box-shadow: 0 6px 18px rgba(72,28,124,0.55);
  }
  .btn:hover { filter: brightness(1.12); }
  .btn.ghost { background: transparent; border: 1px solid rgba(156,90,216,0.35); color: ${T.lavender}; box-shadow: none; }
  .btn.small { padding: 8px 14px; font-size: 13px; border-radius: 9px; }
  .btn.dangerous { background: transparent; border: 1px solid rgba(242,109,109,0.4); color: ${T.danger}; box-shadow: none; }
  .form-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .form-row .field { flex: 1; min-width: 140px; }
  .err { color: ${T.danger}; font-size: 13.5px; }
  .okmsg { color: ${T.ok}; font-size: 13.5px; }

  /* ── Empty states ── */
  .empty {
    border: 1px dashed rgba(156,90,216,0.3); border-radius: 16px;
    padding: 26px; text-align: center; color: rgba(246,244,250,0.55); font-size: 14px;
  }
  .empty b { color: ${T.lavender}; display: block; margin-bottom: 6px; font-size: 15px; }
  .next-step { margin-top: 12px; font-size: 12.5px; color: ${T.pending}; }
  .next-step::before { content: 'NEXT STEP  '; letter-spacing: 0.14em; font-weight: 700; color: rgba(245,184,65,0.75); }

  /* ── Login ── */
  .login-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background:
      radial-gradient(1000px 600px at 85% -10%, rgba(102,42,156,0.35), transparent 60%),
      radial-gradient(800px 500px at -10% 110%, rgba(72,28,124,0.4), transparent 55%),
      ${T.ink};
  }
  .login-card {
    width: 100%; max-width: 400px; background: ${T.inkSurface};
    border: 1px solid rgba(156,90,216,0.2); border-radius: 20px;
    padding: 34px 30px calc(30px + env(safe-area-inset-bottom));
    display: grid; gap: 16px;
  }
  .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
  .login-brand img { width: 46px; height: 46px; border-radius: 10px; }

  /* ── Mobile ── */
  .menu-btn { display: none; }
  .bottomnav { display: none; }
  .scrim { display: none; }
  @media (max-width: 900px) {
    .sidebar {
      position: fixed; left: 0; top: 0; bottom: 0; z-index: 40;
      transform: translateX(-105%); transition: transform 220ms ease;
      box-shadow: 20px 0 50px rgba(0,0,0,0.5);
    }
    .sidebar.open { transform: translateX(0); }
    .scrim.show {
      display: block; position: fixed; inset: 0; z-index: 30;
      background: rgba(4,4,10,0.6); backdrop-filter: blur(2px);
    }
    .menu-btn {
      display: inline-flex; align-items: center; justify-content: center;
      position: fixed; top: 14px; left: 14px; z-index: 20;
      width: 42px; height: 42px; border-radius: 12px; cursor: pointer;
      border: 1px solid rgba(156,90,216,0.3); background: rgba(8,8,16,0.8);
      color: ${T.mist}; font-size: 18px; backdrop-filter: blur(6px);
    }
    .header { padding: 68px 20px 6px; }
    .content { padding: 22px 18px calc(90px + env(safe-area-inset-bottom)); }
    .tabstrip { padding-left: 18px; padding-right: 18px; }
    .bottomnav {
      display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 25;
      background: rgba(8,8,16,0.92); backdrop-filter: blur(10px);
      border-top: 1px solid rgba(156,90,216,0.2);
      padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
    }
    .bn-btn {
      flex: 1; border: none; background: transparent; cursor: pointer;
      color: rgba(246,244,250,0.5); font: inherit; font-size: 10.5px; font-weight: 600;
      display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 4px 0;
    }
    .bn-btn .nav-glyph { font-size: 18px; width: auto; }
    .bn-btn.active { color: #fff; }
    .bn-btn.active .nav-glyph { color: ${T.lavender}; text-shadow: 0 0 12px rgba(156,90,216,0.9); }
  }
`;

// ── Shared bits ─────────────────────────────────────────────────

function Meta({ rows }) {
  return (
    <div className="meta">
      {rows.map(([k, v]) => (
        <div className="meta-row" key={k}>
          <span className="meta-k">{k}</span>
          <span className="meta-v">{v}</span>
        </div>
      ))}
    </div>
  );
}

function StatusPill({ tone, label }) {
  return (
    <span className={`status ${tone}`}>
      <span className="dot" /> {label}
    </span>
  );
}

// ── Login ───────────────────────────────────────────────────────

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('password'); // 'password' | 'magic'
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
    } catch (e) {
      setErr(e.message || 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">
          <img src={LOGO} alt="" />
          <div className="brand-name">Inspire<small>COMMAND CENTER</small></div>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" type="email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()} />
        </div>
        {mode === 'password' && (
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" className="input" type="password" autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()} />
          </div>
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
    { n: counts.robots ?? '\u2014', k: 'Robots in fleet', sub: 'VECTOR + ATLAS on standby' },
    { n: counts.memory ?? '\u2014', k: 'Memory entries', sub: 'Running build record' },
    { n: counts.notes ?? '\u2014', k: 'Notes', sub: 'Notepad is live' },
    { n: SYSTEMS.filter(s => s.status === 'connected').length, k: 'Systems connected', sub: `${SYSTEMS.length - SYSTEMS.filter(s => s.status === 'connected').length} awaiting wire-up` },
  ];
  return (
    <>
      <div className="stats">
        {cards.map((c) => (
          <div className="stat" key={c.k}>
            <div className="stat-n">{c.n}</div>
            <div className="stat-k">{c.k}</div>
            <div className="stat-sub">{c.sub}</div>
          </div>
        ))}
      </div>
      <div className="card active">
        <div className="card-top">
          <div><h2>Today&rsquo;s state</h2><div className="card-kind">What the cockpit knows right now</div></div>
          <StatusPill tone="connected" label="Data store live" />
        </div>
        <div className="card-desc">
          Login, robot fleet, Memory, Notepad, and Reports all persist to the dedicated
          Inspire data store. The four Source One projects are linked on the Systems page
          and feed the Business dashboards as they get wired.
        </div>
        <Meta rows={[
          ['Data store', 'rbwdzgjymkorehkdqzmy.supabase.co'],
          ['Hosting', 'GitHub Pages \u2192 inspiresapp.com'],
          ['Fleet', 'VECTOR \u00b7 ATLAS'],
        ]} />
      </div>
    </>
  );
}

function PlaceholderCard({ title, desc, next }) {
  return (
    <div className="card pending">
      <div className="card-top">
        <div><h2>{title}</h2></div>
        <StatusPill tone="pending" label="Placeholder" />
      </div>
      <div className="card-desc">{desc}</div>
      <div className="next-step">{next}</div>
    </div>
  );
}

function LifePage() {
  return LIFE_GROUPS.map((g) => <PlaceholderCard key={g.title} title={g.title} desc={g.desc} next={g.next} />);
}

function FinancePage() {
  return FINANCE_GROUPS.map((grp) => (
    <React.Fragment key={grp.group}>
      <div className="eyebrow" style={{ marginTop: 6 }}>{grp.group}</div>
      {grp.items.map((it) => <PlaceholderCard key={it.title} title={it.title} desc={it.desc} next={it.next} />)}
    </React.Fragment>
  ));
}

function BusinessPage() {
  const [tab, setTab] = useState('clients');
  const t = BUSINESS_TABS.find((x) => x.id === tab);
  return (
    <>
      <div className="tabstrip" style={{ padding: 0, position: 'static', background: 'none' }}>
        {BUSINESS_TABS.map((b) => (
          <button key={b.id} className={`tab-pill ${tab === b.id ? 'active' : ''}`} onClick={() => setTab(b.id)}>
            {b.label}
          </button>
        ))}
      </div>
      <div className="card pending">
        <div className="card-top">
          <div><h2>{t.label}</h2><div className="card-kind">{t.blurb}</div></div>
          <StatusPill tone="pending" label="Awaiting wire-up" />
        </div>
        <div className="stats" style={{ marginTop: 18 }}>
          {t.metrics.map((m) => (
            <div className="stat" key={m}>
              <div className="stat-n">{'\u2014'}</div>
              <div className="stat-k">{m}</div>
            </div>
          ))}
        </div>
        <Meta rows={[['Source project', `${t.ref}.supabase.co`], ['Next step', 'Add anon key + read-only views, then these numbers go live']]} />
      </div>
    </>
  );
}

function SystemsPage() {
  return SYSTEMS.map((s) => (
    <div className={`card ${s.status}`} key={s.id}>
      <div className="card-top">
        <div><h2>{s.name}</h2><div className="card-kind">{s.kind}</div></div>
        <StatusPill tone={s.status} label={s.statusLabel} />
      </div>
      <div className="card-detail">{s.detail}</div>
      <Meta rows={s.meta} />
    </div>
  ));
}

function RobotsPage({ robots }) {
  return robots.map((r) => (
    <div className={`card ${r.status}`} key={r.slug}>
      <div className="card-top">
        <div>
          <div className="robot-badge">Fleet unit</div>
          <h2>{r.name}</h2>
          <div className="card-kind">{r.callsign}</div>
        </div>
        <StatusPill tone={r.status} label={r.status_label || r.status} />
      </div>
      <div className="card-desc">{r.description}</div>
      <Meta rows={[['Assignment', r.assignment], ['Duties', r.duties], ['APIs', r.apis || 'To be connected']]} />
    </div>
  ));
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
    setTitle(''); setBody(''); setOpen(false); setBusy(false);
    refresh();
  };

  return (
    <>
      {!open
        ? <button className="btn small" style={{ justifySelf: 'start' }} onClick={() => setOpen(true)}>+ Add memory</button>
        : (
          <div className="card standby" style={{ display: 'grid', gap: 12 }}>
            <div className="form-row">
              <div className="field"><label>Tag</label>
                <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
                  {['Build', 'Milestone', 'Infra', 'Robots', 'Integration', 'Decision'].map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
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
        )}
      <div className="timeline">
        {entries.map((m) => (
          <div className="mem" key={m.id}>
            <div className="mem-head">
              <span className="mem-date">{new Date(m.entry_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {m.tag && <span className="mem-tag">{m.tag}</span>}
            </div>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function NotepadPage({ notes, refresh }) {
  const [editing, setEditing] = useState(null); // note object or 'new'
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  const openNew = () => { setEditing('new'); setTitle(''); setBody(''); };
  const openNote = (n) => { setEditing(n); setTitle(n.title); setBody(n.body || ''); };

  const save = async () => {
    setBusy(true);
    if (editing === 'new') {
      await supabase.from('inspire_notepad').insert({ title: title.trim() || 'Untitled', body });
    } else {
      await supabase.from('inspire_notepad').update({ title: title.trim() || 'Untitled', body, updated_at: new Date().toISOString() }).eq('id', editing.id);
    }
    setBusy(false); setEditing(null); refresh();
  };
  const remove = async () => {
    if (editing && editing !== 'new') {
      setBusy(true);
      await supabase.from('inspire_notepad').delete().eq('id', editing.id);
      setBusy(false); setEditing(null); refresh();
    }
  };

  if (editing) {
    return (
      <div className="card standby" style={{ display: 'grid', gap: 12 }}>
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
    );
  }

  return (
    <>
      <button className="btn small" style={{ justifySelf: 'start' }} onClick={openNew}>+ New note</button>
      {notes.length === 0 && (
        <div className="empty"><b>Notepad is live</b>Write the first note and it saves straight to the data store.</div>
      )}
      {notes.map((n) => (
        <div className="card standby" key={n.id} style={{ cursor: 'pointer' }} onClick={() => openNote(n)}>
          <div className="card-top">
            <div><h2 style={{ fontSize: 20 }}>{n.title}</h2></div>
            <span className="mem-date">{new Date(n.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          {n.body && <div className="card-desc" style={{ whiteSpace: 'pre-wrap' }}>{n.body.length > 200 ? n.body.slice(0, 200) + '\u2026' : n.body}</div>}
        </div>
      ))}
    </>
  );
}

function ReportsPage({ reports }) {
  if (!reports.length) {
    return (
      <div className="empty">
        <b>Reports are live &mdash; waiting on the first metric</b>
        As VECTOR and the Business wiring come online, metrics land in the data store and chart here.
        <div className="next-step">Wire the first Business dashboard, then pipe its numbers into inspire_reports.</div>
      </div>
    );
  }
  return (
    <div className="stats">
      {reports.map((r) => (
        <div className="stat" key={r.id}>
          <div className="stat-n">{Number(r.value).toLocaleString()}{r.unit || ''}</div>
          <div className="stat-k">{r.metric}</div>
          <div className="stat-sub">{r.period || ''} {r.source ? `\u00b7 ${r.source}` : ''}</div>
        </div>
      ))}
    </div>
  );
}

// ── Page registry ───────────────────────────────────────────────

const PAGES = {
  command: { eyebrow: 'Cockpit', title: 'Command Center', sub: 'The one screen that knows the true state of everything Duane is running.', cols: '' },
  life: { eyebrow: 'Personal', title: 'Life', sub: 'Health, family, goals, and the shortcuts that keep the personal side sharp.', cols: 'two-col' },
  finance: { eyebrow: 'Money & wealth', title: 'Finance', sub: 'Net worth, accounts, assets, and protection \u2014 wired up piece by piece.', cols: '' },
  business: { eyebrow: 'Source One', title: 'Business', sub: 'Clients, check-ins, and sites \u2014 each dashboard lights up as its project gets wired.', cols: '' },
  systems: { eyebrow: 'Infrastructure', title: 'Systems', sub: 'Every connected service, its status, and the next step to bring it fully online.', cols: 'two-col' },
  robots: { eyebrow: 'The fleet', title: 'Robot Systems', sub: 'The automation fleet \u2014 who is assigned where, and what each unit is responsible for.', cols: 'two-col' },
  memory: { eyebrow: 'Intelligence', title: 'Memory', sub: 'The running record of every decision and change \u2014 now persistent and appendable.', cols: '' },
  notepad: { eyebrow: 'Intelligence', title: 'Notepad', sub: 'Quick notes that save straight to the data store.', cols: '' },
  reports: { eyebrow: 'Intelligence', title: 'Reports', sub: 'Metrics captured from the connected systems.', cols: '' },
};

const INTEL_SUBS = ['memory', 'notepad', 'reports'];

// ── App shell ───────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [page, setPage] = useState('command');
  const [drawer, setDrawer] = useState(false);
  const [robots, setRobots] = useState(ROBOTS_FALLBACK);
  const [memory, setMemory] = useState([]);
  const [notes, setNotes] = useState([]);
  const [reports, setReports] = useState([]);

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
  const isIntel = INTEL_SUBS.includes(page);
  const navActive = (id) => (id === 'intel' ? isIntel : page === id);
  const go = (id) => { setPage(id === 'intel' ? 'memory' : id); setDrawer(false); };

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
                <button
                  className={`nav-btn ${navActive(n.id) ? 'active' : ''}`}
                  onClick={() => go(n.id)}
                >
                  <span className="nav-glyph" aria-hidden="true">{n.glyph}</span>
                  {n.label}
                </button>
                {n.subs && navActive(n.id) && (
                  <div className="nav-subs">
                    {n.subs.map((s) => (
                      <button key={s.id} className={`nav-sub ${page === s.id ? 'active' : ''}`}
                        onClick={() => { setPage(s.id); setDrawer(false); }}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>
          <div className="sidebar-foot">
            <span>{session.user?.email}</span>
            <button className="signout" onClick={() => supabase.auth.signOut()}>Sign out</button>
          </div>
        </aside>

        <div className="main">
          <div className="topstrip" />
          <header className="header">
            <div className="eyebrow">{current.eyebrow}</div>
            <h1>{current.title}</h1>
            <p className="header-sub">{current.sub}</p>
          </header>
          {isIntel && (
            <div className="tabstrip">
              {INTEL_SUBS.map((s) => (
                <button key={s} className={`tab-pill ${page === s ? 'active' : ''}`} onClick={() => setPage(s)}>
                  {PAGES[s].title}
                </button>
              ))}
            </div>
          )}
          <main className={`content ${current.cols}`}>
            {page === 'command' && <CommandPage counts={counts} />}
            {page === 'life' && <LifePage />}
            {page === 'finance' && <FinancePage />}
            {page === 'business' && <BusinessPage />}
            {page === 'systems' && <SystemsPage />}
            {page === 'robots' && <RobotsPage robots={robots} />}
            {page === 'memory' && <MemoryPage entries={memory} refresh={loadAll} />}
            {page === 'notepad' && <NotepadPage notes={notes} refresh={loadAll} />}
            {page === 'reports' && <ReportsPage reports={reports} />}
          </main>
        </div>
      </div>

      <nav className="bottomnav" aria-label="Quick nav">
        {BOTTOM_NAV.map((id) => {
          const n = NAV.find((x) => x.id === id);
          return (
            <button key={id} className={`bn-btn ${navActive(id) ? 'active' : ''}`} onClick={() => go(id)}>
              <span className="nav-glyph" aria-hidden="true">{n.glyph}</span>
              {id === 'command' ? 'Command' : id === 'intel' ? 'Intel' : n.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

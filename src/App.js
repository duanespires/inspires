import React from 'react';

const { useState, useEffect } = React;

// ════════════════════════════════════════════════════════════════
// INSPIRE — Duane's command center for everything he's building.
// (formerly "S1 Command Center"). Single-file React app.
// Brand tokens sourced from s1-sites/BRAND.md (verified May 2026).
// NOTE: No secrets live in this file. Live data wiring will use a
// Supabase anon (publishable) key only — guarded by Row-Level
// Security. Management tokens and PATs stay server-side, always.
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
};

const LOGO = 'https://app.sourceonesoftware.com/assets/images/s1-logo-960x960.png';

// ── Inspire data store (dedicated Supabase project — fill on greenlight) ──
// When these are set, Notepad + Reports flip from "ready" to live + persistent.
const DATA_STORE = { url: '', anonKey: '' };
const dataLive = Boolean(DATA_STORE.url && DATA_STORE.anonKey);

// ── Data ────────────────────────────────────────────────────────

const SYSTEMS = [
  {
    id: 'github',
    name: 'GitHub',
    kind: 'Source control + hosting',
    status: 'connected',
    statusLabel: 'Connected',
    detail: 'Org Source-One-Software · hosts + serves Inspire',
    meta: [
      ['Account', 'pmitchellceo-source'],
      ['Hosting', 'GitHub Pages → inspiresapp.com'],
      ['Access', 'Fine-grained PAT · contents + pages'],
    ],
  },
  {
    id: 'inspire-store',
    name: 'Inspire Data Store',
    kind: 'Memory + notepad + reports',
    status: 'pending',
    statusLabel: 'Awaiting greenlight',
    detail: 'Dedicated Supabase project for Inspire',
    meta: [
      ['Holds', 'Memory log · notes · report metrics'],
      ['Security', 'Anon key + Row-Level Security'],
      ['Next step', 'Spin up + create tables'],
    ],
  },
  {
    id: 'supabase-website',
    name: 'Supabase — S1 Website',
    kind: 'Database + auth + edge functions',
    status: 'pending',
    statusLabel: 'Linked · wiring pending',
    detail: 'Project ref eqadwdvednxvnuyrgwrz',
    meta: [
      ['Endpoint', 'eqadwdvednxvnuyrgwrz.supabase.co'],
      ['Serves', 'S1 website platform'],
      ['Next step', 'Add anon key + tables'],
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
      ['Next step', 'Add anon key + tables'],
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
      ['Next step', 'Add anon key + tables'],
    ],
  },
];

const ROBOTS = [
  {
    id: 'vector',
    name: 'VECTOR',
    callsign: 'Inspire operations robot',
    status: 'standby',
    statusLabel: 'Standby · awaiting API hookup',
    description:
      'Runs the cockpit. VECTOR watches every connected system from inside ' +
      'Inspire — integration health, deploy status, and alerts — and keeps ' +
      'the Memory log, so Inspire always knows the true state of the fleet.',
    meta: [
      ['Assignment', 'Inspire'],
      ['Duties', 'System monitoring · deploy checks · memory log'],
      ['APIs', 'To be connected'],
    ],
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    callsign: 'S1 operations robot',
    status: 'standby',
    statusLabel: 'Standby · awaiting API hookup',
    description:
      'Carries the business. ATLAS works across Source One — client data, ' +
      'check-ins, and website platform tasks — handling the heavy lifting ' +
      'so the team can stay on growth.',
    meta: [
      ['Assignment', 'Source One Software operations'],
      ['Duties', 'Client data · check-ins · site platform tasks'],
      ['APIs', 'To be connected'],
    ],
  },
];

// The running record VECTOR keeps. Read-only here; becomes live + appendable
// once the Inspire data store is connected.
const MEMORY = [
  {
    id: 'm7',
    date: 'Jun 25, 2026',
    tag: 'Infra',
    title: 'Host chosen — GitHub Pages',
    body:
      'Moving off Vercel. Inspire will be served by GitHub Pages on the custom ' +
      'domain inspiresapp.com (DNS managed at GoDaddy). Auto-deploy on every push.',
  },
  {
    id: 'm6',
    date: 'Jun 25, 2026',
    tag: 'Build',
    title: 'Memory, Notepad & Reports added',
    body:
      'Three new pages joined the sidebar. Memory (this page) is the running ' +
      'record of everything we build. Notepad and Reports go live once the ' +
      'Inspire data store is connected.',
  },
  {
    id: 'm5',
    date: 'Jun 25, 2026',
    tag: 'Milestone',
    title: 'Rebrand — S1 Command Center → Inspire',
    body:
      'The cockpit became Inspire: Duane\u2019s personal command center for ' +
      'everything he\u2019s running, with room to wire in his other apps over time.',
  },
  {
    id: 'm4',
    date: 'Jun 2026',
    tag: 'Integration',
    title: 'Wired into the hub',
    body:
      'An Inspire card was added to the Wizards Area in the s1-auth-hub admin, ' +
      'so it sits alongside the rest of the internal tools.',
  },
  {
    id: 'm3',
    date: 'Jun 2026',
    tag: 'Robots',
    title: 'Robots commissioned',
    body:
      'VECTOR (Inspire operations) and ATLAS (S1 operations) were added to the ' +
      'fleet on standby, each with an assignment and duties, awaiting API wiring.',
  },
  {
    id: 'm2',
    date: 'May 2026',
    tag: 'Build',
    title: 'Cockpit built',
    body:
      'Single-file React app: left sidebar, a Systems page (GitHub + three ' +
      'Supabase projects), and a Robot Systems page.',
  },
  {
    id: 'm1',
    date: 'May 2026',
    tag: 'Milestone',
    title: 'Project created',
    body:
      'The repo was created as a private repo in the Source-One-Software org — ' +
      'the first app in Duane\u2019s internal tooling suite.',
  },
];

const NAV = [
  { id: 'systems', label: 'Systems', glyph: '\u25C9' },
  { id: 'robots', label: 'Robot Systems', glyph: '\u2B21' },
  { id: 'memory', label: 'Memory', glyph: '\u25C8' },
  { id: 'notepad', label: 'Notepad', glyph: '\u270E' },
  { id: 'reports', label: 'Reports', glyph: '\u25A6' },
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
  .sidebar-foot {
    margin-top: auto; padding: 14px 10px 0;
    border-top: 1px solid rgba(156, 90, 216, 0.12);
    font-size: 12px; color: rgba(246, 244, 250, 0.45);
    display: flex; align-items: center; gap: 8px;
  }

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
  .content { padding: 26px 34px 50px; display: grid; gap: 16px; }
  @media (min-width: 980px) { .content.two-col { grid-template-columns: 1fr 1fr; } }

  .card {
    position: relative; background: ${T.inkSurface};
    border: 1px solid rgba(156, 90, 216, 0.14);
    border-radius: 16px; padding: 22px 22px 20px 26px; overflow: hidden;
  }
  .card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  }
  .card.connected::before { background: ${T.ok}; box-shadow: 0 0 14px rgba(61, 220, 151, 0.55); }
  .card.pending::before   { background: ${T.pending}; box-shadow: 0 0 14px rgba(245, 184, 65, 0.45); }
  .card.standby::before   { background: ${T.violet}; box-shadow: 0 0 14px rgba(156, 90, 216, 0.55); }
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
  .connected .dot { background: ${T.ok}; animation: pulse 2.2s ease-in-out infinite; }
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

  /* ── Memory timeline ── */
  .timeline { position: relative; padding-left: 26px; }
  .timeline::before {
    content: ''; position: absolute; left: 7px; top: 6px; bottom: 6px; width: 2px;
    background: linear-gradient(180deg, ${T.violet}, rgba(156,90,216,0.15));
  }
  .mem { position: relative; margin-bottom: 16px; }
  .mem::before {
    content: ''; position: absolute; left: -26px; top: 6px;
    width: 12px; height: 12px; border-radius: 50%;
    background: ${T.violet}; box-shadow: 0 0 0 4px rgba(156,90,216,0.18);
  }
  .mem-card {
    background: ${T.inkSurface}; border: 1px solid rgba(156, 90, 216, 0.14);
    border-radius: 14px; padding: 16px 18px;
  }
  .mem-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; flex-wrap: wrap; }
  .mem-date { font-size: 12px; color: rgba(246,244,250,0.5); }
  .chip {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: ${T.lavender}; background: rgba(156,90,216,0.16);
    border: 1px solid rgba(156,90,216,0.28); border-radius: 999px; padding: 3px 9px;
  }
  .mem-title {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
    font-size: 20px; line-height: 1.05; text-transform: uppercase; letter-spacing: 0.01em;
  }
  .mem-body { margin-top: 6px; font-size: 14px; line-height: 1.55; color: rgba(246,244,250,0.74); }

  /* ── Pending panel (Notepad / live features) ── */
  .panel {
    background: ${T.inkSurface}; border: 1px dashed rgba(156, 90, 216, 0.4);
    border-radius: 16px; padding: 34px 30px; text-align: center;
  }
  .panel-glyph { font-size: 34px; color: ${T.violet}; }
  .panel h3 {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 26px;
    text-transform: uppercase; letter-spacing: 0.02em; margin-top: 10px;
  }
  .panel p { margin: 10px auto 0; max-width: 460px; font-size: 14px; line-height: 1.6; color: rgba(246,244,250,0.66); }
  .note-preview {
    margin-top: 20px; text-align: left; background: rgba(8,8,16,0.5);
    border: 1px solid rgba(156,90,216,0.16); border-radius: 12px;
    padding: 14px 16px; color: rgba(246,244,250,0.4); font-size: 14px; min-height: 96px;
  }

  /* ── Reports metrics ── */
  .metrics { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
  .metric {
    background: ${T.inkSurface}; border: 1px solid rgba(156, 90, 216, 0.14);
    border-radius: 14px; padding: 18px 18px 16px;
  }
  .metric-k { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(246,244,250,0.5); }
  .metric-v {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-size: 40px; line-height: 1; margin-top: 8px;
  }
  .metric-sub { margin-top: 6px; font-size: 12.5px; color: ${T.lavender}; }
  .report-note {
    grid-column: 1 / -1; margin-top: 2px; font-size: 13px; color: rgba(246,244,250,0.55);
    background: rgba(156,90,216,0.08); border: 1px solid rgba(156,90,216,0.16);
    border-radius: 12px; padding: 14px 16px;
  }

  .menu-btn { display: none; }
  @media (max-width: 760px) {
    .shell { flex-direction: column; }
    .sidebar {
      position: fixed; z-index: 30; height: 100dvh;
      transform: translateX(-100%); transition: transform 220ms ease;
      box-shadow: 18px 0 50px rgba(0,0,0,0.5);
    }
    .sidebar.open { transform: translateX(0); }
    .scrim { position: fixed; inset: 0; z-index: 20; background: rgba(8,8,16,0.6); }
    .menu-btn {
      display: inline-flex; align-items: center; gap: 9px;
      margin: 14px 18px 0; width: fit-content;
      background: ${T.inkSurface}; color: ${T.mist};
      border: 1px solid rgba(156, 90, 216, 0.25); border-radius: 11px;
      font: inherit; font-size: 14px; font-weight: 600; padding: 10px 15px; cursor: pointer;
    }
    .header { padding: 18px 18px 4px; }
    .content { padding: 18px 18px 40px; }
  }
`;

// ── Components ──────────────────────────────────────────────────

function StatusPill({ status, label }) {
  return (
    <span className={`status ${status}`}>
      <span className="dot" /> {label}
    </span>
  );
}

function SystemCard({ s }) {
  return (
    <article className={`card ${s.status}`}>
      <div className="card-top">
        <div>
          <h2>{s.name}</h2>
          <div className="card-kind">{s.kind}</div>
        </div>
        <StatusPill status={s.status} label={s.statusLabel} />
      </div>
      <div className="card-detail">{s.detail}</div>
      <div className="meta">
        {s.meta.map(([k, v]) => (
          <div className="meta-row" key={k}>
            <span className="meta-k">{k}</span>
            <span className="meta-v">{v}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function RobotCard({ r }) {
  return (
    <article className={`card ${r.status}`}>
      <div className="card-top">
        <div>
          <div className="robot-badge">{r.callsign}</div>
          <h2>{r.name}</h2>
        </div>
        <StatusPill status={r.status} label={r.statusLabel} />
      </div>
      <p className="card-desc">{r.description}</p>
      <div className="meta">
        {r.meta.map(([k, v]) => (
          <div className="meta-row" key={k}>
            <span className="meta-k">{k}</span>
            <span className="meta-v">{v}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function MemoryView() {
  return (
    <div className="timeline">
      {MEMORY.map((m) => (
        <div className="mem" key={m.id}>
          <div className="mem-card">
            <div className="mem-meta">
              <span className="chip">{m.tag}</span>
              <span className="mem-date">{m.date}</span>
            </div>
            <div className="mem-title">{m.title}</div>
            <div className="mem-body">{m.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotepadView() {
  return (
    <div className="panel">
      <div className="panel-glyph">{'\u270E'}</div>
      <h3>Notepad is ready</h3>
      <p>
        This is your scratch space — quick notes, ideas, and to-dos that save to
        Inspire&rsquo;s data store and follow you across every device. It switches
        on the moment we connect the data store.
      </p>
      <div className="note-preview">Your saved notes will appear here&hellip;</div>
    </div>
  );
}

function ReportsView() {
  const live = SYSTEMS.filter((s) => s.status === 'connected').length;
  const linked = SYSTEMS.filter((s) => s.status === 'pending').length;
  const metrics = [
    { k: 'Memory entries', v: MEMORY.length, sub: 'Logged so far' },
    { k: 'Systems live', v: live, sub: `${linked} more linked & pending` },
    { k: 'Robots', v: ROBOTS.length, sub: 'On standby' },
    { k: 'Host', v: 'GH Pages', sub: 'inspiresapp.com (DNS pending)' },
    { k: 'Data store', v: dataLive ? 'Live' : 'Pending', sub: dataLive ? 'Connected' : 'Awaiting greenlight' },
  ];
  return (
    <div className="metrics">
      {metrics.map((m) => (
        <div className="metric" key={m.k}>
          <div className="metric-k">{m.k}</div>
          <div className="metric-v">{m.v}</div>
          <div className="metric-sub">{m.sub}</div>
        </div>
      ))}
      <div className="report-note">
        Snapshot view. Live, auto-updating metrics — deploy history, integration
        health, and activity — switch on once VECTOR&rsquo;s APIs and the Inspire
        data store are wired in.
      </div>
    </div>
  );
}

const PAGES = {
  systems: {
    eyebrow: 'Connections',
    title: 'Systems',
    sub: 'Every service Inspire talks to. Green rail means verified and live; amber means linked and waiting on wiring.',
    cols: 'two-col',
    render: () => SYSTEMS.map((s) => <SystemCard key={s.id} s={s} />),
  },
  robots: {
    eyebrow: 'Automation fleet',
    title: 'Robot Systems',
    sub: 'The automation crew. Each robot has an assignment, a set of duties, and API hookups ready for wiring.',
    cols: 'two-col',
    render: () => ROBOTS.map((r) => <RobotCard key={r.id} r={r} />),
  },
  memory: {
    eyebrow: 'Project record',
    title: 'Memory',
    sub: 'The running log VECTOR keeps of everything we build in Inspire. Read here; it becomes live and appendable once the data store is connected.',
    cols: 'one-col',
    render: () => <MemoryView />,
  },
  notepad: {
    eyebrow: 'Scratch space',
    title: 'Notepad',
    sub: 'Quick notes and ideas, saved to Inspire and synced across your devices.',
    cols: 'one-col',
    render: () => <NotepadView />,
  },
  reports: {
    eyebrow: 'Overview',
    title: 'Reports',
    sub: 'A snapshot of Inspire at a glance — what is built, what is live, and what is next.',
    cols: 'one-col',
    render: () => <ReportsView />,
  },
};

function App() {
  const [page, setPage] = useState('systems');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const current = PAGES[page];
  const go = (id) => {
    setPage(id);
    setMenuOpen(false);
  };

  return (
    <div className="shell">
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <img src={LOGO} alt="Inspire" />
          <div className="brand-name">
            Inspire
            <small>Command Center</small>
          </div>
        </div>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-btn ${page === n.id ? 'active' : ''}`}
              onClick={() => go(n.id)}
            >
              <span className="nav-glyph" aria-hidden="true">{n.glyph}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="dot" style={{ background: T.ok, width: 7, height: 7, borderRadius: '50%' }} />
          Inspire online · v1.1
        </div>
      </aside>

      <div className="main">
        <div className="topstrip" />
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>{'\u2630'} Menu</button>
        <header className="header">
          <div className="eyebrow">{current.eyebrow}</div>
          <h1>{current.title}</h1>
          <p className="header-sub">{current.sub}</p>
        </header>
        <main className={`content ${current.cols}`}>{current.render()}</main>
      </div>
    </div>
  );
}

export default App;

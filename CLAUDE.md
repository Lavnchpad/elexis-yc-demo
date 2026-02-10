# Elexis — AI Talent Intelligence Platform

## Project Overview
Recruitment SaaS platform with AI-powered candidate evaluation. Three-layer verification: Resume Analysis → GitHub Verification → AI Interview.

## Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS + shadcn/ui (Radix primitives) + React Router v6
- **Backend:** Node.js (separate repo/service)
- **UI Library:** shadcn/ui components in `frontend/src/components/ui/`
- **Custom Components:** `frontend/src/components/component/`

## Dev Server
```bash
cd frontend && npm run dev
# Runs on http://localhost:5173
```

## Project Structure
```
frontend/src/
├── App.jsx                     # Routes (real app + demo)
├── layout/AppLayout.jsx        # Navbar + Outlet wrapper
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Card, Table, Tabs, etc.)
│   └── component/              # App components (Navbar, Sidebar, Filter, etc.)
├── page/
│   ├── demo/                   # YC demo pages (static data, no auth)
│   │   ├── DemoJobsList.jsx    # Jobs list page
│   │   ├── DemoJobDetail.jsx   # Job detail with applicants pipeline
│   │   ├── DemoCandidate.jsx   # Candidate detail (talent profile, interview)
│   │   ├── DemoResumeCard.jsx  # Layer 1: Resume analysis card
│   │   └── DemoGithubCard.jsx  # Layer 2: GitHub verification card
│   └── ...                     # Real app pages (behind ProtectedRoute)
└── lib/
    └── demo-data.js            # All demo data (~1250 lines, single source of truth)
```

## Demo Routes
- `/demo/jobs` — Jobs list (4 companies)
- `/demo/job` — Job detail (Allervision Tech Senior Full Stack Engineer)
- `/demo/candidate` — Candidate detail (Rahul Kumar)

Demo pages use static data from `demo-data.js` and bypass authentication. Navbar detects demo mode via `location.pathname.startsWith("/demo")`.

## Demo Companies
1. **Allervision Tech** — Senior Full Stack Engineer (primary demo job)
2. **AccountingBaba** — Backend Engineer
3. **Sahas Engineering Corp.** — React Native Developer
4. **Soltech Techservices** — DevOps Engineer

## Key Patterns
- shadcn/ui components are imported from `@/components/ui/`
- Vite alias `@` maps to `frontend/src/`
- Demo pages import data directly from `@/lib/demo-data`
- Real app uses context providers (CandidatesContext, JobsContext, UserContext)
- `font-mono` class breaks ₹ (rupee) symbol rendering — avoid using it on elements displaying currency values

## Git Remotes
- `origin` — https://github.com/Hirebro/CompanyDashboardForElexis.git (production app, do NOT push demo code here)
- `demo` — https://github.com/Lavnchpad/elexis-yc-demo.git (YC demo, push here)

## Candidate Data (Demo)
- **5 inbound applicants** for Allervision Tech job (Rahul 87%, Priya 72%, Amit 44%, Sneha 35%, Kunal 28%)
- **4 suggested candidates** cross-matched from other jobs
- **2 shortlisted** for interview (Rahul — completed, Priya — scheduled)
- Interview data: detailed summary (skills grid, strengths, areas for improvement, recommendation) + transcript (14 Q&A exchanges, 22 mins)

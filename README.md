# PathoWatch

AI/ML-powered Antimicrobial Resistance (AMR) Surveillance & Early-Warning Platform.

## Stack

- **Frontend:** Next.js (App Router) + React + Tailwind CSS, JavaScript
- **Backend:** Next.js API routes (`src/app/api/`)
- **Database:** PostgreSQL (via `pg`)
- **AI/ML:** Separate service — will be wired into `src/app/api/ai/*` routes later

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in your DATABASE_URL
npm run dev
```

Visit http://localhost:3000

## Status

- [x] Project scaffold
- [x] Landing Page (`/`)
- [ ] AMR Near Me (`/amr-near-me`)
- [ ] AMR Map (`/amr-map`)
- [ ] Predictions (`/predictions`)
- [ ] Learn About AMR (`/learn`)
- [ ] WHO Guidance (`/who-guidance`)
- [ ] PostgreSQL schema + queries
- [ ] AI/ML API integration (owned by teammate — mock responses in place until then)

## Notes

- Replace `public/images/logo.png` with your real PathoWatch logo.
- Pages currently use realistic mock data from `src/lib/mockData.js`. Swap these
  for real `fetch()` calls to `src/app/api/*` once the DB is connected.
- `src/app/api/ai/{forecast,anomaly,hotspot}/route.js` are the integration
  points for your teammate's AI/ML service — keep the response shape stable
  so the frontend doesn't need to change when the mock is replaced.

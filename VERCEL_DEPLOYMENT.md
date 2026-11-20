# PathoWatch Deployment Guide for Vercel

## Prerequisites

1. GitHub repository linked to Vercel (https://github.com/R123achit/pathoWatch)
2. A PostgreSQL database URL

## Step 1: Create/Configure Your Database

You have several options:

### Option A: Use Vercel PostgreSQL (Recommended)
1. Go to your Vercel project dashboard
2. Click "Storage" → "Create Database" → "PostgreSQL"
3. Copy the connection string

### Option B: Use an External PostgreSQL Service
- Neon: https://neon.tech/
- Supabase: https://supabase.com/
- PlanetScale: https://planetscale.com/
- Digital Ocean: https://www.digitalocean.com/

## Step 2: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add the following:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

**Important:** Replace with your actual PostgreSQL connection string

## Step 3: Deploy

### First Time Deployment
1. Push changes to GitHub
2. Vercel will automatically detect and deploy
3. During build:
   - Dependencies will be installed
   - Prisma client will be generated
   - Next.js will build

### If Build Fails

If you get "Cannot find module '.prisma/client'" error:

**Solution 1: Ensure DATABASE_URL is set**
- Verify DATABASE_URL environment variable is configured in Vercel
- The value must be a valid PostgreSQL connection string
- It cannot be empty or localhost

**Solution 2: Rebuild**
- Go to Vercel dashboard
- Click "Deployments"
- Select the failed deployment
- Click the three dots → "Redeploy"

## Step 4: Initialize Database (After First Deployment)

After the first successful deployment, you need to initialize your database with the schema and seed data.

### Option A: Using Vercel Edge Functions (Recommended for one-time setup)

Create a temporary API route `/api/setup` that runs migrations:

```javascript
// src/app/api/setup/route.js
import { execSync } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // This only works in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
    }
    return NextResponse.json({ message: 'Setup complete' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Option B: Using Prisma Migrate via CLI (Recommended)

Locally:
```bash
# Connect to your deployed database
export DATABASE_URL="your_vercel_postgres_url"

# Run migrations
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

### Option C: Manual Setup

Use Vercel's PostgreSQL dashboard or your database provider's tools to:
1. Create the schema using `prisma/migrations/20260820164407_init_pathowatch_schema/migration.sql`
2. Run seed data from `prisma/seed.js`

## Environment Variables Checklist

- [ ] `DATABASE_URL` - Set in Vercel project settings
- [ ] Domain configured (optional)
- [ ] Git repository connected

## Troubleshooting

### Build Error: "Cannot find module '.prisma/client/default'"
**Cause:** DATABASE_URL not set or invalid
**Fix:** 
1. Verify DATABASE_URL in Vercel environment variables
2. Ensure it's a valid PostgreSQL connection string
3. Redeploy after fixing

### Build Error: "connect ECONNREFUSED"
**Cause:** DATABASE_URL points to localhost
**Fix:** Use a remote PostgreSQL database with valid credentials

### Deployment Success but Site Shows 500 Error
**Cause:** Database schema not initialized
**Fix:** Run migrations and seed data using Option B or C above

### Application runs but data APIs return empty
**Cause:** Database is empty (seed data not loaded)
**Fix:** Run `npx prisma db seed` on your deployed database

## Monitoring & Logs

1. View deployment logs: Vercel Dashboard → Deployments → [Your deployment] → Logs
2. View function logs: Vercel Dashboard → [Your project] → Logs
3. Database logs: Check your database provider's dashboard

## Next Steps After Deployment

1. Visit your deployed site: `https://your-project.vercel.app`
2. Test the navigation (Authority system removed)
3. Test API endpoints:
   - `https://your-project.vercel.app/api/surveillance/overview`
   - `https://your-project.vercel.app/api/map/ghaziabad`
   - `https://your-project.vercel.app/api/areas`

## Production Considerations

- Add rate limiting for APIs
- Implement proper error handling
- Set up monitoring and alerts
- Enable HTTPS (automatic with Vercel)
- Configure CORS if needed
- Add authentication if exposing admin endpoints

## Contact & Support

For issues, check:
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs/
- Next.js Docs: https://nextjs.org/docs

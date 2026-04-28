# Backend Deployment Guide

## Prerequisites
- GitHub account
- Backend running locally and tested
- Database service account (Neon, Supabase, etc.)

---

## Option 1: Deploy to Railway (Recommended) ⭐

Railway is ideal for Node.js/Express backends. Easy setup with GitHub integration.

### Step 1: Set Up Railway Account

1. Go to: https://railway.app
2. Click "Sign up"
3. Choose "GitHub" authentication
4. Authorize Railway to access your GitHub

### Step 2: Create New Project

1. Click "New Project" (or + icon)
2. Select "Deploy from GitHub repo"
3. Select `mini-sasa-task-manager` repository
4. Confirm authorization if needed

### Step 3: Configure Backend Service

1. Railway will detect `package.json`
2. Select `backend` folder as root
3. Click "Deploy"

### Step 4: Set Environment Variables

1. In Railway dashboard, go to your project
2. Click on the service
3. Go to **Variables** tab
4. Add these environment variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_key
NODE_ENV=production
PORT=3001
```

### Step 5: Get Backend URL

1. In Railway, go to **Settings** → **Domains**
2. Enable "Public Networking"
3. Copy the generated URL (e.g., `https://mini-task-backend.up.railway.app`)
4. Update frontend `VITE_API_URL` to: `https://mini-task-backend.up.railway.app/api`

---

## Option 2: Deploy to Render.com

### Step 1: Create Render Account

1. Go to: https://render.com
2. Click "Sign up"
3. Choose "GitHub"
4. Authorize Render

### Step 2: Create Web Service

1. Click "New" → "Web Service"
2. Select `mini-sasa-task-manager` repository
3. Click "Connect"

### Step 3: Configure Deployment

- **Name**: `mini-sasa-task-manager-backend`
- **Environment**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm run start`
- **Branch**: main

### Step 4: Add Environment Variables

Click "Advanced" and add:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=3001
```

### Step 5: Deploy

- Click "Create Web Service"
- Wait for deployment (3-5 minutes)
- Copy the service URL for frontend

---

## Option 3: Deploy to Fly.io

### Step 1: Install Fly CLI

```bash
# Windows PowerShell
iwr https://fly.io/install.ps1 -useb | iex

# Or download from https://fly.io/docs/getting-started/installing-flyctl/
```

### Step 2: Login to Fly

```bash
flyctl auth login
```

### Step 3: Create App

```bash
cd "C:\Projects\Product Space Assignment\backend"
flyctl launch

# Follow prompts:
# - App Name: mini-sasa-task-manager-backend
# - Region: (choose closest to you)
# - Database: No (use external database)
# - Deploy: Yes
```

### Step 4: Set Secrets

```bash
flyctl secrets set DB_HOST=your_db_host
flyctl secrets set DB_PASSWORD=your_password
flyctl secrets set JWT_SECRET=your_secret_key
flyctl secrets set NODE_ENV=production
```

### Step 5: Deploy

```bash
flyctl deploy
```

---

## Database Setup (Important!)

Your backend needs a PostgreSQL database. Choose one:

### Option A: Neon (PostgreSQL)

1. Go to: https://neon.tech
2. Sign up with GitHub
3. Create new project
4. Copy connection string: `postgresql://user:password@host/dbname`
5. Add to backend environment:
   ```
   DB_HOST=host
   DB_PORT=5432
   DB_USER=user
   DB_PASSWORD=password
   DB_NAME=dbname
   DB_DIALECT=postgres
   ```

### Option B: Supabase (PostgreSQL)

1. Go to: https://supabase.com
2. Sign up with GitHub
3. Create new project
4. Go to **Project Settings** → **Database**
5. Copy connection string
6. Add to backend environment variables

### Option C: Railway PostgreSQL Service

Within Railway project:
1. Click "Add Service" → "PostgreSQL"
2. Railway auto-populates DB variables
3. No manual setup needed!

---

## Complete Deployment Checklist

```
FRONTEND (Vercel):
☐ Push code to GitHub main branch
☐ Connect GitHub to Vercel
☐ Set VITE_API_URL environment variable
☐ Deploy and verify frontend loads
☐ Test navigation and UI

BACKEND (Railway/Render/Fly):
☐ Set up database (Neon/Supabase/Railway)
☐ Copy database connection string
☐ Deploy backend service
☐ Add all environment variables
☐ Get backend public URL

INTEGRATION:
☐ Update frontend VITE_API_URL to backend URL
☐ Redeploy frontend
☐ Test API endpoints in browser
☐ Test signup/login functionality
☐ Test task CRUD operations
```

---

## Verify Deployment

### Test Frontend
```bash
# Visit your Vercel URL
https://your-project.vercel.app

# Should load without errors
# Check browser console (F12) for any errors
```

### Test Backend
```bash
# Test health endpoint
curl https://your-backend.app/api/health

# Should return: {"status":"Server is running"}
```

### Test Integration
1. Go to frontend URL
2. Sign up with test account
3. Create a task
4. Verify task appears in dashboard
5. Logout and login again
6. Task should still be there

---

## Environment Variables Summary

### Frontend (.env or Vercel)
```
VITE_API_URL=https://your-backend.app/api
```

### Backend
```
DB_HOST=neon.tech (or your DB host)
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=secure_password
JWT_SECRET=super_secret_key_change_in_production
NODE_ENV=production
PORT=3001
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't deploy | Check `package.json` exists in backend folder, verify npm install works |
| API 404 errors | Ensure backend routes are correct, check `/api/health` endpoint |
| Database connection error | Verify DB credentials, check firewall rules allow connection |
| CORS errors | Ensure backend has CORS enabled in Express config |
| Stuck in loading | Check both frontend and backend logs, verify API URL is correct |

---

## Additional Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Fly Docs: https://fly.io/docs
- Neon Docs: https://neon.tech/docs

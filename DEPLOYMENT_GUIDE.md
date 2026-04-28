# DEPLOYMENT GUIDE FOR MINI SAAS TASK MANAGEMENT SYSTEM

## Overview
This guide provides step-by-step instructions to deploy the Mini SaaS Task Management System to production environments.

## Prerequisites
- GitHub account with repository created
- Accounts on Vercel (frontend), Render (backend), and Neon/Supabase (database)
- Git CLI installed locally

## Step 1: Prepare Repository

### 1.1 Initialize Git (if not done)
```bash
cd Mini-SaaS-Task-App
git init
git add .
git commit -m "Initial commit: Full stack task management system"
```

### 1.2 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/Mini-SaaS-Task-App.git
git branch -M main
git push -u origin main
```

## Step 2: Database Deployment (Neon or Supabase)

### Option A: Neon (Recommended)

1. Visit https://neon.tech and sign up
2. Click "Create a project"
3. Fill in project details
4. Copy the connection string that looks like:
   ```
   postgresql://user:password@host/dbname
   ```
5. Save this for the backend environment variables

### Option B: Supabase

1. Visit https://supabase.com and sign up
2. Create a new project
3. Go to "Project Settings" → "Database"
4. Copy the "Connection String" (URI format)
5. Save this for the backend environment variables

### Create Database Tables

Once you have a database URL, run:
```bash
# In backend directory
npm run migrate  # If you have migrations set up
# Or simply start the backend server on local machine with remote DB to sync tables
```

## Step 3: Backend Deployment (Render)

### 3.1 Create Render Account
1. Visit https://render.com
2. Sign up with GitHub (easier authentication)

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Fill in the form:
   - **Name**: mini-saas-task-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or Starter for production)

### 3.3 Set Environment Variables
1. In Render dashboard, go to your service
2. Click "Environment" tab
3. Add the following environment variables:
   ```
   DB_HOST=<your-neon-or-supabase-host>
   DB_PORT=5432
   DB_NAME=<your-database-name>
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   JWT_SECRET=<generate-a-strong-random-key>
   NODE_ENV=production
   PORT=10000
   ```

### 3.4 Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Once deployed, you'll get a URL like: `https://mini-saas-task-backend.onrender.com`
4. **Important**: Save this URL for frontend configuration

## Step 4: Frontend Deployment (Vercel)

### 4.1 Create Vercel Account
1. Visit https://vercel.com
2. Sign up with GitHub

### 4.2 Import Project
1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. Vercel will auto-detect it's a monorepo

### 4.3 Configure Frontend
1. In the import dialog:
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.4 Set Environment Variables
1. Click "Environment Variables"
2. Add:
   ```
   VITE_API_URL=https://mini-saas-task-backend.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

### 4.5 Deploy
1. Click "Deploy"
2. Vercel will build and deploy automatically
3. You'll get a URL like: `https://mini-saas-task-frontend.vercel.app`

## Step 5: Verify Deployment

1. Open your frontend URL in browser
2. Try to sign up with a test account
3. Create a test task
4. Check that everything works:
   - Signup ✓
   - Login ✓
   - Create Task ✓
   - Update Task ✓
   - Delete Task ✓
   - Logout ✓

## Step 6: Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render:
1. Go to your service settings
2. Add custom domain
3. Update DNS records

## Troubleshooting

### Backend Not Starting
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure database connection string is correct

### Frontend Can't Connect to Backend
- Check `VITE_API_URL` environment variable
- Ensure backend URL is correct and public
- Check CORS settings in backend

### Database Connection Issues
- Verify all database credentials
- Check if firewall is blocking connections
- Test connection locally first

## Monitoring and Maintenance

### View Logs
- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments

### Update Code
1. Make changes locally
2. Commit: `git commit -m "Your message"`
3. Push: `git push origin main`
4. Services will auto-redeploy

### Important Notes
- Keep `.env` file local, never commit it
- Use strong JWT_SECRET in production
- Enable HTTPS (both Render and Vercel do this)
- Monitor database performance
- Set up email notifications for errors

## Cost Considerations
- **Neon Database**: Free tier available
- **Render**: Free tier available (sleeps after 15 mins)
- **Vercel**: Free tier available
- **Supabase**: Free tier available

For production use, upgrade to paid plans for better uptime and performance.

---

Need help? Check the README.md for local setup instructions.

# Frontend Deployment Guide - Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

## Step 1: Deploy Frontend to Vercel

### Method 1: Using Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub (click "Sign up" if needed)
3. **Click "Add New"** → **"Project"**
4. **Select Repository**:
   - Find and click on `mini-sasa-task-manager`
   - Click "Import"

5. **Configure Project**:
   - **Project Name**: `mini-sasa-task-manager` (or any name)
   - **Framework Preset**: Select `Vite`
   - **Root Directory**: Click "Edit" and change to `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables**:
   - Click "Add Environment Variable"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api` (update after backend deployment)
   - For now, use: `http://localhost:5000/api` for testing

7. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - Your frontend will be live at: `https://your-project.vercel.app`

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project root
cd "C:\Projects\Product Space Assignment"

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Which scope? (your username)
# - Project name? mini-sasa-task-manager
# - Detected frontend in ./frontend? Yes
# - Want to modify vercel.json? No
```

## Step 2: Update Backend URL

Once your backend is deployed:

1. Go to Vercel dashboard → Your project
2. Go to **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to your backend URL
4. Vercel will auto-redeploy with new environment

## Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Domain will be active in 24-48 hours

---

## Troubleshooting Frontend Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Check `package.json` scripts, ensure `npm run build` works locally |
| API not connecting | Verify `VITE_API_URL` environment variable is set correctly |
| Blank white page | Check browser console for errors, verify routing in `App.jsx` |
| Stuck on loading | Clear browser cache, check backend is running |

---

## Vercel Deployment Benefits

✅ Auto-deploys on every `git push` to main branch
✅ Free SSL/HTTPS certificate
✅ Global CDN for fast delivery
✅ Easy rollback to previous versions
✅ Built-in analytics and monitoring

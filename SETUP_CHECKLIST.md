# ✅ SETUP CHECKLIST

Use this checklist to verify all setup steps are completed correctly.

## 📋 Pre-Setup Requirements

- [ ] Node.js (v16+) installed - Verify: `node -v`
- [ ] PostgreSQL installed locally - Verify: `psql --version`
- [ ] Git installed - Verify: `git --version`
- [ ] Code editor (VS Code) installed
- [ ] Terminal access
- [ ] Internet connection (for npm install)

---

## 🗄️ Database Setup

### Create Database
```bash
createdb task_management_db
```
- [ ] Database created successfully

### Verify Connection
```bash
psql -U postgres -d task_management_db -c "SELECT 1"
```
- [ ] Connection successful (returns: 1)

---

## 🔧 Backend Setup

### Navigate and Install
```bash
cd backend
npm install
```
- [ ] No installation errors
- [ ] All dependencies installed (node_modules folder exists)

### Configure Environment
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```
- [ ] .env file created
- [ ] Edit .env with your PostgreSQL password
- [ ] Verify all values are set:
  - [ ] DB_HOST=localhost
  - [ ] DB_PORT=5432
  - [ ] DB_NAME=task_management_db
  - [ ] DB_USER=postgres
  - [ ] DB_PASSWORD=YOUR_PASSWORD
  - [ ] JWT_SECRET=your_secret_key
  - [ ] PORT=5000
  - [ ] NODE_ENV=development

### Start Backend Server
```bash
npm run dev
```
- [ ] No errors in console
- [ ] See message: "✅ Database synchronized successfully"
- [ ] See message: "✅ Server running on http://localhost:5000"

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```
- [ ] Response: `{"status":"Server is running"}`

---

## 🎨 Frontend Setup

### Navigate and Install
```bash
cd ../frontend
npm install
```
- [ ] No installation errors
- [ ] All dependencies installed (node_modules folder exists)

### Configure Environment (Optional for local)
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```
- [ ] .env file created with:
  - [ ] VITE_API_URL=http://localhost:5000/api

### Start Frontend Server
```bash
npm run dev
```
- [ ] No compilation errors
- [ ] See message: "Local: http://localhost:3000/"
- [ ] Browser auto-opens (or manually open http://localhost:3000)

---

## 🧪 Application Testing

### Test Signup
1. [ ] Open http://localhost:3000
2. [ ] Click "Sign up here"
3. [ ] Enter email: testuser@example.com
4. [ ] Enter password: testpass123
5. [ ] Confirm password: testpass123
6. [ ] Click "Sign Up"
7. [ ] Redirected to login page ✓

### Test Login
1. [ ] Enter email: testuser@example.com
2. [ ] Enter password: testpass123
3. [ ] Click "Login"
4. [ ] Redirected to dashboard ✓

### Test Task Creation
1. [ ] See "Your Tasks" section
2. [ ] Enter task title: "My First Task"
3. [ ] Enter description: "This is a test task"
4. [ ] Click "Add Task"
5. [ ] Task appears in list ✓

### Test Task Management
1. [ ] [ ] Check task checkbox → Status changes to "Completed" ✓
2. [ ] [ ] Click "Edit" → Modal opens to edit ✓
3. [ ] [ ] Update task title and save ✓
4. [ ] [ ] Click "Delete" → Confirm dialog appears ✓
5. [ ] [ ] Confirm delete → Task removed ✓

### Test Logout
1. [ ] Click "Logout" button
2. [ ] Redirected to login page ✓
3. [ ] Token removed from localStorage

---

## 🔐 Security Verification

- [ ] Passwords are hashed in database (not plain text)
- [ ] JWT tokens work for subsequent requests
- [ ] Cannot access dashboard without login
- [ ] Cannot access tasks of other users
- [ ] Token expires after 24 hours

---

## 📱 Responsive Design Check

- [ ] Test on desktop (1920px width)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] All elements visible and functional
- [ ] Layout adapts properly

---

## 🚀 Ready for Deployment?

Before deploying to production, complete this:

- [ ] Read DEPLOYMENT_GUIDE.md
- [ ] Set strong JWT_SECRET for production
- [ ] Update database credentials for production DB
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring/logging
- [ ] Test on staging environment first

---

## 📚 Documentation Review

- [ ] Read README.md for detailed setup
- [ ] Read QUICK_START.md for quick reference
- [ ] Read API_TESTING_GUIDE.md for API testing
- [ ] Read DEPLOYMENT_GUIDE.md before deploying
- [ ] Read PROJECT_SUMMARY.md for overview

---

## 🆘 Troubleshooting

### If Backend Won't Start
1. [ ] Check PostgreSQL is running
2. [ ] Verify .env file with correct credentials
3. [ ] Delete node_modules and reinstall: `npm install`
4. [ ] Check port 5000 is not in use: `lsof -i :5000`

### If Frontend Won't Start
1. [ ] Check if backend is running
2. [ ] Delete node_modules and reinstall
3. [ ] Clear browser cache and localStorage
4. [ ] Check console for errors: F12

### If Cannot Login
1. [ ] Verify user was created (check signup)
2. [ ] Check backend logs for errors
3. [ ] Verify .env has correct JWT_SECRET

### If Tasks Not Loading
1. [ ] Check browser console (F12)
2. [ ] Check backend logs for errors
3. [ ] Verify token is being sent in headers
4. [ ] Check network tab to see API responses

---

## 🎉 Completion!

Once all checkboxes are marked:
✅ Your application is ready for local development
✅ All features are working correctly
✅ You can proceed to deployment

---

## 📞 Need Help?

1. Check error messages in terminal/console
2. Review corresponding documentation file
3. Check API_TESTING_GUIDE.md for API debugging
4. Look at specific controller files for business logic

---

**Good luck! 🚀**

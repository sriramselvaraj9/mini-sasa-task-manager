# Mini SaaS Task Management System

A full-stack web application that allows multiple users to register, log in, and manage their own private task lists. Built with React, Node.js, Express, PostgreSQL, and Tailwind CSS.

## 🎯 Project Overview

This is a production-ready SaaS (Software as a Service) application that demonstrates:
- **User Authentication**: Secure signup and login with JWT tokens and bcrypt password hashing
- **Private Task Management**: Each user can only access their own tasks
- **RESTful API**: Clean backend API with proper authentication middleware
- **Responsive UI**: Modern frontend built with React and Tailwind CSS
- **Database Relations**: One-to-Many relationship between Users and Tasks using Sequelize ORM

## 📋 Features

✅ User Registration & Login with JWT authentication  
✅ Create, Read, Update, and Delete (CRUD) tasks  
✅ Task status management (Pending/Completed)  
✅ Task descriptions and timestamps  
✅ User dashboard with task statistics  
✅ Responsive design with Tailwind CSS  
✅ Error handling and validation  

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database management
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Fetch API** - HTTP client

## 📁 Project Structure

```
Mini-SaaS-Task-App/
│
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection setup
│   ├── controllers/
│   │   ├── authController.js    # Login & Signup handlers
│   │   └── taskController.js    # Task CRUD handlers
│   ├── middlewares/
│   │   └── verifyToken.js       # JWT verification middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Task.js              # Task model
│   │   └── index.js             # Model exports
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── taskRoutes.js        # Task routes
│   ├── .env.example             # Environment variables template
│   ├── .gitignore               # Git ignore rules
│   ├── package.json             # Node dependencies
│   └── server.js                # Server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── TaskItem.jsx      # Task item component
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Signup.jsx        # Signup page
    │   │   └── Dashboard.jsx     # Main dashboard
    │   ├── services/
    │   │   └── api.js            # API calls
    │   ├── App.jsx               # Main App component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Tailwind CSS
    ├── index.html                # HTML template
    ├── tailwind.config.js        # Tailwind configuration
    ├── vite.config.js            # Vite configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── .gitignore                # Git ignore rules
    └── package.json              # Node dependencies
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Database Setup

1. Open PostgreSQL and create a new database:

```sql
CREATE DATABASE task_management_db;
```

2. Note down your PostgreSQL credentials:
   - Host: `localhost` (usually)
   - Port: `5432` (default)
   - Username: `postgres` (or your custom username)
   - Password: Your PostgreSQL password

### Step 2: Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file by copying the example:

```bash
# On Windows
copy .env.example .env

# On macOS/Linux
cp .env.example .env
```

4. Edit the `.env` file with your PostgreSQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development
```

5. Start the backend server:

```bash
npm run dev
```

You should see:
```
✅ Database synchronized successfully
✅ Server running on http://localhost:5000
```

### Step 3: Frontend Setup

1. In a new terminal, navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

4. Open your browser and go to: `http://localhost:3000`

## 🧪 Testing the Application

### Register a New User

1. Click "Sign up here" on the login page
2. Enter an email and password (minimum 6 characters)
3. Confirm your password and submit
4. You'll be redirected to the login page

### Login

1. Enter your registered email and password
2. Click "Login"
3. You'll be taken to the dashboard

### Manage Tasks

1. **Add a Task**: Enter a title and optional description, then click "Add Task"
2. **Complete a Task**: Check the checkbox to mark a task as "Completed"
3. **Edit a Task**: Click "Edit" to modify the title or description
4. **Delete a Task**: Click "Delete" to remove a task (you'll be asked for confirmation)

### Logout

Click the "Logout" button in the top-right corner of the navbar

## 📡 API Endpoints

### Authentication Routes
- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Login user

### Task Routes (Require JWT Token)
- **GET** `/api/tasks` - Get all user tasks
- **POST** `/api/tasks` - Create a new task
- **GET** `/api/tasks/:taskId` - Get a single task
- **PUT** `/api/tasks/:taskId` - Update a task
- **DELETE** `/api/tasks/:taskId` - Delete a task

### Example API Request

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Tasks (replace TOKEN with the JWT from login)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"

# Create Task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Task","description":"Task description"}'
```

## 🔐 Security Features

✅ **Password Hashing**: Passwords are hashed using bcrypt (10 salt rounds)  
✅ **JWT Authentication**: All protected routes require valid JWT tokens  
✅ **User Isolation**: Users can only access their own tasks  
✅ **Token Expiration**: Tokens expire after 24 hours  
✅ **SQL Injection Prevention**: Sequelize ORM prevents SQL injection  
✅ **Environment Variables**: Sensitive data stored in `.env` file  

## 🚢 Deployment

### Deploy Backend (Render.com example)

1. Push your code to GitHub
2. Sign up at [Render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables in Render dashboard
6. Deploy

### Deploy Database (Supabase/Neon example)

1. Sign up at [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Update `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in backend `.env`

### Deploy Frontend (Vercel example)

1. Sign up at [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## 🐛 Troubleshooting

### "Connection refused" error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify DB_HOST and DB_PORT are correct

### "Cannot find module" error
- Run `npm install` in both backend and frontend folders
- Delete `node_modules` and reinstall if issues persist

### JWT token errors
- Ensure `Authorization` header format is `Bearer <token>`
- Check if token has expired (tokens expire after 24 hours)
- Try logging in again to get a new token

### Port already in use
- Backend: Change PORT in `.env` (default: 5000)
- Frontend: Vite will automatically use next available port

## 📚 Learning Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/)

## 📝 Notes

- This project is designed for educational purposes
- For production, use HTTPS and stronger JWT secrets
- Consider adding rate limiting and request validation
- Implement refresh token mechanism for better security
- Add logging and monitoring systems
- Set up automated testing with Jest

## 👨‍💻 Authors

Mini SaaS Task Management System

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Coding! 🎉**

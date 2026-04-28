# API TESTING GUIDE

This guide provides curl commands to test all API endpoints. Make sure your backend is running on `http://localhost:5000`.

## Authentication Endpoints

### 1. Signup (Create Account)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "userId": "uuid-here",
  "email": "testuser@example.com"
}
```

### 2. Login (Get JWT Token)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "testuser@example.com"
  }
}
```

**Note:** Save the `token` value - you'll need it for protected routes!

---

## Task Endpoints (Protected - Require JWT Token)

> **Important:** Replace `YOUR_JWT_TOKEN` with the actual token from login response.

### 3. Get All Tasks

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "message": "Tasks retrieved successfully",
  "tasks": [
    {
      "id": "uuid-here",
      "title": "My First Task",
      "description": "Task description",
      "status": "Pending",
      "userId": "uuid-here",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 4. Create a New Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread"
  }'
```

**Expected Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "uuid-here",
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "Pending",
    "userId": "uuid-here",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 5. Get Single Task

```bash
curl -X GET http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 6. Update a Task

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task title",
    "description": "Updated description",
    "status": "Completed"
  }'
```

**Valid Status Values:** `Pending` or `Completed`

### 7. Delete a Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Health Check

### Check if Server is Running

```bash
curl -X GET http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "Server is running"
}
```

---

## Common Errors

### 403 - Access Denied (No Token)
**Problem:** Authorization header not provided
**Solution:** Add `Authorization: Bearer TOKEN` header

### 401 - Invalid Token
**Problem:** Token is invalid or expired
**Solution:** Log in again to get a new token

### 400 - Bad Request
**Problem:** Missing required fields
**Solution:** Check request body for required fields

### 404 - Not Found
**Problem:** Resource doesn't exist
**Solution:** Check if task ID is correct

### 500 - Server Error
**Problem:** Server error occurred
**Solution:** Check backend console for error details

---

## Using Postman (Alternative to curl)

1. Open Postman
2. Create new request
3. Set method and URL
4. Add headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN`
5. Add JSON body
6. Send request

---

## Quick Test Script

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api"
EMAIL="test$(date +%s)@example.com"
PASSWORD="testpass123"

# 1. Signup
echo "1. Signing up..."
SIGNUP=$(curl -s -X POST $BASE_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
echo $SIGNUP

# 2. Login
echo -e "\n2. Logging in..."
LOGIN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
echo $LOGIN

# Extract token
TOKEN=$(echo $LOGIN | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo -e "\nToken: $TOKEN"

# 3. Create task
echo -e "\n3. Creating task..."
curl -s -X POST $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "This is a test"}' | jq

# 4. Get all tasks
echo -e "\n4. Getting all tasks..."
curl -s -X GET $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\nTest complete!"
```

Run with: `bash test-api.sh`

---

## Notes

- All timestamps are in UTC (ISO 8601 format)
- Task IDs and User IDs are UUIDs
- JWT tokens expire after 24 hours
- Always include Authorization header for protected routes
- Use HTTPS in production

---

Happy testing! 🧪

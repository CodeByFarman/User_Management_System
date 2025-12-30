# User Management System

## 📌 Project Overview & Purpose

The **User Management System** is a full-stack web application that provides secure authentication, role-based access control, and user management features.

The project demonstrates:
- Secure login and signup flows
- Admin-level user management
- User self-service profile management
- Clean backend architecture
- Responsive frontend using modern UI practices

This application is built as part of a technical evaluation to showcase real-world backend and frontend skills.

---

## 🧰 Tech Stack Used

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT Authentication
- bcrypt (password hashing)
- Jest & Supertest (testing)

### Frontend
- React (Vite)
- Tailwind CSS v3
- React Router
- Axios
- React Hot Toast (notifications)

---

## ⚙️ Setup Instructions

### 🔹 Prerequisites
- Node.js (v18 or above recommended)
- MongoDB Atlas account
- Git

---

## 🔹 Backend Setup

```bash
cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

ADMIN_NAME=System Admin
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=Admin@123

Start the backend server:

npm run dev


Backend runs at:

http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install


Create a .env file inside the frontend folder:

VITE_API_BASE_URL=http://localhost:5000/api


Start the frontend:

npm run dev


Frontend runs at:

http://localhost:5173

🔐 Environment Variables (List Only)
Backend

PORT

MONGO_URI

JWT_SECRET

JWT_EXPIRE

ADMIN_NAME

ADMIN_EMAIL

ADMIN_PASSWORD

Frontend

VITE_API_BASE_URL

.env files are excluded from the repository using .gitignore.

🚀 Deployment Instructions (Overview)

Deployment is not required for local testing but can be done using the following platforms:

Backend

Render

Railway

Heroku

Vercel (API)

Frontend

Vercel

Netlify

Database

MongoDB Atlas

Deployment Steps:

Deploy backend and obtain public API URL

Update VITE_API_BASE_URL in frontend environment variables

Deploy frontend

Configure environment variables on hosting platforms

📘 API Documentation
🔗 Base URL
http://localhost:5000/api

🔐 Authentication APIs
Signup

POST /auth/signup

Request:

{
  "fullName": "John Doe",
  "email": "john@test.com",
  "password": "Password@123"
}


Response:

{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "john@test.com",
    "role": "user"
  }
}

Login

POST /auth/login

Request:

{
  "email": "admin@test.com",
  "password": "Admin@123"
}


Response:

{
  "token": "jwt_token",
  "user": {
    "role": "admin"
  }
}

Get Current User

GET /auth/me

Headers:

Authorization: Bearer <token>

👮 Admin APIs
Get All Users

GET /users?page=1

Activate User

PATCH /users/activate/:id

Deactivate User

PATCH /users/deactivate/:id

👤 User APIs
Update Profile

PUT /users/profile

Request:

{
  "fullName": "Updated Name",
  "email": "updated@test.com"
}

Change Password

PUT /users/password

Request:

{
  "password": "NewPassword@123"
}

📦 Postman Collection

A Postman collection containing all API endpoints can be used for testing.

(Add your exported Postman collection link here)

🧪 Testing

Backend tests are written using Jest and Supertest.

Run tests:

cd backend
npm test




## 🔗 Live Deployment Links

- Frontend: https://your-app.vercel.app
- Backend API: https://your-api.onrender.com
- API Base URL: https://your-api.onrender.com/api

---
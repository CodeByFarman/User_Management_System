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

🚀 Deployment Instructions

The application was deployed using cloud platforms as follows:

🔹 Backend Deployment (Render)

Platform: Render
Type: Web Service

Steps Taken:

Pushed backend code to a public GitHub repository.

Created a new Web Service on Render.

Set Root Directory to backend.

Configured build and start commands:

Build Command: npm install

Start Command: npm start

Added backend environment variables in Render dashboard.

Allowed network access from anywhere (0.0.0.0/0) in MongoDB Atlas.

Deployed the service and verified successful startup.

Frontend Deployment (Vercel)

Platform: Vercel
Framework: React (Vite)

Steps Taken:

Imported the GitHub repository into Vercel.

Set Root Directory to frontend.

Added frontend environment variable:

VITE_API_BASE_URL pointing to the deployed backend API.

Deployed the application.

Verified frontend-backend communication.

🔹 CORS Configuration

During initial deployment, backend CORS was temporarily set to allow all origins.

After frontend deployment, CORS was restricted to the Vercel frontend URL using the CLIENT_URL environment variable.

Backend was redeployed to apply the updated CORS configuration.

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

- Frontend: https://user-management-system-five-iota.vercel.app/
- Backend API: https://user-management-system-backend-cx0l.onrender.com/
- API Base URL: https://user-management-system-backend-cx0l.onrender.com/api


### 📄 Environment Variable Templates

Sample environment variable files are provided for reference:

- `backend/.env.example`
- `frontend/.env.example`

Copy these files and rename them to `.env` before running the application locally.


---
# Ihute Ride Backend 🚴🏍️

## Rider Empowerment Platform - Backend API

This repository contains the backend API for **Ihute Ride**, a rider empowerment platform designed to improve the welfare and financial inclusion of motorcycle riders in Rwanda.

The backend provides secure API services for user authentication, profile management, and communication with the PostgreSQL database.

---

# Backend Features

Implemented functionalities:

✅ User registration
✅ User login
✅ Password encryption using bcrypt
✅ JWT authentication support
✅ User profile update
✅ PostgreSQL database integration
✅ Prisma ORM database management
✅ REST API endpoints

---

# Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* bcrypt
* JSON Web Token (JWT)
* Postman for API testing

---

# Project Structure

```
backend/

├── controllers/
│   └── authController.js
│
├── routes/
│   └── authRoutes.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── config/
│   └── db.js
│
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

# Requirements

Before running the backend, install:

* Node.js
* npm
* PostgreSQL

Check installation:

```bash
node -v
npm -v
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone YOUR_BACKEND_REPOSITORY_LINK
```

Navigate into the project:

```bash
cd backend
```

---

## 2. Install Dependencies

Run:

```bash
npm install
```

---

## 3. Environment Configuration

Create a file named:

```
.env
```

Add the following:

```env
PORT=5000

DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_secret_key"
```

Replace the values with your own configuration.

---

# Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

Check database:

```bash
npx prisma studio
```

---

# Running the Backend

Start development server:

```bash
npm run dev
```

The server will run on:

```
http://localhost:5000
```

---

# API Documentation

Base URL:

```
http://localhost:5000/api/auth
```

---

## 1. Register User

Method:

```
POST
```

Endpoint:

```
/register
```

Example Request:

```json
{
"name":"John Doe",
"email":"john@gmail.com",
"password":"123456"
}
```

---

## 2. Login User

Method:

```
POST
```

Endpoint:

```
/login
```

Example Request:

```json
{
"email":"john@gmail.com",
"password":"123456"
}
```

---

## 3. Update Profile

Method:

```
PUT
```

Endpoint:

```
/update-profile
```

Example Request:

```json
{
"id":"user-id",
"name":"John Doe",
"phone":"+250700000000",
"occupation":"Rider"
}
```

---

# Database Model

The users table contains:

| Field      | Description           |
| ---------- | --------------------- |
| id         | Unique user ID        |
| name       | User full name        |
| email      | Unique email address  |
| password   | Encrypted password    |
| phone      | Phone number          |
| occupation | User occupation       |
| created_at | Account creation date |

---

# Testing

The backend APIs were tested using Postman.

Tested endpoints:

✅ Register user
✅ Login user
✅ Update profile
✅ Database operations

---

# Future Backend Improvements

Future backend features include:

* USSD integration
* Loan management APIs
* Insurance provider integration
* Payment processing
* Rider service marketplace

---

# Author

**Lea Mugabo**
Software Engineering Student
African Leadership University

```
```

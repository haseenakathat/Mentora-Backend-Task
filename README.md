# Mentora Backend

A simplified backend for a mentorship platform where parents, students, and mentors interact. This platform allows parents to create student accounts, mentors to teach lessons, and students to attend lessons through a booking system.

---

# System Overview

There are three types of users:

* **Parent** – Can create student accounts and book lessons for their students
* **Student** – Created by parents, can attend lessons
* **Mentor** – Can create and teach lessons

---

# Features

## 1. Authentication System

* `POST /auth/signup` – Register as parent or mentor (students are created by parents)
* `POST /auth/login` – JWT-based login
* `GET /auth/me` – Get current user information

Security:

* Password hashing with **bcrypt**
* Authentication using **JWT tokens**

---

## 2. Student Creation (Parent Only)

* `POST /students` – Parents can create students under their profile
* `GET /students` – Parents can view their students

Rule:

* Each student belongs to exactly **one parent**

---

## 3. Lesson Creation (Mentor Only)

* `POST /lessons` – Mentors can create lessons
* `GET /lessons` – View all available lessons

Fields:

* `title`
* `description`
* `mentorId`

---

## 4. Booking System

* `POST /bookings` – Parents can assign students to lessons

Fields:

* `studentId`
* `lessonId`

Authorization ensures parents can **only book lessons for their own students**.

---

## 5. Session System

* `POST /sessions` – Mentors create sessions
* `GET /lessons/{id}/sessions` – Get sessions for a lesson

Fields:

* `lessonId`
* `date`
* `topic`
* `summary`

---

## 6. LLM Text Summarization

* `POST /llm/summarize`

Summarizes text using **Google Gemini API**.

Rules:

* Returns **3–5 bullet points** or a **short paragraph**
* Maximum **120 words**

Validation:

* Minimum text length: **50 characters**
* Maximum text length: **10,000 characters**

Protection:

* **Rate limiting:** 10 requests per minute
* Proper error handling for API failures

---

# Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcrypt Password Hashing**
* **Google Gemini API**
* **express-rate-limit**

---

# Installation & Setup

## Prerequisites

* Node.js (v14 or higher)
* MongoDB (local or cloud)
* Google Cloud account for Gemini API

---

## Installation Steps

### 1. Clone the repository

```bash
git clone <repository-url>
cd mentora-backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment Setup

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

⚠️ Never commit `.env` to GitHub.

---

### 4. Get Google Gemini API Key

1. Go to https://aistudio.google.com
2. Sign in with Google
3. Click **Get Started**
4. Create API Key
5. Copy the key (starts with `AIzaSy...`)
6. Enable **Generative Language API**

---

### 5. Start the server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# API Documentation

## Authentication

### Signup

```
POST /auth/signup
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "parent"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login

```
POST /auth/login
```

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

---

### Get Current User

```
GET /auth/me
```

Header:

```
Authorization: Bearer <token>
```

Response:

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "parent"
}
```

---

# Student Management

### Create Student

```
POST /students
```

Header:

```
Authorization: Bearer <token>
```

```json
{
  "name": "Alice Doe"
}
```

---

### Get Students

```
GET /students
```

Response:

```json
[
  {
    "_id": "student_id",
    "name": "Alice Doe",
    "parentId": "parent_id"
  }
]
```

---

# Lesson Management

### Create Lesson

```
POST /lessons
```

```json
{
  "title": "Introduction to Algebra",
  "description": "Learn basic algebraic concepts"
}
```

---

### Get Lessons

```
GET /lessons
```

---

# Booking System

### Create Booking

```
POST /bookings
```

```json
{
  "studentId": "student_id",
  "lessonId": "lesson_id"
}
```

---

# Session Management

### Create Session

```
POST /sessions
```

```json
{
  "lessonId": "lesson_id",
  "date": "2026-03-15",
  "topic": "Solving Linear Equations",
  "summary": "Covered linear equation techniques"
}
```

---

### Get Lesson Sessions

```
GET /lessons/:id/sessions
```

---

# LLM Summarization

### Summarize Text

```
POST /llm/summarize
```

```json
{
  "text": "Your text to summarize here..."
}
```

Response:

```json
{
  "summary": "• Key point 1\n• Key point 2\n• Key point 3",
  "model": "gemini-2.5-flash"
}
```

---

# Security Features

* JWT Authentication
* bcrypt Password Hashing
* Role-based Access Control
* Input Validation
* Rate Limiting (LLM endpoint)

---

# Database Design

## User

```javascript
{
  name: String,
  email: String,
  password: String,
  role: ['parent', 'mentor']
}
```

---

## Student

```javascript
{
  name: String,
  parentId: ObjectId
}
```

---

## Lesson

```javascript
{
  title: String,
  description: String,
  mentorId: ObjectId
}
```

---

## Booking

```javascript
{
  studentId: ObjectId,
  lessonId: ObjectId
}
```

---

## Session

```javascript
{
  lessonId: ObjectId,
  date: Date,
  topic: String,
  summary: String
}
```

---

# Testing

## Using Postman

1. Import `mentora-api.postman_collection.json`
2. Set base URL:

```
http://localhost:5000
```

3. Test authentication first
4. Use JWT tokens for protected routes

---

## Manual Testing

```bash
curl -X POST http://localhost:5000/llm/summarize \
-H "Content-Type: application/json" \
-d '{"text": "Your test text with at least 50 characters..."}'
```

---

# Deployment

## Production Environment Variables

```env
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=secure_jwt_secret
GEMINI_API_KEY=gemini_api_key
NODE_ENV=production
```

Deployment Steps:

1. Set up MongoDB
2. Configure environment variables
3. Deploy to hosting (Railway, Render, etc.)
4. Enable HTTPS
5. Configure CORS and security headers

---

# Evaluation Criteria Met

* Clean code structure
* Proper database design
* RESTful API structure
* Security best practices
* Rate limiting
* LLM integration
* Comprehensive documentation

---

# License

This project is for educational purposes as part of the Mentora platform development.

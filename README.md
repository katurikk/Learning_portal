Here's a complete `README.md` file for your **Learning Portal Backend Project** using Node.js, Express, and SQLite. You can **copy-paste it directly**:

---

```markdown
# 📚 Learning Portal Backend

This is the backend API for a full-fledged Learning Portal platform built with **Node.js**, **Express.js**, and **SQLite**. The portal supports user registration, authentication, course and lesson management, doubts, enrollments, watch history, reviews, and notes.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **SQLite** (via `sqlite3`)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment configuration
- **Postman** for API testing

---

## 📁 Project Structure

```

backend/
├── index.js
├── .env
├── package.json
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   │   └── courseController.js
│   │   └── lessonController.js
│   │   └── doubtController.js
│   │   └── reviewController.js
│   │   └── watchController.js
│   │   └── enrollmentController.js
│   │   └── notesController.js
│   ├── routes/
│   │   └── authRoutes.js
│   │   └── courseRoutes.js
│   │   └── lessonRoutes.js
│   │   └── doubtRoutes.js
│   │   └── reviewRoutes.js
│   │   └── watchRoutes.js
│   │   └── enrollmentRoutes.js
│   │   └── notesRoutes.js
│   ├── scripts/
│   │   └── initDb.js
│   └── database/
│       ├── schema.sql
│       └── seeds.sql

````

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/learning-portal-backend.git
   cd learning-portal-backend
````

 **Install dependencies**

   ```bash
   npm install
   ```

 **Initialize the SQLite DB**

   ```bash
   node src/scripts/initDb.js
   ```

 **Start the server**

   ```bash
   npm run dev
   ```

---

## 🌐 API Endpoints Overview

### 🔐 Auth

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | /auth/register         | Register a new learner    |
| POST   | /auth/registerEducator | Register a new educator   |
| POST   | /auth/login            | Login as learner/educator |

---

### 📚 Courses & Lessons

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | /courses            | Create a new course      |
| GET    | /courses            | Get all courses          |
| POST   | /lessons            | Add a lesson to a course |
| GET    | /lessons/\:courseId | Get lessons for a course |

---

### ❓ Doubts

| Method | Endpoint | Description    |
| ------ | -------- | -------------- |
| POST   | /doubts  | Post a doubt   |
| GET    | /doubts  | Get all doubts |

---

### 📝 Notes

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | /notes          | Add a note to a lesson |
| GET    | /notes/\:userId | Get all notes by user  |

---

### ✅ Enrollments

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| POST   | /enrollments | Enroll a user in course |

---

### 🎬 Watch History

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | /watch-history | Track lesson watch activity |

---

### ⭐ Course Reviews

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| POST   | /reviews | Submit a course review |

---

## 🔐 Authentication

All protected routes require the `Authorization` header with a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📦 Sample User Payloads

**Register Learner**

```json
{
  "name": "Karthik",
  "email": "karthik@example.com",
  "password": "123456",
  "mobile": "+919876543210",
  "targetExam": "UPSC",
  "preferredLanguage": "English"
}
```

**Register Educator**

```json
{
  "name": "Dr. Kumar",
  "email": "kumar@example.com",
  "password": "123456",
  "mobile": "9123456789",
  "subjects": ["Physics", "Math"],
  "qualification": "PhD in Physics",
  "experience": 10,
  "bio": "Expert in JEE prep"
}
```

---

## 📌 Important Notes

* All passwords are hashed using `bcryptjs`.
* JWT tokens expire in 7 days.
* SQLite DB stored as `learning.db`.
* You can modify schema or migrate to another DB like PostgreSQL/MySQL later.

---

## 💡 Future Improvements

* Admin panel for management
* Email verification
* Video player tracking with timestamps
* User analytics and progress dashboard

---

## 🧑‍💻 Author

**Katuri Karthik**
Backend Developer — MERN Stack



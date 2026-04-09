# Task Manager

A simple full stack Task Manager application built with Laravel (PHP) and React.
Allows users to create, view, complete, and delete tasks — with filtering by status.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Laravel (PHP)
- **Storage:** In-memory (resets on server restart — intentional, see Trade-offs)

---

## Prerequisites

Make sure you have the following installed:

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Meera2906/task-manager.git
cd task-manager
```

### 2. Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

The backend will run at `http://localhost:8000`

### 3. Frontend Setup (React)

Open a new terminal tab:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Return all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Request / Response Examples

**POST /api/tasks**
```json
// Request
{ "title": "Buy groceries" }

// Response 201
{ "id": 1, "title": "Buy groceries", "completed": false, "createdAt": "2026-04-09" }
```

**PATCH /api/tasks/1**
```json
// Request
{ "completed": true }

// Response 200
{ "id": 1, "title": "Buy groceries", "completed": true, "createdAt": "2026-04-09" }
```

---

## Features

- View all tasks
- Add a new task with form validation
- Mark a task as completed
- Delete a task
- Filter tasks by: All / Active / Completed
- Loading and error states throughout

---

## Deployment

- **Frontend:** Deployed on [Vercel](https://task-manager-five-brown-54.vercel.app/)
- **Backend:** Deployed on [Railway](https://task-manager-production-fa98.up.railway.app/)

---

## Assumptions & Trade-offs

- **In-memory storage** was used intentionally as permitted by the assignment. Tasks do not persist after the Laravel server restarts. This keeps the setup dependency-free and focused on API design.
- **No authentication.** All tasks are shared in a single session. Out of scope for this exercise.
- **No pagination.** Task volume is assumed to be small for this exercise.
- **Filtering is client-side.** The filter (All / Active / Completed) derives from local React state rather than query parameters, avoiding unnecessary API calls for a small dataset.
- **No CSS framework** was used. Styles are minimal and plain to keep focus on functionality and structure.

---

## Project Structure

```
task-manager/
├── backend/                 # deployed using Railway
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── public/
│   │   └── index.php
│   ├── resources/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   ├── tests/
│   ├── artisan
│   ├── composer.json
│   ├── phpunit.xml
│   ├── Dockerfile          # optional
│   ├── .env                # backend env
│   └── README.md
│
├── frontend/               # deployed using Vercel
│   ├── src/
│   ├── public/           
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── .env                # frontend env
│
├── README.md
└── .gitignore
```

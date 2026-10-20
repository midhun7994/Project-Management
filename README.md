# ProjectFlow — Enterprise Project & Task Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**ProjectFlow** is a modern, high-performance, full-stack Project Management SaaS built for agile teams, engineering leads, and enterprises. It provides real-time task tracking, interactive Kanban boards, project analytics, and role-based access control (RBAC).

---

## 🌟 Key Features

- **🔐 Enterprise Authentication**: JWT bearer tokens, HTTP-only refresh cookies, and Argon2id password hashing.
- **📊 Real-time Dashboards**: Metrics, task distributions, deadline tracking, and team velocity summaries.
- **📋 Interactive Kanban Board**: Visual workflow organization across custom stages (To Do, In Progress, Review, Done).
- **👥 Role-Based Access Control (RBAC)**: Fine-grained permissions for Admins, Project Managers, and Team Members.
- **💬 Real-Time Collaboration**: Team discussions, notifications, and activity auditing.
- **⚡ Async Architecture**: FastAPI with asynchronous SQLAlchemy and modern React + Vite for high performance.

---

## 🏗️ Architecture Overview

```
PROJECTno1/
├── Backend/                 # Python FastAPI Backend
│   ├── app/
│   │   ├── api/             # REST API endpoints & route handlers
│   │   ├── core/            # Config, security, DB sessions
│   │   ├── models/          # SQLAlchemy async database models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   └── services/        # Business logic layer
│   └── requirements.txt
│
├── pm-app/                  # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI & Layout components
│   │   ├── features/        # Feature slices & state (Zustand)
│   │   ├── pages/           # Application views (Auth, Dashboard, Kanban)
│   │   ├── router/          # App routes & ProtectedRoute wrappers
│   │   └── services/        # Axios API client & interceptors
│   └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0 or higher) & **npm**
- **Python** (v3.10 or higher)
- **PostgreSQL** or **SQLite**

### 1. Backend Setup
```bash
cd Backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env  # Configure your database and secret keys
uvicorn app.main:app --reload --port 8000
```
Backend API Docs will be available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd pm-app
npm install
cp .env.example .env
npm run dev
```
Frontend will be running at: `http://localhost:5173`

---

## 🔒 Security Best Practices
- Never commit `.env` or sensitive credential files to source control.
- In production, set a cryptographically secure `SECRET_KEY` (minimum 32 characters).
- Maintain strict CORS origin whitelisting.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE.md) file for details.

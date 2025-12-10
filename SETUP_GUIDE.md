# SkillBot - Complete Setup Guide

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation: [Download](https://www.mongodb.com/try/download/community)
  - Atlas (Cloud): [Create free account](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)
- **npm** or **yarn** - Comes with Node.js

## 🚀 Installation Steps

### Step 1: Backend Setup

Open a terminal/PowerShell and navigate to the backend folder:

```powershell
cd backend
npm install
```

**Wait for installation to complete** (2-3 minutes)

### Step 2: Configure MongoDB

If using **MongoDB Atlas (Cloud)**:

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy your connection string
4. Update `backend/.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillbot
```

If using **Local MongoDB**:

- Make sure MongoDB service is running
- Default connection string in `.env` is already set: `mongodb://localhost:27017/skillbot`

### Step 3: Seed Quiz Data

Still in the `backend` folder:

```powershell
npm run seed
```

You should see:

```
✅ Themes created
✅ Quizzes and questions created
✅ Database seeded successfully
```

### Step 4: Start Backend Server

```powershell
npm run dev
```

You should see:

```
🚀 Server running on http://localhost:5000
```

**Keep this terminal open** (do not close)

### Step 5: Frontend Setup

Open a **NEW** terminal/PowerShell window and navigate to frontend:

```powershell
cd frontend
npm install
```

**Wait for installation to complete** (3-5 minutes)

### Step 6: Start Frontend Server

```powershell
npm run dev
```

You should see:

```
Local:        http://localhost:3000
```

## 🎮 Using SkillBot

1. **Open your browser** and go to `http://localhost:3000`
2. **Select a theme** from the available options:

   - 🌐 Web Development
   - 🐍 Python Basics
   - ⚛️ React Mastery
   - 🗄️ Database Design
   - 🚀 DevOps Essentials

3. **Choose a quiz** from your selected theme
4. **Enter your name** to start
5. **Answer questions** and get instant feedback
6. **View your results** with score and time metrics

## 📊 Database Seeding

The seed script creates:

- **5 themes** with different programming topics
- **12 quizzes** across all themes
- **30+ questions** with varying difficulty levels

All data is generated fresh each time you run `npm run seed`, so existing scores are cleared.

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**For Frontend (port 3000):**

```powershell
# The app will prompt to use port 3001 instead - press 'y'
```

**For Backend (port 5000):**
Edit `backend/.env`:

```
PORT=5001
```

### MongoDB Connection Error

1. **Verify MongoDB is running:**

   - Local: Check MongoDB service in Services (Windows) or Terminal (Mac/Linux)
   - Atlas: Verify connection string and IP whitelist

2. **Check connection string in `.env`**

3. **Try restarting MongoDB service**

### Dependencies Not Installing

```powershell
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

### Port 3000/5000 Still Shows "Not Running"

Wait 10-15 seconds for servers to fully start, then refresh your browser.

## 📱 Project Overview

### Backend (`http://localhost:5000`)

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- 4 main models: Theme, Quiz, Question, Score
- CORS enabled for frontend communication

### Frontend (`http://localhost:3000`)

- Next.js 14 with App Router
- Dark theme with purple accents
- Smooth animations with Framer Motion
- Form validation with Formik + Yup
- Responsive design for all devices

## 📂 Key Files to Know

```
backend/
├── server.js              # Main Express app
├── seed/seedData.js       # Database setup script
└── models/               # Database schemas

frontend/
├── src/app/page.tsx      # Home page
├── src/app/quiz/[id]/page.tsx    # Quiz interface
└── src/components/       # UI components
```

## 🎯 Next Steps

1. **Customize Quiz Content:**

   - Edit `backend/seed/seedData.js` to add/modify questions
   - Re-run `npm run seed` to update database

2. **Add More Themes:**

   - Add new theme object in `seedData.js`
   - Create quizzes and questions for it

3. **Deploy to Production:**
   - Backend: Deploy to Heroku, Railway, or AWS
   - Frontend: Deploy to Vercel or Netlify

## 🆘 Getting Help

- Check the main [README.md](./README.md) for features overview
- Review [backend/README.md](./backend/README.md) for API documentation
- Check [frontend/README.md](./frontend/README.md) for frontend details

## ✨ Demo Mode

If you want to test without a real backend:

1. Frontend will still load and show the UI
2. Mock data is included for development
3. Quiz submission won't save to database

---

**Happy Learning! 🎓**

For any issues, ensure both servers are running and MongoDB is connected.

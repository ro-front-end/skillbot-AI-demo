# SkillBot - Gamified Learning Platform

A fun, interactive learning platform that turns education into an engaging game experience. Master concepts through themed quizzes with instant feedback and leaderboard tracking.

## 🎮 Features

- **5 Specialized Learning Themes**: Web Development, Python, React, Database Design, and DevOps
- **Interactive Quizzes**: Multiple choice and true/false questions
- **Gamified Experience**: Score tracking, difficulty levels, and completion times
- **Beautiful UI**: Dark theme with purple accents and smooth animations
- **No Authentication Required**: Start learning immediately
- **Leaderboards**: See how you stack up against other players
- **Real-time Feedback**: Get instant results for each answer

## 🏗️ Project Structure

```
skillbot/
├── backend/                 # Node.js Express API
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route handlers
│   ├── routes/            # API endpoints
│   ├── config/            # Database configuration
│   ├── seed/              # Database seed data
│   └── server.js          # Main Express app
└── frontend/              # Next.js React app
    ├── src/
    │   ├── app/           # Next.js pages
    │   │   ├── quiz/      # Quiz interface
    │   │   ├── themes/    # Theme selection
    │   │   └── results/   # Results page
    │   ├── components/    # Reusable UI components
    │   └── services/      # API calls and validation
    └── public/            # Static assets
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
npm run seed        # Seed database with quiz data
npm run dev        # Start development server
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📝 API Endpoints

### Themes

- `GET /api/themes` - Get all learning themes
- `GET /api/themes/:id` - Get specific theme

### Quizzes

- `GET /api/quizzes/theme/:themeId` - Get quizzes by theme
- `GET /api/quizzes/:id` - Get quiz details

### Questions

- `GET /api/questions/:quizId` - Get all questions for a quiz

### Scores

- `POST /api/scores/submit` - Submit quiz answers
- `GET /api/scores/leaderboard/:quizId` - Get top 10 scores

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling (Dark theme with purple)
- **Framer Motion** - Animations
- **Formik** - Form handling
- **Yup** - Validation
- **Axios** - HTTP client

## 🎨 Design System

- **Theme**: Dark mode with purple accents (#a855f7)
- **Typography**: Clean, modern sans-serif
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design

## 📚 Available Themes & Quizzes

1. **Web Development** 🌐

   - HTML Basics
   - CSS Styling

2. **Python Basics** 🐍

   - Python Fundamentals
   - Python Advanced

3. **React Mastery** ⚛️

   - React Components

4. **Database Design** 🗄️

   - SQL Basics

5. **DevOps Essentials** 🚀
   - Docker Basics

## 🎯 How to Play

1. **Select a Theme** - Choose from 5 specialized learning areas
2. **Pick a Quiz** - Select a quiz that matches your difficulty level
3. **Enter Your Name** - Personalize your quiz attempt
4. **Answer Questions** - Complete all questions and check answers
5. **View Results** - See your score, time taken, and performance

## 🔧 Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/skillbot
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📦 Installation Requirements

- Node.js 16+
- MongoDB running locally or Atlas connection string
- npm or yarn

## 🚀 Deployment

### Backend

- Deploy to Heroku, Railway, or AWS
- Update MONGODB_URI for production database
- Set NODE_ENV=production

### Frontend

- Deploy to Vercel, Netlify, or AWS
- Update NEXT_PUBLIC_API_URL to production backend
- Run `npm run build` before deployment

## 🎮 Demo Quiz Questions

Each theme includes expertly crafted questions covering:

- **Easy**: Foundational concepts
- **Medium**: Practical application
- **Hard**: Advanced understanding

## 📊 Scoring System

- Multiple choice & true/false questions
- Instant feedback on answers
- Percentage-based scoring
- Passing score: 70%
- Time tracking for performance metrics

## 🌟 Future Enhancements

- User authentication and profiles
- Custom quiz creation
- Spaced repetition learning paths
- Multiplayer quiz battles
- Badges and achievements
- Mobile app version
- More specialized themes

## 📄 License

MIT

---

**Ready to learn?** Start with a theme and prove your knowledge! 🎓

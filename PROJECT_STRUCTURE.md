# SkillBot Project Structure

```
skillbot/
│
├── 📄 README.md                 # Main project documentation
├── 📄 SETUP_GUIDE.md           # Step-by-step installation guide
│
├── 📁 backend/                  # Node.js Express API Server
│   ├── 📄 package.json         # Dependencies: express, mongoose, cors
│   ├── 📄 .env                 # MongoDB URI & PORT config
│   ├── 📄 .gitignore
│   ├── 📄 server.js            # Main Express app entry point
│   ├── 📄 README.md            # Backend documentation
│   │
│   ├── 📁 config/
│   │   └── 📄 database.js      # MongoDB connection setup
│   │
│   ├── 📁 models/              # Mongoose schemas
│   │   ├── 📄 Theme.js         # Learning themes model
│   │   ├── 📄 Quiz.js          # Quiz model
│   │   ├── 📄 Question.js      # Quiz questions model
│   │   └── 📄 Score.js         # User scores model
│   │
│   ├── 📁 controllers/         # Route handlers
│   │   ├── 📄 themeController.js
│   │   ├── 📄 quizController.js
│   │   ├── 📄 questionController.js
│   │   └── 📄 scoreController.js
│   │
│   ├── 📁 routes/              # API route definitions
│   │   ├── 📄 themeRoutes.js
│   │   ├── 📄 quizRoutes.js
│   │   ├── 📄 questionRoutes.js
│   │   └── 📄 scoreRoutes.js
│   │
│   ├── 📁 middleware/          # Express middlewares (reserved)
│   │
│   └── 📁 seed/                # Database seed data
│       └── 📄 seedData.js      # Quiz data generator
│
├── 📁 frontend/                 # Next.js React App
│   ├── 📄 package.json         # Dependencies: next, react, tailwind, framer-motion
│   ├── 📄 tsconfig.json        # TypeScript config
│   ├── 📄 next.config.js       # Next.js config
│   ├── 📄 tailwind.config.ts   # Tailwind CSS config (dark theme)
│   ├── 📄 postcss.config.js    # PostCSS config
│   ├── 📄 .env.local           # API URL config
│   ├── 📄 .gitignore
│   ├── 📄 README.md            # Frontend documentation
│   │
│   └── 📁 src/
│       ├── 📁 app/             # Next.js App Router
│       │   ├── 📄 layout.tsx   # Root layout
│       │   ├── 📄 page.tsx     # Home page - Theme selection
│       │   ├── 📄 globals.css  # Global styles
│       │   │
│       │   ├── 📁 themes/
│       │   │   └── 📁 [id]/
│       │   │       └── 📄 page.tsx     # Quiz selection page
│       │   │
│       │   ├── 📁 quiz/
│       │   │   └── 📁 [id]/
│       │   │       └── 📄 page.tsx     # Quiz interface
│       │   │
│       │   └── 📁 results/
│       │       └── 📁 [id]/
│       │           └── 📄 page.tsx     # Results page
│       │
│       ├── 📁 components/      # Reusable UI components
│       │   ├── 📄 Header.tsx           # Navigation header
│       │   ├── 📄 ThemeCard.tsx        # Theme selection card
│       │   ├── 📄 QuizCard.tsx         # Quiz info card
│       │   ├── 📄 Option.tsx           # Answer option button
│       │   └── 📄 ProgressBar.tsx      # Progress indicator
│       │
│       └── 📁 services/        # API & business logic
│           ├── 📄 api.ts       # API service functions
│           └── 📄 validations.ts       # Yup validation schemas
│
└── 📁 .github/                  # (Auto-created) GitHub config
    └── 📁 copilot-instructions.md
```

## 🔗 Data Flow

```
Frontend (Next.js)
    ↓
axios/fetch requests
    ↓
Backend API (Express)
    ↓
Mongoose Models
    ↓
MongoDB Database
    ↓
(Response returned through same path)
```

## 📡 API Endpoints

### Themes

```
GET    /api/themes              # All themes
GET    /api/themes/:id          # Specific theme
```

### Quizzes

```
GET    /api/quizzes/theme/:themeId    # Quizzes for theme
GET    /api/quizzes/:id                # Quiz details
```

### Questions

```
GET    /api/questions/:quizId   # Questions for quiz
```

### Scores

```
POST   /api/scores/submit       # Submit quiz answers
GET    /api/scores/leaderboard/:quizId  # Top scores
```

## 🎨 Component Hierarchy

```
App (page.tsx)
├── Header
└── ThemeCard[] (Grid)
    └── onClick → /themes/:id

Theme Page (themes/[id]/page.tsx)
├── Header
└── QuizCard[] (Grid)
    └── onClick → /quiz/:id

Quiz Page (quiz/[id]/page.tsx)
├── Header
├── PlayerNameForm (Formik)
├── ProgressBar
└── QuestionCard
    ├── ProgressBar
    └── Option[] (4 buttons)
        └── onSelect → State update

Results Page (results/[id]/page.tsx)
├── Header
├── ScoreDisplay
└── ActionButtons
```

## 🗄️ Database Schema Relationships

```
Theme (1)
    ↓ (1:Many)
Quiz (Many)
    ↓ (1:Many)
Question (Many)

Score (Many) ← references → Quiz (1)
                            ↓ (tracks answers)
                        Question
```

## 🚀 Development Workflow

1. **Backend Development:**

   - Edit models in `backend/models/`
   - Add new routes in `backend/routes/`
   - Create controllers in `backend/controllers/`
   - Test with API client (Postman, Thunder Client)

2. **Frontend Development:**

   - Create new pages in `src/app/`
   - Build components in `src/components/`
   - Add API services in `src/services/api.ts`
   - Add validation schemas in `src/services/validations.ts`

3. **Styling:**

   - Tailwind classes in component files
   - Custom CSS in `globals.css`
   - Theme colors in `tailwind.config.ts`

4. **Testing:**
   - Start both servers
   - Navigate through themes → quizzes → quiz interface → results
   - Check browser console for errors

## 📝 Environment Setup

### Backend Environment

```
MONGODB_URI=mongodb://localhost:27017/skillbot
PORT=5000
NODE_ENV=development
```

### Frontend Environment

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎯 Key Technologies Used

| Layer       | Technology    | Purpose                    |
| ----------- | ------------- | -------------------------- |
| Backend API | Express.js    | REST API server            |
| Database    | MongoDB       | NoSQL data storage         |
| ODM         | Mongoose      | Database modeling          |
| Frontend    | Next.js       | React framework            |
| Styling     | Tailwind CSS  | Utility-first CSS          |
| Animation   | Framer Motion | Smooth animations          |
| Form        | Formik + Yup  | Form handling & validation |
| HTTP        | Fetch API     | API communication          |

---

This structure ensures clean separation of concerns, easy maintenance, and scalability for future enhancements.

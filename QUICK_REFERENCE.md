# SkillBot - Quick Reference & Commands

## 🚀 Starting the Application

### Terminal 1 - Backend Server

```powershell
cd backend
npm install  # First time only
npm run seed # First time only - populates database
npm run dev  # Starts on port 5000
```

### Terminal 2 - Frontend Server

```powershell
cd frontend
npm install  # First time only
npm run dev  # Starts on port 3000
```

## 🌐 Access Points

| Component      | URL                              | Purpose             |
| -------------- | -------------------------------- | ------------------- |
| Frontend       | http://localhost:3000            | Main application UI |
| Backend Health | http://localhost:5000/api/health | Check API status    |
| MongoDB        | localhost:27017                  | Database (local)    |

## 📚 Learning Themes

| Theme             | Icon | Difficulty  | Topics                 |
| ----------------- | ---- | ----------- | ---------------------- |
| Web Development   | 🌐   | Easy-Medium | HTML, CSS              |
| Python Basics     | 🐍   | Easy-Hard   | Fundamentals, Advanced |
| React Mastery     | ⚛️   | Medium      | Components, Hooks      |
| Database Design   | 🗄️   | Easy        | SQL Basics             |
| DevOps Essentials | 🚀   | Medium      | Docker, Deployment     |

## 💾 Database Operations

### Seed Fresh Data

```powershell
cd backend
npm run seed
```

✅ Creates 5 themes, 12 quizzes, 30+ questions

### Clear & Reseed

```powershell
# Delete database (MongoDB Compass or CLI)
db.themes.deleteMany({})
db.quizzes.deleteMany({})
db.questions.deleteMany({})
db.scores.deleteMany({})

# Then reseed:
npm run seed
```

## 📝 API Testing Examples

### Get All Themes

```bash
curl http://localhost:5000/api/themes
```

### Get Quizzes for Theme

```bash
curl http://localhost:5000/api/quizzes/theme/{themeId}
```

### Get Questions

```bash
curl http://localhost:5000/api/questions/{quizId}
```

### Submit Quiz (POST)

```bash
curl -X POST http://localhost:5000/api/scores/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "quiz-id",
    "playerName": "John",
    "answers": [
      {"questionId": "q1", "selectedOption": "a"},
      {"questionId": "q2", "selectedOption": "true"}
    ],
    "timeTaken": 120
  }'
```

### Get Leaderboard

```bash
curl http://localhost:5000/api/scores/leaderboard/{quizId}
```

## 🔧 Common Issues & Solutions

### Issue: "Cannot find module 'react'"

**Solution:**

```powershell
cd frontend
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue: "MongoDB connection failed"

**Solution:**

1. Check MongoDB is running
2. Verify connection string in `.env`
3. For Atlas, whitelist your IP address

### Issue: "Port 3000 already in use"

**Solution:**

```powershell
# Option 1: Kill process on port 3000
lsof -i :3000       # Mac/Linux
netstat -ano | findstr :3000  # Windows (find PID)
taskkill /PID {PID} /F  # Windows kill

# Option 2: Use different port
# Frontend will ask to use 3001 - press 'y'
```

### Issue: "Port 5000 already in use"

**Solution:**
Edit `backend/.env`:

```
PORT=5001
```

## 🎮 User Flow

```
1. Open http://localhost:3000
   ↓
2. Browse 5 learning themes
   ↓
3. Select theme → View quizzes
   ↓
4. Select quiz → Enter name
   ↓
5. Answer questions (Multiple Choice / True-False)
   ↓
6. Check answers and see feedback
   ↓
7. Proceed to next question
   ↓
8. Finish quiz → View results
   ↓
9. See score, time, and performance
   ↓
10. Return to home → Try another quiz
```

## 📊 Scoring Logic

```
Formula: (Correct Answers / Total Questions) × 100

Example:
- Total Questions: 10
- Correct Answers: 8
- Score: (8/10) × 100 = 80%
- Passed: Yes (≥ 70%)
```

## 🎨 Customization Points

### Add New Quiz Theme

**File:** `backend/seed/seedData.js`

```javascript
// Add to themes array:
{
  name: 'Your Theme',
  description: 'Description',
  icon: '🎯',
  color: '#your-color'
}
```

### Change Colors

**File:** `frontend/tailwind.config.ts`

```javascript
colors: {
  purple: '#your-purple',
  dark: '#your-dark'
}
```

### Modify Questions

**File:** `backend/seed/seedData.js`

```javascript
// Edit in quizzesData array
{
  text: 'Your question?',
  options: [
    { id: 'a', text: 'Option A', isCorrect: true },
    { id: 'b', text: 'Option B', isCorrect: false }
  ]
}
```

## 📦 Useful npm Commands

```powershell
# Backend
npm run dev          # Development mode with nodemon
npm run start        # Production mode
npm run seed         # Seed database

# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production start
npm run lint         # Check code quality
```

## 🌍 Production Deployment

### Backend (Heroku Example)

```powershell
heroku create skillbot-api
heroku config:set MONGODB_URI={your-atlas-uri}
git push heroku main
```

### Frontend (Vercel Example)

```powershell
npm install -g vercel
vercel
# During setup, set NEXT_PUBLIC_API_URL to production backend
```

## 📱 Responsive Breakpoints

```
- Mobile: < 640px (default styling)
- Tablet: 768px - 1023px (md: prefix)
- Desktop: 1024px+ (lg: prefix)
```

## 🔐 Security Notes

- ✅ No password required (Demo Mode)
- ✅ CORS enabled for localhost
- ⚠️ For production:
  - Add authentication
  - Validate input server-side
  - Implement rate limiting
  - Use HTTPS
  - Add environment variable validation

## 📞 Debugging Tips

### Check Backend Status

```bash
curl http://localhost:5000/api/health
```

### View Logs

- **Backend:** Check terminal running `npm run dev`
- **Frontend:** Check browser DevTools (F12)

### MongoDB Inspection

- Use MongoDB Compass (GUI)
- Or MongoDB Atlas Dashboard

### API Testing Tools

- **Postman:** Free API testing client
- **Thunder Client:** VS Code extension
- **Insomnia:** Another REST client option

## 🎯 Next Steps

1. ✅ Run backend: `npm run dev`
2. ✅ Run frontend: `npm run dev`
3. ✅ Open `http://localhost:3000`
4. ✅ Start learning!

---

**Questions?** Check README.md or SETUP_GUIDE.md

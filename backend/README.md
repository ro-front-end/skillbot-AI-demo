# SkillBot Backend

Express.js API server for the SkillBot gamified learning platform.

## Setup

```bash
npm install
npm run seed    # Populate MongoDB with quiz data
npm run dev     # Start development server
```

## API Routes

### GET /api/health

Health check endpoint

### GET /api/themes

Get all learning themes

### GET /api/themes/:id

Get specific theme by ID

### GET /api/quizzes/theme/:themeId

Get all quizzes for a specific theme

### GET /api/quizzes/:id

Get quiz details by ID

### GET /api/questions/:quizId

Get all questions for a quiz

### POST /api/scores/submit

Submit quiz answers and get score

```json
{
  "quizId": "string",
  "playerName": "string",
  "answers": [
    { "questionId": "string", "selectedOption": "string" }
  ],
  "timeTaken": number
}
```

### GET /api/scores/leaderboard/:quizId

Get top 10 scores for a quiz

## Database Schema

### Theme

- name (unique)
- description
- icon
- color

### Quiz

- title
- description
- themeId (reference)
- totalQuestions
- difficulty (easy, medium, hard)
- timeLimit
- passingScore

### Question

- quizId (reference)
- text
- type (multiple, true-false)
- options (id, text, isCorrect)
- difficulty

### Score

- quizId (reference)
- playerName
- score (percentage)
- totalQuestions
- answers
- timeTaken
- passed

## Environment Variables

```
MONGODB_URI=mongodb://localhost:27017/skillbot
PORT=5000
NODE_ENV=development
```

## Running Tests

```bash
npm test
```

---

Built with Express.js and MongoDB

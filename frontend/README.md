# SkillBot Frontend

Next.js React application for the SkillBot gamified learning platform.

## Setup

```bash
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx          # Home page (theme selection)
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── themes/
│   │   └── [id]/
│   │       └── page.tsx  # Quiz selection page
│   ├── quiz/
│   │   └── [id]/
│   │       └── page.tsx  # Quiz interface
│   └── results/
│       └── [id]/
│           └── page.tsx  # Results page
├── components/           # Reusable components
│   ├── Header.tsx       # Navigation header
│   ├── ThemeCard.tsx    # Theme selection card
│   ├── QuizCard.tsx     # Quiz card
│   ├── Option.tsx       # Quiz option button
│   └── ProgressBar.tsx  # Question progress
└── services/
    ├── api.ts           # API service functions
    └── validations.ts   # Yup validation schemas
```

## Key Features

### Pages

- **Home** - Browse and select learning themes
- **Themes** - View quizzes for selected theme
- **Quiz** - Interactive quiz interface with real-time feedback
- **Results** - Score breakdown and performance metrics

### Components

- **Header** - Fixed navigation with branding
- **ThemeCard** - Animated theme selection cards
- **QuizCard** - Quiz information and difficulty display
- **Option** - Interactive answer options with visual feedback
- **ProgressBar** - Question progress visualization

## Technologies

- **Next.js 14** - React framework with file-based routing
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Formik** - Form state management
- **Yup** - Schema validation
- **Axios** - HTTP client (can be used for advanced scenarios)

## Styling

- Dark theme with purple accents
- Responsive grid layouts
- Smooth animations and transitions
- Gradient text effects
- Glow effects on interactive elements

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Build & Deploy

```bash
npm run build    # Build for production
npm start        # Start production server
```

---

Built with Next.js and Tailwind CSS

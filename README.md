# 🍝 Culinary Haven - Cooking & Recipes Blog

[React](https://reactjs.org/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS](https://tailwindcss.com/) · [Vite](https://vitejs.dev/)

---

## 📋 Project Overview

A full-featured recipe website built with **React** and **TypeScript**, featuring dynamic content from DummyJSON API, responsive design, and a warm editorial aesthetic.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔍 Dynamic Search | Real-time recipe search |
| 🏷️ Filtering | By meal type (Breakfast, Lunch, Dinner, Dessert, Snack) |
| 📖 Recipe Details | Ingredients, instructions, nutrition, similar recipes |
| 👤 Authentication | Login flow with DummyJSON auth |
| 💡 Cooking Tips | Blog-style editorial content |
| 📱 Responsive | Works on all devices |

### 🛠️ Tech Stack

```json
{
  "React": "18.3.1",
  "TypeScript": "5.6.2",
  "Tailwind CSS": "3.4.17",
  "Vite": "5.4.10",
  "Axios": "1.7.7",
  "React Router": "6.26.2"
}
🚀 Quick Start
bash
# 1. Install dependencies
npm install

# 2. Install Tailwind CSS
npm install -D tailwindcss@3.4.17 postcss@8.4.47 autoprefixer@10.4.20
npx tailwindcss init -p

# 3. Install additional packages
npm install axios react-router-dom

# 4. Run the project
npm run dev
📁 Project Structure
text
src/
├── app/              # App config & routing
├── features/         # Feature-based modules
│   ├── About/        # About page
│   ├── Recipes/      # Recipes page
│   └── Login/        # Login page
├── shared/           # Reusable components (Button, Card, Navbar, Footer)
├── entities/         # Data models (Recipe, User)
├── services/         # API layer (apiClient, recipeApi)
└── store/            # State management
🔌 API Endpoints Used
Endpoint	Purpose
GET /recipes	Fetch all recipes
GET /recipes?limit=6	Fetch featured recipes
GET /recipes/search?q=	Search recipes
GET /recipes/{id}	Fetch single recipe
POST /auth/login	User authentication
📱 Responsive Breakpoints
Device	Screen Size	Columns
Mobile	< 640px	1 column
Tablet	640-1024px	2-3 columns
Desktop	> 1024px	4 columns
🤝 Git Workflow
bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature/feature-name
Branch Naming:

feature/ - New features

bugfix/ - Bug fixes

hotfix/ - Critical fixes

✅ Completed Pages
Home Page (Hero, Categories, Featured Recipes)

About Page (Chef story, Gallery, Recipes)

Recipes Page (Search, Filters, Grid)

Recipe Details Page

Cooking Tips Page

Login Page


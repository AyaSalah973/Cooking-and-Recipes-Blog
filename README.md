🍕 Cooks Delight – Food & Recipe Platform
---
A modern React-based recipes website inspired by a Figma UI design, powered by the DummyJSON API to deliver dynamic and interactive cooking content. Users can explore recipes, search for dishes, read cooking tips, and enjoy a personalized cooking experience.

🔗 Useful Links
---
🎨 Figma Design:  [View Design](https://www.figma.com/design/EK0IVka3EakJw5lMCdhpv6/-FREE--Cooking---Recipes-Blog-Template--Community-?node-id=0-1&t=z1bKG76CAyNMg8Os-0)

🌐 API Source: [DummyJSON](https://dummyjson.com/)

✨ Key Features
---
🏠 Home Page

Includes a visually rich hero section, food categories, featured recipes slider, recipe grid with filtering options, a short about preview, and a strong call-to-action section.

🔍 Recipes & Search Page

Displays live search results fetched from the API in a responsive grid layout with recipe cards.

📖 Recipe Details Page

Shows complete recipe information including ingredients, cooking steps, nutritional values, ratings, tags, and related recipes.

💡 Cooking Tips Page

A blog-style section that contains cooking advice, newly added recipes, and locally stored tip cards.

👨‍🍳 About Page

Presents the brand story, chef introduction, image gallery, and highlighted recipes.

🔐 Login Page

A clean split-layout login system integrated with DummyJSON authentication, including token handling and form validation.

🛠️ Tech Stack 
--- 
| Category | Technology |
|----------|------------|
| Framework | React |
| API | DummyJSON |
| Styling | CSS / TailwindCSS |
| Routing | React Router DOM |
| State Management | React Context / useState |
| Version Control | Git & GitHub |

🚀 How to Run the Project
---  
**Prerequisites**

- Node.js (v18 or higher)
- npm or yarn
  
## ⚙️ Setup Steps

1.  **Clone the repository**

```bash
git clone https://github.com/AyaSalah973/Cooking-and-Recipes-Blog.git
cd cooks-delight
```

2.  **Install dependencies**

```bash
npm install
```

3.  **Start the development server**

```bash
npm run dev
```

4.  **Open in browser**

```bash
http://localhost:5173
```

 
## 🌐 API Endpoints

| Feature | Endpoint |
|----------|----------|
| Fetch all recipes | `GET /recipes` |
| Search recipes | `GET /recipes/search?q={query}` |
| Recipe details | `GET /recipes/{id}` |
| Filter by meal type | `GET /recipes/meal-type/{type}` |
| User login | `POST /auth/login` |
| Get current user | `GET /auth/me` |
| Refresh session | `POST /auth/refresh` |

📱 Responsive Experience
---
The platform is optimized for all screen sizes:

- 🖥️ Desktop / Laptop
- 📱 Tablet
- 📲 Mobile Phone

Layouts automatically adjust without breaking or overlapping content.

🎨 UI Effects & Animations
---
- Hover effects on recipe cards, buttons, chips, and nav items
- Smooth carousel/slider transitions
- Section fade-in and reveal effects
- Filter and search result transitions
- CTA button hover emphasis

🧠 App Behavior & Handling
--- 
The app is designed to gracefully handle:

- ⏳ Loading states while fetching data
- 🔍 Empty states for no search results
- ❌ API errors with user-friendly messages
- 🖼️ Missing images or incomplete recipe data

📝 License
--- 
This project was developed for educational purposes as part of a front-end learning journey.

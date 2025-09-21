# SaseFood — a modern recipe explorer 🍳🥗

A fast, responsive React app for discovering recipes from around the world.  
Search by name, filter by cuisine/category/ingredient, save favorites, and view rich recipe details with ingredients, instructions, and video links. A polished hero section showcases rotating featured dishes with orbiting thumbnails.

**Live demo:** https://sasefood.netlify.app/

---

## ✨ Features

- **Beautiful hero** with responsive “orbit” layout & dotted ring
- **Search** recipes by name
- **Filters**: cuisine, category, ingredient
- **Favorites** (persisted in `localStorage`)
- **Recipe details**: ingredients & measures, instructions, video link
- **Smooth navigation**: Home, Recipe (scroll to grid), Favorites
- **Fully responsive** & mobile-safe (no text cut-offs)

---

## 🧱 Tech stack

- React + Vite
- React Router
- Tailwind CSS + custom CSS variables
- Axios / fetch
- TheMealDB public API (no key required)

---

## 🚀 Getting started (local)

### Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)

### Install & run

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server
npm run dev

# 3) Production build
npm run build

# 4) Preview the production build
npm run preview
```

Vite usually serves at `http://localhost:5173/`.

---

## 📁 Project structure

```
src/
  components/
    HeroCuisine.jsx
    RecipeGrid.jsx
    SearchBar.jsx
    Navbar.jsx
  hooks/
    useFavorites.js
  pages/
    Home.jsx
    RecipeDetails.jsx
    Favorites.jsx
  services/
    api.js
  styles/
    index.css
  utils/
    mapMeal.js
    text.js
main.jsx
App.jsx
index.html
```

---

## 🔌 API

This app uses **TheMealDB** (HTTPS) endpoints, for example:

```
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
https://www.themealdb.com/api/json/v1/1/list.php?a=list
https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian
```

> ✅ Use **HTTPS** to avoid CORS issues. Edit `src/services/api.js` if you’d like to change or proxy the API.

---

## 🎨 Design & responsiveness

- Design tokens (colors/rings) live in `:root` inside `src/styles/index.css`.
- The hero uses CSS variables (`--orbit`, `--dish`, `--thumb`) to scale based on **viewport height**, keeping composition balanced across sizes.
- **Android/Chrome text cut-off fixes**:
  - `-webkit-text-size-adjust: 100%` and `text-size-adjust: 100%`
  - Ensure hero text container has `overflow: visible` and a higher `z-index`
  - `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`

---

## 🧭 Navigation

- **Home** – top of the page
- **Recipe** – smooth-scrolls to the recipe grid (`#recipes`)
- **Favorites** – saved items from localStorage
- “Back to list” on details returns to the previous screen

---

## 💾 Favorites

- Stored in `localStorage` (e.g. key `favs`)
- Toggle the heart icon to add/remove a recipe
- Favorites page lists all saved items

---

## ☁️ Deployment (Netlify)

**Live site:** https://sasefood.netlify.app/

### Option A — Connect repository
- New Site → Import from Git → select repo
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Option B — Drag & drop
- Run `npm run build`
- Drag the `dist/` folder into Netlify

### Single-page app routing
If you refresh deep links (e.g. `/recipe/52771`) you’ll need an SPA redirect:

Create `public/_redirects` with:
```
/*  /index.html  200
```
(or add the same rule in **Netlify → Site configuration → Redirects**)

---

## 🛠️ Troubleshooting

**CORS errors**
```diff
- http://www.themealdb.com/api/json/v1/1/list.php?c=list
+ https://www.themealdb.com/api/json/v1/1/list.php?c=list
```

**Text cut off on mobile**
- Confirm the viewport meta tag is present.
- Keep `text-size-adjust:100%` and `overflow:visible` on hero text.
- Avoid placing the text inside an element with `overflow:hidden`.

**Only salads appear**
- Verify filters aren’t pre-selected.
- Check API functions in `src/services/api.js` and your search/filter handlers.

---

## 📄 License

MIT (add a `LICENSE` file if desired).

---

## 🙏 Credits

- Data: **[TheMealDB](https://www.themealdb.com/)**
- UI & code: Project authors and contributors ❤️

---

## 🗺️ Roadmap ideas

- Server-side caching/proxy
- Pagination/infinite scroll
- More robust ingredient images & fallbacks
- Offline saved packs
- Dark mode

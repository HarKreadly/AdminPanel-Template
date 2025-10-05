<div align="center">

# Admin Panel – Starting Template

Modern admin starter built with Laravel, Inertia.js (React), Tailwind CSS, and Vite.

<br/>

[![Laravel](https://img.shields.io/badge/Laravel-11.x-ff2d20?logo=laravel&logoColor=white)](https://laravel.com)
[![Inertia](https://img.shields.io/badge/Inertia-React-5a67d8)](https://inertiajs.com)
[![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

</div>

---

### Table of Contents
- Features
- Screenshots
- Requirements
- Installation
- Usage (Dev)
- Build & Deploy
- Project Structure
- Conventions
- Troubleshooting

### Features
- Reactive UI with Inertia + React (no SPA boilerplate, server-driven views)
- Tailwind-based design system and dark mode
- Responsive navbar with notifications panel, theme toggle, user menu
- Collapsible sidebar with configurable items
- Vite for fast HMR and production builds

### Screenshots
Add your screenshots or GIFs here.

### Requirements
- PHP 8.2+
- Composer
- Node.js 20+
- Database: SQLite/MySQL/PostgreSQL

### Installation
```bash
# 1) Get dependencies
composer install
npm install

# 2) Environment
cp .env.example .env
php artisan key:generate

# 3) Database
php artisan migrate  # add --seed if you have seeders

# 4) Run dev servers (two terminals)
npm run dev          # Vite w/ HMR
php artisan serve    # Laravel server
```

Open http://127.0.0.1:8000 (assets from Vite at http://127.0.0.1:5173).

### Usage (Dev)
- Edit React components under `resources/js/Components/` – Vite HMR updates instantly
- Routes/controllers: standard Laravel under `routes/` and `app/`
- Tailwind config in `tailwind.config.js`

Common scripts:
```bash
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
php artisan serve
php artisan test
```

### Build & Deploy
```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm ci && npm run build
php artisan config:cache route:cache view:cache
```

Serve the `public/` directory via your web server (Nginx/Apache). Ensure PHP-FPM/opcache are configured for production.

### Project Structure (selected)
```
resources/js/Components/
  AppNavbar.jsx
  AppAside.jsx
  AppNavItem.jsx
  Aside/
    Logo.jsx
    Section.jsx
    items.js           # item factories (no JSX)
  Navbar/
    SidebarToggle.jsx
    NotificationsButton.jsx
    ThemeToggle.jsx
    UserDropdown.jsx
```

### Conventions
- Keep components small and focused; lift shared state (e.g., dark mode) to composition roots like `AppNavbar`
- Use portals for global overlays (notifications panel backdrop)
- Avoid calling `route()` at import time; pass it where needed (see `Aside/items.js`)

### Troubleshooting
- Backdrop not covering full screen: ensure portal rendering and `inset-0 w-screen h-screen`
- Inertia routes not available in modules: lazily construct items using a function that receives `route`

### License
MIT

## Admin Panel - Starting template

A Laravel + Inertia + React + Tailwind project.

### Prerequisites
- PHP 8.2+
- Composer
- Node 20+
- SQLite/MySQL/PostgreSQL

### Quick start
```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate # or: php artisan migrate --seed
npm install
npm run dev
php artisan serve
```

Open http://127.0.0.1:8000 in your browser. Vite serves assets on http://127.0.0.1:5173 during development.

### Scripts
- npm run dev: Start Vite in development with HMR
- npm run build: Production build
- npm run preview: Preview production build
- php artisan serve: Start Laravel dev server

### Tech stack
- Backend: Laravel, Eloquent, Migrations
- Frontend: Inertia React, Tailwind CSS, React Icons
- Tooling: Vite, PostCSS, ESLint/Prettier (if configured)

### App structure (selected)
```
resources/js/Components/
  AppNavbar.jsx
  AppAside.jsx
  AppNavItem.jsx
  Aside/
    Logo.jsx
    Section.jsx
    items.js
  Navbar/
    SidebarToggle.jsx
    NotificationsButton.jsx
    ThemeToggle.jsx
    UserDropdown.jsx
```

### UI notes
- Navbar
  - Notifications: bell toggles a right overlay panel (portal, backdrop, Esc to close)
  - Theme: top icon and dropdown switch control dark mode in sync (state in `AppNavbar`)
  - User menu: backdrop for outside-click, keyboard accessible
- Aside
  - Items defined in `Aside/items.js` and rendered via `Aside/Section.jsx`

### Environment
- Configure DB in `.env`
- For HTTPS dev, adjust Vite server config in `vite.config.js`

### Testing
```bash
php artisan test
```

### Deployment
```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm ci && npm run build
php artisan config:cache route:cache view:cache
```

### License
MIT

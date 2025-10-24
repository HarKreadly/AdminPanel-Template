# User Management System

A modern, full-featured user management system built with Laravel, Inertia.js, React, and Tailwind CSS. This application provides comprehensive user administration capabilities with a beautiful, responsive interface.

<div align="center">

[![Laravel](https://img.shields.io/badge/Laravel-12.x-ff2d20?logo=laravel&logoColor=white)](https://laravel.com)
[![Inertia](https://img.shields.io/badge/Inertia-React-5a67d8)](https://inertiajs.com)
[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.2-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777bb4?logo=php&logoColor=white)](https://php.net)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

</div>

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

### 👥 User Management
- **Complete CRUD Operations**: Create, read, update, and delete users
- **Advanced User Profiles**: Detailed profiles with personal, contact, and location information
- **Role-Based Access Control**: Support for User, Company, and Admin roles
- **User Status Management**: Active, inactive, and banned user states
- **Email Verification**: Built-in email verification system
- **Soft Deletes**: Preserved user history with soft deletion

### 🖼️ Profile Management
- **Profile Picture Upload**: Image upload with cropping functionality
- **Rich Profile Information**:
  - Personal details (name, date of birth, gender)
  - Contact information (phone, email)
  - Location data (country, city, province, address)
  - Biography and timezone settings
- **Profile Image Editor**: Built-in image cropping and editing

### 🔐 Authentication & Security
- **Laravel Breeze Integration**: Modern authentication system
- **Sanctum API Authentication**: For API access
- **Password Security**: Secure password hashing with configurable rounds
- **Session Management**: Comprehensive session handling

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first responsive interface
- **Dark/Light Mode**: Theme switching capability
- **Modern Components**: Flowbite React components
- **Interactive Dashboard**: Clean, informative admin dashboard
- **Breadcrumb Navigation**: Easy site navigation

### 📊 Data Management
- **Excel Export**: XLSX support for data export
- **Image Processing**: Intervention Image for image manipulation
- **Database Seeding**: Sample data with admin user creation
- **SQLite Support**: Easy development setup with SQLite

### 🛠️ Developer Experience
- **Inertia.js**: Server-side rendering with React
- **Vite Integration**: Fast development and building
- **Hot Module Replacement**: Instant updates during development
- **Modern JavaScript**: ES6+ with React 18
- **TypeScript Ready**: Configured for TypeScript development

## Requirements

- **PHP**: 8.2 or higher
- **Composer**: Latest version
- **Node.js**: 20 or higher
- **NPM**: Latest version
- **Database**: SQLite (default), MySQL, or PostgreSQL

## Installation

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd user-management-system

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database (SQLite is default)
# For SQLite (already configured):
# Database file will be created automatically

# For MySQL/PostgreSQL, update .env:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password
```

### 3. Database Setup

```bash
# Run migrations
php artisan migrate

# Seed the database with sample data (optional)
php artisan db:seed

# Or run migrations with seeding
php artisan migrate --seed
```

This will create:
- An admin user: `admin@example.com` / `password`
- 20 additional sample users

### 4. Start Development Servers

```bash
# Option 1: Run both servers separately
php artisan serve    # Laravel server (http://127.0.0.1:8000)
npm run dev         # Vite dev server (http://127.0.0.1:5173)

# Option 2: Use the convenience script (if available)
composer run dev    # Runs both servers concurrently
```

Visit **http://127.0.0.1:8000** to access the application.

## Usage

### Development

```bash
# Start development servers
npm run dev          # Vite development server with HMR
php artisan serve    # Laravel development server

# Run tests
php artisan test

# Code formatting
./vendor/bin/pint    # PHP code formatting
npm run lint        # JavaScript linting (if configured)
```

### Production Build

```bash
# Build for production
npm run build

# Optimize for production
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Serve production build
# Configure your web server (Nginx/Apache) to serve the public/ directory
```

## Project Structure

```
├── app/                    # Laravel application logic
│   ├── Http/Controllers/   # Request controllers
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic services
├── resources/
│   ├── js/
│   │   ├── Components/    # Reusable React components
│   │   ├── Layouts/       # Page layouts
│   │   └── Pages/         # Inertia.js pages
│   │       ├── Auth/      # Authentication pages
│   │       ├── Profile/   # Profile management
│   │       └── Users/     # User management pages
│   └── css/               # Stylesheets
├── database/
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── routes/
│   └── web.php           # Web routes
└── public/               # Public assets
```

### Key Files

- **`routes/web.php`**: Main application routes
- **`app/Models/User.php`**: User model with relationships
- **`resources/js/Pages/Dashboard.jsx`**: Main dashboard page
- **`resources/js/Pages/Users/`**: User management pages
- **`resources/js/Pages/Profile/`**: Profile management pages
- **`database/migrations/*_create_users_table.php`**: User table schema

## API Endpoints

### Authentication
- `GET /` - Welcome page
- `GET /dashboard` - Main dashboard (authenticated)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout

### User Management (Authenticated)
- `GET /users` - List all users
- `GET /users/create` - Create user form
- `POST /users` - Store new user
- `GET /users/{id}` - View user details
- `GET /users/{id}/edit` - Edit user form
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Profile Management (Authenticated)
- `GET /profile` - View profile
- `GET /settings/edit` - Edit profile form
- `PATCH /settings/picture` - Update profile picture
- `PATCH /settings/information` - Update profile information
- `PATCH /settings/address` - Update address information

## Default Users

After seeding, you can log in with:

**Admin User:**
- Email: `admin@example.com`
- Password: `password`
- Role: Admin

**Sample Users:**
- 20 randomly generated users created by the UserSeeder

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Laravel and React best practices
- Maintain consistent code style with Pint and ESLint
- Add tests for new features
- Update documentation for significant changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Laravel, Inertia.js, React, and Tailwind CSS**

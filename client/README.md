# 🍽️ Grab Restaurant - Frontend

A modern restaurant discovery and management platform built with React, Tailwind CSS, and DaisyUI.

## ✨ Features

- **Restaurant Management**: Add, update, and delete restaurant information
- **Smart Search**: Search restaurants by name, cuisine type, or food category
- **Responsive Design**: Beautiful interface that works on all devices
- **Modern UI**: Built with Tailwind CSS and DaisyUI components
- **Fast Performance**: Powered by Vite for lightning-fast development

## 🛠️ Tech Stack

- **React 19** - Modern UI library
- **Tailwind CSS 4** - Utility-first CSS framework  
- **DaisyUI** - Beautiful component library
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **JSON Server** - Mock REST API for development
- **SweetAlert2** - Beautiful alert and notification modals

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Start the JSON Server (in a separate terminal)**
   ```bash
   npm run json-server
   ```

4. **Open your browser**
   - Frontend: `http://localhost:5173`
   - JSON Server API: `http://localhost:3001`

## 📁 Project Structure

```
src/
├── Component/          # Reusable UI components
│   ├── Card.jsx       # Restaurant card component
│   ├── Navbar.jsx     # Navigation component
│   └── Restaurant.jsx # Restaurant grid component
├── Pages/             # Page components
│   ├── Home.jsx       # Home page with restaurant listing
│   ├── AddRestaurant.jsx    # Add new restaurant
│   ├── UpdateRestaurant.jsx # Edit restaurant
│   ├── Search.jsx     # Advanced search page
│   └── AboutUs.jsx    # About page
├── Routes/            # Route configuration
│   └── Routes.jsx     # React Router setup
├── App.jsx           # Main app component
├── main.jsx          # Application entry point
└── index.css         # Global styles and Tailwind imports
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run json-server` - Start mock API server

## 🔧 Configuration

- **Vite Config**: `vite.config.js`
- **ESLint Config**: `eslint.config.js`
- **Tailwind**: Configured via `@tailwindcss/vite` plugin
- **DaisyUI**: Included via `@plugin "daisyui"` in `index.css`

## 📱 Features Overview

### Home Page
- Hero section with call-to-action buttons
- Restaurant statistics dashboard
- Quick search functionality
- Featured restaurants grid
- Quick action cards

### Add Restaurant
- User-friendly form with validation
- Real-time image preview
- Input guidelines and tips
- Success/error handling

### Update Restaurant
- Pre-populated form with existing data
- Loading states
- Breadcrumb navigation
- Confirmation dialogs

### Search Page
- Advanced filtering options
- Search by name and cuisine type
- Filter by restaurant category
- Responsive results grid
- Empty state handling

### About Us
- Team information
- Technology stack showcase
- Project features overview
- Call-to-action sections

## 🎯 API Endpoints

The frontend communicates with a JSON Server API:

- `GET /restaurants` - Get all restaurants
- `POST /restaurants` - Add new restaurant
- `PUT /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant

## 🔄 Development Workflow

1. **Frontend Development**: Work on React components and pages
2. **API Integration**: Use the JSON Server for data management
3. **Styling**: Utilize Tailwind CSS and DaisyUI components
4. **Testing**: Test features in the browser
5. **Building**: Build for production when ready

## 🚀 Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy the contents of dist/ to your hosting service
```

## 🤝 Team Collaboration

This project is designed for a 3-person team:
- **Frontend Developer**: React components, UI/UX, and styling
- **Backend Developer**: Server-side API and database management  
- **Full Stack Developer**: Integration and architecture

## 📄 License

This project is part of an educational assignment for NPRU.

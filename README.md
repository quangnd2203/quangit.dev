# quangit.dev Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055ff?style=for-the-badge&logo=framer&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-quangit.dev-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://quangit.dev)
[![Status](https://img.shields.io/badge/Status-Production-10b981?style=for-the-badge)](https://quangit.dev)

**A modern, professional portfolio website built with Next.js 14+ and Clean Architecture**

*Showcasing 5+ years of mobile engineering experience with Flutter, iOS, and React Native*

</div>

---

## 📋 Overview

This is a professional portfolio website showcasing the work and expertise of **Nguyen Dang Quang**, a Mobile Engineer with 5+ years of experience specializing in Flutter, iOS (SwiftUI), and React Native. The portfolio is built using **Clean Architecture** principles with a **feature-based module** structure, ensuring maintainability, scalability, and code quality.

### Key Highlights

- ✨ **Modern UI/UX** with smooth animations and responsive design
- 🏗️ **Clean Architecture** with feature-based modules for maintainability
- ⚡ **Performance Optimized** with Next.js 14+ App Router and code splitting
- 🎨 **Professional Design** with light theme and glassmorphism effects
- 📱 **Fully Responsive** - works seamlessly on all devices
- 🔒 **Type-Safe** with TypeScript throughout the codebase

---

## ✨ Features

### 🏠 Home Section
- **Hero Section** with gradient background and decorative elements
- Professional avatar display
- Key highlights and achievements badges
- Call-to-action buttons (Contact, View Projects, Download CV)
- Smooth fade-in and stagger animations

### 💼 Experience Section
- **Minimal List Design** (LinkedIn-inspired, clean and professional)
- Work history with company, role, and period
- "Current" badge for present positions
- Achievement bullet points
- Technology tags with hover effects
- Auto-sorted by date (Present positions first)

### 🛠️ Skills Section
- **5 Skill Categories**: Mobile, Native, Web, Database, DevOps
- **Color-coded Proficiency Badges**: Expert, Advanced, Intermediate, Beginner
- Glassmorphism card design with hover effects
- 3-tier sorting: Proficiency > Priority > Alphabetical
- Responsive grid layout (1/2/3 columns)
- Visual legend showing proficiency levels

### 🚀 Projects Section
- **Card Grid Layout** with featured projects prioritized
- Project thumbnails with fallback handling
- Interactive modal with image gallery
- Project achievements with check icons
- Technology stack display
- GitHub and Demo links (when available)
- Smooth animations and transitions

### 📧 Contact Section
- **Split Layout**: Contact info on left, form on right
- Contact form with validation
- Rate limiting (30 seconds between submissions)
- Success/error message handling
- Loading states and user feedback
- Responsive stack on mobile devices

---

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18.3](https://react.dev/)** - UI library
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11.0](https://www.framer.com/motion/)** - Animation library

### Architecture
- **Clean Architecture** - Separation of concerns with layered architecture
- **Feature-Based Modules** - Independent, reusable feature modules
- **Repository Pattern** - Data access abstraction
- **Use Cases** - Business logic orchestration
- **MVVM Pattern** - Hooks as ViewModels

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **PostCSS** - CSS processing

---

## 🏗️ Architecture

This project follows **Clean Architecture** principles with a **feature-based module** structure:

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│              (src/app/ - Next.js Pages)                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Feature Layer                              │
│    (src/features/ - Business Logic & UI Components)     │
│  • home • skills • experience • projects • contact     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Core Layer                              │
│  (src/core/ - Domain Entities, Use Cases, Interfaces)  │
│  • entities • use-cases • interfaces                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Infrastructure Layer                          │
│  (src/infrastructure/ - Data Access, External Services) │
│  • repositories • services                               │
└─────────────────────────────────────────────────────────┘
```

### Architecture Flow

```
Component (UI)
    ↓ uses
Hook (ViewModel - UI State Management)
    ↓ calls
Use Case (Business Logic Orchestration)
    ↓ uses
Repository Interface (Port)
    ↓ implemented by
Repository (Data Access - Infrastructure)
```

### Key Principles

1. **Dependency Rule**: Dependencies point inward (toward core)
2. **Feature Independence**: Features don't depend on each other
3. **Separation of Concerns**: UI, business logic, and data access are separated
4. **Type Safety**: TypeScript interfaces ensure type safety across layers

---

## 📁 Project Structure

```
quangit.dev/
├── src/
│   ├── app/                    # Next.js App Router (Presentation Layer)
│   │   ├── layout.tsx          # Root layout with Header, Footer
│   │   ├── page.tsx            # Home page composing all sections
│   │   ├── globals.css         # Global styles, Tailwind config
│   │   └── ...
│   │
│   ├── features/               # Feature Modules (Business Logic Layer)
│   │   ├── home/               # Home/Hero section
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── skills/             # Skills section
│   │   ├── experience/         # Experience section
│   │   ├── projects/           # Projects section
│   │   └── contact/            # Contact section
│   │
│   ├── core/                   # Core Domain Layer
│   │   ├── entities/           # Domain entities (7 entities)
│   │   ├── use-cases/          # Business use cases (6 use cases)
│   │   └── interfaces/          # Repository interfaces (6 interfaces)
│   │
│   ├── infrastructure/         # Infrastructure Layer
│   │   └── repositories/       # Data repositories
│   │
│   └── shared/                 # Shared Resources
│       ├── components/         # Reusable UI components
│       │   ├── layout/         # Header, Footer, Navigation
│       │   └── ui/            # Base UI components
│       ├── hooks/              # Shared React hooks
│       ├── utils/              # Utility functions
│       ├── constants/          # App-wide constants
│       └── data/               # Mock data
│
├── public/                     # Static assets
│   └── hero/                   # Hero images
│
├── .cursor/                    # Cursor IDE rules
│   └── rules/                  # Architecture and build rules
│
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 22.0.0
- **npm** >= 10.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/quangnd2203/quangit.dev.git
   cd quangit.dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Other Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🎨 Design Highlights

### Theme
- **Light Theme Only** - Clean, professional appearance
- **Color Palette**:
  - Primary: `#3b82f6` (Professional Blue)
  - Accent: `#10b981` (Tech-friendly Green)
  - Background: White with subtle gray sections

### Typography
- **Font**: Inter (loaded via `next/font`)
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Readable sans-serif with good line height

### Layout
- **Container**: Max-width 1280px, centered
- **Section Padding**: Responsive (py-16 md:py-24)
- **Grid Gaps**: Consistent spacing (gap-6, gap-8)

### Animations
- **Framer Motion** for all animations
- **Fade-in on scroll** for sections
- **Stagger effects** for lists
- **Smooth transitions** for interactions
- **Hover effects** on interactive elements

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm, md, lg, xl
- **Flexible layouts** that adapt to all screen sizes

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code linting |
| `npm run type-check` | Run TypeScript type checking |

---

## 🔧 Development Guidelines

### Code Standards

- **Arrow Functions**: All React components and functions use arrow function syntax
- **TypeScript**: Full type safety throughout the codebase
- **Clean Architecture**: Follow the established architecture patterns
- **Feature Modules**: Each feature is self-contained and independent

### Architecture Rules

- ✅ Components use Hooks (ViewModels) for state management
- ✅ Hooks call Use Cases for business logic
- ✅ Use Cases use Repository Interfaces
- ✅ Repositories implement interfaces from core layer
- ❌ Features should not depend on each other
- ❌ Components should not directly call repositories

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Nguyen Dang Quang** - Mobile Engineer

- 📧 Email: [quangnd22398.dev@gmail.com](mailto:quangnd22398.dev@gmail.com)
- 📱 Phone: (+84) 34 781 1798
- 🌐 Website: [quangit.dev](https://quangit.dev)
- 💻 GitHub: [@quangnd2203](https://github.com/quangnd2203)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons and assets from various sources

---

<div align="center">

**Made with ❤️ by Nguyen Dang Quang**

[![GitHub](https://img.shields.io/badge/GitHub-quangnd2203-181717?style=flat&logo=github)](https://github.com/quangnd2203)
[![Website](https://img.shields.io/badge/Website-quangit.dev-10b981?style=flat)](https://quangit.dev)

</div>

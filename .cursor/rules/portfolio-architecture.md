# Cursor Rule: Portfolio Project Architecture & Implementation Guide

## Overview

This rule documents the locked modules and provides implementation guidelines for new features following Clean Architecture with feature-based modules.

## Locked Modules - DO NOT MODIFY

The following modules are finalized and should not be changed:

### 1. Layout Components (`src/shared/components/layout/`)

**Files:**
- `src/shared/components/layout/Header.tsx` - Sticky header with logo, navigation, scroll shadow
- `src/shared/components/layout/Footer.tsx` - 3-column footer with brand, quick links, Connect social icons (GitHub, website, email)
- `src/shared/components/layout/Navigation.tsx` - Desktop/mobile navigation with active section detection
- `src/shared/components/layout/index.ts` - Exports

**Features:**
- Framer Motion animations (slide-in, fade-in, stagger)
- Active section highlighting via `useActiveSection` hook
- Scroll-based shadow via `useScrollPosition` hook
- Mobile hamburger menu with AnimatePresence
- Gradient logo "NDQ"; Connect buttons: bg-white, border, shadow, hover primary; Quick links / Connect headings h1 text-md

### 2. Shared Hooks (`src/shared/hooks/`)

**Files:**
- `src/shared/hooks/useScrollPosition.ts` - Track scroll position
- `src/shared/hooks/useActiveSection.ts` - Detect active section in viewport
- `src/shared/hooks/index.ts` - Exports

### 3. Shared Constants (`src/shared/constants/`)

**Files:**
- `src/shared/constants/routes.ts` - `SECTION_IDS`, `NAV_LINKS`
- `src/shared/constants/socialLinks.ts` - `SOCIAL_LINKS` array
- `src/shared/constants/index.ts` - Exports

### 4. Shared Utils

**Files:**
- `src/shared/utils/cn.ts` - className utility for conditional classes

### 5. App Layout Files

**Files:**
- `src/app/layout.tsx` - Root layout with Header, Footer, Inter font
- `src/app/globals.css` - Global styles, Tailwind config, CSS variables
- `src/app/page.tsx` - Home page composing HomeSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection (in that order)

**Note:** All main sections implemented. Section backgrounds alternate: Home gradient, Skills gray-50, Experience white, Projects gray-50, Contact white.

### 6. Core Layer (Complete Architecture)

**All files in `src/core/` are locked:**
- `src/core/entities/` - 7 entities: Experience, Project, Skill, SkillCategory, BlogPost, PersonalInfo, ContactMessage
- `src/core/use-cases/` - 6 use cases: GetExperiences, GetProjects, GetSkills, GetPersonalInfo, GetBlogPosts, SendContactMessage
- `src/core/interfaces/` - 6 repository interfaces

### 7. Shared Data (`src/shared/data/`)

**Mock data files (locked):**
- `experiences.ts`, `projects.ts`, `skills.ts`, `personalInfo.ts`, `blogPosts.ts`

### 8. Features - Skills Module (`src/features/skills/`)

**Files:**
- `src/features/skills/hooks/useSkills.ts` - ViewModel managing skills data with loading/error states
- `src/features/skills/components/SkillsSection.tsx` - Skills display with category cards and proficiency badges
- `src/features/skills/index.ts` - Public API exporting SkillsSection

**Features:**
- 5 skill categories: Mobile, Native, Web, Database, DevOps
- Color-coded proficiency badges (expert/advanced/intermediate/beginner)
- Glassmorphism card design with hover effects
- 3-tier sorting: Proficiency > Priority > Alphabetical
- Responsive grid layout (1/2/3 columns)
- Framer Motion animations with stagger effects
- Loading skeleton and error handling
- Priority field for custom skill ordering within proficiency levels

**Design:**
- Professional gradient header with "Technical Skills" title
- Category cards with glassmorphism backdrop-blur
- Skill pills with proficiency-based colors:
  - Expert: Primary blue bg, white text, bold
  - Advanced: Light primary bg, primary text, semibold
  - Intermediate: Light accent bg, accent text
  - Beginner: Gray bg, gray text
- Visual legend showing proficiency levels
- Smooth animations on scroll and hover

### 9. Features - Experience Module (`src/features/experience/`)

**Files:**
- `src/features/experience/hooks/useExperience.ts` - ViewModel managing experience data with loading/error states
- `src/features/experience/components/ExperienceSection.tsx` - Professional minimal list display
- `src/features/experience/index.ts` - Public API exporting ExperienceSection

**Features:**
- Minimal List design (LinkedIn-inspired, clean and professional)
- Vertical list layout with border separators between items
- Company name & date period in responsive header row
- "Current" badge for Present positions (green, subtle)
- Role title in primary color with location
- Simple bullet-point achievements list
- Technology tags with hover effects
- Full-width content within container-custom (no max-width constraint)
- Auto-sorted by date (Present positions first, then by end date descending)
- Framer Motion animations (fade-up, stagger effects)
- Loading skeleton and error handling

**Design:**
- Clean article-based layout without cards or complex decorations
- Typography-focused with excellent readability
- Company: 2xl bold, Period: responsive alignment with em dash separator
- Role: Large primary color, Location: subtle gray with bullet separator
- Achievements: Primary color bullets with good line height
- Tech tags: Simple gray pills with rounded corners (not fully rounded)
- Professional spacing with `pb-8 mb-8` between items
- Last item: No border or margin
- No timeline lines, dots, or alternating layouts

### 10. Features - Home Module (`src/features/home/`)

**Files:**
- `src/features/home/hooks/useHome.ts` - ViewModel fetching personal info via GetPersonalInfo
- `src/features/home/components/HomeSection.tsx` - Hero section with name, title, description, badges, CTAs, avatar
- `src/features/home/index.ts` - Public API exporting HomeSection

**Features:**
- Two-column layout (3fr content, 1fr avatar), responsive stack on mobile
- Gradient name, badges from `personalInfo.highlights`, CTAs: Contact Me, View Projects, Download CV
- Avatar: `/hero/hero_image.jpg`, rounded-[50%], hardcoded path (do not change `personalInfo.ts`)
- Background: gradient + decorative blurs + grid overlay
- Height: `min-h-screen`, padding `py-24`, container-custom
- Framer Motion: stagger, fade, scale animations

**Design:**
- Arrow functions only. Do not modify `src/shared/data/personalInfo.ts` for hero image.

### 11. Features - Projects Module (`src/features/projects/`)

**Files:**
- `src/features/projects/hooks/useProjects.ts` - ViewModel, GetProjects use case
- `src/features/projects/hooks/useProjectModal.ts` - Modal state, gallery index, open/close
- `src/features/projects/components/ProjectCard.tsx` - Card with thumbnail, title, description, tech pills, Featured badge
- `src/features/projects/components/ProjectModal.tsx` - Full modal: gallery, achievements, tech stack, GitHub/Demo links
- `src/features/projects/components/ProjectsSection.tsx` - Grid 1/2/3 cols, Framer Motion, loading/error
- `src/features/projects/index.ts` - Exports ProjectsSection

**Features:**
- Card grid; featured first; thumbnail fallback "No image"; click card opens modal
- Modal: image gallery with prev/next, counter, caption; longDescription, achievements (check icons), tech pills; GitHub/Demo if present
- Achievements only (no Metrics section). ESC/click-outside to close, body scroll lock

**Design:**
- Modal: backdrop blur, spring animation, primary gradient title; achievements only (no Metrics section)

### 12. Features - Contact Module (`src/features/contact/`)

**Files:**
- `src/features/contact/hooks/useContactForm.ts` - Form state, validation, SendContactMessage, rate limit 30s
- `src/features/contact/components/ContactSection.tsx` - Split layout (contact info left, form right), Get In Touch header
- `src/features/contact/index.ts` - Exports ContactSection

**Features:**
- Split side-by-side: contact info (email, phone, GitHub, website) left; form (name, email, subject, message) right; stack on mobile
- "Let's Connect" intro; success/error messages; loading state on submit
- Full-width within container-custom (no max-width), same horizontal alignment as other sections

**Design:**
- Minimal form; contact info vertical list; Framer Motion fade-in from left/right

---

## Implementation Guide for New Features

### Architecture Flow

```
Component (UI)
    ↓ uses
Hook (ViewModel - UI State Management)
    ↓ calls
Use Case (Business Logic)
    ↓ uses
Repository Interface (Port)
    ↓ implemented by
Repository (Data Access)
```

### Feature Module Structure

Each feature must follow this structure:

```
src/features/{feature-name}/
├── components/
│   └── {FeatureName}Section.tsx    # Main section component
├── hooks/
│   └── use{FeatureName}.ts         # ViewModel - state + Use Case calls
├── types/
│   └── index.ts                    # Feature-specific types (if needed)
└── index.ts                        # Public API - export only what's needed
```

### Arrow Function Standard (MANDATORY)

All React components and functions must use arrow functions:

```typescript
// ✅ GOOD - Arrow function
const HomePage = () => {
  return <div>Home</div>;
};
export default HomePage;

// Component with hook
const HeroSection = () => {
  const { heroData } = useHero();
  return <section>{/* ... */}</section>;
};

// Hook (ViewModel)
export const useHero = () => {
  const [data, setData] = useState(null);
  // ...
  return { data };
};

// ❌ BAD - Function declaration
export default function HomePage() {
  return <div>Home</div>;
}
```

**Exception:** Use Cases and Repository classes use class syntax.

### Implementation Steps for Each Feature

#### Step 1: Create Hook (ViewModel)

Hook calls Use Case and manages UI state:

```typescript
// features/hero/hooks/useHero.ts
import { useState, useEffect } from 'react';
import { GetPersonalInfo } from '@/core/use-cases/GetPersonalInfo';
import { mockPersonalInfoRepository } from '@/shared/data/repositories';

export const useHero = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const useCase = new GetPersonalInfo(mockPersonalInfoRepository);
        const data = await useCase.execute();
        setPersonalInfo(data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  
  return { personalInfo, loading, error };
};
```

#### Step 2: Create Component

Component uses hook and renders UI:

```typescript
// features/hero/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useHero } from '../hooks/useHero';

export const HeroSection = () => {
  const { personalInfo, loading } = useHero();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center"
    >
      <div className="container-custom">
        <h1>{personalInfo.name}</h1>
        <p>{personalInfo.title}</p>
      </div>
    </motion.section>
  );
};
```

#### Step 3: Export via index.ts

```typescript
// src/features/hero/index.ts
export { HeroSection } from './components/HeroSection';
```

#### Step 4: Import in src/app/page.tsx

```typescript
// src/app/page.tsx
import { HeroSection } from '@/features/hero';

const HomePage = () => (
  <main className="min-h-screen">
    <HeroSection />
    {/* Other sections */}
  </main>
);
export default HomePage;
```

---

## Features to Implement (Priority Order)

### 1. ~~Hero Section~~ ✅ COMPLETED → `src/features/home/`

**Status:** Locked module - fully implemented and should not be modified

### 2. ~~About Section~~ ❌ REMOVED

**Status:** Removed - content integrated into Home section

### 3. ~~Skills Section~~ ✅ COMPLETED → `src/features/skills/`

**Status:** Locked module - fully implemented with priority-based sorting

### 4. ~~Experience Section~~ ✅ COMPLETED → `src/features/experience/`

**Status:** Locked module - fully implemented with Minimal List design

### 5. ~~Projects Section~~ ✅ COMPLETED → `src/features/projects/`

**Status:** Locked module - fully implemented with card grid, modal, achievements-only detail.

### 6. ~~Contact Section~~ ✅ COMPLETED → `src/features/contact/`

**Status:** Locked module - fully implemented with split layout, minimal form, rate limiting.

### 7. Blog Section (`src/features/blog/`)

**Requirements:**
- Use `BlogPost` entity
- Call `GetBlogPosts` use case
- Display: latest 3 blog posts on home page
- Card layout with thumbnail, title, excerpt, date
- Link to `/blog` page for full listing

**Hook:** `useBlogPosts()`

---

## Styling Guidelines

### Theme (Light Only)

**CSS Variables in `globals.css`:**
```css
--color-primary: #3b82f6;
--color-primary-dark: #1e40af;
--color-accent: #10b981;
--color-accent-light: #06b6d4;
--container-max-width: 1280px;
```

### Typography

- Font: Inter (already loaded via `next/font`)
- Headings: `text-3xl md:text-4xl font-bold`
- Body: `text-base text-gray-600`

### Layout

- Container: `container-custom` class (max-width 1280px, auto margin)
- Section padding: `py-16 md:py-24`
- Grid gaps: `gap-6 md:gap-8`

### Animations (Framer Motion)

```typescript
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

// Stagger children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

---

## Shared UI Components (To Create)

Create these in `src/shared/components/ui/` for reuse:

1. **Button.tsx** - Primary/secondary variants, sizes
2. **Card.tsx** - Project cards, blog cards
3. **Input.tsx** - Form input
4. **Textarea.tsx** - Form textarea
5. **Modal.tsx** - Project detail modal

**Structure:**
```typescript
// shared/components/ui/Button.tsx
export const Button = ({
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      'px-6 py-3 rounded-lg font-medium transition-all',
      variant === 'primary' && 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
      variant === 'secondary' && 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    )}
    {...props}
  >
    {children}
  </button>
);
```

---

## Key Principles

1. **No Modification to Locked Modules** - Layout components, hooks, constants are final
2. **Arrow Functions Mandatory** - All components and functions use arrow syntax
3. **Hook = ViewModel** - Hooks manage state and call Use Cases
4. **Use Case = Business Logic** - Use Cases orchestrate data and rules
5. **Clean Architecture Flow** - Component → Hook → Use Case → Repository
6. **Feature Independence** - Features don't depend on each other
7. **Framer Motion** - Use for all animations
8. **Light Theme Only** - Single theme, no dark mode toggle

---

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React 18** functional components
- **Inter** font (Google Fonts via next/font)

---

## Example: Complete Feature Implementation

### Experience Feature

```typescript
// features/experience/hooks/useExperiences.ts
import { useState, useEffect } from 'react';
import { GetExperiences } from '@/core/use-cases/GetExperiences';
import { mockExperienceRepository } from '@/shared/data/repositories';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const useCase = new GetExperiences(mockExperienceRepository);
      const data = await useCase.execute();
      setExperiences(data);
      setLoading(false);
    };
    load();
  }, []);
  
  return { experiences, loading };
};

// features/experience/components/ExperienceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useExperiences } from '../hooks/useExperiences';

export const ExperienceSection = () => {
  const { experiences, loading } = useExperiences();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500 mt-2">
                {exp.period.start} - {exp.period.end}
              </p>
              <ul className="mt-4 space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-700">• {achievement}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// features/experience/index.ts
export { ExperienceSection } from './components/ExperienceSection';
```

---

## Checklist for Each Feature

- [ ] Create hook in `hooks/` folder (calls Use Case)
- [ ] Create main component in `components/` folder
- [ ] Use arrow function syntax for all functions
- [ ] Add Framer Motion animations
- [ ] Use Tailwind CSS for styling (follow design system)
- [ ] Export via `index.ts`
- [ ] Import in `src/app/page.tsx`
- [ ] Test build with `npm run build`
- [ ] Replace placeholder section in page.tsx

---

## Next Steps

**Completed (locked):** Home, Skills, Experience, Projects, Contact.

**Remaining:** Blog Section (`src/features/blog/`). Implement per guide above when needed.

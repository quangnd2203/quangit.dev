---
name: Portfolio Website Next.js
overview: Tạo portfolio website chuyên nghiệp với Next.js và Tailwind CSS theo Clean Architecture, cấu trúc feature-based modules. Chỉ hỗ trợ tiếng Anh và light theme.
todos: []
isProject: false
---

# Portfolio Website Development Plan

## Architecture Overview

Dự án sử dụng **Clean Architecture** với cấu trúc **feature-based modules**. Mỗi feature là một module độc lập, có thể tái sử dụng và dễ bảo trì.

### Core Setup

- **Next.js 14+** với App Router (sử dụng `src/app/` directory)
- **TypeScript** cho type safety
- **Tailwind CSS** cho styling (light theme only)
- **Framer Motion** cho animations
- **English only** - không hỗ trợ multi-language

**Note:** Khi có `src/` directory, Next.js tự động sử dụng `src/app/` cho App Router. TypeScript path aliases (`@/*`, `@/core/*`, etc.) trong `tsconfig.json` cần trỏ đến `./src/*` thay vì `./*`.

## Project Structure (Clean Architecture)

```
porfolio/
├── src/
│   ├── app/                          # Next.js App Router (Presentation Layer)
│   │   ├── layout.tsx                # Root layout với Header, Footer
│   │   ├── page.tsx                  # Home page - compose các feature sections
│   │   ├── blog/                     # Blog routes
│   │   │   ├── page.tsx              # Blog listing
│   │   │   └── [slug]/page.tsx       # Blog post detail
│   │   └── globals.css               # Global styles, Tailwind imports
│   │
│   ├── features/                     # Feature Modules (Business Logic Layer)
│   │   ├── hero/                     # Hero Section Feature (renamed to home)
│   │   │   ├── components/           # Feature-specific components
│   │   │   │   └── HomeSection.tsx
│   │   │   ├── hooks/                # Hooks (ViewModel) - State management & business logic
│   │   │   │   └── useHome.ts
│   │   │   └── index.ts              # Public API - export only what's needed
│   │   │
│   │   ├── skills/                   # Skills Section Feature
│   │   │   ├── components/
│   │   │   │   └── SkillsSection.tsx
│   │   │   ├── hooks/                # Hooks (ViewModel)
│   │   │   │   └── useSkills.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── experience/               # Experience Section Feature
│   │   │   ├── components/
│   │   │   │   └── ExperienceSection.tsx
│   │   │   ├── hooks/                # Hooks (ViewModel) - State & API calls
│   │   │   │   └── useExperience.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── projects/                 # Projects Section Feature
│   │   │   ├── components/
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   └── ProjectModal.tsx
│   │   │   ├── hooks/                # Hooks (ViewModel) - State & business logic
│   │   │   │   ├── useProjects.ts
│   │   │   │   └── useProjectModal.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── contact/                  # Contact Section Feature
│   │   │   ├── components/
│   │   │   │   └── ContactSection.tsx
│   │   │   ├── hooks/                # Hooks (ViewModel) - Form state & API calls
│   │   │   │   └── useContactForm.ts
│   │   │   └── index.ts
│   │   │
│   │   └── blog/                     # Blog Feature Module
│   │       ├── components/
│   │       │   ├── BlogSection.tsx
│   │       │   ├── BlogPostCard.tsx
│   │       │   └── BlogPostContent.tsx
│   │       ├── hooks/                # Hooks (ViewModel) - Fetch blog posts
│   │       │   └── useBlogPosts.ts
│   │       └── index.ts
│   │
│   ├── shared/                       # Shared Resources (Cross-cutting Concerns)
│   │   ├── components/               # Reusable UI components
│   │   │   ├── ui/                   # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Textarea.tsx
│   │   │   │   └── Modal.tsx
│   │   │   └── layout/               # Layout components
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Navigation.tsx
│   │   ├── hooks/                    # Shared React hooks
│   │   │   ├── useScrollAnimation.ts
│   │   │   └── useIntersectionObserver.ts
│   │   ├── utils/                    # Utility functions
│   │   │   ├── formatDate.ts
│   │   │   ├── cn.ts                 # className utility
│   │   │   └── validations.ts
│   │   ├── constants/                # App-wide constants
│   │   │   ├── routes.ts
│   │   │   └── socialLinks.ts
│   │   ├── data/                     # Mock data
│   │   │   ├── experiences.ts
│   │   │   ├── projects.ts
│   │   │   ├── skills.ts
│   │   │   ├── personalInfo.ts
│   │   │   └── blogPosts.ts
│   │   └── types/                    # Shared TypeScript types
│   │       └── common.ts
│   │
│   ├── core/                         # Core Domain Layer
│   │   ├── entities/                 # Domain entities
│   │   │   ├── Experience.ts
│   │   │   ├── Project.ts
│   │   │   ├── Skill.ts
│   │   │   ├── SkillCategory.ts
│   │   │   ├── BlogPost.ts
│   │   │   ├── PersonalInfo.ts
│   │   │   └── ContactMessage.ts
│   │   ├── use-cases/                # Business use cases
│   │   │   ├── GetExperiences.ts
│   │   │   ├── GetProjects.ts
│   │   │   ├── GetSkills.ts
│   │   │   ├── GetPersonalInfo.ts
│   │   │   ├── GetBlogPosts.ts
│   │   │   └── SendContactMessage.ts
│   │   └── interfaces/               # Repository interfaces (ports)
│   │       ├── IExperienceRepository.ts
│   │       ├── IProjectRepository.ts
│   │       ├── ISkillRepository.ts
│   │       ├── IPersonalInfoRepository.ts
│   │       ├── IBlogPostRepository.ts
│   │       └── IContactRepository.ts
│   │
│   └── infrastructure/               # Infrastructure Layer (Adapters)
│       ├── repositories/             # Data repositories (implement interfaces)
│       │   ├── ExperienceRepository.ts
│       │   ├── ProjectRepository.ts
│       │   ├── SkillRepository.ts
│       │   ├── PersonalInfoRepository.ts
│       │   ├── BlogPostRepository.ts
│       │   └── ContactRepository.ts
│       └── services/                 # External services
│           └── emailService.ts       # Email sending service
│
├── public/                           # Static assets
│   ├── images/                       # Images
│   │   ├── avatar.jpg
│   │   └── projects/
│   └── icons/                        # Icons, SVGs
│
└── config/                           # Configuration files
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── next.config.js
```

## Architecture Principles

### 1. Feature-Based Modules

- Mỗi feature là một module độc lập
- Mỗi module có cấu trúc riêng: components, hooks, types, utils
- **Hooks** đóng vai trò như **ViewModel** - quản lý state, business logic, và API calls
- Export public API qua `index.ts` - chỉ expose những gì cần thiết

### 2. Clean Architecture Layers

- **Presentation Layer (src/app/)**: Next.js pages, routing
- **Feature Layer (src/features/)**: Business logic, UI components cho từng feature
- **Shared Layer (src/shared/)**: Reusable components, utilities, constants, data
- **Core Layer (src/core/)**: Domain entities, use cases, interfaces
- **Infrastructure Layer (src/infrastructure/)**: Data access, external services

### 3. Dependency Rule

- Dependencies chỉ đi vào trong (inward)
- Features không phụ thuộc vào nhau
- Features phụ thuộc vào shared và core
- Infrastructure implement interfaces từ core

### 4. Separation of Concerns

- **Components**: Chỉ chịu trách nhiệm UI rendering
- **Hooks (ViewModel)**: State management, business logic, API calls, side effects
- **Types**: Type definitions, interfaces
- **Utils**: Pure functions, helpers (nếu cần)

## Coding Standards

### Arrow Functions - Bắt buộc cho Components và Functions

**Rule:** Tất cả React components và functions phải được viết dưới dạng arrow function để tránh lỗi `this` binding.

**Lý do:**

- Arrow functions không có `this` binding riêng, giữ nguyên `this` từ lexical scope
- Tránh lỗi `this is undefined` trong React components
- Consistent code style trong toàn bộ project
- Dễ dàng sử dụng trong callbacks và event handlers

**Áp dụng cho:**

- React components (functional components)
- Next.js App Router components (`layout.tsx`, `page.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`)
- Server components và Client components (`'use client'`)
- Custom hooks
- Utility functions
- Event handlers
- Callback functions

**Ví dụ:**

```typescript
// ❌ BAD - Function declaration
export default function HomePage() {
  return <div>Home</div>;
}

function handleClick() {
  console.log('clicked');
}

export function Component() {
  return <button onClick={handleClick}>Click</button>;
}

// ✅ GOOD - Arrow function
export const HomePage = () => {
  return <div>Home</div>;
};

const handleClick = () => {
  console.log('clicked');
};

export const Component = () => {
  return <button onClick={handleClick}>Click</button>;
};
```

**Next.js App Router – export default với arrow function:**

Next.js yêu cầu `export default` cho `layout`, `page`, `error`, `loading`, `not-found`. Dùng arrow function rồi export default riêng:

```typescript
// src/app/layout.tsx
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);
export default RootLayout;

// src/app/page.tsx
const HomePage = () => <main>{/* ... */}</main>;
export default HomePage;

// src/app/loading.tsx
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">Loading...</div>
);
export default Loading;

// src/app/not-found.tsx
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1>404</h1>
    <Link href="/">Go Back Home</Link>
  </div>
);
export default NotFound;

// src/app/error.tsx ('use client')
const Error = ({ error, reset }: { error: Error; reset: () => void }) => (
  <div className="min-h-screen flex items-center justify-center">
    <p>{error.message}</p>
    <button onClick={reset}>Try again</button>
  </div>
);
export default Error;
```

**Ngoại lệ:**

- Class components (nếu có) vẫn sử dụng class syntax
- Use Cases (classes) giữ nguyên class syntax
- Repository classes giữ nguyên class syntax

## Domain Entities Analysis

### 1. Experience Entity

**Mục đích:** Đại diện cho work experience trong CV

**Cấu trúc:**

```typescript
// src/core/entities/Experience.ts
export interface Experience {
  id: string;                          // Unique identifier
  company: string;                     // Company name
  role: string;                         // Job title/role
  period: {
    start: string;                      // Start date (format: "YYYY-MM" hoặc "YYYY")
    end: string | 'Present';            // End date hoặc "Present"
  };
  achievements: string[];              // List of achievements/responsibilities
  technologies?: string[];              // Technologies used (optional)
  location?: string;                     // Location (optional)
  description?: string;                 // Additional description (optional)
}
```

**Dữ liệu từ CV:**

- Freelancer (2020 - Now)
- Nitro Tech Asia Inc - Hue Branch (7/2022 - 11/2024)
- Huesoft Corp (2020 - 7/2022)

**Business Rules:**

- Sort by end date (Present jobs first, then latest first)
- Format period: "2020 - Present" hoặc "7/2022 - 11/2024"

### 2. Project Entity

**Mục đích:** Đại diện cho các projects trong portfolio

**Cấu trúc:**

```typescript
// src/core/entities/Project.ts
export interface ProjectImage {
  url: string;                          // Image URL
  alt?: string;                          // Alt text for accessibility
  caption?: string;                     // Image caption (optional)
  order?: number;                        // Display order
}

export interface Project {
  id: string;                          // Unique identifier
  title: string;                        // Project name
  description: string;                  // Short description
  longDescription?: string;             // Detailed description
  technologies: string[];               // Tech stack
  thumbnailUrl?: string;                // Main thumbnail image (for cards/list)
  images?: ProjectImage[];              // Multiple project images (gallery)
  githubUrl?: string;                   // GitHub repository link
  demoUrl?: string;                     // Live demo link
  achievements?: string[];              // Key achievements/results
  metrics?: {                           // Performance metrics
    label: string;                      // Metric name (e.g., "Speed Improvement")
    value: string;                      // Metric value (e.g., "6x faster")
  }[];
  category?: string;                    // Project category (optional)
  featured?: boolean;                   // Featured project flag
  startDate?: string;                   // Project start date
  endDate?: string;                     // Project end date
}
```

**Dữ liệu từ CV:**

- Before - After (AR/Image Processing)
- Smart Lock System
- AI Translation Bot (Chatwork Integration)
- Audio Social Network
- My DEHA (Internal App)

**Business Rules:**

- Featured projects hiển thị trước
- Sort by date hoặc relevance
- Group by category (nếu có)

### 3. Skill Entity

**Mục đích:** Đại diện cho technical skills

**Cấu trúc:**

```typescript
// src/core/entities/Skill.ts
export interface Skill {
  id: string;                          // Unique identifier
  name: string;                        // Skill name (e.g., "Flutter", "Swift")
  icon?: string;                        // Icon URL hoặc icon name
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  categoryId: string;                  // Reference to SkillCategory
  yearsOfExperience?: number;          // Years of experience (optional)
  description?: string;                // Additional description (optional)
}

// core/entities/SkillCategory.ts
export interface SkillCategory {
  id: string;                          // Unique identifier
  name: string;                        // Category name
  icon?: string;                        // Category icon
  skills: Skill[];                      // Skills in this category
  order?: number;                       // Display order
}
```

**Categories từ CV:**

- Mobile: Flutter, Dart, BLoC/RiverPod, Method Channel, DevTools, iOS, Swift, SwiftUI, React Native
- Native: ARKit, Vision Framework, Xcode Instruments
- Web: React.js, Node.js, JavaScript/TypeScript
- Database: MySQL, SQL Server, PostgreSQL, MongoDB
- DevOps: Docker, AWS (IAM, Route53, EC2, ELB, RDS, S3), CI/CD

**Business Rules:**

- Group skills by category
- Sort by proficiency hoặc alphabetically
- Display với icons (nếu có)

### 4. BlogPost Entity

**Mục đích:** Đại diện cho blog posts

**Cấu trúc:**

```typescript
// src/core/entities/BlogPost.ts
export interface BlogPost {
  id: string;                          // Unique identifier (slug)
  title: string;                       // Post title
  excerpt: string;                     // Short excerpt for preview
  content: string;                     // Full content (MDX)
  publishedAt: string;                  // Publication date (ISO format)
  updatedAt?: string;                  // Last update date (optional)
  author: string;                      // Author name
  tags: string[];                      // Tags for categorization
  category?: string;                   // Post category (optional)
  imageUrl?: string;                    // Featured image
  readingTime?: number;                 // Estimated reading time in minutes
  views?: number;                       // View count (optional)
  featured?: boolean;                   // Featured post flag
}
```

**Business Rules:**

- Sort by publishedAt (latest first)
- Filter by category/tags
- Calculate reading time từ content length

### 5. PersonalInfo Entity

**Mục đích:** Đại diện cho personal information (Hero/About section)

**Cấu trúc:**

```typescript
// src/core/entities/PersonalInfo.ts
export interface PersonalInfo {
  id: string;                          // Unique identifier
  name: string;                        // Full name
  title: string;                       // Job title
  description: string;                 // Professional summary
  highlights: string[];                // Key highlights/achievements
  avatarUrl?: string;                  // Profile picture URL
  resumeUrl?: string;                  // CV/Resume download link
  contact: {
    email: string;
    phone: string;
    github?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
  location?: string;                    // Location (optional)
  yearsOfExperience?: number;          // Total years of experience
}
```

**Dữ liệu từ CV:**

- Name: Nguyen Dang Quang
- Title: Mobile Engineer
- Email: quangnd22398.dev@gmail.com
- Phone: (+84) 34 781 1798
- GitHub: github.com/quangnd2203
- Website: quangit.dev
- Description: "As a mobile engineer with 5+ years of experience..."

**Business Rules:**

- Format contact links
- Calculate years of experience từ experiences

### 6. ContactMessage Entity

**Mục đích:** Đại diện cho contact form submission

**Cấu trúc:**

```typescript
// src/core/entities/ContactMessage.ts
export interface ContactMessage {
  id?: string;                         // Unique identifier (generated on server)
  name: string;                         // Sender name
  email: string;                        // Sender email
  subject: string;                      // Message subject
  message: string;                      // Message content
  createdAt?: string;                   // Submission timestamp
  status?: 'pending' | 'sent' | 'failed'; // Message status
}
```

**Business Rules:**

- Validate email format
- Validate message length (min 10 characters)
- Rate limiting (1 message per hour per email)
- Format email content for sending

## Entity Relationships

```
PersonalInfo (1)
    ↓
Experience (many) - Work history
Project (many) - Portfolio projects
Skill (many) - Technical skills
    ↓
SkillCategory (many) - Groups skills
BlogPost (many) - Blog posts
ContactMessage (many) - Contact form submissions
```

**Mối quan hệ:**

- **PersonalInfo** là root entity, chứa thông tin cá nhân
- **Experience**, **Project**, **Skill** là collections liên quan đến personal info
- **Skill** thuộc về **SkillCategory**
- **BlogPost** và **ContactMessage** là independent entities

## Use Cases - Vai trò trong Clean Architecture

### Use Cases (`src/core/use-cases/`) - Business Logic Orchestration

**Use Cases đóng vai trò gì?**

- **Business Logic Orchestration**: Điều phối các business rules và operations
- **Single Responsibility**: Mỗi use case thực hiện một business action cụ thể
- **Framework-agnostic**: Không phụ thuộc UI framework, có thể dùng ở bất kỳ đâu
- **Testable**: Dễ test độc lập, không cần UI

**Use Cases làm gì:**

- **Orchestrate** business logic flow
- **Validate** business rules
- **Coordinate** giữa repositories và entities
- **Transform** data theo business rules
- **Handle** business errors

**Ví dụ Use Case:**

```typescript
// src/core/use-cases/GetExperiences.ts
import { IExperienceRepository } from '../interfaces/IExperienceRepository';
import { Experience } from '../entities/Experience';

export class GetExperiences {
  constructor(
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(): Promise<Experience[]> {
    // 1. Fetch data từ repository
    const rawData = await this.experienceRepository.getAll();
    
    // 2. Business logic: Sort by date (Present jobs first, then latest first)
    const sorted = rawData.sort((a, b) => {
      if (a.period.end === 'Present' && b.period.end !== 'Present') return -1;
      if (a.period.end !== 'Present' && b.period.end === 'Present') return 1;
      
      const aEnd = a.period.end === 'Present' ? new Date() : new Date(a.period.end);
      const bEnd = b.period.end === 'Present' ? new Date() : new Date(b.period.end);
      return bEnd.getTime() - aEnd.getTime();
    });
    
    // 3. Business logic: Format period
    return sorted.map(exp => ({
      ...exp,
      periodFormatted: `${exp.period.start} - ${exp.period.end}`
    }));
  }
}
```

## Hooks (ViewModel) - Vai trò và Sử dụng

### Hooks (`hooks/`) - ViewModel Pattern trong React

**Hooks đóng vai trò như ViewModel trong MVVM pattern:**

- **State Management**: Quản lý UI state (useState, useReducer)
- **Business Logic**: Xử lý data transformation, validation, calculations
- **API Calls**: Gọi repositories/APIs để fetch data
- **Side Effects**: Xử lý useEffect, subscriptions
- **Presentation Logic**: Chuẩn bị data cho UI

**Vai trò:**

- Kết nối **React components** với **Use Cases**
- Quản lý **UI state** (loading, error, data)
- Gọi **Use Cases** để thực hiện business logic
- Xử lý **side effects** (useEffect)
- Tích hợp với **external libraries** (Framer Motion, etc.)
- **React-specific** - chỉ dùng trong React components

**Khi nào dùng Hooks:**

- Component state management
- Gọi Use Cases để thực hiện business logic
- Side effects (subscriptions, animations)
- Form state và validation (UI level)
- Event handlers
- React lifecycle management

### Mối quan hệ: Component → Hook (ViewModel) → Use Case → Repository

```
Component (UI - React)
    ↓ uses
Hook (ViewModel - UI State, Presentation Logic)
    ↓ calls
Use Case (Business Logic Orchestration)
    ↓ uses
Repository Interface (Port)
    ↓ implemented by
Repository (Data Access - Infrastructure)
```

**Flow chi tiết:**

1. **Component** (React) gọi **Hook** để lấy state và handlers
2. **Hook** (ViewModel) gọi **Use Case** để thực hiện business logic
3. **Use Case** sử dụng **Repository Interface** để fetch data
4. **Repository** (Infrastructure) implement interface và fetch data
5. Data được process qua Use Case, trả về Hook
6. Hook update React state, Component re-render

**Ví dụ thực tế với Use Case:**

```typescript
// src/core/use-cases/GetExperiences.ts
import { IExperienceRepository } from '../interfaces/IExperienceRepository';
import { Experience } from '../entities/Experience';

export class GetExperiences {
  constructor(
    private experienceRepository: IExperienceRepository
  ) {}

  async execute(): Promise<Experience[]> {
    const rawData = await this.experienceRepository.getAll();
    
    // Business logic: Sort by date (Present jobs first, then latest first)
    const sorted = rawData.sort((a, b) => {
      if (a.period.end === 'Present' && b.period.end !== 'Present') return -1;
      if (a.period.end !== 'Present' && b.period.end === 'Present') return 1;
      
      const aEnd = a.period.end === 'Present' ? new Date() : new Date(a.period.end);
      const bEnd = b.period.end === 'Present' ? new Date() : new Date(b.period.end);
      return bEnd.getTime() - aEnd.getTime();
    });
    
    return sorted.map(exp => ({
      ...exp,
      periodFormatted: `${exp.period.start} - ${exp.period.end}`
    }));
  }
}
```

```typescript
// src/features/experience/hooks/useExperiences.ts
import { useState, useEffect } from 'react';
import { GetExperiences } from '@/core/use-cases/GetExperiences';
import { experienceRepository } from '@/infrastructure/repositories/ExperienceRepository';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadExperiences = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // ViewModel gọi Use Case
        const getExperiences = new GetExperiences(experienceRepository);
        const data = await getExperiences.execute();
        
        // Update UI state
        setExperiences(data);
      } catch (err) {
        setError('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };
    
    loadExperiences();
  }, []);
  
  return { experiences, loading, error };
};

// Component sử dụng Hook
const ExperienceSection = () => {
  const { experiences, loading, error } = useExperiences();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render UI */}</div>;
};
```

**Tại sao dùng Use Cases?**

✅ **Separation of Concerns**: Business logic tách biệt khỏi UI logic
✅ **Reusability**: Use Case có thể dùng ở nhiều nơi (Web, Mobile, CLI)
✅ **Testability**: Test business logic không cần React
✅ **Maintainability**: Dễ maintain và refactor business rules
✅ **Single Responsibility**: Mỗi use case làm một việc cụ thể

**So sánh Use Case vs Hook (ViewModel):**

| Aspect | Use Case | Hook (ViewModel) |
|--------|----------|------------------|
| **Vai trò** | Business logic orchestration | UI state + Presentation logic |
| **Framework** | Framework-agnostic | React-specific |
| **State** | ❌ Không quản lý state | ✅ Quản lý UI state |
| **Dùng ở đâu** | Frontend, Backend, CLI | Chỉ React components |
| **Test** | Test độc lập | Test với React Testing Library |

## Design System (Light Theme Only)

### Colors

- Primary: Professional blue/navy (#1e40af, #3b82f6)
- Accent: Tech-friendly green/cyan (#10b981, #06b6d4)
- Background: White (#ffffff)
- Surface: Light gray (#f9fafb, #f3f4f6)
- Text: Dark gray/black (#111827, #1f2937)
- Border: Light gray (#e5e7eb)

### Typography

- Headings: Inter hoặc Poppins (Modern sans-serif)
- Body: Inter (Readable sans-serif)
- Code: JetBrains Mono hoặc Fira Code (Monospace)

### Spacing & Layout

- Container max-width: 1280px
- Section padding: py-16 hoặc py-24
- Grid gaps: gap-6, gap-8

### Animations

- Fade-in on scroll (Framer Motion)
- Smooth page transitions
- Hover effects on interactive elements
- Stagger animations for lists

## Technical Features

- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Performance**: Image optimization, code splitting
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsive**: Mobile-first design
- **Analytics Ready**: Google Analytics integration point

## Data Structure

**Lưu ý:** Data structures trong `src/shared/data/` folder sẽ map trực tiếp với Domain Entities trong `src/core/entities/`. Các entities đã được phân tích chi tiết ở phần trên.

### Experience Data (`src/shared/data/experiences.ts`)

Sử dụng `Experience` entity từ `src/core/entities/Experience.ts`:

```typescript
import { Experience } from '@/core/entities/Experience';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Freelancer',
    role: 'Team Lead / Mobile Engineer',
    period: { start: '2020', end: 'Present' },
    achievements: [
      'Developed Web and Mobile applications',
      'Served as Team Lead for multiple mobile projects for Japanese and Vietnamese clients',
      'Managed project timelines and perform code reviews to ensure product quality'
    ],
    technologies: ['Flutter', 'iOS', 'React Native', 'React.js']
  },
  // ... more experiences
];
```

### Projects Data (`src/shared/data/projects.ts`)

Sử dụng `Project` entity từ `src/core/entities/Project.ts`:

```typescript
import { Project } from '@/core/entities/Project';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Before - After',
    description: 'AR/Image Processing application with background removal',
    longDescription: 'Architected the application using Clean Architecture and BLoC pattern...',
    technologies: ['Flutter', 'iOS', 'Swift', 'Method Channel', 'ARKit', 'Vision Framework', 'MediaPipe', 'ONNX'],
    thumbnailUrl: '/images/projects/before-after/thumbnail.jpg', // Main thumbnail
    images: [
      {
        url: '/images/projects/before-after/screenshot-1.jpg',
        alt: 'Before - After app main screen',
        caption: 'Main screen with AR background removal',
        order: 1
      },
      {
        url: '/images/projects/before-after/screenshot-2.jpg',
        alt: 'Image processing result',
        caption: 'Real-time image processing with optimized performance',
        order: 2
      },
      {
        url: '/images/projects/before-after/screenshot-3.jpg',
        alt: 'Performance metrics',
        caption: '6x speed improvement achieved',
        order: 3
      }
    ],
    achievements: [
      'Reduced background removal latency from 3s to 0.5s (6x speed improvement)',
      'Optimized real-time camera processing, reducing lag by 40%',
      'Achieved 0% crash rate'
    ],
    metrics: [
      { label: 'Speed Improvement', value: '6x faster' },
      { label: 'Lag Reduction', value: '40%' },
      { label: 'Crash Rate', value: '0%' }
    ],
    featured: true
  },
  // ... more projects
];
```

### Skills Data (`src/shared/data/skills.ts`)

Sử dụng `Skill` và `SkillCategory` entities:

```typescript
import { SkillCategory } from '@/core/entities/SkillCategory';

export const skillCategories: SkillCategory[] = [
  {
    id: 'mobile',
    name: 'Mobile',
    icon: 'mobile',
    order: 1,
    skills: [
      { id: 'flutter', name: 'Flutter', categoryId: 'mobile', proficiency: 'expert' },
      { id: 'dart', name: 'Dart', categoryId: 'mobile', proficiency: 'expert' },
      { id: 'ios', name: 'iOS', categoryId: 'mobile', proficiency: 'advanced' },
      { id: 'swift', name: 'Swift', categoryId: 'mobile', proficiency: 'advanced' },
      // ... more skills
    ]
  },
  // ... more categories
];
```

### Personal Info Data (`src/shared/data/personalInfo.ts`)

Sử dụng `PersonalInfo` entity:

```typescript
import { PersonalInfo } from '@/core/entities/PersonalInfo';

export const personalInfo: PersonalInfo = {
  id: 'personal-1',
  name: 'Nguyen Dang Quang',
  title: 'Mobile Engineer',
  description: 'As a mobile engineer with 5+ years of experience...',
  highlights: [
    '5+ years of experience',
    'Team Lead for Japanese market projects',
    'Flutter and iOS specialist',
    'Strong Declarative UI mindset'
  ],
  contact: {
    email: 'quangnd22398.dev@gmail.com',
    phone: '(+84) 34 781 1798',
    github: 'github.com/quangnd2203',
    website: 'quangit.dev'
  },
  yearsOfExperience: 5
};
```

### Blog Posts Data (`src/shared/data/blogPosts.ts`)

Sử dụng `BlogPost` entity. Blog posts có thể lưu dưới dạng MDX files hoặc TypeScript data:

```typescript
// src/shared/data/blogPosts.ts
import { BlogPost } from '@/core/entities/BlogPost';

export const metadata: Omit<BlogPost, 'content'> = {
  id: 'my-first-post',
  title: 'My First Blog Post',
  excerpt: 'This is a sample blog post...',
  publishedAt: '2024-01-15',
  author: 'Nguyen Dang Quang',
  tags: ['react', 'nextjs'],
  category: 'Web Development'
};

// Content in MDX format
export default function Post() {
  return (
    // MDX content
  );
}
```

## Implementation Flow

### 1. Setup Phase

- Initialize Next.js project với TypeScript
- Setup Tailwind CSS
- Create folder structure theo Clean Architecture
- Install dependencies (Framer Motion, etc.)

### 2. Core Layer

**2.1. Define Domain Entities:**

- `src/core/entities/Experience.ts` - Work experience entity
- `src/core/entities/Project.ts` - Project entity
- `src/core/entities/Skill.ts` - Skill entity
- `src/core/entities/SkillCategory.ts` - Skill category entity
- `src/core/entities/BlogPost.ts` - Blog post entity
- `src/core/entities/PersonalInfo.ts` - Personal information entity
- `src/core/entities/ContactMessage.ts` - Contact message entity

**2.2. Define Use Cases:**

- `src/core/use-cases/GetExperiences.ts` - Fetch and process experiences
- `src/core/use-cases/GetProjects.ts` - Fetch and process projects
- `src/core/use-cases/GetSkills.ts` - Fetch and group skills by category
- `src/core/use-cases/GetPersonalInfo.ts` - Fetch personal information
- `src/core/use-cases/GetBlogPosts.ts` - Fetch blog posts
- `src/core/use-cases/SendContactMessage.ts` - Send contact form message

**2.3. Define Repository Interfaces (Ports):**

- `src/core/interfaces/IExperienceRepository.ts` - Experience data access interface
- `src/core/interfaces/IProjectRepository.ts` - Project data access interface
- `src/core/interfaces/ISkillRepository.ts` - Skill data access interface
- `src/core/interfaces/IPersonalInfoRepository.ts` - Personal info data access interface
- `src/core/interfaces/IBlogPostRepository.ts` - Blog post data access interface
- `src/core/interfaces/IContactRepository.ts` - Contact message repository interface

### 3. Infrastructure Layer

- Implement repositories trong `src/infrastructure/repositories/` với static data
- Setup email service trong `src/infrastructure/services/` (nếu cần)

### 4. Shared Layer

- Create base UI components trong `src/shared/components/ui/` (Button, Card, Input, etc.)
- Create layout components trong `src/shared/components/layout/` (Header, Footer, Navigation)
- Create shared hooks trong `src/shared/hooks/` và utilities trong `src/shared/utils/`
- Create mock data trong `src/shared/data/` (experiences, projects, skills, personalInfo, blogPosts)

### 5. Feature Modules (Implement từng module)

- Hero module: Hook gọi Use Case → Repository
- About module: Hook gọi Use Case → Repository
- Experience module: Hook gọi GetExperiences Use Case
- Skills module: Hook gọi GetSkills Use Case
- Projects module: Hook gọi GetProjects Use Case
- Contact module: Hook gọi SendContactMessage Use Case
- Blog module: Hook gọi GetBlogPosts Use Case

### 6. Presentation Layer

- Create src/app layout với Header/Footer
- Create src/app/home page - compose các feature sections
- Create src/app/blog routes (nếu có)

### 7. Styling & Polish

- Apply Tailwind CSS styling
- Add animations với Framer Motion
- Responsive design
- SEO optimization

## Module Communication Pattern

```
src/app/page.tsx (Presentation Layer)
    ↓ imports
src/features/hero/index.ts (Public API)
    ↓ uses
src/features/hero/components/HeroSection.tsx
    ↓ uses
src/features/hero/hooks/useHeroAnimation.ts (ViewModel)
    ↓ calls
src/core/use-cases/GetHeroData.ts (Use Case)
    ↓ uses
src/core/interfaces/IHeroRepository.ts (Port)
    ↓ implemented by
src/infrastructure/repositories/HeroRepository.ts (Adapter)
    ↓ uses
src/shared/components/ui/Button.tsx
    ↓ uses
src/core/entities/Hero.ts (if needed)
```

**Ví dụ cụ thể:**

```typescript
// 1. Component
const HeroSection = () => {
  const { heroData, loading } = useHero(); // Hook (ViewModel)
  return <div>{/* Render */}</div>;
};

// 2. Hook (ViewModel)
const useHero = () => {
  const [heroData, setHeroData] = useState(null);
  
  useEffect(() => {
    // Gọi Use Case
    const getHeroData = new GetHeroData(heroRepository);
    const data = await getHeroData.execute();
    setHeroData(data);
  }, []);
  
  return { heroData };
};

// 3. Use Case
class GetHeroData {
  constructor(private repository: IHeroRepository) {}
  async execute() {
    return await this.repository.getHero();
  }
}

// 4. Repository (Infrastructure)
class HeroRepository implements IHeroRepository {
  async getHero() {
    // Fetch từ API hoặc static data
  }
}
```

## Benefits of This Architecture

1. **Modularity**: Mỗi feature độc lập, dễ maintain
2. **Scalability**: Dễ thêm features mới
3. **Testability**: Dễ test từng module riêng biệt
4. **Reusability**: Shared components có thể tái sử dụng
5. **Separation of Concerns**: Business logic tách biệt khỏi UI
6. **Type Safety**: TypeScript interfaces đảm bảo type safety

import { Project } from '@/core/entities';

export const mockProjects: Project[] = [
    {
        id: 'project-1',
        title: 'Before - After',
        description: 'AR/Image Processing application with background removal',
        longDescription:
            'Architected the application using Clean Architecture and BLoC pattern, ensuring high scalability and maintainable code for future feature expansions. Engineered high-performance Native Modules to process AR and image data.',
        technologies: [
            'Flutter',
            'iOS',
            'Swift',
            'Method Channel',
            'ARKit',
            'Vision Framework',
            'MediaPipe',
            'ONNX',
        ],
        thumbnailUrl: '/images/projects/before-after/thumbnail.jpg',
        achievements: [
            'Reduced background removal latency from 3s to 0.5s (6x speed improvement)',
            'Optimized real-time camera processing, reducing lag by 40%',
            'Achieved 0% crash rate',
        ],
        featured: true,
    },
    {
        id: 'project-2',
        title: 'Smart Lock System',
        description: 'Secure data synchronization system with Flutter and React',
        longDescription:
            'Led the development team throughout the full SDLC (Software Development Life Cycle), overseeing task delegation, code reviews, and project timelines to ensure high-quality delivery. Architected the secure data synchronization pipeline and acted as a Technical Consultant for Japanese BrSEs to refine Backend business logic and system integrity.',
        technologies: ['Flutter', 'React'],
        thumbnailUrl: '/images/projects/smart-lock/thumbnail.jpg',
        achievements: [
            'Delivered the project 2 weeks ahead of schedule',
            'High praise for professional workflow',
            'Proactively proposed architectural solutions and optimized data flows',
        ],
        featured: true,
    },
    {
        id: 'project-3',
        title: 'AI Translation Bot (Chatwork Integration)',
        description: 'Real-time translation system for Vietnamese-Japanese communication',
        longDescription:
            'Designed the system architecture and backend logic to facilitate seamless real-time communication between Vietnamese teams and Japanese BrSEs for 100+ internal users. Orchestrated complex data flows between Chatwork APIs and AI services, ensuring high translation accuracy and low latency.',
        technologies: ['Express.js', 'Docker', 'AWS', 'Chatwork API', 'OpenAI/AI Services'],
        thumbnailUrl: '/images/projects/ai-translation/thumbnail.jpg',
        achievements: [
            'Facilitated communication for 100+ internal users',
            'High translation accuracy and low latency',
            'Dockerized and deployed on AWS infrastructure with high availability',
        ],
        featured: true,
    },
    {
        id: 'project-4',
        title: 'Audio Social Network',
        description: 'Social network platform with audio features and real-time messaging',
        longDescription:
            'Implemented a secure Authentication and User Management system (OAuth), integrating multi-provider login via Facebook, Google, and Phone. Engineered the core data logic for Newsfeed and Real-time Messaging modules, ensuring low latency and high data consistency for a smooth user experience.',
        technologies: ['Flutter', 'WebRTC', 'Firebase'],
        thumbnailUrl: '/images/projects/audio-social/thumbnail.jpg',
        achievements: [
            'Multi-provider OAuth authentication',
            'Real-time messaging with low latency',
            'High data consistency for smooth user experience',
        ],
    },
    {
        id: 'project-5',
        title: 'My DEHA (Internal App)',
        description: 'Attendance tracking system based on iBeacon and BLE proximity detection',
        longDescription:
            'Developed an attendance tracking system based on iBeacon and BLE proximity detection. Solved complex technical challenges regarding signal latency and distance calculation to ensure high accuracy and stability for real-time Check-in/Check-out operations.',
        technologies: ['React Native', 'iBeacon', 'BLE'],
        thumbnailUrl: '/images/projects/my-deha/thumbnail.jpg',
        achievements: [
            'High accuracy attendance tracking',
            'Solved signal latency challenges',
            'Stable real-time Check-in/Check-out operations',
        ],
    },
];

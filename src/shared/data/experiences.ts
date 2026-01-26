import { Experience } from '@/core/entities';

export const mockExperiences: Experience[] = [
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
    technologies: ['Flutter', 'iOS', 'Android', 'React Native', 'React.js']
  },
  {
    id: 'exp-2',
    company: 'Nitro Tech Asia Inc - Hue Branch',
    role: 'Flutter Team Lead',
    period: { start: '2022-07', end: '2024-11' },
    achievements: [
      'Led the Flutter team and collaborated directly with Japanese BrSEs to analyze requirements and deliver technical solutions',
      'Oversaw technical management, defined project architecture, and maintained company products',
      'Led the AI Translation Bot project: System design and executed the deployment on AWS infrastructure'
    ],
    technologies: ['Flutter', 'Dart', 'iOS', 'Android', 'AWS', 'Docker', 'Node.js', 'Express.js'],
    location: 'Hue, Vietnam'
  },
  {
    id: 'exp-3',
    company: 'Huesoft Corp',
    role: 'Mobile Developer',
    period: { start: '2020', end: '2022-07' },
    achievements: [
      'Developed mobile applications using Flutter'
    ],
    technologies: ['Flutter', 'Dart', 'iOS', 'Android']
  }
];

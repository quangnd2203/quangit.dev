import { SkillCategory } from '@/core/entities';

export const mockSkillCategories: SkillCategory[] = [
  {
    id: 'mobile',
    name: 'Mobile',
    icon: 'mobile',
    order: 1,
    skills: [
      { id: 'flutter', name: 'Flutter', categoryId: 'mobile', proficiency: 'expert', priority: 1 },
      { id: 'dart', name: 'Dart', categoryId: 'mobile', proficiency: 'expert', priority: 2 },
      { id: 'flavor', name: 'Flavor', categoryId: 'mobile', proficiency: 'advanced', priority: 3 },
      { id: 'ios', name: 'iOS', categoryId: 'mobile', proficiency: 'advanced', priority: 4 },
      { id: 'android', name: 'Android', categoryId: 'mobile', proficiency: 'advanced', priority: 5 },
      { id: 'bloc', name: 'BLoC/RiverPod', categoryId: 'mobile', proficiency: 'advanced', priority: 6 },
      { id: 'method-channel', name: 'Method Channel', categoryId: 'mobile', proficiency: 'advanced', priority: 7 },
      { id: 'devtools', name: 'DevTools', categoryId: 'mobile', proficiency: 'advanced', priority: 8 },
      { id: 'react-native', name: 'React Native', categoryId: 'mobile', proficiency: 'intermediate', priority: 9 }
    ]
  },
  {
    id: 'native',
    name: 'Native',
    icon: 'native',
    order: 2,
    skills: [
      { id: 'swift', name: 'Swift', categoryId: 'native', proficiency: 'advanced', priority: 1 },
      { id: 'swiftui', name: 'SwiftUI', categoryId: 'native', proficiency: 'advanced', priority: 2 },
      { id: 'arkit', name: 'ARKit', categoryId: 'native', proficiency: 'advanced', priority: 3 },
      { id: 'vision-framework', name: 'Vision Framework', categoryId: 'native', proficiency: 'advanced', priority: 4 },
      { id: 'xcode-instruments', name: 'Xcode Instruments', categoryId: 'native', proficiency: 'advanced', priority: 5 },
      { id: 'kotlin', name: 'Kotlin', categoryId: 'native', proficiency: 'intermediate', priority: 6 },
    ]
  },
  {
    id: 'web',
    name: 'Web',
    icon: 'web',
    order: 3,
    skills: [
      { id: 'react', name: 'React.js', categoryId: 'web', proficiency: 'advanced', priority: 1 },
      { id: 'typescript', name: 'TypeScript', categoryId: 'web', proficiency: 'advanced', priority: 2 },
      { id: 'javascript', name: 'JavaScript', categoryId: 'web', proficiency: 'advanced', priority: 3 },
      { id: 'nodejs', name: 'Node.js', categoryId: 'web', proficiency: 'intermediate', priority: 1 }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    icon: 'database',
    order: 4,
    skills: [
      { id: 'mysql', name: 'MySQL', categoryId: 'database', proficiency: 'intermediate', priority: 1 },
      { id: 'postgresql', name: 'PostgreSQL', categoryId: 'database', proficiency: 'intermediate', priority: 2 },
      { id: 'mongodb', name: 'MongoDB', categoryId: 'database', proficiency: 'intermediate', priority: 3 },
      { id: 'sql-server', name: 'SQL Server', categoryId: 'database', proficiency: 'intermediate', priority: 4 }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: 'devops',
    order: 5,
    skills: [
      { id: 'docker', name: 'Docker', categoryId: 'devops', proficiency: 'intermediate', priority: 1 },
      { id: 'aws', name: 'AWS', categoryId: 'devops', proficiency: 'intermediate', priority: 2 },
      { id: 'cicd', name: 'CI/CD', categoryId: 'devops', proficiency: 'intermediate', priority: 3 }
    ]
  }
];

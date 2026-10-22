import { LibraryTestCard } from '../types';

export const mockLibraryCards: LibraryTestCard[] = [
  // 5 REAL READING TESTS
  {
    id: 'lib_r1',
    title: '[COM] The Development of Modern Telegraphy',
    testMode: 'reading',
    passageOrPartNumber: 1,
    badgeText: 'Passage 1',
    isPro: false,
    attemptsCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    category: 'Reading Practices',
    targetId: 1,
    topic: 'Technology & Innovation'
  },
  {
    id: 'lib_r2',
    title: '[COM] Images and Places - Visual Geography & Perception',
    testMode: 'reading',
    passageOrPartNumber: 2,
    badgeText: 'Passage 2',
    isPro: true,
    attemptsCount: 761,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    category: 'Reading Practices',
    targetId: 2,
    topic: 'Geography & Psychology'
  },
  {
    id: 'lib_r3',
    title: '[COM] When people are \'deaf\' to music (Amusia Syndrome)',
    testMode: 'reading',
    passageOrPartNumber: 3,
    badgeText: 'Passage 3',
    isPro: true,
    attemptsCount: 890,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    category: 'Reading Practices',
    targetId: 3,
    topic: 'Culture & Neuroscience'
  },
  {
    id: 'lib_r4',
    title: '[COM] Roman Aqueducts: Engineering Marvels of Antiquity',
    testMode: 'reading',
    passageOrPartNumber: 4,
    badgeText: 'Passage 4',
    isPro: false,
    attemptsCount: 1105,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80',
    category: 'Reading Practices',
    targetId: 4,
    topic: 'History & Engineering'
  },
  {
    id: 'lib_r5',
    title: '[COM] Artificial Intelligence in Wildlife Conservation',
    testMode: 'reading',
    passageOrPartNumber: 5,
    badgeText: 'Passage 5',
    isPro: true,
    attemptsCount: 950,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    category: 'Reading Practices',
    targetId: 5,
    topic: 'Environment & Nature'
  },

  // 5 REAL LISTENING TESTS
  {
    id: 'lib_l1',
    title: '[COM] Travel Agency Consultation & Mountain Tours',
    testMode: 'listening',
    passageOrPartNumber: 1,
    badgeText: 'Part 1',
    isPro: false,
    attemptsCount: 1120,
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
    category: 'Listening Practices',
    targetId: 1,
    topic: 'Travel & Tourism'
  },
  {
    id: 'lib_l2',
    title: '[COM] Community Recreation Center Orientation',
    testMode: 'listening',
    passageOrPartNumber: 2,
    badgeText: 'Part 2',
    isPro: true,
    attemptsCount: 945,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    category: 'Listening Practices',
    targetId: 2,
    topic: 'Community & Society'
  },
  {
    id: 'lib_l3',
    title: '[COM] University Research Project Discussion',
    testMode: 'listening',
    passageOrPartNumber: 3,
    badgeText: 'Part 3',
    isPro: true,
    attemptsCount: 680,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    category: 'Listening Practices',
    targetId: 3,
    topic: 'Education & Research'
  },
  {
    id: 'lib_l4',
    title: '[COM] Lecture on Deep Sea Bioluminescence',
    testMode: 'listening',
    passageOrPartNumber: 4,
    badgeText: 'Part 4',
    isPro: true,
    attemptsCount: 1050,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    category: 'Listening Practices',
    targetId: 4,
    topic: 'Science & Biology'
  },
  {
    id: 'lib_l5',
    title: '[COM] Environmental Science Seminar on Renewable Microgrids',
    testMode: 'listening',
    passageOrPartNumber: 5,
    badgeText: 'Part 5',
    isPro: true,
    attemptsCount: 812,
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&auto=format&fit=crop&q=80',
    category: 'Listening Practices',
    targetId: 5,
    topic: 'Environment & Nature'
  }
];

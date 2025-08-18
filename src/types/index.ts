// Color related types
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab';

export interface ColorVariation {
  type: string;
  label: string;
  color: string;
}

// Gradient related types
export interface GradientStop {
  color: string;
  position: number;
  id: string;
}

export type GradientType = 'linear' | 'radial';

export interface GradientConfig {
  type: GradientType;
  angle: number;
  stops: GradientStop[];
}

// Contrast checker types
export interface ContrastResult {
  ratio: number;
  normalText: {
    level: string;
    stars: number;
    label: string;
  };
  largeText: {
    level: string;
    stars: number;
    label: string;
  };
}

// Export related types
export interface ExportOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

// Navigation types
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// Palette types
export interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  createdAt: string;
  likes: number;
}

// Mock trending palettes for demo
export const TRENDING_PALETTES: SavedPalette[] = [
  {
    id: '1',
    name: 'Summer Vibes',
    colors: ['#FF9671', '#FFC75F', '#F9F871', '#00C9A7', '#845EC2'],
    createdAt: '2025-05-25',
    likes: 16529
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    colors: ['#0081CF', '#00AFEF', '#4CC9F0', '#97D8C4', '#B8E0D4'],
    createdAt: '2025-05-24',
    likes: 12483
  },
  {
    id: '3',
    name: 'Autumn Leaves',
    colors: ['#8D5B4C', '#B96F50', '#D99771', '#F2C094', '#F6E3C5'],
    createdAt: '2025-05-23',
    likes: 9876
  },
  {
    id: '4',
    name: 'Neon Nights',
    colors: ['#0D0221', '#0F084B', '#26408B', '#A6CFD5', '#C2E7D9'],
    createdAt: '2025-05-22',
    likes: 8432
  },
  {
    id: '5',
    name: 'Desert Sunset',
    colors: ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
    createdAt: '2025-05-21',
    likes: 7654
  },
  {
    id: '6',
    name: 'Forest Walk',
    colors: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'],
    createdAt: '2025-05-20',
    likes: 6543
  },
  {
    id: '7',
    name: 'Berry Smoothie',
    colors: ['#590D22', '#800F2F', '#A4133C', '#C9184A', '#FF4D6D'],
    createdAt: '2025-05-19',
    likes: 5987
  },
  {
    id: '8',
    name: 'Minimalist',
    colors: ['#E6E6E6', '#CCCCCC', '#999999', '#595959', '#262626'],
    createdAt: '2025-05-18',
    likes: 5432
  }
];
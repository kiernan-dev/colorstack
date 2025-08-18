export interface GradientStop {
  color: string;
  position: number;
}

export interface Gradient {
  id: string;
  name: string;
  stops: GradientStop[];
  direction?: string;
}

export const gradientData: Gradient[] = [
  // ===== VIBRANT GRADIENTS =====
  {
    id: 'green-cyan',
    name: 'Green to Cyan',
    stops: [
      { color: '#00ff87', position: 0 },
      { color: '#60efff', position: 100 }
    ]
  },
  {
    id: 'blue-cyan',
    name: 'Blue to Cyan',
    stops: [
      { color: '#0061ff', position: 0 },
      { color: '#60efff', position: 100 }
    ]
  },
  {
    id: 'pink-purple',
    name: 'Pink to Purple',
    stops: [
      { color: '#ff006e', position: 0 },
      { color: '#8338ec', position: 100 }
    ]
  },
  {
    id: 'blue-purple',
    name: 'Blue to Purple',
    stops: [
      { color: '#00b4db', position: 0 },
      { color: '#0083b0', position: 100 }
    ]
  },
  {
    id: 'orange-pink',
    name: 'Pink to Orange',
    stops: [
      { color: '#ff416c', position: 0 },
      { color: '#ff4b2b', position: 100 }
    ]
  },
  {
    id: 'purple-pink-simple',
    name: 'Purple Pink',
    stops: [
      { color: '#8a2387', position: 0 },
      { color: '#f27121', position: 100 }
    ]
  },
  {
    id: 'coral-pink',
    name: 'Coral Pink',
    stops: [
      { color: '#f093fb', position: 0 },
      { color: '#f5576c', position: 100 }
    ]
  },
  {
    id: 'blue-light-blue',
    name: 'Blue Light Blue',
    stops: [
      { color: '#4facfe', position: 0 },
      { color: '#00f2fe', position: 100 }
    ]
  },
  {
    id: 'orange-yellow-classic',
    name: 'Orange Yellow',
    stops: [
      { color: '#fdbb2d', position: 0 },
      { color: '#22c1c3', position: 100 }
    ]
  },
  {
    id: 'mint-blue',
    name: 'Mint Blue',
    stops: [
      { color: '#89f7fe', position: 0 },
      { color: '#66a6ff', position: 100 }
    ]
  },
  {
    id: 'orange-pink-gradient',
    name: 'Orange Pink',
    stops: [
      { color: '#fa709a', position: 0 },
      { color: '#fee140', position: 100 }
    ]
  },
  {
    id: 'cyan-blue',
    name: 'Cyan Blue',
    stops: [
      { color: '#43e97b', position: 0 },
      { color: '#38f9d7', position: 100 }
    ]
  },
  {
    id: 'purple-blue-deep',
    name: 'Purple Blue Deep',
    stops: [
      { color: '#667db6', position: 0 },
      { color: '#0082c8', position: 100 }
    ]
  },
  {
    id: 'orange-red',
    name: 'Orange Red',
    stops: [
      { color: '#ff9a9e', position: 0 },
      { color: '#fecfef', position: 100 }
    ]
  },
  {
    id: 'peach-pink',
    name: 'Peach Pink',
    stops: [
      { color: '#ffecd2', position: 0 },
      { color: '#fcb69f', position: 100 }
    ]
  },

  // ===== COOL TONES =====
  {
    id: 'teal-blue',
    name: 'Teal Blue',
    stops: [
      { color: '#74b9ff', position: 0 },
      { color: '#0984e3', position: 100 }
    ]
  },
  {
    id: 'green-teal',
    name: 'Green Teal',
    stops: [
      { color: '#00b894', position: 0 },
      { color: '#00cec9', position: 100 }
    ]
  },
  {
    id: 'purple-gradient',
    name: 'Purple Gradient',
    stops: [
      { color: '#a29bfe', position: 0 },
      { color: '#6c5ce7', position: 100 }
    ]
  },
  {
    id: 'ice-blue',
    name: 'Ice Blue',
    stops: [
      { color: '#dbeafe', position: 0 },
      { color: '#bfdbfe', position: 100 }
    ]
  },
  {
    id: 'arctic',
    name: 'Arctic',
    stops: [
      { color: '#ddd6fe', position: 0 },
      { color: '#bfdbfe', position: 100 }
    ]
  },

  // ===== WARM TONES =====
  {
    id: 'yellow-orange',
    name: 'Yellow Orange',
    stops: [
      { color: '#fdcb6e', position: 0 },
      { color: '#e84393', position: 100 }
    ]
  },
  {
    id: 'red-pink',
    name: 'Red Pink',
    stops: [
      { color: '#fd79a8', position: 0 },
      { color: '#e84393', position: 100 }
    ]
  },
  {
    id: 'orange-deep',
    name: 'Deep Orange',
    stops: [
      { color: '#fab1a0', position: 0 },
      { color: '#e17055', position: 100 }
    ]
  },
  {
    id: 'autumn',
    name: 'Autumn',
    stops: [
      { color: '#e17055', position: 0 },
      { color: '#fdcb6e', position: 100 }
    ]
  },

  // ===== OCEAN/WATER THEMES =====
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    stops: [
      { color: '#667db6', position: 0 },
      { color: '#0082c8', position: 100 }
    ]
  },
  {
    id: 'sea-gradient',
    name: 'Sea Gradient',
    stops: [
      { color: '#2980b9', position: 0 },
      { color: '#3742fa', position: 100 }
    ]
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    stops: [
      { color: '#1e3c72', position: 0 },
      { color: '#2a5298', position: 100 }
    ]
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    stops: [
      { color: '#4c669f', position: 0 },
      { color: '#3b5998', position: 100 }
    ]
  },
  {
    id: 'tropical-water',
    name: 'Tropical Water',
    stops: [
      { color: '#38d9a9', position: 0 },
      { color: '#20bf6b', position: 100 }
    ]
  },
  {
    id: 'aqua-marine',
    name: 'Aqua Marine',
    stops: [
      { color: '#40e0d0', position: 0 },
      { color: '#006994', position: 100 }
    ]
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    stops: [
      { color: '#17a2b8', position: 0 },
      { color: '#28a745', position: 100 }
    ]
  },
  {
    id: 'lagoon',
    name: 'Lagoon',
    stops: [
      { color: '#20b2aa', position: 0 },
      { color: '#1e90ff', position: 100 }
    ]
  },

  // ===== SUNSET/SUNRISE VARIANTS =====
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    stops: [
      { color: '#ff7f50', position: 0 },
      { color: '#ff4500', position: 100 }
    ]
  },
  {
    id: 'sunrise-pink',
    name: 'Sunrise Pink',
    stops: [
      { color: '#ff69b4', position: 0 },
      { color: '#ff1493', position: 100 }
    ]
  },
  {
    id: 'dawn-sky',
    name: 'Dawn Sky',
    stops: [
      { color: '#87ceeb', position: 0 },
      { color: '#ff69b4', position: 100 }
    ]
  },
  {
    id: 'dusk-horizon',
    name: 'Dusk Horizon',
    stops: [
      { color: '#ff6b6b', position: 0 },
      { color: '#4ecdc4', position: 100 }
    ]
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    stops: [
      { color: '#ffd700', position: 0 },
      { color: '#ff8c00', position: 100 }
    ]
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    stops: [
      { color: '#ff6347', position: 0 },
      { color: '#ff4069', position: 100 }
    ]
  },
  {
    id: 'morning-blush',
    name: 'Morning Blush',
    stops: [
      { color: '#ffb6c1', position: 0 },
      { color: '#ffa07a', position: 100 }
    ]
  },

  // ===== FIRE/WARM THEMES =====
  {
    id: 'fire-flame',
    name: 'Fire Flame',
    stops: [
      { color: '#ff4757', position: 0 },
      { color: '#ffa502', position: 100 }
    ]
  },
  {
    id: 'ember-glow',
    name: 'Ember Glow',
    stops: [
      { color: '#dc143c', position: 0 },
      { color: '#ff6347', position: 100 }
    ]
  },
  {
    id: 'volcano',
    name: 'Volcano',
    stops: [
      { color: '#b22222', position: 0 },
      { color: '#ff4500', position: 100 }
    ]
  },
  {
    id: 'lava-flow',
    name: 'Lava Flow',
    stops: [
      { color: '#ff0000', position: 0 },
      { color: '#ff8c00', position: 100 }
    ]
  },
  {
    id: 'heat-wave',
    name: 'Heat Wave',
    stops: [
      { color: '#ff6b35', position: 0 },
      { color: '#f7931e', position: 100 }
    ]
  },
  {
    id: 'inferno',
    name: 'Inferno',
    stops: [
      { color: '#8b0000', position: 0 },
      { color: '#ff4500', position: 100 }
    ]
  },

  // ===== NATURE/FOREST THEMES =====
  {
    id: 'forest',
    name: 'Forest',
    stops: [
      { color: '#2ed573', position: 0 },
      { color: '#7bed9f', position: 100 }
    ]
  },
  {
    id: 'jungle-green',
    name: 'Jungle Green',
    stops: [
      { color: '#228b22', position: 0 },
      { color: '#32cd32', position: 100 }
    ]
  },
  {
    id: 'pine-forest',
    name: 'Pine Forest',
    stops: [
      { color: '#355c7d', position: 0 },
      { color: '#6c8cdb', position: 100 }
    ]
  },
  {
    id: 'moss-green',
    name: 'Moss Green',
    stops: [
      { color: '#556b2f', position: 0 },
      { color: '#9acd32', position: 100 }
    ]
  },
  {
    id: 'leaf-gradient',
    name: 'Leaf Gradient',
    stops: [
      { color: '#90ee90', position: 0 },
      { color: '#006400', position: 100 }
    ]
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    stops: [
      { color: '#8fbc8f', position: 0 },
      { color: '#228b22', position: 100 }
    ]
  },
  {
    id: 'spring-meadow',
    name: 'Spring Meadow',
    stops: [
      { color: '#98fb98', position: 0 },
      { color: '#00ff7f', position: 100 }
    ]
  },

  // ===== SPACE/COSMIC THEMES =====
  {
    id: 'space',
    name: 'Space',
    stops: [
      { color: '#1e3c72', position: 0 },
      { color: '#2a5298', position: 100 }
    ]
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    stops: [
      { color: '#4b0082', position: 0 },
      { color: '#8a2be2', position: 100 }
    ]
  },
  {
    id: 'nebula',
    name: 'Nebula',
    stops: [
      { color: '#9932cc', position: 0 },
      { color: '#00bfff', position: 100 }
    ]
  },
  {
    id: 'cosmic-dust',
    name: 'Cosmic Dust',
    stops: [
      { color: '#191970', position: 0 },
      { color: '#663399', position: 100 }
    ]
  },
  {
    id: 'starlight',
    name: 'Starlight',
    stops: [
      { color: '#000080', position: 0 },
      { color: '#4169e1', position: 100 }
    ]
  },
  {
    id: 'aurora',
    name: 'Aurora',
    stops: [
      { color: '#00ff7f', position: 0 },
      { color: '#1e90ff', position: 100 }
    ]
  },
  {
    id: 'supernova',
    name: 'Supernova',
    stops: [
      { color: '#ff1493', position: 0 },
      { color: '#9400d3', position: 100 }
    ]
  },

  // ===== PASTEL COLLECTIONS =====
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    stops: [
      { color: '#ffeaa7', position: 0 },
      { color: '#fab1a0', position: 100 }
    ]
  },
  {
    id: 'mint-gradient',
    name: 'Mint Gradient',
    stops: [
      { color: '#00b894', position: 0 },
      { color: '#55efc4', position: 100 }
    ]
  },
  {
    id: 'pastel-purple',
    name: 'Pastel Purple',
    stops: [
      { color: '#dda0dd', position: 0 },
      { color: '#e6e6fa', position: 100 }
    ]
  },
  {
    id: 'baby-blue',
    name: 'Baby Blue',
    stops: [
      { color: '#add8e6', position: 0 },
      { color: '#87ceeb', position: 100 }
    ]
  },
  {
    id: 'soft-peach',
    name: 'Soft Peach',
    stops: [
      { color: '#ffdab9', position: 0 },
      { color: '#ffb07a', position: 100 }
    ]
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    stops: [
      { color: '#e6e6fa', position: 0 },
      { color: '#dda0dd', position: 100 }
    ]
  },
  {
    id: 'powder-blue',
    name: 'Powder Blue',
    stops: [
      { color: '#b0e0e6', position: 0 },
      { color: '#87cefa', position: 100 }
    ]
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    stops: [
      { color: '#ffb6c1', position: 0 },
      { color: '#dda0dd', position: 100 }
    ]
  },

  // ===== NEON/ELECTRIC THEMES =====
  {
    id: 'neon-green',
    name: 'Neon Green',
    stops: [
      { color: '#55efc4', position: 0 },
      { color: '#81ecec', position: 100 }
    ]
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    stops: [
      { color: '#0984e3', position: 0 },
      { color: '#74b9ff', position: 100 }
    ]
  },
  {
    id: 'magenta-gradient',
    name: 'Magenta Gradient',
    stops: [
      { color: '#e84393', position: 0 },
      { color: '#fd79a8', position: 100 }
    ]
  },
  {
    id: 'cyber-pink',
    name: 'Cyber Pink',
    stops: [
      { color: '#ff0080', position: 0 },
      { color: '#00ffff', position: 100 }
    ]
  },
  {
    id: 'neon-lime',
    name: 'Neon Lime',
    stops: [
      { color: '#32ff7e', position: 0 },
      { color: '#7bed9f', position: 100 }
    ]
  },
  {
    id: 'electric-purple',
    name: 'Electric Purple',
    stops: [
      { color: '#bf00ff', position: 0 },
      { color: '#8000ff', position: 100 }
    ]
  },
  {
    id: 'laser-beam',
    name: 'Laser Beam',
    stops: [
      { color: '#00ff00', position: 0 },
      { color: '#00ffff', position: 100 }
    ]
  },
  {
    id: 'neon-orange',
    name: 'Neon Orange',
    stops: [
      { color: '#ff6348', position: 0 },
      { color: '#ffa502', position: 100 }
    ]
  },

  // ===== EARTH TONES =====
  {
    id: 'earth-sunset',
    name: 'Earth Sunset',
    stops: [
      { color: '#d63031', position: 0 },
      { color: '#fdcb6e', position: 100 }
    ]
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand',
    stops: [
      { color: '#daa520', position: 0 },
      { color: '#cd853f', position: 100 }
    ]
  },
  {
    id: 'canyon-rock',
    name: 'Canyon Rock',
    stops: [
      { color: '#8b4513', position: 0 },
      { color: '#cd853f', position: 100 }
    ]
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    stops: [
      { color: '#d2691e', position: 0 },
      { color: '#cd853f', position: 100 }
    ]
  },
  {
    id: 'muddy-brown',
    name: 'Muddy Brown',
    stops: [
      { color: '#8b4513', position: 0 },
      { color: '#a0522d', position: 100 }
    ]
  },
  {
    id: 'clay-earth',
    name: 'Clay Earth',
    stops: [
      { color: '#bc8f8f', position: 0 },
      { color: '#8b4513', position: 100 }
    ]
  },

  // ===== DARK GRADIENTS =====
  {
    id: 'dark-purple',
    name: 'Dark Purple',
    stops: [
      { color: '#2d3436', position: 0 },
      { color: '#636e72', position: 100 }
    ]
  },
  {
    id: 'midnight',
    name: 'Midnight',
    stops: [
      { color: '#0c0c0c', position: 0 },
      { color: '#2d3436', position: 100 }
    ]
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    stops: [
      { color: '#2c3e50', position: 0 },
      { color: '#34495e', position: 100 }
    ]
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    stops: [
      { color: '#000000', position: 0 },
      { color: '#434343', position: 100 }
    ]
  },
  {
    id: 'shadow-grey',
    name: 'Shadow Grey',
    stops: [
      { color: '#36454f', position: 0 },
      { color: '#708090', position: 100 }
    ]
  },

  // ===== MONOCHROMATIC VARIATIONS =====
  {
    id: 'blue-monochrome',
    name: 'Blue Monochrome',
    stops: [
      { color: '#1e3a8a', position: 0 },
      { color: '#3b82f6', position: 100 }
    ]
  },
  {
    id: 'red-monochrome',
    name: 'Red Monochrome',
    stops: [
      { color: '#7f1d1d', position: 0 },
      { color: '#ef4444', position: 100 }
    ]
  },
  {
    id: 'green-monochrome',
    name: 'Green Monochrome',
    stops: [
      { color: '#14532d', position: 0 },
      { color: '#22c55e', position: 100 }
    ]
  },
  {
    id: 'purple-monochrome',
    name: 'Purple Monochrome',
    stops: [
      { color: '#581c87', position: 0 },
      { color: '#a855f7', position: 100 }
    ]
  },
  {
    id: 'orange-monochrome',
    name: 'Orange Monochrome',
    stops: [
      { color: '#9a3412', position: 0 },
      { color: '#f97316', position: 100 }
    ]
  },
  {
    id: 'teal-monochrome',
    name: 'Teal Monochrome',
    stops: [
      { color: '#134e4a', position: 0 },
      { color: '#14b8a6', position: 100 }
    ]
  },

  // ===== TECHNICAL/CSS NAMED COLORS =====
  {
    id: 'crimson-gold',
    name: 'Crimson Gold',
    stops: [
      { color: '#dc143c', position: 0 },
      { color: '#ffd700', position: 100 }
    ]
  },
  {
    id: 'indigo-violet',
    name: 'Indigo Violet',
    stops: [
      { color: '#4b0082', position: 0 },
      { color: '#ee82ee', position: 100 }
    ]
  },
  {
    id: 'lime-forest',
    name: 'Lime Forest',
    stops: [
      { color: '#32cd32', position: 0 },
      { color: '#228b22', position: 100 }
    ]
  },
  {
    id: 'salmon-coral',
    name: 'Salmon Coral',
    stops: [
      { color: '#fa8072', position: 0 },
      { color: '#ff7f50', position: 100 }
    ]
  },
  {
    id: 'turquoise-teal',
    name: 'Turquoise Teal',
    stops: [
      { color: '#40e0d0', position: 0 },
      { color: '#008080', position: 100 }
    ]
  },

  // ===== DIAGONAL DIRECTIONS =====
  {
    id: 'diagonal-sunset',
    name: 'Diagonal Sunset',
    direction: '45deg',
    stops: [
      { color: '#ff9a9e', position: 0 },
      { color: '#fecfef', position: 100 }
    ]
  },
  {
    id: 'diagonal-ocean',
    name: 'Diagonal Ocean',
    direction: '135deg',
    stops: [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ]
  },
  {
    id: 'diagonal-fire',
    name: 'Diagonal Fire',
    direction: '-45deg',
    stops: [
      { color: '#ff4757', position: 0 },
      { color: '#ffa502', position: 100 }
    ]
  },
  {
    id: 'diagonal-forest',
    name: 'Diagonal Forest',
    direction: '60deg',
    stops: [
      { color: '#2ed573', position: 0 },
      { color: '#7bed9f', position: 100 }
    ]
  },
  {
    id: 'diagonal-purple',
    name: 'Diagonal Purple',
    direction: '120deg',
    stops: [
      { color: '#8360c3', position: 0 },
      { color: '#2ebf91', position: 100 }
    ]
  },

  // ===== VERTICAL GRADIENTS =====
  {
    id: 'vertical-sunrise',
    name: 'Vertical Sunrise',
    direction: 'to bottom',
    stops: [
      { color: '#ff7e5f', position: 0 },
      { color: '#feb47b', position: 100 }
    ]
  },
  {
    id: 'vertical-ocean',
    name: 'Vertical Ocean',
    direction: 'to bottom',
    stops: [
      { color: '#74b9ff', position: 0 },
      { color: '#0984e3', position: 100 }
    ]
  },
  {
    id: 'vertical-mint',
    name: 'Vertical Mint',
    direction: 'to bottom',
    stops: [
      { color: '#81ecec', position: 0 },
      { color: '#74b9ff', position: 100 }
    ]
  },

  // ===== HORIZONTAL GRADIENTS =====
  {
    id: 'horizontal-dawn',
    name: 'Horizontal Dawn',
    direction: 'to right',
    stops: [
      { color: '#f093fb', position: 0 },
      { color: '#f5576c', position: 100 }
    ]
  },
  {
    id: 'horizontal-forest',
    name: 'Horizontal Forest',
    direction: 'to right',
    stops: [
      { color: '#134e5e', position: 0 },
      { color: '#71b280', position: 100 }
    ]
  },
  {
    id: 'horizontal-fire',
    name: 'Horizontal Fire',
    direction: 'to right',
    stops: [
      { color: '#ee5a24', position: 0 },
      { color: '#feca57', position: 100 }
    ]
  },

  // ===== MORE UNIQUE COMBINATIONS =====
  {
    id: 'dreamy',
    name: 'Dreamy',
    stops: [
      { color: '#c471ed', position: 0 },
      { color: '#f64f59', position: 100 }
    ]
  },
  {
    id: 'candy',
    name: 'Candy',
    stops: [
      { color: '#d299c2', position: 0 },
      { color: '#fef9d7', position: 100 }
    ]
  },
  {
    id: 'tropical',
    name: 'Tropical',
    stops: [
      { color: '#ff9a56', position: 0 },
      { color: '#ffad56', position: 100 }
    ]
  },
  {
    id: 'mystic',
    name: 'Mystic',
    stops: [
      { color: '#654ea3', position: 0 },
      { color: '#eaafc8', position: 100 }
    ]
  },
  {
    id: 'royal',
    name: 'Royal',
    stops: [
      { color: '#8e2de2', position: 0 },
      { color: '#4a00e0', position: 100 }
    ]
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    stops: [
      { color: '#ff512f', position: 0 },
      { color: '#dd2476', position: 100 }
    ]
  },
  {
    id: 'emerald',
    name: 'Emerald',
    stops: [
      { color: '#11998e', position: 0 },
      { color: '#38ef7d', position: 100 }
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby',
    stops: [
      { color: '#de6161', position: 0 },
      { color: '#2657eb', position: 100 }
    ]
  },
  {
    id: 'sapphire',
    name: 'Sapphire',
    stops: [
      { color: '#108dc7', position: 0 },
      { color: '#ef8e38', position: 100 }
    ]
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    stops: [
      { color: '#9c88ff', position: 0 },
      { color: '#8ec5fc', position: 100 }
    ]
  },

  // ===== ADDITIONAL COLOR COMBINATIONS =====
  {
    id: 'lime-cyan',
    name: 'Lime Cyan',
    stops: [
      { color: '#32ff7e', position: 0 },
      { color: '#18ffff', position: 100 }
    ]
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    stops: [
      { color: '#e91e63', position: 0 },
      { color: '#ffc107', position: 100 }
    ]
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    stops: [
      { color: '#191970', position: 0 },
      { color: '#1e90ff', position: 100 }
    ]
  },
  {
    id: 'sunset-red',
    name: 'Sunset Red',
    stops: [
      { color: '#dc2430', position: 0 },
      { color: '#7b4397', position: 100 }
    ]
  },
  {
    id: 'spring-green',
    name: 'Spring Green',
    stops: [
      { color: '#00ff7f', position: 0 },
      { color: '#32cd32', position: 100 }
    ]
  },
  {
    id: 'autumn-orange',
    name: 'Autumn Orange',
    stops: [
      { color: '#ff6b35', position: 0 },
      { color: '#ff8e53', position: 100 }
    ]
  },
  {
    id: 'winter-blue',
    name: 'Winter Blue',
    stops: [
      { color: '#4169e1', position: 0 },
      { color: '#b0e0e6', position: 100 }
    ]
  },
  {
    id: 'summer-yellow',
    name: 'Summer Yellow',
    stops: [
      { color: '#ffd700', position: 0 },
      { color: '#ffb347', position: 100 }
    ]
  },

  // ===== WEB-SAFE COMBINATIONS =====
  {
    id: 'web-blue-green',
    name: 'Web Blue Green',
    stops: [
      { color: '#0066cc', position: 0 },
      { color: '#00cc66', position: 100 }
    ]
  },
  {
    id: 'web-red-orange',
    name: 'Web Red Orange',
    stops: [
      { color: '#cc0000', position: 0 },
      { color: '#ff6600', position: 100 }
    ]
  },
  {
    id: 'web-purple-pink',
    name: 'Web Purple Pink',
    stops: [
      { color: '#9900cc', position: 0 },
      { color: '#cc0099', position: 100 }
    ]
  },

  // ===== COMPLEMENTARY COLORS =====
  {
    id: 'complementary-blue-orange',
    name: 'Blue Orange Complement',
    stops: [
      { color: '#0077be', position: 0 },
      { color: '#ff7700', position: 100 }
    ]
  },
  {
    id: 'complementary-red-green',
    name: 'Red Green Complement',
    stops: [
      { color: '#e74c3c', position: 0 },
      { color: '#27ae60', position: 100 }
    ]
  },
  {
    id: 'complementary-purple-yellow',
    name: 'Purple Yellow Complement',
    stops: [
      { color: '#9b59b6', position: 0 },
      { color: '#f1c40f', position: 100 }
    ]
  },

  // ===== FINAL ADDITIONS =====
  {
    id: 'electric-lime',
    name: 'Electric Lime',
    stops: [
      { color: '#ccff00', position: 0 },
      { color: '#00ff99', position: 100 }
    ]
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Purple',
    stops: [
      { color: '#6a0dad', position: 0 },
      { color: '#da70d6', position: 100 }
    ]
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    stops: [
      { color: '#e0f6ff', position: 0 },
      { color: '#74c0fc', position: 100 }
    ]
  },
  {
    id: 'volcanic-red',
    name: 'Volcanic Red',
    stops: [
      { color: '#8b0000', position: 0 },
      { color: '#ff6347', position: 100 }
    ]
  },
  {
    id: 'forest-mist',
    name: 'Forest Mist',
    stops: [
      { color: '#2d5016', position: 0 },
      { color: '#a8e6cf', position: 100 }
    ]
  }
];
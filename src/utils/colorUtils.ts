import chroma from 'chroma-js';

export interface ColorVariation {
  type: string;
  label: string;
  color: string;
}

export const colorUtils = {
  // Generate random color palette
  generateRandomPalette: (count = 5, lockedColors: (string | null)[] = []): string[] => {
    const palette: string[] = [];
    for (let i = 0; i < count; i++) {
      if (lockedColors[i]) {
        palette.push(lockedColors[i]!);
      } else {
        palette.push(chroma.random().hex());
      }
    }
    return palette;
  },

  // Convert between color formats
  convertColor: (color: string, format: string): string | number[] => {
    try {
      const chromaColor = chroma(color);
      switch (format) {
        case 'hex': return chromaColor.hex();
        case 'rgb': return chromaColor.rgb().map(Math.round);
        case 'hsl': {
          const [h, s, l] = chromaColor.hsl();
          return [Math.round(h || 0), Math.round(s * 100), Math.round(l * 100)];
        }
        case 'cmyk': {
          const cmyk = chromaColor.cmyk();
          return cmyk.map(val => Math.round(val * 100));
        }
        case 'lab': return chromaColor.lab().map(Math.round);
        default: return color;
      }
    } catch (error) {
      console.error('Invalid color conversion:', error);
      return color;
    }
  },

  // Format color for display
  formatColorForDisplay: (color: string, format: string): string => {
    try {
      const value = colorUtils.convertColor(color, format);
      switch (format) {
        case 'hex': return value as string;
        case 'rgb': {
          const [r, g, b] = value as number[];
          return `rgb(${r}, ${g}, ${b})`;
        }
        case 'hsl': {
          const [h, s, l] = value as number[];
          return `hsl(${h}, ${s}%, ${l}%)`;
        }
        case 'cmyk': {
          const [c, m, y, k] = value as number[];
          return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
        }
        case 'lab': {
          const [l, a, b] = value as number[];
          return `lab(${l}, ${a}, ${b})`;
        }
        default: return color;
      }
    } catch (error) {
      console.error('Invalid color format:', error);
      return color;
    }
  },

  // Calculate contrast ratio (WCAG)
  calculateContrast: (color1: string, color2: string): number => {
    try {
      return chroma.contrast(color1, color2);
    } catch (error) {
      console.error('Contrast calculation error:', error);
      return 1;
    }
  },

  // Generate color variations
  generateVariations: (baseColor: string, type: string, intensity: number = 0.5): string => {
    try {
      const color = chroma(baseColor);
      switch (type) {
        case 'shade':
          return color.darken(intensity).hex();
        case 'tint':
          return color.brighten(intensity).hex();
        case 'saturation':
          return intensity > 0 
            ? color.saturate(intensity).hex() 
            : color.desaturate(Math.abs(intensity)).hex();
        case 'hue':
          return color.set('hsl.h', (color.get('hsl.h') + intensity * 360) % 360).hex();
        case 'temperature':
          return intensity > 0 
            ? color.set('hsl.h', (color.get('hsl.h') + 30) % 360).hex() 
            : color.set('hsl.h', (color.get('hsl.h') - 30) % 360).hex();
        default:
          return baseColor;
      }
    } catch (error) {
      console.error('Variation generation error:', error);
      return baseColor;
    }
  },

  // Generate all variations for a palette
  generateAllVariations: (color: string): ColorVariation[] => {
    try {
      const variations: ColorVariation[] = [];
      
      // Shades
      [-0.9, -0.6, -0.3, 0.3, 0.6, 0.9].forEach(intensity => {
        const type = intensity < 0 ? 'shade' : 'tint';
        const label = intensity < 0 
          ? `Shade ${Math.abs(intensity * 100)}%` 
          : `Tint ${intensity * 100}%`;
        
        variations.push({
          type,
          label,
          color: colorUtils.generateVariations(color, type, Math.abs(intensity))
        });
      });
      
      // Saturation
      [-0.75, -0.5, -0.25, 0.25, 0.5, 0.75].forEach(intensity => {
        const label = intensity < 0 
          ? `Desaturate ${Math.abs(intensity * 100)}%` 
          : `Saturate ${intensity * 100}%`;
        
        variations.push({
          type: 'saturation',
          label,
          color: colorUtils.generateVariations(color, 'saturation', intensity)
        });
      });
      
      // Hue
      [30, 60, 90, 180, 270].forEach(deg => {
        variations.push({
          type: 'hue',
          label: `Hue +${deg}°`,
          color: colorUtils.generateVariations(color, 'hue', deg / 360)
        });
      });
      
      // Temperature
      variations.push({
        type: 'temperature',
        label: 'Warmer',
        color: colorUtils.generateVariations(color, 'temperature', 1)
      });
      
      variations.push({
        type: 'temperature',
        label: 'Cooler',
        color: colorUtils.generateVariations(color, 'temperature', -1)
      });
      
      return variations;
    } catch (error) {
      console.error('Variations generation error:', error);
      return [];
    }
  },

  // Check WCAG compliance
  getWCAGRating: (ratio: number, isLargeText: boolean = false) => {
    const aaThreshold = isLargeText ? 3 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7;
    
    if (ratio >= aaaThreshold) return { level: 'AAA', stars: 5, label: 'Excellent' };
    if (ratio >= aaThreshold) return { level: 'AA', stars: 4, label: 'Very good' };
    if (ratio >= 3) return { level: 'AA Large', stars: 3, label: 'Good' };
    if (ratio >= 2) return { level: 'Fail', stars: 2, label: 'Poor' };
    return { level: 'Fail', stars: 1, label: 'Very poor' };
  },

  // Generate accessible variations of a color
  generateAccessibleVariations: (baseColor: string, contrastColor: string, targetRatio: number = 4.5): string[] => {
    try {
      const variations: string[] = [];
      const baseChroma = chroma(baseColor);
      
      // Try lightening
      for (let i = 0.1; i <= 1; i += 0.1) {
        const lighter = baseChroma.brighten(i).hex();
        if (colorUtils.calculateContrast(lighter, contrastColor) >= targetRatio) {
          variations.push(lighter);
          break;
        }
      }
      
      // Try darkening
      for (let i = 0.1; i <= 1; i += 0.1) {
        const darker = baseChroma.darken(i).hex();
        if (colorUtils.calculateContrast(darker, contrastColor) >= targetRatio) {
          variations.push(darker);
          break;
        }
      }
      
      // Try desaturating
      for (let i = 0.1; i <= 1; i += 0.1) {
        const desaturated = baseChroma.desaturate(i).hex();
        if (colorUtils.calculateContrast(desaturated, contrastColor) >= targetRatio) {
          variations.push(desaturated);
          break;
        }
      }
      
      return variations;
    } catch (error) {
      console.error('Accessible variations error:', error);
      return [];
    }
  },

  // Extract colors from image (simplified version)
  extractColorsFromImage: async (imageUrl: string, colorCount: number = 5): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('Canvas 2D context not available');
          return;
        }
        
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Simple color extraction algorithm
          const colors: string[] = [];
          const pixelCount = 100; // Number of pixels to sample
          
          for (let i = 0; i < pixelCount && colors.length < colorCount; i++) {
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            const pixelData = ctx.getImageData(x, y, 1, 1).data;
            
            const hex = chroma(pixelData[0], pixelData[1], pixelData[2]).hex();
            
            // Add color if it's not too similar to existing ones
            if (!colors.some(color => 
              chroma.distance(hex, color) < 10)) {
              colors.push(hex);
            }
          }
          
          // Fill with random colors if we didn't extract enough
          while (colors.length < colorCount) {
            colors.push(chroma.random().hex());
          }
          
          resolve(colors);
        };
        
        img.onerror = () => {
          reject('Image loading failed');
        };
        
        img.src = imageUrl;
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get luminance value
  getLuminance: (color: string): number => {
    try {
      return chroma(color).luminance();
    } catch (error) {
      return 0.5;
    }
  },

  // Check if a color is light or dark
  isColorLight: (color: string): boolean => {
    try {
      return chroma(color).luminance() > 0.5;
    } catch (error) {
      return true;
    }
  },

  // Get contrasting text color
  getTextColor: (bgColor: string): string => {
    try {
      return colorUtils.isColorLight(bgColor) ? '#000000' : '#FFFFFF';
    } catch (error) {
      return '#000000';
    }
  },

  // Parse a color string
  parseColor: (colorStr: string): string => {
    try {
      return chroma(colorStr).hex();
    } catch (error) {
      return '#FFFFFF';
    }
  },

  // Generate a linear gradient CSS
  generateGradientCSS: (colors: string[], angle: number = 90, type: 'linear' | 'radial' = 'linear'): string => {
    try {
      if (colors.length < 2) {
        return 'linear-gradient(90deg, #FFFFFF, #FFFFFF)';
      }
      
      if (type === 'linear') {
        return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
      } else {
        return `radial-gradient(circle, ${colors.join(', ')})`;
      }
    } catch (error) {
      return 'linear-gradient(90deg, #FFFFFF, #FFFFFF)';
    }
  }
};
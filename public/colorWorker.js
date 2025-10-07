// Web Worker for intensive color calculations
// This worker handles contrast calculations and color variations to prevent UI blocking

// Import chroma-js for color operations
try {
  importScripts('https://unpkg.com/chroma-js@3.1.2/index.min.js');
} catch (error) {
  console.error('Failed to load chroma-js, falling back to basic color functions');
}

// Color utility functions for the worker
const workerColorUtils = {
  calculateContrast: (color1, color2) => {
    try {
      return chroma.contrast(color1, color2);
    } catch (error) {
      return 1;
    }
  },

  generateVariations: (baseColor, type, intensity = 0.5) => {
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
      return baseColor;
    }
  },

  getWCAGRating: (ratio, isLargeText = false) => {
    const aaThreshold = isLargeText ? 3 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7;
    
    if (ratio >= aaaThreshold) return { level: 'AAA', stars: 5, label: 'Excellent' };
    if (ratio >= aaThreshold) return { level: 'AA', stars: 4, label: 'Very good' };
    if (ratio >= 3) return { level: 'AA Large', stars: 3, label: 'Good' };
    if (ratio >= 2) return { level: 'Fail', stars: 2, label: 'Poor' };
    return { level: 'Fail', stars: 1, label: 'Very poor' };
  }
};

// Handle messages from the main thread
self.onmessage = function(event) {
  const { type, data, id } = event.data;

  try {
    switch (type) {
      case 'CALCULATE_CONTRAST':
        const { color1, color2 } = data;
        const ratio = workerColorUtils.calculateContrast(color1, color2);
        const result = {
          ratio: ratio.toFixed(2),
          normalText: workerColorUtils.getWCAGRating(ratio, false),
          largeText: workerColorUtils.getWCAGRating(ratio, true)
        };
        
        self.postMessage({ type: 'CONTRAST_RESULT', data: result, id });
        break;

      case 'GENERATE_FIXES':
        const { targetColor, contrastColor, fixMode } = data;
        const variations = [];
        
        // Generate 6 variations (lighter and darker)
        for (let i = 0.1; i <= 0.6; i += 0.1) {
          // Lighter
          const lighter = workerColorUtils.generateVariations(targetColor, 'tint', i);
          const lighterContrast = workerColorUtils.calculateContrast(
            fixMode === 'text' ? lighter : contrastColor,
            fixMode === 'text' ? contrastColor : lighter
          );
          
          // Darker
          const darker = workerColorUtils.generateVariations(targetColor, 'shade', i);
          const darkerContrast = workerColorUtils.calculateContrast(
            fixMode === 'text' ? darker : contrastColor,
            fixMode === 'text' ? contrastColor : darker
          );
          
          variations.push({
            color: lighter,
            contrast: lighterContrast,
            label: `Lighter +${Math.round(i * 100)}%`,
            rating: workerColorUtils.getWCAGRating(lighterContrast, false)
          });
          
          variations.push({
            color: darker,
            contrast: darkerContrast,
            label: `Darker +${Math.round(i * 100)}%`,
            rating: workerColorUtils.getWCAGRating(darkerContrast, false)
          });
        }
        
        // Sort by contrast ratio (highest first)
        const sortedVariations = variations.sort((a, b) => b.contrast - a.contrast);
        
        self.postMessage({ type: 'FIXES_RESULT', data: sortedVariations, id });
        break;

      case 'GENERATE_ALL_VARIATIONS':
        const { baseColor } = data;
        const allVariations = [];
        
        // Shades and tints
        [-0.9, -0.6, -0.3, 0.3, 0.6, 0.9].forEach(intensity => {
          const type = intensity < 0 ? 'shade' : 'tint';
          const label = intensity < 0 
            ? `Shade ${Math.abs(intensity * 100)}%` 
            : `Tint ${intensity * 100}%`;
          
          allVariations.push({
            type,
            label,
            color: workerColorUtils.generateVariations(baseColor, type, Math.abs(intensity))
          });
        });
        
        // Saturation
        [-0.75, -0.5, -0.25, 0.25, 0.5, 0.75].forEach(intensity => {
          const label = intensity < 0 
            ? `Desaturate ${Math.abs(intensity * 100)}%` 
            : `Saturate ${intensity * 100}%`;
          
          allVariations.push({
            type: 'saturation',
            label,
            color: workerColorUtils.generateVariations(baseColor, 'saturation', intensity)
          });
        });
        
        // Hue
        [30, 60, 90, 180, 270].forEach(deg => {
          allVariations.push({
            type: 'hue',
            label: `Hue +${deg}°`,
            color: workerColorUtils.generateVariations(baseColor, 'hue', deg / 360)
          });
        });
        
        // Temperature
        allVariations.push({
          type: 'temperature',
          label: 'Warmer',
          color: workerColorUtils.generateVariations(baseColor, 'temperature', 1)
        });
        
        allVariations.push({
          type: 'temperature',
          label: 'Cooler',
          color: workerColorUtils.generateVariations(baseColor, 'temperature', -1)
        });
        
        self.postMessage({ type: 'ALL_VARIATIONS_RESULT', data: allVariations, id });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({ 
      type: 'ERROR', 
      data: { message: error.message }, 
      id 
    });
  }
};
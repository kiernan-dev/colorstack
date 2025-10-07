import { ColorItem } from './colorData';

// Color data chunking utility for improved performance
export const CHUNK_SIZE = 50; // Load 50 colors at a time
export const INITIAL_CHUNK_SIZE = 100; // Load first 100 colors immediately

// Chunk loading states
export type ChunkLoadState = 'pending' | 'loading' | 'loaded' | 'error';

export interface ColorChunk {
  index: number;
  colors: ColorItem[];
  category?: string;
  state: ChunkLoadState;
}

// Dynamic import functions for each color category chunk
const colorChunkLoaders = {
  red: () => import('./chunks/redColors').then(m => m.redColors),
  orange: () => import('./chunks/orangeColors').then(m => m.orangeColors),
  brown: () => import('./chunks/brownColors').then(m => m.brownColors),
  yellow: () => import('./chunks/yellowColors').then(m => m.yellowColors),
  green: () => import('./chunks/greenColors').then(m => m.greenColors),
  turquoise: () => import('./chunks/turquoiseColors').then(m => m.turquoiseColors),
  blue: () => import('./chunks/blueColors').then(m => m.blueColors),
  violet: () => import('./chunks/violetColors').then(m => m.violetColors),
  pink: () => import('./chunks/pinkColors').then(m => m.pinkColors),
  white: () => import('./chunks/whiteColors').then(m => m.whiteColors),
  gray: () => import('./chunks/grayColors').then(m => m.grayColors),
  black: () => import('./chunks/blackColors').then(m => m.blackColors)
};

export class ColorDataManager {
  private chunks: Map<string, ColorChunk> = new Map();
  private loadedColors: ColorItem[] = [];
  private loadingPromises: Map<string, Promise<ColorItem[]>> = new Map();

  constructor() {
    // Initialize with empty chunks for each category
    Object.keys(colorChunkLoaders).forEach((category, index) => {
      this.chunks.set(category, {
        index,
        colors: [],
        category,
        state: 'pending'
      });
    });
  }

  // Get currently loaded colors
  getLoadedColors(): ColorItem[] {
    return this.loadedColors;
  }

  // Get colors by category
  getColorsByCategory(category: string): ColorItem[] {
    const chunk = this.chunks.get(category.toLowerCase());
    return chunk?.colors || [];
  }

  // Check if a category is loaded
  isCategoryLoaded(category: string): boolean {
    const chunk = this.chunks.get(category.toLowerCase());
    return chunk?.state === 'loaded';
  }

  // Load a specific category chunk
  async loadCategory(category: string): Promise<ColorItem[]> {
    const normalizedCategory = category.toLowerCase();
    const chunk = this.chunks.get(normalizedCategory);
    
    if (!chunk) {
      throw new Error(`Unknown category: ${category}`);
    }

    if (chunk.state === 'loaded') {
      return chunk.colors;
    }

    if (chunk.state === 'loading') {
      // Return existing promise if already loading
      const existingPromise = this.loadingPromises.get(normalizedCategory);
      if (existingPromise) {
        return existingPromise;
      }
    }

    // Start loading
    chunk.state = 'loading';
    this.chunks.set(normalizedCategory, chunk);

    const loader = colorChunkLoaders[normalizedCategory as keyof typeof colorChunkLoaders];
    if (!loader) {
      chunk.state = 'error';
      throw new Error(`No loader for category: ${category}`);
    }

    try {
      const loadPromise = loader();
      this.loadingPromises.set(normalizedCategory, loadPromise);

      const colors = await loadPromise;
      
      // Update chunk
      chunk.colors = colors;
      chunk.state = 'loaded';
      this.chunks.set(normalizedCategory, chunk);

      // Add to loaded colors
      this.loadedColors = [
        ...this.loadedColors.filter(color => color.category.toLowerCase() !== normalizedCategory),
        ...colors
      ];

      this.loadingPromises.delete(normalizedCategory);
      return colors;
    } catch (error) {
      chunk.state = 'error';
      this.chunks.set(normalizedCategory, chunk);
      this.loadingPromises.delete(normalizedCategory);
      throw error;
    }
  }

  // Load multiple categories
  async loadCategories(categories: string[]): Promise<ColorItem[]> {
    const promises = categories.map(category => this.loadCategory(category));
    const results = await Promise.allSettled(promises);
    
    const loadedColors: ColorItem[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        loadedColors.push(...result.value);
      }
    });

    return loadedColors;
  }

  // Load colors incrementally
  async loadInitialColors(): Promise<ColorItem[]> {
    // Load most common categories first
    const priorityCategories = ['red', 'blue', 'green', 'gray', 'black'];
    return this.loadCategories(priorityCategories);
  }

  // Load all remaining colors
  async loadAllColors(): Promise<ColorItem[]> {
    const allCategories = Object.keys(colorChunkLoaders);
    return this.loadCategories(allCategories);
  }

  // Get loading states for all chunks
  getLoadingStates(): Record<string, ChunkLoadState> {
    const states: Record<string, ChunkLoadState> = {};
    this.chunks.forEach((chunk, category) => {
      states[category] = chunk.state;
    });
    return states;
  }

  // Clear all loaded data (for memory management)
  clear(): void {
    this.chunks.forEach((chunk, category) => {
      chunk.colors = [];
      chunk.state = 'pending';
      this.chunks.set(category, chunk);
    });
    this.loadedColors = [];
    this.loadingPromises.clear();
  }
}

// Singleton instance
export const colorDataManager = new ColorDataManager();
import { useState, useCallback, useEffect } from 'react';
import { colorUtils } from '@/utils/colorUtils';

export interface PaletteState {
  colors: string[];
  lockedStates: boolean[];
  history: string[][];
  activeColorIndex: number | null;
}

export function useColorPalette(initialColors?: string[]) {
  const [state, setState] = useState<PaletteState>(() => {
    const colors = initialColors?.length 
      ? initialColors.slice(0, 5) 
      : colorUtils.generateRandomPalette(5);
    
    // Ensure we always have exactly 5 colors
    const paddedColors = [...colors];
    while (paddedColors.length < 5) {
      paddedColors.push(colorUtils.generateRandomPalette(1)[0]);
    }
    
    return {
      colors: paddedColors,
      lockedStates: new Array(5).fill(false),
      history: [],
      activeColorIndex: null
    };
  });

  // Load from URL hash if available
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      try {
        // Format: #/AABBCC-DDEEFF-112233-445566-778899
        const colors = hash.substring(2).split('-');
        if (colors.length === 5 && colors.every(c => /^[0-9A-F]{6}$/i.test(c))) {
          setState(prev => ({
            ...prev,
            colors: colors.map(c => `#${c.toUpperCase()}`),
            history: []
          }));
        }
      } catch (error) {
        console.error('Failed to parse URL hash:', error);
      }
    }
  }, []);

  // Update URL hash when colors change
  useEffect(() => {
    const colorString = state.colors
      .map(c => c.replace('#', ''))
      .join('-');
    window.history.replaceState(
      null, 
      '', 
      `#/${colorString}`
    );
  }, [state.colors]);

  const generateNewPalette = useCallback(() => {
    setState(prev => {
      const lockedColors = prev.colors.map((color, index) => 
        prev.lockedStates[index] ? color : null
      );
      const newColors = colorUtils.generateRandomPalette(5, lockedColors);
      
      return {
        ...prev,
        colors: newColors,
        history: [...prev.history, prev.colors],
        activeColorIndex: null
      };
    });
  }, []);

  const updateColor = useCallback((index: number, newColor: string) => {
    setState(prev => {
      const updatedColors = [...prev.colors];
      updatedColors[index] = newColor;
      
      return {
        ...prev,
        colors: updatedColors,
        history: [...prev.history, prev.colors]
      };
    });
  }, []);

  const toggleLock = useCallback((index: number) => {
    setState(prev => {
      const updatedLocks = [...prev.lockedStates];
      updatedLocks[index] = !updatedLocks[index];
      
      return {
        ...prev,
        lockedStates: updatedLocks
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.history.length === 0) return prev;
      
      const lastColors = prev.history[prev.history.length - 1];
      return {
        ...prev,
        colors: lastColors,
        history: prev.history.slice(0, -1),
        activeColorIndex: null
      };
    });
  }, []);

  const setActiveColor = useCallback((index: number | null) => {
    setState(prev => ({
      ...prev,
      activeColorIndex: index
    }));
  }, []);

  const addColor = useCallback(() => {
    setState(prev => {
      if (prev.colors.length >= 10) return prev;
      
      const newColor = colorUtils.generateRandomPalette(1)[0];
      return {
        ...prev,
        colors: [...prev.colors, newColor],
        lockedStates: [...prev.lockedStates, false],
        history: [...prev.history, prev.colors]
      };
    });
  }, []);

  const removeColor = useCallback((index: number) => {
    setState(prev => {
      if (prev.colors.length <= 1) return prev;
      
      const updatedColors = [...prev.colors];
      updatedColors.splice(index, 1);
      
      const updatedLocks = [...prev.lockedStates];
      updatedLocks.splice(index, 1);
      
      return {
        ...prev,
        colors: updatedColors,
        lockedStates: updatedLocks,
        history: [...prev.history, prev.colors],
        activeColorIndex: null
      };
    });
  }, []);

  return {
    colors: state.colors,
    lockedStates: state.lockedStates,
    activeColorIndex: state.activeColorIndex,
    canUndo: state.history.length > 0,
    generateNewPalette,
    updateColor,
    toggleLock,
    undo,
    setActiveColor,
    addColor,
    removeColor
  };
}
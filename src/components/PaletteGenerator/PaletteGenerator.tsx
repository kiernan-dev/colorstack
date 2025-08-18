import { useEffect, useState, useCallback } from 'react';
import { useColorPalette } from '@/hooks/useColorPalette';
import ColorSwatch from './ColorSwatch';
import PaletteToolbar from './PaletteToolbar';
import ExportModal from '@/components/Shared/ExportModal';
import { Copy, Download, Save, Undo, RefreshCw } from 'lucide-react';

const PaletteGenerator = () => {
  const {
    colors,
    lockedStates,
    activeColorIndex,
    canUndo,
    generateNewPalette,
    updateColor,
    toggleLock,
    undo,
    setActiveColor,
    addColor,
    removeColor
  } = useColorPalette();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showSpacebarHint, setShowSpacebarHint] = useState(true);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' && !e.repeat && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      generateNewPalette();
      setShowSpacebarHint(false);
    } else if (e.code === 'KeyL' && activeColorIndex !== null) {
      toggleLock(activeColorIndex);
    } else if (e.code === 'KeyC' && activeColorIndex !== null) {
      // Copy color to clipboard
      navigator.clipboard.writeText(colors[activeColorIndex]);
    } else if (e.code === 'KeyZ' && e.ctrlKey && canUndo) {
      undo();
    }
  }, [activeColorIndex, canUndo, colors, generateNewPalette, toggleLock, undo, setShowSpacebarHint]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Hide spacebar hint after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpacebarHint(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Color Swatches */}
      <div className="flex flex-grow">
        {colors.map((color, index) => (
          <ColorSwatch
            key={`${color}-${index}`}
            color={color}
            index={index}
            isLocked={lockedStates[index]}
            isActive={activeColorIndex === index}
            onToggleLock={() => toggleLock(index)}
            onUpdateColor={(newColor) => updateColor(index, newColor)}
            onActivate={() => setActiveColor(activeColorIndex === index ? null : index)}
            onRemove={() => removeColor(index)}
          />
        ))}
        
        {/* Add Color Button (if less than max colors) */}
        {colors.length < 10 && (
          <button
            onClick={addColor}
            className="flex items-center justify-center flex-none w-12 h-full bg-gray-100 hover:bg-gray-200"
          >
            <span className="text-2xl">+</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <PaletteToolbar
        onExport={() => setShowExportModal(true)}
        onGenerate={generateNewPalette}
        onUndo={undo}
        canUndo={canUndo}
      />

      {/* Spacebar Hint */}
      {showSpacebarHint && (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="px-6 py-3 text-lg text-center text-gray-700 bg-white rounded-lg shadow-lg">
            Press the <kbd className="px-2 py-1 mx-1 font-semibold bg-gray-100 border border-gray-300 rounded">spacebar</kbd> to generate color palettes!
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          colors={colors}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default PaletteGenerator;
import { useState, useCallback, useEffect, memo } from 'react';
import { colorUtils } from '@/utils/colorUtils';
import { ColorFormat } from '@/types';
import { Lock, Unlock, Copy, Info, Trash, X, Check } from 'lucide-react';

interface ColorSwatchProps {
  color: string;
  index: number;
  isLocked: boolean;
  isActive: boolean;
  onToggleLock: () => void;
  onUpdateColor: (color: string) => void;
  onActivate: () => void;
  onRemove: () => void;
}

const ColorSwatch = ({
  color,
  index,
  isLocked,
  isActive,
  onToggleLock,
  onUpdateColor,
  onActivate,
  onRemove
}: ColorSwatchProps) => {
  // Combine related state to reduce re-renders
  const [swatchState, setSwatchState] = useState({
    colorFormat: 'hex' as ColorFormat,
    isCopied: false,
    showColorPicker: false
  });

  const updateSwatchState = useCallback((updates: Partial<typeof swatchState>) => {
    setSwatchState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleCloseColorPicker = useCallback(() => {
    updateSwatchState({ showColorPicker: false });
  }, [updateSwatchState]);

  const textColor = colorUtils.getTextColor(color);

  const handleCopy = useCallback(() => {
    const formattedColor = colorUtils.formatColorForDisplay(color, swatchState.colorFormat);
    navigator.clipboard.writeText(formattedColor);
    updateSwatchState({ isCopied: true });
    
    setTimeout(() => {
      updateSwatchState({ isCopied: false });
    }, 2000);
  }, [color, swatchState.colorFormat, updateSwatchState]);

  const handleFormatChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSwatchState({ colorFormat: e.target.value as ColorFormat });
  }, [updateSwatchState]);

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newColor = e.target.value;
      onUpdateColor(newColor);
    } catch (error) {
      console.error('Invalid color:', error);
    }
  }, [onUpdateColor]);

  // Get color name
  const getColorName = () => {
    // Simplified version - just return hex without #
    return color.replace('#', '').toUpperCase();
  };

  return (
    <div
      className="relative flex flex-col justify-between flex-1 h-full transition-colors"
      style={{ backgroundColor: color }}
      onClick={onActivate}
    >
      {/* Color Controls */}
      <div className={`flex flex-col items-center p-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button
          className="p-2 mb-2 text-current rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
        >
          {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
        </button>

        <button
          className="p-2 mb-2 text-current rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
        >
          {swatchState.isCopied ? <Check size={20} /> : <Copy size={20} />}
        </button>

        <button
          className="p-2 mb-2 text-current rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            updateSwatchState({ showColorPicker: !swatchState.showColorPicker });
          }}
        >
          <Info size={20} />
        </button>

        <button
          className="p-2 text-current rounded-full hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash size={20} />
        </button>
      </div>

      {/* Color Info */}
      <div 
        className="p-4 text-center" 
        style={{ color: textColor }}
      >
        <h2 className="text-2xl font-bold">{getColorName()}</h2>
      </div>

      {/* Color Picker Modal */}
      {swatchState.showColorPicker && (
        <div
          className="absolute z-10 p-4 -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2 top-1/3 w-72"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Color Editor</h3>
            <button
              onClick={handleCloseColorPicker}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Color Format
            </label>
            <select
              value={swatchState.colorFormat}
              onChange={handleFormatChange}
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hex">HEX</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
              <option value="cmyk">CMYK</option>
              <option value="lab">LAB</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Color Value
            </label>
            <div className="flex">
              <input
                type="text"
                value={colorUtils.formatColorForDisplay(color, swatchState.colorFormat)}
                className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600"
              >
                {swatchState.isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Color Picker
            </label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ColorSwatch);
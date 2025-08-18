import { useState, useEffect, useRef } from 'react';
import { colorUtils } from '@/utils/colorUtils';
import { GradientConfig, GradientStop, GradientType } from '@/types';
import { Check, Copy, RefreshCw, Maximize } from 'lucide-react';

const GradientMaker = () => {
  const [gradientConfig, setGradientConfig] = useState<GradientConfig>({
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#4158D0', position: 0, id: 'stop-1' },
      { color: '#C850C0', position: 50, id: 'stop-2' },
      { color: '#FFCC70', position: 100, id: 'stop-3' }
    ]
  });
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate CSS based on current configuration
  const generateCSS = () => {
    const { type, angle, stops } = gradientConfig;
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    
    const stopString = sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    if (type === 'linear') {
      return `background: linear-gradient(${angle}deg, ${stopString});`;
    } else {
      return `background: radial-gradient(circle, ${stopString});`;
    }
  };

  // Copy CSS to clipboard
  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate random gradient
  const generateRandomGradient = () => {
    const randomStops = Array(3).fill(0).map((_, index) => ({
      color: colorUtils.generateRandomPalette(1)[0],
      position: index === 0 ? 0 : index === 1 ? 50 : 100,
      id: `stop-${index + 1}`
    }));
    
    setGradientConfig({
      ...gradientConfig,
      stops: randomStops
    });
  };

  // Handle stop position change
  const handleStopDrag = (clientX: number) => {
    if (!activeStopId || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const width = rect.width;
    const offsetX = clientX - rect.left;
    
    // Calculate position percentage (0-100)
    let position = Math.round((offsetX / width) * 100);
    position = Math.max(0, Math.min(100, position));
    
    setGradientConfig(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === activeStopId 
          ? { ...stop, position } 
          : stop
      )
    }));
  };

  // Handle mouse/touch events for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleStopDrag(e.clientX);
    };
    
    const handleMouseUp = () => {
      setActiveStopId(null);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleStopDrag(e.touches[0].clientX);
      }
    };
    
    if (activeStopId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [activeStopId]);

  // Update stop color
  const handleColorChange = (id: string, color: string) => {
    setGradientConfig(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === id ? { ...stop, color } : stop
      )
    }));
  };

  // Add new stop
  const handleAddStop = () => {
    if (gradientConfig.stops.length >= 5) return;
    
    const newStop = {
      color: colorUtils.generateRandomPalette(1)[0],
      position: 25,
      id: `stop-${Date.now()}`
    };
    
    setGradientConfig(prev => ({
      ...prev,
      stops: [...prev.stops, newStop]
    }));
  };

  // Remove stop
  const handleRemoveStop = (id: string) => {
    if (gradientConfig.stops.length <= 2) return;
    
    setGradientConfig(prev => ({
      ...prev,
      stops: prev.stops.filter(stop => stop.id !== id)
    }));
  };

  // Handle angle change
  const handleAngleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGradientConfig(prev => ({
      ...prev,
      angle: Number(e.target.value)
    }));
  };

  // Handle type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGradientConfig(prev => ({
      ...prev,
      type: e.target.value as GradientType
    }));
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-center">Gradient Maker</h1>
      <p className="mb-8 text-gray-600 text-center">
        Create and export beautiful gradients.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          {/* Gradient Slider */}
          <div className="relative h-10 mb-6">
            <div 
              ref={sliderRef}
              className="absolute w-full h-2 bg-gray-200 rounded-full top-4"
            >
              {gradientConfig.stops.map(stop => (
                <div
                  key={stop.id}
                  className="absolute w-6 h-6 -translate-x-1/2 border-2 border-white rounded-full cursor-pointer top-1/2 -translate-y-1/2 shadow-md"
                  style={{
                    backgroundColor: stop.color,
                    left: `${stop.position}%`,
                    zIndex: activeStopId === stop.id ? 10 : 1,
                    transform: `translate(-50%, -50%) ${activeStopId === stop.id ? 'scale(1.2)' : ''}`
                  }}
                  onMouseDown={() => setActiveStopId(stop.id)}
                  onTouchStart={() => setActiveStopId(stop.id)}
                />
              ))}
            </div>
          </div>

          {/* Color Stops */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Colors</h3>
            
            {gradientConfig.stops.map(stop => (
              <div key={stop.id} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleColorChange(stop.id, e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={stop.color.toUpperCase()}
                  onChange={(e) => handleColorChange(stop.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={stop.position}
                  onChange={(e) => {
                    const position = Math.max(0, Math.min(100, Number(e.target.value)));
                    handleColorChange(stop.id, stop.color);
                    setGradientConfig(prev => ({
                      ...prev,
                      stops: prev.stops.map(s => 
                        s.id === stop.id ? { ...s, position } : s
                      )
                    }));
                  }}
                  min="0"
                  max="100"
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => handleRemoveStop(stop.id)}
                  disabled={gradientConfig.stops.length <= 2}
                  className={`p-2 text-gray-500 rounded-md ${
                    gradientConfig.stops.length <= 2 
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  &times;
                </button>
              </div>
            ))}
            
            {gradientConfig.stops.length < 5 && (
              <button
                onClick={handleAddStop}
                className="w-full py-2 mt-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                + Add Color Stop
              </button>
            )}
          </div>

          {/* Direction and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Rotation</label>
              <select
                value={gradientConfig.angle}
                onChange={handleAngleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="0">0°</option>
                <option value="45">45°</option>
                <option value="90">90°</option>
                <option value="135">135°</option>
                <option value="180">180°</option>
                <option value="225">225°</option>
                <option value="270">270°</option>
                <option value="315">315°</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Type</label>
              <select
                value={gradientConfig.type}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={generateRandomGradient}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <RefreshCw size={16} /> Random
            </button>
            
            <button
              onClick={handleCopyCSS}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="relative">
          <div
            className={`rounded-lg overflow-hidden shadow-md transition-all ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-64'
            }`}
            style={{ background: colorUtils.generateGradientCSS(
              gradientConfig.stops.map(s => s.color),
              gradientConfig.angle,
              gradientConfig.type
            ) }}
          >
            <button
              onClick={toggleFullscreen}
              className="absolute p-2 text-white bg-black bg-opacity-30 rounded-full top-2 right-2 hover:bg-opacity-50"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Example Gradients */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-center">Example gradients</h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
          {exampleGradients.map((gradient, index) => (
            <button
              key={`example-${index}`}
              className="relative overflow-hidden transition-transform rounded-lg shadow-md h-28 hover:shadow-lg hover:scale-105"
              style={{ background: gradient.css }}
              onClick={() => setGradientConfig(gradient.config)}
            >
              <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-white bg-black bg-opacity-30">
                {gradient.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example gradients data
const exampleGradients = [
  {
    name: 'Blue Purple',
    css: 'linear-gradient(90deg, #4158D0, #C850C0)',
    config: {
      type: 'linear' as GradientType,
      angle: 90,
      stops: [
        { color: '#4158D0', position: 0, id: 'example-1-1' },
        { color: '#C850C0', position: 100, id: 'example-1-2' }
      ]
    }
  },
  {
    name: 'Orange Pink',
    css: 'linear-gradient(45deg, #FF9A8B, #FF6A88)',
    config: {
      type: 'linear' as GradientType,
      angle: 45,
      stops: [
        { color: '#FF9A8B', position: 0, id: 'example-2-1' },
        { color: '#FF6A88', position: 100, id: 'example-2-2' }
      ]
    }
  },
  {
    name: 'Green Blue',
    css: 'linear-gradient(90deg, #00F5A0, #00D9F5)',
    config: {
      type: 'linear' as GradientType,
      angle: 90,
      stops: [
        { color: '#00F5A0', position: 0, id: 'example-3-1' },
        { color: '#00D9F5', position: 100, id: 'example-3-2' }
      ]
    }
  },
  {
    name: 'Rainbow',
    css: 'linear-gradient(90deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF)',
    config: {
      type: 'linear' as GradientType,
      angle: 90,
      stops: [
        { color: '#FF0000', position: 0, id: 'example-4-1' },
        { color: '#FFFF00', position: 25, id: 'example-4-2' },
        { color: '#00FF00', position: 50, id: 'example-4-3' },
        { color: '#00FFFF', position: 75, id: 'example-4-4' },
        { color: '#0000FF', position: 100, id: 'example-4-5' }
      ]
    }
  },
  {
    name: 'Sunset',
    css: 'linear-gradient(135deg, #FFC796, #FF6B95)',
    config: {
      type: 'linear' as GradientType,
      angle: 135,
      stops: [
        { color: '#FFC796', position: 0, id: 'example-5-1' },
        { color: '#FF6B95', position: 100, id: 'example-5-2' }
      ]
    }
  },
  {
    name: 'Radial Blue',
    css: 'radial-gradient(circle, #00C9FF, #1D63C3)',
    config: {
      type: 'radial' as GradientType,
      angle: 90,
      stops: [
        { color: '#00C9FF', position: 0, id: 'example-6-1' },
        { color: '#1D63C3', position: 100, id: 'example-6-2' }
      ]
    }
  }
];

export default GradientMaker;
import { useState } from 'react';
import { gradientData } from '@/utils/gradientData';

interface GradientStop {
  color: string;
  position: number;
}

interface Gradient {
  id: string;
  name: string;
  stops: GradientStop[];
  direction?: string;
}

const GradientList = () => {
  const [hoveredZone, setHoveredZone] = useState<{ gradientId: string; zone: 'left' | 'right' } | null>(null);

  const createGradientStyle = (gradient: Gradient) => {
    const direction = gradient.direction || 'to right';
    const stops = gradient.stops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    return `linear-gradient(${direction}, ${stops})`;
  };

  const getStartColor = (gradient: Gradient) => {
    return gradient.stops[0]?.color || '#000000';
  };

  const getEndColor = (gradient: Gradient) => {
    return gradient.stops[gradient.stops.length - 1]?.color || '#ffffff';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gradients</h1>
          <p className="text-gray-600">
            Explore beautiful gradients for your projects or create your own gradient with the{' '}
            <a href="/tools/gradient-maker" className="text-blue-500 hover:text-blue-600 underline">
              Gradient Maker
            </a>
            .
          </p>
        </div>

        {/* Gradient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gradientData.map((gradient) => (
            <div
              key={gradient.id}
              className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Gradient Display */}
              <div
                className="w-full h-32 relative cursor-pointer"
                style={{ background: createGradientStyle(gradient) }}
              >
                {/* Left hover zone */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2 z-10"
                  onMouseEnter={() => setHoveredZone({ gradientId: gradient.id, zone: 'left' })}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div 
                    className={`absolute inset-y-0 left-0 flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${
                      hoveredZone?.gradientId === gradient.id && hoveredZone?.zone === 'left'
                        ? 'w-[120%] opacity-100' 
                        : 'w-0 opacity-0'
                    }`}
                    style={{ backgroundColor: getStartColor(gradient) }}
                  >
                    <span className="text-white font-mono text-lg font-semibold whitespace-nowrap drop-shadow-lg">
                      {getStartColor(gradient).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Right hover zone */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-10"
                  onMouseEnter={() => setHoveredZone({ gradientId: gradient.id, zone: 'right' })}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div 
                    className={`absolute inset-y-0 right-0 flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${
                      hoveredZone?.gradientId === gradient.id && hoveredZone?.zone === 'right'
                        ? 'w-[120%] opacity-100' 
                        : 'w-0 opacity-0'
                    }`}
                    style={{ backgroundColor: getEndColor(gradient) }}
                  >
                    <span className="text-white font-mono text-lg font-semibold whitespace-nowrap drop-shadow-lg">
                      {getEndColor(gradient).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no gradients found */}
        {gradientData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No gradients found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradientList;
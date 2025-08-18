import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRENDING_PALETTES } from '@/types';
import { Heart, ChevronRight, Search } from 'lucide-react';
import { colorUtils } from '@/utils/colorUtils';

const TrendingPalettes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePalettes, setVisiblePalettes] = useState(TRENDING_PALETTES);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setVisiblePalettes(TRENDING_PALETTES);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = TRENDING_PALETTES.filter(palette => 
      palette.name.toLowerCase().includes(term) ||
      palette.colors.some(color => color.toLowerCase().includes(term))
    );
    
    setVisiblePalettes(filtered);
  }, [searchTerm]);

  const handlePaletteClick = (palette: typeof TRENDING_PALETTES[0]) => {
    // Set the URL hash to load this palette
    const colorString = palette.colors
      .map(c => c.replace('#', ''))
      .join('-');
    
    // Navigate to the palette generator with the selected colors
    navigate(`/#/${colorString}`);
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-center">Trending Palettes</h1>
      <p className="mb-8 text-gray-600 text-center">
        Explore popular color combinations from the community
      </p>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search colors, names, or hex codes..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        </div>
      </div>

      {/* Palettes Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visiblePalettes.map((palette) => (
          <div
            key={palette.id}
            className="overflow-hidden transition-transform border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:scale-102 hover:cursor-pointer"
            onClick={() => handlePaletteClick(palette)}
          >
            {/* Palette Preview */}
            <div className="flex h-20">
              {palette.colors.map((color, idx) => (
                <div
                  key={`${palette.id}-color-${idx}`}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            {/* Palette Info */}
            <div className="flex items-center justify-between p-3">
              <div>
                <h3 className="font-medium text-gray-800">{palette.name}</h3>
                <p className="text-sm text-gray-500">{new Date(palette.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-sm text-gray-600">{formatLikes(palette.likes)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {visiblePalettes.length === 0 && (
        <div className="p-8 mt-8 text-center bg-gray-100 rounded-lg">
          <h3 className="mb-2 text-lg font-medium text-gray-800">No palettes found</h3>
          <p className="text-gray-600">
            Try using different search terms or colors
          </p>
        </div>
      )}

      {/* Featured Palettes */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Collections</h2>
          <button className="flex items-center text-blue-500 hover:text-blue-600">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <FeaturedCollection 
            title="Summer Vibes" 
            colors={['#FF9671', '#FFC75F', '#F9F871', '#00C9A7', '#845EC2']} 
          />
          <FeaturedCollection 
            title="Earthy Tones" 
            colors={['#8D5B4C', '#B96F50', '#D99771', '#F2C094', '#F6E3C5']} 
          />
          <FeaturedCollection 
            title="Ocean Blues" 
            colors={['#0081CF', '#00AFEF', '#4CC9F0', '#97D8C4', '#B8E0D4']} 
          />
        </div>
      </div>
    </div>
  );
};

// Featured Collection Component
const FeaturedCollection = ({ title, colors }: { title: string, colors: string[] }) => {
  return (
    <div className="overflow-hidden transition-transform border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:scale-102">
      <div className="flex h-24">
        {colors.map((color, idx) => (
          <div
            key={`featured-${title}-color-${idx}`}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">A curated collection of {colors.length} colors</p>
        <div className="flex mt-2 space-x-1">
          {colors.map((color, idx) => (
            <div 
              key={`featured-${title}-pill-${idx}`}
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: color,
                color: colorUtils.getTextColor(color)
              }}
            >
              {color.replace('#', '')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPalettes;
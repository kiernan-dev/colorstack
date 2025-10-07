import { useState, useMemo } from 'react';
import { colorData } from '@/utils/colorData';
import { Search } from 'lucide-react';

interface ColorItem {
  name: string;
  hex: string;
  category: string;
}

const ColorList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Shades');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All Shades', color: null },
    { name: 'Red', color: '#DC2626' },
    { name: 'Orange', color: '#EA580C' },
    { name: 'Brown', color: '#92400E' },
    { name: 'Yellow', color: '#CA8A04' },
    { name: 'Green', color: '#16A34A' },
    { name: 'Turquoise', color: '#0891B2' },
    { name: 'Blue', color: '#2563EB' },
    { name: 'Violet', color: '#7C3AED' },
    { name: 'Pink', color: '#DB2777' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#6B7280' },
    { name: 'Black', color: '#000000' }
  ];

  const filteredColors = useMemo(() => {
    let filtered = colorData;
    
    // Filter by category
    if (selectedCategory !== 'All Shades') {
      filtered = filtered.filter(color => color.category === selectedCategory);
    }
    
    // Filter by search query (only if 2+ characters)
    if (searchQuery.length >= 2) {
      filtered = filtered.filter(color => 
        color.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Colors</h1>
          <p className="text-gray-600">Browse our library of more than 500 color names.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search colors (min 2 characters)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.color && (
                <div 
                  className={`w-3 h-3 rounded-full mr-2 ${
                    category.name === 'White' ? 'border border-gray-300' : ''
                  }`}
                  style={{ backgroundColor: category.color }}
                />
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColors.map((color, index) => (
            <div
              key={`${color.name}-${index}`}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Color Swatch */}
              <div
                className="w-full h-32 rounded-t-lg"
                style={{ backgroundColor: color.hex }}
              />
              
              {/* Color Info */}
              <div className="p-3">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {color.name}
                </h3>
              </div>

              {/* Hex Value on Hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg">
                <span className="text-white font-mono text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {color.hex.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no colors found */}
        {filteredColors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery.length >= 2 
                ? `No colors found matching "${searchQuery}"`
                : "No colors found in this category."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorList;
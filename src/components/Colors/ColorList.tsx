import { useState, useMemo } from 'react';
import { colorData } from '@/utils/colorData';

interface ColorItem {
  name: string;
  hex: string;
  category: string;
}

const ColorList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Shades');

  const categories = [
    'All Shades',
    'Red',
    'Orange', 
    'Brown',
    'Yellow',
    'Green',
    'Turquoise',
    'Blue',
    'Violet',
    'Pink',
    'White',
    'Gray',
    'Black'
  ];

  const filteredColors = useMemo(() => {
    if (selectedCategory === 'All Shades') {
      return colorData;
    }
    return colorData.filter(color => color.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Colors</h1>
          <p className="text-gray-600">Browse our library of more than 500 color names.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
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
            <p className="text-gray-500">No colors found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorList;
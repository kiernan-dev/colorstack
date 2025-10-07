import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { colorUtils } from '@/utils/colorUtils';
import { Star, AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';

const ContrastChecker = () => {
  const [textColor, setTextColor] = useState('#112A46');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [showFixes, setShowFixes] = useState(false);
  const [fixMode, setFixMode] = useState<'text' | 'background'>('text');

  // Calculate contrast ratio and WCAG compliance
  const contrastData = useMemo(() => {
    const ratio = colorUtils.calculateContrast(textColor, backgroundColor);
    
    return {
      ratio: ratio.toFixed(2),
      normalText: colorUtils.getWCAGRating(ratio, false),
      largeText: colorUtils.getWCAGRating(ratio, true)
    };
  }, [textColor, backgroundColor]);

  // Generate accessible variations
  const suggestedFixes = useMemo(() => {
    if (!showFixes) return [];
    
    const targetColor = fixMode === 'text' ? textColor : backgroundColor;
    const contrastColor = fixMode === 'text' ? backgroundColor : textColor;
    
    const variations = [];
    
    // Generate 6 variations
    for (let i = 0.1; i <= 0.6; i += 0.1) {
      // Lighter
      const lighter = colorUtils.generateVariations(targetColor, 'tint', i);
      const lighterContrast = colorUtils.calculateContrast(
        fixMode === 'text' ? lighter : contrastColor,
        fixMode === 'text' ? contrastColor : lighter
      );
      
      // Darker
      const darker = colorUtils.generateVariations(targetColor, 'shade', i);
      const darkerContrast = colorUtils.calculateContrast(
        fixMode === 'text' ? darker : contrastColor,
        fixMode === 'text' ? contrastColor : darker
      );
      
      variations.push({
        color: lighter,
        contrast: lighterContrast,
        label: `Lighter +${Math.round(i * 100)}%`,
        rating: colorUtils.getWCAGRating(lighterContrast, false)
      });
      
      variations.push({
        color: darker,
        contrast: darkerContrast,
        label: `Darker +${Math.round(i * 100)}%`,
        rating: colorUtils.getWCAGRating(darkerContrast, false)
      });
    }
    
    // Sort by contrast ratio (highest first)
    return variations.sort((a, b) => b.contrast - a.contrast);
  }, [showFixes, fixMode, textColor, backgroundColor]);

  // Memoized event handlers
  const handleTextColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  }, []);

  const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  }, []);

  const handleFixClick = useCallback((color: string) => {
    if (fixMode === 'text') {
      setTextColor(color);
    } else {
      setBackgroundColor(color);
    }
    setShowFixes(false);
  }, [fixMode]);

  const handleFixModeText = useCallback(() => {
    setFixMode('text');
  }, []);

  const handleFixModeBackground = useCallback(() => {
    setFixMode('background');
  }, []);

  // Generate stars for ratings
  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-center">Color Contrast Checker</h1>
      <p className="mb-8 text-gray-600 text-center">
        Calculate the contrast ratio of text and background colors.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Color Inputs */}
          <div>
            <label className="block mb-2 text-sm font-medium">Text color</label>
            <div className="flex">
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="w-12 h-10 border border-gray-300 rounded-l-md cursor-pointer"
              />
              <input
                type="text"
                value={textColor.toUpperCase()}
                onChange={(e) => {
                  try {
                    const value = e.target.value;
                    if (value.startsWith('#') && (value.length === 4 || value.length === 7)) {
                      setTextColor(value);
                    }
                  } catch (error) {
                    console.error('Invalid color:', error);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={7}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Background color</label>
            <div className="flex">
              <input
                type="color"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
                className="w-12 h-10 border border-gray-300 rounded-l-md cursor-pointer"
              />
              <input
                type="text"
                value={backgroundColor.toUpperCase()}
                onChange={(e) => {
                  try {
                    const value = e.target.value;
                    if (value.startsWith('#') && (value.length === 4 || value.length === 7)) {
                      setBackgroundColor(value);
                    }
                  } catch (error) {
                    console.error('Invalid color:', error);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={7}
              />
            </div>
          </div>

          {/* Contrast Results */}
          <div className={`p-4 rounded-md ${Number(contrastData.ratio) >= 4.5 ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Contrast</h3>
              <span className="text-2xl font-bold">{contrastData.ratio}</span>
            </div>

            <div className="mb-2">
              <p className="font-medium">{contrastData.normalText.label}</p>
              <div className="flex">{renderStars(contrastData.normalText.stars)}</div>
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm font-medium">Small text</p>
                <div className="flex">
                  {renderStars(contrastData.normalText.stars)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Large text</p>
                <div className="flex">
                  {renderStars(contrastData.largeText.stars)}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              {Number(contrastData.ratio) < 4.5 ? (
                <div className="flex items-start">
                  <AlertCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-yellow-600" />
                  <p className="ml-2">
                    Good contrast for large text (≥24px) but poor contrast for small text.{' '}
                    <button
                      className="font-medium text-blue-600 underline"
                      onClick={() => {
                        setShowFixes(true);
                        setFixMode('text');
                      }}
                    >
                      Click to fix
                    </button>
                  </p>
                </div>
              ) : (
                <div className="flex items-start">
                  <Lightbulb className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-600" />
                  <p className="ml-2">
                    Good contrast for both small and large text! This combination meets WCAG AA standards.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div
          className="flex flex-col items-center justify-center p-6 overflow-hidden rounded-lg"
          style={{ backgroundColor, color: textColor, minHeight: '16rem' }}
        >
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Quote n. 7</h2>
            <p className="mb-4 text-lg">
              We are what we repeatedly do.<br />
              Excellence, then, is not an act but a habit.
            </p>
            <p className="text-base">- Aristotle</p>
          </div>
        </div>
      </div>

      {/* Suggested Fixes */}
      {showFixes && (
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">
              Suggested Fixes for {fixMode === 'text' ? 'Text' : 'Background'} Color
            </h3>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  fixMode === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={handleFixModeText}
              >
                Fix Text
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  fixMode === 'background' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={handleFixModeBackground}
              >
                Fix Background
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {suggestedFixes.map((fix, index) => (
              <button
                key={`fix-${index}`}
                className="flex flex-col items-center p-3 transition-transform border rounded-md hover:shadow-md hover:scale-105"
                onClick={() => handleFixClick(fix.color)}
              >
                <div
                  className="w-full h-16 mb-2 rounded-md"
                  style={{
                    backgroundColor: fix.color,
                    border: '1px solid #e5e7eb'
                  }}
                />
                <div className="text-sm font-medium">{fix.label}</div>
                <div className="flex items-center mt-1">
                  <span className="mr-1 text-xs text-gray-600">{fix.contrast.toFixed(2)}</span>
                  <div className="flex">
                    {renderStars(fix.rating.stars)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WCAG Information */}
      <div className="p-6 mt-12 bg-gray-100 rounded-lg">
        <h3 className="mb-4 text-xl font-bold">How does it work?</h3>
        <p className="mb-4">
          This tool follows the Web Content Accessibility Guidelines (WCAG), which are a series of recommendations for making the web more accessible.
          Regarding colors, the standard defines two levels of contrast ratio: AA (minimum contrast) and AAA (enhanced contrast).
        </p>
        <ul className="pl-6 mb-4 list-disc">
          <li>WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+).</li>
          <li>WCAG AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.</li>
        </ul>
        <p>
          <a
            href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
};

export default memo(ContrastChecker);
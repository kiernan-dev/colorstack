import { useState } from 'react';
import { X, FileText, Image as ImageIcon, Code, Copy, Check } from 'lucide-react';
import { colorUtils } from '@/utils/colorUtils';

interface ExportModalProps {
  colors: string[];
  onClose: () => void;
}

const ExportModal = ({ colors, onClose }: ExportModalProps) => {
  const [activeTab, setActiveTab] = useState('css');
  const [isCopied, setIsCopied] = useState(false);

  const exportOptions = [
    { id: 'css', label: 'CSS', icon: <Code className="w-5 h-5" /> },
    { id: 'image', label: 'Image', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'pdf', label: 'PDF', icon: <FileText className="w-5 h-5" /> },
  ];

  const generateCSS = () => {
    // Generate CSS variables
    let css = ':root {\n';
    colors.forEach((color, index) => {
      css += `  --color-${index + 1}: ${color};\n`;
    });
    css += '}';
    return css;
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Export Palette</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Color Preview */}
        <div className="flex mb-6 overflow-hidden rounded-md h-14">
          {colors.map((color, index) => (
            <div
              key={`preview-${index}`}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Export Options */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            {exportOptions.map((option) => (
              <button
                key={option.id}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === option.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(option.id)}
              >
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div>
          {activeTab === 'css' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">CSS Variables</h3>
                <button
                  className="flex items-center px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={handleCopyCSS}
                >
                  {isCopied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 overflow-auto text-sm bg-gray-100 rounded-md max-h-60">
                {generateCSS()}
              </pre>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="text-center">
              <p className="mb-4 text-gray-600">
                Download your palette as an image to use in your projects or share on social media.
              </p>
              <button className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Download PNG
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Pro subscribers can download in various formats and sizes.
              </p>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="text-center">
              <p className="mb-4 text-gray-600">
                Export a professional PDF document with your color palette and additional information.
              </p>
              <button className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Download PDF
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Pro subscribers get enhanced PDF exports with color psychology and accessibility insights.
              </p>
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 text-right border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
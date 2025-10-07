import { Copy, Download, Save, Undo, RefreshCw, Share2, Image, Layout, Sliders } from 'lucide-react';
import { toast } from 'sonner';

interface PaletteToolbarProps {
  onExport: () => void;
  onGenerate: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

const PaletteToolbar = ({
  onExport,
  onGenerate,
  onUndo,
  canUndo
}: PaletteToolbarProps) => {
  const handleSave = () => {
    // In a real app, this would save to a user account
    // For this demo, we'll show a toast that simulates login
    toast.info('To save your palette, please sign up or log in');
  };

  const handleShare = () => {
    // Share functionality - copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Palette URL copied to clipboard');
  };

  return (
    <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <button 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          onClick={onExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
        
        <button 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          onClick={handleSave}
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
        
        <button 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            canUndo 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo
        </button>
        
        <button 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          onClick={onGenerate}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate
        </button>
      </div>
    </div>
  );
};

export default PaletteToolbar;
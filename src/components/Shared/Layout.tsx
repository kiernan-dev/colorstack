import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Layout = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we're on the palette generator page
  const isPaletteGenerator = location.pathname === '/';

  const handleToolsClick = () => {
    setIsToolsOpen(!isToolsOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toolsOptions = [
    { id: 'contrast-checker', name: 'Contrast Checker', path: '/tools/contrast-checker' },
    { id: 'gradient-maker', name: 'Gradient Maker', path: '/tools/gradient-maker' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          COOLORS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={handleToolsClick}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
            >
              Tools <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {isToolsOpen && (
              <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-1">
                  {toolsOptions.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trending */}
          <Link
            to="/trending"
            className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          >
            Trending
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-16 bg-white md:hidden">
          <div className="flex flex-col p-4 space-y-4 overflow-y-auto">
            <Link
              to="/"
              className="px-3 py-2 text-lg font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Palette Generator
            </Link>
            
            {toolsOptions.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="px-3 py-2 text-lg font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
            
            <Link
              to="/trending"
              className="px-3 py-2 text-lg font-medium text-gray-700 transition-colors rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trending
            </Link>
            
            <button className="w-full px-4 py-2 text-lg font-medium text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-100">
              Go Pro
            </button>
            
            <button className="w-full px-4 py-2 text-lg font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
              Sign up
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer (only show on non-palette generator pages) */}
      {!isPaletteGenerator && (
        <footer className="py-8 mt-auto bg-gray-100">
          <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2 md:px-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-900">
                    Generate your palettes
                  </Link>
                </li>
                <li>
                  <Link to="/tools/contrast-checker" className="text-gray-600 hover:text-gray-900">
                    Contrast checker
                  </Link>
                </li>
                <li>
                  <Link to="/tools/gradient-maker" className="text-gray-600 hover:text-gray-900">
                    Gradient maker
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/trending" className="text-gray-600 hover:text-gray-900">
                    Explore trending palettes
                  </Link>
                </li>
                <li>
                  <Link to="/color-list" className="text-gray-600 hover:text-gray-900">
                    List of colors
                  </Link>
                </li>
                <li>
                  <Link to="/gradients" className="text-gray-600 hover:text-gray-900">
                    Browse gradients
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="container px-4 pt-6 mx-auto mt-6 text-center border-t border-gray-200 md:px-6">
            <p className="text-gray-600">
              © 2025 Coolors Replica. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
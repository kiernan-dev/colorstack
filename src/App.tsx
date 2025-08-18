import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layout and pages
import Layout from '@/components/Shared/Layout';
import PaletteGenerator from '@/components/PaletteGenerator/PaletteGenerator';
import ContrastChecker from '@/components/Tools/ContrastChecker';
import GradientMaker from '@/components/Tools/GradientMaker';
import TrendingPalettes from '@/components/Community/TrendingPalettes';
import ColorList from '@/components/Colors/ColorList';
import GradientList from '@/components/Gradients/GradientList';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <PaletteGenerator />
        },
        {
          path: 'tools/contrast-checker',
          element: <ContrastChecker />
        },
        {
          path: 'tools/gradient-maker',
          element: <GradientMaker />
        },
        {
          path: 'trending',
          element: <TrendingPalettes />
        },
        {
          path: 'color-list',
          element: <ColorList />
        },
        {
          path: 'gradients',
          element: <GradientList />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-3xl font-bold text-blue-500">Loading Coolors...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;

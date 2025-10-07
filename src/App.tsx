import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

// Layout and pages
import Layout from '@/components/Shared/Layout';
import PaletteGenerator from '@/components/PaletteGenerator/PaletteGenerator';
import ContrastChecker from '@/components/Tools/ContrastChecker';
import GradientMaker from '@/components/Tools/GradientMaker';
import TrendingPalettes from '@/components/Community/TrendingPalettes';
import ColorList from '@/components/Colors/ColorList';
import GradientList from '@/components/Gradients/GradientList';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
          element: (
            <ErrorBoundary>
              <PaletteGenerator />
            </ErrorBoundary>
          )
        },
        {
          path: 'tools/contrast-checker',
          element: (
            <ErrorBoundary>
              <ContrastChecker />
            </ErrorBoundary>
          )
        },
        {
          path: 'tools/gradient-maker',
          element: (
            <ErrorBoundary>
              <GradientMaker />
            </ErrorBoundary>
          )
        },
        {
          path: 'trending',
          element: (
            <ErrorBoundary>
              <TrendingPalettes />
            </ErrorBoundary>
          )
        },
        {
          path: 'color-list',
          element: (
            <ErrorBoundary>
              <ColorList />
            </ErrorBoundary>
          )
        },
        {
          path: 'gradients',
          element: (
            <ErrorBoundary>
              <GradientList />
            </ErrorBoundary>
          )
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ], {
    basename: import.meta.env.PROD ? '/colorstack' : undefined
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-3xl font-bold text-blue-500">Loading ColorStack...</div>
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
      <Toaster />
    </>
  );
}

export default App;

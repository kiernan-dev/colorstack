import { useRef, useCallback, useEffect } from 'react';

interface WorkerMessage {
  type: string;
  data: any;
  id: string;
}

interface UseColorWorkerReturn {
  calculateContrast: (color1: string, color2: string) => Promise<any>;
  generateFixes: (targetColor: string, contrastColor: string, fixMode: 'text' | 'background') => Promise<any>;
  generateAllVariations: (baseColor: string) => Promise<any>;
}

export const useColorWorker = (): UseColorWorkerReturn => {
  const workerRef = useRef<Worker | null>(null);
  const pendingRequestsRef = useRef<Map<string, { resolve: (value: any) => void; reject: (reason: any) => void }>>(new Map());

  // Initialize worker
  useEffect(() => {
    try {
      workerRef.current = new Worker('/colorWorker.js');
      
      workerRef.current.onmessage = (event: MessageEvent) => {
        const { type, data, id } = event.data as WorkerMessage;
        const pendingRequest = pendingRequestsRef.current.get(id);
        
        if (pendingRequest) {
          pendingRequestsRef.current.delete(id);
          
          if (type === 'ERROR') {
            pendingRequest.reject(new Error(data.message));
          } else {
            pendingRequest.resolve(data);
          }
        }
      };

      workerRef.current.onerror = (error) => {
        console.error('Worker error:', error);
        // Reject all pending requests
        pendingRequestsRef.current.forEach(({ reject }) => {
          reject(new Error('Worker error'));
        });
        pendingRequestsRef.current.clear();
      };
    } catch (error) {
      console.error('Failed to create worker:', error);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      pendingRequestsRef.current.clear();
    };
  }, []);

  const sendMessage = useCallback((type: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error('Worker not available'));
        return;
      }

      const id = Math.random().toString(36).substr(2, 9);
      pendingRequestsRef.current.set(id, { resolve, reject });

      workerRef.current.postMessage({ type, data, id });

      // Set timeout for requests
      setTimeout(() => {
        if (pendingRequestsRef.current.has(id)) {
          pendingRequestsRef.current.delete(id);
          reject(new Error('Worker request timeout'));
        }
      }, 10000); // 10 second timeout
    });
  }, []);

  const calculateContrast = useCallback((color1: string, color2: string) => {
    return sendMessage('CALCULATE_CONTRAST', { color1, color2 });
  }, [sendMessage]);

  const generateFixes = useCallback((targetColor: string, contrastColor: string, fixMode: 'text' | 'background') => {
    return sendMessage('GENERATE_FIXES', { targetColor, contrastColor, fixMode });
  }, [sendMessage]);

  const generateAllVariations = useCallback((baseColor: string) => {
    return sendMessage('GENERATE_ALL_VARIATIONS', { baseColor });
  }, [sendMessage]);

  return {
    calculateContrast,
    generateFixes,
    generateAllVariations
  };
};
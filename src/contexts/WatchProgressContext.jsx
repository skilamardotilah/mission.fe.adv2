import { createContext, useContext, useState, useEffect } from 'react';

const WatchProgressContext = createContext();

export const useWatchProgress = () => {
  const context = useContext(WatchProgressContext);
  if (!context) {
    throw new Error('useWatchProgress must be used within a WatchProgressProvider');
  }
  return context;
};

export const WatchProgressProvider = ({ children }) => {
  const [watchProgress, setWatchProgress] = useState(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('watchProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever watchProgress changes
  useEffect(() => {
    localStorage.setItem('watchProgress', JSON.stringify(watchProgress));
  }, [watchProgress]);

  const startWatching = (itemId, type = 'film') => {
    setWatchProgress(prev => ({
      ...prev,
      [itemId]: {
        id: itemId,
        type,
        progress: 0,
        startedAt: new Date().toISOString(),
        lastWatchedAt: new Date().toISOString()
      }
    }));
  };

  const updateProgress = (itemId, progress) => {
    setWatchProgress(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        progress: Math.min(100, Math.max(0, progress)),
        lastWatchedAt: new Date().toISOString()
      }
    }));
  };

  const removeProgress = (itemId) => {
    setWatchProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[itemId];
      return newProgress;
    });
  };

  const getProgress = (itemId) => {
    return watchProgress[itemId] || null;
  };

  const hasProgress = (itemId) => {
    return !!watchProgress[itemId];
  };

  return (
    <WatchProgressContext.Provider value={{
      watchProgress,
      startWatching,
      updateProgress,
      removeProgress,
      getProgress,
      hasProgress
    }}>
      {children}
    </WatchProgressContext.Provider>
  );
};

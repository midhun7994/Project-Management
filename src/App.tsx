import React, { useEffect } from 'react';
import { AppRoutes } from './router';
import { useAuthStore } from './features/auth/authStore';
import BackgroundVideo from './components/common/BackgroundVideo';

const App: React.FC = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <BackgroundVideo />
      <AppRoutes />
    </>
  );
};

export default App;
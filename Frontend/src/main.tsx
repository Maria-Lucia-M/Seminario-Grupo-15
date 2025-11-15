import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/authProvider.tsx';
import { RescatistaProvider } from './rescatista/rescatistaProvider.tsx';
import { AnimalProvider } from './animal/animalProvider.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <RescatistaProvider>
      <AnimalProvider>
        <App />
      </AnimalProvider>
      </RescatistaProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/authProvider.tsx';
import { RescatistaProvider } from './rescatista/rescatistaProvider.tsx';
import { AnimalProvider } from './animal/animalProvider.tsx';
import App from './App.tsx';

// Estilos y JS globales de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
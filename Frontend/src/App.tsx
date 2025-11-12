import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HomeAdoptante from './pages/Adoptante/HomeAdoptante.tsx';
import Login from './pages/Login/Login.tsx';
import Signup from './pages/Signup/Signup.tsx';

//Rutas casos de uso
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';

//Rutas CRUDs
//Agueguen aca...

function App() {
  return (
    <Routes>
      {/* Rutas de logueo */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Rutas Home */}
      <Route path="/trabajadores/homePage" element={<HomePage />} />
      <Route path="/adoptantes/homeAdoptante" element={<HomeAdoptante />} />
      
      {/* Rutas CUU */}
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
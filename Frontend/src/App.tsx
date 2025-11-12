import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HomeAdoptante from './pages/Adoptante/HomeAdoptante.tsx';
import Login from './pages/Login/Login.tsx';
import Signup from './pages/Signup/Signup.tsx';


//Rutas casos de uso
import ColocacionVacunas from './pages/CUU4/ColocVacunas.tsx';
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';
import AltaEntrevistaPage from './pages/CUU5-AltaEntrevista/AltaEntrevistaPage';
import EntrevistaListPage from './pages/CUU5-AltaEntrevista/ListarEntrevistas'; 
import AltaAnimal from './pages/CUU1-AltaAnimal/AltaPage.tsx';

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
      <Route path="/cuu/colocacion-vacunas" element={<ColocacionVacunas />} />
      <Route path="/cuu/alta-entrevista" element={<AltaEntrevistaPage />} />
      <Route path="/cuu/listar-entrevistas" element={<EntrevistaListPage />} />
      <Route path="/cuu/registro-animal" element={<AltaAnimal />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
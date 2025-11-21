import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomeAdoptante from './pages/Adoptante/HomeAdoptante.tsx';
import Login from './pages/Login/Login.tsx';
import Signup from './pages/Signup/Signup.tsx';
import ColocacionVacunas from './pages/CUU4/ColocVacunas.tsx';
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';
import AltaEntrevistaPage from './pages/CUU5-AltaEntrevista/AltaEntrevistaPage';
import EntrevistaListPage from './pages/CUU5-AltaEntrevista/ListarEntrevistas'; 
import AltaAnimal from './pages/CUU1-AltaAnimal/AltaPage.tsx';
import { ValidaRescatista } from './pages/CUU-Rescate/validaRescatista.tsx';
import { IngresoRescatista } from './pages/CUU-Rescate/ingresoRescatista.tsx';
import { RegistrarRescate } from './pages/CUU-Rescate/registrarRescate.tsx';
import { CargaProvisoriaAnimal } from './pages/CUU-Rescate/cargaProvisoriaAnimal.tsx';
import ListadoAnimales from './pages/Adoptar/ListadoAnimales';
import DetalleAnimal from './pages/Adoptar/DetalleAnimal';
import Home from './components/Home';
import ListaNegra from './pages/CUU3-ListaNegra/ListaNegra';


function App() {
  return (
    <Routes>
      {/* Ruta raíz amigable hacia HomePage pública sin funcionalidad */}
      <Route path="/" element={<HomePage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Home previas conservadas por compatibilidad */}
      <Route path="/trabajadores/homePage" element={<HomePage />} />
      <Route path="/adoptantes/homeAdoptante" element={<HomeAdoptante />} />

      {/* Ruta que muestra el Home con CRUDs (destino del login) */}
      <Route path="/administrador/home" element={<Home />} />

      {/* Lista Negra */}
      <Route path="/cuu/lista-negra" element={<ListaNegra />} />

      {/* Público */}
      <Route path="/adoptar" element={<ListadoAnimales />} />
      <Route path="/adoptar/detalle/:id" element={<DetalleAnimal />} />

      {/* Casos de uso */}
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      <Route path="/cuu/valida-rescatista" element={<ValidaRescatista />} />
      <Route path="/cuu/ingreso-rescatista" element={<IngresoRescatista />} />
      <Route path="/cuu/rescate" element={<RegistrarRescate />} />
      <Route path="/cuu/CargaProvisoriaAnimal" element={<CargaProvisoriaAnimal />} />
      <Route path="/cuu/colocacion-vacunas" element={<ColocacionVacunas />} />
      <Route path="/cuu/alta-entrevista" element={<AltaEntrevistaPage />} />
      <Route path="/cuu/listar-entrevistas" element={<EntrevistaListPage />} />
      <Route path="/cuu/registro-animal" element={<AltaAnimal />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

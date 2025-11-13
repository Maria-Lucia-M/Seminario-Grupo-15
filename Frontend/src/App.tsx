import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
<<<<<<< HEAD
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
import PanelAdmin from './pages/Administrador/panelAdmin.tsx';
import { PrivateRoute } from './pages/Administrador/PrivateRoutes.tsx';
import ListaNegraPage from './pages/CUU-ListaNegra/ListaNegraPage.tsx';
=======
import ListaNegraPage from './pages/ListaNegraPage';
>>>>>>> 7dd6bb806760a13fc91f63e65ced966d092e8bba

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Home */}
      <Route path="/trabajadores/homePage" element={<HomePage />} />
      <Route path="/adoptantes/homeAdoptante" element={<HomeAdoptante />} />

      {/* Casos de uso */}
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      <Route path="/cuu/valida-rescatista" element={<ValidaRescatista />} />
      <Route path="/cuu/ingreso-rescatista" element={<IngresoRescatista />} />
      <Route path="/cuu/rescate" element={<RegistrarRescate />} />
      <Route path="/cuu/colocacion-vacunas" element={<ColocacionVacunas />} />
      <Route path="/cuu/alta-entrevista" element={<AltaEntrevistaPage />} />
      <Route path="/cuu/listar-entrevistas" element={<EntrevistaListPage />} />
      <Route path="/cuu/registro-animal" element={<AltaAnimal />} />
      <Route path="/cuu/lista-negra" element={<ListaNegraPage />} />

      {/* Solo administrador */}
      <Route
        path="/admin/panel"
        element={
          <PrivateRoute allowedRoles={["Administrador"]}>
            <PanelAdmin />
          </PrivateRoute>
        }
      />
=======
      <Route path="/" element={<HomePage />} />
      <Route path="/cuu/lista-negra" element={<ListaNegraPage />} />
      {/* otras rutas */}
>>>>>>> 7dd6bb806760a13fc91f63e65ced966d092e8bba
    </Routes>
  );
}

export default App;


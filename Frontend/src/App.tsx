import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

//Rutas casos de uso
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';
import AltaEntrevistaPage from './pages/CUU5-AltaEntrevista/AltaEntrevistaPage';
import EntrevistaListPage from './pages/CUU5-AltaEntrevista/ListarEntrevistas'; 

//Rutas CRUDs
//Agueguen aca...

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      <Route path="/cuu/alta-entrevista" element={<AltaEntrevistaPage />} />
      <Route path="/cuu/listar-entrevistas" element={<EntrevistaListPage />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
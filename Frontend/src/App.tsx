import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


//Rutas casos de uso
import ColocacionVacunas from './pages/CUU4/ColocVacunas.tsx';
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';

//Rutas CRUDs
//Agueguen aca...

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cuu/colocacion-vacunas" element={<ColocacionVacunas />} />
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
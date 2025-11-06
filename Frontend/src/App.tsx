import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

//Rutas casos de uso
import RegistrarSeguimiento from './pages/CUU-Seguimiento/SeguimientoPage';

//Rutas CRUDs
//Agueguen aca...

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cuu/registrar-seguimiento" element={<RegistrarSeguimiento />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
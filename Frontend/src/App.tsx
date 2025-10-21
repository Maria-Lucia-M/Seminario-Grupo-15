import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { IngresoRescatista } from './pages/IngresoRescatista/ingresoRescatista';
import { ValidaRescatista } from './pages/ValidaRescatista/validaRescatista';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/valida-rescatista" element={<ValidaRescatista />} />
      <Route path="/ingreso-rescatista" element={<IngresoRescatista />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
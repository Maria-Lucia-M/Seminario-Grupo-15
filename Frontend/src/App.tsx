import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CUU4Page from './pages/CUU4-Page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cuu/colocacion-vacunas" element={<CUU4Page />} />
      {/* otras rutas */}
    </Routes>
  );
}

export default App;
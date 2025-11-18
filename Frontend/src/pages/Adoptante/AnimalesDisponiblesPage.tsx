import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../rutasGenericas.ts';
import { useNavigate } from 'react-router-dom';

interface Animal {
  nro: number;
  especie: string;
  raza: string;
  edad_estimada: number;
  fecha_ingreso: string;
  fecha_defuncion: string | null;
  estado: string;
  imagen: string; // CSV de URLs según repo
  video: string | null;
}

const AnimalesDisponiblesPage: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const cargarAnimales = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/animales`);
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const filtrados = data.filter((a: Animal) => a.estado === 'disponible' || a.estado === 'En adopcion');
      setAnimales(filtrados);
    } catch (e: any) {
      console.error('Error al obtener animales:', e);
      setError(e.response?.data?.message || 'Error al cargar animales');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarAnimales();
  }, [cargarAnimales]);

  const animalesFiltrados = animales.filter(a => {
    if (!busqueda.trim()) return true;
    const texto = busqueda.toLowerCase();
    return (
      a.especie.toLowerCase().includes(texto) ||
      a.raza.toLowerCase().includes(texto) ||
      String(a.nro).includes(texto)
    );
  });

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Animales disponibles para adopción</h1>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Volver</button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por especie, raza o número"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {loading && <p>Cargando animales...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && animalesFiltrados.length === 0 && (
        <div className="alert alert-info">No hay animales disponibles en este momento.</div>
      )}

      <div className="row g-4">
        {animalesFiltrados.map(animal => {
          const imagenes = animal.imagen ? animal.imagen.split(',').filter(Boolean) : [];
          return (
            <div key={animal.nro} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {imagenes[0] && (
                  <img src={imagenes[0]} alt={`Animal ${animal.nro}`} className="card-img-top" style={{ objectFit: 'cover', height: '200px' }} />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{animal.especie} - {animal.raza}</h5>
                  <p className="text-muted mb-2">Nro: {animal.nro}</p>
                  <p className="mb-2">Edad estimada: {animal.edad_estimada} años</p>
                  <span className="badge bg-success mb-3">{animal.estado}</span>
                  <button className="btn btn-primary mt-auto" onClick={() => navigate(`/adoptantes/animal/${animal.nro}`)}>Ver detalle</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimalesDisponiblesPage;


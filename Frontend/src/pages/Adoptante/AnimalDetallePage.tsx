import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../rutasGenericas.ts';

interface Animal {
  nro: number;
  especie: string;
  raza: string;
  edad_estimada: number;
  fecha_ingreso: string | Date;
  fecha_defuncion: string | Date | null;
  estado: string;
  imagen: string; // CSV
  video: string | null;
}

const badgeClase = (estado: string) => {
  const e = estado.toLowerCase();
  if (e.includes('adoptado')) return 'bg-secondary';
  if (e.includes('en adop') || e.includes('disponible')) return 'bg-success';
  if (e.includes('no apto') || e.includes('no_disponible')) return 'bg-danger';
  return 'bg-primary';
};

const formatearFecha = (f: string | Date | null): string => {
  if (!f) return '—';
  try {
    const d = typeof f === 'string' ? new Date(f) : f;
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString();
  } catch { return '—'; }
};

const AnimalDetallePage: React.FC = () => {
  const { nro } = useParams<{ nro: string }>();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cargarAnimal = useCallback(async () => {
    if (!nro) return;
    const nroNum = parseInt(nro, 10);
    if (isNaN(nroNum)) {
      setError('Número de animal inválido');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/animales/${nroNum}`);
      // El controlador devuelve { message, data } en getOneAnimal
      const data = res.data?.data || res.data;
      setAnimal(data as Animal);
    } catch (e: any) {
      console.error('Error al obtener detalle:', e);
      if (e.response?.status === 404) {
        setError('Animal no encontrado');
      } else {
        setError(e.response?.data?.message || 'Error al cargar el animal');
      }
    } finally {
      setLoading(false);
    }
  }, [nro]);

  useEffect(() => { cargarAnimal(); }, [cargarAnimal]);

  const imagenes = animal?.imagen ? animal.imagen.split(',').filter(Boolean) : [];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Detalle del animal</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/adoptantes/animales-disponibles')}>Volver a la lista</button>
          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Atrás</button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {error && !loading && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && animal && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-lg-5 mb-3 mb-lg-0">
                {imagenes.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    <img
                      src={imagenes[0]}
                      alt={`Principal ${animal.nro}`}
                      style={{ objectFit: 'cover', width: '100%', height: '300px', borderRadius: '8px' }}
                    />
                    {imagenes.length > 1 && (
                      <div className="d-flex flex-wrap gap-2">
                        {imagenes.slice(1).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Extra ${i + 1}`}
                            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{height: '300px', borderRadius: '8px'}}>
                    <span className="text-muted">Sin imágenes</span>
                  </div>
                )}
                {animal.video && (
                  <div className="mt-3">
                    <video controls style={{ width: '100%', borderRadius: '8px' }}>
                      <source src={animal.video} />
                      Tu navegador no soporta video.
                    </video>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-7">
                <h2 className="h5">{animal.especie} - {animal.raza}</h2>
                <span className={`badge ${badgeClase(animal.estado)} mb-3`}>{animal.estado}</span>
                <ul className="list-group mb-3">
                  <li className="list-group-item"><strong>Número:</strong> {animal.nro}</li>
                  <li className="list-group-item"><strong>Edad estimada:</strong> {animal.edad_estimada} años</li>
                  <li className="list-group-item"><strong>Fecha ingreso:</strong> {formatearFecha(animal.fecha_ingreso)}</li>
                  <li className="list-group-item"><strong>Fecha defunción:</strong> {formatearFecha(animal.fecha_defuncion)}</li>
                </ul>
                <div className="alert alert-info">
                  Esta ficha se muestra de forma informativa. Próximamente podrás iniciar el proceso de adopción desde aquí.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !animal && (
        <div className="alert alert-warning">No se encontró el animal solicitado.</div>
      )}
    </div>
  );
};

export default AnimalDetallePage;


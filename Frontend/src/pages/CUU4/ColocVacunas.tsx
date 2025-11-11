import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../rutasGenericas.ts";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./colocVacunas.css";

interface Vacuna {
  nro_vacuna: number;
  nombre: string;
  droga: {
    nombre: string;
    descripcion: string;
  }[];
}

export default function ColocacionVacunas() {
  const [vacunas, setVacunas] = useState<Vacuna[] | null>([]);
  const [selectedVacunas, setSelectedVacunas] = useState<Vacuna[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nroAnimal, setNroAnimal] = useState("");
  const fechaActual = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacunas = async () => {
      try {
        const response = await axios.get(`${API_URL}/vacunas`);
        setVacunas(response.data);
      } catch (error) {
        console.error("Error al obtener vacunas:", error);
      }
    };

    fetchVacunas();
  }, []);
  
  const cambiarSeleccion = (vacuna: Vacuna) => {
    setSelectedVacunas((prev) => {
      const yaSeleccionada = prev.find((v) => v.nro_vacuna === vacuna.nro_vacuna);
      if (yaSeleccionada) {
        return prev.filter((v) => v.nro_vacuna !== vacuna.nro_vacuna);
      } else {
        return [...prev, vacuna];
      }
    });
  };

  const validarSeleccion = async () => {
  try {
      await axios.post(`${API_URL}/vacunas/validar`, {
      vacunas: selectedVacunas.map(v => v.nro_vacuna),
    });
    setMostrarModal(true);
  } catch (error: unknown) {
  if (error instanceof Error) {
    alert("Error en la validacion de vacunas");
    }}
  };

  const registrarFichaMedica = async () => {
    try {
      await axios.post(`${API_URL}/fichasMed`, {
        nro_animal: parseInt(nroAnimal, 10),
        matricula,
        nro_vacunas: selectedVacunas.map((v) => v.nro_vacuna),
        observaciones,
        fecha: fechaActual,
      });
      alert("Ficha médica registrada con éxito");
      setMostrarModal(false);
      setSelectedVacunas([]);
      setObservaciones("");
      setMatricula("");
      setNroAnimal("");
    } catch (error: unknown) {
      if (error instanceof Error) alert("Error: " + error.message);
    }
  };

  return (
    <section className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Colocación de vacunas</h2>
        <h3 className="text-muted">Seleccione las vacunas necesarias</h3>
        <ul className="list-group mb-3">
          {(!vacunas || !Array.isArray(vacunas)) ? (
          <div className="text-center">
           <h2 className="text-secondary">No hay vacunas registradas...</h2>           
            <button className="btn btn-outline-primary mt-3" onClick={() => navigate("/")}>Volver</button>
          </div>
          ) : (
            vacunas.map((v) => {
              const seleccionada = selectedVacunas.some(
                (sel) => sel.nro_vacuna === v.nro_vacuna
              );
              return (
                <li className={`list-group-item d-flex justify-content-between align-items-center ${
                    seleccionada ? "list-group-item-success" : ""
                  }`} key={v.nro_vacuna}>
                  N° {v.nro_vacuna}: {v.nombre}
                  <button
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                    seleccionada ? "list-group-item-success" : ""
                  }`}
                    onClick={() => cambiarSeleccion(v)}
                  >
                    {seleccionada ? "Seleccionada ✓" : "Seleccionar"}
                  </button>
                </li>
              )}))}
        </ul>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary" onClick={() => validarSeleccion()}>Seleccionar</button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>Volver</button>
        </div>
      </div>
      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Ficha Médica</h5>
                  <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}>
                  </button>
              </div>
              <div className="modal-body">
                <p className="text-center">
                  <strong>Fecha:</strong> {fechaActual}
                </p>
                <ul className="list-group mb-3">
                  <p>Vacunas colocadas:</p>
                  {selectedVacunas.map((v) => (
                    <li key={v.nro_vacuna} className="list-group-item">
                      N° {v.nro_vacuna} - {v.nombre}
                    </li>
                  ))}
                </ul>

                <div className="mb-3">
                  <label className="form-label">Matrícula del Veterinario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">N° de Animal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nroAnimal}
                    onChange={(e) => setNroAnimal(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Observaciones</label>
                  <textarea
                    className="form-control"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={registrarFichaMedica}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
    )}
    </section>
  );
};

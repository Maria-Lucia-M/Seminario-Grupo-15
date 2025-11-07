import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./colocVacunas.css";

interface Vacuna {
  nro_vacuna: number;
  droga: {
    nombre: string;
    descripcion: string;
  }[];
}

const ColocacionVacunas = () => {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [selectedVacunas, setSelectedVacunas] = useState<Vacuna[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [observaciones, setObservaciones] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nroAnimal, setNroAnimal] = useState("");
  const fechaActual = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerVacunas = async () => {
      try {
        const response = await api.get("/vacunas");
        setVacunas(response.data);
      } catch (error) {
        console.error("Error al obtener vacunas:", error);
      }
    };
    obtenerVacunas();
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
    const response = await api.post("/vacunas/validar", {
      vacunas: selectedVacunas.map(v => v.nro_vacuna),
    });
    setMostrarModal(true);
    alert(response.data.message);
  } catch (error: unknown) {
  if (error instanceof Error) {
    alert("Error en la validacion de vacunas");
  }}
}

  const registrarFichaMedica = async () => {
    try {
      await api.post("/fichasMed", {
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
    <section className="colocacion-vacunas-section">
      <div>
        <h2 className="seleccion-vacunas-titulo">Vacunas registradas</h2>
        <h3 className="subtitulo-vacunas">Seleccione las vacunas necesarias</h3>
        <ul className="lista-vacunas">
          {vacunas.map((v) => {
            const seleccionada = selectedVacunas.some(
              (sel) => sel.nro_vacuna === v.nro_vacuna
            );
            return (
              <li className="nombre-vacunas" key={v.nro_vacuna}>
                N° {v.nro_vacuna}: {v.droga.map((d) => d.nombre).join(", ")}
                <button
                  className={`seleccionar-vacuna ${seleccionada ? "activo" : ""}`}
                  onClick={() => cambiarSeleccion(v)}
                >
                  {seleccionada ? "✓" : "-"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button className="boton-seleccionar" onClick={() => validarSeleccion()}>Seleccionar</button>
        <button className="boton-volver-inicio" onClick={() => navigate("/")}>Volver</button>
      </div>
      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Ficha Médica</h2>
            <p><strong>Vacunas seleccionadas | fecha: {fechaActual}</strong></p>
            <ul>
              {selectedVacunas.map((v) => (
                <li key={v.nro_vacuna}>
                N° {v.nro_vacuna} - {v.droga.map((d) => d.nombre).join(", ")}
                </li>
              ))}
            </ul>
            <form>
              <label>
                Matrícula del Veterinario:
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </label>
              <label>
                N° de Animal:
                <input
                  type="text"
                  value={nroAnimal}
                  onChange={(e) => setNroAnimal(e.target.value)}
                />
              </label>
            </form>
            <label>
              Observaciones:
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </label>

            <div>
              <button onClick={registrarFichaMedica}>Registrar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ColocacionVacunas;

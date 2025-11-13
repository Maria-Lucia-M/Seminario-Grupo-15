import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../rutasGenericas";

interface Estado {
  apto: boolean;
  no_apto: boolean;
  en_adopcion: boolean;
  adoptado: boolean;
  disponible: boolean;
  no_disponible: boolean;
}

interface Animal {
  nro: string;
  raza: string;
  edad_estimada: string;
  fecha_ingreso: string;
  fecha_defuncion: string | null;
  estado: Estado;
  imagen: string[];
  video: string[];
  vacunas?: string[];
}

export default function AltaAnimal() {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("");

  // Cargar animales desde el backend
  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/animales`);
        setAnimales(data);
      } catch {
        Swal.fire("Error", "No se pudieron cargar los animales", "error");
      }
    };
    fetchAnimales();
  }, []);

  const handleFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiltroEstado(e.target.value);
  };

  const filtrarAnimales = () => {
    if (!filtroEstado) return animales;
    return animales.filter((a) => a.estado[filtroEstado as keyof Estado]);
  };

  const handleSeleccionarAnimal = async (animal: Animal) => {
    if (!animal.estado.no_apto) return;

    const { isConfirmed } = await Swal.fire({
      title: "¿Terminó su período de adaptación?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    const tieneVacunas = animal.vacunas && animal.vacunas.length > 0;
    const noFallecido = !animal.fecha_defuncion;

    if (tieneVacunas && noFallecido) {
      const actualizado: Animal = {
        ...animal,
        estado: {
          apto: true,
          no_apto: false,
          en_adopcion: false,
          adoptado: false,
          disponible: false,
          no_disponible: false,
        },
      };

      try {
        await axios.put(`${API_URL}/animales/${animal.nro}`, actualizado);
        setAnimales((prev) =>
          prev.map((a) => (a.nro === animal.nro ? actualizado : a))
        );
        Swal.fire("Éxito", "El animal ahora está marcado como Apto", "success");
      } catch {
        Swal.fire("Error", "No se pudo actualizar el estado del animal", "error");
      }
    } else {
      Swal.fire(
        "Condiciones no cumplidas",
        "El animal debe tener al menos una vacuna y no estar fallecido",
        "warning"
      );
    }
  };

  const generarKey = (animal: Animal) => {
    return animal.nro || `${animal.raza}-${animal.fecha_ingreso}-${Math.random().toString(36).slice(2)}`;
  };

  const getColorEstado = (estado: Estado) => {
    if (estado.no_apto) return "table-danger";
    if (estado.no_disponible) return "table-secondary";
    if (estado.disponible) return "table-primary";
    if (estado.apto) return "table-warning";
    if (estado.adoptado) return "table-success";
    return "";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Listado de animales</h2>

      <div className="mb-4 text-center">
        <label className="form-label me-2">Filtrar por estado:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={filtroEstado}
          onChange={handleFiltroChange}
        >
          <option value="">Todos</option>
          <option value="apto">Apto</option>
          <option value="no_apto">No Apto</option>
          <option value="en_adopcion">En Adopción</option>
          <option value="adoptado">Adoptado</option>
          <option value="disponible">Disponible</option>
          <option value="no_disponible">No Disponible</option>
        </select>
      </div>

      {animales.length > 0 ? (
        <table className="table table-striped align-middle text-center">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Fecha ingreso</th>
              <th>Estado</th>
              <th>Vacunas</th>
            </tr>
          </thead>
          <tbody>
            {filtrarAnimales().map((a) => (
              <tr
                key={generarKey(a)}
                className={getColorEstado(a.estado)}
                onClick={() => handleSeleccionarAnimal(a)}
                style={{ cursor: a.estado.no_apto ? "pointer" : "default" }}
              >
                <td>{a.nro || "-"}</td>
                <td>{a.raza}</td>
                <td>{a.edad_estimada}</td>
                <td>{a.fecha_ingreso}</td>
                <td>{Object.entries(a.estado).find(([, v]) => v)?.[0].replace("_", " ")}</td>
                <td>{a.vacunas && a.vacunas.length > 0 ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay animales registrados.</p>
      )}
    </div>
  );
}
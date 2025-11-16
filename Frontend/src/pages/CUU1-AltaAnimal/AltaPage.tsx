import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../rutasGenericas"; // Asumiendo que esta importación es correcta

// Definición de tipos de estado válidos
type EstadoAnimal = 
  | "Apto" 
  | "No apto" 
  | "Disponible" 
  | "No disponible" 
  | "Adoptado" 
  | "En Adopción";

interface Animal {
  nro: string;
  raza: string;
  edad_estimada: string;
  fecha_ingreso: string;
  fecha_defuncion: string | null;
  // CORRECCIÓN 1: La propiedad estado es ahora un string simple
  estado: EstadoAnimal; 
  imagen: string[];
  video: string[];
  vacunas?: string[];
}

export default function AltaAnimal() {
  const [animales, setAnimales] = useState<Animal[]>([]);
  // CORRECCIÓN 2: El filtro también debe ser un string que coincida con el valor del estado
  const [filtroEstado, setFiltroEstado] = useState<EstadoAnimal | "">("");

  // Cargar animales desde el backend
  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const { data } = await axios.get<Animal[]>(`${API_URL}/animales`);
        setAnimales(data);
      } catch {
        Swal.fire("Error", "No se pudieron cargar los animales", "error");
      }
    };
    fetchAnimales();
  }, []);

  const handleFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // CORRECCIÓN 3: Asegurar que el valor del select sea un estado válido o un string vacío
    setFiltroEstado(e.target.value as EstadoAnimal | "");
  };

  // CORRECCIÓN 4: Lógica de filtrado simple usando el string del estado
  const filtrarAnimales = () => {
    if (!filtroEstado) return animales;
    return animales.filter((a) => a.estado === filtroEstado);
  };

  // CORRECCIÓN 5: Lógica de selección para el pop-up (lo cambiaste de "entrevista" a "adaptación")
  const handleSeleccionarAnimal = async (animal: Animal) => {
    // El pop-up solo debe saltar si el estado actual es "No apto"
    if (animal.estado !== "No apto") return; 
    
    // Aquí es donde salta el pop-up de "período de adaptación"
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
        estado: "Apto", // Cambia el estado a Apto si se cumplen las condiciones
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
        "El animal debe tener al menos una vacuna y no estar fallecido para pasar a 'Apto'",
        "warning"
      );
    }
  };

  const generarKey = (animal: Animal) => {
    return animal.nro || `${animal.raza}-${animal.fecha_ingreso}-${Math.random().toString(36).slice(2)}`;
  };

  // CORRECCIÓN 6: Función para asignar color a la fila
  const getColorEstado = (estado: EstadoAnimal): string => {
    switch (estado) {
      case "No apto":
        return "table-danger";
      case "No disponible":
        return "table-secondary";
      case "Disponible":
        return "table-primary";
      case "Apto":
        // Aquí puedes cambiar a un color menos confuso, quizás warning o info
        return "table-warning"; 
      case "Adoptado":
        return "table-success";
      case "En Adopción":
        return "table-info"; // Nuevo estado para diferenciar de 'Disponible'
      default:
        return "";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Listado de animales</h2>
      
      {/* CORRECCIÓN 7: Los valores del <option> deben coincidir exactamente 
        con los valores reales que puede tener a.estado. 
      */}
      <div className="mb-4 text-center">
        <label className="form-label me-2">Filtrar por estado:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={filtroEstado}
          onChange={handleFiltroChange}
        >
          <option value="">Todos</option>
          <option value="Apto">Apto</option> 
          <option value="No apto">No Apto</option> 
          <option value="En Adopción">En Adopción</option> 
          <option value="Adoptado">Adoptado</option>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No Disponible</option>
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
            {/* Iterar sobre los animales filtrados */}
            {filtrarAnimales().map((a) => (
              <tr
                key={generarKey(a)}
                // Pasar el string del estado para obtener la clase CSS
                className={getColorEstado(a.estado)} 
                // Al hacer clic, se llama a la función de selección con el pop-up
                onClick={() => handleSeleccionarAnimal(a)} 
                // Solo muestra el puntero si se puede interactuar (es 'No apto')
                style={{ cursor: a.estado === "No apto" ? "pointer" : "default" }}
              >
                <td>{a.nro || "-"}</td>
                <td>{a.raza}</td>
                <td>{a.edad_estimada}</td>
                <td>{a.fecha_ingreso}</td>
                {/* Mostrar el estado directamente, ya que es un string */}
                <td>{a.estado}</td> 
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
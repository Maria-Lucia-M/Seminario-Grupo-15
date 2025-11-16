import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../rutasGenericas";

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
  estado: EstadoAnimal; 
  imagen: string[];
  video: string[];
}
interface FichaMedica {
  nro_ficha: number;
  nro_animal: number; // Clave para relacionar con Animal
  matricula: string;
  nro_vacunas: number[]; // Array de números de vacuna aplicadas
  observaciones?: string;
  fecha: Date;
}

export default function AltaAnimal() {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [fichasMedicas, setFichasMedicas] = useState<FichaMedica[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<EstadoAnimal | "">("");

  // Cargar animales y fichas médicas al iniciar
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Asumiendo que el Nro de Animal es un string en el frontend pero un number en la ficha
        const [animalesRes, fichasRes] = await Promise.all([
            axios.get<Animal[]>(`${API_URL}/animales`),
            axios.get<FichaMedica[]>(`${API_URL}/fichas_medicas`)
        ]);
        
        setAnimales(animalesRes.data);
        setFichasMedicas(fichasRes.data);

      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire("Error", "No se pudieron cargar los datos (Animales o Fichas Médicas)", "error");
      }
    };
    fetchDatos();
  }, []);
  
  // Verifica si el animal tiene vacunas registradas en alguna ficha médica
  const tieneVacunasRegistradas = (animalNro: string): boolean => {
    // Convertir el nro de animal a número para la comparación con la ficha
    const animalId = parseInt(animalNro); 
    
    // Filtra las fichas de ese animal y verifica si alguna tiene vacunas
    const fichasDelAnimal = fichasMedicas.filter(f => f.nro_animal === animalId);
    return fichasDelAnimal.some(f => f.nro_vacunas && f.nro_vacunas.length > 0);
  };
  
  // Asigna clase de color de Bootstrap según el estado
  const getColorEstado = (estado: EstadoAnimal): string => {
    switch (estado) {
      case "No apto":
        return "table-danger"; // Rojo
      case "No disponible":
        return "table-secondary"; // Gris
      case "Disponible":
        return "table-primary"; // Azul
      case "Apto":
        return "table-warning"; // Amarillo/Advertencia
      case "Adoptado":
        return "table-success"; // Verde
      case "En Adopción":
        return "table-info"; // Azul claro/Información
      default:
        return "";
    }
  };

  const generarKey = (animal: Animal) => {
    return animal.nro || `${animal.raza}-${animal.fecha_ingreso}-${Math.random().toString(36).slice(2)}`;
  };

  
  const handleFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiltroEstado(e.target.value as EstadoAnimal | "");
  };

  const filtrarAnimales = () => {
    if (!filtroEstado) return animales;
    // Compara el valor del estado del animal con el valor del filtro seleccionado
    return animales.filter((a) => a.estado === filtroEstado);
  };

  const handleSeleccionarAnimal = async (animal: Animal) => {
    // El pop-up solo se dispara si el estado es "No apto"
    if (animal.estado !== "No apto") return; 
    
    // Pop-up: ¿Terminó su período de adaptación?
    const { isConfirmed } = await Swal.fire({
      title: "¿Terminó su período de adaptación?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    // Verificación de condiciones para pasar a "Apto"
    const tieneVacunas = tieneVacunasRegistradas(animal.nro);
    const noFallecido = !animal.fecha_defuncion;

    if (tieneVacunas && noFallecido) {
      const actualizado: Animal = {
        ...animal,
        estado: "Apto"
      };

      try {
        await axios.put(`${API_URL}/animales/${animal.nro}`, actualizado);
        
        // Actualiza el estado local del listado
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
        "El animal debe tener al menos una vacuna registrada y no estar fallecido para pasar a 'Apto'",
        "warning"
      );
    }
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
            {filtrarAnimales().map((a) => (
              <tr
                key={generarKey(a)}
                // Asigna el color de la fila
                className={getColorEstado(a.estado)} 
                // Dispara la verificación del pop-up y actualización
                onClick={() => handleSeleccionarAnimal(a)} 
                // Cambia el cursor para indicar interactividad solo si es "No apto"
                style={{ cursor: a.estado === "No apto" ? "pointer" : "default" }}
              >
                <td>{a.nro || "-"}</td>
                <td>{a.raza}</td>
                <td>{a.edad_estimada}</td>
                <td>{a.fecha_ingreso}</td>
                <td>{a.estado}</td> 
                {/* Muestra ✅ o ❌ basado en la ficha médica */}
                <td>{tieneVacunasRegistradas(a.nro) ? "✅" : "❌"}</td> 
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
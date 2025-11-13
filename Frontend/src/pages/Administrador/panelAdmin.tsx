// Ejemplo de uso
import { useState } from "react";
import AnimalForm, { type AnimalDTO } from "./ingresoAnimal";

const AdminPanel = () => {
  const [animales, setAnimales] = useState<AnimalDTO[]>([]);

  const handleAddAnimal = (nuevo: AnimalDTO) => {
    setAnimales([...animales, nuevo]);
  };

  return (
    <div className="p-4">
      <AnimalForm animales={animales} onAdd={handleAddAnimal} />

      <h3 className="text-xl font-bold mt-8 mb-2">Lista de animales</h3>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nro</th>
            <th className="border p-2">Especie</th>
            <th className="border p-2">Raza</th>
            <th className="border p-2">Edad</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((a) => (
            <tr key={a.nro}>
              <td className="border p-2">{a.nro}</td>
              <td className="border p-2">{a.especie}</td>
              <td className="border p-2">{a.raza}</td>
              <td className="border p-2">{a.edad_estimada}</td>
              <td className="border p-2">{a.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

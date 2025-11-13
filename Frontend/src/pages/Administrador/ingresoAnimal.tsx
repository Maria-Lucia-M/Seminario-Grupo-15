import React, { useState } from "react";

export type Especie = "Perro" | "Gato";
export type Estado =
  | "Apto"
  | "No apto"
  | "En adopcion"
  | "Adoptado"
  | "disponible"
  | "no_disponible";

export interface AnimalDTO {
  nro: number;
  especie: Especie;
  raza: string;
  edad_estimada: number;
  fecha_ingreso: Date;
  fecha_defuncion: Date | null;
  estado: Estado;
  imagen: string;
  video: string | null;
}

interface Props {
  animales: AnimalDTO[]; // lista existente para calcular el nro
  onAdd: (nuevoAnimal: AnimalDTO) => void; // callback para agregar el animal
}

const AnimalForm: React.FC<Props> = ({ animales, onAdd }) => {
  const ultimoNumero =
    animales.length > 0 ? Math.max(...animales.map((a) => a.nro)) : 0;
  const nuevoNumero = ultimoNumero + 1;

  const [especie, setEspecie] = useState<Especie>("Perro");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState<number | "">("");
  const [imagen, setImagen] = useState<string>("");
  const [video, setVideo] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      const reader = new FileReader();
      reader.onload = () => setVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (edad === "" || edad < 0 || edad > 30) {
      setError("La edad estimada debe estar entre 0 y 30 años");
      return;
    }
    if (!raza.trim()) {
      setError("La raza es obligatoria");
      return;
    }

    const nuevoAnimal: AnimalDTO = {
      nro: nuevoNumero,
      especie,
      raza,
      edad_estimada: Number(edad),
      fecha_ingreso: new Date(),
      fecha_defuncion: null,
      estado: "No apto",
      imagen,
      video,
    };

    onAdd(nuevoAnimal);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Número animal {nuevoNumero.toString().padStart(2, "0")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Especie</label>
          <select
            value={especie}
            onChange={(e) => setEspecie(e.target.value as Especie)}
            className="w-full border rounded-lg p-2"
          >
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Raza</label>
          <input
            type="text"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Edad estimada</label>
          <input
            type="number"
            min={0}
            max={30}
            value={edad}
            onChange={(e) =>
              setEdad(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Imagen (opcional)</label>
          <input type="file" accept="image/*" onChange={handleImagen} />
          {imagen && (
            <img
              src={imagen}
              alt="Preview"
              className="mt-2 rounded-lg w-32 h-32 object-cover border"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Video (opcional)</label>
          <input type="file" accept="video/mp4" onChange={handleVideo} />
          {video && (
            <video
              src={video}
              controls
              className="mt-2 rounded-lg w-48 border"
            />
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar alta
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;

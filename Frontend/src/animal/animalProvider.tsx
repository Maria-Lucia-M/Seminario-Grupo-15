import React, { useState } from "react";
import { AnimalContext } from "./animalContext.ts";

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
};

export type AnimalContextType = {
  animal: Animal | null;
  setAnimal: (u: Animal | null) => void;
};

interface AnimalProviderProps {
    children: React.ReactNode;
};

export function AnimalProvider({ children }: AnimalProviderProps) {
  const [animal, setAnimal] = useState<Animal | null>(null);

  return (
    <AnimalContext.Provider value={{ animal, setAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};
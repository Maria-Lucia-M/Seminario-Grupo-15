import React, { useState } from "react";
import { AnimalContext } from "./animalContext.ts";

interface Animal {
  nro: number;
  especie: string
  raza: string;
  edad_estimada: number;
  fecha_ingreso: Date;
  fecha_defuncion: Date | null;
  estado: string;
  imagen: string[] | null;
  video: string[] | null;
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
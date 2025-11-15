import React, { useState } from "react";
import { RescatistaContext } from "./rescatistaContext.ts";

interface Rescatista {
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
};

export type RescatistaContextType = {
  rescatista: Rescatista | null;
  setRescatista: (u: Rescatista | null) => void;
};

interface RescatistaProviderProps {
    children: React.ReactNode;
};

export function RescatistaProvider({ children }: RescatistaProviderProps) {
  const [rescatista, setRescatista] = useState<Rescatista | null>(null);

  return (
    <RescatistaContext.Provider value={{ rescatista, setRescatista }}>
      {children}
    </RescatistaContext.Provider>
  );
};
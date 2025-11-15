import { createContext } from "react";
import type { AnimalContextType } from "./animalProvider.tsx";

export const AnimalContext = createContext<AnimalContextType>({
    animal: null,
    setAnimal: () => {}
});
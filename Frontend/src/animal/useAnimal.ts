import { useContext } from "react";
import { AnimalContext } from "./animalContext.ts";

export const useAnimal = () => useContext(AnimalContext);
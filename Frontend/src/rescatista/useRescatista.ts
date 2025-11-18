import { useContext } from "react";
import { RescatistaContext } from "./rescatistaContext.ts";

export const useRescatista = () => useContext(RescatistaContext);
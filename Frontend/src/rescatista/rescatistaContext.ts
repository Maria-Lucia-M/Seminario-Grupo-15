import { createContext } from "react";
import type { RescatistaContextType } from "./rescatistaProvider.tsx";

export const RescatistaContext = createContext<RescatistaContextType>({
    rescatista: null,
    setRescatista: () => {}
});
import { useContext } from "react";
import { AuthContext } from "./authContext.ts";

export const useAuth = () => useContext(AuthContext);
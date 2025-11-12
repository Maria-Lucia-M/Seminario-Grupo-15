import { createContext } from "react";
import type { AuthContextType } from "./authProvider.tsx";

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: true,
    login: () => {},
    logout: () => {},
    refreshAuth: async () => false,
    setUser: () => {}
});
import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContext.ts";
import axios from "axios";
import { API_URL } from "../rutasGenericas.ts";

interface UserData {
    id: string;
    codigo: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
};

// Contexto de autenticación
// Este contexto se va a encargar de almacenar los datos del usuario y los tokens de acceso y refresco
export interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    login: (accessToken: string, refreshToken: string, userData: UserData)=> void;
    logout: () => void;
    refreshAuth: () => Promise<boolean>;
    setUser: (user: Partial<UserData>) => void;
};

interface AuthProviderProps {
    children: React.ReactNode;
};

// Mantiene el estado de autenticación y proporciona funciones para iniciar/cerrar sesión y refrescar el token
export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Función para refrescar el token de acceso
    const refreshAuth = useCallback(async (): Promise<boolean> => {
        if (!refreshToken) return false;
        try {
            const response = await axios.post(`${API_URL}/auth/refresh-token`, {refreshToken});
            
            if(response.status === 200){
                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                return true;
            };
        } catch (error:any) {
            console.error("Error al refrescar token:", error.response?.data || error.message);
        };
        logout();
        return false;
    }, [refreshToken]);

    useEffect(() => {
        const refreshLoop = setInterval(async () => {
            const refreshToken = localStorage.getItem("refreshToken");
            if(!refreshToken) return;

            try{
                const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {refreshToken})
                //console.log("Respuesta al refrescar token automáticamente:", response);
                if(response.status === 200 && response.data.accessToken && response.data.user){
                    //console.log("Token refrescado automáticamente.");
                    const newAccessToken = response.data.accessToken;
                    const refreshUser = response.data.user
                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("user", JSON.stringify(refreshUser));
                    setAccessToken(newAccessToken);
                    setUser(refreshUser);
                } else {
                    //console.log("Respuesta inesperada al refrescar token automáticamente:", response);
                    console.warn("Respuesta inesperada al refrescar token:", response);
                    logout();
                };
            }catch(error:any){
                const mensaje = error.response?.data?.message ?? error.message;
                //console.log("Error al refrescar token automáticamente:", mensaje);
                console.error("Error al refrescar token automáticamente:", mensaje);
                logout();
            };
        }, 1000 * 60 * 50); // Cada 50 minutos porque el del backend dura 60 (lo probe cada 1 minuto y andaba bien).
        return () => clearInterval(refreshLoop);
    }, []);

    // Efecto para cargar la autenticación al iniciar
    useEffect(() => {
        //console.log("AuthProvider effect ejecutado, loadAuthData iniciado.");
        const loadAuthData = async () => {
        try {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            const storedUser = localStorage.getItem('user');
            if (!storedAccessToken || !storedRefreshToken) {
                logout();
                return;
            };

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                //console.log("User cargado desde localStorage:", parsedUser);
                const userNormalizado = {
                    ...parsedUser,
                    codigo: parsedUser.codigo_cliente ?? parsedUser.codigo,
                };
                const response = await axios.get(`${API_URL}/auth/validate-token`, {
                    headers: {
                        Authorization: `Bearer ${storedAccessToken}`
                    }
                });
                //console.log("User recibido desde validate-token:", response.data.user);
                if (response.status === 200 && response.data.valid) {
                    setAccessToken(storedAccessToken);
                    setUser(userNormalizado);
                    setIsAuthenticated(true);
                    localStorage.setItem('user', JSON.stringify(userNormalizado)); // Para actualizar el local storage.
                } else {
                    console.warn("Token inválido. Cerrando sesión.");
                    logout();
                }; 
            }else {
                logout();
            };
        }catch (error: any) {
            const status = error.response?.status;
            if (status === 401) {
                console.warn("Token expirado. Intentando refrescar...");
                const refreshed = await refreshAuth();
                if (refreshed) {
                    // Reintenta validación con nuevo token
                    return loadAuthData();
                }
            };
            console.error("Error al validar token:", error);
            logout();
        } finally {
            setIsLoading(false);
        };
    };

    loadAuthData();
    }, [refreshAuth]);

    // Función para iniciar sesión
    const login = (accessToken:string, refreshToken:string, userData: UserData ) => {
        
        if (!accessToken || !userData) {
            console.error("Error: El backend envió un accessToken o userData vacío.");
            return;
        };
        //console.log("Datos enviados para guardar en el login: ", accessToken, refreshToken, userData);
        //console.log("Guardando accessToken en localStorage:", accessToken);
        //console.log("Guardando userData en localStorage:", JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(userData);
        setIsAuthenticated(true);

        //console.log("`accessToken` guardado correctamente en localStorage.");
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    // Función para actualizar datos del usuario
    const updateUser = (newData: Partial<UserData>) => {
        if (!user) return;
        
        const updatedUser = { ...user, ...newData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const contextValue: AuthContextType = {
        isAuthenticated,
        user,
        accessToken,
        refreshToken,
        isLoading,
        login,
        logout,
        refreshAuth,
        setUser: updateUser
    };

    if (isLoading) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Cargando autenticación...</p>
            </div>
        );
    }

    //console.log("AuthProvider montado");
    if (!children) {
    console.warn("AuthProvider sin children");
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
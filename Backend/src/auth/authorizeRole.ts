import { Request, Response, NextFunction } from 'express';
import { UserData, Roles } from './auth.middleware.js';

//Middleware que extiende el objeto Request con el usuario ya autenticado
interface AuthenticatedRequest extends Request {
    user: UserData;
};

export const authorizeRole = (requiredRoles: Roles[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const { user } = req;

        if (!user) {
            return res.status(401).json({ // Cambiado a 401 Unauthorized
                code: 'UNAUTHENTICATED',
                message: 'Debe iniciar sesión para acceder al recurso.'
            });
        };

        // El admin siempre tiene acceso
        if (user.rol === 'admin') {
            return next();
        };
        
        //Verificar si el rol del usuario está en los roles requeridos
        if (!requiredRoles.includes(user.rol)) {
            return res.status(403).json({
                code: 'FORBIDDEN',
                message: 'No tiene permiso para acceder a este recurso.'
            });
        };

        next();
    };
};
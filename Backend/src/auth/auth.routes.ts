import { Router } from "express";
import { 
    login,
    refreshToken,
    logout,
    validateAccessToken,
    validateResetToken
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', logout);

authRouter.get('/validate-reset-token', validateResetToken);
authRouter.get('/validate-token', validateAccessToken);
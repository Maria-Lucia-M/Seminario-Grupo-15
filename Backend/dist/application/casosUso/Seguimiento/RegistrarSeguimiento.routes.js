import { Router } from "express";
import { RegistrarSeguimentoController } from "./RegistrarSeguimiento.controller.js";
export const RegistrarSeguimientoRoutes = Router();
RegistrarSeguimientoRoutes.post("/seguimientos", RegistrarSeguimentoController);
//# sourceMappingURL=RegistrarSeguimiento.routes.js.map
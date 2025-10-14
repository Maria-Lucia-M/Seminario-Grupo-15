import { Router } from "express";
import { RegistrarSeguimentoController } from "../../casosUso/Seguimiento/RegistrarSeguimiento.controller.js";

export const RegistrarSeguimientoRoutes = Router();

RegistrarSeguimientoRoutes.post("/seguimientos", RegistrarSeguimentoController);
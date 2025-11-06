import { Router } from "express";
import { 
    RegistrarSeguimentoController,
    ObtenerSeguimientosController} from "./RegistrarSeguimientoController.js";

export const seguimientoRouter = Router();

seguimientoRouter.get("/", ObtenerSeguimientosController);
seguimientoRouter.post("/seguimientos", RegistrarSeguimentoController);
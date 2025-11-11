import { Router } from "express";
import { 
    RegistrarAltaController,
    ObtenerAltasController} from "./RegistrarAltaController.js";

export const altaRouter = Router();

altaRouter.get("/", ObtenerAltasController);
altaRouter.post("/", RegistrarAltaController);
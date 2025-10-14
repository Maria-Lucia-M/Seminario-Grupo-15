import { Router } from "express";
import { RegistrarAltaController } from "./RegistrarAlta.controller.js";

export const RegistrarAltaRoutes = Router();

RegistrarAltaRoutes.post("/alta", RegistrarAltaController);
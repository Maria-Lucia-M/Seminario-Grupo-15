import { Router } from "express";
import { RegistrarAltaController } from "./RegistrarAlta.controller.js";

export const RegistrarAltaRoutes = Router();

// POST /api/alta
RegistrarAltaRoutes.post("/alta", RegistrarAltaController);


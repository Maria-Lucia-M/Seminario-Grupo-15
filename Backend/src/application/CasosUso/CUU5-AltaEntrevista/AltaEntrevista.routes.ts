import { Router } from 'express';
import { AltaEntrevistaController } from './AltaEntrevista.controller.js';

export const AltaEntrevistaRoutes = Router();

AltaEntrevistaRoutes.post("/altaEnt", AltaEntrevistaController);
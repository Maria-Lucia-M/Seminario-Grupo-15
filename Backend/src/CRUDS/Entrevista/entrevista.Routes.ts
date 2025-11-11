import { Router } from 'express';
import { EntrevistaController } from './ent.controler.js';

export const entrevistaRoutes = Router();
const entrevistaController = new EntrevistaController();

// Rutas del CRUD de Entrevistas
entrevistaRoutes.get('/entrevistas', entrevistaController.findAllEntrevistas.bind(entrevistaController));
entrevistaRoutes.get('/entrevistas/:id', entrevistaController.getEntrevista.bind(entrevistaController));

// entrevistaRoutes.post('/entrevistas', entrevistaController.createEntrevista.bind(entrevistaController));
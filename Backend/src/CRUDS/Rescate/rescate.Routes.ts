import { Router } from 'express';
import { 
    findAllRescates,
    getOneRescate, 
    registrarRescateController,
    actualizarRescate,
    eliminarRescate
} from './rescate.controller.js';

export const rescateRoutes = Router();

rescateRoutes.get('/rescates', findAllRescates);
rescateRoutes.get('/rescates/:nro', getOneRescate);
rescateRoutes.post('/rescates', registrarRescateController);
rescateRoutes.put('/rescates/:nro', actualizarRescate);
rescateRoutes.delete('/rescates/:nro', eliminarRescate);
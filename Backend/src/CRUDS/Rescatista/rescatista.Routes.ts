import { Router } from 'express';
import { 
    findAllRescatista,
    getOneRescatista, 
    registrarRescatistaController,
    actualizarRescatista,
    eliminarRescatista
} from './rescatista.controller.js';

export const rescatistaRoutes = Router();

rescatistaRoutes.get('/rescatistas', findAllRescatista);
rescatistaRoutes.get('/rescatistas/:dni', getOneRescatista);
rescatistaRoutes.post('/rescatistas', registrarRescatistaController);
rescatistaRoutes.put('/rescatistas/:dni', actualizarRescatista);
rescatistaRoutes.delete('/rescatistas/:dni', eliminarRescatista);
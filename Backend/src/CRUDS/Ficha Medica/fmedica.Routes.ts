import { Router } from 'express';
import { FichaMedicaController } from './fmed.controler';

const router = Router();
const fichaMedicaController = new FichaMedicaController();

router.post('/fichas', fichaMedicaController.createFicha.bind(fichaMedicaController));
router.get('/fichas', fichaMedicaController.getFichas.bind(fichaMedicaController));
router.get('/fichas/:id', fichaMedicaController.getFichaById.bind(fichaMedicaController));
router.put('/fichas/:id', fichaMedicaController.updateFicha.bind(fichaMedicaController));
router.delete('/fichas/:id', fichaMedicaController.deleteFicha.bind(fichaMedicaController));

export default router;
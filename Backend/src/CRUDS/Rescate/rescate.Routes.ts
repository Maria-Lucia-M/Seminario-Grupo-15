import { Router } from 'express';
import { RescateController } from './res.controller';

const router = Router();
const rescateController = new RescateController();

router.post('/', rescateController.createRescate);
router.get('/', rescateController.getAll);
router.get('/:_id', rescateController.getRescate);
router.put('/:_id', rescateController.updateRescate);
router.delete('/:_id', rescateController.deleteRescate);

export default router;
import { Router } from "express";
import { RescatistaController } from "./res.controller";

const router = Router();
const rescatistaController = new RescatistaController();

router.post('/', rescatistaController.createRescatista);
router.get('/', rescatistaController.getAll);
router.get('/:_id', rescatistaController.getRescatista);
router.put('/:_id', rescatistaController.updateRescatista);
router.delete('/:_id', rescatistaController.deleteRescatista);

export default router;
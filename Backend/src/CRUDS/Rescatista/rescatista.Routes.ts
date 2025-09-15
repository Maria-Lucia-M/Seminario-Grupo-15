import { Router } from "express";
import { RescatistaController } from "./res.controller";

const router = Router();
const rescatistaController = new RescatistaController();

export function setRoutes(app: Router) {
  app.post('/rescatistas', rescatistaController.createRescatista.bind(rescatistaController));
  app.get('/rescatistas/:dni', rescatistaController.getRescatista.bind(rescatistaController));
  app.put('/rescatistas/:dni', rescatistaController.updateRescatista.bind(rescatistaController));
  app.delete('/rescatistas/:dni', rescatistaController.deleteRescatista.bind(rescatistaController));
}
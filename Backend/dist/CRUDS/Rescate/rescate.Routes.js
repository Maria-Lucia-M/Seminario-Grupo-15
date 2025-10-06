import { Router } from 'express';
import { RescateController } from './res.controller';
const router = Router();
const rescateController = new RescateController();
export function setRoutes(app) {
    app.post('/rescates', rescateController.createRescate.bind(rescateController));
    app.get('/rescates/:nro_animal', rescateController.getRescate.bind(rescateController));
    app.put('/rescates/:nro_animal', rescateController.updateRescate.bind(rescateController));
    app.delete('/rescates/:nro_animal', rescateController.deleteRescate.bind(rescateController));
}
//# sourceMappingURL=rescate.Routes.js.map
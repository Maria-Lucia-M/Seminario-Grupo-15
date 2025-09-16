import { Router } from 'express';
import { EntrevistaController } from './ent.controler';
const router = Router();
const entrevistaController = new EntrevistaController();
export function setRoutes(app) {
    app.post('/entrevistas', entrevistaController.createEntrevista.bind(entrevistaController));
    app.get('/entrevistas/:id_entrevista', entrevistaController.getEntrevista.bind(entrevistaController));
    app.put('/entrevistas/:id_entrevista', entrevistaController.updateEntrevista.bind(entrevistaController));
    app.delete('/entrevistas/:id_entrevista', entrevistaController.deleteEntrevista.bind(entrevistaController));
}
//# sourceMappingURL=entrevista.Routes.js.map
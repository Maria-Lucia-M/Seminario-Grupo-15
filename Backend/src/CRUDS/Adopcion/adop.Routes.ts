import { Router } from 'express';
import { AdopcionController } from './adop.controller';

const router = Router();
const adopcionController = new AdopcionController();

export function setRoutes(app: Router) {
    app.post('/adopciones', adopcionController.createAdopcion.bind(adopcionController));
    app.get('/adopciones/:nro', adopcionController.getAdopcion.bind(adopcionController));
    app.put('/adopciones/:nro', adopcionController.updateAdopcion.bind(adopcionController));
    app.delete('/adopciones/:nro', adopcionController.deleteAdopcion.bind(adopcionController));
}
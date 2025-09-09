import { Router } from 'express';
import { VacunaController } from './vacu.controller';

const router = Router();
const vacunaController = new VacunaController();

export function setRoutes(app: Router) {
    app.post('/vacunas', vacunaController.createVacuna.bind(vacunaController));
    app.get('/vacunas/:nro_vacuna', vacunaController.getVacuna.bind(vacunaController));
    app.put('/vacunas/:nro_vacuna', vacunaController.updateVacuna.bind(vacunaController));
    app.delete('/vacunas/:nro_vacuna', vacunaController.deleteVacuna.bind(vacunaController));
}
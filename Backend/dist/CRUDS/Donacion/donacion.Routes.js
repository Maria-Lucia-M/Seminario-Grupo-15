import { Router } from "express";
import { DonacionController } from "./don.controller";
const router = Router();
const donacionController = new DonacionController();
export function setRoutes(app) {
    app.post('/donaciones', donacionController.createDonacion.bind(donacionController));
    app.get('/donaciones/:id', donacionController.getDonacion.bind(donacionController));
    app.put('/donaciones/:id', donacionController.updateDonacion.bind(donacionController));
    app.delete('/donaciones/:id', donacionController.deleteDonacion.bind(donacionController));
}
//# sourceMappingURL=donacion.Routes.js.map
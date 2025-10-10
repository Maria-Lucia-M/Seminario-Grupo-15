import { Request, Response } from "express";
import { Vacuna } from "../../../CRUDS/Vacunas/vacu.entity.js";
import { FichaMedicaController } from "../../../CRUDS/Ficha Medica/fmed.controler.js";
import { VacunaController } from "../../../CRUDS/Vacunas/vacu.controller.js";

const vacunas: Vacuna[] = [];

export function registrarColocacionVacunas(req: Request, res: Response): void {
    const numerosVacunas: number[] = req.body.numerosVacunas;
    const vacunasNecesarias = vacunas.filter(v => numerosVacunas.includes(v.nro_vacuna));

    const vacunasSinStock = vacunasNecesarias.filter(v => v.stock <= 0);
    const vacunasVencidas = vacunasNecesarias.filter(v => v.fecha_vencimiento < new Date());

    if (vacunasSinStock.length > 0 || vacunasVencidas.length > 0) {
            res.status(400).json({
            message: 'Hay vacunas sin stock y/o vencidas.',
            sinStock: vacunasSinStock.map(v => v.droga),
            vencidas: vacunasVencidas.map(v => v.droga)})
        return;
    }

    const vacunaController = new VacunaController();
    vacunasNecesarias.forEach(v => {
        v.stock -= 1;
        const mockRequest = {
            params: { nro_vacuna: v.nro_vacuna },
            body: v
        } as unknown as Request;
        vacunaController.updateVacuna(mockRequest, {} as Response);
    });

    req.body.nro_vacunas = numerosVacunas;
    const fichaMedicaController = new FichaMedicaController();
    fichaMedicaController.createFicha(req, res);

}

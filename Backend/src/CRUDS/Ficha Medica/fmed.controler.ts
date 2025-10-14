import { Request, Response } from "express";
import { FichaMedica } from "./fmed.model";

export class FichaMedicaController {
    private fichas: FichaMedica[] = [];

    public createFicha(req: Request, res: Response): void {
        const { id_ficha, fecha, id_animal, matricula_vet, observaciones, nro_vacunas } = req.body;
        const nuevaFicha = new FichaMedica(id_ficha, fecha, id_animal, matricula_vet, observaciones, nro_vacunas);
        this.fichas.push(nuevaFicha);
        res.status(201).send(nuevaFicha);
    }

    public getFichas(req: Request, res: Response): void {
        res.status(200).send(this.fichas);
    }

    public getFichaById(req: Request, res: Response): void {
        const { id } = req.params;
        const ficha = this.fichas.find(f => f.id_ficha === BigInt(id));
        if (ficha) {
            res.status(200).send(ficha);
        } else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }

    public updateFicha(req: Request, res: Response): void {
        const { id } = req.params;
        const { fecha, id_animal, matricula_vet, observaciones, nro_vacunas } = req.body;
        const ficha = this.fichas.find(f => f.id_ficha === BigInt(id));
        if (ficha) {
            ficha.fecha = fecha;
            ficha.id_animal = id_animal;
            ficha.matricula_vet = matricula_vet;
            ficha.observaciones = observaciones;
            ficha.nro_vacunas = nro_vacunas;
            res.status(200).send(ficha);
        } else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }

    public deleteFicha(req: Request, res: Response): void {
        const { id } = req.params;
        const index = this.fichas.findIndex(f => f.id_ficha === BigInt(id));
        if (index !== -1) {
            this.fichas.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }
}
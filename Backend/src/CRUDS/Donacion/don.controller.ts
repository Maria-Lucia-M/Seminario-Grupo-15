import {Request, Response} from 'express';
import { Donacion } from './don.entity';

export class DonacionController {
    private donaciones: Donacion[] = [];

    public createDonacion(req: Request, res: Response): void {
        const { nro_donacion, tipo, cantidad, descripcion, fecha_vencimiento } = req.body;
        const newDonacion = new Donacion(nro_donacion, tipo, cantidad, descripcion, new Date(fecha_vencimiento));
        this.donaciones.push(newDonacion);
        res.status(201).json(newDonacion);
    }

    public getDonacion(req: Request, res: Response): void {
        const nro_donacion = Number(req.params.nro_donacion);
        const donacion = this.donaciones.find(d => d.nro_donacion === nro_donacion);
        if (donacion) {
            res.status(200).json(donacion);
        } else {
            res.status(404).json({ message: 'Donacion no encontrada' });
        }
    }

    public updateDonacion(req: Request, res: Response): void {
        const nro_donacion = Number(req.params.nro_donacion);
        const index = this.donaciones.findIndex(d => d.nro_donacion === nro_donacion);
        if (index !== -1) {
            const { tipo, cantidad, descripcion, fecha_vencimiento } = req.body;
            this.donaciones[index] = { nro_donacion, tipo, cantidad, descripcion, fecha_vencimiento: new Date(fecha_vencimiento) };
            res.status(200).json(this.donaciones[index]);
        } else {
            res.status(404).json({ message: 'Donacion no encontrada' });
        }
    }

    public deleteDonacion(req: Request, res: Response): void {
        const nro_donacion = Number(req.params.nro_donacion);
        const index = this.donaciones.findIndex(d => d.nro_donacion === nro_donacion);
        if (index !== -1) {
            this.donaciones.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Donacion no encontrada' });
        }
    }
}
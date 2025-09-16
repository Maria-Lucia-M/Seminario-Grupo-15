import { Adopcion } from './adop.entity';
export class AdopcionController {
    constructor() {
        this.adopciones = [];
    }
    createAdopcion(req, res) {
        const { nro_adopcion, nro_animal, dni_adoptante, fecha_adopcion } = req.body;
        const fecha_retiro = null;
        const motivos_retiro = " ";
        const evidencia_maltrato = null;
        const newAdopcion = new Adopcion(nro_adopcion, nro_animal, dni_adoptante, fecha_adopcion, fecha_retiro, motivos_retiro, evidencia_maltrato);
        this.adopciones.push(newAdopcion);
        res.status(201).json(newAdopcion);
    }
    getAdopcion(req, res) {
        const nro_adopcion = Number(req.params.nro_adopcion);
        const adopcion = this.adopciones.find(a => a.nro_adopcion === nro_adopcion);
        if (adopcion) {
            res.status(200).json(adopcion);
        }
        else {
            res.status(404).json({ message: 'Adopcion no encontrada' });
        }
    }
    updateAdopcion(req, res) {
        const nro_adopcion = Number(req.params.nro_adopcion);
        const index = this.adopciones.findIndex(a => a.nro_adopcion === nro_adopcion);
        if (index !== -1) {
            const { nro_adopcion, nro_animal, dni_adoptante, fecha_adopcion, fecha_retiro, motivos_retiro, evidencia_maltrato } = req.body;
            this.adopciones[index] = { nro_adopcion, nro_animal, dni_adoptante, fecha_adopcion, fecha_retiro, motivos_retiro, evidencia_maltrato };
            res.status(200).json(this.adopciones[index]);
        }
        else {
            res.status(404).json({ message: 'Adopcion no encontrada' });
        }
    }
    deleteAdopcion(req, res) {
        const nro_adopcion = Number(req.params.nro_adopcion);
        const index = this.adopciones.findIndex(a => a.nro_adopcion === nro_adopcion);
        if (index !== -1) {
            this.adopciones.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Adopcion no encontrada' });
        }
    }
}
//# sourceMappingURL=adop.controller.js.map
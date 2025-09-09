import Vacuna from './vacu.entity';
export class VacunaController {
    constructor() {
        this.vacunas = [];
    }
    createVacuna(req, res) {
        const { nro_vacuna, fecha_vencimiento, droga, stock, fecha_ingreso } = req.body;
        const newVacuna = new Vacuna(nro_vacuna, fecha_vencimiento, droga, stock, fecha_ingreso);
        this.vacunas.push(newVacuna);
        res.status(201).json(newVacuna);
    }
    getVacuna(req, res) {
        const nro_vacuna = Number(req.params.nro_vacuna);
        const vacuna = this.vacunas.find(v => v.nro_vacuna === nro_vacuna);
        if (vacuna) {
            res.status(200).json(vacuna);
        }
        else {
            res.status(404).json({ message: 'Vacuna not found' });
        }
    }
    updateVacuna(req, res) {
        const nro_vacuna = Number(req.params.nro_vacuna);
        const index = this.vacunas.findIndex(v => v.nro_vacuna === nro_vacuna);
        if (index !== -1) {
            const { fecha_vencimiento, droga, stock, fecha_ingreso } = req.body;
            this.vacunas[index] = {
                nro_vacuna,
                fecha_vencimiento,
                droga,
                stock,
                fecha_ingreso
            };
            res.status(200).json(this.vacunas[index]);
        }
        else {
            res.status(404).json({ message: 'Vacuna not found' });
        }
    }
    deleteVacuna(req, res) {
        const nro_vacuna = Number(req.params.nro_vacuna);
        const index = this.vacunas.findIndex(v => v.nro_vacuna === nro_vacuna);
        if (index !== -1) {
            this.vacunas.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Vacuna not found' });
        }
    }
}
//# sourceMappingURL=vacu.controller.js.map
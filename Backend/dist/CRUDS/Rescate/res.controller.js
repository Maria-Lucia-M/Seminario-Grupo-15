export class RescateController {
    constructor() {
        this.rescates = [];
    }
    createRescate(req, res) {
        const { lugar_rescate, fecha_rescate, nro_animal, dni_rescatista } = req.body;
        const newRescate = { lugar_rescate, fecha_rescate: new Date(fecha_rescate), nro_animal, dni_rescatista };
        this.rescates.push(newRescate);
        res.status(201).json(newRescate);
    }
    getRescate(req, res) {
        const nro_animal = Number(req.params.nro_animal);
        const rescate = this.rescates.find(r => r.nro_animal === nro_animal);
        if (rescate) {
            res.status(200).json(rescate);
        }
        else {
            res.status(404).json({ message: 'Rescate no encontrado' });
        }
    }
    updateRescate(req, res) {
        const nro_animal = Number(req.params.nro_animal);
        const index = this.rescates.findIndex(r => r.nro_animal === nro_animal);
        if (index !== -1) {
            const { lugar_rescate, fecha_rescate, dni_rescatista } = req.body;
            this.rescates[index] = { nro_animal, lugar_rescate, fecha_rescate: new Date(fecha_rescate), dni_rescatista };
            res.status(200).json(this.rescates[index]);
        }
        else {
            res.status(404).json({ message: 'Rescate no encontrado' });
        }
    }
    deleteRescate(req, res) {
        const nro_animal = Number(req.params.nro_animal);
        const index = this.rescates.findIndex(r => r.nro_animal === nro_animal);
        if (index !== -1) {
            this.rescates.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Rescate no encontrado' });
        }
    }
}
//# sourceMappingURL=res.controller.js.map
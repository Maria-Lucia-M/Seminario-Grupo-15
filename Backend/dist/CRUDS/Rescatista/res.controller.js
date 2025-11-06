import { Rescatista } from "./res.entity";
export class RescatistaController {
    rescatistas = [];
    createRescatista(req, res) {
        const { dni, nombre, apellido, telefono } = req.body;
        const newRescatista = new Rescatista(dni, nombre, apellido, telefono);
        this.rescatistas.push(newRescatista);
        res.status(201).json(newRescatista);
    }
    getRescatista(req, res) {
        const { dni } = req.params;
        const rescatista = this.rescatistas.find(r => r.dni === dni);
        if (rescatista) {
            res.status(200).json(rescatista);
        }
        else {
            res.status(404).json({ message: 'Rescatista not found' });
        }
    }
    updateRescatista(req, res) {
        const { dni } = req.params;
        const index = this.rescatistas.findIndex(r => r.dni === dni);
        if (index !== -1) {
            const { nombre, apellido, telefono } = req.body;
            this.rescatistas[index] = { dni, nombre, apellido, telefono };
            res.status(200).json(this.rescatistas[index]);
        }
        else {
            res.status(404).json({ message: 'Rescatista not found' });
        }
    }
    deleteRescatista(req, res) {
        const { dni } = req.params;
        const index = this.rescatistas.findIndex(r => r.dni === dni);
        if (index !== -1) {
            this.rescatistas.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Rescatista not found' });
        }
    }
}
//# sourceMappingURL=res.controller.js.map
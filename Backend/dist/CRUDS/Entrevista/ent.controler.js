import { Entrevista } from './ent.entity';
export class EntrevistaController {
    constructor() {
        this.entrevista = [];
    }
    createEntrevista(req, res) {
        const { id_entrevista, fecha, hora, descripcion, adopcion_aprobada } = req.body;
        const fecha_rep = null;
        const hora_rep = null;
        const estado_ent = { pendiente: true, rechazada: false, aprobada: false, cancelada: false };
        const newEntrevista = new Entrevista(id_entrevista, fecha, hora, fecha_rep, hora_rep, estado_ent, descripcion, adopcion_aprobada);
        this.entrevista.push(newEntrevista);
        res.status(201).json(newEntrevista);
    }
    getEntrevista(req, res) {
        const id_entrevista = BigInt(req.params.nro);
        const entrevistas = this.entrevista.find(id => id.id_entrevista === id_entrevista);
        if (entrevistas) {
            res.status(200).json(entrevistas);
        }
        else {
            res.status(404).json({ message: 'Entrevista no encontrada' });
        }
    }
    updateEntrevista(req, res) {
        const id_entrevista = BigInt(req.params.nro);
        const index = this.entrevista.findIndex(id => id.id_entrevista === id_entrevista);
        if (index !== -1) {
            const { fecha, hora, fecha_rep, hora_rep, estado_ent, descripcion, adopcion_aprobada } = req.body;
            this.entrevista[index] = { id_entrevista, fecha, hora, fecha_rep, hora_rep, estado_ent, descripcion, adopcion_aprobada };
            res.status(200).json(this.entrevista[index]);
        }
        else {
            res.status(404).json({ message: 'Entrevista no encontrada' });
        }
    }
    deleteEntrevista(req, res) {
        const id_entrevista = BigInt(req.params.nro);
        const index = this.entrevista.findIndex(id => id.id_entrevista === id_entrevista);
        if (index !== -1) {
            this.entrevista.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Entrevista no encontrada' });
        }
    }
}
//# sourceMappingURL=ent.controler.js.map
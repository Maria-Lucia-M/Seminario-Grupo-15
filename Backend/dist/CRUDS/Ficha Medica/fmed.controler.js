import { FichaMedica } from "./fmed.entity";
export class FichaMedicaController {
    fichas = [];
    createFicha(req, res) {
        const { id_ficha, fecha, id_animal, matricula_vet, observaciones, nro_vacunas } = req.body;
        const nuevaFicha = new FichaMedica(id_ficha, fecha, id_animal, matricula_vet, observaciones, nro_vacunas);
        this.fichas.push(nuevaFicha);
        res.status(201).send(nuevaFicha);
    }
    getFichas(req, res) {
        res.status(200).send(this.fichas);
    }
    getFichaById(req, res) {
        const { id } = req.params;
        const ficha = this.fichas.find(f => f.id_ficha === BigInt(id));
        if (ficha) {
            res.status(200).send(ficha);
        }
        else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }
    updateFicha(req, res) {
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
        }
        else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }
    deleteFicha(req, res) {
        const { id } = req.params;
        const index = this.fichas.findIndex(f => f.id_ficha === BigInt(id));
        if (index !== -1) {
            this.fichas.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).send({ message: "Ficha no encontrada" });
        }
    }
}
//# sourceMappingURL=fmed.controler.js.map
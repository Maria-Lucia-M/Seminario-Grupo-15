import { Animal } from './ani.entity';
export class AnimalController {
    animales = [];
    createAnimal(req, res) {
        const { nro, especie, raza, edad_estimada, fecha_ingreso, imagen, video } = req.body;
        const fecha_defuncion = null;
        const estado = { apto: false, no_apto: true, en_adopcion: false, adoptado: false };
        const newAnimal = new Animal(nro, especie, raza, edad_estimada, fecha_ingreso, fecha_defuncion, estado, imagen, video);
        this.animales.push(newAnimal);
        res.status(201).json(newAnimal);
    }
    getAnimal(req, res) {
        const nro = BigInt(req.params.nro);
        const animal = this.animales.find(n => n.nro === nro);
        if (animal) {
            res.status(200).json(animal);
        }
        else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    }
    updateAnimal(req, res) {
        const nro = BigInt(req.params.nro);
        const index = this.animales.findIndex(n => n.nro === nro);
        if (index !== -1) {
            const { especie, raza, edad_estimada, fecha_ingreso, fecha_defuncion, estado, imagen, video } = req.body;
            this.animales[index] = { nro, especie, raza, edad_estimada, fecha_ingreso, fecha_defuncion, estado, imagen, video };
            res.status(200).json(this.animales[index]);
        }
        else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    }
    deleteAnimal(req, res) {
        const nro = BigInt(req.params.nro);
        const index = this.animales.findIndex(n => n.nro === nro);
        if (index !== -1) {
            this.animales.splice(index, 1);
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Animal no encontrado' });
        }
    }
}
//# sourceMappingURL=ani.controler.js.map
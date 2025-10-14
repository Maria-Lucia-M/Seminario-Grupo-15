import { RegistrarAnimal } from './RegistrarAnimal.js';
import { AnimalRepositoryMongo } from './animalRepositoryMongo.js';
export const findAllAnimales = async (req, res) => {
    try {
        const animales = await new AnimalRepositoryMongo().getAll();
        if (animales.length === 0) {
            res.status(200).json({ message: 'No hay animales registrados', data: [] });
            return;
        }
        ;
        res.status(200).json(animales);
        return;
    }
    catch (error) {
        console.error('Error al obtener animales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    ;
};
export const getOneAnimal = async (req, res) => {
    try {
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de animal inválido' });
            return;
        }
        ;
        const animal = await new AnimalRepositoryMongo().buscarPorNro(nro);
        if (!animal) {
            res.status(404).json({ message: 'Animal no encontrado' });
            return;
        }
        ;
        res.status(200).json({ message: "Animal encontrado", data: animal });
        return;
    }
    catch (error) {
        console.error('Error al obtener animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    ;
};
export const registrarAnimalController = async (req, res) => {
    try {
        const casoUso = new RegistrarAnimal(new AnimalRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);
        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
            return;
        }
        ;
        res.status(201).json({ message: "Animal creado con exito", data: resultado });
        return;
    }
    catch (error) {
        console.error('Error al registrar animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    ;
};
export const actualizarAnimal = async (req, res) => {
    try {
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de animal inválido' });
            return;
        }
        ;
        const repo = new AnimalRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Animal no encontrado' });
            return;
        }
        ;
        const actualizado = await repo.actualizar(nro, req.body);
        if (actualizado === null) {
            res.status(404).json({ message: 'No se pudo actualizar el animal' });
            return;
        }
        ;
        res.status(200).json({ message: 'Animal actualizado con éxito', data: actualizado });
        return;
    }
    catch (error) {
        console.error('Error al actualizar animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    ;
};
export const eliminarAnimal = async (req, res) => {
    try {
        const nro = parseInt(req.params.nro, 10);
        if (isNaN(nro)) {
            res.status(400).json({ message: 'Número de animal inválido' });
            return;
        }
        ;
        const repo = new AnimalRepositoryMongo();
        const existente = await repo.buscarPorNro(nro);
        if (!existente) {
            res.status(404).json({ message: 'Animal no encontrado' });
            return;
        }
        ;
        const eliminado = await repo.eliminar(nro);
        if (!eliminado) {
            res.status(404).json({ message: 'No se pudo eliminar el animal' });
            return;
        }
        ;
        res.status(200).json({ message: 'Animal eliminado con éxito' });
        return;
    }
    catch (error) {
        console.error('Error al eliminar animal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    ;
};
//# sourceMappingURL=animal.controler.js.map
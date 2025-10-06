import { Request, Response } from "express";
import { Animal } from "../../../CRUDS/Animal/ani.entity";
import Vacuna from "../../../CRUDS/Vacunas/vacu.entity";
import { FichaMedica } from "../../../CRUDS/FichaMedica/fich.entity";
import { AnimalController } from "../../../CRUDS/Animal/ani.controler";
import { VacunaController } from "../../../CRUDS/Vacunas/vacu.controller";
import { FichaMedicaController } from "../../../CRUDS/FichaMedica/fich.controler";

// Simulación de datos en memoria
const animales: Animal[] = [];
const vacunas: Vacuna[] = [];
const fichasMedicas: FichaMedica[] = [];

// Caso de uso: registrar alta de animal
export function registrarAltaAnimal(req: Request, res: Response): void {
    const nro = BigInt(req.params.nro);
    const animal = animales.find(n => n.nro === nro);

    if (!animal) {
        res.status(404).json({ message: 'Animal no encontrado' });
        return;
    }

    // Verifica si el animal está no disponible
    if (!animal.estado.no_disponible) {
        res.status(400).json({ message: 'El animal ya está disponible' });
        return;
    }

    // Simulación: ficha médica y vacunas al día (deberías consultar la ficha real)
    const fichaMedica = req.body.fichaMedica; // Debe contener array de vacunas asociadas
    const vacunasAlDia = fichaMedica && fichaMedica.vacunas && fichaMedica.vacunas.length > 0;

    if (!vacunasAlDia) {
        res.status(400).json({ message: 'El animal no tiene las vacunas al día' });
        return;
    }

    // Verifica resultado del periodo de adopción
    const finalizoAdopcion = req.body.finalizoAdopcion; // booleano enviado desde el botón

    if (typeof finalizoAdopcion === 'boolean') {
        if (finalizoAdopcion) {
            // Si finalizó correctamente, el animal pasa a no disponible
            animal.estado = { disponible: false, no_disponible: true };
            res.status(200).json({ message: 'El animal finalizó la adopción y está no disponible', animal });
        } else {
            // Si no finalizó, el animal sigue no disponible
            animal.estado = { disponible: false, no_disponible: true };
            res.status(200).json({ message: 'El animal no finalizó la adopción, sigue no disponible', animal });
        }
        return;
    }

    // Si cumple todo, se da de alta (disponible)
    animal.estado = { disponible: true, no_disponible: false };
    res.status(200).json({ message: 'El animal fue dado de alta y está disponible', animal });
}
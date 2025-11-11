import { Request, Response } from "express";
import { RegistrarAlta } from "./RegistrarAlta.js";
import { ObtenerAltas } from "./ObtenerAlta.js";
import { AnimalRepositoryMongo } from "./AltaRepositoryMongo.js";
import { FichaMedicaRepositoryMongo } from "../../../CRUDS/FichaMedica/fichaMedRepositoryMongo.js";

export const RegistrarAltaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const animalRepository = new AnimalRepositoryMongo();
        const fichaMedicaRepository = new FichaMedicaRepositoryMongo();
        const casoUso = new RegistrarAlta(animalRepository, fichaMedicaRepository);
        const resultado = await casoUso.ejecutar(req.body.animalId, {
            estado: req.body.estado,
            fecha_defuncion: req.body.fecha_defuncion
        });
        res.status(201).json(resultado);
        return;
    } catch (error: any) {
        console.error("Ha ocurrido un error al registrar el alta del animal:", error);
        res.status(500).json({ message: error.message || "Error interno del servidor" });
        return;
    }
};
export const ObtenerAltasController = async (req: Request, res: Response): Promise<void> => {
    try {
        const animalRepository = new AnimalRepositoryMongo();
        const casoUso = new ObtenerAltas(animalRepository);
        const resultado = await casoUso.ejecutar();
        res.status(200).json(resultado);
        return;
    } catch (error: any) {
        console.error("Ha ocurrido un error al obtener las altas de los animales:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
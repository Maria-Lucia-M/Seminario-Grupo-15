import { Request, Response } from "express";
import { RegistrarAlta } from "./RegistrarAlta.js";
import { AnimalRepositoryMongo } from "../../../CRUDS/Animal/animalRepositoryMongo.js";

export const RegistrarAltaController = async (req: Request, res: Response): Promise<void> => {
    try {
        const repo = new AnimalRepositoryMongo();
        const casoUso = new RegistrarAlta(repo);
        const resultado = await casoUso.ejecutar(req.body);

        if (Array.isArray(resultado)) {
            res.status(400).json({ errores: resultado });
        } else {
            res.status(201).json({
                message: "Alta de animal registrada correctamente",
                data: resultado
            });
        }
    } catch (error) {
        console.error("Error al registrar alta de animal:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepositoryMongo } from "../../../CRUDS/Animal/animalRepositoryMongo.js";

export class RegistrarAlta {
    constructor(private readonly repo: AnimalRepositoryMongo) {}

    async ejecutar(dto: AnimalDTO): Promise<AnimalDTO | string[]> {
        const errores: string[] = [];

        // Validación de datos requeridos
        if (
            !dto.nro ||
            !dto.especie ||
            !dto.raza ||
            !dto.edad_estimada ||
            !dto.fecha_ingreso ||
            !dto.imagen
        ) {
            errores.push("Datos incompletos para registrar alta de animal");
            return errores;
        }

        // Si el animal estaba "No apto", se cambia a "Apto"
        if (dto.estado === "No apto") {
            dto.estado = "Apto";
        }

        // Registrar en Mongo
        const animalRegistrado = await this.repo.registrar(dto);
        return animalRegistrado;
    }
}
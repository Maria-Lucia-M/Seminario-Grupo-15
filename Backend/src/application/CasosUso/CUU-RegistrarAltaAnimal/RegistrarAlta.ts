import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepository } from "../../interfaces/AnimalRepository.js";

export class RegistrarAlta {
    constructor(private readonly repo: AnimalRepository) {};

    async ejecutar(dto: AnimalDTO): Promise<AnimalDTO | string[]> {
        const errores: string[] = [];
        // Validar datos requeridos
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
        };

        // Cambiar estado a 'Apto' si estaba 'No Apto'
        if (dto.estado === "No apto") {
            dto.estado = "Apto";
        };

        // Registrar el alta en el repositorio
        const animalRegistrado = await this.repo.registrar(dto);
        return animalRegistrado;
    };
};
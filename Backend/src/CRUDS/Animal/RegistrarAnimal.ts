import { AnimalDTO } from '../../application/DTOs/AnimalDTO.js';
import { AnimalRepositoryMongo } from './animalRepositoryMongo.js';

export class RegistrarAnimal {
    constructor(private readonly repo: AnimalRepositoryMongo) {}

    async ejecutar(dto: AnimalDTO): Promise<AnimalDTO | string[]> {
        const errores: string[] = [];

        if (!dto.nro || !dto.especie || !dto.raza || !dto.edad_estimada || !dto.fecha_ingreso) {
            errores.push('Datos incompletos para registrar animal');
            return errores;
        };

        const existente = await this.repo.buscarPorNro(dto.nro);
        if (existente) {
            errores.push('Ya existe un animal con ese número');
            return errores;
        };

        return await this.repo.registrar(dto);
    };
};
import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepositoryMongo } from "../../../CRUDS/Animal/animalRepositoryMongo.js";
export class RegistrarAltaRepositoryMongo {
    private readonly repo: AnimalRepositoryMongo;

    constructor() {
        this.repo = new AnimalRepositoryMongo();
    }

    async registrar(dto: AnimalDTO): Promise<AnimalDTO> {
        const animalRegistrado = await this.repo.registrar(dto);
        return animalRegistrado;
    }

    async buscarPorNro(nro: number): Promise<AnimalDTO | null> {
        return await this.repo.buscarPorNro(nro);
    }

    async actualizar(nro: number, dto: Partial<AnimalDTO>): Promise<AnimalDTO | null> {
        return await this.repo.actualizar(nro, dto);
    }
}

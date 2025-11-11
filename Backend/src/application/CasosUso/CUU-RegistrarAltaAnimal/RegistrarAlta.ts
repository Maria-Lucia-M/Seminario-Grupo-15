import { FichaMedicaRepositoryMongo } from "../../../CRUDS/FichaMedica/fichaMedRepositoryMongo.js";
import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepository } from "../../interfaces/AnimalRepository.js";

export class RegistrarAlta {
  constructor(
    private animalRepository: AnimalRepository,
    private fichaMedicaRepository: FichaMedicaRepositoryMongo
  ) {}

  async ejecutar(animalId: string, comandoAlta: {
    estado: 'Apto' | 'No apto';
    fecha_defuncion?: Date;
    observaciones?: string;
  }) {
    // 1. Obtener animal
    const animal = await this.animalRepository.obtenerPorId(animalId);
    if (!animal) throw new Error('Animal no encontrado');

    // 2. Validar precondiciones
    if (animal.estado !== 'No apto') {
      throw new Error(`No se puede ingresar el animal. Estado actual: ${animal.estado}`);
    }

    // 3. Validar vacunas si es apto
    /*
    if (comandoAlta.estado === 'Apto') {
      const fichaMedica = await this.fichaMedicaRepository.obtenerPorAnimalId(animalId);
      if (!fichaMedica || !fichaMedica.vacunas || fichaMedica.vacunas.length === 0) {
        throw new Error('El animal debe tener vacunas registradas para ser dado de alta');
      }
    }
*/

    // 4. Camino alternativo: Animal fallece
    if (comandoAlta.fecha_defuncion) {
      animal.fecha_defuncion = comandoAlta.fecha_defuncion;
      animal.estado = 'no_disponible';
      await this.animalRepository.actualizar(animal);
      return animal;
    }

    // 5. Actualizar estado
    animal.estado = comandoAlta.estado;
    
    return await this.animalRepository.actualizar(animal);
  }
}
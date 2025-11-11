import { EntrevistaDTO } from '../../DTOs/EntrevistaDTO.js';
import { EntrevistaRepository } from '../../interfaces/EntrevistaRepository.js';
import { AnimalRepository } from '../../interfaces/AnimalRepository.js'; 
import { PersonaRepository } from '../../interfaces/PersonaRepository.js';


export class AltaEntrevista {
    constructor(
        private animalRepository: AnimalRepository,
//        private personaRepository: PersonaRepository,
        private entrevistaRepository: EntrevistaRepository
    ) {}

    async registrar(datosDTO: EntrevistaDTO): Promise<EntrevistaDTO> {
        // 1. Verificar Precondiciones (RN23 - Lista Negra)
        const adoptante = await this.PersonaRepository.buscarPorDni(datosDTO.dni_adoptante);
        if (!adoptante) {
            throw new Error('Adoptante no encontrado');
        }
        if (adoptante.estaEnListaNegra()) { // CREAR METODO EN PERSONA (AUN NO TIENE REPOSITORY)
            throw new Error('Inhabilitado para adoptar');
        }

        // 2. Verificar Precondiciones (Animal)
        const animal = await this.animalRepository.buscarPorNro(datosDTO.nro_animal); //CREAR METODO EN REPOSITORY ANIMAL
        if (!animal) {
            throw new Error('Animal no encontrado');
        }
        if (animal.getEstado() !== 'No adoptado') { // Asumiendo método en la entidad
            throw new Error('El animal no está disponible para adopción');
        }

        // 3. Flujo Básico (Crear Entrevista)
        const datosParaRegistrar: EntrevistaDTO = {
            fecha_entrevista: datosDTO.fecha_entrevista,
            hora_entrevista: datosDTO.hora_entrevista,
            dni_adoptante: datosDTO.dni_adoptante,
            nro_animal: datosDTO.nro_animal,
            estado: 'PENDIENTE'
        };

        const nuevaEntrevista = await this.entrevistaRepository.registrar(datosParaRegistrar);

        // 4. Flujo Básico (Marcar animal como "no disponible" - RN09)
        await this.animalRepository.actualizarEstado(datosDTO.id_animal, 'NO DISPONIBLE');  //CREAR METODO EN REPOSITORY ANIMAL

        // 5. Retornar datos (Según tu diccionario de datos)
        return {
            id_colaborador: nuevaEntrevista.id_colaborador ?? datosDTO.id_colaborador ?? 0,
            fecha_entrevista: nuevaEntrevista.fecha_entrevista ?? datosDTO.fecha_entrevista,
            hora_entrevista: nuevaEntrevista.hora_entrevista ?? datosDTO.hora_entrevista,
            dni_adoptante: adoptante.getDNI(),
            nro_animal: animal.getNroAnimal(),
            estado: nuevaEntrevista.estado,
            descripcion: nuevaEntrevista.descripcion ?? datosDTO.descripcion ?? null,
            fecha_rep: nuevaEntrevista.fecha_rep ?? null,
            hora_rep: nuevaEntrevista.hora_rep ?? null
        }as EntrevistaDTO;
    }
}
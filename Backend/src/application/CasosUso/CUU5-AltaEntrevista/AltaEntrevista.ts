import { EntrevistaDTO } from '../../DTOs/EntrevistaDTO.js';
import { EntrevistaRepository } from '../../interfaces/EntrevistaRepository.js';
import { AnimalRepository } from '../../interfaces/AnimalRepository.js'; 
import { PersonaRepository } from '../../interfaces/PersonaRepository.js';


export class AltaEntrevista {
    constructor(
        private animalRepository: AnimalRepository,
        private personaRepository: PersonaRepository,
        private entrevistaRepository: EntrevistaRepository
    ) {}

    async registrar(datosDTO: EntrevistaDTO): Promise<EntrevistaDTO> {
        // Verificar (RN23 - Lista Negra)
        const adoptante = await this.personaRepository.buscarPorDNI(datosDTO.dni_adoptante);
        if (!adoptante) {
            throw new Error('Adoptante no encontrado');
        }   
        if (adoptante.adoptante?.estado === 'No apto') {
        throw new Error('Inhabilitado para adoptar');
        }

        //  Verificar Precondiciones (Animal)
        const animal = await this.animalRepository.buscarPorNro(datosDTO.nro_animal);
        if (!animal) {
            throw new Error('Animal no encontrado');
        }
        if (animal.estado !== 'Apto') {
            throw new Error('El animal no está disponible para adopción');
        }

        // Flujo Básico (Crear Entrevista)
        const datosParaRegistrar: EntrevistaDTO = {
            fecha_entrevista: datosDTO.fecha_entrevista,
            hora_entrevista: datosDTO.hora_entrevista,
            dni_adoptante: datosDTO.dni_adoptante,
            nro_animal: datosDTO.nro_animal,
            estado: 'PENDIENTE',
            id_colaborador: datosDTO.id_colaborador ?? 0,
            descripcion: null,
            fecha_rep: null,
            hora_rep: null,
            id: '' // Se generará automáticamente
        };

        const nuevaEntrevista = await this.entrevistaRepository.registrar(datosParaRegistrar);

        // Marcar animal como "no disponible" - RN09
        await this.animalRepository.actualizar(datosDTO.nro_animal, { estado: 'no_disponible' });   

        return {
            id_colaborador: nuevaEntrevista.id_colaborador ?? datosDTO.id_colaborador ?? 0,
            fecha_entrevista: nuevaEntrevista.fecha_entrevista ?? datosDTO.fecha_entrevista,
            hora_entrevista: nuevaEntrevista.hora_entrevista ?? datosDTO.hora_entrevista,
            dni_adoptante: adoptante.dni,
            nro_animal: animal.nro,
            estado: nuevaEntrevista.estado,
            descripcion: nuevaEntrevista.descripcion ?? datosDTO.descripcion ?? null,
            fecha_rep: nuevaEntrevista.fecha_rep ?? null,
            hora_rep: nuevaEntrevista.hora_rep ?? null
        }as EntrevistaDTO;
    }
}
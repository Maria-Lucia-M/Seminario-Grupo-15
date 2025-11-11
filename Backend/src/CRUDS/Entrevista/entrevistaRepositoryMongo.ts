import { EntrevistaDTO } from '../../application/DTOs/EntrevistaDTO.js';
import { EntrevistaRepository } from '../../application/interfaces/EntrevistaRepository.js';
import { EntrevistaModel } from './entrevista.js';
import { mapearEntrevista } from './mapearEntrevista.js';
import { EstadoEntrevista, estadoValido } from '../../application/DTOs/EntrevistaDTO.js';

export class EntrevistaRepositoryMongo implements EntrevistaRepository {

    async registrar(dto: EntrevistaDTO): Promise<EntrevistaDTO> {
        if (!estadoValido.includes(dto.estado)) {
            throw new Error('Estado de entrevista inválido');
        };

        const entrevista = new EntrevistaModel(dto);
        const guardado = await entrevista.save();
        
        return mapearEntrevista(guardado);
    }
    
    async getAll(): Promise<EntrevistaDTO[]> {
        const docs = await EntrevistaModel.find().lean();
        return docs.map(mapearEntrevista);
    }

    async buscarPorId(id: string): Promise<EntrevistaDTO | null> {
         const doc = await EntrevistaModel.findById(id).lean();
         return doc ? mapearEntrevista(doc) : null;
    }

    async buscarPorDniAdoptante(dni: string): Promise<EntrevistaDTO[]> {
        const docs = await EntrevistaModel.find({ dni_adoptante: dni }).lean();
        return docs.map(mapearEntrevista);
    }

    async actualizar(id: string, dto: Partial<EntrevistaDTO>): Promise<EntrevistaDTO | null> {
        const doc = await EntrevistaModel.findByIdAndUpdate(id, dto, { new: true }).lean();
        return doc ? mapearEntrevista(doc) : null;
    }

    async eliminar(id: string): Promise<boolean> {
        const resultado = await EntrevistaModel.deleteOne({ _id: id });
        return resultado.deletedCount === 1;
    }
}
import { FichaMedicaDTO } from '../../application/DTOs/FichaMedicaDTO';
import { FichaMedicaModel } from './fichaMed.model.js';
import { mapearFichaMedica } from './mapearFichaMed.js';

export class FichaMedicaRepositoryMongo {
    async registrar(dto: FichaMedicaDTO): Promise<FichaMedicaDTO> {
        const FichaMedica = new FichaMedicaModel(dto);
        const guardado = await FichaMedica.save();

        return {
        nro_ficha: guardado.nro_ficha,
        nro_animal: guardado.nro_animal,
        matricula: guardado.matricula,
        nro_vacunas: guardado.nro_vacunas,
        observaciones: guardado.observaciones,
        fecha: guardado.fecha
        };
    };

    async getAll(): Promise<FichaMedicaDTO[]> {
        const guardados = await FichaMedicaModel.find().lean();
        return guardados.map(mapearFichaMedica);
    };

    async buscarPorNro(nro: number): Promise<FichaMedicaDTO | null> {
        const guardado = await FichaMedicaModel.findOne({ nro_ficha: nro }).lean();
        return guardado ? mapearFichaMedica(guardado) : null;
    };

    async actualizar(nro: number, dto: Partial<FichaMedicaDTO>): Promise<FichaMedicaDTO | null> {
        const guardado = await FichaMedicaModel.findOneAndUpdate({ nro_ficha: nro }, dto, { new: true }).lean();
        return guardado ? mapearFichaMedica(guardado) : null;
    };

    async eliminar(nro: number): Promise<boolean> {
        const resultado = await FichaMedicaModel.deleteOne({ nro_ficha: nro });
        return resultado.deletedCount === 1;
    };
};
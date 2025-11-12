import { Vacuna} from '../../application/DTOs/VacunaDTO.js';
import { VacunaModel } from './vacu.model.js';
import { mapearVacuna } from './mapearVacuna.js';

export class VacunaRepositoryMongo {
    async registrar(dto: Vacuna): Promise<Vacuna> {
        const vacuna = new VacunaModel(dto);
        const guardado = await vacuna.save();
        return {
            nro_vacuna: guardado.nro_vacuna,
            nombre: guardado.nombre,
            fecha_vencimiento: guardado.fecha_vencimiento,
            droga: guardado.droga,
            stock: guardado.stock,
            fecha_ingreso: guardado.fecha_ingreso
        };
    }

    async getAll(): Promise<Vacuna[]> {
        const guardados = await VacunaModel.find().lean();
        return guardados.map(mapearVacuna);
    }

    async buscarPorNro(nro: number): Promise<Vacuna | null> {
        const guardado = await VacunaModel.findOne({ nro_vacuna: nro }).lean();
        return guardado ? mapearVacuna(guardado) : null;
    }

    async actualizar(nro: number, dto: Partial<Vacuna>): Promise<Vacuna | null> {
        const guardado = await VacunaModel.findOneAndUpdate({ nro_vacuna: nro }, dto, { new: true }).lean();
        return guardado ? mapearVacuna(guardado) : null;
    }
    
    async restarStock(nro_vacuna: number, cantidad: number): Promise<void> {
        await VacunaModel.updateOne(
            { nro_vacuna },
            { $inc: { stock: - cantidad } }
        );
    }

    async eliminar(nro: number): Promise<boolean> {
        const resultado = await VacunaModel.deleteOne({ nro_vacuna: nro });
        return resultado.deletedCount === 1;
    }
};
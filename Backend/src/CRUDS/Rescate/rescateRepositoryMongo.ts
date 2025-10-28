import { RescateDTO } from "../../application/DTOs/RescateDTO";
import { RescateModel } from "./res.model";
import { mapearRescate } from "./mapearRescate";

export class RescateRepositoryMongo {
    public async crearRescate(rescateDTO: RescateDTO): Promise<RescateDTO> {
        const nuevoRescate = new RescateModel(rescateDTO);
        const rescateGuardado = await nuevoRescate.save();
        return mapearRescate(rescateGuardado);
    }
    public async obtenerRescates(): Promise<RescateDTO[]> {
        const rescates = await RescateModel.find();
        return rescates.map(mapearRescate);
    }
    public async obtenerRescatePorNroAnimal(nro_animal: number): Promise<RescateDTO | null> {
        const rescate = await RescateModel.findOne({ nro_animal });
        return rescate ? mapearRescate(rescate) : null;
    }
    public async actualizarRescate(nro_animal: number, rescateDTO: Partial<RescateDTO>): Promise<RescateDTO | null> {
        const rescateActualizado = await RescateModel.findOneAndUpdate(
            { nro_animal },
            rescateDTO,
            { new: true }
        );
        return rescateActualizado ? mapearRescate(rescateActualizado) : null;
    }
    public async eliminarRescate(nro_animal: number): Promise<boolean> {
        const resultado = await RescateModel.deleteOne({ nro_animal });
        return resultado.deletedCount === 1;
    }
}
import { RescatistaDTO } from "../../application/DTOs/RescatistaDTO.js";
import { RescatistaModel } from "./rescatista.model.js";
import { mapearRescatista } from "./mapearRescatista.js";

export class RescatistaRepositoryMongo {
    async create(rescatistaDTO: RescatistaDTO): Promise<RescatistaDTO> {
        const nuevoRescatista = new RescatistaModel(rescatistaDTO);
        const rescatistaGuardado = await nuevoRescatista.save();
        return mapearRescatista(rescatistaGuardado);
    }
    async getAll(): Promise<RescatistaDTO[]> {
        const rescatistas = await RescatistaModel.find();
        return rescatistas.map(mapearRescatista);
    }
    async buscarPorNro(dni: string): Promise<RescatistaDTO | null> {
            const guardado = await RescatistaModel.findOne({ dni: dni }).lean();
            return guardado ? mapearRescatista(guardado) : null;
        };
    async update(dni: string, dto: Partial<RescatistaDTO>): Promise<RescatistaDTO | null> {
            const guardado = await RescatistaModel.findOneAndUpdate({ dni: dni }, dto, { new: true }).lean();
            return guardado ? mapearRescatista(guardado) : null;
        };
    async delete(dni: string): Promise<boolean> {
            const resultado = await RescatistaModel.deleteOne({ dni: dni });
            return resultado.deletedCount === 1;
        };
      }
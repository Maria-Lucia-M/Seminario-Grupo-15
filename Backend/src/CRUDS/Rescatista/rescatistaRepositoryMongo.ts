import { RescatistaDTO } from "../../application/DTOs/RescatistaDTO";
import { RescatistaModel } from "./res.model";
import { mapearRescatista } from "./mapearRescatista";

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
    async getById(_id: string): Promise<RescatistaDTO | null> {
        const rescatista = await RescatistaModel.findById(_id);
        return rescatista ? mapearRescatista(rescatista) : null;
    }
    async update(_id: string, rescatistaDTO: Partial<RescatistaDTO>): Promise<RescatistaDTO | null> {
        const rescatistaActualizado = await RescatistaModel.findByIdAndUpdate(
            _id,
            rescatistaDTO,
            { new: true }
        );
        return rescatistaActualizado ? mapearRescatista(rescatistaActualizado) : null;
    }
    async delete(_id: string): Promise<boolean> {
        const resultado = await RescatistaModel.findByIdAndDelete(_id);
        return resultado !== null;
    }
}
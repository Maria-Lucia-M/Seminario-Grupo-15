import { RefreshTokenModel } from "./refresh-token.entity.js";

export class RefreshTokenRepository {
    // Guardar nuevo token
    async add(token: string, personaId: string): Promise<void> {
        await RefreshTokenModel.create({ token, persona: personaId });
    };

    // Buscar por token
    async findByToken(token: string): Promise<any | null> {
        return RefreshTokenModel.findOne({ token }).populate('persona').exec();
    };

    // Eliminar por token
    async removeByToken(token: string): Promise<void> {
        await RefreshTokenModel.deleteOne({ token });
    };

    // Eliminar por entidad
    async removeEntity(entityId: string): Promise<void> {
        await RefreshTokenModel.deleteOne({ _id: entityId });
    };
};
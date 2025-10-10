import { SeguimientoDTO } from "../DTOs/SeguimientoDTO.js";
export interface SeguimientoRepository {
    registrar(dto:SeguimientoDTO): Promise<SeguimientoDTO>;
};
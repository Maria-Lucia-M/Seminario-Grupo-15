import { RescateDTO } from "../../application/DTOs/RescateDTO";

export function mapearRescate(doc: any): RescateDTO {
    return {
        lugar_rescate: doc.lugar_rescate,
        fecha_rescate: doc.fecha_rescate,
        nro_animal: doc.nro_animal,
        dni_rescatista: doc.dni_rescatista
    };
}
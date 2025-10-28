import { RescatistaDTO } from "../../application/DTOs/RescatistaDTO";

export function mapearRescatista(doc: any): RescatistaDTO {
    return {
        dni: doc.dni,
        nombre: doc.nombre,
        apellido: doc.apellido,
        telefono: doc.telefono
    };
}
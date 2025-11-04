import { Vacuna } from "../../application/DTOs/VacunaDTO.js";

export function mapearVacuna(doc: any): Vacuna {
    return {
        nro_vacuna: doc.nro_vacuna,
        fecha_vencimiento: doc.fecha_vencimiento,
        droga: doc.droga.map((d: any) => ({
            nombre: d.nombre,
            descripcion: d.descripcion
        })),
        stock: doc.stock,
        fecha_ingreso: doc.fecha_ingreso
    };
}
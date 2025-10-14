import { AnimalDTO, Especie } from '../../application/DTOs/AnimalDTO';

type Estado = 'Disponible' | 'No disponible';

export function mapearAnimal(doc: any): AnimalDTO {
    return {
        nro: doc.nro,
        especie: doc.especie as Especie,
        raza: doc.raza,
        edad_estimada: doc.edad_estimada,
        fecha_ingreso: doc.fecha_ingreso,
        fecha_defuncion: doc.fecha_defuncion,
        estado: doc.estado as Estado,
        imagen: doc.imagen,
        video: doc.video
    };
};
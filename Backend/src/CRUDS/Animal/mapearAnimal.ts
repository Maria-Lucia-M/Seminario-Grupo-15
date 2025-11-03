import { AnimalDTO} from '../../application/DTOs/AnimalDTO';

type Especie = 'Perro' | 'Gato';

type Estado = 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado';

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
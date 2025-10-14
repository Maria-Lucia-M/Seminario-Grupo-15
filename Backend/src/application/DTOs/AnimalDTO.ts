type Raza = 'Dogo' | 'Fila Du Brasil' | 'Pancho salchicha' | 'Cusco' | 'Otros';

<<<<<<< HEAD
type Especie = 'Perro' | 'Gato';

type Estado = 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado';
=======
export type Especie = 'Perro' | 'Gato';
>>>>>>> 9588e49a77e4e21d86b8668601c1a37f987860e0

export interface AnimalDTO {
    nro: number;
    especie: Especie;
    raza: string;
    edad_estimada: number;
    fecha_ingreso: Date;
<<<<<<< HEAD
    fecha_defuncion: Date | null;
    estado: Estado;
    imagen: string;
    video: string | null;
=======
    fecha_defuncion?: Date | null;
    estado: 'Disponible' | 'No disponible';
    imagen?: string[];
    video?: string[];
>>>>>>> 9588e49a77e4e21d86b8668601c1a37f987860e0
};
interface Droga {
    nombre: string;
    descripcion: string;
};

export interface Vacuna {
    nro_vacuna: number;
    fecha_vencimiento:Date;
    droga: Droga[];
    stock: number;
    fecha_ingreso: Date;
};
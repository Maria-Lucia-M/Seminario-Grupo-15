interface Droga {
  nombre: string;
  descripcion: string;
}

export interface Vacuna {
  nro_vacuna: number;
  nombre: string;
  fecha_vencimiento: Date;
  droga: Droga[];
  stock: number;
  fecha_ingreso: Date;
}
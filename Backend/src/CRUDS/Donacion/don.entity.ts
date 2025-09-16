export class Donacion {
  nro_donacion: number;
  tipo: string;
  cantidad: number;
  descripcion: string;
  fecha_vencimiento: Date | null;

  constructor(nro_donacion: number, tipo: string, cantidad: number, descripcion: string, fecha_vencimiento: Date | null) {
    this.nro_donacion = nro_donacion;
    this.tipo = tipo;
    this.cantidad = cantidad;
    this.descripcion = descripcion;
    this.fecha_vencimiento = fecha_vencimiento;
  }
}
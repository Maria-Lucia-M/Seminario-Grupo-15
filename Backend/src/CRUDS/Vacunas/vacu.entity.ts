export  class Vacuna {
    nro_vacuna: number;
    fecha_vencimiento: Date;
    droga: string;
    stock: number;
    fecha_ingreso: Date;

    constructor(nro_vacuna: number, fecha_vencimiento: Date, droga: string, stock: number, fecha_ingreso: Date) {
        this.nro_vacuna = nro_vacuna;
        this.fecha_vencimiento = fecha_vencimiento;
        this.droga = droga;
        this.stock = stock;
        this.fecha_ingreso = fecha_ingreso;
    };
}
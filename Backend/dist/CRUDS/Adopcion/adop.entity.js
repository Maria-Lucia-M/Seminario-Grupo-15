export class Adopcion {
    nro_adopcion;
    nro_animal;
    dni_adoptante;
    fecha_adopcion;
    fecha_retiro;
    motivos_retiro;
    evidencia_maltrato;
    constructor(nro_adopcion, nro_animal, dni_adoptante, fecha_adopcion, fecha_retiro, motivos_retiro, evidencia_maltrato) {
        this.nro_adopcion = nro_adopcion;
        this.nro_animal = nro_animal;
        this.dni_adoptante = dni_adoptante;
        this.fecha_adopcion = fecha_adopcion;
        this.fecha_retiro = fecha_retiro;
        this.motivos_retiro = motivos_retiro;
        this.evidencia_maltrato = evidencia_maltrato;
    }
}
//# sourceMappingURL=adop.entity.js.map
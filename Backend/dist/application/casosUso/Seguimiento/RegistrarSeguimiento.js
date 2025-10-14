export class RegistrarSeguimiento {
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async ejecutar(dto) {
        const errores = [];
        if (!dto.nro_adopcion || !dto.fecha_seguimiento || !dto.estado_animal || !dto.entorno) {
            errores.push("Datos incompletos para registrar seguimiento");
            return errores;
        }
        ;
        if (dto.estado_animal === "No apto") {
            errores.push("El animal no es apto para adopcion");
            return errores;
        }
        ;
        const seguimiento = await this.repo.registrar(dto);
        return seguimiento;
    }
    ;
}
;
//# sourceMappingURL=RegistrarSeguimiento.js.map
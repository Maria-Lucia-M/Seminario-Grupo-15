export class RegistrarAnimal {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async ejecutar(dto) {
        const errores = [];
        if (!dto.nro || !dto.especie || !dto.raza || !dto.edad_estimada || !dto.fecha_ingreso) {
            errores.push('Datos incompletos para registrar animal');
            return errores;
        }
        ;
        const existente = await this.repo.buscarPorNro(dto.nro);
        if (existente) {
            errores.push('Ya existe un animal con ese número');
            return errores;
        }
        ;
        return await this.repo.registrar(dto);
    }
    ;
}
;
//# sourceMappingURL=RegistrarAnimal.js.map
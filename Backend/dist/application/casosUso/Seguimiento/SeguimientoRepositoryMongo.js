import { SeguimientoModel } from '../../CasosUso/Seguimiento/Seguimiento.js';
export class SeguimientoRepositoryMongo {
    async registrar(dto) {
        const seguimiento = new SeguimientoModel(dto);
        const guardado = await seguimiento.save();
        return guardado.toObject();
    }
    ;
}
;
//# sourceMappingURL=SeguimientoRepositoryMongo.js.map
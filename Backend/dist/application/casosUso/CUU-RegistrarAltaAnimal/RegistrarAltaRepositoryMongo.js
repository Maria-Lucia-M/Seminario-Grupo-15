import { AnimalModel } from "./AltaAnimal.js";
export class AltaRepositoryMongo {
    async registrar(dto) {
        const alta = new AnimalModel(dto);
        const guardado = await alta.save();
        return guardado.toObject();
    }
    ;
}
;
//# sourceMappingURL=RegistrarAltaRepositoryMongo.js.map
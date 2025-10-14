import { RegistrarAlta } from "./RegistrarAlta.js";
import { AltaRepositoryMongo } from "./RegistrarAltaRepositoryMongo.js";
export const RegistrarAltaController = async (req, res) => {
    try {
        const casoUso = new RegistrarAlta(new AltaRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);
        res.status(201).json(resultado);
        return;
    }
    catch (error) {
        console.error("Ha ocurrido un error al registrar el alta del animal:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
    ;
};
//# sourceMappingURL=RegistrarAlta.controller.js.map
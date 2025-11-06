import { RegistrarSeguimiento } from "../../CasosUso/Seguimiento/RegistrarSeguimiento.js";
import { ObtenerSeguimientos } from "../../CasosUso/Seguimiento/ObtenerSeguimientos.js";
import { SeguimientoRepositoryMongo } from "../../CasosUso/Seguimiento/SeguimientoRepositoryMongo.js";
export const RegistrarSeguimentoController = async (req, res) => {
    try {
        const casoUso = new RegistrarSeguimiento(new SeguimientoRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);
        res.status(201).json(resultado);
        return;
    }
    catch (error) {
        console.error("Ha ocurrido un error al registrar el seguimiento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
    ;
};
export const ObtenerSeguimientosController = async (req, res) => {
    try {
        const casoUso = new ObtenerSeguimientos(new SeguimientoRepositoryMongo());
        const resultado = await casoUso.ejecutar();
        res.status(200).json(resultado);
        return;
    }
    catch (error) {
        console.error("Ha ocurrido un error al obtener los seguimientos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
//# sourceMappingURL=RegistrarSeguimientoController.js.map
import { Request, Response } from "express";
import { RegistrarSeguimiento } from "../../casosUso/Seguimiento/RegistrarSeguimiento.js";
import { SeguimientoRepositoryMongo } from "../../casosUso/Seguimiento/SeguimientoRepositoryMongo.js";

export const RegistrarSeguimentoController = async (req: Request, res: Response):Promise<void> => {
    try{
        const casoUso = new RegistrarSeguimiento(new SeguimientoRepositoryMongo());
        const resultado = await casoUso.ejecutar(req.body);
        res.status(201).json(resultado);
        return;
    }catch(error){
        console.error("Ha ocurrido un error al registrar el seguimiento:", error);
        res.status(500).json({message: "Error interno del servidor"});
        return;
    };
};
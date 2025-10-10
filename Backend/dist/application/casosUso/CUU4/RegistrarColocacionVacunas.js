import { FichaMedicaController } from "../../../CRUDS/Ficha Medica/fmed.controler.js";
const vacunas = [];
export function registrarColocacionVacunas(req, res) {
    const numerosVacunas = (req.body.numerosVacunas);
    const vacunasNecesarias = vacunas.filter(v => numerosVacunas.includes(v.nro_vacuna));
    const vacunasSinStock = vacunasNecesarias.filter(v => v.stock <= 0);
    const vacunasVencidas = vacunasNecesarias.filter(v => v.fecha_vencimiento < new Date());
    if (vacunasSinStock.length > 0) {
        res.status(400).json({ message: 'La o las siguientes vacunas se encuentran sin stock:', vacunasSinStock });
        if (vacunasVencidas.length > 0) {
            res.status(400).json({ message: 'La o las siguientes vacunas se encuentran vencidas:', vacunasVencidas });
        }
    }
    res.status(200).json({ message: 'Vacunas seleccionadas correctamente!' });
    const fichaMedicaController = new FichaMedicaController();
    const nuevaFichaMedica = fichaMedicaController.createFicha(req, res);
    res.status(201).json({ message: 'Ficha médica creada con éxito', nuevaFichaMedica });
}
//# sourceMappingURL=RegistrarColocacionVacunas.js.map
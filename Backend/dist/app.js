import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
//Rutas CRUDs:
import { animalRoutes } from './CRUDS/Animal/animal.Routes.js';
//Rutas del sistema:
import { seguimientoRouter } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
dotenv.config();
const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI;
app.use(cors({
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexión:', err))
    .finally(() => console.log('Intento de conexión finalizado'));
app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
});
app.use('/api/seguimientos', seguimientoRouter);
app.use('/api', animalRoutes);
export default app;
//# sourceMappingURL=app.js.map
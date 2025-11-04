import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

//Rutas CRUDs:
import { animalRoutes } from './CRUDS/Animal/animal.Routes.js';
import { fichaMedicaRoutes} from './CRUDS/FichaMedica/fichaMed.Routes.js'
import { vacunaRouter } from './CRUDS/Vacunas/vacuna.Routes.js';

//Rutas del sistema:
import { RegistrarSeguimientoRoutes } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión:', err))
.finally(() => console.log('Intento de conexión finalizado'));

app.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});

app.use('/api', RegistrarSeguimientoRoutes);
app.use('/api', animalRoutes);
app.use('/api', fichaMedicaRoutes);
app.use('/api', vacunaRouter);

export default app;
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import path from 'path'; //Tuve un problema con las variables de entorno y esto lo solucionó

//Rutas CRUDs:
import { animalRoutes } from './CRUDS/Animal/animal.Routes.js';
import { fichaMedicaRoutes} from './CRUDS/FichaMedica/fichaMed.Routes.js'
import { vacunaRouter } from './CRUDS/Vacunas/vacuna.Routes.js';
import { rescateRoutes } from './CRUDS/Rescate/rescate.Routes.js';
import { rescatistaRoutes } from './CRUDS/Rescatista/rescatista.Routes.js';
import { personaRouter } from './CRUDS/Persona/persona.Routes.js';
import { entrevistaRoutes } from './CRUDS/Entrevista/entrevista.Routes.js';

//Rutas del sistema:
import { seguimientoRouter } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
//import { RegistrarSeguimientoRoutes } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
import { AltaEntrevistaRoutes } from './application/CasosUso/CUU5-AltaEntrevista/AltaEntrevista.routes.js';

const isDev = process.env.NODE_ENV !== 'production';//Tuve un problema con las variables de entorno y esto lo solucionó
const envPath = path.resolve(process.cwd(), isDev ? '.env.local' : '.env');//Tuve un problema con las variables de entorno y esto lo solucionó
dotenv.config({ path: envPath, override: true });//Tuve un problema con las variables de entorno y esto lo solucionó

//dotenv.config();
const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI as string;

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
app.use('/api', fichaMedicaRoutes);
app.use('/api', vacunaRouter);
app.use('/api', rescateRoutes);
app.use('/api', rescatistaRoutes);
app.use('/api/personas', personaRouter);
app.use('/api', AltaEntrevistaRoutes);
app.use('/api', entrevistaRoutes);

export default app;
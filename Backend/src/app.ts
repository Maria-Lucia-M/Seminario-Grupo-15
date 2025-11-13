import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

//Rutas CRUDs:
import { animalRoutes } from './CRUDS/Animal/animal.Routes.js';
<<<<<<< HEAD
import { fichaMedicaRoutes} from './CRUDS/FichaMedica/fichaMed.Routes.js'
import { vacunaRouter } from './CRUDS/Vacunas/vacuna.Routes.js';
import { rescateRoutes } from './CRUDS/Rescate/rescate.Routes.js';
import { rescatistaRoutes } from './CRUDS/Rescatista/rescatista.Routes.js';
import { personaRouter } from './CRUDS/Persona/persona.Routes.js';
import { entrevistaRoutes } from './CRUDS/Entrevista/entrevista.Routes.js';
import { authRouter } from './auth/auth.routes.js';

//Rutas del sistema:
import { seguimientoRouter } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
//import { RegistrarSeguimientoRoutes } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
import { AltaEntrevistaRoutes } from './application/CasosUso/CUU5-AltaEntrevista/AltaEntrevista.routes.js';
=======
import { listaNegraRoutes } from './CRUDS/ListaNegra/listaNegra.Routes.js';
import { setRoutes as setPersonaRoutes } from './CRUDS/Persona/persona.Routes.js';

//Rutas del sistema:
import { RegistrarSeguimientoRoutes } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';
>>>>>>> 7dd6bb806760a13fc91f63e65ced966d092e8bba

const isDev = process.env.NODE_ENV !== 'production';//Tuve un problema con las variables de entorno y esto lo solucionó
const envPath = path.resolve(process.cwd(), isDev ? '.env.local' : '.env');//Tuve un problema con las variables de entorno y esto lo solucionó
dotenv.config({ path: envPath, override: true });//Tuve un problema con las variables de entorno y esto lo solucionó

//dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api/seguimientos', seguimientoRouter);
app.use('/api', animalRoutes);
<<<<<<< HEAD
app.use('/api', fichaMedicaRoutes);
app.use('/api', vacunaRouter);
app.use('/api', rescateRoutes);
app.use('/api', rescatistaRoutes);
app.use('/api/personas', personaRouter);
app.use('/api', AltaEntrevistaRoutes);
app.use('/api', entrevistaRoutes);
app.use('/api/auth', authRouter);
=======
app.use('/api', listaNegraRoutes);
setPersonaRoutes(app);
>>>>>>> 7dd6bb806760a13fc91f63e65ced966d092e8bba

export default app;
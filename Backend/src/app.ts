import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

//Rutas CRUDs:
import { animalRoutes } from './CRUDS/Animal/animal.Routes.js';
import { fichaMedicaRoutes} from './CRUDS/FichaMedica/fichaMed.Routes.js'
import { vacunaRouter } from './CRUDS/Vacunas/vacuna.Routes.js';
import { rescateRoutes } from './CRUDS/Rescate/rescate.Routes.js';
import { rescatistaRoutes } from './CRUDS/Rescatista/rescatista.Routes.js';
import { personaRouter } from './CRUDS/Persona/persona.Routes.js';
import { authRouter } from './auth/auth.routes.js';

//Rutas del sistema:
import { seguimientoRouter } from './application/CasosUso/Seguimiento/RegistrarSeguimiento.routes.js';

const isDev = process.env.NODE_ENV !== 'production';
const envPath = path.resolve(process.cwd(), isDev ? '.env.local' : '.env');
dotenv.config({ path: envPath, override: true });

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use('/api/seguimientos', seguimientoRouter);
app.use('/api', animalRoutes);
app.use('/api', fichaMedicaRoutes);
app.use('/api', vacunaRouter);
app.use('/api', rescateRoutes);
app.use('/api', rescatistaRoutes);
app.use('/api/personas', personaRouter);
app.use('/api/auth', authRouter);

export default app;
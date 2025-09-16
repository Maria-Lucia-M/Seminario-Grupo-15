import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI;
dotenv.config();
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexión:', err))
    .finally(() => console.log('Intento de conexión finalizado'));
// ...rutas y lógica...
app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
});
//# sourceMappingURL=app.js.map
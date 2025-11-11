import app from "./app.js";
import redisClient from "./config/redisClient.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: process.env.NODE_ENV !== 'production' ? '.env.local' : '.env' });
const MONGO_URI = process.env.MONGO_URI as string;
console.log("NODE_ENV INICIALIZADO COMO:", process.env.NODE_ENV);
async function bootstrap() {
    try{
        redisClient.on("error", err => console.error("Error en Redis: ", err));
        if (redisClient.status !== 'ready' && redisClient.status !== 'connecting') {
            await redisClient.connect();
        };

        app.locals.redis = redisClient;

        mongoose.connect(MONGO_URI)
        .then(() => console.log('Conectado a MongoDB'))
        .catch((err) => console.error('Error de conexión:', err))
        .finally(() => console.log('Intento de conexión finalizado'));

        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000/');
        });
    }catch(error){
        console.error("Error al iniciar la app:", error);
        process.exit(1);
    };
};

bootstrap(); 
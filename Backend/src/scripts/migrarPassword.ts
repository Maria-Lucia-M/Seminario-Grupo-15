import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

async function migrarContraseña() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');

        const resultado = await mongoose.connection.db!.collection('personas').updateMany(
            { contraseña: { $exists: true } },
                [
                    { $set: { password: "$contraseña" } },
                    { $unset: "contraseña" }
                ]
        );

        console.log(`Documentos actualizados: ${resultado.modifiedCount}`);
    } catch (error) {
        console.error('Error en la migración:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Conexión cerrada');
    };
};

migrarContraseña();
//Ejecutar de ser necesario:
// npm run build
// node dist/scripts/migrarPassword.js
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI!);

const personas = await mongoose.connection.db!.collection('personas').find({
    password: { $exists: true, $type: 'string' }
}).toArray();

const sinHashear = personas.filter(p => p.password.length < 20);

for (const persona of sinHashear) {
    const hashed = await bcrypt.hash(persona.password, 10);
    await mongoose.connection.db!.collection('personas').updateOne(
        { _id: persona._id },
        { $set: { password: hashed } }
    );
    console.log(`Contraseña hasheada para ${persona.email}`);
}

await mongoose.disconnect();
//Ejecutar de ser necesario:
// npm run build
// node dist/scripts/hashearPassword.js
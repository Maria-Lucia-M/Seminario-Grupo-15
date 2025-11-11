import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGO_URI!);

    const personas = await mongoose.connection.db!
      .collection('personas')
      .find({ password: { $exists: true, $type: 'string' } })
      .toArray();

    const sinHashear = personas.filter(p => p.password.length < 20);

    console.log(`🔍 Se encontraron ${sinHashear.length} contraseñas sin hashear`);

    for (const persona of sinHashear) {
      const hashed = await bcrypt.hash(persona.password, 10);
      await mongoose.connection.db!.collection('personas').updateOne(
        { _id: persona._id },
        { $set: { password: hashed } }
      );
      console.log(`✅ Contraseña hasheada para ${persona.email}`);
    }

    await mongoose.disconnect();
    console.log('🚀 Proceso completado. Conexión cerrada.');
  } catch (error) {
    console.error('❌ Error al hashear contraseñas:', error);
    process.exit(1);
  }
}

main();

import Redis from 'ioredis';

const isDev = process.env.NODE_ENV !== 'production';
console.log("Entorno detectado en redisClient.ts:", process.env.NODE_ENV);

const redisClient = isDev
    ? new Redis({
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
    })
    : new Redis(process.env.REDIS_URL!, {
        lazyConnect: true, // evita conexión automática hasta que se llame a .connect()
    });
console.log(`Redis configurado en modo ${isDev ? 'desarrollo' : 'producción'}`);

export default redisClient;
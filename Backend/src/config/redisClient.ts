import Redis from 'ioredis';

const isDev = process.env.NODE_ENV !== 'production';
console.log("Entorno detectado en redisClient.ts:", process.env.NODE_ENV);

let redisClient: Redis;

if (isDev) {
    const host = process.env.REDIS_HOST || '127.0.0.1';
    const portRaw = process.env.REDIS_PORT || '6379';
    const port = Number(portRaw);

    console.log(`Redis configurado en modo desarrollo -> host=${host}, port=${port}`);

    redisClient = new Redis({
        host,
        port,
        // NO reintentar infinitamente si no hay servidor
        retryStrategy: () => null,
        maxRetriesPerRequest: 1,
    });
} else {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error('Falta REDIS_URL para producción');
    }

    redisClient = new Redis(redisUrl, {
        lazyConnect: true,
    });
}

redisClient.on('error', (err) => {
    console.error('Error en Redis:', err.message);
});

export default redisClient;

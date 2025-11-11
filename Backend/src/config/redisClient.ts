import Redis from 'ioredis';

const isDev = process.env.NODE_ENV !== 'production';
console.log("Entorno detectado en redisClient.ts:", process.env.NODE_ENV);

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

const redisClient = isDev
  ? new Redis({
      host: redisHost,
      port: redisPort,
    })
  : new Redis(process.env.REDIS_URL!, {
      lazyConnect: true,
    });

console.log(`Redis configurado en modo ${isDev ? 'desarrollo' : 'producción'}`);

export default redisClient;
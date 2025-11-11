import type { Redis as RedisClient } from "ioredis";

export class FailedLoginRepository {
    constructor(private readonly redis: RedisClient) {}

    //Obtener intentos fallidos de un usuario
    async getAttempts(email:string): Promise<number>{
        const attempts = await this.redis.get(`login_attempts_${email}`);
        return attempts ? parseInt(attempts): 0;
    };

    //Incrementar intentos fallidos y establecer expiracion automatica
    async incrementAttempts(email:string): Promise<void>{
        const attempts = await this.getAttempts(email);
        await this.redis.set(`login_attempts_${email}`, attempts + 1, "EX", 15 * 60); // Expira en 15 minutos.
    };

    //Resetear los intentos al lograr un login exitoso
    async resetAttempts(email:string): Promise<void>{
        await this.redis.del(`login_attempts_${email}`);
    };
};
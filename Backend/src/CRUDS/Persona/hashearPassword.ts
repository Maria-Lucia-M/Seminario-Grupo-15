import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Número de rondas de hashing (mayor = más seguro pero más lento)
export async function hashearPassword(password:string):Promise<string> {
    const hashPass = await bcrypt.hash(password, SALT_ROUNDS);
    return hashPass;
};
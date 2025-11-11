import { Schema, model, Types } from 'mongoose';

const refreshTokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    persona: { type: Types.ObjectId, ref: 'Persona', required: true },
    creadoEn: { type: Date, default: Date.now }
});

export const RefreshTokenModel = model('RefreshToken', refreshTokenSchema);
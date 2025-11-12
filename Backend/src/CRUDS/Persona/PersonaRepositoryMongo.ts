import { PersonaDTO } from "../../application/DTOs/PersonaDTO.js";
import { PersonaConId } from "./extensionPersona.js";
import { PersonaRepository } from "../../application/interfaces/PersonaRepository.js";
import { PersonaModel } from "./personaModel.js";
import { AdoptanteModel } from "./adoptanteModel.js";
import { VeterinarioModel } from "./veterinarioModel.js";
import { ColaboradorModel } from "./colaboradorModel.js";
import { hashearPassword } from "./hashearPassword.js";

export class PersonaRepositoryMongo implements PersonaRepository {
    async registrarPersona(persona: PersonaDTO): Promise<PersonaDTO> {
        let modelo;
        if(persona.veterinario){
            modelo = new VeterinarioModel({ ...persona, ...persona.veterinario });
        } else if(persona.colaborador){
            modelo = new ColaboradorModel({...persona, ...persona.colaborador});
        } else {
            modelo = new AdoptanteModel({...persona, ...persona.adoptante});
        };

        modelo.password = await hashearPassword(persona.password);

        const guardado = await modelo.save();
        const plano = guardado.toObject()as unknown as PersonaDTO;
        
        return plano;
    };
    
    async buscarPorDNI(dni: number): Promise<PersonaDTO | null> {
        const persona = await PersonaModel.findOne({ dni }).lean();
        return persona as PersonaDTO | null;
    };

    async listarPersonas(): Promise<PersonaDTO[]> {
        const personas = await PersonaModel.find().lean();
        return personas.map(persona => persona as unknown as PersonaDTO);
    };

    async actualizarPersona(dni: number, persona: Partial<PersonaDTO>): Promise<PersonaDTO | null> {
        const actualizado = await PersonaModel.findOneAndUpdate({ dni }, persona, { new: true }).lean();
        return actualizado as PersonaDTO | null;
    };

    async eliminarPersona(dni: number): Promise<boolean> {
        const resultado = await PersonaModel.deleteOne({ dni });
        return resultado.deletedCount === 1;
    };

    async buscarPorEmail(email: string): Promise<PersonaConId | null> {
        const persona = await PersonaModel.findOne({ email }).lean();
        if (!persona) return null;

        const plano = persona as unknown as PersonaConId;

        return {
            ...plano,
            veterinario: plano.veterinario ?? null,
            adoptante: plano.adoptante ?? null,
            colaborador: plano.colaborador ?? null
        };
    };
};
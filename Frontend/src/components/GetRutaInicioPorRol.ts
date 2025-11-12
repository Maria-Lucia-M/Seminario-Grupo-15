export function getRutaInicioPorRol(rol:string):string {
    switch(rol){
        case "Admin":
        case "Veterinario":
        case "Colaborador":
            return "/trabajadores/homePage";
        case "Adoptante":
            return "/adoptantes/homeAdoptante";
        default:
            return "/login";
    };
};
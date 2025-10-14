export function mapearAnimal(doc) {
    return {
        nro: doc.nro,
        especie: doc.especie,
        raza: doc.raza,
        edad_estimada: doc.edad_estimada,
        fecha_ingreso: doc.fecha_ingreso,
        fecha_defuncion: doc.fecha_defuncion,
        estado: doc.estado,
        imagen: doc.imagen,
        video: doc.video
    };
}
;
//# sourceMappingURL=mapearAnimal.js.map
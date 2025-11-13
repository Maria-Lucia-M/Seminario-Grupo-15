// ----------------------------------------------------------

// PLAYGROUND: GESTIÓN DE REFUGIO ANIMAL
// Ejecutar cada bloque con Ctrl + Enter en VS Code / Compass
// ----------------------------------------------------------

// Limpieza de base
use('Sara');
db.dropDatabase();


// ----------------------------------------------------------
// Colección: ANIMALES
// ----------------------------------------------------------
db.animales.insertMany([
  {
    nro: 101,
    especie: "Perro",
    raza: "Labrador",
    edad_estimada: 3,
    fecha_ingreso: new Date("2024-08-15"),
    fecha_defuncion: null,
    estado: "En adopcion",
    imagen: "labrador1.jpg",
    video: null
  },
  {
    nro: 102,
    especie: "Gato",
    raza: "Siamés",
    edad_estimada: 2,
    fecha_ingreso: new Date("2024-09-10"),
    fecha_defuncion: null,
    estado: "Adoptado",
    imagen: "siames2.jpg",
    video: "siames2.mp4"
  },
  {
    nro: 103,
    especie: "Perro",
    raza: "Mestizo",
    edad_estimada: 1,
    fecha_ingreso: new Date("2024-10-05"),
    fecha_defuncion: null,
    estado: "Apto",
    imagen: "mestizo3.jpg",
    video: null
  }
]);


// ----------------------------------------------------------
// Colección: PERSONAS (heredadas)
// ----------------------------------------------------------
db.personas.insertMany([
  {
    dni: 40988222,
    nombre: "Lucía",
    apellido: "Gómez",
    email: "lucia.gomez@example.com",
    password: "1234",
    telefono: "1154237788",
    adoptante: { estado: "Apto", domicilio: "Av. Siempreviva 742" },
    colaborador: null,
    veterinario: null,
    __t: "Adoptante"
  },
  {
    dni: 39221456,
    nombre: "Marcos",
    apellido: "López",
    email: "marcos.lopez@example.com",
    password: "1234",
    telefono: "1167785544",
    colaborador: { id_colaborador: "C001" },
    adoptante: null,
    veterinario: null,
    __t: "Colaborador"
  },
  {
    dni: 40123888,
    nombre: "Sofía",
    apellido: "Pérez",
    email: "sofia.perez@example.com",
    password: "1234",
    telefono: "1194456688",
    veterinario: { matricula: "VET-3321", año_experiencia: "5" },
    adoptante: null,
    colaborador: null,
    __t: "Veterinario"
  }
]);


// ----------------------------------------------------------
// Colección: ADOPCIONES
// ----------------------------------------------------------
db.adopciones.insertMany([
  {
    nro_adopcion: 1,
    nro_animal: 101,
    dni_adoptante: 40988222,
    fecha_adopcion: new Date("2024-09-15"),
    fecha_retiro: null,
    motivos_retiro: "",
    evidencia_maltrato: null
  },
  {
    nro_adopcion: 2,
    nro_animal: 102,
    dni_adoptante: 40988222,
    fecha_adopcion: new Date("2024-07-20"),
    fecha_retiro: null,
    motivos_retiro: "",
    evidencia_maltrato: null
  }
]);


// ----------------------------------------------------------
// Colección: SEGUIMIENTOS
// ----------------------------------------------------------
db.seguimientos.insertMany([
  {
    nro_adopcion: 1,
    fecha_seguimiento: new Date("2024-10-10"),
    entorno: "Ambiente familiar adecuado.",
    estado_animal: "Apto"
  },
  {
    nro_adopcion: 1,
    fecha_seguimiento: new Date("2024-11-10"),
    entorno: "Animal se muestra más sociable.",
    estado_animal: "Apto"
  },
  {
    nro_adopcion: 2,
    fecha_seguimiento: new Date("2024-08-15"),
    entorno: "Departamento sin balcón, poca estimulación.",
    estado_animal: "No apto"
  }
]);


// ----------------------------------------------------------
// Colección: ENTREVISTAS
// ----------------------------------------------------------
db.entrevistas.insertMany([
  {
    id: "E001",
    nro_animal: 101,
    id_colaborador: "C001",
    fecha_entrevista: new Date("2024-08-20"),
    hora_entrevista: "10:00",
    dni_adoptante: 40988222,
    estado: "APROBADA",
    descripcion: "El adoptante cuenta con buen espacio y experiencia.",
    fecha_rep: null,
    hora_rep: null
  },
  {
    id: "E002",
    nro_animal: 102,
    id_colaborador: "C001",
    fecha_entrevista: new Date("2024-07-05"),
    hora_entrevista: "14:00",
    dni_adoptante: 40988222,
    estado: "APROBADA",
    descripcion: "Entrevista satisfactoria.",
    fecha_rep: null,
    hora_rep: null
  }
]);


// ----------------------------------------------------------
// Colección: VACUNAS
// ----------------------------------------------------------
db.vacunas.insertMany([
  {
    nro_vacuna: 1,
    nombre: "Antirrábica",
    fecha_vencimiento: new Date("2026-05-01"),
    droga: [{ nombre: "RabVac", descripcion: "Previene la rabia canina/felina." }],
    stock: 20,
    fecha_ingreso: new Date("2024-03-01")
  },
  {
    nro_vacuna: 2,
    nombre: "Triple felina",
    fecha_vencimiento: new Date("2025-12-01"),
    droga: [{ nombre: "Felvax", descripcion: "Previene calicivirus, panleucopenia y rinotraqueítis." }],
    stock: 15,
    fecha_ingreso: new Date("2024-02-10")
  }
]);


// ----------------------------------------------------------
// Colección: FICHAS MÉDICAS
// ----------------------------------------------------------
db.fichasMedicas.insertMany([
  {
    nro_ficha: 1,
    nro_animal: 101,
    matricula: "VET-3321",
    nro_vacunas: [1],
    observaciones: "Animal en buen estado general.",
    fecha: new Date("2024-08-16")
  },
  {
    nro_ficha: 2,
    nro_animal: 102,
    matricula: "VET-3321",
    nro_vacunas: [2],
    observaciones: "Requiere control anual.",
    fecha: new Date("2024-07-15")
  }
]);


// ----------------------------------------------------------
// Colección: RESCATES y RESCATISTAS
// ----------------------------------------------------------
db.rescatistas.insertMany([
  { dni: 30111222, nombre: "Martín", apellido: "Paz", telefono: "1133344556" },
  { dni: 29877441, nombre: "Paula", apellido: "Ríos", telefono: "1142217788" }
]);

db.rescates.insertMany([
  {
    lugar_rescate: "Parque Chacabuco",
    fecha_rescate: new Date("2024-08-14"),
    nro_animal: 101,
    dni_rescatista: "30111222"
  },
  {
    lugar_rescate: "Villa del Parque",
    fecha_rescate: new Date("2024-09-05"),
    nro_animal: 102,
    dni_rescatista: "29877441"
  }
]);


// ----------------------------------------------------------
// Pruebas de consulta rápida
// ----------------------------------------------------------

// Animales disponibles para adopción
db.animales.find({ estado: { $in: ["Apto", "En adopcion"] } });

// Adopciones con seguimientos
db.adopciones.aggregate([
  { $lookup: {
      from: "seguimientos",
      localField: "nro_adopcion",
      foreignField: "nro_adopcion",
      as: "seguimientos"
  }}
]);

export const SALONES = [
    {
        codigo: "SL001",
        nombre: "Salón Principal",
        capacidad: 500,
        precio: 1200000,
        descripcion: "Ideal para congresos, ferias y grandes eventos corporativos.",
        equipamiento: "Proyector, Sonido, Pantalla LED"
    },
    {
        codigo: "SL002",
        nombre: "Salón Ejecutivo",
        capacidad: 50,
        precio: 350000,
        descripcion: "Diseñado para reuniones directivas y presentaciones privadas.",
        equipamiento: "Proyector, Sonido, Videoconferencia"
    },
    {
        codigo: "SL003",
        nombre: "Salón de Seminarios",
        capacidad: 120,
        precio: 500000,
        descripcion: "Perfecto para capacitaciones, talleres y charlas académicas.",
        equipamiento: "Proyector, Sonido, Pizarra"
    },
    {
        codigo: "SL004",
        nombre: "Salón de Bodas",
        capacidad: 200,
        precio: 750000,
        descripcion: "Especialmente acondicionado para galas, matrimonios y banquetes.",
        equipamiento: "Sonido, Iluminación"
    },
    {
        codigo: "SL005",
        nombre: "Salón de Exposiciones",
        capacidad: 300,
        precio: 850000,
        descripcion: "Amplio espacio multipropósito para muestras artísticas y comercialización.",
        equipamiento: "Proyector, Sonido, Pantallas"
    }
];

export const SERVICIOS = [
    {
        codigo: "SE001",
        nombre: "Catering",
        tipo: "porPersona",
        precio: 15000,
        descripcion: "Servicio completo de alimentación para eventos."
    },
    {
        codigo: "SE002",
        nombre: "Equipo Audiovisual Extra",
        tipo: "fijo",
        precio: 100000,
        descripcion: "Alquiler de equipos de transmisión y amplificación extra."
    },
    {
        codigo: "SE003",
        nombre: "Personal de Apoyo",
        tipo: "fijo",
        precio: 50000,
        descripcion: "Garzones, anfitriones y coordinadores adicionales."
    },
    {
        codigo: "SE004",
        nombre: "Decoración",
        tipo: "fijo",
        precio: 200000,
        descripcion: "Servicio de ambientación floral e iluminación temática."
    }
];

export const ESTADOS = [
    "Consultado",
    "Reservado",
    "En planificación",
    "En ejecución",
    "Finalizado"
];

export const ESTADO_PROVEEDOR = {
    PENDIENTE: "pendiente",
    CONFIRMADO: "confirmado",
    RECHAZADO: "rechazado"
};

export const EVENTOS_INICIALES = [
    {
        id: "EV-101",
        cliente: "TechCorp Chile",
        email: "contacto@techcorp.cl",
        salonCodigo: "SL001",
        fecha: "2026-10-15",
        hora: "19:00",
        asistentes: 250,
        servicios: ["SE001"],
        total: 1200000 + (15000 * 250),
        estado: "En planificación"
    },
    {
        id: "EV-102",
        cliente: "María González",
        email: "maria.gonzalez@mail.cl",
        salonCodigo: "SL004",
        fecha: "2026-10-20",
        hora: "20:00",
        asistentes: 150,
        servicios: ["SE004"],
        total: 750000 + 200000,
        estado: "Reservado"
    },
    {
        id: "EV-103",
        cliente: "Banco Global",
        email: "eventos@bancoglobal.cl",
        salonCodigo: "SL002",
        fecha: "2026-09-11",
        hora: "09:00",
        asistentes: 40,
        servicios: ["SE002"],
        total: 350000 + 100000,
        estado: "En ejecución"
    },
    {
        id: "EV-104",
        cliente: "Fundación Educar",
        email: "contacto@fundacioneducar.cl",
        salonCodigo: "SL003",
        fecha: "2026-09-01",
        hora: "10:00",
        asistentes: 100,
        servicios: [],
        total: 500000,
        estado: "Finalizado"
    }
];

export const SLUG_SERVICIO = {
    SE001: "catering",
    SE002: "audiovisual",
    SE003: "apoyo",
    SE004: "decoracion"
};

export const DETALLE_PROVEEDOR = {
    "EV-101-catering": "Servicio para 250 personas (Cena de Gala).",
    "EV-103-audiovisual": "Proyector, Videoconferencia y 4 Micrófonos."
};

export function idAsignacionProveedor(eventoId, servicioCodigo) {
    return `${eventoId}-${SLUG_SERVICIO[servicioCodigo] || servicioCodigo.toLowerCase()}`;
}

import { SALONES, SERVICIOS, ESTADOS } from "../data/catalogos.js";

export function getSalonPorCodigo(codigo) {
    return SALONES.find((s) => s.codigo === codigo);
}

export function getServicioPorCodigo(codigo) {
    return SERVICIOS.find((s) => s.codigo === codigo);
}

export function badgeClasePorEstado(estado) {
    const mapa = {
        "Consultado": "primary",
        "Reservado": "info",
        "En planificación": "warning",
        "En ejecución": "success",
        "Finalizado": "secondary"
    };
    return mapa[estado] || "secondary";
}

export function textoOscuroPorEstado(estado) {
    return estado === "Reservado" || estado === "En planificación" ? "dark" : undefined;
}

export function formatoCLP(numero) {
    return "$" + Number(numero || 0).toLocaleString("es-CL");
}

export function formatearFecha(fechaISO) {
    if (!fechaISO) return "-";
    const [anio, mes, dia] = fechaISO.split("-");
    if (!anio || !mes || !dia) return fechaISO;
    return `${dia}/${mes}/${anio}`;
}

export function siguienteEstado(estadoActual) {
    const idx = ESTADOS.indexOf(estadoActual);
    if (idx === -1 || idx === ESTADOS.length - 1) return estadoActual;
    return ESTADOS[idx + 1];
}

export function generarId(eventos) {
    const numeros = (eventos || [])
        .map((e) => parseInt(String(e.id).replace("EV-", ""), 10))
        .filter((n) => !isNaN(n));
    const siguiente = (numeros.length ? Math.max(...numeros) : 100) + 1;
    return "EV-" + siguiente;
}

export function hayConflicto(eventos, salonCodigo, fecha, idExcluir) {
    return (eventos || []).some(
        (e) =>
            e.salonCodigo === salonCodigo &&
            e.fecha === fecha &&
            e.estado !== "Finalizado" &&
            e.id !== idExcluir
    );
}

export function calcularTotal(salonCodigo, asistentes, servicios) {
    let total = 0;
    const salon = getSalonPorCodigo(salonCodigo);
    if (salon) total += salon.precio;

    const numAsistentes = parseInt(asistentes, 10) || 0;

    (servicios || []).forEach((codigo) => {
        const servicio = getServicioPorCodigo(codigo);
        if (!servicio) return;
        total += servicio.tipo === "porPersona" ? servicio.precio * numAsistentes : servicio.precio;
    });

    return total;
}

export function detectarConflictos(eventos) {
    const vistos = new Map();
    (eventos || []).forEach((ev) => {
        const clave = `${ev.salonCodigo}_${ev.fecha}`;
        if (!vistos.has(clave)) vistos.set(clave, []);
        vistos.get(clave).push(ev);
    });

    const conflictos = [];
    vistos.forEach((lista) => {
        if (lista.length > 1) {
            conflictos.push({
                salonCodigo: lista[0].salonCodigo,
                fecha: lista[0].fecha,
                eventos: lista
            });
        }
    });
    return conflictos;
}

export function contarConflictos(grupos) {
    return (grupos || []).reduce((acc, grupo) => acc + Math.max(grupo.eventos.length - 1, 0), 0);
}

export function calcularOcupacion(eventos) {
    const salonesUsados = new Set((eventos || []).map((ev) => ev.salonCodigo));
    return SALONES.length ? Math.round((salonesUsados.size / SALONES.length) * 100) : 0;
}

export function calcularIngresos(eventos) {
    return (eventos || []).reduce((acc, ev) => acc + (ev.total || 0), 0);
}

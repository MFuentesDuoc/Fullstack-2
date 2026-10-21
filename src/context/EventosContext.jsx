import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import * as storage from "../services/storage.js";
import { generarId, hayConflicto, siguienteEstado } from "../utils/eventos.js";

const EventosContext = createContext(null);

export function EventosProvider({ children }) {
    const [eventos, setEventos] = useState(() => storage.getEventos());
    const [usuarios, setUsuarios] = useState(() => storage.getUsuarios());
    const [estadosProveedor, setEstadosProveedor] = useState(() => storage.getEstadosProveedor());
    const [sesionAdmin, setSesionAdmin] = useState(() => storage.getSesionAdmin());

    useEffect(() => {
        storage.guardarEventos(eventos);
    }, [eventos]);

    useEffect(() => {
        storage.guardarUsuarios(usuarios);
    }, [usuarios]);

    useEffect(() => {
        storage.guardarEstadosProveedor(estadosProveedor);
    }, [estadosProveedor]);

    useEffect(() => {
        storage.guardarSesionAdmin(sesionAdmin);
    }, [sesionAdmin]);

    const agregarEvento = useCallback(
        (evento) => {
            const nuevo = { ...evento, id: evento.id || generarId(eventos) };
            setEventos((prev) => [...prev, nuevo]);
            return nuevo;
        },
        [eventos]
    );

    const actualizarEvento = useCallback((id, cambios) => {
        setEventos((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...cambios } : ev)));
    }, []);

    const actualizarEstado = useCallback((id, nuevoEstado) => {
        setEventos((prev) => prev.map((ev) => (ev.id === id ? { ...ev, estado: nuevoEstado } : ev)));
    }, []);

    const avanzarEstado = useCallback((id) => {
        setEventos((prev) =>
            prev.map((ev) => (ev.id === id ? { ...ev, estado: siguienteEstado(ev.estado) } : ev))
        );
    }, []);

    const eliminarEvento = useCallback((id) => {
        setEventos((prev) => prev.filter((ev) => ev.id !== id));
    }, []);

    const existeConflicto = useCallback(
        (salonCodigo, fecha, idExcluir) => hayConflicto(eventos, salonCodigo, fecha, idExcluir),
        [eventos]
    );

    const agregarUsuario = useCallback((usuario) => {
        setUsuarios((prev) => {
            const nuevo = { ...usuario, id: `US-${prev.length + 1}` };
            return [...prev, nuevo];
        });
    }, []);

    const setEstadoProveedor = useCallback((servicioId, estado) => {
        setEstadosProveedor((prev) => ({ ...prev, [servicioId]: estado }));
    }, []);

    const getEstadoProveedor = useCallback(
        (servicioId) => estadosProveedor[servicioId] || null,
        [estadosProveedor]
    );

    const iniciarSesionAdmin = useCallback((datos) => {
        const sesion = {
            usuario: datos.usuario,
            fecha: new Date().toISOString()
        };
        setSesionAdmin(sesion);
        return sesion;
    }, []);

    const cerrarSesionAdmin = useCallback(() => {
        setSesionAdmin(null);
    }, []);

    const reiniciarDatos = useCallback(() => {
        storage.reiniciarDatos();
        setEventos(storage.getEventos());
        setUsuarios(storage.getUsuarios());
        setEstadosProveedor(storage.getEstadosProveedor());
    }, []);

    const valor = useMemo(
        () => ({
            eventos,
            usuarios,
            estadosProveedor,
            sesionAdmin,
            agregarEvento,
            actualizarEvento,
            actualizarEstado,
            avanzarEstado,
            eliminarEvento,
            existeConflicto,
            agregarUsuario,
            setEstadoProveedor,
            getEstadoProveedor,
            iniciarSesionAdmin,
            cerrarSesionAdmin,
            reiniciarDatos
        }),
        [
            eventos,
            usuarios,
            estadosProveedor,
            sesionAdmin,
            agregarEvento,
            actualizarEvento,
            actualizarEstado,
            avanzarEstado,
            eliminarEvento,
            existeConflicto,
            agregarUsuario,
            setEstadoProveedor,
            getEstadoProveedor,
            iniciarSesionAdmin,
            cerrarSesionAdmin,
            reiniciarDatos
        ]
    );

    return <EventosContext.Provider value={valor}>{children}</EventosContext.Provider>;
}

export function useEventos() {
    const ctx = useContext(EventosContext);
    if (!ctx) {
        throw new Error("useEventos() debe usarse dentro de <EventosProvider>");
    }
    return ctx;
}

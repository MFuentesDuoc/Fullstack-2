import { EVENTOS_INICIALES } from "../data/catalogos.js";

const KEY_EVENTOS = "eventospro_eventos";
const KEY_USUARIOS = "eventospro_usuarios";
const KEY_PROVEEDORES = "eventospro_proveedores";
const KEY_SESION = "eventospro_sesion_admin";

function _leer(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        console.error("Error leyendo localStorage:", key, e);
        return fallback;
    }
}

function _guardar(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error("Error guardando en localStorage:", key, e);
        return false;
    }
}

export function inicializar() {
    if (localStorage.getItem(KEY_EVENTOS) === null) {
        _guardar(KEY_EVENTOS, EVENTOS_INICIALES);
    }
    if (localStorage.getItem(KEY_USUARIOS) === null) {
        _guardar(KEY_USUARIOS, []);
    }
    if (localStorage.getItem(KEY_PROVEEDORES) === null) {
        _guardar(KEY_PROVEEDORES, {});
    }
    if (localStorage.getItem(KEY_SESION) === null) {
        _guardar(KEY_SESION, null);
    }
}

export function getEventos() {
    return _leer(KEY_EVENTOS, []);
}

export function guardarEventos(eventos) {
    return _guardar(KEY_EVENTOS, eventos);
}

export function getUsuarios() {
    return _leer(KEY_USUARIOS, []);
}

export function guardarUsuarios(usuarios) {
    return _guardar(KEY_USUARIOS, usuarios);
}

export function getEstadosProveedor() {
    return _leer(KEY_PROVEEDORES, {});
}

export function guardarEstadosProveedor(estados) {
    return _guardar(KEY_PROVEEDORES, estados);
}

export function getSesionAdmin() {
    return _leer(KEY_SESION, null);
}

export function guardarSesionAdmin(sesion) {
    return _guardar(KEY_SESION, sesion);
}

export function reiniciarDatos() {

    localStorage.removeItem(KEY_EVENTOS);
    localStorage.removeItem(KEY_USUARIOS);
    localStorage.removeItem(KEY_PROVEEDORES);
    inicializar();
}

inicializar();

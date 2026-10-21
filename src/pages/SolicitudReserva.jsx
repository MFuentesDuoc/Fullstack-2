import { useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { useEventos } from "../context/EventosContext.jsx";
import { SALONES, SERVICIOS } from "../data/catalogos.js";
import { calcularTotal, formatoCLP } from "../utils/eventos.js";

function hoyISO() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

const FORMULARIO_VACIO = {
    cliente: "",
    email: "",
    fecha: "",
    hora: "",
    asistentes: "",
    salon: "",
    servicios: []
};

export default function SolicitudReserva() {
    const { agregarEvento, existeConflicto } = useEventos();

    const [form, setForm] = useState(FORMULARIO_VACIO);
    const [mensaje, setMensaje] = useState(null);

    const total = useMemo(
        () => calcularTotal(form.salon, form.asistentes, form.servicios),
        [form.salon, form.asistentes, form.servicios]
    );

    const salonSeleccionado = SALONES.find((s) => s.codigo === form.salon) || null;

    const actualizar = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setMensaje(null);
    };

    const alternarServicio = (codigo) => {
        setForm((prev) => ({
            ...prev,
            servicios: prev.servicios.includes(codigo)
                ? prev.servicios.filter((c) => c !== codigo)
                : [...prev.servicios, codigo]
        }));
        setMensaje(null);
    };

    const limpiar = () => {
        setForm(FORMULARIO_VACIO);
        setMensaje(null);
    };

    const enviar = (e) => {
        e.preventDefault();
        setMensaje(null);

        if (!form.cliente.trim() || !form.email.trim()) {
            setMensaje({ tipo: "danger", texto: "Por favor completa tu nombre y correo electrónico." });
            return;
        }
        if (!form.fecha || !form.hora) {
            setMensaje({ tipo: "danger", texto: "Por favor selecciona la fecha y hora del evento." });
            return;
        }
        if (!form.salon) {
            setMensaje({ tipo: "danger", texto: "Por favor selecciona un salón." });
            return;
        }
        const numAsistentes = parseInt(form.asistentes, 10);
        if (!numAsistentes || numAsistentes <= 0) {
            setMensaje({ tipo: "danger", texto: "Ingresa una cantidad válida de asistentes." });
            return;
        }
        if (salonSeleccionado && numAsistentes > salonSeleccionado.capacidad) {
            setMensaje({
                tipo: "danger",
                texto: `La cantidad de asistentes supera la capacidad de ${salonSeleccionado.nombre} (${salonSeleccionado.capacidad} personas).`
            });
            return;
        }

        if (existeConflicto(form.salon, form.fecha)) {
            setMensaje({
                tipo: "warning",
                texto: `Ya existe una reserva para ${salonSeleccionado.nombre} en esa fecha. Por favor elige otra fecha u otro salón.`
            });
            return;
        }

        const nuevoEvento = {
            cliente: form.cliente.trim(),
            email: form.email.trim(),
            salonCodigo: form.salon,
            fecha: form.fecha,
            hora: form.hora,
            asistentes: numAsistentes,
            servicios: form.servicios,
            total,
            estado: "Reservado"
        };

        const evento = agregarEvento(nuevoEvento);

        setMensaje({
            tipo: "success",
            texto: `¡Reserva registrada con éxito! Tu número de evento es ${evento.id}.`
        });
        setForm(FORMULARIO_VACIO);
    };

    return (
        <Container className="my-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h3 className="card-title mb-0">Solicitud de Reserva de Evento</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={enviar}>
                        <h5 className="border-bottom pb-2 mb-3">1. Datos del Solicitante</h5>
                        <Row className="mb-3">
                            <Col xs={12} md={6} className="mb-2">
                                <Form.Group controlId="nombreCliente">
                                    <Form.Label>Nombre Completo / Empresa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: Empresa ABC"
                                        value={form.cliente}
                                        onChange={(e) => actualizar("cliente", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} className="mb-2">
                                <Form.Group controlId="emailCliente">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="contacto@empresa.cl"
                                        value={form.email}
                                        onChange={(e) => actualizar("email", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h5 className="border-bottom pb-2 mb-3 mt-4">2. Detalle del Evento</h5>
                        <Row className="mb-3">
                            <Col xs={12} md={4} className="mb-2">
                                <Form.Group controlId="fechaEvento">
                                    <Form.Label>Fecha del Evento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min={hoyISO()}
                                        value={form.fecha}
                                        onChange={(e) => actualizar("fecha", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={4} className="mb-2">
                                <Form.Group controlId="horaInicio">
                                    <Form.Label>Hora Inicio</Form.Label>
                                    <Form.Control
                                        type="time"
                                        value={form.hora}
                                        onChange={(e) => actualizar("hora", e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={4} className="mb-2">
                                <Form.Group controlId="asistentes">
                                    <Form.Label>Cantidad de Asistentes</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="Ej: 150"
                                        value={form.asistentes}
                                        onChange={(e) => actualizar("asistentes", e.target.value)}
                                    />
                                    {salonSeleccionado && (
                                        <Form.Text className="text-muted">
                                            Capacidad de {salonSeleccionado.nombre}: {salonSeleccionado.capacidad} personas
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="salonSelect">
                            <Form.Label>Selección de Salón</Form.Label>
                            <Form.Select
                                value={form.salon}
                                onChange={(e) => actualizar("salon", e.target.value)}
                            >
                                <option value="">Seleccione un salón...</option>
                                {SALONES.map((salon) => (
                                    <option key={salon.codigo} value={salon.codigo}>
                                        {salon.codigo} - {salon.nombre} (Capacidad: {salon.capacidad})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <h5 className="border-bottom pb-2 mb-3 mt-4">3. Servicios Adicionales</h5>
                        <Form.Group className="mb-3">
                            {SERVICIOS.map((servicio) => (
                                <Form.Check
                                    key={servicio.codigo}
                                    type="checkbox"
                                    id={servicio.codigo.toLowerCase()}
                                    label={`${servicio.codigo} - ${servicio.nombre} (${
                                        servicio.tipo === "porPersona"
                                            ? `${formatoCLP(servicio.precio)} p/p`
                                            : formatoCLP(servicio.precio)
                                    })`}
                                    checked={form.servicios.includes(servicio.codigo)}
                                    onChange={() => alternarServicio(servicio.codigo)}
                                />
                            ))}
                        </Form.Group>

                        <div className="alert alert-info d-flex justify-content-between align-items-center mt-3">
                            <span>Total estimado:</span>
                            <strong>{formatoCLP(total)}</strong>
                        </div>

                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end mt-4">
                            <Button type="button" variant="secondary" className="me-sm-2" onClick={limpiar}>
                                Limpiar Formulario
                            </Button>
                            <Button type="submit" variant="primary">
                                Enviar Solicitud
                            </Button>
                        </div>

                        {mensaje && (
                            <div className="mt-3">
                                <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
                                    {mensaje.texto}
                                </Alert>
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

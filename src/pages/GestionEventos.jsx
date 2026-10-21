import { useMemo, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

import EstadoBadge from "../components/EstadoBadge.jsx";
import { useEventos } from "../context/EventosContext.jsx";
import { formatearFecha, formatoCLP, getSalonPorCodigo, getServicioPorCodigo } from "../utils/eventos.js";

export default function GestionEventos() {
    const { eventos, avanzarEstado, eliminarEvento } = useEventos();

    const [busqueda, setBusqueda] = useState("");
    const [eventoDetalle, setEventoDetalle] = useState(null);
    const [eventoAEliminar, setEventoAEliminar] = useState(null);

    const filtrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();
        if (!texto) return eventos;
        return eventos.filter((ev) => {
            const salon = getSalonPorCodigo(ev.salonCodigo);
            const salonNombre = salon ? salon.nombre : ev.salonCodigo;
            return (
                ev.id.toLowerCase().includes(texto) ||
                ev.cliente.toLowerCase().includes(texto) ||
                salonNombre.toLowerCase().includes(texto)
            );
        });
    }, [eventos, busqueda]);

    const confirmarEliminacion = () => {
        if (eventoAEliminar) {
            eliminarEvento(eventoAEliminar.id);
            setEventoAEliminar(null);
            if (eventoDetalle?.id === eventoAEliminar.id) setEventoDetalle(null);
        }
    };

    return (
        <Container>
            <h2 className="mb-4">Gestión y Seguimiento de Eventos</h2>

            <Card className="shadow-sm">
                <Card.Header className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <h5 className="mb-0">Lista de Eventos Registrados</h5>
                    <Form.Control
                        type="text"
                        className="buscador-eventos w-100 w-md-auto"
                        placeholder="Buscar evento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        aria-label="Buscar evento"
                    />
                </Card.Header>
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover align="middle" className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Salón</th>
                                    <th>Fecha</th>
                                    <th>Estado Actual</th>
                                    <th className="text-center">Acciones Administrativas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted py-4">
                                            No se encontraron eventos.
                                        </td>
                                    </tr>
                                )}

                                {filtrados.map((ev) => {
                                    const salon = getSalonPorCodigo(ev.salonCodigo);
                                    const salonNombre = salon ? `${ev.salonCodigo} - ${salon.nombre}` : ev.salonCodigo;
                                    const esFinal = ev.estado === "Finalizado";

                                    return (
                                        <tr key={ev.id}>
                                            <td>#{ev.id}</td>
                                            <td>{ev.cliente}</td>
                                            <td>{salonNombre}</td>
                                            <td>{formatearFecha(ev.fecha)}</td>
                                            <td>
                                                <EstadoBadge estado={ev.estado} />
                                            </td>
                                            <td className="text-center tabla-acciones">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="me-1"
                                                    onClick={() => setEventoDetalle(ev)}
                                                >
                                                    Ver Detalle
                                                </Button>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    className="me-1"
                                                    onClick={() => avanzarEstado(ev.id)}
                                                    disabled={esFinal}
                                                >
                                                    Editar Estado
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => setEventoAEliminar(ev)}
                                                >
                                                    Anular
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={!!eventoDetalle} onHide={() => setEventoDetalle(null)} centered>
                {eventoDetalle && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="h5">Detalle del evento {eventoDetalle.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xs={4} className="fw-semibold">
                                    Cliente
                                </Col>
                                <Col xs={8}>{eventoDetalle.cliente}</Col>

                                <Col xs={4} className="fw-semibold">
                                    Correo
                                </Col>
                                <Col xs={8}>{eventoDetalle.email || "-"}</Col>

                                <Col xs={4} className="fw-semibold">
                                    Salón
                                </Col>
                                <Col xs={8}>
                                    {getSalonPorCodigo(eventoDetalle.salonCodigo)?.nombre || eventoDetalle.salonCodigo}
                                </Col>

                                <Col xs={4} className="fw-semibold">
                                    Fecha
                                </Col>
                                <Col xs={8}>
                                    {formatearFecha(eventoDetalle.fecha)} - {eventoDetalle.hora || "-"}
                                </Col>

                                <Col xs={4} className="fw-semibold">
                                    Asistentes
                                </Col>
                                <Col xs={8}>{eventoDetalle.asistentes || "-"}</Col>

                                <Col xs={4} className="fw-semibold">
                                    Servicios adicionales
                                </Col>
                                <Col xs={8}>
                                    {eventoDetalle.servicios && eventoDetalle.servicios.length
                                        ? eventoDetalle.servicios
                                              .map((cod) => getServicioPorCodigo(cod)?.nombre || cod)
                                              .join(", ")
                                        : "Ninguno"}
                                </Col>

                                <Col xs={4} className="fw-semibold">
                                    Total estimado
                                </Col>
                                <Col xs={8} className="fw-bold">
                                    {formatoCLP(eventoDetalle.total)}
                                </Col>

                                <Col xs={4} className="fw-semibold">
                                    Estado actual
                                </Col>
                                <Col xs={8}>
                                    <EstadoBadge estado={eventoDetalle.estado} />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={() => setEventoDetalle(null)}>
                                Cerrar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    avanzarEstado(eventoDetalle.id);
                                    setEventoDetalle(null);
                                }}
                                disabled={eventoDetalle.estado === "Finalizado"}
                            >
                                Avanzar Estado
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>

            <Modal show={!!eventoAEliminar} onHide={() => setEventoAEliminar(null)} centered size="sm">
                {eventoAEliminar && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="h5">Confirmar anulación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="mb-0">
                                ¿Seguro que deseas eliminar el evento <strong>#{eventoAEliminar.id}</strong> de{" "}
                                <strong>{eventoAEliminar.cliente}</strong>? Esta acción no se puede deshacer.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={() => setEventoAEliminar(null)}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={confirmarEliminacion}>
                                Anular Evento
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </Container>
    );
}

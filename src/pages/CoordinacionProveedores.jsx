import { useMemo } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";

import { useEventos } from "../context/EventosContext.jsx";
import { DETALLE_PROVEEDOR, ESTADO_PROVEEDOR, idAsignacionProveedor } from "../data/catalogos.js";
import { formatearFecha, getSalonPorCodigo, getServicioPorCodigo } from "../utils/eventos.js";

const ESTILO_ESTADO = {
    [ESTADO_PROVEEDOR.CONFIRMADO]: {
        card: "border-success",
        header: "bg-success text-white",
        titulo: "Confirmado",
        mensaje: "Servicio Confirmado"
    },
    [ESTADO_PROVEEDOR.RECHAZADO]: {
        card: "border-danger",
        header: "bg-danger text-white",
        titulo: "Rechazado",
        mensaje: "Servicio Rechazado"
    },
    [ESTADO_PROVEEDOR.PENDIENTE]: {
        card: "border-warning",
        header: "bg-warning text-dark",
        titulo: "Pendiente de Confirmación",
        mensaje: ""
    }
};

export default function CoordinacionProveedores() {
    const { eventos, getEstadoProveedor, setEstadoProveedor } = useEventos();

    const asignaciones = useMemo(() => {
        const lista = [];
        eventos.forEach((evento) => {
            (evento.servicios || []).forEach((codigo) => {
                const servicio = getServicioPorCodigo(codigo);
                if (!servicio) return;
                const id = idAsignacionProveedor(evento.id, codigo);
                lista.push({
                    id,
                    evento,
                    servicio,
                    salon: getSalonPorCodigo(evento.salonCodigo),
                    detalle:
                        DETALLE_PROVEEDOR[id] ||
                        `Servicio para ${evento.asistentes || 0} personas (${servicio.nombre}).`
                });
            });
        });
        return lista;
    }, [eventos]);

    return (
        <Container>
            <h3 className="mb-3">Servicios Asignados</h3>
            <p className="text-muted">
                Por favor confirme o rechace la disponibilidad para los siguientes eventos.
            </p>

            {asignaciones.length === 0 && (
                <Alert variant="info">No hay servicios asignados por confirmar.</Alert>
            )}

            <Row className="g-3">
                {asignaciones.map(({ id, evento, servicio, salon, detalle }) => {
                    const estado = getEstadoProveedor(id) || ESTADO_PROVEEDOR.PENDIENTE;
                    const estilo = ESTILO_ESTADO[estado] || ESTILO_ESTADO[ESTADO_PROVEEDOR.PENDIENTE];
                    const resuelto = estado !== ESTADO_PROVEEDOR.PENDIENTE;

                    return (
                        <Col xs={12} md={6} key={id} className="mb-3">
                            <Card className={`shadow-sm ${estilo.card} tarjeta-proveedor`}>
                                <Card.Header className={`${estilo.header} estado-proveedor`}>{estilo.titulo}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="h5">
                                        {servicio.nombre} - Evento #{evento.id}
                                    </Card.Title>
                                    <Card.Text className="mb-1">
                                        <strong>Fecha:</strong> {formatearFecha(evento.fecha)} - {evento.hora || "-"} hrs
                                    </Card.Text>
                                    <Card.Text className="mb-1">
                                        <strong>Lugar:</strong> {evento.salonCodigo} -{" "}
                                        {salon ? salon.nombre : evento.salonCodigo}
                                    </Card.Text>
                                    <Card.Text className="mb-3">
                                        <strong>Detalle:</strong> {detalle}
                                    </Card.Text>

                                    {resuelto ? (
                                        <Alert variant="secondary" className="mb-0 text-center">
                                            {estilo.mensaje}
                                        </Alert>
                                    ) : (
                                        <div className="d-grid gap-2 d-sm-flex">
                                            <Button
                                                variant="success"
                                                className="flex-fill"
                                                onClick={() => setEstadoProveedor(id, ESTADO_PROVEEDOR.CONFIRMADO)}
                                            >
                                                Confirmar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="flex-fill"
                                                onClick={() => setEstadoProveedor(id, ESTADO_PROVEEDOR.RECHAZADO)}
                                            >
                                                Rechazar
                                            </Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

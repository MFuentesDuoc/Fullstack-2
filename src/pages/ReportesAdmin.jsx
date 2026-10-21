import { useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, Modal, Row, Table } from "react-bootstrap";

import { useEventos } from "../context/EventosContext.jsx";
import { SALONES } from "../data/catalogos.js";
import {
    calcularIngresos,
    calcularOcupacion,
    contarConflictos,
    detectarConflictos,
    formatearFecha,
    formatoCLP,
    getSalonPorCodigo
} from "../utils/eventos.js";

export default function ReportesAdmin() {
    const { eventos, reiniciarDatos } = useEventos();
    const [mostrarReinicio, setMostrarReinicio] = useState(false);

    const ingresosTotales = useMemo(() => calcularIngresos(eventos), [eventos]);
    const ocupacion = useMemo(() => calcularOcupacion(eventos), [eventos]);
    const gruposConflicto = useMemo(() => detectarConflictos(eventos), [eventos]);
    const totalConflictos = useMemo(() => contarConflictos(gruposConflicto), [gruposConflicto]);

    const rendimiento = useMemo(
        () =>
            SALONES.map((salon) => {
                const eventosDelSalon = eventos.filter((ev) => ev.salonCodigo === salon.codigo);
                const ingresosDelSalon = eventosDelSalon.reduce((acc, ev) => acc + (ev.total || 0), 0);
                const porcentaje = eventos.length
                    ? Math.round((eventosDelSalon.length / eventos.length) * 100)
                    : 0;
                return { salon, total: eventosDelSalon.length, ingresos: ingresosDelSalon, porcentaje };
            }),
        [eventos]
    );

    return (
        <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                <h2 className="mb-0">Panel de Reportes Administrativos</h2>
                <Button variant="outline-secondary" size="sm" onClick={() => setMostrarReinicio(true)}>
                    Restablecer datos de demostración
                </Button>
            </div>

            <Row className="mb-4 g-3">
                <Col xs={6} md={3} className="mb-2">
                    <Card className="bg-primary text-white p-3 shadow-sm text-center h-100">
                        <Card.Body>
                            <h6 className="mb-1">Eventos Registrados</h6>
                            <h3 className="fw-bold mb-0">{eventos.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-2">
                    <Card className="bg-success text-white p-3 shadow-sm text-center h-100">
                        <Card.Body>
                            <h6 className="mb-1">Ingresos Totales</h6>
                            <h3 className="fw-bold mb-0">{formatoCLP(ingresosTotales)}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-2">
                    <Card className="bg-warning text-dark p-3 shadow-sm text-center h-100">
                        <Card.Body>
                            <h6 className="mb-1">Ocupación Salones</h6>
                            <h3 className="fw-bold mb-0">{ocupacion}%</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6} md={3} className="mb-2">
                    <Card className="bg-danger text-white p-3 shadow-sm text-center h-100">
                        <Card.Body>
                            <h6 className="mb-1">Conflictos / Alertas</h6>
                            <h3 className="fw-bold mb-0">{totalConflictos}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {gruposConflicto.length > 0 && (
                <Alert variant="danger" className="shadow-sm">
                    <strong className="d-block mb-2">Alerta de doble reserva detectada</strong>
                    <ul className="mb-0">
                        {gruposConflicto.map((grupo) => (
                            <li key={`${grupo.salonCodigo}_${grupo.fecha}`}>
                                {grupo.salonCodigo} el {formatearFecha(grupo.fecha)}:{" "}
                                {grupo.eventos.map((ev) => `#${ev.id} (${ev.cliente})`).join(" vs ")}.
                            </li>
                        ))}
                    </ul>
                </Alert>
            )}

            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white">
                    <h5 className="mb-0">Rendimiento por Salón</h5>
                </Card.Header>
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table striped className="mb-0">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Salón</th>
                                    <th>Eventos Realizados</th>
                                    <th>Ingresos Generados (CLP)</th>
                                    <th>% Ocupación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rendimiento.map(({ salon, total, ingresos, porcentaje }) => (
                                    <tr key={salon.codigo}>
                                        <td>{salon.codigo}</td>
                                        <td>{salon.nombre}</td>
                                        <td>{total}</td>
                                        <td>{formatoCLP(ingresos)}</td>
                                        <td>{porcentaje}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white">
                    <h5 className="mb-0">Próximos Eventos</h5>
                </Card.Header>
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Salón</th>
                                    <th>Fecha</th>
                                    <th>Asistentes</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted py-4">
                                            No hay eventos registrados.
                                        </td>
                                    </tr>
                                )}
                                {[...eventos]
                                    .sort((a, b) => a.fecha.localeCompare(b.fecha))
                                    .map((ev) => (
                                        <tr key={ev.id}>
                                            <td>#{ev.id}</td>
                                            <td>{ev.cliente}</td>
                                            <td>{getSalonPorCodigo(ev.salonCodigo)?.nombre || ev.salonCodigo}</td>
                                            <td>{formatearFecha(ev.fecha)}</td>
                                            <td>{ev.asistentes}</td>
                                            <td>{formatoCLP(ev.total)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <Modal show={mostrarReinicio} onHide={() => setMostrarReinicio(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="h5">Restablecer datos de demostración</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-0">
                        Se eliminarán todos los eventos, usuarios y estados de proveedores registrados, y se restaurarán
                        los datos de ejemplo iniciales (EV-101 a EV-104). Esta acción no se puede deshacer.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setMostrarReinicio(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            reiniciarDatos();
                            setMostrarReinicio(false);
                        }}
                    >
                        Restablecer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
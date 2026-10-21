import { Container, Row, Table } from "react-bootstrap";

import SalonCard from "../components/SalonCard.jsx";
import { SALONES, SERVICIOS } from "../data/catalogos.js";
import { formatoCLP } from "../utils/eventos.js";

export default function Catalogo() {
    return (
        <Container className="my-4">
            <div className="text-center mb-5">
                <h2 className="fw-bold">Catálogo de Salones y Servicios</h2>
                <p className="text-muted">
                    Conoce nuestras instalaciones ubicadas en Vitacura y los servicios adicionales disponibles para tu evento.
                </p>
            </div>

            <h3 className="border-bottom pb-2 mb-4 text-primary">1. Catálogo de Salones</h3>
            <Row className="g-4 mb-5">
                {SALONES.map((salon) => (
                    <SalonCard key={salon.codigo} salon={salon} />
                ))}
            </Row>

            <h3 className="border-bottom pb-2 mb-4 text-primary">2. Servicios Adicionales</h3>
            <div className="table-responsive shadow-sm bg-white rounded mb-5">
                <Table hover align="middle" className="mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Servicio</th>
                            <th>Descripción</th>
                            <th>Precio (CLP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SERVICIOS.map((servicio) => (
                            <tr key={servicio.codigo}>
                                <td>
                                    <strong>{servicio.codigo}</strong>
                                </td>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.descripcion}</td>
                                <td>
                                    {servicio.tipo === "porPersona"
                                        ? `${formatoCLP(servicio.precio)} por persona`
                                        : `${formatoCLP(servicio.precio)} fijo`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

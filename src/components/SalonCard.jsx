import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { SERVICIOS } from "../data/catalogos.js";
import { formatoCLP } from "../utils/eventos.js";

export default function SalonCard({ salon }) {
    return (
        <Col xs={12} md={6} lg={4} className="d-flex mb-4">
            <Card className="w-100 shadow-sm border-0">
                <Card.Header className="bg-primary text-white fw-bold d-flex justify-content-between">
                    <span>{salon.codigo}</span>
                    <span>Cap: {salon.capacidad} p.</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="fw-bold">{salon.nombre}</Card.Title>
                    <Card.Text className="text-muted mb-2">{salon.descripcion}</Card.Text>
                    <Card.Text className="mb-1">
                        <strong>Equipamiento:</strong> {salon.equipamiento}
                    </Card.Text>
                    <Card.Text className="mb-1">
                        <strong>Servicios extra:</strong> {SERVICIOS.length} disponibles
                    </Card.Text>
                    <h4 className="text-success fw-bold mt-3">
                        {formatoCLP(salon.precio)} <small className="fs-6 text-muted">CLP</small>
                    </h4>
                </Card.Body>
                <Card.Footer className="bg-white border-0 pb-3">
                    <Button as={Link} to="/reservar" variant="outline-primary" className="w-100">
                        Reservar Salón
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}

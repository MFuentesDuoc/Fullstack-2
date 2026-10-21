import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CARACTERISTICAS = [
    {
        titulo: "8 Salones Equipados",
        texto:
            "Espacios adaptables desde 50 hasta 500 personas, con pantallas LED, audio profesional y videoconferencia."
    },
    {
        titulo: "Servicio de Catering",
        texto:
            "Chefs y personal gastronómico dedicado para brindar desayunos, coffe breaks y cenas de gala a tu medida."
    },
    {
        titulo: "Gestión Centralizada",
        texto:
            "Consulta disponibilidad en tiempo real, monitorea el estado de tu evento y confirma servicios sin demoras."
    }
];

export default function Inicio() {
    return (
        <>
            <header className="hero-inicio text-center">
                <Container>
                    <h1 className="display-4 fw-bold">Bienvenido a EventosPro</h1>
                    <p className="lead">El centro de convenciones y eventos más exclusivo de Vitacura.</p>
                    <p className="mb-4">
                        Gestionamos congresos, seminarios, bodas y reuniones empresariales con tecnología de punta.
                    </p>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                        <Button as={Link} to="/catalogo" variant="light" size="lg" className="text-primary fw-semibold">
                            Ver Salones
                        </Button>
                        <Button as={Link} to="/reservar" variant="warning" size="lg" className="text-dark fw-semibold">
                            Cotizar y Reservar
                        </Button>
                    </div>
                </Container>
            </header>

            <main className="container my-5">
                <Row className="text-center g-4">
                    {CARACTERISTICAS.map((caracteristica) => (
                        <Col xs={12} md={4} key={caracteristica.titulo}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="tarjeta-caracteristica">
                                    <Card.Title className="fw-bold">{caracteristica.titulo}</Card.Title>
                                    <Card.Text>{caracteristica.texto}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </main>
        </>
    );
}

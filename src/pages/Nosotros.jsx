import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Nosotros</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>EventosPro</Card.Title>
              <Card.Text>
                Somos una empresa dedicada a la gestión integral de eventos. Ofrecemos salones equipados,
                servicios profesionales y soluciones completas para todo tipo de eventos corporativos,
                sociales y familiares.
              </Card.Text>
              <Card.Text>
                Nuestro compromiso es garantizar la excelencia en cada evento, con atención personalizada
                y los mejores espacios de la ciudad.
              </Card.Text>
              <Button as={Link} to="/contacto" variant="primary">Contáctanos</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

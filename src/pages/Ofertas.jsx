import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductosEnOferta } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export default function Ofertas() {
  const ofertas = getProductosEnOferta();

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ofertas Especiales</h1>
      <Row>
        {ofertas.length === 0 ? (
          <Col><p className="text-muted">No hay ofertas disponibles en este momento.</p></Col>
        ) : (
          ofertas.map((prod) => (
            <Col xs={12} md={6} lg={4} key={prod.id} className="mb-4">
              <Card className="h-100 border-warning shadow">
                <Card.Header className="bg-warning text-dark fw-bold">¡OFERTA!</Card.Header>
                <Card.Body>
                  <Card.Title>{prod.nombre}</Card.Title>
                  <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                  <h4 className="text-success">{formatoCLP(prod.precio)}</h4>
                  <Link to={`/productos/${prod.id}`} className="btn btn-warning">Ver Oferta</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

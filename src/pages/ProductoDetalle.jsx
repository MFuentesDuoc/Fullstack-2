import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getProductoById } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = getProductoById(id);

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-primary mt-3">Volver a Productos</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="fs-2">{producto.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Código: {producto.codigo}</Card.Subtitle>
              <Card.Text>{producto.descripcion}</Card.Text>
              <p><strong>Capacidad:</strong> {producto.capacidad} personas</p>
              <p><strong>Equipamiento:</strong> {producto.equipamiento}</p>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
              <h3 className="text-success">{formatoCLP(producto.precio)}</h3>
              <Button as={Link} to="/checkout" variant="success" className="me-2">Agregar al Carrito</Button>
              <Button as={Link} to="/productos" variant="outline-secondary">Volver</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

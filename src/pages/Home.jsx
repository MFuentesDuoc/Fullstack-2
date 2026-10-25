import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductosEnOferta, getProductos } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export default function InicioTienda() {
  const destacados = getProductos().slice(0, 3);
  const ofertas = getProductosEnOferta();

  return (
    <Container className="py-4">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Bienvenido a EventosPro Store</h1>
        <p className="fs-4">Tu tienda online para eventos, salones y servicios</p>
        <Link to="/productos" className="btn btn-primary btn-lg">Ver Productos</Link>
      </div>

      <h2 className="mb-3">Productos Destacados</h2>
      <Row>
        {destacados.map((prod) => (
          <Col xs={12} md={4} key={prod.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                <h5 className="text-success">{formatoCLP(prod.precio)}</h5>
                <Link to={`/productos/${prod.id}`} className="btn btn-outline-primary">Ver Detalle</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-3 mt-4">Ofertas</h2>
      <Row>
        {ofertas.length === 0 ? (
          <Col><p className="text-muted">No hay productos en oferta actualmente.</p></Col>
        ) : (
          ofertas.map((prod) => (
            <Col xs={12} md={4} key={prod.id} className="mb-4">
              <Card className="h-100 border-warning">
                <Card.Body>
                  <Card.Title>{prod.nombre} <span className="badge bg-warning text-dark">OFERTA</span></Card.Title>
                  <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                  <h5 className="text-success">{formatoCLP(prod.precio)}</h5>
                  <Link to={`/productos/${prod.id}`} className="btn btn-outline-warning">Ver Detalle</Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

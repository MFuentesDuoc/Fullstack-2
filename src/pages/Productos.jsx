import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const productos = getProductos();
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  const filtrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <Container className="py-4">
      <h1 className="mb-4">Productos</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {filtrados.map((prod) => (
          <Col xs={12} md={6} lg={4} key={prod.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                <p><strong>Capacidad:</strong> {prod.capacidad} personas</p>
                <h5 className="text-success">{formatoCLP(prod.precio)}</h5>
                <Button as={Link} to={`/productos/${prod.id}`} variant="primary">Ver Detalle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

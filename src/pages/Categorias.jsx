import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductosPorCategoria } from "../data/db.js";

const categorias = ["Salones", "Bodas", "Corporativos", "Servicios"];

export default function Categorias() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Categorías</h1>
      {categorias.map((cat) => {
        const productos = getProductosPorCategoria(cat);
        return (
          <div key={cat} className="mb-5">
            <h2>{cat}</h2>
            <Row>
              {productos.map((prod) => (
                <Col xs={12} md={4} key={prod.id} className="mb-3">
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{prod.nombre}</Card.Title>
                      <Card.Text className="text-muted">{prod.descripcion}</Card.Text>
                      <Link to={`/productos/${prod.id}`} className="btn btn-sm btn-outline-primary">Ver Producto</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </Container>
  );
}

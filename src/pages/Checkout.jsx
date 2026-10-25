import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    metodoPago: "tarjeta"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.nombre && form.direccion && form.email) {
      window.location.href = "/pago-correcto";
    } else {
      window.location.href = "/pago-error";
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Checkout - Datos de Envío</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección de Envío</Form.Label>
                  <Form.Control name="direccion" value={form.direccion} onChange={handleChange} required />
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control name="ciudad" value={form.ciudad} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control name="telefono" value={form.telefono} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select name="metodoPago" value={form.metodoPago} onChange={handleChange}>
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="success" className="w-100">Confirmar Compra</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen de Compra</Card.Title>
              <p className="text-muted">Los datos se autocompletarán si has iniciado sesión</p>
              <Link to="/carrito" className="btn btn-outline-primary w-100">Ver Carrito</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

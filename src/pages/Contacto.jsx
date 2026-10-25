import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Contacto</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              {enviado ? (
                <div className="text-center py-4">
                  <h3 className="text-success">¡Mensaje Enviado!</h3>
                  <p>Nos pondremos en contacto contigo pronto.</p>
                  <Button onClick={() => setEnviado(false)} variant="primary">Enviar otro mensaje</Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={4} name="mensaje" value={form.mensaje} onChange={handleChange} required />
                  </Form.Group>
                  <Button type="submit" variant="primary">Enviar Mensaje</Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Información de Contacto</Card.Title>
              <p><strong>Dirección:</strong> Av. Vitacura 1234, Santiago</p>
              <p><strong>Teléfono:</strong> +56 2 1234 5678</p>
              <p><strong>Email:</strong> contacto@eventospro.cl</p>
              <p><strong>Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

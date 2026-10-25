import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "../data/db.js";

export default function IniciarSesion() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("eventospro_usuario_logueado", JSON.stringify({ email: form.email, nombre: form.email.split("@")[0] }));
    alert("Sesión iniciada correctamente");
    navigate("/");
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Iniciar Sesión</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" variant="primary">Iniciar Sesión</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export function RegistroUsuarioTienda() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "", telefono: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUsuario({ ...form, rol: "cliente" });
    alert("Usuario registrado correctamente");
    navigate("/login");
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Registro de Usuario</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control name="telefono" value={form.telefono} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="primary">Registrarse</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

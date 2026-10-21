import { useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useEventos } from "../context/EventosContext.jsx";

export default function AdminLogin() {
    const { iniciarSesionAdmin } = useEventos();
    const navigate = useNavigate();

    const [form, setForm] = useState({ usuario: "", password: "", clave: "" });
    const [error, setError] = useState(null);

    const actualizar = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setError(null);
    };

    const enviar = (e) => {
        e.preventDefault();
        setError(null);

        if (!form.usuario.trim() || !form.password || !form.clave.trim()) {
            setError("Por favor completa todos los campos para ingresar.");
            return;
        }

        iniciarSesionAdmin({ usuario: form.usuario.trim() });
        navigate("/admin/gestion");
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={12} md={5} lg={4}>
                    <Card className="shadow-lg auth-card">
                        <Card.Header className="bg-danger text-white text-center py-3">
                            <Badge bg="dark" className="mb-1">
                                Módulo Restringido
                            </Badge>
                            <h4 className="mb-0 fw-bold">EventosPro Admin</h4>
                            <small className="text-white-50">Control Central de Eventos y Horarios</small>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={enviar}>
                                <Form.Group className="mb-3" controlId="adminUser">
                                    <Form.Label className="fw-semibold">ID o Correo de Administrador</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="admin@eventospro.cl"
                                        value={form.usuario}
                                        onChange={(e) => actualizar("usuario", e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="adminPass">
                                    <Form.Label className="fw-semibold">Contraseña Master</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={(e) => actualizar("password", e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="adminKey">
                                    <Form.Label className="fw-semibold">Código de Clave de Seguridad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: ADM-2026-X"
                                        value={form.clave}
                                        onChange={(e) => actualizar("clave", e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Alert variant="warning" className="py-2 small mb-3">
                                    <strong>Atención:</strong> Este perfil otorga permisos para anular reservas, reprogramar
                                    horarios y eliminar eventos del sistema.
                                </Alert>

                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}

                                <div className="d-grid gap-2 mt-3">
                                    <Button type="submit" variant="danger" size="lg" className="fw-bold">
                                        Ingresar al Panel de Control
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="bg-white text-center py-3">
                            <small className="text-muted">
                                ¿Eres cliente?{" "}
                                <Link to="/" className="text-primary text-decoration-none">
                                    Ir al portal público
                                </Link>
                            </small>
                        </Card.Footer>
                    </Card>
                    <div className="text-center mt-3">
                        <Link to="/" className="text-secondary text-decoration-none">
                            ← Volver al Inicio
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

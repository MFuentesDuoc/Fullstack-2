import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useEventos } from "../context/EventosContext.jsx";

const FORMULARIO_VACIO = {
    nombre: "",
    empresa: "",
    email: "",
    password: "",
    passwordConfirm: "",
    terms: false
};

export default function RegistroUsuario() {
    const { agregarUsuario, usuarios } = useEventos();
    const navigate = useNavigate();

    const [form, setForm] = useState(FORMULARIO_VACIO);
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);

    const actualizar = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setError(null);
        setExito(null);
    };

    const enviar = (e) => {
        e.preventDefault();
        setError(null);
        setExito(null);

        if (!form.nombre.trim() || !form.email.trim() || !form.password) {
            setError("Por favor completa todos los campos obligatorios.");
            return;
        }
        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (form.password !== form.passwordConfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (!form.terms) {
            setError("Debes aceptar los términos y políticas de confidencialidad.");
            return;
        }

        const yaExiste = usuarios.some(
            (u) => u.email.toLowerCase() === form.email.trim().toLowerCase()
        );
        if (yaExiste) {
            setError("Ya existe una cuenta registrada con ese correo electrónico.");
            return;
        }

        agregarUsuario({
            nombre: form.nombre.trim(),
            empresa: form.empresa.trim(),
            email: form.email.trim()

        });

        setExito("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        setForm(FORMULARIO_VACIO);
        setTimeout(() => navigate("/"), 1200);
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={12} md={7} lg={6}>
                    <Card className="shadow-sm auth-card">
                        <Card.Header className="bg-primary text-white text-center py-3">
                            <h4 className="mb-0 fw-bold">EventosPro</h4>
                            <small>Crear Nueva Cuenta de Cliente</small>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={enviar}>
                                <Row className="mb-3">
                                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                                        <Form.Group controlId="regNombre">
                                            <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ej: Juan Pérez"
                                                value={form.nombre}
                                                onChange={(e) => actualizar("nombre", e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="regEmpresa">
                                            <Form.Label className="fw-semibold">Empresa / Organización</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Opcional"
                                                value={form.empresa}
                                                onChange={(e) => actualizar("empresa", e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="regEmail">
                                    <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={form.email}
                                        onChange={(e) => actualizar("email", e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                                        <Form.Group controlId="regPass">
                                            <Form.Label className="fw-semibold">Contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Mínimo 6 caracteres"
                                                value={form.password}
                                                onChange={(e) => actualizar("password", e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group controlId="regPassConfirm">
                                            <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Repite tu contraseña"
                                                value={form.passwordConfirm}
                                                onChange={(e) => actualizar("passwordConfirm", e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        id="termsCheck"
                                        label="Acepto los términos y políticas de confidencialidad de EventosPro"
                                        checked={form.terms}
                                        onChange={(e) => actualizar("terms", e.target.checked)}
                                        required
                                    />
                                </Form.Group>

                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                        {error}
                                    </Alert>
                                )}
                                {exito && (
                                    <Alert variant="success" dismissible onClose={() => setExito(null)}>
                                        {exito}
                                    </Alert>
                                )}

                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="primary" size="lg">
                                        Registrar Cuenta
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="bg-white text-center py-3">
                            <small className="text-muted">
                                ¿Ya tienes cuenta?{" "}
                                <Link to="/admin/login" className="text-primary text-decoration-none">
                                    Inicia sesión
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

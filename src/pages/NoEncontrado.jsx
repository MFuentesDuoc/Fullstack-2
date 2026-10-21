import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NoEncontrado() {
    return (
        <Container className="my-5 text-center">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <p className="lead">La página que buscas no existe en EventosPro.</p>
            <Button as={Link} to="/" variant="primary">
                Volver al Inicio
            </Button>
        </Container>
    );
}

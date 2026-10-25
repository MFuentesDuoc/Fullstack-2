import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PagoCorrecto() {
  const ordenId = `BO-${Date.now().toString().slice(-6)}`;
  return (
    <Container className="py-5 text-center">
      <h1 className="text-success">¡Pago Correcto!</h1>
      <p className="fs-4">Tu compra ha sido procesada exitosamente</p>
      <p>Número de orden: {ordenId}</p>
      <Button as={Link} to="/" variant="primary" className="mt-3">Volver al Inicio</Button>
    </Container>
  );
}

export function PagoError() {
  return (
    <Container className="py-5 text-center">
      <h1 className="text-danger">Pago con Error</h1>
      <p className="fs-4">Hubo un problema al procesar tu pago</p>
      <p>Por favor, verifica tus datos e intenta nuevamente</p>
      <Button as={Link} to="/checkout" variant="warning" className="mt-3 me-2">Intentar Nuevamente</Button>
      <Button as={Link} to="/" variant="secondary" className="mt-3">Volver al Inicio</Button>
    </Container>
  );
}

import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductos, getOrdenes, getUsuarios } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export default function AdminDashboard() {
  const productos = getProductos();
  const ordenes = getOrdenes();
  const usuarios = getUsuarios();
  const totalVentas = ordenes.reduce((acc, o) => acc + o.total, 0);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Dashboard - Panel Administrativo</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <Card.Title>Compras</Card.Title>
              <h2>{ordenes.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <h2>{productos.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <h2>{usuarios.length}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Ventas Totales</Card.Header>
            <Card.Body>
              <h3 className="text-success">{formatoCLP(totalVentas)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Acceso Rápido</Card.Header>
            <Card.Body>
              <Button as={Link} to="/admin/ordenes" variant="primary" className="me-2 mb-2">Órdenes</Button>
              <Button as={Link} to="/admin/productos" variant="success" className="me-2 mb-2">Productos</Button>
              <Button as={Link} to="/admin/usuarios" variant="info" className="me-2 mb-2">Usuarios</Button>
              <Button as={Link} to="/admin/categorias" variant="warning" className="me-2 mb-2">Categorías</Button>
              <Button as={Link} to="/admin/reportes-tienda" variant="secondary" className="mb-2">Reportes</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export function AdminOrdenes() {
  const ordenes = getOrdenes();
  return (
    <Container className="py-4">
      <h1 className="mb-4">Órdenes / Boletas</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.fecha}</td>
              <td>{o.cliente}</td>
              <td>{formatoCLP(o.total)}</td>
              <td><Badge bg={o.estado === "Pagado" ? "success" : "warning"}>{o.estado}</Badge></td>
              <td><Button as={Link} to={`/admin/ordenes/${o.id}`} size="sm" variant="info">Mostrar Boleta</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function AdminOrdenDetalle() {
  const id = window.location.pathname.split("/").pop();
  const orden = getOrdenes().find((o) => o.id === id);
  if (!orden) return <Container className="py-4"><h2>Orden no encontrada</h2></Container>;
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Boleta {orden.id}</h3></Card.Header>
        <Card.Body>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Cliente:</strong> {orden.cliente}</p>
          <p><strong>Email:</strong> {orden.email}</p>
          <p><strong>Dirección:</strong> {orden.direccion}</p>
          <Table striped>
            <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr></thead>
            <tbody>
              {orden.productos.map((p, i) => (
                <tr key={i}><td>{p.nombre}</td><td>{p.cantidad}</td><td>{formatoCLP(p.precio * p.cantidad)}</td></tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: {formatoCLP(orden.total)}</h4>
          <Link to="/admin/ordenes" className="btn btn-secondary">Volver</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

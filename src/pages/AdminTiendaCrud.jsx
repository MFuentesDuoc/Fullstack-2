import { Badge, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProductos, getUsuarios, getCategorias, createProducto, deleteProducto } from "../data/db.js";
import { formatoCLP } from "../utils/eventos.js";

export function AdminProductos() {
  const [productos, setProductos] = useState(getProductos());
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", codigo: "", precio: "", descripcion: "", categoria: "Salones" });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProducto({ ...form, precio: Number(form.precio), stock: 100 });
    setProductos(getProductos());
    setMostrarForm(false);
    setForm({ nombre: "", codigo: "", precio: "", descripcion: "", categoria: "Salones" });
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar producto?")) {
      deleteProducto(id);
      setProductos(getProductos());
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between mb-4">
        <h1>Productos</h1>
        <div>
          <Button onClick={() => setMostrarForm(!mostrarForm)} variant="primary" className="me-2">Nuevo Producto</Button>
          <Button as={Link} to="/admin/productos-criticos" variant="warning" className="me-2">Productos Críticos</Button>
          <Button as={Link} to="/admin/productos-reportes" variant="info">Reportes</Button>
        </div>
      </div>
      {mostrarForm && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}><Form.Group className="mb-2"><Form.Label>Nombre</Form.Label><Form.Control value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-2"><Form.Label>Código</Form.Label><Form.Control value={form.codigo} onChange={(e) => setForm({...form, codigo: e.target.value})} required /></Form.Group></Col>
              </Row>
              <Row>
                <Col md={6}><Form.Group className="mb-2"><Form.Label>Precio</Form.Label><Form.Control type="number" value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} required /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-2"><Form.Label>Categoría</Form.Label><Form.Select value={form.categoria} onChange={(e) => setForm({...form, categoria: e.target.value})}><option>Salones</option><option>Servicios</option></Form.Select></Form.Group></Col>
              </Row>
              <Form.Group className="mb-2"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} /></Form.Group>
              <Button type="submit" variant="success">Guardar</Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      <Table striped bordered hover responsive>
        <thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Acciones</th></tr></thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{formatoCLP(p.precio)}</td>
              <td>{p.categoria}</td>
              <td>
                <Button as={Link} to={`/admin/productos/${p.id}`} size="sm" variant="info" className="me-1">Mostrar</Button>
                <Button as={Link} to={`/admin/productos/editar/${p.id}`} size="sm" variant="warning" className="me-1">Editar</Button>
                <Button size="sm" variant="danger" onClick={() => eliminar(p.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function AdminProductoDetalle() {
  const id = window.location.pathname.split("/").pop();
  const producto = getProductos().find((p) => p.id === id);
  if (!producto) return <Container className="py-4"><h2>Producto no encontrado</h2></Container>;
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Detalle Producto</h3></Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Código:</strong> {producto.codigo}</p>
          <p><strong>Precio:</strong> {formatoCLP(producto.precio)}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <Link to="/admin/productos" className="btn btn-secondary me-2">Volver</Link>
          <Link to={`/admin/productos/editar/${producto.id}`} className="btn btn-warning">Editar Producto</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminProductoEditar() {
  const id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
  const producto = getProductos().find((p) => p.id === id);
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Editar Producto</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control defaultValue={producto?.nombre} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Precio</Form.Label><Form.Control defaultValue={producto?.precio} /></Form.Group>
            <Button variant="success" className="me-2">Guardar Cambios</Button>
            <Link to="/admin/productos" className="btn btn-secondary">Cancelar</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminProductosCriticos() {
  const criticos = getProductos().filter((p) => p.stock < 50);
  return (
    <Container className="py-4">
      <h1>Listado de Productos Críticos</h1>
      <Table striped bordered>
        <thead><tr><th>Producto</th><th>Stock</th><th>Estado</th></tr></thead>
        <tbody>
          {criticos.map((p) => (
            <tr key={p.id}><td>{p.nombre}</td><td>{p.stock}</td><td><Badge bg="danger">Crítico</Badge></td></tr>
          ))}
        </tbody>
      </Table>
      <Link to="/admin/productos" className="btn btn-secondary">Volver</Link>
    </Container>
  );
}

export function AdminProductosReportes() {
  const productos = getProductos();
  return (
    <Container className="py-4">
      <h1>Reportes de Productos</h1>
      <Card>
        <Card.Body>
          <p><strong>Total de Productos:</strong> {productos.length}</p>
          <p><strong>Valor Total Inventario:</strong> {formatoCLP(productos.reduce((acc, p) => acc + p.precio * (p.stock || 0), 0))}</p>
        </Card.Body>
      </Card>
      <Link to="/admin/productos" className="btn btn-secondary mt-3">Volver</Link>
    </Container>
  );
}

export function AdminCategorias() {
  const [categorias] = useState(getCategorias());
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between mb-4">
        <h1>Categorías</h1>
        <Button as={Link} to="/admin/categorias/nueva" variant="primary">Nueva Categoría</Button>
      </div>
      <Table striped bordered>
        <thead><tr><th>Código</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}><td>{c.codigo}</td><td>{c.nombre}</td><td>{c.descripcion}</td><td><Button as={Link} to={`/admin/categorias/editar/${c.id}`} size="sm" variant="warning">Editar Categoría</Button></td></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function AdminCategoriaNueva() {
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Nueva Categoría</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" /></Form.Group>
            <Button variant="success" className="me-2">Guardar</Button>
            <Link to="/admin/categorias" className="btn btn-secondary">Cancelar</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminCategoriaEditar() {
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Editar Categoría</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" /></Form.Group>
            <Button variant="success" className="me-2">Guardar Cambios</Button>
            <Link to="/admin/categorias" className="btn btn-secondary">Cancelar</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminUsuarios() {
  const [usuarios] = useState(getUsuarios());
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between mb-4">
        <h1>Usuarios</h1>
        <Button as={Link} to="/admin/usuarios/nuevo" variant="primary">Nuevo Usuario</Button>
      </div>
      <Table striped bordered>
        <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}><td>{u.nombre}</td><td>{u.email}</td><td><Badge bg={u.rol === "admin" ? "danger" : "primary"}>{u.rol}</Badge></td><td>
              <Button as={Link} to={`/admin/usuarios/${u.id}`} size="sm" variant="info" className="me-1">Mostrar</Button>
              <Button as={Link} to={`/admin/usuarios/editar/${u.id}`} size="sm" variant="warning" className="me-1">Editar</Button>
              <Button as={Link} to={`/admin/usuarios/historial/${u.id}`} size="sm" variant="secondary">Historial de Compras</Button>
            </td></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function AdminUsuarioNuevo() {
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Nuevo Usuario</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Rol</Form.Label><Form.Select><option>cliente</option><option>admin</option></Form.Select></Form.Group>
            <Button variant="success" className="me-2">Guardar</Button>
            <Link to="/admin/usuarios" className="btn btn-secondary">Cancelar</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminUsuarioDetalle() {
  const id = window.location.pathname.split("/").pop();
  const usuario = getUsuarios().find((u) => u.id === id);
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Detalle Usuario</h3></Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
          <p><strong>Rol:</strong> {usuario?.rol}</p>
          <Link to="/admin/usuarios" className="btn btn-secondary me-2">Volver</Link>
          <Link to={`/admin/usuarios/editar/${usuario?.id}`} className="btn btn-warning">Editar Usuario</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminUsuarioEditar() {
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Editar Usuario</h3></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control /></Form.Group>
            <Button variant="success" className="me-2">Guardar Cambios</Button>
            <Link to="/admin/usuarios" className="btn btn-secondary">Cancelar</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export function AdminUsuarioHistorial() {
  const ordenes = getOrdenes();
  return (
    <Container className="py-4">
      <h1>Historial de Compras</h1>
      <Table striped bordered>
        <thead><tr><th>Boleta</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id}><td>{o.id}</td><td>{o.fecha}</td><td>{formatoCLP(o.total)}</td><td>{o.estado}</td></tr>
          ))}
        </tbody>
      </Table>
      <Link to="/admin/usuarios" className="btn btn-secondary">Volver</Link>
    </Container>
  );
}

export function AdminReportesTienda() {
  const productos = getProductos();
  const ordenes = getOrdenes();
  return (
    <Container className="py-4">
      <h1>Reportes</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Resumen de Ventas</Card.Header>
            <Card.Body>
              <p><strong>Total Órdenes:</strong> {ordenes.length}</p>
              <p><strong>Ventas Totales:</strong> {formatoCLP(ordenes.reduce((acc, o) => acc + o.total, 0))}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Inventario</Card.Header>
            <Card.Body>
              <p><strong>Total Productos:</strong> {productos.length}</p>
              <p><strong>Productos Destacados:</strong> {productos.filter(p => p.destacado).length}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Link to="/admin/dashboard" className="btn btn-secondary">Volver al Dashboard</Link>
    </Container>
  );
}

export function AdminPerfil() {
  return (
    <Container className="py-4">
      <Card>
        <Card.Header><h3>Perfil de Administrador</h3></Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> Administrador</p>
          <p><strong>Email:</strong> admin@eventospro.cl</p>
          <p><strong>Rol:</strong> Administrador</p>
          <Button variant="primary">Actualizar Perfil</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

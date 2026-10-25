import { SALONES, SERVICIOS } from "./catalogos.js";

let productosDB = [...SALONES].map((s) => ({
  id: s.codigo,
  codigo: s.codigo,
  nombre: s.nombre,
  descripcion: s.descripcion,
  precio: s.precio,
  stock: 100,
  categoria: "Salones",
  tipo: "salon",
  capacidad: s.capacidad,
  equipamiento: s.equipamiento,
  imagen: "/img/salon-default.jpg",
  oferta: false,
  destacado: true
}));

let categoriasDB = [
  { id: "CAT-01", codigo: "CAT-01", nombre: "Salones", descripcion: "Espacios para eventos" },
  { id: "CAT-02", codigo: "CAT-02", nombre: "Servicios", descripcion: "Servicios adicionales" },
  { id: "CAT-03", codigo: "CAT-03", nombre: "Bodas", descripcion: "Eventos matrimoniales" },
  { id: "CAT-04", codigo: "CAT-04", nombre: "Corporativos", descripcion: "Eventos empresariales" }
];

let usuariosDB = [
  { id: "US-01", nombre: "Cliente Demo", email: "cliente@demo.cl", rol: "cliente", telefono: "+56 9 1234 5678" },
  { id: "US-02", nombre: "Administrador", email: "admin@eventospro.cl", rol: "admin", telefono: "+56 9 8765 4321" }
];

let ordenesDB = [
  {
    id: "BO-1001",
    fecha: "2026-10-20",
    cliente: "TechCorp Chile",
    email: "contacto@techcorp.cl",
    total: 1500000,
    estado: "Pagado",
    direccion: "Av. Providencia 1234, Santiago",
    productos: [
      { codigo: "SL001", nombre: "Salón Principal", cantidad: 1, precio: 1200000 },
      { codigo: "SE001", nombre: "Catering", cantidad: 250, precio: 15000 }
    ]
  },
  {
    id: "BO-1002",
    fecha: "2026-10-21",
    cliente: "María González",
    email: "maria.gonzalez@mail.cl",
    total: 950000,
    estado: "Pendiente",
    direccion: "Calle Los Aromos 45, Viña del Mar",
    productos: [
      { codigo: "SL004", nombre: "Salón de Bodas", cantidad: 1, precio: 750000 },
      { codigo: "SE004", nombre: "Decoración", cantidad: 1, precio: 200000 }
    ]
  }
];

export function getProductos() {
  return [...productosDB];
}

export function getProductoById(id) {
  return productosDB.find((p) => p.id === id || p.codigo === id) || null;
}

export function createProducto(producto) {
  const nuevo = { ...producto, id: producto.id || `PR-${Date.now()}` };
  productosDB = [...productosDB, nuevo];
  return nuevo;
}

export function updateProducto(id, cambios) {
  let actualizado = null;
  productosDB = productosDB.map((p) => {
    if (p.id === id || p.codigo === id) {
      actualizado = { ...p, ...cambios };
      return actualizado;
    }
    return p;
  });
  return actualizado;
}

export function deleteProducto(id) {
  const existe = productosDB.some((p) => p.id === id || p.codigo === id);
  productosDB = productosDB.filter((p) => !(p.id === id || p.codigo === id));
  return existe;
}

export function getCategorias() {
  return [...categoriasDB];
}

export function getCategoriaById(id) {
  return categoriasDB.find((c) => c.id === id || c.codigo === id) || null;
}

export function createCategoria(categoria) {
  const nuevo = { ...categoria, id: categoria.id || `CAT-${Date.now()}` };
  categoriasDB = [...categoriasDB, nuevo];
  return nuevo;
}

export function updateCategoria(id, cambios) {
  let actualizado = null;
  categoriasDB = categoriasDB.map((c) => {
    if (c.id === id || c.codigo === id) {
      actualizado = { ...c, ...cambios };
      return actualizado;
    }
    return c;
  });
  return actualizado;
}

export function deleteCategoria(id) {
  const existe = categoriasDB.some((c) => c.id === id || c.codigo === id);
  categoriasDB = categoriasDB.filter((c) => !(c.id === id || c.codigo === id));
  return existe;
}

export function getUsuarios() {
  return [...usuariosDB];
}

export function getUsuarioById(id) {
  return usuariosDB.find((u) => u.id === id) || null;
}

export function createUsuario(usuario) {
  const nuevo = { ...usuario, id: usuario.id || `US-${Date.now()}` };
  usuariosDB = [...usuariosDB, nuevo];
  return nuevo;
}

export function updateUsuario(id, cambios) {
  let actualizado = null;
  usuariosDB = usuariosDB.map((u) => {
    if (u.id === id) {
      actualizado = { ...u, ...cambios };
      return actualizado;
    }
    return u;
  });
  return actualizado;
}

export function deleteUsuario(id) {
  const existe = usuariosDB.some((u) => u.id === id);
  usuariosDB = usuariosDB.filter((u) => !(u.id === id));
  return existe;
}

export function getOrdenes() {
  return [...ordenesDB];
}

export function getOrdenById(id) {
  return ordenesDB.find((o) => o.id === id) || null;
}

export function createOrden(orden) {
  const nuevo = { ...orden, id: orden.id || `BO-${Date.now()}` };
  ordenesDB = [...ordenesDB, nuevo];
  return nuevo;
}

export function updateOrden(id, cambios) {
  let actualizado = null;
  ordenesDB = ordenesDB.map((o) => {
    if (o.id === id) {
      actualizado = { ...o, ...cambios };
      return actualizado;
    }
    return o;
  });
  return actualizado;
}

export function getProductosEnOferta() {
  return productosDB.filter((p) => p.oferta);
}

export function getProductosPorCategoria(categoria) {
  return productosDB.filter((p) => p.categoria === categoria);
}

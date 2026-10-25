import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEventos } from "../context/EventosContext.jsx";

const ENLACES_PUBLICOS = [
    { to: "/", label: "Inicio" },
    { to: "/home", label: "Tienda" },
    { to: "/productos", label: "Productos" },
    { to: "/categorias", label: "Categorías" },
    { to: "/ofertas", label: "Ofertas" },
    { to: "/blogs", label: "Blogs" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/contacto", label: "Contacto" },
    { to: "/catalogo", label: "Catálogo Salones" },
    { to: "/reservar", label: "Reservar" }
];

const ENLACES_ADMIN = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/ordenes", label: "Órdenes" },
    { to: "/admin/productos", label: "Productos" },
    { to: "/admin/categorias", label: "Categorías" },
    { to: "/admin/usuarios", label: "Usuarios" },
    { to: "/admin/reportes-tienda", label: "Reportes" },
    { to: "/admin/perfil", label: "Perfil" },
    { to: "/admin/gestion", label: "Gestión Eventos" },
    { to: "/admin/reportes", label: "Reportes Eventos" },
    { to: "/proveedores", label: "Proveedores" }
];

export default function BarraNavegacion({ variante = "publico" }) {
    const { sesionAdmin, cerrarSesionAdmin } = useEventos();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const esAdmin = variante === "admin";
    const esProveedor = variante === "proveedores";
    const enlaces = esAdmin ? ENLACES_ADMIN : ENLACES_PUBLICOS;

    const esActivo = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

    const cerrarSesion = () => {
        cerrarSesionAdmin();
        navigate("/admin/login");
    };

    return (
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    {esProveedor ? "EventosPro - Proveedores" : "EventosPro"}
                </Navbar.Brand>

                {!esProveedor && (
                    <Navbar.Toggle aria-controls="navbar-eventospro" />
                )}

                <Navbar.Collapse id="navbar-eventospro">
                    <Nav className="me-auto">
                        {enlaces.map((enlace) => (
                            <Nav.Link
                                as={Link}
                                to={enlace.to}
                                active={esActivo(enlace.to)}
                                key={enlace.to}
                            >
                                {enlace.label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    <div className="d-flex flex-wrap gap-2">
                        {esAdmin && (
                            <button type="button" className="btn btn-outline-light btn-sm" onClick={cerrarSesion}>
                                Cerrar Sesión
                            </button>
                        )}

                        {esProveedor && (
                            <Link to="/admin/gestion" className="btn btn-outline-light btn-sm">
                                Volver al Panel
                            </Link>
                        )}

                        {variante === "publico" && !sesionAdmin && (
                            <>
                                <Link to="/admin/login" className="btn btn-outline-light btn-sm">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/registro" className="btn btn-primary btn-sm">
                                    Registrarse
                                </Link>
                            </>
                        )}

                        {variante === "publico" && sesionAdmin && (
                            <>
                                <Link to="/admin/gestion" className="btn btn-outline-light btn-sm">
                                    Panel Admin
                                </Link>
                                <button type="button" className="btn btn-primary btn-sm" onClick={cerrarSesion}>
                                    Cerrar Sesión
                                </button>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

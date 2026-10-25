import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";

import PieDePagina from "./components/Footer.jsx";
import BarraNavegacion from "./components/Navbar.jsx";
import { useEventos } from "./context/EventosContext.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import IniciarSesion, { RegistroUsuarioTienda } from "./pages/AuthTienda.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Categorias from "./pages/Categorias.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contacto from "./pages/Contacto.jsx";
import CoordinacionProveedores from "./pages/CoordinacionProveedores.jsx";
import GestionEventos from "./pages/GestionEventos.jsx";
import Inicio from "./pages/Inicio.jsx";
import Home from "./pages/Home.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import PagoCorrecto, { PagoError } from "./pages/PagoResultado.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import Productos from "./pages/Productos.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";
import ReportesAdmin from "./pages/ReportesAdmin.jsx";
import SolicitudReserva from "./pages/SolicitudReserva.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Blogs, { BlogDetalle } from "./pages/Blogs.jsx";
import AdminDashboard, { AdminOrdenDetalle, AdminOrdenes } from "./pages/AdminTienda.jsx";
import {
    AdminCategoriaEditar,
    AdminCategoriaNueva,
    AdminCategorias,
    AdminPerfil,
    AdminProductoDetalle,
    AdminProductoEditar,
    AdminProductos,
    AdminProductosCriticos,
    AdminProductosReportes,
    AdminReportesTienda,
    AdminUsuarioDetalle,
    AdminUsuarioEditar,
    AdminUsuarioHistorial,
    AdminUsuarioNuevo,
    AdminUsuarios
} from "./pages/AdminTiendaCrud.jsx";

function LayoutPublico() {
    return (
        <div className="app-layout">
            <BarraNavegacion variante="publico" />
            <main>
                <Outlet />
            </main>
            <PieDePagina />
        </div>
    );
}

function LayoutAdmin() {
    return (
        <div className="app-layout">
            <BarraNavegacion variante="admin" />
            <main className="contenido-panel">
                <Outlet />
            </main>
            <PieDePagina />
        </div>
    );
}

function LayoutProveedores() {
    return (
        <div className="app-layout">
            <BarraNavegacion variante="proveedores" />
            <main className="contenido-panel">
                <Outlet />
            </main>
            <PieDePagina />
        </div>
    );
}

function LayoutAuth() {
    return (
        <div className="layout-auth">
            <Outlet />
        </div>
    );
}

function RutaProtegida({ children }) {
    const { sesionAdmin } = useEventos();
    const location = useLocation();

    if (!sesionAdmin) {
        return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
    }
    return children;
}

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<LayoutPublico />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/productos/:id" element={<ProductoDetalle />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<BlogDetalle />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/carrito" element={<Checkout />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/pago-correcto" element={<PagoCorrecto />} />
                    <Route path="/pago-error" element={<PagoError />} />
                    <Route path="/login" element={<IniciarSesion />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/reservar" element={<SolicitudReserva />} />
                </Route>

                <Route element={<LayoutAuth />}>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/registro" element={<RegistroUsuario />} />
                    <Route path="/registro-tienda" element={<RegistroUsuarioTienda />} />
                </Route>

                <Route element={<LayoutAdmin />}>
                    <Route path="/admin/dashboard" element={<RutaProtegida><AdminDashboard /></RutaProtegida>} />
                    <Route path="/admin/ordenes" element={<RutaProtegida><AdminOrdenes /></RutaProtegida>} />
                    <Route path="/admin/ordenes/:id" element={<RutaProtegida><AdminOrdenDetalle /></RutaProtegida>} />
                    <Route path="/admin/productos" element={<RutaProtegida><AdminProductos /></RutaProtegida>} />
                    <Route path="/admin/productos/nuevo" element={<RutaProtegida><AdminProductos /></RutaProtegida>} />
                    <Route path="/admin/productos/:id" element={<RutaProtegida><AdminProductoDetalle /></RutaProtegida>} />
                    <Route path="/admin/productos/editar/:id" element={<RutaProtegida><AdminProductoEditar /></RutaProtegida>} />
                    <Route path="/admin/productos-criticos" element={<RutaProtegida><AdminProductosCriticos /></RutaProtegida>} />
                    <Route path="/admin/productos-reportes" element={<RutaProtegida><AdminProductosReportes /></RutaProtegida>} />
                    <Route path="/admin/categorias" element={<RutaProtegida><AdminCategorias /></RutaProtegida>} />
                    <Route path="/admin/categorias/nueva" element={<RutaProtegida><AdminCategoriaNueva /></RutaProtegida>} />
                    <Route path="/admin/categorias/editar/:id" element={<RutaProtegida><AdminCategoriaEditar /></RutaProtegida>} />
                    <Route path="/admin/usuarios" element={<RutaProtegida><AdminUsuarios /></RutaProtegida>} />
                    <Route path="/admin/usuarios/nuevo" element={<RutaProtegida><AdminUsuarioNuevo /></RutaProtegida>} />
                    <Route path="/admin/usuarios/:id" element={<RutaProtegida><AdminUsuarioDetalle /></RutaProtegida>} />
                    <Route path="/admin/usuarios/editar/:id" element={<RutaProtegida><AdminUsuarioEditar /></RutaProtegida>} />
                    <Route path="/admin/usuarios/historial/:id" element={<RutaProtegida><AdminUsuarioHistorial /></RutaProtegida>} />
                    <Route path="/admin/reportes-tienda" element={<RutaProtegida><AdminReportesTienda /></RutaProtegida>} />
                    <Route path="/admin/perfil" element={<RutaProtegida><AdminPerfil /></RutaProtegida>} />
                    <Route
                        path="/admin/gestion"
                        element={
                            <RutaProtegida>
                                <GestionEventos />
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/admin/reportes"
                        element={
                            <RutaProtegida>
                                <ReportesAdmin />
                            </RutaProtegida>
                        }
                    />
                </Route>

                <Route element={<LayoutProveedores />}>
                    <Route
                        path="/proveedores"
                        element={
                            <RutaProtegida>
                                <CoordinacionProveedores />
                            </RutaProtegida>
                        }
                    />
                </Route>

                <Route path="*" element={<NoEncontrado />} />
            </Routes>
        </>
    );
}

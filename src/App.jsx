import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";

import PieDePagina from "./components/Footer.jsx";
import BarraNavegacion from "./components/Navbar.jsx";
import { useEventos } from "./context/EventosContext.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import CoordinacionProveedores from "./pages/CoordinacionProveedores.jsx";
import GestionEventos from "./pages/GestionEventos.jsx";
import Inicio from "./pages/Inicio.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";
import ReportesAdmin from "./pages/ReportesAdmin.jsx";
import SolicitudReserva from "./pages/SolicitudReserva.jsx";

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
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/reservar" element={<SolicitudReserva />} />
                </Route>

                <Route element={<LayoutAuth />}>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/registro" element={<RegistroUsuario />} />
                </Route>

                <Route element={<LayoutAdmin />}>
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

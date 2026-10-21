# EventosPro — Sistema de Gestión de Eventos (React)

Centro de convenciones y eventos ubicado en la comuna de Vitacura, Región Metropolitana.
Proyecto **Evaluación Fullstack II** — Martin Fernández, Martin Fuentes, Darliette Loncopan.

> **Migración:** esta versión es la conversión del sitio web HTML/CSS/JavaScript original
> (multi-página con Bootstrap 5 y `localStorage`) a una **Single Page Application (SPA)
> con React + Vite + React Bootstrap + React Router**.

---

## 1. Descripción del proyecto

EventosPro es un centro de convenciones y eventos inaugurado en 2015, con 8 salones de
diferentes capacidades, equipamiento audiovisual de última generación y servicios de catering.

El sistema reemplaza las planillas Excel, los correos y las agendas físicas que generaban
dobles reservas y conflictos de agenda, permitiendo:

- Catálogo público de salones y servicios adicionales.
- Solicitud de reservas con cálculo de precio en vivo y **detección de doble reserva**.
- Panel administrativo con gestión del ciclo de vida de cada evento.
- Reportes con ingresos, ocupación de salones y alertas de conflictos.
- Portal de coordinación con proveedores (confirmación/rechazo de servicios).

---

## 2. Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.x | Componentes y estado de la interfaz |
| Vite | 8.x | Bundler y servidor de desarrollo |
| React Bootstrap | 2.x | Componentes de UI (Container, Row, Col, Card, Navbar, Modal…) |
| Bootstrap | 5.3 | Estilos base y breakpoints responsivos |
| React Router | 7.x | Enrutado de las vistas (SPA) |
| localStorage | — | Persistencia de eventos, usuarios, estados de proveedores y sesión |

---

## 3. Estructura de carpetas

```
eventospro/
├── node_modules/            # Dependencias instaladas (no tocar)
├── public/                  # Archivos estáticos
│   └── favicon.svg
├── src/                     # Código fuente de la aplicación
│   ├── assets/              # Imágenes, logos y fuentes
│   │   └── logo.svg
│   ├── components/          # Componentes reutilizables
│   │   ├── EstadoBadge.jsx  # Badge de color según el estado del evento
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── Navbar.jsx       # Barra de navegación (pública / admin / proveedores)
│   │   └── SalonCard.jsx    # Tarjeta de salón del catálogo
│   ├── context/             # Estado global de la aplicación
│   │   └── EventosContext.jsx
│   ├── data/                # Catálogos estáticos (salones, servicios, estados)
│   │   └── catalogos.js
│   ├── pages/               # Vistas (una por ruta)
│   │   ├── Inicio.jsx
│   │   ├── Catalogo.jsx
│   │   ├── SolicitudReserva.jsx
│   │   ├── RegistroUsuario.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── GestionEventos.jsx
│   │   ├── ReportesAdmin.jsx
│   │   ├── CoordinacionProveedores.jsx
│   │   └── NoEncontrado.jsx
│   ├── services/            # Capa de persistencia
│   │   └── storage.js
│   ├── utils/               # Funciones puras de dominio
│   │   └── eventos.js
│   ├── App.css              # Estilos del componente App (layouts, hero, footer)
│   ├── App.jsx              # Componente principal: define las rutas y los layouts
│   ├── index.css            # Estilos globales (tama de la aplicación)
│   └── main.jsx             # Punto de entrada: monta App en el DOM
├── index.html               # Plantilla HTML base
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Reglas de ESLint (incluye react-hooks)
└── README.md
```

---

## 4. Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo (http://localhost:5173)
npm run dev

# 3. Generar la versión de producción
npm run build

# 4. Previsualizar la versión de producción
npm run preview

# 5. Revisar el código (ESLint + reglas de hooks de React)
npm run lint
```

> La carpeta `dist/` que genera `npm run build` es estática. Si el proyecto se publica en
> un servidor que no reescribe URLs (Apache, Netlify, GitHub Pages…), configura el
> *rewrite* de todas las rutas a `index.html`, ya que React Router usa rutas del navegador
> (por ejemplo `/admin/gestion`).

---

## 5. Rutas de la aplicación

| Ruta | Vista | Acceso |
|---|---|---|
| `/` | Inicio (hero + características) | Público |
| `/catalogo` | Catálogo de salones y servicios | Público |
| `/reservar` | Solicitud de reserva | Público |
| `/registro` | Registro de cliente | Público |
| `/admin/login` | Acceso administrativo | Público |
| `/admin/gestion` | Gestión y seguimiento de eventos | Administrador |
| `/admin/reportes` | Panel de reportes | Administrador |
| `/proveedores` | Portal de coordinación de proveedores | Administrador |
| `*` | Página 404 | Público |

Las rutas administrativas están protegidas: si no existe una sesión activa, el usuario es
redirigido a `/admin/login`.

---

## 6. Responsive design

Todo el layout usa el sistema de rejilla de Bootstrap a través de `Container`, `Row` y
`Col` de React Bootstrap, con props por breakpoint:

| Patrón | Significado |
|---|---|
| `<Col xs={12} md={4}>` | En móvil ocupa todo el ancho; en tablet/desktop un tercio |
| `<Col xs={12} md={6}>` | Móvil apilado; tablet y desktop mitad y mitad |
| `<Col xs={6} md={3}>` | Dos por fila en móvil; cuatro por fila en desktop |
| `<Navbar expand="lg">` | Los enlaces se ocultan tras el botón hamburguesa bajo 992px |

Breakpoints de Bootstrap: `xs` (<576px), `sm` (≥576px), `md` (≥768px), `lg` (≥992px),
`xl` (≥1200px), `xxl` (≥1400px).

---

## 7. Arquitectura de datos

### `src/services/storage.js`
Única capa que habla con `localStorage`. Usa las mismas claves que el proyecto HTML original,
por lo que los datos son compatibles entre ambas versiones:

| Clave | Contenido |
|---|---|
| `eventospro_eventos` | Lista de eventos (reservas) |
| `eventospro_usuarios` | Usuarios registrados |
| `eventospro_proveedores` | Estado de confirmación por servicio |
| `eventospro_sesion_admin` | Sesión del administrador |

### `src/context/EventosContext.jsx`
Proveedor de estado global. En el proyecto original cada página recargaba los datos desde
`localStorage` y redibujaba la tabla a mano con `innerHTML`. En React:

- El estado vive en un único lugar (`useState`) y se persiste con `useEffect`.
- Todas las vistas quedan sincronizadas automáticamente (crear una reserva actualiza el
  panel de gestión y los reportes al instante).
- Las acciones (`agregarEvento`, `avanzarEstado`, `eliminarEvento`, `setEstadoProveedor`,
  `iniciarSesionAdmin`…) están disponibles mediante el hook `useEventos()`.

### `src/utils/eventos.js`
Funciones puras de dominio, sin efectos secundarios: `calcularTotal`, `hayConflicto`,
`generarId`, `siguienteEstado`, `detectarConflictos`, `calcularOcupacion`, `formatoCLP`…

### `src/data/catalogos.js`
Catálogos estáticos: salones, servicios adicionales, flujo de estados y datos de ejemplo.

---

## 8. Equivalencias con el proyecto HTML original

| Antes (HTML/JS) | Ahora (React) |
|---|---|
| `main.html`, `catalogo.html`, `solicitudReserva.html`, `registroUsers.html`, `adminLogins.html`, `gestionEventos.html`, `reportesAdmin.html`, `coordinacionProveedores.html` | Vistas en `src/pages/` + rutas de React Router |
| `storage.js` (módulo global `EventosProData`) | `src/services/storage.js` + `src/context/EventosContext.jsx` |
| `reserva.js`, `gestion.js`, `reportes.js`, `proveedores.js`, `auth.js` | Lógica dentro de los componentes y del Context |
| `window.alert()` para mensajes | `<Alert>` de React Bootstrap (mensajes en línea) |
| `window.alert()` para el detalle del evento | `<Modal>` de React Bootstrap |
| `innerHTML` para renderizar tablas | JSX + `<Table>` declarativo |
| `document.querySelector` / `addEventListener` | `useState`, `useEffect` y handlers de React |
| Clases de Bootstrap escritas a mano | Componentes de React Bootstrap con props de breakpoint |

---

## 9. Funcionalidades implementadas

- **Catálogo** de salones (código, capacidad, equipamiento, precio) y servicios adicionales.
- **Reserva** con cálculo de total en vivo (precio del salón + servicios fijos y por persona).
- **Validaciones**: campos obligatorios, mínimo de asistentes, capacidad máxima del salón.
- **Detección de doble reserva** (mismo salón + misma fecha, excluyendo eventos finalizados).
- **Gestión de eventos**: buscador en vivo, detalle en modal, avance de estado y anulación.
- **Flujo de estados**: Consultado → Reservado → En planificación → En ejecución → Finalizado.
- **Reportes**: total de eventos, ingresos, ocupación de salones, rendimiento por salón,
  tabla de próximos eventos y alerta automática de conflictos.
- **Portal de proveedores**: confirmar o rechazar cada servicio asignado; el estado se
  conserva al recargar la página.
- **Registro y login simulado**, con rutas protegidas para el panel administrativo.
- **Restablecer datos de demostración** desde el panel de reportes (vuelve al estado inicial
  de EV-101 a EV-104 sin cerrar la sesión).

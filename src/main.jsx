import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import { EventosProvider } from "./context/EventosContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <EventosProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </EventosProvider>
    </StrictMode>
);

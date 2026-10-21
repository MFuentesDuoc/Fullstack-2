import { Badge } from "react-bootstrap";

import { badgeClasePorEstado, textoOscuroPorEstado } from "../utils/eventos.js";

export default function EstadoBadge({ estado }) {
    return (
        <Badge bg={badgeClasePorEstado(estado)} text={textoOscuroPorEstado(estado)}>
            {estado}
        </Badge>
    );
}

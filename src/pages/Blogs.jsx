import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    titulo: "Cómo planificar un evento corporativo exitoso",
    fecha: "2026-10-15",
    resumen: "Consejos prácticos para organizar eventos empresariales memorables."
  },
  {
    id: 2,
    titulo: "Tendencias en decoración para bodas 2026",
    fecha: "2026-10-10",
    resumen: "Las últimas tendencias en decoración nupcial para este año."
  }
];

export default function Blogs() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Blog</h1>
      <Row>
        {blogs.map((blog) => (
          <Col md={6} key={blog.id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{blog.titulo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{blog.fecha}</Card.Subtitle>
                <Card.Text>{blog.resumen}</Card.Text>
                <Link to={`/blogs/${blog.id}`} className="btn btn-outline-primary">Leer más</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export function BlogDetalle() {
  const id = window.location.pathname.split("/").pop();
  const blog = blogs.find((b) => b.id.toString() === id) || blogs[0];

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <Card.Title className="fs-2">{blog.titulo}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">{blog.fecha}</Card.Subtitle>
          <Card.Text>
            {id === "1" 
              ? "Para planificar un evento corporativo exitoso, es fundamental definir objetivos claros, conocer a tu audiencia, seleccionar el espacio adecuado, contar con tecnología confiable y tener un plan de contingencia. La coordinación y la comunicación son clave para el éxito."
              : "Las tendencias para bodas 2026 incluyen colores terrosos, decoración minimalista, flores silvestres, iluminación ambiental y experiencias gastronómicas personalizadas. Los detalles sostenibles también están tomando protagonismo."}
          </Card.Text>
          <Link to="/blogs" className="btn btn-primary">Volver al Blog</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

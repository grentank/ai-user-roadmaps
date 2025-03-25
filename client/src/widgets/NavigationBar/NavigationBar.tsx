import type { JSX } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as RouterLink } from 'react-router';

export default function NavigationBar(): JSX.Element {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Travel Planner</Navbar.Brand>
        <Nav
          className="me-auto"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="d-flex align-items-center">
            <Nav.Link as={RouterLink} to="/">
              Главная
            </Nav.Link>
            <Nav.Link as={RouterLink} to="/roadmaps">
              Маршруты
            </Nav.Link>
          </div>
          {/* <div className="d-flex align-items-center"> */}
          <Nav.Link as={RouterLink} to="/places/add">
            Добавить место
          </Nav.Link>
          {/* </div> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

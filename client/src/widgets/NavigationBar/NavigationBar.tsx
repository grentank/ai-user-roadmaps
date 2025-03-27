import type { JSX } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as RouterLink, useNavigate } from 'react-router';
import { logoutThunk } from '../../features/auth/lib/thunks';
import { AuthStatus } from '../../features/auth/model/types';
import { useAppDispatch, useAppSelector } from '../../shared/lib/reduxHooks';

export default function NavigationBar(): JSX.Element {
  const navigate = useNavigate();
  const status = useAppSelector((store) => store.auth.status);
  const dispatch = useAppDispatch();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Travel Planner</Navbar.Brand>
        <Nav className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Nav.Link as={RouterLink} to="/">
              Главная
            </Nav.Link>
            <Nav.Link as={RouterLink} to="/roadmaps">
              Маршруты
            </Nav.Link>
          </div>
          <div className="d-flex align-items-center">
            {status === AuthStatus.GUEST ? (
              <>
                <Button
                  className="ms-2"
                  variant="outline-secondary"
                  onClick={() => navigate('/login')}
                >
                  Вход
                </Button>
                <Button className="ms-2" variant="secondary" onClick={() => navigate('/signup')}>
                  Регистрация
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/places/add')}
                  className="ms-2"
                  variant="outline-secondary"
                >
                  Добавить место
                </Button>
                <Button
                  onClick={() => dispatch(logoutThunk())}
                  className="ms-2"
                  variant="secondary"
                >
                  Выйти
                </Button>
              </>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

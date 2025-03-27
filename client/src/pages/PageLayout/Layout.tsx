import { useEffect, type JSX } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { refreshThunk } from '../../features/auth/lib/thunks';
import { AuthStatus } from '../../features/auth/model/types';
import { useAppDispatch, useAppSelector } from '../../shared/lib/reduxHooks';
import Footer from '../../widgets/Footer/Footer';
import NavigationBar from '../../widgets/NavigationBar/NavigationBar';
import LoadingPage from '../LoadingPage/LoadingPage';

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.auth.status);
  useEffect(() => {
    void dispatch(refreshThunk());
  }, []);

  if (status === AuthStatus.PENDING) return <LoadingPage />;
  return (
    <div className="d-flex flex-column vh-100">
      <NavigationBar />
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col md={2} className="bg-light border-end" as="aside"></Col> {/* Левый сайдбар */}
          <Col md={8} className="p-4">
            <Outlet />
          </Col>
          <Col md={2} className="bg-light border-start" as="aside"></Col> {/* Правый сайдбар */}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

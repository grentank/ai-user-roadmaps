import type { JSX } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';
import Footer from '../../widgets/Footer/Footer';
import NavigationBar from '../../widgets/NavigationBar/NavigationBar';

export default function Layout(): JSX.Element {
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

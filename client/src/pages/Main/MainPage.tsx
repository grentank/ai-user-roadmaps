import type { JSX } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

export default function MainPage(): JSX.Element {
  return (
    <>
      <Row className="text-center">
        <Col>
          <h1>Добро пожаловать в Travel Planner</h1>
          <p className="lead">
            Создавайте маршруты по известным местам планеты и планируйте свои путешествия!
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Изучайте места</Card.Title>
              <Card.Text>
                Ознакомьтесь с достопримечательностями по всему миру, от Эйфелевой башни до
                Мачу-Пикчу.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Создавайте маршруты</Card.Title>
              <Card.Text>Соберите свой идеальный маршрут, добавляя интересные места.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Делитесь с друзьями</Card.Title>
              <Card.Text>
                В будущем у вас появится возможность делиться своими маршрутами с друзьями.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col>
          <Button href="/roadmap" variant="primary" size="lg">
            Перейти к маршрутам
          </Button>
        </Col>
      </Row>
    </>
  );
}

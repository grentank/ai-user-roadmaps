import { useEffect, useState, type JSX } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import type { UserWithPlacesT } from '../../entities/place/model/types';
import userService from '../../entities/user/api/service';
import LoadingSpinner from '../../shared/ui/Loading/LoadingSpinner';

const AllRoadmaps = (): JSX.Element => {
  const [users, setUsers] = useState<UserWithPlacesT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    userService
      .getUsers()
      .then((backendUsers) => setUsers(backendUsers))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Container>
      <Row className="mt-4">
        {isLoading ? (
          <LoadingSpinner text="Загружаю пользователей..." />
        ) : (
          users.map((user) => (
            <Col key={user.id} xs={12} className="mb-4">
              <Card className="shadow-sm hover-card" style={{ transition: 'all 0.3s ease-in-out' }}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center" style={{ flex: 1 }}>
                    <div>
                      <Card.Title className="fs-4 mb-3">{user.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {user.places.length < 2
                          ? `Пользователь ${user.name} ещё не придумал маршрут`
                          : `Маршрут от ${user.places[0].name} до ${
                              user.places[user.places.length - 1].name
                            }`}
                      </Card.Text>
                      {user.places.length >= 2 && (
                        <div className="d-flex gap-3 mt-3">
                          <img
                            src={
                              user.places[0].image.startsWith('http')
                                ? user.places[0].image
                                : `/images/${user.places[0].image}`
                            }
                            alt={user.places[0].name}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                          <img
                            src={
                              user.places[user.places.length - 1].image.startsWith('http')
                                ? user.places[user.places.length - 1].image
                                : `/images/${user.places[user.places.length - 1].image}`
                            }
                            alt={user.places[user.places.length - 1].name}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/users/${String(user.id)}/roadmap`}
                    className="btn btn-primary rounded-pill px-4 py-2"
                    style={{
                      backgroundColor: '#0066cc',
                      border: 'none',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Перейти к маршруту
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AllRoadmaps;

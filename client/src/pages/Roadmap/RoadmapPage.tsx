import { useEffect, useState, type JSX } from 'react';
// import { usePlaces, usePlacesDispatch } from '../../entities/place/lib/context';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import placeService from '../../entities/place/api/service';
import type { PlaceT } from '../../entities/place/model/types';
import PlaceCard from '../../widgets/PlaceCard/PlaceCard';

export default function RoadmapPage(): JSX.Element {
  const [places, setPlaces] = useState<PlaceT[]>([]);
  const { userId } = useParams();
  useEffect(() => {
    void placeService.getPlacesByUserId(Number(userId)).then((userPlaces) => setPlaces(userPlaces));
  }, [userId]);

  const [sort, setSort] = useState<{ key: 'order' | 'name'; order: string }>({
    key: 'order',
    order: 'asc',
  });

  const { key, order } = sort;

  return (
    <Container>
      {/* Блок с кнопками сортировки */}
      <Row className="justify-content-center my-4">
        <Col xs="auto">
          <ButtonGroup>
            <Button
              onClick={() => {
                setSort({ key: 'order', order: order === 'asc' ? 'desc' : 'asc' });
              }}
              variant={key === 'order' ? 'secondary' : 'outline-secondary'}
            >
              По порядку посещения {key === 'order' && (order === 'asc' ? '1-9' : '9-1')}
            </Button>
            <Button
              onClick={() => {
                setSort({ key: 'name', order: order === 'asc' ? 'desc' : 'asc' });
              }}
              variant={key === 'name' ? 'secondary' : 'outline-secondary'}
            >
              По названию {key === 'name' && (order === 'asc' ? 'А-Я' : 'Я-А')}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Список мест */}
      <Row className="justify-content-center">
        {places.map((place) => (
          <Col xs={12} className="d-flex justify-content-center mb-4" key={place.name}>
            <PlaceCard place={place} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

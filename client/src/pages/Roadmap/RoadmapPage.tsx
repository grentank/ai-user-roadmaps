import { useCallback, useEffect, useMemo, type JSX } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { changeSort, clearUserPlaces } from '../../features/roadmapSlice/slice';
import { loadUserRoadmapThunk } from '../../features/roadmapSlice/thunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/reduxHooks';
import PlaceCard from '../../widgets/PlaceCard/PlaceCard';

export default function RoadmapPage(): JSX.Element {
  const places = useAppSelector((store) => store.roadmaps.orderedPlaces);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(loadUserRoadmapThunk(Number(userId)));
    console.log('useeffect', userId);
    return () => {
      dispatch(clearUserPlaces());
    };
  }, [userId]);

  const { key, order } = useAppSelector((store) => store.roadmaps.sort);
  const obj = useMemo(() => ({ userId }), [userId]);
  const deleteHandler = useCallback(() => {}, []);
  
  // const deleteHandler = () => {};
  // const obj = { userId };

  return (
    <Container>
      {/* Блок с кнопками сортировки */}
      <Row className="justify-content-center my-4">
        <Col xs="auto">
          <ButtonGroup>
            <Button
              onClick={() => {
                dispatch(changeSort('order'));
              }}
              variant={key === 'order' ? 'secondary' : 'outline-secondary'}
            >
              По порядку посещения {key === 'order' && (order === 'asc' ? '1-9' : '9-1')}
            </Button>
            <Button
              onClick={() => {
                dispatch(changeSort('name'));
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
            <PlaceCard deleteHandler={deleteHandler} obj={obj} place={place} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

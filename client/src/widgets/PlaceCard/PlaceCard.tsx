import { memo, useState, type JSX } from 'react';
import { Button, CloseButton } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import type { PlaceT } from '../../entities/place/model/types';
import { deletePlaceThunk } from '../../features/roadmapSlice/thunks';
import { useAppDispatch } from '../../shared/lib/reduxHooks';
import ArrowDown from '../../shared/ui/icons/ArrowDown';
import ArrowUp from '../../shared/ui/icons/ArrowUp';
import QuestionTooltipButton from '../QuestionTooltipButton/QuestionTooltipButton';

type PlaceCardProps = {
  place: PlaceT;
};

function PlaceCard({ place }: PlaceCardProps): JSX.Element {
  const [image, setImage] = useState<string>(place.image);
  const dispatch = useAppDispatch();
  console.log(place.id);
  return (
    <Card
      className="bg-dark text-white position-relative"
      style={{ width: '600px', height: '400px', overflow: 'hidden' }}
    >
      <Card.Img
        src={image.startsWith('http') ? image : `/images/${image}`}
        alt="Card image"
        onError={() => setImage('no-image.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-between align-items-center">
        <div style={{ position: 'absolute', top: '0', right: '0', margin: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Кнопка с вопросительным знаком */}
            <QuestionTooltipButton place={place} />
            {/* Кнопка удаления */}

            <CloseButton
              onClick={() => dispatch(deletePlaceThunk(place.id))}
              style={{ backgroundColor: 'white', padding: '7px' }}
            />
          </div>
        </div>

        {/* Блок с порядковым номером и кнопками */}
        <div
          className="d-flex flex-column align-self-start align-items-center bg-white text-dark p-2 rounded"
          style={{ minWidth: '80px' }}
        >
          <div className="fs-4 fw-bold">{place.order}</div>
          <div className="d-flex flex-row">
            <Button variant="light" size="sm" className="p-1">
              <ArrowUp />
            </Button>
            <Button variant="light" size="sm" className="p-1 mt-1">
              <ArrowDown />
            </Button>
          </div>
        </div>

        {/* Название в центре */}
        <Card.Title className="fs-2 fw-bold text-center flex-grow-1 d-flex align-items-center justify-content-center">
          {place.name[0].toUpperCase() + place.name.slice(1).toLowerCase()}
        </Card.Title>

        {/* Гео-информация внизу */}
        <Card.Text className="fs-5">{place.geo}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default PlaceCard;
// export default memo(PlaceCard);

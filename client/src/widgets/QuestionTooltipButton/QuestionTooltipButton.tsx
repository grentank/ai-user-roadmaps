import { useState, type JSX } from 'react';
import { Button } from 'react-bootstrap';
import type { PlaceT } from '../../entities/place/model/types';
import axiosInstance from '../../shared/api';
import LoadingSpinner from '../../shared/ui/Loading/LoadingSpinner';
import './styles.css';
type PlaceCardProps = {
  place: PlaceT;
};

function QuestionTooltipButton({ place }: PlaceCardProps): JSX.Element {
  const [resp, setResp] = useState<string | null>(null); // Состояние для текста подсказки
  const [showTooltip, setShowTooltip] = useState(false); // Состояние для отображения тултипа
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик клика по кнопке
  const handleClick = (): void => {
    if (!resp) {
      // Если данные ещё не загружены, делаем запрос
      setIsLoading(true);
      setShowTooltip(true);
      axiosInstance<{ text: string }>(`/places/${String(place.id)}/info`)
        .then((res) => {
          setResp(res.data.text);
        })
        .catch((err: unknown) => {
          console.log(err);
          setResp('Не удалось загрузить подсказку');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Если данные уже загружены, просто показываем/скрываем тултип
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div>
      {/* Кнопка с вопросительным знаком */}
      <Button variant="light" className="question-button" onClick={handleClick}>
        ?
      </Button>

      {/* Кастомный тултип */}
      {showTooltip && <div className="tooltip-help">{isLoading ? <LoadingSpinner /> : resp}</div>}
    </div>
  );
}

export default QuestionTooltipButton;

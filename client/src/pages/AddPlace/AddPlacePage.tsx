import type { JSX } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import placeService from '../../entities/place/api/service';
import { addPlaceSchema } from '../../entities/place/model/schema';

export default function AddPlacePage(): JSX.Element {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = addPlaceSchema.parse(Object.fromEntries(formData));
    void placeService.createPlace(data).then(() => {
      window.location.href = '/roadmap';
    });
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={submitHandler}
        className="border p-4 rounded shadow-lg"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Название места</Form.Label>
          <Form.Control type="text" name="name" placeholder="Введите название места" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Картинка</Form.Label>
          <Form.Control type="text" name="image" placeholder="Введите ссылку на картинку" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Гео (координаты или текст)</Form.Label>
          <Form.Control type="text" name="geo" placeholder="Введите гео (координаты или текст)" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
}

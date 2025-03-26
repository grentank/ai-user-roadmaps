import { useEffect, type JSX } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPlaceThunk, loadAllUsersThunk } from '../../features/roadmapSlice/thunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/reduxHooks';
import { useNavigate } from 'react-router';

export default function AddPlacePage(): JSX.Element {
  const users = useAppSelector((store) => store.roadmaps.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (users.length === 0) {
      void dispatch(loadAllUsersThunk());
    }
  }, [users.length]);
  const navigate = useNavigate();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    void dispatch(addPlaceThunk(formData)).then(() => navigate('/roadmaps'));
    // const data = addPlaceSchema.parse(Object.fromEntries(formData));
    // void placeService.createPlace(data).then(() => {
    //   window.location.href = '/roadmap';
    // });
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

        <Form.Group className="mb-3">
          <Form.Label>Выбери пользователя</Form.Label>
          <Form.Select name="userId">
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
}

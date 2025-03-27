import type { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { loginThunk } from '../../features/auth/lib/thunks';
import { useAppDispatch, useAppSelector } from '../../shared/lib/reduxHooks';
import LoadingSpinner from '../../shared/ui/Loading/LoadingSpinner';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const buttonLoading = useAppSelector((store) => store.auth.buttonLoading);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    void dispatch(loginThunk(formData));
  };
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={submitHandler}
        className="border p-4 rounded shadow-lg"
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Введите email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" name="password" placeholder="Введите пароль" />
        </Form.Group>

        <Form.Group className="mb-3 d-flex justify-content-center">
          <Button disabled={buttonLoading} className="w-50" variant="primary" type="submit">
            {buttonLoading ? <LoadingSpinner /> : 'Войти'}
          </Button>
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          <Link to="/signup">Нет аккаунта? Зарегистрируйтесь</Link>
        </Form.Group>
      </Form>
    </div>
  );
}

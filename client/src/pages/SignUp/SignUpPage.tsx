import type { JSX } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router';

export default function SignUpPage(): JSX.Element {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
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
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" name="name" placeholder="Введите имя" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" name="password" placeholder="Введите пароль" />
        </Form.Group>

        <Form.Group className="mb-3 d-flex justify-content-center">
          <Button className="w-50" variant="primary" type="submit">
            Регистрация
          </Button>
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          <Link to="/login">Уже есть аккаунт? Войдите</Link>
        </Form.Group>
      </Form>
    </div>
  );
}

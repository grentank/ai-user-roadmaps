import type { JSX } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router';

export default function NotFoundPage(): JSX.Element {
  return (
    <Container className="text-center mt-5">
      <img
        src="/images/not-found.jpg"
        alt="Page not found"
        className="img-fluid mb-4"
        style={{ maxWidth: '400px' }}
      />
      <h2>Ой! Страница не найдена</h2>
      <p>
        Похоже, что такой страницы не существует. Попробуйте перейти на одну из доступных страниц.
      </p>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link to="/">
          <Button variant="primary">На главную</Button>
        </Link>
        <Link to="/roadmaps">
          <Button variant="secondary">К списку мест</Button>
        </Link>
      </div>
    </Container>
  );
}

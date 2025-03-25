import type { JSX } from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingPage(): JSX.Element {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 text-center">
      <div>
        <Spinner animation="border" variant="primary" />
        <h3 className="mt-3">Загружаю ваше путешествие...</h3>
      </div>
    </div>
  );
}

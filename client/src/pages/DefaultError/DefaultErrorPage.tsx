import Button from 'react-bootstrap/Button';
import type { JSX } from 'react';

export default function DefaultErrorPage(): JSX.Element {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 text-center">
      <div>
        <h1>Всё сломалось</h1>
        <p>Попробуйте перезагрузить страницу или выйти на главную.</p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Перезагрузить
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}

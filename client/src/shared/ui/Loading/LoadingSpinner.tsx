import type { JSX } from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({ text }: { text?: string }): JSX.Element {
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <Spinner animation="border" variant="primary" />
      {text && <h3 className="mt-3">{text}</h3>}
    </div>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Suspense, type JSX } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import DefaultErrorPage from '../pages/DefaultError/DefaultErrorPage';
import LoadingPage from '../pages/LoadingPage/LoadingPage';
import RouterProvider from './router/RouterProvider';

function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<DefaultErrorPage />}>
      <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <RouterProvider />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

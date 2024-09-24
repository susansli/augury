import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './app/error-page';
import Root from './app/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Onboarding from '../pages/Onboarding';
import Portfolio from '../pages/Portfolio';
import Settings from '../pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
  {
    path: '/*',
    element: <Navigate to="/NotFound" replace={true} />,
  },
]);

export default router;

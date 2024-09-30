import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Onboarding from '../pages/Onboarding';
import Portfolio from '../pages/Portfolio';
import Settings from '../pages/Settings';
import BaseWrapper from '../components/baseLayout/BaseWrapper';
import PageWrapper from '../components/navigation/PageWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <BaseWrapper>
        <PageWrapper>
          <Home />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/login',
    element: (
      <BaseWrapper>
        <Login />
      </BaseWrapper>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <BaseWrapper>
        <Onboarding />
      </BaseWrapper>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <BaseWrapper>
        <Portfolio />
      </BaseWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      <BaseWrapper>
        <Settings />
      </BaseWrapper>
    ),
  },
  {
    path: '/404',
    element: (
      <BaseWrapper>
        <NotFound />
      </BaseWrapper>
    ),
  },
  {
    path: '/*',
    element: <Navigate to="/NotFound" replace={true} />,
  },
]);

export default router;

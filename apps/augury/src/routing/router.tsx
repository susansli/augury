import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Onboarding from '../pages/Onboarding';
import Portfolio from '../pages/Portfolio';
import Settings from '../pages/Settings';
import BaseWrapper from '../components/baseLayout/BaseWrapper';
import PageWrapper from '../components/navigation/Navbar';

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
        <PageWrapper>
          <Login />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <BaseWrapper>
        <PageWrapper>
          <Onboarding />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <BaseWrapper>
        <PageWrapper>
          <Portfolio />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      <BaseWrapper>
        <PageWrapper>
          <Settings />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/404',
    element: (
      <BaseWrapper>
        <PageWrapper>
          <NotFound />
        </PageWrapper>
      </BaseWrapper>
    ),
  },
  {
    path: '/*',
    element: <Navigate to="/NotFound" replace={true} />,
  },
]);

export default router;

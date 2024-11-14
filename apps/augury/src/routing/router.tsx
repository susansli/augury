import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Onboarding from '../pages/Onboarding';
import Portfolio from '../pages/Portfolio';
import Settings from '../pages/Settings';
import PageWrapper from '../components/navigation/PageWrapper';
import Portfolios from '../pages/Portfolios';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <Home />
      </PageWrapper>
    ),
  },
  {
    path: '/login',
    element: (
      <PageWrapper>
        <Login />
      </PageWrapper>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <PageWrapper>
        <Onboarding />
      </PageWrapper>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <PageWrapper>
        <Portfolio />
      </PageWrapper>
    ),
  },
  {
    path: '/portfolios/:groupId?',
    element: (
      <PageWrapper>
        <Portfolios />
      </PageWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      <PageWrapper>
        <Settings />
      </PageWrapper>
    ),
  },
  {
    path: '/404',
    element: (
      <PageWrapper>
        <NotFound />
      </PageWrapper>
    ),
  },
  {
    path: '/*',
    element: <Navigate to="/NotFound" replace={true} />,
  },
]);

export default router;

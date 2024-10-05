import React, { Suspense } from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';

// Importaciones proteger rutas
import {
  ProtectedLoginRoute,
  ProtectedNoLoginRoute,
} from './ProtectedRoute';
import ErrorBoundary from './ErrorBoundary';
import LoadingRoute from '../components/Loading';

// Importaciones de paginas
const Layout = React.lazy(() => import('../components/Layout/Layout')); 
const Auth = React.lazy(() => import('../pages/Auth/Auth'));
const Index = React.lazy(() => import('../pages/Index/Index'));
const Home = React.lazy(() => import('../pages/Home/Home'));
const Role = React.lazy(() => import('../pages/Role/Role'));
const Status = React.lazy(() => import('../pages/Status/Status'));

// Componente de carga
const Loading: React.FC = () => <LoadingRoute />;

// Definición del router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedNoLoginRoute>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <Auth />
          </ErrorBoundary>
        </Suspense>
      </ProtectedNoLoginRoute>
    ),
  },
  {
    path: '/index',
    element: (
      <ProtectedNoLoginRoute>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <Index />
          </ErrorBoundary>
        </Suspense>
      </ProtectedNoLoginRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/role',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Role />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/status',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Status />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  
]);

export { router };

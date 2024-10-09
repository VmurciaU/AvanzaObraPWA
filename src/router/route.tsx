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
const Charge = React.lazy(() => import('../pages/Charge/Charge'));
const User = React.lazy(() => import('../pages/User/User'));
const Client = React.lazy(() => import('../pages/Client/Client'));
const Project = React.lazy(() => import('../pages/Project/Project'));
const Task = React.lazy(() => import('../pages/Task/Task'));

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
  {
    path: '/charge',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Charge />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  
  {
    path: '/user',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <User />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },

  {
    path: '/client',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Client />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/project',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Project />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  {
    path: '/task',
    element: (
      <ProtectedLoginRoute>
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary>
              <Task />
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ProtectedLoginRoute>
    ),
  },
  
]);

export { router };

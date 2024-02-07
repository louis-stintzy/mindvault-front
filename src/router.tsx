import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';

import { useAppSelector } from './hook/redux';
import Boxes from './components/Boxes/Boxes';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Récupération de isLoggedIn dans le store (MAJ du store dans le composant RootComponent)
  const { isLoggedIn } = useAppSelector((state) => state.signIn);
  // Si l'utilisateur est connecté, affichage du composant enfant
  // Sinon, redirection vers la page de connexion
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/boxes',
        element: (
          <ProtectedRoute>
            <Boxes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/stats',
        element: (
          <ProtectedRoute>
            <div>Stats</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '/parameters',
        element: (
          <ProtectedRoute>
            <div>Parameters</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '/contact',
        element: (
          <ProtectedRoute>
            <div>Contact</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);

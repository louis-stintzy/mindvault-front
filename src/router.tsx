import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { useAppSelector } from './hook/redux';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAppSelector((state) => state.signIn);
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
    ],
  },
];

export const router = createBrowserRouter(routerConfig);

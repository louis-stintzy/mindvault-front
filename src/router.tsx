import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

export const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
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
    ],
  },
];

export const router = createBrowserRouter(routerConfig);

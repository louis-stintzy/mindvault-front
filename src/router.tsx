import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';

export const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);

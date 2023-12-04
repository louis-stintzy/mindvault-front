import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';

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
        element: <div>Signup</div>,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);

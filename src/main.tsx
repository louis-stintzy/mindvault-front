import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store';
import RootComponent from './components/RootComponent/RootComponent';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RootComponent />
  </Provider>
);

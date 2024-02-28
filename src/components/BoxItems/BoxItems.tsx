import { useParams } from 'react-router-dom';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';

function BoxItems() {
  const { id } = useParams();
  return (
    <div>
      BoxItems de la box n° {id}
      <BottomNavigationMUI />
    </div>
  );
}

export default BoxItems;

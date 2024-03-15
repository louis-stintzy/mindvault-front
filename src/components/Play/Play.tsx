import { useEffect } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { resetCardMultipleState } from '../../store/reducers/cardMultiple';

function Play() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardMultiple.cards);

  useEffect(() => {
    return () => {
      dispatch(resetCardMultipleState());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Play</h1>
      {cards.map((card) => (
        <div key={card.id}>
          <p>{card.question}</p>
        </div>
      ))}
      <BottomNavigationMUI />
    </div>
  );
}

export default Play;

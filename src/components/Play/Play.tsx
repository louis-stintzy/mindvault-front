import { useEffect, useState } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { resetCardsToReviewState } from '../../store/reducers/cardMultiple';
import Question from './Question';

function Play() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardMultiple.cardsToReview);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(resetCardsToReviewState());
    };
  }, [dispatch]);

  // TODO : gérer le cas ou cards est vide (soit pas de cards à réviser, soit cards pas encore chargées)
  if (cards.length !== 0) {
    return <Question card={cards[cardIndex]} />;
  }
}

export default Play;

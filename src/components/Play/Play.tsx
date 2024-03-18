import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { resetCardsToReviewState } from '../../store/reducers/cardMultiple';
import Question from './Question';

function Play() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cardsToReview, isLoading } = useAppSelector(
    (state) => state.cardMultiple
  );
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(resetCardsToReviewState());
    };
  }, [dispatch]);

  // ----------------------- IS LOADING -----------------------
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ----------------------- DISPLAY THE QUESTION -----------------------
  if (cardsToReview.length !== 0) {
    return <Question card={cardsToReview[cardIndex]} />;
  }

  // ----------------------- NO CARDS TO REVIEW -----------------------
  // TODO : gérer le cas ou cards est vide (soit pas de cards à réviser, soit cards pas encore chargées)
  return (
    <div>
      <p>No cards to review</p>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate(`/boxes`)}
      >
        Cancel
      </Button>
      <BottomNavigationMUI />
    </div>
  );
}

export default Play;

import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  getRandomCards,
  resetCardsToReviewState,
} from '../../store/reducers/cardMultiple';
import CardTwoSides from './CardTwoSides';

function Play() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { cardsToReview, isLoading } = useAppSelector(
    (state) => state.cardMultiple
  );

  const [cardIndex, setCardIndex] = useState(0);
  const [askToPlayMore, setAskToPlayMore] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCardIndex = () => {
    // Si on n'est pas à la dernière carte, on passe à la suivante
    if (cardIndex < cardsToReview.length - 1) {
      setCardIndex(cardIndex + 1);
      // Si on est à la 10ème carte (index 9), on demande si on veut rejouer
    } else if (cardIndex === 9) {
      setAskToPlayMore(true);
      dispatch(resetCardsToReviewState());
      // Si il n'y avait pas 10 cartes, c'est qu'il n'y en a plus, on a fini
    } else {
      setAskToPlayMore(false);
      dispatch(resetCardsToReviewState());
      setCompleted(true);
    }
  };

  const handlePlayMore = () => {
    // on recharge des cartes à réviser
    if (id) {
      const boxId = parseInt(id, 10);
      if (Number.isNaN(boxId)) {
        navigate(`/boxes`);
      } else {
        dispatch(getRandomCards(boxId));
      }
    }
    // on enlève la demande de rejouer et remet l'index à 0
    setAskToPlayMore(false);
    setCardIndex(0);
  };

  useEffect(() => {
    // On charge les cartes à réviser grâce à l'id dans l'URL
    if (id) {
      const boxId = parseInt(id, 10);
      if (Number.isNaN(boxId)) {
        navigate(`/boxes`);
      } else {
        dispatch(getRandomCards(boxId));
      }
    }
    // On remet le state à zéro si on quitte la page
    return () => {
      dispatch(resetCardsToReviewState());
    };
  }, [id, dispatch, navigate]);

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

  // ----------------------- ASK TO PLAY MORE ? -----------------------
  if (askToPlayMore) {
    return (
      <div>
        <p>Do you want to play again ?</p>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(`/boxes`)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handlePlayMore}
          >
            Yes
          </Button>
        </Box>
        <BottomNavigationMUI />
      </div>
    );
  }

  // ----------------------- DISPLAY THE QUESTION -----------------------
  if (cardsToReview.length !== 0) {
    return (
      <CardTwoSides
        card={cardsToReview[cardIndex]}
        goToNextCard={handleCardIndex}
      />
    );
  }
  // ----------------------- NO CARDS TO REVIEW -----------------------
  if (cardsToReview.length === 0 || completed) {
    return (
      <div>
        <p>No cards to review,</p>
        <p>it&apos;s time for a break</p>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(`/boxes`)}
          >
            Back To Boxes
          </Button>
        </Box>
        <BottomNavigationMUI />
      </div>
    );
  }

  // ----------------------- NO CARDS TO REVIEW -----------------------
  // TODO : gérer le cas où cardsToReview est vide (soit pas de cards à réviser, soit cards pas encore chargées)
  return (
    <div>
      <p>No cards to review.</p>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate(`/boxes`)}
        >
          Cancel
        </Button>
      </Box>
      <BottomNavigationMUI />
    </div>
  );
}

export default Play;

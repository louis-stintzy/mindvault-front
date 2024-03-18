import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import CardItem from './CardItem';
import { getBoxCards } from '../../store/reducers/cardMultiple';
import { resetCardOneState } from '../../store/reducers/cardOne';

function CardItemsList() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigateFromCardCreateEdit =
    location.state?.navigateFromCardCreateEdit || false;
  const boxNameFromBoxItemsList = location.state?.boxName;
  const { id } = useParams();
  const boxId = Number(id);
  const { cardsAll, isLoading } = useAppSelector((state) => state.cardMultiple);
  const boxNameFromBoxCreateEdit = useAppSelector(
    (state) => state.boxOne.boxCreated?.name
  );

  // On peut accéder à CardItemList soit depuis BoxItemList soit depuis CardCreateEdit
  // Si on vient de CardCreateEdit, on a déjà les cards dans le store, pas besoin de les recharger depuis la BDD
  // TODO : charger les cards par lots (avec un bouton "Voir plus" et mis en place d'une pagination côté serveur)
  useEffect(() => {
    if (!navigateFromCardCreateEdit) {
      dispatch(getBoxCards(boxId));
    }
    dispatch(resetCardOneState());
  }, [navigateFromCardCreateEdit, boxId, dispatch]);

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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          padding: { xs: '20px', md: '40px' },
          paddingBottom: { xs: '20px', md: '40px' },
        }}
      >
        {/* ---------------------- Title & Button ---------------------- */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: { xs: '20px', md: '40px' } }}
        >
          Cards for the box :{' '}
          {boxNameFromBoxItemsList || boxNameFromBoxCreateEdit}
        </Typography>
        <Link
          to={`/box/${id}/items/create`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              marginBottom: { xs: '20px', md: '40px' },
            }}
          >
            Add a new card
          </Button>
        </Link>

        {/* --------------------------- Items --------------------------- */}
        <Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Number of cards : {cardsAll.length}
          </Typography>
          {cardsAll.map((item) => (
            // on aurait pu utiliser <BoxCard key={box.id} box={box} /> si... (voir BoxCard.tsx)
            // on aurait pu utiliser <BoxCard key={box.id} {...box} /> si... (voir BoxCard.tsx)
            // composant CardCard
            <CardItem key={item.id} card={item} />
          ))}
        </Box>
        {/* --------------------- Bottom Navigation --------------------- */}
        <BottomNavigationMUI />
      </Box>
    </Container>
  );
}

export default CardItemsList;

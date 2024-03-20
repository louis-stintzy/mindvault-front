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
import { getBoxById } from '../../store/reducers/boxOne';

function CardItemsList() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

  const boxId = Number(id);
  const navigateFromCardCreateEdit =
    location.state?.navigateFromCardCreateEdit || false;
  const boxNameFromBoxItemsList = location.state?.boxName;

  const { cardsAll, isLoading } = useAppSelector((state) => state.cardMultiple);
  const boxName = useAppSelector((state) => state.boxOne.currentBox?.name);
  const boxNameIsLoading = useAppSelector((state) => state.boxOne.isLoading);

  // On peut accéder à CardItemList soit depuis BoxItemList soit depuis CardCreateEdit
  // Si on vient de CardCreateEdit, on a déjà les cards dans le store, pas besoin de les recharger depuis la BDD
  // TODO : charger les cards par lots (avec un bouton "Voir plus" et mis en place d'une pagination côté serveur)
  // On peut également accéder à CardItemsList en saisissant l'url directement dans le navigateur
  // Pour afficher le nom de la box, soit BoxItem transmet quand on clique sur le nom de la box
  // Sinon dans les autres cas (création/édition de card et saisi de l'url), on charge le nom de la box depuis la BDD

  useEffect(() => {
    if (!boxNameFromBoxItemsList) {
      dispatch(getBoxById(boxId));
    }
    if (!navigateFromCardCreateEdit) {
      dispatch(getBoxCards(boxId));
    }
    dispatch(resetCardOneState());
  }, [navigateFromCardCreateEdit, boxId, dispatch, boxNameFromBoxItemsList]);

  // Si chargement des cards ou du nom de la box, on affiche un loader
  // ou si on a pas encore le nom de la box à afficher
  // pour éviter qu'apparaisse brievement le composant vide de cards
  if (isLoading || boxNameIsLoading || (!boxNameFromBoxItemsList && !boxName)) {
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
          {boxNameFromBoxItemsList || boxName || 'Loading...'}
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

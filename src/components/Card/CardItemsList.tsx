import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import CardItem from './CardItem';
import { getBoxCards } from '../../store/reducers/cardMultiple';
import { resetCardOneState } from '../../store/reducers/cardOne';

function CardItemsList() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const boxNameFromBoxItemsList = location.state?.boxName;
  const { id } = useParams();
  const boxId = Number(id);
  const boxItemsList = useAppSelector((state) => state.cardMultiple.cards);
  const boxNameFromBoxCreateEdit = useAppSelector(
    (state) => state.boxOne.boxCreated?.name
  );

  useEffect(() => {
    dispatch(getBoxCards(boxId));
    dispatch(resetCardOneState());
  }, [boxId, dispatch]);

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
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add a new card
          </Button>
        </Link>

        {/* --------------------------- Items --------------------------- */}
        <Box>
          {boxItemsList.map((item) => (
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

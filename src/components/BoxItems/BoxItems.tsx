import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import ItemCard from '../ItemCard/ItemCard';
import { getBoxCards } from '../../store/reducers/cardMultiple';

function BoxItems() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const boxId = Number(id);
  const boxItemsList = useAppSelector((state) => state.cardMultiple.cards);
  // recuperer le nom de la current box
  // const { name } = useAppSelector((state) => state.boxOne.box);

  // const boxItemsList = [
  //   {
  //     id: 1,
  //     boxId: 1,
  //     creatorId: 1,
  //     question: 'What is the capital of France?',
  //     answer: 'Paris',
  //     attachment: '',
  //     position: 1,
  //     compartment: 1,
  //     dateToAsk: '2021 - 10 - 10',
  //     createdAt: '2021 - 10 - 10',
  //     updatedAt: '2021 - 10 - 10',
  //   },
  //   {
  //     id: 2,
  //     boxId: 1,
  //     creatorId: 1,
  //     question: 'What is the capital of Spain?',
  //     answer: 'Madrid',
  //     attachment: '',
  //     position: 2,
  //     compartment: 1,
  //     dateToAsk: '2021 - 10 - 10',
  //     createdAt: '2021 - 10 - 10',
  //     updatedAt: '2021 - 10 - 10',
  //   },
  //   {
  //     id: 3,
  //     boxId: 1,
  //     creatorId: 1,
  //     question: 'What is the capital of Germany?',
  //     answer: 'Berlin',
  //     attachment: '',
  //     position: 3,
  //     compartment: 1,
  //     dateToAsk: '2021 - 10 - 10',
  //     createdAt: '2021 - 10 - 10',
  //     updatedAt: '2021 - 10 - 10',
  //   },
  // ];

  useEffect(() => {
    // dispatch(getCurrentBox(id));
    dispatch(getBoxCards(boxId));
    // dispatch(resetCardOneState());
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
          Box Cards
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
            <ItemCard key={item.id} card={item} />
          ))}
        </Box>
        {/* --------------------- Bottom Navigation --------------------- */}
        <BottomNavigationMUI />
      </Box>
    </Container>
  );
}

export default BoxItems;

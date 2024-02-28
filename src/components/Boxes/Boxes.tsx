import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import BoxCard from '../BoxCard/BoxCard';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { getUserBoxes } from '../../store/reducers/boxMultiple';
import { resetBoxOneState } from '../../store/reducers/boxOne';

function Boxes() {
  const dispatch = useAppDispatch();

  const userBoxesList = useAppSelector((state) => state.boxMultiple.boxes);

  // const userBoxesList = [
  //   {
  //     id: 9,
  //     owner_id: 27,
  //     original_box_id: 9,
  //     original_box_creator_id: 27,
  //     original_box_created_at: '2024-02-09T09:41:34.849Z',
  //     copy_box_id: null,
  //     copy_box_owner_id: null,
  //     copy_box_created_at: null,
  //     name: 'Box Test 4',
  //     description: 'Description',
  //     box_picture:
  //       'data:image/jpeg;base64,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',
  //     color: '',
  //     label: 'Anglais',
  //     level: 'Intermédiaire',
  //     position: 1,
  //     learn_it: true,
  //     type: 2,
  //     parent_box_id: null,
  //     on_store: 0,
  //     created_at: '2024-02-09T09:41:34.849Z',
  //     updated_at: null,
  //   },
  //   {
  //     id: 6,
  //     owner_id: 27,
  //     original_box_id: 6,
  //     original_box_creator_id: 27,
  //     original_box_created_at: '2024-02-08T22:59:59.822Z',
  //     copy_box_id: null,
  //     copy_box_owner_id: null,
  //     copy_box_created_at: null,
  //     name: 'Box Test 1',
  //     description: 'Description',
  //     box_picture:
  //       'data:image/jpeg;base64,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',
  //     color: '',
  //     label: 'Japonais',
  //     level: 'Facile',
  //     position: 2,
  //     learn_it: true,
  //     type: 2,
  //     parent_box_id: null,
  //     on_store: 0,
  //     created_at: '2024-02-08T22:59:59.822Z',
  //     updated_at: null,
  //   },
  //   {
  //     id: 7,
  //     owner_id: 27,
  //     original_box_id: 7,
  //     original_box_creator_id: 27,
  //     original_box_created_at: '2024-02-08T23:00:36.247Z',
  //     copy_box_id: null,
  //     copy_box_owner_id: null,
  //     copy_box_created_at: null,
  //     name: 'Box Test 2',
  //     description: 'Description',
  //     box_picture:
  //       'data:image/jpeg;base64,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',
  //     color: '',
  //     label: 'Allemand',
  //     level: 'Facile',
  //     position: 2,
  //     learn_it: true,
  //     type: 2,
  //     parent_box_id: null,
  //     on_store: 0,
  //     created_at: '2024-02-08T23:00:36.247Z',
  //     updated_at: null,
  //   },
  //   {
  //     id: 8,
  //     owner_id: 27,
  //     original_box_id: 8,
  //     original_box_creator_id: 27,
  //     original_box_created_at: '2024-02-08T23:03:13.244Z',
  //     copy_box_id: null,
  //     copy_box_owner_id: null,
  //     copy_box_created_at: null,
  //     name: 'Box Test 3',
  //     description: 'Description',
  //     box_picture:
  //       'data:image/jpeg;base64,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',
  //     color: '',
  //     label: 'Espagnol',
  //     level: 'Facile',
  //     position: 2,
  //     learn_it: true,
  //     type: 2,
  //     parent_box_id: null,
  //     on_store: 0,
  //     created_at: '2024-02-08T23:03:13.244Z',
  //     updated_at: null,
  //   },
  // ];

  useEffect(() => {
    dispatch(getUserBoxes());
    dispatch(resetBoxOneState());
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography variant="h4" component="h1">
          Boxes
        </Typography>
        <Link
          to="/box/create"
          style={{
            textDecoration: 'none',
            position: 'relative',
            right: -150,
            top: -40,
          }}
        >
          <Button variant="contained">
            <AddIcon />
          </Button>
        </Link>
      </Box>
      {userBoxesList.map((box) => (
        // on aurait pu utiliser <BoxCard key={box.id} box={box} /> si... (voir BoxCard.tsx)
        // on aurait pu utiliser <BoxCard key={box.id} {...box} /> si... (voir BoxCard.tsx)
        <BoxCard key={box.id} box={box} />
      ))}
      <BottomNavigationMUI />
    </Container>
  );
}

export default Boxes;

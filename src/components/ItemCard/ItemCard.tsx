import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';

import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RedoIcon from '@mui/icons-material/Redo';
import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { CardData } from '../../@types/card';
import cardDefaultPicture from '../../assets/cardDefaultPicture.webp';

import CompartmentIcon from '../../icons/CompartmentIcon';

const apiUrl = import.meta.env.VITE_API_URL;

interface ItemCardProps {
  card: CardData;
}

function ItemCard({ card }: ItemCardProps) {
  const { id } = useParams();
  const [showAnswer, setShowAnswer] = useState(false);

  const handleEdit = () => {
    console.log('edit');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* --------------- Illustration ---------------- */}
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={
            card.attachment
              ? `${apiUrl}/media/${card.attachment}`
              : cardDefaultPicture
          }
          alt={`Attachment for the question : ${card.question}`}
        />
        {/* -------------- Reste de la card -------------- */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Name, Label, Level, Description */}
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: 'left' }}
            >
              <Link
                to={`/box/${id}/items`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* // TODO si la question fait plus que 50 caractères, on coupe et on met ... */}
                {card.question}
              </Link>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'left',
                // pl: 1,
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <CompartmentIcon />
                {card.compartment}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <RedoIcon />
                {card.dateToAsk}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: 'left' }}
            >
              <IconButton
                onClick={() => setShowAnswer(!showAnswer)}
                aria-label="toggle answer visibility"
              >
                {showAnswer ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              {showAnswer ? card.answer : '••••••••••••••••'}
            </Typography>
          </CardContent>
          {/* Edit, Delete */}
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}

export default ItemCard;

import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeCardField, createCard } from '../../store/reducers/cardOne';

function CardCreateEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  // TODO : à corriger, voir BoxStats.tsx
  const boxId = Number(id);

  const { isLoading, error, isRegistered, success, card } = useAppSelector(
    (state) => state.cardOne
  );

  const isFormValid = card.question.length > 0 && card.answer.length > 0;

  useEffect(() => {
    if (isRegistered) {
      navigate(`/box/${id}/items`, {
        replace: true,
        state: { navigateFromCardCreateEdit: true },
      });
    }
  }, [isRegistered, id, navigate]);

  const handleChangeField =
    (field: 'question' | 'answer') => (value: string) => {
      dispatch(changeCardField({ field, value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createCard({ boxId, card }));
  };

  if (isLoading || isRegistered) {
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
    <Container component="main" maxWidth="xs" className="create-card-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Card
        </Typography>

        {/* Affichage des erreurs */}
        {error &&
          error.map((err) => (
            <Alert key={err.errCode} severity="error">
              {err.errMessage}
            </Alert>
          ))}

        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="question"
            name="question"
            label="Question"
            variant="outlined"
            fullWidth
            margin="normal"
            value={card.question}
            onChange={(e) => handleChangeField('question')(e.target.value)}
          />
          <TextField
            id="answer"
            name="answer"
            label="Answer to the question"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={card.answer}
            onChange={(e) => handleChangeField('answer')(e.target.value)}
          />
          <Box sx={{ my: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload Illustration
              <input type="file" hidden />
              {/* <VisuallyHiddenInput type="file" /> */}
            </Button>
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !isFormValid}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Loading...' : 'Create'}
          </Button>
        </form>
      </Box>
      <BottomNavigationMUI />
    </Container>
  );
}

export default CardCreateEdit;

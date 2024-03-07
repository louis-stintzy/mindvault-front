import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeBoxField, create } from '../../store/reducers/boxOne';

function BoxCreateEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isRegistered, success, box, boxCreated } =
    useAppSelector((state) => state.boxOne);

  // dans un premier temps isFormValid, c'est juste avoir un nom de box,
  // utiliser useState par la suite pour checker comme dans SignUp
  const isFormValid = box.name.length > 0;

  useEffect(() => {
    if (isRegistered) {
      if (boxCreated) {
        navigate(`/box/${boxCreated.id}/items`, { replace: true });
      } else {
        navigate('/boxes', { replace: true });
      }
    }
  }, [boxCreated, isRegistered, navigate]);

  const handleChangeField =
    (field: 'name' | 'description' | 'label') => (value: string) => {
      // TODO: checker que les values respectent les contraintes comme name<255 caractères
      dispatch(changeBoxField({ field, value }));
    };

  const handleChangeCheckbox = (field: 'learnIt') => (value: boolean) => {
    dispatch(changeBoxField({ field, value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(create(box));
  };

  return (
    <Container component="main" maxWidth="xs" className="create-box-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Box
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
            id="name"
            label="Name of the Box"
            variant="outlined"
            fullWidth
            margin="normal"
            value={box.name}
            onChange={(e) => handleChangeField('name')(e.target.value)}
          />
          <TextField
            id="label"
            label="Label of the Box"
            variant="outlined"
            fullWidth
            margin="normal"
            value={box.label}
            onChange={(e) => handleChangeField('label')(e.target.value)}
          />
          <TextField
            id="description"
            label="Description of the Box"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={box.description}
            onChange={(e) => handleChangeField('description')(e.target.value)}
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
          <Box sx={{ my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={box.learnIt}
                  onChange={() => handleChangeCheckbox('learnIt')(!box.learnIt)}
                  name="learnIt"
                />
              }
              label="Learn It"
            />
            <FormControlLabel
              control={<Checkbox disabled />}
              label="Box of Box"
            />
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

export default BoxCreateEdit;

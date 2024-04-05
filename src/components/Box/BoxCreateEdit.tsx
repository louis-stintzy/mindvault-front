import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeBoxField,
  createBox,
  deleteBox,
} from '../../store/reducers/boxOne';

interface BoxCreateEditProps {
  mode: 'create' | 'edit';
}

function BoxCreateEdit({ mode }: BoxCreateEditProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    isLoading,
    error,
    isRegistered,
    success,
    box,
    boxCreated,
    currentBox,
  } = useAppSelector((state) => state.boxOne);

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

  // Les champs du formulaire sont pré-remplis si on est en mode edit
  // grâce à initialBoxFields dispatcher dans BoxItem

  // useEffect(() => {
  //   if (mode === 'edit' && currentBox) {
  //     dispatch(changeBoxField({ field: 'name', value: currentBox.name }));
  //     dispatch(
  //       changeBoxField({ field: 'description', value: currentBox.description })
  //     );
  //     dispatch(changeBoxField({ field: 'label', value: currentBox.label }));
  //     dispatch(
  //       changeBoxField({ field: 'learnIt', value: currentBox.learn_it })
  //     );
  //   }
  // }, [currentBox, dispatch, mode]);

  const handleChangeField =
    (
      field:
        | 'name'
        | 'description'
        | 'label'
        | 'defaultQuestionLanguage'
        | 'defaultAnswerLanguage'
    ) =>
    (value: string) => {
      // TODO: checker que les values respectent les contraintes comme name<255 caractères
      dispatch(changeBoxField({ field, value }));
    };

  const handleChangeCheckbox = (field: 'learnIt') => (value: boolean) => {
    dispatch(changeBoxField({ field, value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'create') {
      dispatch(createBox(box));
    }
    if (mode === 'edit') {
      console.log('Edit the box');
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };
  const handleConfirmDelete = () => {
    if (currentBox) {
      dispatch(deleteBox(currentBox.id));
    } else {
      alert('currentBox is null');
    }
    navigate(`/boxes`);
  };

  let buttonText;
  if (isLoading) {
    buttonText = 'Loading...';
  } else {
    buttonText = mode === 'create' ? 'Create' : 'Edit';
  }

  // En mode Edit : les champs sont pré-remplis grâce au dispatch de initialBoxFields dans BoxItem
  // +setCurrentBox dans le handleEdit de BoxItem

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        className="create-box-container"
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* ------------------------- Title ----------------------------- */}
          <Typography variant="h4" component="h1" gutterBottom>
            {mode === 'create'
              ? 'Create a Box'
              : `Edit the Box : ${currentBox?.name}`}
          </Typography>

          {/* --------------------- Error Display --------------------------*/}
          {error &&
            error.map((err) => (
              <Alert key={err.errCode} severity="error">
                {err.errMessage}
              </Alert>
            ))}

          {/* ------------------------ Form ------------------------------- */}
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

            {/* ---------------- QUESTION / SELECTION DE LA LANGUE PAR DEFAUT ----------------- */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: '0.875rem', color: grey[600], flexGrow: 1 }}
              >
                Please select the default language for questions
              </Typography>
              <FormControl sx={{ width: 'auto' }}>
                <Select
                  displayEmpty
                  value={box.defaultQuestionLanguage}
                  onChange={(e) =>
                    handleChangeField('defaultQuestionLanguage')(e.target.value)
                  }
                  inputProps={{ 'aria-label': 'Select language' }}
                  sx={{
                    '.MuiSelect-select': {
                      padding: '6px 32px 6px 12px', // Ajuste le padding pour réduire la hauteur
                      fontSize: '0.875rem', // Réduit la taille de la police
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure au survol
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure lorsque le Select est focus
                    },
                  }}
                >
                  <MenuItem value="fr-FR">Français</MenuItem>
                  <MenuItem value="en-US">English</MenuItem>
                  <MenuItem value="de-DE">Deutsch</MenuItem>
                  <MenuItem value="es-ES">Español</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* ---------------- ANSWER / SELECTION DE LA LANGUE PAR DEFAUT ----------------- */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.875rem',
                  color: grey[600],
                  flexGrow: 1,
                }}
              >
                Please select the default language for answers
              </Typography>
              <FormControl sx={{ width: 'auto' }}>
                <Select
                  displayEmpty
                  value={box.defaultAnswerLanguage}
                  onChange={(e) =>
                    handleChangeField('defaultAnswerLanguage')(e.target.value)
                  }
                  inputProps={{ 'aria-label': 'Select language' }}
                  sx={{
                    '.MuiSelect-select': {
                      padding: '6px 32px 6px 12px', // Ajuste le padding pour réduire la hauteur
                      fontSize: '0.875rem', // Réduit la taille de la police
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure au survol
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none', // Supprime la bordure lorsque le Select est focus
                    },
                  }}
                >
                  <MenuItem value="fr-FR">Français</MenuItem>
                  <MenuItem value="en-US">English</MenuItem>
                  <MenuItem value="de-DE">Deutsch</MenuItem>
                  <MenuItem value="es-ES">Español</MenuItem>
                </Select>
              </FormControl>
            </Box>

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
                    onChange={() =>
                      handleChangeCheckbox('learnIt')(!box.learnIt)
                    }
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
            {/* ---------------------- Buttons ----------------------------- */}
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
                type="submit"
                disabled={isLoading || !isFormValid}
                sx={{ mt: 3, mb: 2 }}
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // TODO : pas besoin de recharger les boxes dans la page /boxes puisqu'on annule
                onClick={() => navigate(`/boxes`)}
              >
                Cancel
              </Button>

              {mode === 'edit' && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleDelete}
                >
                  Delete the box
                </Button>
              )}
            </Box>
          </form>
        </Box>
        {/* --------------------- Bottom Navigation --------------------- */}
        <BottomNavigationMUI />
      </Container>
      {/* ---------------------------- Dialog --------------------------- */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this box ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this box ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BoxCreateEdit;

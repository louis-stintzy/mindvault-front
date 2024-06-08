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
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationMUI from '../../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../../hook/redux';
import {
  changeBoxField,
  createBox,
  deleteBox,
} from '../../../store/reducers/boxOne';
import LanguageSelector from '../../TextFieldWithSTT/LanguageSelector';
import VoiceSelector from '../../TextFieldWithSTT/VoiceSelector';

interface BoxCreateEditProps {
  mode: 'create' | 'edit';
}

function BoxCreateEdit({ mode }: BoxCreateEditProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestionVoice, setSelectedQuestionVoice] = useState('');
  const [selectedAnswerVoice, setSelectedAnswerVoice] = useState('');

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

  // NOTE: Les champs du formulaire sont pré-remplis si on est en mode edit
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

  const handleChangeField = useCallback(
    (
        field:
          | 'name'
          | 'description'
          | 'label'
          | 'defaultQuestionLanguage'
          | 'defaultQuestionVoice'
          | 'defaultAnswerLanguage'
          | 'defaultAnswerVoice'
      ) =>
      (value: string) => {
        // TODO: checker que les values respectent les contraintes comme name<255 caractères
        dispatch(changeBoxField({ field, value }));
      },
    [dispatch]
  );

  const handleChangeCheckbox = (field: 'learnIt') => (value: boolean) => {
    dispatch(changeBoxField({ field, value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // je n'arrive pas à enregistrer les voix dans le store alors j'envoie les voix directement du composant
    const boxToSubmit = {
      ...box,
      defaultQuestionVoice: selectedQuestionVoice,
      defaultAnswerVoice: selectedAnswerVoice,
    };

    if (mode === 'create') {
      dispatch(createBox(boxToSubmit));
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

          {/* // -------------- FORM : NAME, LABEL & DESCRIPTION ------------ */}

          {/* // note Don't forget the enctype="multipart/form-data" in your form.
          <form action="/profile" method="post" enctype="multipart/form-data"> */}

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

            {/* // ---------------------- LANGUAGE DEFAULT SELECTION ---------------------- */}
            <LanguageSelector
              field2="defaultQuestionLanguage"
              instructions="Please select the default language for questions"
              selectedLang={box.defaultQuestionLanguage}
              onLanguageChange2={(field, lang) =>
                handleChangeField(field)(lang)
              }
            />
            <VoiceSelector
              instructions="Please select the default voice for questions"
              lang={box.defaultQuestionLanguage}
              selectedVoiceName={selectedQuestionVoice}
              setSelectedVoiceName={setSelectedQuestionVoice}
            />
            <LanguageSelector
              field2="defaultAnswerLanguage"
              instructions="Please select the default language for questions"
              selectedLang={box.defaultAnswerLanguage}
              onLanguageChange2={(field, lang) =>
                handleChangeField(field)(lang)
              }
            />
            <VoiceSelector
              instructions="Please select the default voice for answers"
              lang={box.defaultAnswerLanguage}
              selectedVoiceName={selectedAnswerVoice}
              setSelectedVoiceName={setSelectedAnswerVoice}
            />
            {/* // -------------------------- UPLOAD ILLUSTRATION --------------------------- */}
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
            {/* // ------------------------------ OPTIONS BUTTONS ------------------------------------ */}
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
            {/* // ------------------------------ ACTION BUTTONS ------------------------------------ */}
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

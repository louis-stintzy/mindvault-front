import { Container, Box, Typography, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationMUI from '../../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../../hook/redux';
import {
  createBox,
  deleteBox,
  updateBox,
} from '../../../store/reducers/boxOne';
import BoxCreateEditDelConfirmDial from './BoxCreateEditDelConfirmDial';
import BoxCreateEditFormFields from './BoxCreateEditFormFields';
import BoxCreateEditActionButtons from './BoxCreateEditActionButtons';

interface BoxCreateEditProps {
  mode: 'create' | 'edit';
}

function BoxCreateEdit({ mode }: BoxCreateEditProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuestionVoice, setSelectedQuestionVoice] = useState('');
  const [selectedAnswerVoice, setSelectedAnswerVoice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // je n'arrive pas à enregistrer les voix dans le store alors j'envoie les voix directement du composant
    // const boxToSubmit = {
    //   ...box,
    //   defaultQuestionVoice: selectedQuestionVoice,
    //   defaultAnswerVoice: selectedAnswerVoice,
    // };

    const formData = new FormData();
    formData.append('name', box.name);
    formData.append('description', box.description);
    formData.append('color', box.color);
    formData.append('label', box.label);
    formData.append('level', box.level);
    formData.append('defaultQuestionLanguage', box.defaultQuestionLanguage);
    formData.append('defaultQuestionVoice', selectedQuestionVoice);
    formData.append('defaultAnswerLanguage', box.defaultAnswerLanguage);
    formData.append('defaultAnswerVoice', selectedAnswerVoice);
    formData.append('learnIt', box.learnIt.toString()); // ou String(box.learnIt) qui peut gérer les null et undefined
    formData.append('type', box.type.toString());

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (mode === 'create') {
      dispatch(createBox(formData));
    }
    if (mode === 'edit' && currentBox) {
      dispatch(updateBox({ boxId: currentBox.id, formData }));
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };
  const handleConfirmDelete = async () => {
    if (currentBox) {
      // todo: à voir s'il faut englober dans un try catch (la gestion des erreurs se fait dans le store/reducer)
      await dispatch(deleteBox(currentBox.id));
    } else {
      alert('currentBox is null');
    }
    navigate(`/boxes`);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        className="create-box-container"
        sx={{ pb: 8 }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* // ------------------------- Title ----------------------------- */}
          <Typography variant="h4" component="h1" gutterBottom>
            {mode === 'create'
              ? 'Create a Box'
              : `Edit the Box : ${currentBox?.name}`}
          </Typography>

          {/* // --------------------- Error Display --------------------------*/}
          {error &&
            error.map((err) => (
              <Alert key={err.errCode} severity="error">
                {err.errMessage}
              </Alert>
            ))}

          {/* // ------------------------- FORM ------------------------------- */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <BoxCreateEditFormFields
              box={box}
              selectedQuestionVoice={selectedQuestionVoice}
              setSelectedQuestionVoice={setSelectedQuestionVoice}
              selectedAnswerVoice={selectedAnswerVoice}
              setSelectedAnswerVoice={setSelectedAnswerVoice}
              setImageFile={setImageFile}
            />
            <BoxCreateEditActionButtons
              isFormValid={isFormValid}
              mode={mode}
              handleDelete={handleDelete}
            />
          </form>
        </Box>
        {/* --------------------- Bottom Navigation --------------------- */}
        <BottomNavigationMUI />
      </Container>
      {/* ---------------------------- Dialog --------------------------- */}
      <BoxCreateEditDelConfirmDial
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default BoxCreateEdit;

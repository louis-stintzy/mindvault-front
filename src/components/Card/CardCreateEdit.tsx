import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { changeCardField, createCard } from '../../store/reducers/cardOne';
import TextFieldWithSTT from '../TextFieldWithSTT/TextFieldWithSTT';
import VoiceSelector from '../TextFieldWithSTT/VoiceSelector';
import { Language } from '../../@types/lang';

function CardCreateEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  // TODO : à corriger, voir BoxStats.tsx
  const boxId = Number(id);

  const { currentBox } = useAppSelector((state) => state.boxOne);
  const isLoadingBox = useAppSelector((state) => state.boxOne.isLoading);

  const { error, isRegistered, success, card } = useAppSelector(
    (state) => state.cardOne
  );
  const isLoadingCard = useAppSelector((state) => state.cardOne.isLoading);

  const [selectedQuestionVoice, setSelectedQuestionVoice] = useState('');
  const [selectedAnswerVoice, setSelectedAnswerVoice] = useState('');

  // const [langQuestion, setLangQuestion] = useState(currentBox?.default_question_language || 'fr-FR');
  // const [langAnswer, setLangAnswer] = useState(currentBox?.default_answer_language || 'fr-FR');

  const isFormValid = card.question.length > 0 && card.answer.length > 0;

  useEffect(() => {
    if (isRegistered) {
      navigate(`/box/${id}/items`, {
        replace: true,
        state: { navigateFromCardCreateEdit: true },
      });
    }
  }, [isRegistered, id, navigate]);

  // NOTE: useCallback is used to prevent the function from being recreated on each render
  // handleChangeField est utilisé dans le useEffect pour initialiser les langues par défaut
  // une erreur est apparue avec handleChangeField dans les dependances du useEffect
  // "The 'handleChangeField' function makes the dependencies of useEffect Hook change on every render. To fix this, wrap the definition of 'handleChangeField' in its own useCallback() Hook
  // handleChangeField est recréée à chaque rendu : cela peut potentiellement causer des exécutions inutiles dans useEffect
  // Avec useCallback, la fonction handleChangeField ne sera recréée que lorsque dispatch change, ce qui en pratique ne se produira pas
  const handleChangeField = useCallback(
    (
        field:
          | 'questionLanguage'
          | 'questionVoice'
          | 'answerVoice'
          | 'answerLanguage'
          | 'question'
          | 'answer'
      ) =>
      (value: Language | string) => {
        dispatch(changeCardField({ field, value }));
      },
    [dispatch]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createCard({ boxId, card }));
  };

  useEffect(() => {
    if (currentBox) {
      handleChangeField('questionLanguage')(
        currentBox.default_question_language
      );
      handleChangeField('answerLanguage')(currentBox.default_answer_language);
    }
  }, [currentBox, handleChangeField]);

  if (isLoadingCard || isLoadingBox || isRegistered) {
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
          <Box sx={{ my: 2 }}>
            <TextFieldWithSTT
              field="question"
              required
              id="question"
              name="question"
              label="Your question"
              lang={card.questionLanguage}
              onSelectLang={(field, value) => {
                handleChangeField(field)(value);
              }}
              value={card.question}
              onChangeValue={(field, value) => handleChangeField(field)(value)}
            />
            <VoiceSelector
              lang={card.questionLanguage}
              instructions="Choose the voice to use for the field above:"
              presetVoiceName={currentBox?.default_question_voice}
              selectedVoiceName={selectedQuestionVoice}
              setSelectedVoiceName={setSelectedQuestionVoice}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextFieldWithSTT
              field="answer"
              required
              id="answer"
              name="answer"
              label="The answer to the question"
              lang={card.answerLanguage}
              onSelectLang={(field, value) => {
                handleChangeField(field)(value);
              }}
              value={card.answer}
              onChangeValue={(field, value) => handleChangeField(field)(value)}
            />
            <VoiceSelector
              lang={card.answerLanguage}
              instructions="Choose the voice to use for the field above:"
              presetVoiceName={currentBox?.default_answer_voice}
              selectedVoiceName={selectedAnswerVoice}
              setSelectedVoiceName={setSelectedAnswerVoice}
            />
          </Box>
          <Box sx={{ my: 6 }}>
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
            disabled={isLoadingCard || !isFormValid}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoadingCard ? 'Loading...' : 'Create'}
          </Button>
        </form>
      </Box>
      <BottomNavigationMUI />
    </Container>
  );
}

export default CardCreateEdit;

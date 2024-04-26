import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { CardData } from '../../@types/card';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { updateCardAttributesAfterAnswer } from '../../store/reducers/cardOne';
import CardQuestionSide from './CardQuestionSide';
import CardAnswerSide from './CardAnswerSide';
import { Language } from '../../@types/lang';

interface QuestionProps {
  card: CardData;
  goToNextCard: () => void;
}

function CardTwoSides({ card, goToNextCard }: QuestionProps) {
  const dispatch = useAppDispatch();
  const [isFlipped, setIsFlipped] = useState(false);
  const [initialCompartment, setInitialCompartment] = useState(
    card.compartment
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const { autoRead } = useAppSelector((state) => state.cardMultiple);

  // TODO : passer du useState à une route backend pour modif la langue de la réponse
  // note : speakText utilise card.answerLanguage et non answerLanguage du useState
  const [answerLanguage, setAnswerLanguage] = useState<Language>('');
  const handleChangeField =
    (field: 'questionLanguage' | 'answerLanguage') => (value: Language) => {
      setAnswerLanguage(value);
    };

  const speakText = (text: string, lang: string) => {
    // todo : voix par défaut si la voix choisie n'est pas disponible
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const verifyAnswer = (answerToCheck: string, correctAnswer: string) => {
    return (
      answerToCheck.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  };

  const updateCard = (
    cardId: number,
    compartment: number,
    answerIsCorrect: boolean
  ) => {
    const nextCompartment = answerIsCorrect ? compartment + 1 : 1;
    const nextDateToAskBeforeFormatting = new Date();
    const timeToAdd = [0, 1, 3, 7, 15, 30, 90, 180, 10000];
    // Compartiment 1 : tous les jours
    // Compartiment 2 : tous les trois jours
    // Compartiment 3 : toutes les semaines
    // Compartiment 4 : toutes les deux semaines
    // Compartiment 5 : tous les mois
    // Compartiment 6 : tous les trois mois
    // Compartiment 7 : tous les six mois
    // Compartiment 8 : connaissance acquise
    nextDateToAskBeforeFormatting.setDate(
      nextDateToAskBeforeFormatting.getDate() + timeToAdd[nextCompartment]
    );
    const nextDateToAsk = nextDateToAskBeforeFormatting.toISOString();
    dispatch(
      updateCardAttributesAfterAnswer({
        cardId,
        nextCompartment,
        nextDateToAsk,
      })
    );
  };

  const handleNextButton = () => {
    setUserAnswer('');
    setIsFlipped(false);
    setIsCorrect(false);
    goToNextCard();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answerIsCorrect = verifyAnswer(userAnswer, card.answer);
    updateCard(card.id, card.compartment, answerIsCorrect);
    setIsCorrect(answerIsCorrect);
    setIsFlipped(true);
  };

  const handlePassInForce = () => {
    const userSaysAnswerIsCorrect = true;
    updateCard(card.id, initialCompartment, userSaysAnswerIsCorrect);
    handleNextButton();
  };

  useEffect(() => {
    setInitialCompartment(card.compartment);
    setAnswerLanguage(card.answerLanguage);
    if (autoRead.question) {
      speakText(card.question, card.questionLanguage);
    }
  }, [card, autoRead.question]);

  useEffect(() => {
    if (isFlipped) {
      if (autoRead.answer) {
        speakText(card.answer, card.answerLanguage);
      }
    }
  }, [isFlipped, card, autoRead.answer]);

  return (
    <Container component="main" maxWidth="xs" className="question-container">
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
          Question
        </Typography>

        {/* // ------ !isFlipped : Question & Media & Field to Answer ------ */}
        {!isFlipped && (
          <CardQuestionSide
            card={card}
            answerLanguage={answerLanguage}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            speakText={speakText}
            handleChangeLang={handleChangeField}
            handleSubmit={handleSubmit}
          />
        )}
        {/* // ------------------ isFlipped : Answer ----------------- */}
        {isFlipped && (
          <CardAnswerSide
            card={card}
            userAnswer={userAnswer}
            isCorrect={isCorrect}
            speakText={speakText}
            handleNextButton={handleNextButton}
            handlePassInForce={handlePassInForce}
          />
        )}
      </Box>

      {/* // --------------------- Bottom Navigation --------------------- */}
      <BottomNavigationMUI />
    </Container>
  );
}

export default CardTwoSides;

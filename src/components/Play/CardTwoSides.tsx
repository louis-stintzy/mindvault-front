import { Box, Container, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
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
  const [voicesInitialized, setVoicesInitialized] = useState(false);
  // la vérification de la disponibilité de la voix s'effectue directement dans speakText.
  // On ne vérifie pas si la voix est disponible avant dans le useState, ce n'est pas necessaire car si pas dispo on utilisera la voix par défaux
  // const [availableVoicesName, setAvailableVoicesName] = useState<string[]>(
  //   speechSynthesis.getVoices().map((voice) => voice.name)
  // );
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

  const speakText = useCallback(
    (text: string, lang: string, voiceName?: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      if (voiceName) {
        const voiceToUSe = speechSynthesis
          .getVoices()
          .find((voice) => voice.name === voiceName);
        if (!voiceToUSe) {
          console.error(
            'Voice not found, ce n est pas grave, on prend la voix par défaut'
          );
        } else {
          utterance.voice = voiceToUSe;
        }
      }
      speechSynthesis.speak(utterance);
    },
    []
  );

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

  // ----------- USE EFFECTS -------------
  // -------- Load card attributes -------
  useEffect(() => {
    setInitialCompartment(card.compartment);
    setAnswerLanguage(card.answerLanguage);
  }, [card]);
  // ------- Load voices available -------
  useEffect(() => {
    // si le chargement s'effectue en plusieurs fois et que le texte se répète inclure un setTimeout en plus pour que setVoicesInitialized ne passe à true qu'au bout d'un certain temps
    const handleVoicesChanged = () => {
      if (!voicesInitialized) {
        setVoicesInitialized(true);
      }
      // setAvailableVoicesName(
      //   speechSynthesis.getVoices().map((voice) => voice.name)
      // );
    };
    handleVoicesChanged();
    speechSynthesis.onvoiceschanged = handleVoicesChanged;
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [voicesInitialized]);
  // -------------- Autoread Question--------------
  useEffect(() => {
    if (voicesInitialized && autoRead.question && !isFlipped) {
      if (card.questionVoice) {
        speakText(card.question, card.questionLanguage, card.questionVoice);
      } else {
        speakText(card.question, card.questionLanguage);
      }
    }
  }, [card, autoRead.question, isFlipped, voicesInitialized, speakText]);
  // -------------- Autoread Answer--------------
  useEffect(() => {
    if (voicesInitialized && autoRead.answer && isFlipped) {
      if (card.answerVoice) {
        speakText(card.answer, card.answerLanguage, card.answerVoice);
      } else {
        speakText(card.answer, card.answerLanguage);
      }
    }
  }, [card, autoRead.answer, isFlipped, voicesInitialized, speakText]);

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

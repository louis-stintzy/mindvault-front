import { useRef, useState, useEffect } from 'react';

interface SpeechToTextOptions {
  interimResults?: boolean;
  continuous?: boolean;
  lang?: string;
}

function useSpeechToText(options: SpeechToTextOptions) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // useRef est utile pour conserver la même instance de SpeechRecognition à travers les rendus successifs sans provoquer de re-rendus inutiles.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Vérification de la compatibilité du navigateur
    // webkitSpeechRecognition est une implémentation spécifique à WebKit
    // SpeechRecognition est une implémentation standardisée
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition is not available');
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    if (!recognition) {
      return;
    }
    // interimResults : détermine si des résultats temporaires doivent être retournés par l'API pendant que l'utilisateur parle.
    // continuous : détermine si la reconnaissance vocale doit capturer une seule phrase ou continuer à écouter après que l'utilisateur ait cessé de parler.
    recognition.interimResults =
      options.interimResults !== undefined ? options.interimResults : true;
    recognition.continuous =
      options.continuous !== undefined ? options.continuous : true;
    recognition.lang = options.lang !== undefined ? options.lang : 'fr-FR';

    // TODO : voir la pertinence de l'utilisation ici de grammars
    // voir si besoin de reconnaître quand les utilisateurs disent le nom de signes de ponctuation
    // ex : dire "point" pour insérer un "."
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    if (SpeechGrammarList) {
      const grammar = `#JSGF V1.0; grammar punctuation; public <punct> = . | , | ? | ! | ; | : ;`;
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    // "onresult" est déclenché lorsque l'API de reconnaissance vocale a détecté un résultat (final ou intermédiaire).
    // "let i = event.resultIndex" : index du dernier résultat retourné / boucle commence à l'index du nouveau résultat
    // évite de traiter à nouveau des résultats déjà obtenus vs "let i = 0"
    recognition.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          text += event.results[i][0].transcript;
        }
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error : ', event.error);
    };

    // "onend" est déclenché lorsque l'API de reconnaissance vocale s'arrête (arrête de parler ou erreur, ou arrêt manuel)
    // "onend" sert à nettoyer ou préparer l'application pour la prochaine entrée vocale
    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    // nettoye et arrête la reconnaissance vocale lorsque le composant est démonté ou l'état change
    // on peut ici désactiver le linter pour cette ligne (ne détecte pas une valeur cohérente pour le return mais OK ici : une fonction anonyme est bien retournée)
    // eslint-disable-next-line consistent-return
    return () => recognition.stop();
  }, [options.continuous, options.interimResults, options.lang]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
}

export default useSpeechToText;

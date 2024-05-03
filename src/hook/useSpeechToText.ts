import { useRef, useState, useEffect } from 'react';

interface SpeechToTextOptions {
  interimResults?: boolean;
  continuous?: boolean;
  lang?: string;
}

function useSpeechToText(options: SpeechToTextOptions) {
  const [isListening, setIsListening] = useState(false);
  const [userStopped, setUserStopped] = useState(false);
  const [transcript, setTranscript] = useState('');

  // useRef est utile pour conserver la même instance de SpeechRecognition à travers les rendus successifs sans provoquer de re-rendus inutiles.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Pour Chrome sur Android : useEffect pour redémarrer la reconnaissance vocale si l'utilisateur n'a pas arrêté manuellement l'écoute
  // l'utilisateur n'a pas appuyé sur "stop" et nous en sommes à l'étape .onend (isListening = false et userStopped = false)
  // alors on redémarre la reconnaissance vocale comme avec startListening
  useEffect(() => {
    if (!userStopped && !isListening && recognitionRef.current) {
      setTranscript((prevTranscript) => `${prevTranscript} `);
      recognitionRef.current.start();
      setIsListening(true);
      setUserStopped(false);
      // console.log('Restarting recognition due to automatic stop.');
    }
  }, [isListening, userStopped]);

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

    // Si l'API de reconnaissance vocale n'est pas disponible, on ne fait rien (evite problème de typage)
    if (!recognition) {
      return;
    }
    // interimResults : détermine si des résultats temporaires doivent être retournés par l'API pendant que l'utilisateur parle.
    // false pour éviter que le texte ne se dédouble sur mobile
    // continuous : détermine si la reconnaissance vocale doit capturer une seule phrase ou continuer à écouter après que l'utilisateur ait cessé de parler.
    recognition.interimResults =
      options.interimResults !== undefined ? options.interimResults : false;
    recognition.continuous =
      options.continuous !== undefined ? options.continuous : true;
    recognition.lang = options.lang !== undefined ? options.lang : 'fr-FR';

    // "onresult" est déclenché lorsque l'API de reconnaissance vocale a détecté un résultat (final ou intermédiaire).
    // "let i = event.resultIndex" : index du dernier résultat retourné / boucle commence à l'index du nouveau résultat
    // évite de traiter à nouveau des résultats déjà obtenus vs "let i = 0"
    recognition.onresult = (event) => {
      let newTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          // si le résultat est final, on ajoute (récupère) la transcription
          // le += au lieu du simple = est apparemment par sécurité si plusieurs isFinal
          // newTranscript = morceau de la transcription finale
          newTranscript += event.results[i][0].transcript;
        }
      }
      // on ajoute la nouvelle transcription à la transcription existante (transcription en cours)
      // conserve et accumule toute la transcription reçue pendant la session d'écoute.
      setTranscript((prevTranscript) => prevTranscript + newTranscript);
      // console.log('Speech recognition result : ', newTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error : ', event.error);
    };

    // "onend" est déclenché lorsque l'API de reconnaissance vocale s'arrête (arrête de parler ou erreur, ou arrêt manuel)
    // "onend" sert à nettoyer ou préparer l'application pour la prochaine entrée vocale
    recognition.onend = () => {
      setIsListening(false);
      // console.log('Speech recognition ended');
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
      setUserStopped(false);
      // console.log('Speech recognition started');
    }
  };
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setUserStopped(true);
      setTranscript('');
      // console.log('Speech recognition stopped by user');
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

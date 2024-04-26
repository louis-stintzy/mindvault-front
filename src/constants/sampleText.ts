import { Language } from '../@types/lang';

const getSampleText = (language: Language) => {
  const samples = {
    'fr-FR': 'Ceci est un test de voix. Bonjour, comment allez-vous ?',
    'en-US': 'This is a voice test. Hello, how are you?',
    'es-ES': 'Esto es una prueba de voz. Hola, ¿cómo estás?',
    'de-DE': 'Dies ist ein Stimmtest. Hallo, wie geht es dir?',
  };
  return samples[language] || samples['en-US'];
};

export default getSampleText;

import { Language } from '../@types/lang';

const getSampleText = (language: Language) => {
  // "key in Language" is a TypeScript feature called "mapped types
  // Un "mapped type" permet de prendre un type existant et de transformer ses propriétés en un nouveau type.
  // TypeScript sait que l'objet samples a une entrée pour chaque possible Language
  const samples: { [key in Language]: string } = {
    'fr-FR': 'Ceci est un test de voix. Bonjour, comment allez-vous ?',
    'en-US': 'This is a voice test. Hello, how are you?',
    'es-ES': 'Esto es una prueba de voz. Hola, ¿cómo estás?',
    'de-DE': 'Dies ist ein Stimmtest. Hallo, wie geht es dir?',
    '': 'There is no language selected. Please select one.',
  };
  return samples[language] || samples['en-US'];
};

export default getSampleText;

type PunctuationCommandsLang = { [command: string]: string };
type PunctuationCommands = { [lang: string]: PunctuationCommandsLang };

const punctuationCommandsFR: PunctuationCommandsLang = {
  "point d'interrogation": '?',
  "point d'exclamation": '!',
  virgule: ',',
  'point virgule': ';',
  'deux points': ':',
  point: '.',
  'ouvrir la parenthèse': '(',
  'fermer la parenthèse': ')',
  'ouvrir les guillemets': '"',
  'fermer les guillemets': '"',
};

const punctuationCommandsEN: PunctuationCommandsLang = {
  'question mark': '?',
  'exclamation point': '!',
  comma: ',',
  semicolon: ';',
  colon: ':',
  period: '.',
  'open parenthesis': '(',
  'close parenthesis': ')',
  'open quote': '“',
  'close quote': '”',
  'open bracket': '[',
  'close bracket': ']',
  dash: '-',
};

const punctuationCommands: PunctuationCommands = {
  'fr-FR': punctuationCommandsFR,
  'en-US': punctuationCommandsEN,
};

const formatText = (text: string, lang: string) => {
  // Remplace les commandes de ponctuation par les caractères correspondants
  // commands : récupère les commandes de ponctuation correspondant à la langue
  // Object.entries : transforme l'objet en tableau de tableaux [commande, remplacement]
  // reduce : pour chaque élément du tableau, on remplace la commande par le remplacement
  // acc : texte formaté, initialement acc est égal à text (texte à formater)
  const commands = punctuationCommands[lang];
  let formattedText = Object.entries(commands).reduce(
    (acc, [command, replacement]) =>
      acc.replace(new RegExp(command, 'gi'), replacement),
    text
  );

  // Remplace la première lettre du texte en minuscule par une majuscule
  formattedText =
    formattedText.charAt(0).toUpperCase() + formattedText.slice(1);

  // Remplace la première lettre d'une phrase en minuscule par une majuscule
  // chercher un caractère de ponctuation "(\.|\?|\!)" suivi d'un espace "\s" et d'une lettre en minuscule "[a-z]"
  // traite toutes les occurences "g"
  // pour chaque occurence, on met tout en majuscule (la ponctuation et l'espace ne change pas)
  const regex1 = /(\.|\?|!)\s[a-z]/g;
  formattedText = formattedText.replace(regex1, (match) => match.toUpperCase());

  // Remplace les espaces multiples par un seul espace
  // chercher un ou plusieurs espaces "\s+" et les remplacer par un seul espace " "
  const regex2 = /\s+/g;
  formattedText = formattedText.replace(regex2, ' ');

  return formattedText;
};

export default formatText;

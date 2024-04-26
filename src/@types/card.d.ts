import { Language } from './lang';

export interface CardData {
  id: number;
  boxId: number;
  creatorId: number;
  questionLanguage: Language;
  questionVoice: string;
  answerLanguage: Language;
  answerVoice: string;
  question: string;
  answer: string;
  attachment: string;
  position: number;
  compartment: number;
  dateToAsk: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CardDataLight {
  questionLanguage: Language;
  questionVoice: string;
  answerLanguage: Language;
  answerVoice: string;
  question: string;
  answer: string;
  attachment: string;
}

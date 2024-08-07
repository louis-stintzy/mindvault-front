import { Language } from './lang';

export interface PictureData {
  pictureUrl: string;
  photographerName: string;
  photographerProfileUrl: string;
}

export interface BoxData {
  id: number;
  owner_id: number;
  original_box_id: number;
  original_box_creator_id: number;
  original_box_created_at: string;
  copy_box_id: number | null;
  copy_box_owner_id: number | null;
  copy_box_created_at: string | null;
  name: string;
  description: string;
  picture: PictureData;
  color: string;
  label: string;
  level: string;
  default_question_language: Language;
  default_question_voice: string;
  default_answer_language: Language;
  default_answer_voice: string;
  position: number;
  learn_it: boolean;
  type: number;
  parent_box_id: number | null;
  on_store: number;
  created_at: string;
  updated_at: string | null;
  cards_to_review: number;
}

export interface BoxDataLight {
  name: string;
  description: string;
  picture: PictureData;
  color: string;
  label: string;
  level: string;
  defaultQuestionLanguage: Language;
  defaultQuestionVoice: string;
  defaultAnswerLanguage: Language;
  defaultAnswerVoice: string;
  learnIt: boolean;
  type: number;
}

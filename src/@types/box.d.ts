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
  box_picture: string;
  color: string;
  label: string;
  level: string;
  default_question_language: string;
  default_answer_language: string;
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
  boxPicture: string;
  color: string;
  label: string;
  level: string;
  defaultQuestionLanguage: string;
  defaultAnswerLanguage: string;
  learnIt: boolean;
  type: number;
}

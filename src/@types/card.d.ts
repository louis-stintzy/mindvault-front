export interface CardData {
  id: number;
  boxId: number;
  creatorId: number;
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
  question: string;
  answer: string;
  attachment: string;
}

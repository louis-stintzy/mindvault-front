export interface CardsByCompartment {
  compartment1: number;
  compartment2: number;
  compartment3: number;
  compartment4: number;
  compartment5: number;
  compartment6: number;
  compartment7: number;
  compartment8: number;
}

export interface CardsByCompartmentPerWeek {
  compartment1: number[];
  compartment2: number[];
  compartment3: number[];
  compartment4: number[];
  compartment5: number[];
  compartment6: number[];
  compartment7: number[];
  compartment8: number[];
}

export interface InstantStatsData {
  totalCards: number;
  cardsByCompartment: CardsByCompartment;
}

export interface StatsEndOfWeek {
  totalCards: number;
  cardsByCompartment: CardsByCompartment;
  statsDate: {
    statisticsDay: string;
    weekNumber: number;
    year: number;
  };
}

export type HistoricalStatsData = StatsEndOfWeek[];

export interface HealthReport {
  userId: string;
  date: string; 
  cycleDay: number;
  physicalPainSymptoms: string[];
  moodMentalStates: string[];
  flowIntensity: number; 
  periodIndicators: string[];
  sexualHealthIndicators: string[];
  notes?: string;
}

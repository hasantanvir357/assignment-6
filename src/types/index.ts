export interface Specs {
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: string;
  calories: string;
  rating: number;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  category: string[];
  equipment: string;
  duration: string;
  calories: string;
  rating: number;
  image: string;
  instructions: string[];
  specs?: Specs;
}
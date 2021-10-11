export interface IExercise {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  exerciseId: string;
  completed: boolean;
  workoutId: string;
}

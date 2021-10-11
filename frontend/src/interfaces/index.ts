export interface IWorkout {
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  workoutId?: string;
  exercises?: IExercise[];
  completed?: boolean;
}

export interface IExercise {
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  exerciseId?: string;
  completed?: boolean;
  workoutId?: string;
}

export type ModalActionTypes = "confirmed" | "canceled";

export type ModalTypes = "add" | "edit" | "delete";

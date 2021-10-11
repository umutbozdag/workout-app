import { IExercise, IWorkout } from "@/interfaces";

export const mockWorkoutData: IWorkout = {
  title: "Workout Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  exercises: [
    {
      exerciseId: "hC37mNvO5Y",
      title: "Exercise Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      completed: true,
      workoutId: "fyWd7zEKMS",
      updatedAt: "2021-09-26T09:25:03.752Z",
      createdAt: "2021-09-25T22:46:45.957Z",
    },
  ],
  completed: false,
  workoutId: "fyWd7zEKMn",
  createdAt: "2021-09-25T17:53:48.940Z",
  updatedAt: "2021-09-26T09:25:03.764Z",
};

export const mockExerciseData: IExercise = {
  exerciseId: "hC37mNvO5Y",
  title: "Exercise Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  completed: true,
  workoutId: "fyWd7zEKMn",
  updatedAt: "2021-09-26T09:25:03.752Z",
  createdAt: "2021-09-25T22:46:45.957Z",
};

function generateId() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function generateMockData(
  type: "exercise" | "workouts" | "workoutDetail",
  count = 1
): IExercise | IWorkout[] | IWorkout {
  if (type === "exercise") {
    return mockExerciseData;
  } else if (type === "workouts") {
    return Array.from({ length: count }).map(() => {
      return {
        ...mockWorkoutData,
        workoutId: generateId(),
        exercises: Array.from({ length: count }).map(() => {
          return {
            ...mockExerciseData,
            exerciseId: generateId(),
          };
        }),
      };
    });
  } else {
    return mockWorkoutData;
  }
}

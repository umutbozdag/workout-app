import { Express, Request, Response } from "express";
import { validateRequest } from "./middleware";
import {
  createWorkoutSchema,
  deleteWorkoutSchema,
  updateWorkoutSchema,
} from "./schema/workout.schema";
import {
  createWorkoutHandler,
  deleteWorkoutHandler,
  getWorkoutsHandler,
  getWorkoutHandler,
  updateWorkoutHandler,
} from "./controller/workout.controller";

import {
  createExerciseHandler,
  deleteExerciseHandler,
  updateExerciseHandler,
} from "./controller/exercise.controller";
import {
  createExerciseSchema,
  updateExerciseSchema,
} from "./schema/exercise.schema";

export default function (app: Express) {
  app.get("/health", (req: Request, res: Response) => res.send("healthy!"));

  app.post(
    "/api/workouts",
    validateRequest(createWorkoutSchema),
    createWorkoutHandler
  );

  app.put(
    "/api/workouts/:workoutId",
    validateRequest(updateWorkoutSchema),
    updateWorkoutHandler
  );

  app.get("/api/workouts/:workoutId", getWorkoutHandler);

  app.get("/api/workouts", getWorkoutsHandler);

  app.delete(
    "/api/workouts/:workoutId",
    validateRequest(deleteWorkoutSchema),
    deleteWorkoutHandler
  );

  app.post("/api/exercises", createExerciseHandler);

  app.put("/api/exercises/:exerciseId", updateExerciseHandler);

  app.delete("/api/exercises/:exerciseId", deleteExerciseHandler);
}

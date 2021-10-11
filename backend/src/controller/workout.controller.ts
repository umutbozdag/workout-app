import { Request, Response } from "express";
import { get } from "lodash";
import {
  createWorkout,
  findWorkout,
  findAndUpdateWorkout,
  deleteWorkout,
  findAllWorkouts,
} from "../service/workout.service";

export async function createWorkoutHandler(req: Request, res: Response) {
  const body = req.body;

  const workout = await createWorkout({ ...body });

  return res.send(workout);
}

export async function updateWorkoutHandler(req: Request, res: Response) {
  const workoutId = get(req, "params.workoutId");
  const update = req.body;

  const workout = await findWorkout({ workoutId });

  if (!workout) {
    return res.sendStatus(404);
  }
  const updatedWorkout = await findAndUpdateWorkout({ workoutId }, update, {
    new: true,
  });

  return res.send(updatedWorkout);
}

export async function getWorkoutHandler(req: Request, res: Response) {
  const workoutId = get(req, "params.workoutId");
  const workout = await findWorkout({ workoutId });

  if (!workout) {
    return res.sendStatus(404);
  }

  return res.send(workout);
}

export async function getWorkoutsHandler(req: Request, res: Response) {
  const workouts = await findAllWorkouts().sort({ updatedAt: -1 });

  return res.send(workouts);
}

export async function deleteWorkoutHandler(req: Request, res: Response) {
  const workoutId = get(req, "params.workoutId");

  const workout = await findWorkout({ workoutId });

  if (!workout) {
    return res.sendStatus(404);
  }

  await deleteWorkout({ workoutId });

  return res.sendStatus(200);
}

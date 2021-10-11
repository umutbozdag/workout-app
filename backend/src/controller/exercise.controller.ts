import { Request, Response } from "express";
import { get } from "lodash";
import { nanoid } from "nanoid";
import { IExercise } from "../interfaces";
import { ExerciseDocument } from "../model/exercise.model";
import {
  createExercise,
  deleteExercise,
  findAndUpdateExercise,
  findExercise,
} from "../service/exercise.service";
import { findAndUpdateWorkout, findWorkout } from "../service/workout.service";

export async function createExerciseHandler(req: Request, res: Response) {
  const body: IExercise = {
    title: req.body.title,
    description: req.body.description,
    workoutId: req.body.workoutId,
    exerciseId: nanoid(10),
    completed: req.body.completed,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const workout = await findAndUpdateWorkout(
    { workoutId: req.body.workoutId },
    {
      $push: { exercises: { ...body } },
    },
    {}
  );

  if (!workout) {
    res.sendStatus(404);
  }

  const exercise = await createExercise({
    ...body,
  });

  return res.send(exercise);
}

export async function updateExerciseHandler(req: Request, res: Response) {
  const exerciseId = get(req, "params.exerciseId");
  const update = req.body;

  const exercise = await findExercise({ exerciseId });

  if (!exercise) {
    return res.sendStatus(404);
  }

  const updatedExercise = await findAndUpdateExercise(
    { exerciseId: exerciseId },
    update,
    {
      new: true,
    }
  );

  const workout = await findWorkout({ workoutId: exercise.workoutId });

  if (workout) {
    const exerciseIndex = workout!.exercises.findIndex(
      (exercise) => exercise.exerciseId === exerciseId
    );

    workout!.exercises[exerciseIndex] = updatedExercise;

    // Update workout's exercises
    await findAndUpdateWorkout(
      { workoutId: workout.workoutId },
      {
        $set: { exercises: workout.exercises },
      },
      {
        new: true,
      }
    );
  }

  return res.send(updatedExercise);
}

export async function deleteExerciseHandler(req: Request, res: Response) {
  const exerciseId = get(req, "params.exerciseId");

  const exercise = await findExercise({ exerciseId });

  if (!exercise) {
    return res.sendStatus(404);
  }

  const workout = await findWorkout({ workoutId: exercise!.workoutId });

  if (workout) {
    const exerciseIndex = workout!.exercises.findIndex(
      (exercise) => exercise.exerciseId === exerciseId
    );

    workout!.exercises.splice(exerciseIndex, 1);

    // Delete exercise from workout
    await findAndUpdateWorkout(
      { workoutId: workout.workoutId },
      {
        $set: { exercises: workout.exercises },
      },
      {
        new: true,
      }
    );
  }

  const deletedExercise = await deleteExercise({ exerciseId });
  return res.send(deletedExercise);
}

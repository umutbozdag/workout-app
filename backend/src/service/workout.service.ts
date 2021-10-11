import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Workout, { WorkoutDocument } from "../model/workout.model";

export function createWorkout(input: DocumentDefinition<WorkoutDocument>) {
  return Workout.create(input);
}

export function findWorkout(
  query: FilterQuery<WorkoutDocument>,
  options: QueryOptions = { lean: true }
) {
  return Workout.findOne(query, {}, options);
}

export function findAllWorkouts() {
  return Workout.find();
}

export function findAndUpdateWorkout(
  query: FilterQuery<WorkoutDocument>,
  update: UpdateQuery<WorkoutDocument>,
  options: QueryOptions
) {
  return Workout.findOneAndUpdate(query, update, options);
}

export function deleteWorkout(query: FilterQuery<WorkoutDocument>) {
  return Workout.findOneAndDelete(query);
}

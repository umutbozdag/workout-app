import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Exercise, { ExerciseDocument } from "../model/exercise.model";

export function createExercise(input: DocumentDefinition<ExerciseDocument>) {
  return Exercise.create(input);
}

export function findExercise(
  query: FilterQuery<ExerciseDocument>,
  options: QueryOptions = { lean: true }
) {
  return Exercise.findOne(query, {}, options);
}

export function findAndUpdateExercise(
  query: FilterQuery<ExerciseDocument>,
  update?: UpdateQuery<ExerciseDocument>,
  options?: QueryOptions
) {
  return Exercise.findOneAndUpdate(query, update, options);
}

export function deleteExercise(query: FilterQuery<ExerciseDocument>) {
  return Exercise.findOneAndDelete(query);
}
